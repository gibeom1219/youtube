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

    # 1차: Veo 영상 3개 (처음 9씬만, 3씬 1그룹)
    max_veo_groups = 3
    veo_available = _try_veo(client, scenes, assets_dir, scene_assets, max_groups=max_veo_groups)

    veo_count = sum(1 for v in scene_assets.values() if v and v.endswith(".mp4"))
    if veo_available and veo_count > 0:
        print(f"[AssetFetcher] Veo 완료 → {veo_count}개 씬에 영상 적용")
    elif not veo_available:
        print("[AssetFetcher] Veo 사용 불가")

    # 2차: Veo가 적용되지 않은 나머지 씬에 이미지 생성
    remaining = [s for s in scenes if s.scene_id not in scene_assets or scene_assets.get(s.scene_id) is None]
    if remaining:
        print(f"[AssetFetcher] 나머지 {len(remaining)}개 씬에 Nano Banana 이미지 생성")
        _generate_images(client, remaining, assets_dir, scene_assets)

    img_count = sum(1 for v in scene_assets.values() if v and v.endswith(".png"))
    print(f"[AssetFetcher] 최종: Veo 영상 {veo_count}개 씬 + 이미지 {img_count}개 씬")
    return scene_assets


def _try_veo(client, scenes, assets_dir, scene_assets, max_groups: int = 3) -> bool:
    """Veo 영상 생성 시도. 앞쪽 content 씬 9개(3그룹)에만 적용."""
    print(f"[AssetFetcher] Veo 3.1 Fast 배경 영상 시도 중 (앞쪽 {max_groups}그룹 = {max_groups * 3}씬)...")

    # outro 제외, 앞에서 9개 씬 (intro 포함)
    non_outro = [s for s in scenes if s.visual_type != "outro_card"]
    veo_scenes = non_outro[:max_groups * 3]

    group_size = 3
    veo_works = False

    for group_idx in range(0, len(veo_scenes), group_size):
        group = veo_scenes[group_idx:group_idx + group_size]
        queries = [s.visual_query for s in group if s.visual_query]
        if not queries:
            for s in group:
                scene_assets[s.scene_id] = None
            continue

        narrations = [s.narration for s in group]
        combined_prompt = _build_group_prompt(narrations, queries)
        gid = group_idx // group_size
        video_path = assets_dir / f"group_{gid}.mp4"
        relative_path = f"videos/group_{gid}.mp4"

        success = _generate_video(client, combined_prompt, video_path, gid)

        if success:
            veo_works = True
            for s in group:
                scene_assets[s.scene_id] = relative_path
        else:
            if not veo_works:
                return False
            for s in group:
                scene_assets[s.scene_id] = None

        # RPM 한도 방지: 요청 간 35초 대기
        if group_idx + group_size < len(veo_scenes):
            time.sleep(35)

    return True


def _generate_images(client, scenes, assets_dir, scene_assets):
    """Nano Banana로 씬마다 이미지 1개 생성."""
    for scene in scenes:
        # outro_card는 배경 에셋 불필요
        if scene.visual_type == "outro_card":
            scene_assets[scene.scene_id] = None
            continue

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
                "-r", "60",
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
