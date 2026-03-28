import base64
import io
from pathlib import Path

from orchestrator.config import ELEVENLABS_API_KEY, ELEVENLABS_VOICE_ID, ELEVENLABS_MODEL
from orchestrator.models.audio import AudioManifest, WordTimestamp
from orchestrator.models.script import ScriptOutput

# 청크당 최대 글자 수 (ElevenLabs 안전 한도: ~2,500자)
CHUNK_MAX_CHARS = 2500


def generate_audio(script: ScriptOutput, workspace_path: Path) -> AudioManifest:
    print("[AudioGenerator] 음성 생성 시작")

    from elevenlabs import ElevenLabs
    from elevenlabs.types import VoiceSettings

    client = ElevenLabs(api_key=ELEVENLABS_API_KEY)
    voice_settings = VoiceSettings(
        stability=0.2,
        similarity_boost=0.75,
        style=0.5,
        use_speaker_boost=True,
    )

    # 장면을 청크로 나누기 (각 청크 ~2,500자 이내)
    chunks = _split_scenes_into_chunks(script.scenes, CHUNK_MAX_CHARS)
    print(f"[AudioGenerator] 총 {len(chunks)}개 청크로 분할하여 변환")

    all_audio_bytes: list[bytes] = []
    all_words: list[WordTimestamp] = []
    time_offset = 0.0

    for i, chunk_scenes in enumerate(chunks):
        chunk_text = " ".join(s.narration for s in chunk_scenes)
        print(f"[AudioGenerator] 청크 {i+1}/{len(chunks)} 변환 중 ({len(chunk_text)}자)...")

        response = client.text_to_speech.convert_with_timestamps(
            voice_id=ELEVENLABS_VOICE_ID,
            text=chunk_text,
            model_id=ELEVENLABS_MODEL,
            voice_settings=voice_settings,
        )

        chunk_bytes = base64.b64decode(response.audio_base_64)
        all_audio_bytes.append(chunk_bytes)

        # 단어 타임스탬프 변환 + 시간 오프셋 적용
        chars = response.alignment.characters
        starts = response.alignment.character_start_times_seconds
        ends = response.alignment.character_end_times_seconds

        chunk_words = _chars_to_words(chars, starts, ends, time_offset)
        all_words.extend(chunk_words)

        # 다음 청크 시간 오프셋: 이 청크의 마지막 타임스탬프
        if ends:
            time_offset += ends[-1]

    # 오디오 파일 합치기
    audio_path = workspace_path / "audio.mp3"
    _merge_mp3_bytes(all_audio_bytes, audio_path)

    total_duration = time_offset

    manifest = AudioManifest(
        audio_file="audio.mp3",
        total_duration_seconds=total_duration,
        words=all_words,
    )

    ts_path = workspace_path / "word_timestamps.json"
    ts_path.write_text(manifest.model_dump_json(indent=2), encoding="utf-8")
    print(f"[AudioGenerator] 완료 → {audio_path} ({len(all_words)}개 단어, {total_duration:.1f}초)")

    return manifest


def _split_scenes_into_chunks(scenes, max_chars: int):
    """장면 목록을 max_chars 이내의 청크로 나눕니다. 장면 경계를 지킵니다."""
    chunks = []
    current_chunk = []
    current_chars = 0

    for scene in scenes:
        narration_len = len(scene.narration)

        # 현재 청크에 추가하면 초과되는 경우 → 새 청크 시작
        if current_chunk and current_chars + narration_len > max_chars:
            chunks.append(current_chunk)
            current_chunk = []
            current_chars = 0

        current_chunk.append(scene)
        current_chars += narration_len + 1  # +1 for space

    if current_chunk:
        chunks.append(current_chunk)

    return chunks


def _merge_mp3_bytes(chunks: list[bytes], output_path: Path):
    """여러 MP3 바이트를 단순 연결합니다 (같은 비트레이트/샘플레이트)."""
    with open(output_path, "wb") as f:
        for chunk in chunks:
            f.write(chunk)


def _chars_to_words(
    chars: list[str],
    starts: list[float],
    ends: list[float],
    time_offset: float = 0.0,
) -> list[WordTimestamp]:
    words = []
    current_word = ""
    word_start = 0.0
    word_end = 0.0

    for char, start, end in zip(chars, starts, ends):
        if char in (" ", "\n", "\t"):
            if current_word.strip():
                words.append(WordTimestamp(
                    word=current_word.strip(),
                    start_seconds=word_start + time_offset,
                    end_seconds=word_end + time_offset,
                ))
            current_word = ""
        else:
            if not current_word:
                word_start = start
            current_word += char
            word_end = end

    if current_word.strip():
        words.append(WordTimestamp(
            word=current_word.strip(),
            start_seconds=word_start + time_offset,
            end_seconds=word_end + time_offset,
        ))

    return words
