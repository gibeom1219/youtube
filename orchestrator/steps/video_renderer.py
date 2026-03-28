import subprocess
from pathlib import Path

from orchestrator.config import REMOTION_DIR


def render_video(workspace_path: Path) -> Path:
    print("[VideoRenderer] Remotion 렌더링 시작")

    output_path = workspace_path / "output.mp4"
    render_script = REMOTION_DIR / "render.mjs"

    result = subprocess.run(
        ["node", str(render_script), str(workspace_path)],
        cwd=str(REMOTION_DIR),
        capture_output=False,
        text=True,
    )

    if result.returncode != 0:
        raise RuntimeError(f"Remotion 렌더링 실패 (exit code {result.returncode})")

    print(f"[VideoRenderer] 완료 → {output_path}")
    return output_path
