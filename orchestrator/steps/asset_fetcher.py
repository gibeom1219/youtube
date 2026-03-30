import time
import subprocess
import base64
from pathlib import Path

from google import genai
from google.genai import types
import imageio_ffmpeg

from orchestrator.config import GOOGLE_AI_API_KEY

FFMPEG = imageio_ffmpeg.get_ffmpeg_exe()
from orchestrator.models.script import ScriptOutput

VEO_MODEL = "veo-3.1-fast-generate-preview"
IMAGE_MODEL = "gemini-3.1-flash-image-preview"  # Nano Banana 2


def fetch_assets(script: ScriptOutput, workspace_path: Path) -> dict[int, str]:
    """Veo 영상 생성을 시도하고, 실패 시 이미지로 대체합니다.
    Veo: 3씬 1영상 그룹화 / 이미지: 씬마다 1개씩
    반환: {scene_id: 에셋 상대경로 or None}
    """
    if not GOOGLE_AI_API_KEY or GOOGLE_AI_API_KEY.startswith("여기에"):
        print("[AssetFetcher] Google AI API 키 미설정 → 배경 없이 진행")
        return {}

    client = genai.Client(api_key=GOOGLE_AI_API_KEY)
    assets_dir = workspace_path / "videos"
    assets_dir.mkdir(exist_ok=True)

    scenes = script.scenes
    scene_assets: dict[int, str] = {}

    # 1차 시도: Veo 영상 (3씬 1그룹)
    veo_available = _try_veo(client, scenes, assets_dir, scene_assets)

    if veo_available:
        generated = sum(1 for v in scene_assets.values() if v)
        print(f"[AssetFetcher] Veo 완료 → {generated}개 씬에 영상 적용")
        return scene_assets

    # 2차: Veo 실패 → 이미지로 대체 (씬마다 1개)
    print("[AssetFetcher] Veo 사용 불가 → Nano Banana 이미지 생성으로 전환")
    scene_assets = {}
    _generate_images(client, scenes, assets_dir, scene_assets)

    generated = sum(1 for v in scene_assets.values() if v)
    print(f"[AssetFetcher] 이미지 완료 → {generated}개 씬에 적용")
    return scene_assets


def _try_veo(client, scenes, assets_dir, scene_assets) -> bool:
    """Veo 영상 생성 시도. 첫 그룹 성공 여부로 Veo 사용 가능 판단."""
    print("[AssetFetcher] Veo 3.1 Fast 배경 영상 시도 중...")

    group_size = 3
    group_idx = 0
    veo_works = False

    for i in range(0, len(scenes), group_size):
        group = scenes[i:i + group_size]
        queries = [s.visual_query for s in group if s.visual_query]
        if not queries:
            for s in group:
                scene_assets[s.scene_id] = None
            group_idx += 1
            continue

        narrations = [s.narration for s in group]
        combined_prompt = _build_group_prompt(narrations, queries)
        video_path = assets_dir / f"group_{group_idx}.mp4"
        relative_path = f"videos/group_{group_idx}.mp4"

        success = _generate_video(client, combined_prompt, video_path, group_idx)

        if success:
            veo_works = True
            for s in group:
                scene_assets[s.scene_id] = relative_path
        else:
            # 첫 그룹부터 실패하면 Veo 사용 불가 판단
            if not veo_works:
                return False
            for s in group:
                scene_assets[s.scene_id] = None

        group_idx += 1

        # RPM 한도 방지: 요청 간 35초 대기
        if i + group_size < len(scenes):
            time.sleep(35)

    return True


def _generate_images(client, scenes, assets_dir, scene_assets):
    """Nano Banana로 씬마다 이미지 1개 생성."""
    for scene in scenes:
        prompt = scene.visual_query
        if not prompt:
            scene_assets[scene.scene_id] = None
            continue

        img_path = assets_dir / f"scene_{scene.scene_id}.png"
        relative_path = f"videos/scene_{scene.scene_id}.png"

        success = _generate_image(client, prompt, img_path, scene.scene_id)

        if success:
            scene_assets[scene.scene_id] = relative_path
        else:
            scene_assets[scene.scene_id] = None

        # RPM 한도 방지
        time.sleep(5)


def _generate_image(client, prompt: str, save_path: Path, scene_id: int) -> bool:
    try:
        print(f"[AssetFetcher] 씬 {scene_id} 이미지 생성 중: {prompt[:60]}...")

        response = client.models.generate_content(
            model=IMAGE_MODEL,
            contents=f"Generate a cinematic background image for a finance YouTube video. No text overlays. {prompt}",
            config=types.GenerateContentConfig(
                response_modalities=["IMAGE", "TEXT"],
                candidate_count=1,
                image_config=types.ImageConfig(
                    aspect_ratio="16:9",
                ),
            ),
        )

        # 이미지 데이터 추출
        for part in response.candidates[0].content.parts:
            if part.inline_data and part.inline_data.mime_type.startswith("image/"):
                with open(save_path, "wb") as f:
                    f.write(part.inline_data.data)
                print(f"[AssetFetcher] 씬 {scene_id} 이미지 생성 완료")
                return True

        print(f"[AssetFetcher] 씬 {scene_id} 이미지 결과 없음")
        return False

    except Exception as e:
        print(f"[AssetFetcher] 씬 {scene_id} 이미지 생성 실패: {e}")
        return False


def _build_group_prompt(narrations: list[str], queries: list[str]) -> str:
    """3개 씬의 나레이션과 visual_query를 종합하여 하나의 영상 프롬프트를 생성합니다."""
    base_query = queries[0]
    context = " | ".join(n[:50] for n in narrations)
    prompt = (
        f"{base_query}. "
        f"This video should visually represent the following topics: {context}. "
        f"Cinematic quality, smooth slow motion, no text overlays."
    )
    return prompt


def _generate_video(client, prompt: str, save_path: Path, group_idx: int) -> bool:
    try:
        print(f"[AssetFetcher] 그룹 {group_idx} 영상 생성 중: {prompt[:80]}...")

        operation = client.models.generate_videos(
            model=VEO_MODEL,
            prompt=prompt,
            config=types.GenerateVideosConfig(
                aspect_ratio="16:9",
                number_of_videos=1,
                duration_seconds=4,
                resolution="720p",
                person_generation="allow_all",
            ),
        )

        max_wait = 300
        waited = 0
        while not operation.done and waited < max_wait:
            time.sleep(10)
            waited += 10
            operation = client.operations.get(operation)

        if not operation.done:
            return False

        if not operation.result or not operation.result.generated_videos:
            return False

        video = operation.result.generated_videos[0]
        video_data = client.files.download(file=video.video)

        temp_path = save_path.with_suffix(".tmp.mp4")
        with open(temp_path, "wb") as f:
            f.write(video_data)

        try:
            subprocess.run([
                FFMPEG, "-y", "-i", str(temp_path),
                "-c:v", "libx264", "-preset", "fast",
                "-g", "1", "-keyint_min", "1",
                "-an", str(save_path),
            ], capture_output=True, timeout=60)
            temp_path.unlink(missing_ok=True)
        except Exception:
            temp_path.rename(save_path)

        print(f"[AssetFetcher] 그룹 {group_idx} 영상 생성 완료")
        return True

    except Exception as e:
        print(f"[AssetFetcher] 그룹 {group_idx} 영상 생성 실패: {e}")
        return False
