import json
from pathlib import Path

from orchestrator.config import VIDEO_FPS
from orchestrator.models.script import ScriptOutput
from orchestrator.models.audio import AudioManifest


def build_props(
    script: ScriptOutput,
    audio: AudioManifest,
    workspace_path: Path,
    scene_videos: dict[int, str] | None = None,
) -> dict:
    """Remotion에 전달할 remotion_props.json을 생성합니다."""
    print("[PropsBuilder] Remotion props 생성 중")

    words = audio.words
    audio_duration = audio.total_duration_seconds

    # 장면별 나레이션 단어 수 계산
    scene_word_counts = [len(scene.narration.split()) for scene in script.scenes]
    total_narration_words = sum(scene_word_counts)

    # 오디오 단어가 나레이션보다 적을 경우 비율 조정
    scale = len(words) / total_narration_words if total_narration_words > 0 else 1.0

    scenes_props = []
    word_idx = 0

    for scene, wc in zip(script.scenes, scene_word_counts):
        # 이 장면에 해당하는 오디오 단어 범위
        scaled_wc = max(1, round(wc * scale))
        start_word_idx = word_idx
        end_word_idx = min(word_idx + scaled_wc - 1, len(words) - 1)

        # 시작 시간: 첫 단어의 start_seconds
        if start_word_idx < len(words):
            start_time = words[start_word_idx].start_seconds
        else:
            start_time = audio_duration

        # 종료 시간: 마지막 단어의 end_seconds
        end_time = words[end_word_idx].end_seconds

        # 유효하지 않은 타임스탬프 감지 (오디오 끝에 몰려있는 경우)
        has_valid_timestamps = end_time > start_time

        if not has_valid_timestamps:
            # 이 장면부터는 오디오 커버리지 없음 → 이후 장면도 모두 제외
            break

        duration = max(end_time - start_time, 0.5)

        # 배경 영상 경로 (있으면 포함)
        bg_video = None
        if scene_videos and scene.scene_id in scene_videos:
            bg_video = scene_videos[scene.scene_id]

        scene_prop = {
            "sceneId": scene.scene_id,
            "type": scene.type,
            "startSeconds": round(start_time, 3),
            "durationSeconds": round(duration, 3),
            "narration": scene.narration,
            "visualType": scene.visual_type,
            "visualData": scene.visual_data,
            "backgroundVideo": bg_video,
            "chartData": [c.model_dump() for c in scene.chart_data] if scene.chart_data else None,
            "chartTitle": scene.chart_title,
        }
        scenes_props.append(scene_prop)
        word_idx += scaled_wc

    total_scenes = len(script.scenes)
    if len(scenes_props) < total_scenes:
        dropped = total_scenes - len(scenes_props)
        print(f"[PropsBuilder] 경고: 오디오 커버리지 없는 장면 {dropped}개 제외 (ElevenLabs 텍스트 길이 제한)")

    # 장면 간 겹침/갭 보정: 각 장면이 다음 장면 시작 시간까지 이어지도록 조정
    for i in range(len(scenes_props) - 1):
        next_start = scenes_props[i + 1]["startSeconds"]
        scenes_props[i]["durationSeconds"] = round(next_start - scenes_props[i]["startSeconds"], 3)

    # 마지막 장면은 오디오 끝까지
    if scenes_props:
        last = scenes_props[-1]
        last["durationSeconds"] = round(audio_duration - last["startSeconds"], 3)

    # 최소 duration 보장 (0 이하 방지)
    for s in scenes_props:
        s["durationSeconds"] = max(s["durationSeconds"], 1 / VIDEO_FPS)

    props = {
        "title": script.title,
        "hook": script.hook,
        "totalDurationSeconds": round(audio_duration, 3),
        "audioFile": audio.audio_file,
        "fps": VIDEO_FPS,
        "scenes": scenes_props,
        "wordTimestamps": [w.model_dump() for w in words],
        "tags": script.tags,
    }

    props_path = workspace_path / "remotion_props.json"
    props_path.write_text(json.dumps(props, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"[PropsBuilder] 완료 → {props_path}")

    return props
