"""
유튜브 영상 자동화 파이프라인 메인 진입점

사용법:
  python -m orchestrator.main "주제"
  python -m orchestrator.main "주제" --job-id my_video
  python -m orchestrator.main "주제" --skip-render   (영상 렌더링 제외)
"""

import argparse
import uuid
from pathlib import Path

from orchestrator.config import WORKSPACE_DIR
from orchestrator.steps.script_writer import write_script
from orchestrator.steps.audio_generator import generate_audio
from orchestrator.steps.props_builder import build_props
from orchestrator.steps.video_renderer import render_video


def run_pipeline(topic: str, job_id: str = None, skip_render: bool = False) -> Path:
    if not job_id:
        job_id = str(uuid.uuid4())[:8]

    workspace_path = WORKSPACE_DIR / job_id
    workspace_path.mkdir(parents=True, exist_ok=True)

    print(f"\n{'='*50}")
    print(f"  유튜브 영상 자동화 파이프라인")
    print(f"  주제: {topic}")
    print(f"  Job ID: {job_id}")
    print(f"  작업 경로: {workspace_path}")
    print(f"{'='*50}\n")

    # Step 1: 대본 작성
    script = write_script(topic, workspace_path)
    print(f"  → 장면 수: {len(script.scenes)}개, 예상 길이: {script.total_duration_seconds:.0f}초\n")

    # Step 2: 음성 생성 (ElevenLabs)
    audio = generate_audio(script, workspace_path)
    print(f"  → 실제 오디오 길이: {audio.total_duration_seconds:.1f}초\n")

    # Step 3: Remotion props 생성
    build_props(script, audio, workspace_path)

    # Step 4: 영상 렌더링
    if skip_render:
        print("[Main] --skip-render 옵션으로 렌더링 건너뜀")
        output_path = workspace_path / "output.mp4"
    else:
        output_path = render_video(workspace_path)

    print(f"\n{'='*50}")
    print(f"  완료! 출력 파일: {output_path}")
    print(f"{'='*50}\n")

    return output_path


def main():
    parser = argparse.ArgumentParser(description="유튜브 영상 자동화 파이프라인")
    parser.add_argument("topic", help="영상 주제")
    parser.add_argument("--job-id", help="작업 ID (미입력 시 자동 생성)", default=None)
    parser.add_argument("--skip-render", action="store_true", help="Remotion 렌더링 건너뛰기")
    args = parser.parse_args()

    run_pipeline(args.topic, args.job_id, args.skip_render)


if __name__ == "__main__":
    main()
