---
name: make-audio
description: 유튜브 대본(script.json)으로 ElevenLabs TTS 음성 파일과 Remotion props를 생성합니다. 사용자가 음성 생성, TTS 실행, make-audio, 오디오 만들기를 요청하거나 /make-audio 명령어를 실행할 때 사용하세요. write-script 다음 단계로 사용자가 대본을 확인한 후 진행합니다.
---

# 음성 파일 생성 (Make Audio)

대본(script.json) → ElevenLabs TTS → audio.mp3 + Remotion props 생성

## 실행 전 반드시 확인할 것

### 1. Workspace ID 확인
```
/home/user/workspaces/youtube/workspace/<ID>/
```
- ID가 존재하는지 확인
- 존재하지 않으면: "워크스페이스를 찾을 수 없습니다. `/write-script <주제>`로 먼저 대본을 만들어주세요."

### 2. script.json 존재 확인
- 없으면: "script.json이 없습니다. `/write-script <주제>`로 먼저 대본을 작성해주세요."

### 3. 실행 전 대본 요약 표시
script.json을 읽어서 사용자에게 아래 형식으로 보여주세요:

```
📋 음성 생성 대상 대본
─────────────────────────────
제목: <title>
장면 수: <N>개
예상 나레이션 길이: <총 글자 수>자 (~<예상초>초)

장면별 나레이션:
[1] (intro_card) "안녕하세요 여러분! 오늘은..." (45자)
[2] (keyword)    "기준금리란 중앙은행이..." (38자)
...
─────────────────────────────
ElevenLabs TTS를 실행하시겠습니까?
```

예상 시간 계산: 한국어 기준 1초당 약 8~10자

## 실행

확인 후 아래 명령어를 실행하세요:
```bash
cd /home/user/workspaces/youtube && python -m orchestrator.run_audio <workspace_id>
```

## 오류 상황 대응

| 오류 | 원인 | 해결 방법 |
|---|---|---|
| `ELEVENLABS_API_KEY not set` | .env 파일에 API 키 없음 | `/home/user/workspaces/youtube/.env` 확인 |
| `quota exceeded` | ElevenLabs 월 한도 초과 | ElevenLabs 대시보드에서 사용량 확인 |
| `voice_id not found` | 잘못된 VOICE_ID | `.env`의 `ELEVENLABS_VOICE_ID` 값 확인 |
| `JSONDecodeError` | script.json 파일 손상 | `/write-script`로 대본 재생성 |
| `Connection error` | 네트워크 문제 | 인터넷 연결 확인 후 재시도 |

## 실행 후 결과 요약

성공 시 아래 형식으로 표시하세요:

```
✅ 음성 생성 완료
─────────────────────────────
오디오 길이: <N>초 (<M>분 <S>초)
단어 수: <N>개
파일 크기: ~<MB>

생성된 파일:
  📁 workspace/<ID>/
    🔊 audio.mp3
    📄 word_timestamps.json
    📄 remotion_props.json
─────────────────────────────
다음 단계: /make-video <ID>
```

## ElevenLabs 설정 (임의 변경 금지)
- 모델: `eleven_v3`
- stability: 0.2 / similarity_boost: 0.75 / style: 0.5
- 설정 위치: `orchestrator/config.py`

## 참고: 청크 분할 처리
- 나레이션이 길면 자동으로 2500자 단위로 청크 분할하여 TTS 변환
- 10분 영상 기준 보통 3에서 4개 청크
- 오디오 실제 길이는 나레이션 글자 수 × 0.12초 수준 (TTS 속도에 따라 대본 예상보다 길게 나올 수 있음)

## 배경 에셋 생성 (Veo → Nano Banana 폴백)

make-audio 단계에서 AssetFetcher가 배경 에셋을 자동 생성합니다. Veo를 먼저 시도하고, 실패 시 이미지로 폴백합니다.

### 동작 방식
- **1차: Veo 3.1 Fast 영상 생성**
  - **3개 씬이 1개 영상을 공유**: scene_id 0,1,2 → video_0.mp4 / scene_id 3,4,5 → video_1.mp4 / ...
  - script.json의 `visual_query` 필드를 프롬프트로 사용
  - TTS 생성과 병렬로 실행 (AssetFetcher)
- **2차 폴백: Nano Banana 2 이미지 생성** (Veo 실패 시)
  - Veo 할당량 초과 (429 RESOURCE_EXHAUSTED) 시 자동으로 이미지 생성으로 전환
  - 모델: `gemini-3.1-flash-image-preview` (Nano Banana 2)
  - 씬마다 1개 이미지 생성, RPM 대기 5초
  - 설정: `aspect_ratio="16:9"`, `candidate_count=1`
  - 미지원: `person_generation`, `output_mime_type`, `media_resolution`
  - ⚠️ Veo 1개 그룹이라도 성공하면 자동 폴백 안 됨 → 실패 씬은 별도 이미지 보완 필요

### 영상 스펙 (Veo)
- 해상도: 720p (1280x720)
- 길이: 4초
- 화면비: 16:9
- 오디오: 제어 불가 (렌더링 시 음소거 처리)
- FPS: 60fps

### 필수 환경 변수
- `GOOGLE_AI_API_KEY`: Google AI API 키 (`.env` 파일에 설정)

### 추가 오류 대응

| 오류 | 원인 | 해결 방법 |
|---|---|---|
| `GOOGLE_AI_API_KEY not set` | .env에 Google AI 키 없음 | `/home/user/workspaces/youtube/.env`에 `GOOGLE_AI_API_KEY=...` 추가 |
| `Veo quota exceeded (429)` | Google AI API 할당량 초과 | 자동으로 Nano Banana 이미지 폴백 |
| `video generation timeout` | 영상 생성 시간 초과 | 재시도 (보통 30초~1분 소요) |

### 결과 파일
배경 에셋은 workspace에 저장됩니다:
```
workspace/<ID>/
  videos/
    video_0.mp4   ← scene 0,1,2 공유 (Veo 성공 시)
    video_1.mp4   ← scene 3,4,5 공유 (Veo 성공 시)
    ...
    또는
    image_0.png   ← scene 0 (Nano Banana 폴백 시)
    image_1.png   ← scene 1
    ...
```
렌더링 시 영상은 **opacity 20%, 음소거, playbackRate 0.8**, 이미지는 **opacity 20%, 정적 배경 + 다크 오버레이**로 적용됩니다.
