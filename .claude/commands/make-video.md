---
name: make-video
description: Remotion으로 유튜브 영상을 렌더링합니다. 사용자가 영상 렌더링, make-video, 영상 만들기, 렌더링을 요청하거나 /make-video 명령어를 실행할 때 사용하세요. make-audio 다음 단계로, 사용자가 명시적으로 요청할 때만 실행합니다.
---

# 영상 렌더링 (Make Video)

audio.mp3 + remotion_props.json + 배경 영상 → Remotion 렌더링 → output.mp4

## 실행 전 반드시 확인할 것

### 1. Workspace 확인
```
/home/user/workspaces/youtube/workspace/<ID>/
```
- 존재하지 않으면: "워크스페이스를 찾을 수 없습니다. `/write-script <주제>`로 먼저 시작해주세요."

### 2. 필수 파일 확인
- `audio.mp3` 없으면: "음성 파일이 없습니다. `/make-audio <ID>`를 먼저 실행해주세요."
- `remotion_props.json` 없으면: "props 파일이 없습니다. `/make-audio <ID>`를 먼저 실행해주세요."

### 3. 실행 전 영상 정보 표시
```
🎬 렌더링 대상 영상 정보
─────────────────────────────
제목: <title>
총 길이: <N>초 (<M>분 <S>초)
장면 수: <N>개 / 해상도: 1920×1080 / 60fps
총 프레임: <N>프레임
배경 영상: <N>개

장면 구성:
  [0] intro_card    0.0s ~  6.0s
  [1] keyword       6.0s ~ 27.5s
  ...
─────────────────────────────
렌더링을 시작합니다. (약 <예상시간> 소요)
```

예상 렌더링 시간: 영상 길이 × 2 ~ 3배 (60fps, 예: 176초 영상 → 약 6~9분)

## 실행
```bash
cd /home/user/workspaces/youtube && python -m orchestrator.run_video <workspace_id>
```

렌더링은 시간이 오래 걸리므로 **백그라운드로 실행**하고, 완료 시 알림 받기:
- Bash 툴의 `run_in_background: true` 옵션 사용
- 완료 알림이 오면 output.mp4 결과를 사용자에게 보고

## 오류 상황 대응

| 오류 | 원인 | 해결 방법 |
|---|---|---|
| `Cannot find module` | Node.js 패키지 누락 | `cd remotion-project && npm install` 실행 |
| `ENOMEM` / 메모리 오류 | RAM 부족 | 다른 앱 종료 후 재시도 |
| `Error: Could not find composition` | props 파일 손상 | `/make-audio <ID>`로 props 재생성 |
| `ENOENT audio.mp3` | 오디오 파일 경로 오류 | workspace에 audio.mp3 존재 여부 확인 |
| 렌더링 중 멈춤 | 특정 프레임 오류 | 콘솔 에러 메시지 확인 후 보고 |

## 실행 후 결과 요약

```
✅ 렌더링 완료!
─────────────────────────────
출력 파일: /home/user/workspaces/youtube/workspace/<ID>/output.mp4
파일 크기: <N>MB
영상 길이: <N>초 (<M>분 <S>초)
해상도: 1920×1080 / 60fps
─────────────────────────────
영상을 확인해보세요.
수정이 필요하면 아래를 참고하세요:
  • 비주얼 수정 → Remotion 컴포넌트 수정 후 재렌더링
  • 음성/대본 수정 → /make-audio <ID> 또는 /write-script <주제>
```

## 씬 전환 (Transitions)
- 7가지 타입 로테이션: `fade`, `slideLeft`, `slideRight`, `slideUp`, `zoomIn`, `zoomFade`, `slideDown`
- IN 전환: 30프레임 (0.5초 @ 60fps)
- OUT 전환: 25프레임 (~0.4초 @ 60fps)
- `intro_card`/`outro_card`는 `noExit` (퇴장 페이드 없음 — 구분선 등이 사라지는 버그 방지)

## 배경 에셋 (영상 + 이미지)
- 파일 확장자로 자동 감지: `.mp4` → 영상, `.png/.jpg` → 이미지
- **영상 배경**: opacity 20%, muted, loop, playbackRate 0.8 (Veo 영상은 ffmpeg로 매 프레임 키프레임 재인코딩)
- **이미지 배경**: opacity 20%, 정적 배경 + 어두운 그라데이션 오버레이
- `render.mjs`가 배경 에셋을 `remotion-project/public/videos/`에 복사

## 참고: 60fps
- 30fps → 60fps 변경으로 파일 크기가 약 1.5~2배 커짐
- 렌더링 시간도 증가
- 렌더링 타임아웃: 120초 (배경 영상 로딩 대기)

## 수정 후 재렌더링 가이드

| 수정 사항 | 시작 단계 | 명령어 |
|---|---|---|
| 비주얼(색상/레이아웃/애니메이션) | 재렌더링만 | `/make-video <ID>` |
| 음성(속도/발음)만 | 음성 재생성 | `/make-audio <ID>` |
| 대본 내용 수정 | 대본부터 | `/write-script <주제>` |

## 비주얼 디자인 원칙 (참고용)
- 색상: 티파니 블루 `#81D8D0` / 배경 `#060d0c`
- 애니메이션: floating 없음, glow 펄싱만 허용
- 폰트: NotoSansKR + NotoColorEmoji
- 자막: 최대 6단어 또는 16자
- 컴포넌트 위치: `remotion-project/src/`
