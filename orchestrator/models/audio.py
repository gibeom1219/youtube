from pydantic import BaseModel


class WordTimestamp(BaseModel):
    word: str
    start_seconds: float
    end_seconds: float


class AudioManifest(BaseModel):
    audio_file: str
    total_duration_seconds: float
    words: list[WordTimestamp]
