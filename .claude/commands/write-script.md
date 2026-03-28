---
name: write-script
description: 경제/금융 유튜브 채널 대본을 JSON 형식으로 작성합니다. 사용자가 영상 주제나 대본 작성을 요청할 때, 또는 /write-script 명령어를 실행할 때 사용하세요.
---

# 유튜브 경제/금융 대본 작성

## 핵심 설정
- 톤: **완전한 입말 구어체** (뉴스체/리포트체/기사체 절대 금지)
- 영상 길이: 9~10분 (total_duration: 310~340초)
- 나레이션: **4,500~5,500자** (미달 시 자동 보강), 각 씬 100~150자
- content 장면 수: 많을수록 좋음 (총량 안에서 최대한)
- FPS: 60fps

## 주제 재구성
사용자 주제를 그대로 쓰지 말고, 클릭을 유발하는 형태로 재구성:
- 핵심 갈등/궁금증 부각, "왜?"를 자극하는 구조
- 예: "환율 상승 영향" → "환율이 안 떨어집니다. 근데 이번엔 좀 특이해요."

## 문체 규칙 (가장 중요)
- ❌ 금지: "~했습니다"(뉴스체), "이에 따라"(리포트체), "그러나/반면/한편"(문어체)
- ✅ 사용: "~거예요", "~거든요", "근데", "아니", "어쨌든", "한마디로", "오죽하면"
- 감정: "환장하는 거죠", "이게 좀 문제예요", "오죽하면"
- 비유: 즉흥적·재미있게 ("욕조에 페인트 붓는 거", "영화 300 길막")
- 하나의 주제를 여러 씬에 걸쳐 깊이 있게, 흐름이 자연스럽게 이어지도록

## 비주얼 다양성
- **81종** visual_type 활용 가능 (intro_card, outro_card 포함)
- 전체에서 **15가지 이상** 서로 다른 visual_type 사용
- 같은 type 연속 금지
- stat_card/bullet_list 최대 4회, keyword/comparison/callout_box/quote_card/flow_diagram 최대 3회, 나머지 2회

## visual_query (Veo 3.1 Fast 배경 영상)
- 모든 씬에 `visual_query` 필드 작성 (영어, 상세 프롬프트)
- **3개 씬이 1개 영상 공유**: 3의 배수 scene_id(0,3,6,9...)에 상세 작성, 나머지는 같은 그룹 query 복사
- 특정 인물 이름 금지 (설명적 묘사로 대체)
- 60fps, 720p, 16:9, 4초 영상

## JSON 구조
```json
{
  "title": "제목 (30자 이내)",
  "hook": "시청자 호기심 자극 한 문장",
  "scenes": [
    {
      "scene_id": 0,
      "type": "intro",
      "duration_seconds": 5.0,
      "narration": "...",
      "visual_type": "intro_card",
      "visual_data": {"title": "...", "subtitle": "..."},
      "visual_query": "Cinematic shot of...",
      "chart_data": null,
      "chart_title": null
    }
  ],
  "total_duration_seconds": 320.0,
  "tags": ["태그1", "태그2"]
}
```

## 실행 방법
1. 주제 분석 및 구조 설계
2. 비주얼 다양성 계획 (15종 이상)
3. JSON 대본 생성
4. workspace 생성: `python3 -c "import uuid; print(str(uuid.uuid4())[:8])"`
5. `mkdir -p /home/user/workspaces/youtube/workspace/<ID>`
6. script.json 저장 (Write 툴 사용)
7. 대본 요약 표시 후 안내: `/make-audio <ID>`

## TTS 음성 품질 규칙
- 괄호 내 약어 금지: "이슬람혁명수비대(IRGC)" → 하나만 사용
- 물결표(~) 범위 금지: "1~2개월" → "1에서 2개월"
- 특수문자 최소화, 자연스러운 구어체

자세한 visual_type 목록, visual_data 형식, 결정 트리는 skill-dev/write-script/SKILL.md 참조.
