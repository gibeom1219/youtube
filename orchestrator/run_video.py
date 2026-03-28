"""
영상 렌더링 단독 실행 스크립트

사용법:
  cd /home/user/workspaces/youtube
  python -m orchestrator.run_video <workspace_id>
"""

import sys
from pathlib import Path

from orchestrator.config import WORKSPACE_DIR
from orchestrator.steps.video_renderer import render_video


def main():
    if len(sys.argv) < 2:
        print("사용법: python -m orchestrator.run_video <workspace_id>")
        sys.exit(1)

    job_id = sys.argv[1].strip()
    workspace_path = WORKSPACE_DIR / job_id

    if not workspace_path.exists():
        print(f"❌ 워크스페이스를 찾을 수 없습니다: {workspace_path}")
        sys.exit(1)

    props_path = workspace_path / "remotion_props.json"
    audio_path = workspace_path / "audio.mp3"

    if not props_path.exists():
        print(f"❌ remotion_props.json이 없습니다. 먼저 /make-audio 를 실행하세요.")
        sys.exit(1)

    if not audio_path.exists():
        print(f"❌ audio.mp3가 없습니다. 먼저 /make-audio 를 실행하세요.")
        sys.exit(1)

    print(f"\n{'='*55}")
    print(f"  🎬 영상 렌더링")
    print(f"  Workspace ID: {job_id}")
    print(f"  경로: {workspace_path}")
    print(f"{'='*55}\n")

    output_path = render_video(workspace_path)

    import os
    file_size_mb = os.path.getsize(output_path) / (1024 * 1024)

    print(f"\n{'='*55}")
    print(f"  ✅ 영상 렌더링 완료!")
    print(f"{'='*55}")
    print(f"  출력 파일: {output_path}")
    print(f"  파일 크기: {file_size_mb:.1f}MB")
    print(f"{'='*55}\n")


if __name__ == "__main__":
    main()
