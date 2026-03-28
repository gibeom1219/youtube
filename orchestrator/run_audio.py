"""
음성 파일 생성 단독 실행 스크립트

사용법:
  cd /home/user/workspaces/youtube
  python -m orchestrator.run_audio <workspace_id>
"""

import sys
import json
from pathlib import Path

from orchestrator.config import WORKSPACE_DIR
from orchestrator.models.script import ScriptOutput
from orchestrator.steps.audio_generator import generate_audio
from orchestrator.steps.props_builder import build_props
from orchestrator.steps.asset_fetcher import fetch_assets


def main():
    if len(sys.argv) < 2:
        print("사용법: python -m orchestrator.run_audio <workspace_id>")
        sys.exit(1)

    job_id = sys.argv[1].strip()
    workspace_path = WORKSPACE_DIR / job_id

    if not workspace_path.exists():
        print(f"❌ 워크스페이스를 찾을 수 없습니다: {workspace_path}")
        sys.exit(1)

    script_path = workspace_path / "script.json"
    if not script_path.exists():
        print(f"❌ script.json이 없습니다. 먼저 /write-script 를 실행하세요.")
        sys.exit(1)

    print(f"\n{'='*55}")
    print(f"  🎙️  음성 파일 생성")
    print(f"  Workspace ID: {job_id}")
    print(f"  경로: {workspace_path}")
    print(f"{'='*55}\n")

    script_data = json.loads(script_path.read_text(encoding="utf-8"))
    script = ScriptOutput(**script_data)

    audio = generate_audio(script, workspace_path)
    scene_videos = fetch_assets(script, workspace_path)
    build_props(script, audio, workspace_path, scene_videos=scene_videos)

    print(f"\n{'='*55}")
    print(f"  ✅ 음성 생성 완료")
    print(f"{'='*55}")
    print(f"  오디오 길이: {audio.total_duration_seconds:.1f}초")
    print(f"  단어 수: {len(audio.words)}개")
    print(f"  저장 파일:")
    print(f"    - {workspace_path / 'audio.mp3'}")
    print(f"    - {workspace_path / 'word_timestamps.json'}")
    print(f"    - {workspace_path / 'remotion_props.json'}")
    print(f"\n  ➡️  다음 단계: /make-video {job_id}")
    print(f"{'='*55}\n")


if __name__ == "__main__":
    main()
