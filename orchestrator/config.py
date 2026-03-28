import os
from pathlib import Path
from dotenv import load_dotenv

load_dotenv()

# Base paths
BASE_DIR = Path(__file__).parent.parent
WORKSPACE_DIR = BASE_DIR / "workspace"
REMOTION_DIR = BASE_DIR / "remotion-project"

WORKSPACE_DIR.mkdir(exist_ok=True)

# API Keys
ANTHROPIC_API_KEY = os.getenv("ANTHROPIC_API_KEY", "")
ELEVENLABS_API_KEY = os.getenv("ELEVENLABS_API_KEY", "")
ELEVENLABS_VOICE_ID = os.getenv("ELEVENLABS_VOICE_ID", "")
PEXELS_API_KEY = os.getenv("PEXELS_API_KEY", "")
GOOGLE_AI_API_KEY = os.getenv("GOOGLE_AI_API_KEY", "")

# Video settings
VIDEO_FPS = 60
VIDEO_WIDTH = 1920
VIDEO_HEIGHT = 1080

# Claude model
CLAUDE_MODEL = "claude-sonnet-4-6"

# ElevenLabs model
ELEVENLABS_MODEL = "eleven_v3"
