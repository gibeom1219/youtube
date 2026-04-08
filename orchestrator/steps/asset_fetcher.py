from pathlib import Path
from concurrent.futures import ThreadPoolExecutor, as_completed

from google import genai
from google.genai import types

from orchestrator.config import GOOGLE_AI_API_KEY
from orchestrator.models.script import ScriptOutput

IMAGE_MODEL = "gemini-3.1-flash-image-preview"  # Nano Banana 2


def fetch_assets(script: ScriptOutput, workspace_path: Path) -> dict[int, str]:
    """Nano Banana 이미지로 모든 씬의 배경을 생성합니다.
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

    # Nano Banana 이미지로 전체 씬 생성 (병렬)
    print(f"[AssetFetcher] Nano Banana 이미지 생성 시작 ({len(scenes)}개 씬)")
    _generate_images(client, scenes, assets_dir, scene_assets)

    img_count = sum(1 for v in scene_assets.values() if v and v.endswith(".png"))
    print(f"[AssetFetcher] 최종: 이미지 {img_count}개 씬")
    return scene_assets


def _generate_images(client, scenes, assets_dir, scene_assets):
    """Nano Banana로 씬마다 이미지 1개 생성 (병렬, RPM 100)."""
    tasks = []
    for scene in scenes:
        if scene.visual_type == "outro_card":
            scene_assets[scene.scene_id] = None
            continue
        prompt = scene.visual_query
        if not prompt:
            scene_assets[scene.scene_id] = None
            continue
        tasks.append((scene.scene_id, prompt))

    if not tasks:
        return

    print(f"[AssetFetcher] 이미지 {len(tasks)}개 병렬 생성 시작")

    def _task(scene_id, prompt):
        img_path = assets_dir / f"scene_{scene_id}.png"
        relative_path = f"videos/scene_{scene_id}.png"
        success = _generate_image(client, prompt, img_path, scene_id)
        return scene_id, relative_path if success else None

    with ThreadPoolExecutor(max_workers=10) as executor:
        futures = {executor.submit(_task, sid, p): sid for sid, p in tasks}
        for future in as_completed(futures):
            scene_id, result = future.result()
            scene_assets[scene_id] = result


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


