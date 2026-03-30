---
name: make-audio
description: 유튜브 대본(script.json)으로 ElevenLabs TTS 음성 파일과 Remotion props를 생성합니다. 사용자가 음성 생성, TTS 실행, make-audio, 오디오 만들기를 요청하거나 /make-audio 명령어를 실행할 때 사용하세요. write-script 다음 단계로 사용자가 대본을 확인한 후 진행합니다.
---

# 음성 파일 생성 (Make Audio)

대본(script.json) → ElevenLabs TTS → audio.mp3 + Remotion props + Veo 배경 영상 생성

## 실행 전 반드시 확인할 것

### 1. Workspace ID 확인
```
/home/user/workspaces/youtube/workspace/<ID>/
```
- 존재하지 않으면: "워크스페이스를 찾을 수 없습니다. `/write-script <주제>`로 먼저 대본을 만들어주세요."

### 2. script.json 존재 확인
- 없으면: "script.json이 없습니다. `/write-script <주제>`로 먼저 대본을 작성해주세요."

### 3. 실행 전 대본 요약 표시
script.json을 읽어서 아래 형식으로 보여주세요:

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
ElevenLabs TTS + Veo 배경 영상을 생성하시겠습니까?
```

## 실행
```bash
cd /home/user/workspaces/youtube && python -m orchestrator.run_audio <workspace_id>
```

## 오류 상황 대응

| 오류 | 원인 | 해결 방법 |
|---|---|---|
| `ELEVENLABS_API_KEY not set` | .env 파일에 API 키 없음 | `/home/user/workspaces/youtube/.env` 확인 |
| `GOOGLE_AI_API_KEY not set` | .env에 Google AI 키 없음 | `.env`에 `GOOGLE_AI_API_KEY=...` 추가 |
| `quota exceeded` | ElevenLabs 월 한도 초과 | ElevenLabs 대시보드에서 사용량 확인 |
| `Veo quota exceeded` | Google AI API 할당량 초과 | 잠시 후 재시도 |
| `voice_id not found` | 잘못된 VOICE_ID | `.env`의 `ELEVENLABS_VOICE_ID` 값 확인 |
| `JSONDecodeError` | script.json 파일 손상 | `/write-script`로 대본 재생성 |

## 실행 후 결과 요약

```
✅ 음성 + 배경 영상 생성 완료
─────────────────────────────
오디오 길이: <N>초 (<M>분 <S>초)
단어 수: <N>개
파일 크기: ~<MB>

생성된 파일:
  📁 workspace/<ID>/
    🔊 audio.mp3
    📄 word_timestamps.json
    📄 remotion_props.json
    🎬 videos/
      video_0.mp4 (scene 0,1,2)
      video_1.mp4 (scene 3,4,5)
      ...
─────────────────────────────
다음 단계: /make-video <ID>
```

## 배경 에셋 생성 (Veo → Nano Banana 2 폴백)
- **1차: Veo 3.1 Fast 영상** — 3씬 1영상 그룹화, 720p, 4초, RPM 대기 35초
- **2차: Nano Banana 2 이미지** (`gemini-3.1-flash-image-preview`) — Veo 실패 시 자동 전환, 씬마다 1개
- 이미지 설정: `aspect_ratio="16:9"`, `candidate_count=1` (다른 파라미터 미지원)
- ⚠️ Veo 일부 성공 시 실패 씬은 별도로 이미지 보완 필요
- 배경은 렌더링 시 opacity 20%, 어둡게 처리 (영상: muted+loop, 이미지: 정적)

## ElevenLabs 설정 (임의 변경 금지)
- 모델: `eleven_v3`
- stability: 0.2 / similarity_boost: 0.75 / style: 0.5
- 설정 위치: `orchestrator/config.py`

## 참고: 청크 분할 처리
- 나레이션이 길면 자동으로 2500자 단위로 청크 분할하여 TTS 변환
- 10분 영상 기준 보통 3에서 4개 청크
- 오디오 실제 길이는 나레이션 글자 수 × 0.12초 수준
