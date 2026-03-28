---
name: write-script
description: 경제/금융 유튜브 채널 대본을 JSON 형식으로 작성합니다. 사용자가 영상 주제나 대본 작성을 요청할 때, 또는 /write-script 명령어를 실행할 때 사용하세요. 금리, 주식, 환율, 경제지표, 기업분석 등 금융 관련 주제라면 적극적으로 이 skill을 활용하세요.
---

# 유튜브 경제/금융 대본 작성 Skill

이 skill은 경제/금융 유튜브 채널용 대본을 **Remotion 영상 렌더링 시스템**에 맞는 JSON 형식으로 직접 생성합니다.

## 채널 정체성 (가장 중요)

- 대상: 금융 지식이 많지 않은 일반 시청자
- 톤: **완전한 입말 구어체** — 친한 형이 카페에서 설명해주듯 (뉴스체/리포트체/기사체 절대 금지)
- 목표: 복잡한 금융 개념을 쉽고 재미있게, 깊이 있게 설명
- **실제 영상 길이 목표: 9~10분**
- TTS 실제 속도 = 1초당 약 8자 → **나레이션 총 글자 수: 4,500~5,500자** (미달 시 자동 보강)
- 각 씬 나레이션: **100~150자** (이 범위를 초과하면 실제 영상이 늘어남)
- content 장면 수: 많을수록 좋음 (총량 안에서 최대한) / total_duration_seconds 목표: 310~340초

**채널 주제 범위**: 주식시장, 종목/섹터 분석, 세계 경제 흐름, 금융 시스템, 세계 이슈가 시장·경제에 미치는 영향

**이 채널은 단순 뉴스 전달 채널이 아닙니다.**
현재 상황을 종합 분석해서 스스로 결론에 도달하고, 그 주관적 생각을 솔직하게 전달하는 채널입니다.

**중요**: 투자 권유나 "~하세요" 같은 강요 표현 절대 금지. 항상 "내 생각"으로 표현합니다.

### 콘텐츠 방향 — 씬 주제 범위

✅ 다뤄야 할 것:
- 주식시장 흐름, 지수 분석, 섹터별 영향
- 기업 실적·종목 분석
- 환율·금리·인플레이션이 **시장과 자산**에 미치는 영향
- 글로벌 경제 지표 (GDP, 무역수지, 고용 등)
- 세계 지정학 이슈가 에너지·원자재·증시에 미치는 영향 (군사·외교 디테일 포함)
- 투자 심리, 공포탐욕지수, 외국인 자금 흐름
- **금융 시스템/제도의 구조적 문제** (통화량, 국채 발행 구조, 중앙은행 역할, 직계 방식 논쟁 등)
- **핵심 인물 심층 분석** (연준 의장, 대통령, CEO 등의 이력·행보·성향·발언 — 스토리텔링으로 풀어낼 것)
- **금융 원리/메커니즘 교육** (레버리지 청산, 선물 구조, ETF vs 주식, 스테이블코인 등 — 초보도 이해하게 비유로 설명)
- **정치·규제가 시장에 미치는 영향** (대통령 사업, 규제 변화, 정책 방향이 자산에 미치는 구조)

❌ 씬 주제로 피해야 할 것:
- 개인 소비생활 (해외여행 비용, 장바구니 물가, 해외직구 팁)
- "지금 여행 가야 하나요?" 같은 라이프스타일 조언
- 재테크 실용팁 (적금, 예금 금리 비교) 위주 씬

### 주제 재구성 (대본 작성 전 반드시 수행)

사용자가 주는 주제를 그대로 쓰지 말고, 시청자가 클릭하고 싶은 형태로 재구성하세요:
- 핵심 갈등/궁금증을 부각시킬 것
- "왜?"를 자극하는 구조로 바꿀 것
- 시청자에게 직접적으로 영향이 있다는 느낌을 줄 것

예시:
- "환율 상승이 한국 주식에 미치는 영향" → "환율이 안 떨어집니다. 근데 이번엔 좀 특이해요."
- "트럼프 재산 증가" → "트럼프 재산이 임기 1년 만에 거의 두 배가 됐습니다. 대통령을 돈 벌려고 하는 건지."

### 문체 규칙 (★ 가장 중요)

**완전한 입말 구어체**로만 작성. 뉴스체/리포트체/기사체/논문체 절대 금지.

```
❌ 금지하는 문체:
  "환율이 1,500원을 돌파했습니다" (뉴스체)
  "이에 따라 시장에 미치는 영향은 다음과 같습니다" (리포트체)
  "외국인 자금 이탈이 우려됩니다" (기사체)

✅ 써야 하는 문체:
  "환율이 1,500원을 찍었어요. 이거 17년 만에 처음인데 좀 심각합니다."
  "근데 여기서 문제가 뭐냐면은 달러가 빠지는 속도보다 원화가 빠지는 속도가 더 빨랐다는 거예요."
  "아니 국장은 수익률도 안 좋은데 미장에 갈 수밖에 없는 구조인데 이거를 모르시진 않을 거라고 생각해요."
```

**접속사/연결어**: 입말 접속사만 사용
- ❌ 금지: "그러나", "반면", "한편", "이에 따라", "따라서", "그렇다면", "이로 인해"
- ✅ 사용: "근데", "그래서", "아니", "어쨌든", "사실", "근데 여기서", "그럼", "물론", "결국은", "한마디로", "보통은", "심지어", "실제로", "오죽하면", "뭐냐면"

**감정 표현**: 솔직하고 생생하게
- "환장하는 거죠", "이게 좀 문제예요", "진짜 미치겠는 거야", "오죽하면", "걱정이 되는 거예요", "이 무슨 경우야"

### 나레이션 구조 원칙

**영상 전체 흐름**: 훅(문제 제기) → 원인 하나씩 빌드업 → 영향/의미 분석 → 결론
- 매 씬마다 "팩트→해석→생각"을 넣을 필요 없음. 어떤 씬은 팩트만, 어떤 씬은 분석만 해도 됨
- 영상 전체로 봤을 때 자연스럽게 흘러가면 됨

**같은 표현 반복 금지**
- "저는 이게 중요하다고 봐요" 같은 표현을 여러 씬에서 돌려쓰지 말 것
- 매번 다른 방식으로 표현할 것 (자연스러운 대화에서는 같은 말을 반복하지 않음)

**하나의 주제를 여러 씬에 걸쳐 깊이 있게 풀어갈 것**
- 씬이 바뀌어도 이야기 흐름이 자연스럽게 이어져야 함
- 한 포인트를 구체적인 숫자·사례·에피소드와 함께 충분히 설명

### 스토리텔링 기법 (★ 샘플 대본 핵심)

**1. 에피소드/일화 삽입**
- 추상적 설명 대신 구체적인 에피소드를 넣어 몰입감을 높일 것
- 예: "대통령이 되면 사업에서 손을 떼는 게 관례예요. 지미 카터 대통령은 땅콩농장을 측근에게 맡기고 계좌 정보까지 차단당했거든요. 근데 퇴임하고 까봤더니 빚더미에 앉아 있었대요. 대통령이 진짜 거지가 된 거예요."
- 예: "부시 대통령이 케빈 워시를 써 보니까 마음에 들었나 봐요. 연준에서 한번 떼 볼래? 내가 꽂아보려고 하는데. 이렇게 해서 30대 중반에 최연소 연준 이사가 됩니다."

**2. 수사적 질문 적극 활용**
- 시청자의 궁금증을 대신 물어봐 주는 역할
- "대체 왜 원화만 이러는 거야?", "이거 정상이야?", "그럼 어떡해야 되냐?", "이게 끝이냐?"
- 질문을 던진 후 바로 답을 주지 말고 1~2문장 빌드업 후 답변

**3. 반론 → 재반론 구조**
- 한쪽 주장만 하지 말고 반대 의견도 제시한 뒤 분석
- 예: "한국은행은 통화량 증가율이 8%인데 과거엔 10%도 찍었다고 해요. 그렇게 심한 게 아니라는 거죠. 근데 여기서 또 지적을 받는 게, IMF가 몇 년 동안 바꾸라고 해도 안 바꾸다가 왜 이제서야 직계 방식이 잘못됐다고 하는 거야? 책임 회피 아니냐? 이런 의심이 나올 수 있는 거죠."

**4. 시청자 마음 읽기**
- 시청자가 지금 뭘 생각하고 있을지 대신 말해주기
- "많은 분들이 지금 이거 들어가야 하나 고민하실 텐데", "아 솔직히 손짓하는 거 같잖아", "이쯤 되면 걱정이 되시죠?"

**5. 톤 전환 (진지 ↔ 풍자 ↔ 공감)**
- 계속 같은 톤이면 지루함. 중간중간 톤을 바꿔줄 것
- 진지: "바로 이것 때문에 원화 가치가 떨어지고 있는 거고요."
- 풍자: "유튜버가 이거 한다고도 나락갈 일인데 초 강대국의 대통령이 한 겁니다."
- 공감: "서운한 감정이 좀 있는 거 같습니다."

**6. 결론을 바로 안 줌 — 빌드업 구조**
- 답을 먼저 주지 말고, 원인을 하나씩 쌓아가며 자연스럽게 결론에 도달
- "왜 원화만 빠지냐?" → 달러 유출 (기관) → 달러 유출 (개인) → 달러 유출 (기업) → 원화 공급 과잉 → "결국 모든 돈이 밖으로 나가고 있다는 겁니다"

**7. 파트 전환 멘트**
- 큰 주제가 바뀔 때 명시적으로 알려줄 것
- "여기까지는 달러가 유출되는 과정이었고, 지금부터는 원화가 많아진 이유를 얘기해 보겠습니다."
- "자, 이제 핵심으로 들어갑니다."
- "다음으로 기업도 마찬가지인데~"

### 비유 활용 원칙

시청자는 경제·금융·주식 **초보**입니다. 정형화된 비유("마치 ~와 같습니다") 금지. 즉흥적이고 재미있는 비유 사용.

```
❌ "시장 규모가 작아서 변동성이 큽니다."
✅ "바다에 페인트 한 통 붓는다고 바닷물 색이 바뀌진 않잖아요. 근데 욕조에 부으면 바뀌거든요.
    은시장이 딱 그런 거예요. 시장이 작으니까 큰 돈이 들어오면 난리가 나는 겁니다."
```

```
❌ "호르무즈 해협은 원유 수송의 핵심 통로입니다."
✅ "호르무즈 해협이라는게 바다의 협곡이에요. 영화 300에 보면 스파르타 군대가 협곡에서 길막하잖아요.
    그거랑 비슷해요. 길이 좁으니까 막기가 쉬운 거죠."
```

```
❌ "정부가 채권 돌려막기를 하고 있습니다."
✅ "빚을 갚기 위해서 또 빚을 지는 채권 돌려막기가 굴러가고 있는 상황이에요.
    갚아야 될 원금과 이자는 눈덩이처럼 불어나면서 더 많은 국채를 발행해야 되는 악순환에 빠져 있습니다."
```

## TTS 음성 품질 규칙 (반드시 준수)

narration 텍스트는 ElevenLabs TTS로 변환되므로 아래 규칙을 지키세요:

- **괄호 내 약어 금지**: "이슬람혁명수비대(IRGC)" → "이슬람혁명수비대" 또는 "IRGC" 중 하나만 사용
- **물결표(~) 범위 표현 금지**: "1~2개월" → "1에서 2개월", "10~20%" → "10에서 20퍼센트"
- **특수문자 최소화**: narration은 자연스러운 구어체 문장으로만 작성, 기호는 숫자/단어로 풀어쓰기

## 대본 생성 프로세스

### 1단계: 주제 분석 및 구조 설계

대본을 쓰기 전에 스스로 아래를 결정하세요:
- 핵심 메시지 1개 (이 영상을 보면 무엇을 알게 되나?)
- 훅 질문 (시청자가 "어? 나한테 해당되는 얘기네" 하고 멈추게 만드는 문장)
- 장면 흐름: 개념 소개 → 현재 상황/수치 → 원인/배경 → 영향/전망 → 정리

### 2단계: 비주얼 다양성 계획

장면 목록을 쓰기 **전에** 아래 규칙을 먼저 확인하세요:

**연속 금지:** 같은 visual_type을 연달아 쓰지 마세요.
- ❌ stat_card → stat_card
- ✅ stat_card → flow_diagram → stat_card

**최대 사용 횟수 (전체 장면 기준):**
| visual_type | 최대 |
|---|---|
| stat_card, bullet_list | 4회 |
| keyword, comparison, callout_box, quote_card, flow_diagram | 3회 |
| 나머지 모든 타입 | 2회 |

**최소 다양성:** 전체에서 **15가지 이상** 서로 다른 visual_type 사용 (총 81종 활용 가능)

**전체 visual_type 목록 (81종):**

| # | visual_type | 용도 |
|---|---|---|
| 1 | `intro_card` | 첫 씬, 제목+훅 |
| 2 | `outro_card` | 마지막 씬, 구독 유도 |
| 3 | `stat_card` | 핵심 수치 강조 |
| 4 | `bullet_list` | N가지 이유/목록 |
| 5 | `timeline` | 시간 흐름 |
| 6 | `comparison` | 두 가지 비교 |
| 7 | `number_highlight` | 숫자 하나 강조 |
| 8 | `keyword` | 개념/용어 설명 |
| 9 | `chart` | 막대 차트 |
| 10 | `quote_card` | 전문가/유명인 발언 인용 |
| 11 | `flow_diagram` | A→B→C 인과관계 흐름도 |
| 12 | `news_feed` | 관련 뉴스 헤드라인 목록 |
| 13 | `step_flow` | 단계별 방법/절차 안내 |
| 14 | `table_data` | 여러 항목 표 형식 비교 |
| 15 | `pros_cons` | 장단점 나란히 비교 |
| 16 | `ranking_list` | 순위/랭킹 목록 |
| 17 | `callout_box` | 핵심 결론/주의사항 강조 |
| 18 | `ticker_board` | 주식·지수·환율 현황판 |
| 19 | `icon_grid` | 이모지+텍스트 그리드 |
| 20 | `percentage_bar` | 가로 비율 막대 차트 |
| 21 | `dual_stat` | 두 숫자 나란히 강조 |
| 22 | `scenario_card` | A/B/C 시나리오 카드 |
| 23 | `split_screen` | Before/After 좌우 분할 |
| 24 | `world_stats` | 국가별 데이터 (국기+수치) |
| 25 | `gauge_meter` | 반원형 게이지 (공포탐욕지수 등) |
| 26 | `donut_chart` | 도넛 파이 차트 |
| 27 | `alert_banner` | 긴급 속보 배너 |
| 28 | `myth_vs_fact` | 오해 vs 사실 대결 |
| 29 | `checklist` | 투자 체크리스트 |
| 30 | `trend_arrow` | 상승/하락 트렌드 방향성 |
| 31 | `vs_battle` | 두 국가·세력 대결 |
| 32 | `pyramid_chart` | 계층 피라미드 |
| 33 | `interview_card` | Q&A 인터뷰 형식 |
| 34 | `warning_card` | 위험 경고 카드 |
| 35 | `price_history` | 가격 변동 히스토리 |
| 36 | `funnel_chart` | 단계별 감소 깔때기 |
| 37 | `calendar_event` | 주요 경제 일정 카드 |
| 38 | `bubble_compare` | 버블 크기 비교 |
| 39 | `key_takeaway` | 핵심 요약 정리 박스 |
| 40 | `stock_card` | 개별 종목 상세 카드 |
| 41 | `line_chart` | 꺾은선 차트 (시간 추이/추세) |
| 42 | `heat_map` | 섹터·종목별 히트맵 (색상 격자) |
| 43 | `quote_vs` | 두 전문가 의견 대결 |
| 44 | `stacked_bar` | 누적 막대 차트 |
| 45 | `swot_card` | SWOT 분석 2x2 그리드 |
| 46 | `target_price` | 목표가 vs 현재가 카드 |
| 47 | `sector_board` | 업종별 등락 현황판 |
| 48 | `mini_profile` | 인물·기관 프로필 카드 |
| 49 | `data_counter` | 숫자 카운트업 애니메이션 |
| 50 | `highlight_quote` | 핵심 문장 대형 강조 |
| 51 | `radar_chart` | 레이더 차트 (종합 평가 5각형) |
| 52 | `tree_map` | 트리맵 (비중 시각화) |
| 53 | `countdown` | D-day 카운트다운 |
| 54 | `matrix_grid` | 2x2 포지셔닝 매트릭스 |
| 55 | `before_after` | 전후 수치 비교 |
| 56 | `big_text` | 임팩트 한 줄 텍스트 |
| 57 | `waterfall_chart` | 워터폴 차트 (증감 분해) |
| 58 | `risk_scale` | 5단계 위험도 스케일 |
| 59 | `relation_map` | 관계/연결 네트워크 |
| 60 | `milestone` | 목표 대비 달성도 |
| 61 | `news_ticker` | 뉴스 티커 (슬라이드 목록) |
| 62 | `emoji_scale` | 이모지 평가 척도 |
| 63 | `horizontal_bar` | 가로 막대 차트 |
| 64 | `gradient_stat` | 그라데이션 통계 카드 |
| 65 | `area_chart` | 영역 차트 (다중 시리즈) |
| 66 | `value_chain` | 밸류체인/공급망 흐름도 |
| 67 | `stock_pick` | 다종목 추천 리스트 |
| 68 | `domino_effect` | 도미노 연쇄 효과 |
| 69 | `history_pattern` | 역사적 패턴 반복 비교 |
| 70 | `sentiment_bar` | 매수/매도 센티멘트 바 |
| 71 | `strategy_card` | 투자 전략 DO/DON'T |
| 72 | `tech_stack` | 기술 스택/구조 분해도 |
| 73 | `event_impact` | 이벤트 → 시장 충격 반응 |
| 74 | `psychology_card` | 투자 심리 편향 카드 |
| 75 | `debate_card` | 발언+반박 논쟁 카드 |
| 76 | `money_flow` | 자금 흐름 다이어그램 |
| 77 | `scale_compare` | 규모 직관적 비교 |
| 78 | `career_timeline` | 인물 연대기 |
| 79 | `price_impact` | 가격 변동 극적 강조 |
| 80 | `structure_diagram` | 구조/공간 설명도 |
| 81 | `argument_card` | 데이터 기반 찬반 논쟁 |
| 82 | `mechanism` | 단계별 메커니즘 교육 |

### visual_query 작성 규칙 (Veo 3.1 Fast 배경 영상)

모든 씬에 `visual_query` 필드를 작성하세요. Veo 3.1 Fast로 배경 영상을 생성합니다.

- **3개 씬이 1개 영상을 공유**: scene_id 0,1,2 → 영상1 / scene_id 3,4,5 → 영상2 / ...
- 따라서 **3의 배수 scene_id(0, 3, 6, 9, ...)에만** 상세 visual_query 작성, 나머지는 같은 그룹의 query 복사
- **영어로 작성**: 상세한 영상 묘사 프롬프트 (짧은 키워드 아님)
- **특정 인물 이름 금지**: "Jerome Powell" 대신 "an elderly man in a suit at a podium" 식으로
- **60fps, 720p, 16:9, 4초** 영상 생성
- 스타일: 시네마틱, 슬로우 모션, 추상적 배경 영상에 적합한 프롬프트

예시:
```json
"visual_query": "Cinematic slow-motion shot of global stock market trading floor with digital screens showing charts and numbers, blue and teal color grading, shallow depth of field, 4K quality"
```
```json
"visual_query": "Abstract aerial view of a modern city skyline at dusk with glowing lights reflecting on water, smooth camera pan, cinematic color palette with teal and dark tones"
```

### 3단계: 장면별 visual_type 선택

narration 내용을 기준으로 아래 결정 트리를 따르세요:

```
나레이션에 숫자/통계가 핵심인가?
  ├─ 숫자 하나가 임팩트 → number_highlight
  └─ 통계 + 부연 설명 → stat_card

나레이션이 "N가지 이유/방법/특징"인가?
  └─ bullet_list (items에 ①②③ 번호 직접 포함)

나레이션이 시간순 변화를 설명하는가?
  └─ timeline

나레이션이 두 가지를 대비/비교하는가?
  └─ comparison

나레이션이 개념/용어를 처음 소개하는가?
  └─ keyword

나레이션이 데이터 추이를 보여줘야 하는가?
  └─ chart

나레이션이 전문가/유명인의 발언을 인용하는가?
  └─ quote_card (파월, 버핏, IMF 등 발언)

나레이션이 A→B→C 연쇄 인과관계를 설명하는가?
  └─ flow_diagram (금리↑→대출비용↑→소비↓ 등)

나레이션이 관련 뉴스 여러 개를 소개하는가?
  └─ news_feed (헤드라인 목록)

나레이션이 단계별 방법/절차를 설명하는가?
  └─ step_flow (투자 방법, 신청 절차 등)

나레이션이 여러 항목을 표 형식으로 비교하는가?
  └─ table_data (국가별, 상품별, ETF 비교 등)

나레이션이 장단점을 동시에 설명하는가?
  └─ pros_cons (ETF 장단점, 정책 장단점 등)

나레이션이 순위/랭킹을 설명하는가?
  └─ ranking_list (수익률 Top 5, GDP 순위 등)

나레이션이 결론/핵심 메시지/주의사항을 강조하는가?
  └─ callout_box (type: info/warning/success/insight)

나레이션이 주식·지수·환율 현재 시세를 보여주는가?
  └─ ticker_board (종목별 가격·등락률 현황판)

나레이션이 4~6개 항목을 아이콘과 함께 소개하는가?
  └─ icon_grid (이모지+텍스트 그리드, bullet_list 대안)

나레이션이 비율/점유율을 설명하는가?
  └─ percentage_bar (가로 막대 비율 차트, 포트폴리오·여론조사)

나레이션이 두 지표를 동등하게 크게 강조하는가?
  └─ dual_stat (두 숫자 나란히, stat_card와 다름)

나레이션이 2~3가지 시나리오/경우를 설명하는가?
  └─ scenario_card (A/B/C 시나리오 카드)

나레이션이 전/후, 이전/이후를 대비하는가?
  └─ split_screen (Before→After 좌우 분할)

나레이션이 여러 나라의 데이터를 비교하는가?
  └─ world_stats (국기 이모지 + 국가별 수치)

나레이션이 공포탐욕지수·경기 온도·위험 수준 등 0~100 스케일 지표를 보여주는가?
  └─ gauge_meter (반원형 게이지, 존별 색상)

나레이션이 포트폴리오 구성·비중·점유율을 시각적으로 보여주는가?
  └─ donut_chart (도넛 파이 차트, 항목별 색상)

나레이션이 긴급 속보·중요 발표·경보를 강조하는가?
  └─ alert_banner (BREAKING 배너, 깜빡임 효과)

나레이션이 잘못 알려진 통념과 실제 사실을 대비하는가?
  └─ myth_vs_fact (오해 vs 사실 대결)

나레이션이 투자 전 확인할 조건·요건·체크항목을 나열하는가?
  └─ checklist (✅/❌ 체크리스트)

나레이션이 특정 지표의 상승·하락 추세를 방향성 있게 강조하는가?
  └─ trend_arrow (화살표 + from→to 값)

나레이션이 두 국가·기업·세력을 통계와 함께 대결 구도로 설명하는가?
  └─ vs_battle (좌우 대결 카드)

나레이션이 계층·위계·우선순위를 피라미드 구조로 설명하는가?
  └─ pyramid_chart (위에서 아래로 레벨)

나레이션이 전문가·분석가의 견해를 Q&A 형식으로 전달하는가?
  └─ interview_card (질문+답변+발언자)

나레이션이 투자 위험·리스크·최악 시나리오를 경고하는가?
  └─ warning_card (level: caution/danger/critical)

나레이션이 특정 자산의 과거 가격 변동 이력을 설명하는가?
  └─ price_history (날짜+가격+이벤트 타임라인)

나레이션이 단계별로 수치가 줄어드는 과정을 설명하는가?
  └─ funnel_chart (단계별 감소 깔때기)

나레이션이 앞으로 예정된 주요 경제 일정·이벤트를 소개하는가?
  └─ calendar_event (날짜+이벤트+예상치)

나레이션이 여러 항목의 규모·크기를 직관적으로 비교하는가?
  └─ bubble_compare (버블 크기 비교)

나레이션이 영상의 핵심 메시지·결론·투자 포인트를 정리하는가?
  └─ key_takeaway (이모지+포인트+최종 결론)

나레이션이 특정 종목의 현재 주가·지표를 상세하게 보여주는가?
  └─ stock_card (티커+가격+등락+세부 지표)

나레이션이 시계열 추이·꺾은선 그래프가 필요한가?
  └─ line_chart (시간 추이 꺾은선)

나레이션이 섹터·종목별 강약을 한눈에 보여주는가?
  └─ heat_map (색상 격자 히트맵)

나레이션이 두 전문가 의견을 대비하는가?
  └─ quote_vs (의견 대결 카드)

나레이션이 항목별 구성 비중을 누적으로 보여주는가?
  └─ stacked_bar (누적 막대 차트)

나레이션이 SWOT 분석 형태로 4가지를 설명하는가?
  └─ swot_card (강점/약점/기회/위협 2x2)

나레이션이 목표가와 현재가를 비교하는가?
  └─ target_price (목표가 vs 현재가)

나레이션이 업종별 등락을 현황판으로 보여주는가?
  └─ sector_board (섹터 현황)

나레이션이 특정 인물·기관을 소개하는가?
  └─ mini_profile (프로필 카드)

나레이션이 숫자가 카운트업되는 효과가 필요한가?
  └─ data_counter (카운트 애니메이션)

나레이션이 핵심 문장 하나를 크게 강조하는가?
  └─ highlight_quote (대형 인용)

나레이션이 여러 지표를 종합 평가하는가?
  └─ radar_chart (5각형 레이더)

나레이션이 비중/점유율을 면적으로 보여줘야 하는가?
  └─ tree_map (트리맵)

나레이션이 D-day·남은 기간을 카운트하는가?
  └─ countdown (D-day)

나레이션이 2x2 매트릭스로 포지셔닝하는가?
  └─ matrix_grid (포지셔닝 매트릭스)

나레이션이 정책/지표의 전후 변화를 보여주는가?
  └─ before_after (전후 비교)

나레이션이 한 줄 임팩트 메시지로 끝나는가?
  └─ big_text (대형 텍스트)

나레이션이 증감 분해를 보여주는가?
  └─ waterfall_chart (워터폴)

나레이션이 위험도·등급을 스케일로 보여주는가?
  └─ risk_scale (5단계 스케일)

나레이션이 여러 주체의 관계·연결을 설명하는가?
  └─ relation_map (네트워크)

나레이션이 목표 대비 달성률을 보여주는가?
  └─ milestone (달성도)

나레이션이 뉴스 헤드라인을 티커 형태로 보여주는가?
  └─ news_ticker (슬라이딩 뉴스)

나레이션이 감정/평가를 이모지 스케일로 보여주는가?
  └─ emoji_scale (이모지 척도)

나레이션이 가로 막대 비교를 보여주는가?
  └─ horizontal_bar (가로 막대)

나레이션이 통계 수치를 세련되게 강조하는가?
  └─ gradient_stat (그라데이션 카드)

나레이션이 다중 시리즈 영역을 보여주는가?
  └─ area_chart (영역 차트)

나레이션이 공급망·밸류체인을 설명하는가?
  └─ value_chain (밸류체인 흐름도)

나레이션이 여러 종목을 추천/소개하는가?
  └─ stock_pick (다종목 리스트)

나레이션이 연쇄 효과·도미노를 설명하는가?
  └─ domino_effect (연쇄 효과)

나레이션이 과거 패턴과 현재를 비교하는가?
  └─ history_pattern (역사 패턴)

나레이션이 매수/매도 심리를 보여주는가?
  └─ sentiment_bar (센티멘트 바)

나레이션이 투자 전략 DO/DON'T를 설명하는가?
  └─ strategy_card (전략 카드)

나레이션이 사업·기술 구조를 계층별로 분해하는가?
  └─ tech_stack (구조 분해도)

나레이션이 특정 이벤트의 시장 반응을 보여주는가?
  └─ event_impact (이벤트 충격)

나레이션이 투자 심리·편향을 설명하는가?
  └─ psychology_card (심리 편향 카드)

나레이션이 발언과 반박을 대비하는 논쟁 구조인가?
  └─ debate_card (발언+반박 논쟁)

나레이션이 자금·돈의 흐름을 추적하는가?
  └─ money_flow (자금 흐름 다이어그램)

나레이션이 규모·크기를 직관적으로 비교하는가?
  └─ scale_compare (규모 비교)

나레이션이 특정 인물의 경력·이력을 연대순으로 설명하는가?
  └─ career_timeline (인물 연대기)

나레이션이 가격 변동의 극적인 영향을 강조하는가?
  └─ price_impact (가격 변동 극적 강조)

나레이션이 조직·건물·시스템의 구조를 설명하는가?
  └─ structure_diagram (구조/공간 설명도)

나레이션이 데이터를 근거로 찬반 논쟁을 전개하는가?
  └─ argument_card (데이터 기반 찬반)

나레이션이 단계별 메커니즘·원리를 교육하는가?
  └─ mechanism (단계별 메커니즘)

위 어디에도 해당 안 됨?
  └─ keyword (가장 범용적)
```

### 4단계: visual_data 작성 규칙

**stat_card**
```json
{
  "big_number": "5.25%",
  "big_label": "미국 기준금리 (2024년 7월)",
  "card_title": "동결 유지 중",
  "card_items": ["PCE 인플레이션 2.7% (목표 2% 초과)", "FOMC 위원 의견 분분"]
}
```
⚠️ card_items 각 항목은 반드시 20자 이하로 작성 (화면 잘림 방지)

**bullet_list**
```json
{
  "title": "금리 인상이 주가에 악재인 3가지 이유",
  "items": [
    "① 기업 대출 비용 증가 → 이익 감소",
    "② 채권·예금 수익률 상승 → 주식 매력 하락",
    "③ 미래 이익 현재가치 하락 → 성장주·테크주 직격탄"
  ]
}
```
⚠️ items 배열에 반드시 ①②③ 번호를 텍스트에 직접 포함할 것 (컴포넌트가 번호를 별도 추가하면 중복 발생)

**keyword**
```json
{
  "keyword": "기준금리",
  "description": "중앙은행이 결정하는 돈의 가격",
  "sub_points": ["높으면 돈 빌리기 비쌈", "낮으면 시장에 돈이 풀림", "연준이 연 8회 FOMC에서 결정"]
}
```
⚠️ description은 반드시 한 줄로 작성 (`\n` 줄바꿈 금지) — 두 줄이 되면 레이아웃 깨짐
⚠️ sub_points는 15자 이하로 간결하게

**timeline**
```json
{
  "title": "미국 기준금리 변화",
  "items": [
    {"label": "2020", "value": "0.25%", "note": "코로나 대응"},
    {"label": "2022", "value": "3.0%", "note": "긴축 시작"},
    {"label": "2023", "value": "5.25%", "note": "정점"},
    {"label": "2026", "value": "3.75%", "note": "현재"}
  ]
}
```

**comparison**
```json
{
  "left_label": "금리 인상",
  "left_color": "#FF6B6B",
  "left_items": ["기업 대출 비용↑", "채권 수익률↑", "성장주 타격"],
  "right_label": "금리 인하",
  "right_color": "#52D68A",
  "right_items": ["기업 이익↑", "주식 매력↑", "소비 증가"]
}
```
⚠️ left/right_items 각 항목은 15자 이하

**number_highlight**
```json
{
  "number": "8",
  "unit": "회",
  "label": "연간 FOMC 회의",
  "description": "매번 전 세계 시장이 긴장하는 순간"
}
```

**chart**
- visual_data: null
- chart_data 배열 사용
- chart_title 필수

**quote_card**
```json
{
  "quote": "금리는 서두르지 않겠다. 데이터가 먼저다",
  "speaker": "제롬 파월",
  "role": "미국 연방준비제도 의장",
  "date": "2024년 3월"
}
```
⚠️ quote는 한두 문장 이내로 (화면에 맞는 길이)
⚠️ date는 선택 항목 (없으면 생략 가능)

**flow_diagram**
```json
{
  "title": "금리 인상이 경제에 미치는 연쇄 효과",
  "steps": [
    {"label": "금리 인상", "note": "연준 결정"},
    {"label": "대출 비용↑", "note": "기업·가계"},
    {"label": "소비·투자↓", "note": "경기 둔화"},
    {"label": "물가 안정", "note": "최종 목표"}
  ]
}
```
⚠️ steps는 3~5개 권장 (너무 많으면 화면 넘침)
⚠️ label은 10자 이내, note는 8자 이내

**news_feed**
```json
{
  "title": "이번 주 주요 경제 뉴스",
  "items": [
    {"category": "속보", "headline": "연준, 기준금리 0.25%p 인하 결정", "sub": "5.00%→4.75%"},
    {"category": "시장", "headline": "나스닥 +2.1% 급등, 기술주 강세"},
    {"category": "경제", "headline": "미국 실업률 4.1%, 예상치 부합"}
  ]
}
```
⚠️ category는 한 단어: 속보/분석/시장/경제/기업/글로벌/주식/환율/금리 중 선택
⚠️ items는 3~5개 권장
⚠️ sub는 선택 항목

**step_flow**
```json
{
  "title": "ETF 투자 시작하는 3단계",
  "steps": [
    {"step": "1", "title": "증권사 계좌 개설", "description": "국내 주요 증권사 앱에서 10분 안에 개설 가능"},
    {"step": "2", "title": "ETF 종목 선택", "description": "S&P500, 나스닥 등 지수 추종 ETF 추천"},
    {"step": "3", "title": "분산 매수 시작", "description": "매월 일정 금액 정기 매수로 리스크 분산"}
  ]
}
```
⚠️ steps는 3~4개 권장
⚠️ description은 30자 이내로 간결하게

**table_data**
```json
{
  "title": "주요국 기준금리 현황",
  "headers": ["국가", "기준금리", "최근 변동"],
  "rows": [
    ["🇺🇸 미국", "4.75%", "▼0.25%p 인하"],
    ["🇪🇺 유럽", "3.50%", "▼0.25%p 인하"],
    ["🇯🇵 일본", "0.25%", "▲0.15%p 인상"]
  ],
  "highlight_col": 1
}
```
⚠️ headers는 3~4개 권장
⚠️ rows는 3~6행 권장
⚠️ highlight_col: 강조할 열 인덱스 (0부터 시작, 기본값 1)

**pros_cons**
```json
{
  "title": "ETF 투자 장단점",
  "pros_label": "장점",
  "cons_label": "단점",
  "pros": ["분산 투자 자동화", "낮은 수수료", "유동성 높음"],
  "cons": ["개별 선택 불가", "시장 하락 시 손실", "배당 불규칙"]
}
```
⚠️ pros/cons는 각 3~4개 권장, 항목당 20자 이내

**ranking_list**
```json
{
  "title": "2024년 ETF 수익률 TOP 5",
  "unit": "%",
  "items": [
    {"rank": 1, "name": "KODEX 미국나스닥100", "value": "+38.2", "change": null},
    {"rank": 2, "name": "TIGER 미국S&P500",    "value": "+27.4", "change": null},
    {"rank": 3, "name": "KODEX 반도체",        "value": "+24.1", "change": null}
  ]
}
```
⚠️ items는 3~7개 권장 (1~3위는 자동으로 메달 표시)
⚠️ change는 전일 대비 변동 (없으면 null)

**callout_box**
```json
{
  "type": "insight",
  "label": "핵심 결론",
  "message": "지금은 분산 투자가 가장 안전한 접근인 것 같아요",
  "sub": "단기 변동성보다 장기 복리 관점이 훨씬 중요해요"
}
```
⚠️ type: "info"(💡), "warning"(⚠️), "success"(✅), "insight"(🔍)
⚠️ message는 한두 문장 이내로
⚠️ sub는 선택 항목

**ticker_board**
```json
{
  "title": "오늘의 주요 시장 현황",
  "date": "2024년 3월 20일 기준",
  "items": [
    {"symbol": "KOSPI",   "name": "코스피 지수",   "price": "2,650",  "change": "+18.3",  "change_pct": "+0.70%"},
    {"symbol": "NASDAQ",  "name": "나스닥 종합",   "price": "16,384", "change": "+124.5", "change_pct": "+0.77%"},
    {"symbol": "USD/KRW", "name": "달러/원 환율", "price": "1,330원", "change": "-5.2",   "change_pct": "-0.39%"}
  ]
}
```
⚠️ items는 3~6개 권장
⚠️ change/change_pct는 +/- 부호 반드시 포함 (색상 자동 적용)

**gauge_meter**
```json
{
  "value": 22,
  "label": "시장 공포탐욕 지수",
  "unit": "/ 100",
  "description": "극단적 공포 구간 — 역사적으로 매수 기회"
}
```
⚠️ value는 0~100 범위 (기본 존: 극단공포/공포/중립/탐욕/극단탐욕 자동 표시)

**donut_chart**
```json
{
  "title": "전쟁 시 수혜 포트폴리오",
  "center_text": "안전자산",
  "center_sub": "비중 전략",
  "segments": [
    {"label": "방산주", "value": 35},
    {"label": "에너지", "value": 25},
    {"label": "금·은", "value": 20},
    {"label": "미국채", "value": 15},
    {"label": "현금", "value": 5}
  ]
}
```

**alert_banner**
```json
{
  "type": "breaking",
  "headline": "미 국방부, 이란 핵시설 타격 옵션 검토 중",
  "sub_text": "백악관은 아직 최종 결정 내리지 않았다고 밝혀",
  "source": "로이터통신",
  "time": "2025.03.28"
}
```
⚠️ type: "breaking"(🔴), "warning"(⚠️), "update"(📢), "alert"(🚨)

**myth_vs_fact**
```json
{
  "topic": "전쟁과 주식시장",
  "myth": "전쟁이 나면 주식시장은 무조건 폭락한다",
  "fact": "역사적으로 전쟁 발발 후 6개월 이내 반등한 경우가 더 많다",
  "myth_label": "❌ 오해",
  "fact_label": "✅ 실제 데이터"
}
```

**checklist**
```json
{
  "title": "지금 주식 사도 될까? 체크리스트",
  "items": [
    {"text": "전쟁 확전 리스크 진정 신호 있음", "checked": false},
    {"text": "공포탐욕지수 30 이하", "checked": true, "note": "현재 22 수준"},
    {"text": "연준 금리 인하 기대감 존재", "checked": true}
  ]
}
```

**trend_arrow**
```json
{
  "metric": "WTI 원유 가격",
  "direction": "up",
  "from_value": "$72",
  "to_value": "$94",
  "period": "최근 3개월",
  "change": "+$22 (+30.6%)",
  "insight": "중동 긴장 고조로 공급 차질 우려 반영"
}
```
⚠️ direction: "up"(녹색), "down"(빨강), "sideways"(주황)

**vs_battle**
```json
{
  "topic": "군사력 직접 비교",
  "left": {
    "name": "미국", "flag": "🇺🇸",
    "stats": [
      {"label": "국방비", "value": "$8,860억"},
      {"label": "병력", "value": "135만 명"}
    ]
  },
  "right": {
    "name": "이란", "flag": "🇮🇷",
    "stats": [
      {"label": "국방비", "value": "$100억"},
      {"label": "병력", "value": "52만 명"}
    ]
  },
  "verdict": "재래식 전력 30:1 차이"
}
```

**pyramid_chart**
```json
{
  "title": "전쟁 리스크 수혜 자산 피라미드",
  "subtitle": "위험 회피 강도 순서",
  "levels": [
    {"label": "금·달러", "description": "전쟁 시 무조건 상승"},
    {"label": "미국채·엔화", "description": "금리 하락 기대"},
    {"label": "방산·에너지주", "description": "직접 수혜 섹터"},
    {"label": "성장주·신흥국", "description": "가장 큰 하락 압력"}
  ]
}
```
⚠️ levels는 위(꼭대기)→아래(밑변) 순서, 3~6개 권장

**interview_card**
```json
{
  "question": "지금 개인 투자자는 어떻게 봐야 할까요?",
  "answer": "리스크를 인정하고 포지션 축소를 검토하되, 패닉셀은 피하는 게 좋아요. 현금 비중 20에서 30% 정도가 합리적인 것 같아요.",
  "speaker": "김영익",
  "role": "서강대 경제학과 교수",
  "avatar": "🎓",
  "interviewer": "시청자 질문"
}
```
⚠️ `interviewer` 필드에 "Q · 시청자 질문" 형식 금지 → "시청자 질문"처럼 레이블만 작성
  (컴포넌트가 interviewer 값을 그대로 표시, "Q"를 별도로 앞에 붙이지 않음)

**warning_card**
```json
{
  "title": "이란 전쟁 시 최악 시나리오 리스크",
  "level": "danger",
  "items": [
    "호르무즈 해협 봉쇄 → 원유 공급 20% 차단",
    "유가 $150 돌파 → 글로벌 스태그플레이션",
    "코스피 2,000p 이하 하락 가능성"
  ],
  "disclaimer": "시나리오 분석이며 투자 권유가 아닙니다"
}
```
⚠️ level: "caution"(주황), "danger"(빨강), "critical"(빨강+깜빡임)

**price_history**
```json
{
  "asset": "코스피 지수",
  "unit": "포인트",
  "trend": "down",
  "history": [
    {"date": "2024.10", "price": "2,600", "event": "중동 긴장 고조"},
    {"date": "2024.12", "price": "2,400", "change": "-7.7%"},
    {"date": "2025.03", "price": "2,350", "change": "-5.2%", "event": "파병설 확산"}
  ]
}
```
⚠️ trend: "up"(녹색), "down"(빨강), "mixed"(티파니)

**funnel_chart**
```json
{
  "title": "전쟁 충격이 주식시장에 전달되는 경로",
  "stages": [
    {"label": "지정학 리스크 발생", "value": 100},
    {"label": "유가·원자재 급등", "value": 80},
    {"label": "기업 이익 감소", "value": 55},
    {"label": "주가 하락 압력", "value": 40},
    {"label": "실제 주가 하락", "value": 25, "note": "정책 지원으로 완충"}
  ]
}
```

**calendar_event**
```json
{
  "month": "2025년 4월 주요 일정",
  "events": [
    {"date": "4/9", "event": "FOMC 의사록 공개", "importance": "high", "expected": "금리 동결"},
    {"date": "4/16", "event": "미국 소매판매 지표", "importance": "medium"},
    {"date": "4/23", "event": "UN 안보리 이란 제재 표결", "importance": "high"}
  ]
}
```
⚠️ importance: "high"(빨강), "medium"(주황), "low"(티파니)

**bubble_compare**
```json
{
  "title": "중동 산유국 원유 생산량 비교",
  "unit": "만 배럴/일",
  "items": [
    {"label": "사우디", "value": 1200, "display": "1,200만"},
    {"label": "이라크", "value": 450, "display": "450만"},
    {"label": "이란", "value": 340, "display": "340만", "note": "제재 하"}
  ]
}
```
⚠️ value는 비례 크기 계산용 숫자, display는 화면 표시 텍스트

**key_takeaway**
```json
{
  "title": "오늘의 핵심 정리",
  "points": [
    {"emoji": "🎯", "text": "전쟁 리스크는 단기 충격이지만 장기 추세를 바꾸지 않아요"},
    {"emoji": "🛡️", "text": "금·달러·방산주로 포트폴리오 헤지 고려해볼 만해요"},
    {"emoji": "⏳", "text": "최악 시나리오 대비는 필요하지만 패닉셀은 피하는 게 나아요"}
  ],
  "conclusion": "불확실성이 클수록 분산투자와 현금 비중 관리가 핵심이라고 봐요"
}
```

**stock_card**
```json
{
  "ticker": "LMT",
  "name": "록히드 마틴",
  "price": "468.20",
  "change": "+12.40",
  "change_pct": "+2.72%",
  "currency": "$",
  "pe": "17.2x",
  "market_cap": "$1,220억",
  "sector": "방산·항공",
  "week_high": "$498.00",
  "logo": "✈️"
}
```
⚠️ change에 +/- 부호 포함 (색상 자동 결정)

**value_chain**
```json
{
  "title": "반도체 밸류체인 흐름",
  "steps": [
    {"label": "설계", "detail": "ARM, 퀄컴", "icon": "📐"},
    {"label": "소재", "detail": "ASML, 도쿄일렉트론", "icon": "🧪"},
    {"label": "생산", "detail": "TSMC, 삼성", "icon": "🏭"},
    {"label": "패키징", "detail": "ASE, 앰코", "icon": "📦"},
    {"label": "완제품", "detail": "애플, 엔비디아", "icon": "💻"}
  ]
}
```
⚠️ steps는 3~6개 권장, label 6자 이내, detail 15자 이내

**stock_pick**
```json
{
  "title": "AI 수혜 종목 TOP 3",
  "picks": [
    {"ticker": "NVDA", "name": "엔비디아", "price": "$890", "change_pct": "+180%", "reason": "AI 칩 독점"},
    {"ticker": "MSFT", "name": "마이크로소프트", "price": "$420", "change_pct": "+28%", "reason": "OpenAI 투자"},
    {"ticker": "TSM", "name": "TSMC", "price": "$155", "change_pct": "+45%", "reason": "파운드리 1위"}
  ],
  "disclaimer": "투자 권유 아님"
}
```
⚠️ picks는 3~5개 권장, reason은 10자 이내

**domino_effect**
```json
{
  "title": "미국 금리 인상의 연쇄 효과",
  "dominoes": [
    {"label": "금리 인상", "icon": "🏦"},
    {"label": "달러 강세", "icon": "💵"},
    {"label": "신흥국 자금 유출", "icon": "📉"},
    {"label": "원화 약세", "icon": "🇰🇷"},
    {"label": "수입물가 상승", "icon": "🛒"}
  ]
}
```
⚠️ dominoes는 3~6개, label 10자 이내

**history_pattern**
```json
{
  "title": "과거 금리 인상기 vs 현재",
  "patterns": [
    {"period": "2004~2006", "event": "그린스펀 긴축", "result": "이후 서브프라임 위기", "market": "-55%"},
    {"period": "2015~2018", "event": "옐런/파월 긴축", "result": "2018말 급락 후 반등", "market": "-20%"},
    {"period": "2022~현재", "event": "파월 긴축", "result": "진행 중", "market": "?"}
  ],
  "insight": "역사적으로 긴축 끝에는 항상 충격이 있었어요"
}
```

**sentiment_bar**
```json
{
  "title": "개인 투자자 센티멘트",
  "bullish": 35,
  "bearish": 45,
  "neutral": 20,
  "source": "AAII 설문조사",
  "date": "2025년 3월"
}
```
⚠️ bullish + bearish + neutral = 100

**strategy_card**
```json
{
  "title": "지금 시장 대응 전략",
  "do_list": ["현금 비중 20~30% 유지", "방산·에너지 분산 투자", "적립식 매수 지속"],
  "dont_list": ["패닉셀로 전량 매도", "레버리지 ETF 올인", "루머로 단타 매매"],
  "summary": "불확실성 높을수록 원칙 투자가 답이에요"
}
```

**tech_stack**
```json
{
  "title": "테슬라 사업 구조 분해",
  "layers": [
    {"label": "자동차", "detail": "Model 3/Y/S/X", "pct": 80},
    {"label": "에너지", "detail": "파워월, 메가팩", "pct": 10},
    {"label": "서비스", "detail": "충전, 보험, FSD", "pct": 7},
    {"label": "기타", "detail": "로보택시, 옵티머스", "pct": 3}
  ]
}
```
⚠️ layers 3~5개, pct 합계 100

**event_impact**
```json
{
  "event": "미국 CPI 예상 상회",
  "date": "2025년 3월 12일",
  "impacts": [
    {"target": "S&P500", "reaction": "-2.1%", "direction": "down"},
    {"target": "달러 인덱스", "reaction": "+1.8%", "direction": "up"},
    {"target": "금 가격", "reaction": "+0.5%", "direction": "up"},
    {"target": "미국 10년물", "reaction": "4.52%", "direction": "up"}
  ]
}
```
⚠️ direction: "up"(녹색), "down"(빨강)

**psychology_card**
```json
{
  "bias": "손실 회피 편향",
  "description": "이익의 기쁨보다 손실의 고통을 2배 더 크게 느끼는 심리",
  "example": "10% 수익보다 5% 손실에 더 민감하게 반응",
  "tip": "매도 기준을 미리 정해두면 감정적 판단을 줄일 수 있어요",
  "icon": "🧠"
}
```

### 5단계: JSON 출력

반드시 아래 형식의 JSON만 출력하세요 (코드블록, 다른 텍스트 없이 순수 JSON):

```json
{
  "title": "영상 제목 (클릭을 유도하는 제목, 30자 이내)",
  "hook": "인트로 카드 부제목 — 시청자 호기심을 자극하는 한 문장",
  "scenes": [
    {
      "scene_id": 0,
      "type": "intro",
      "duration_seconds": 5.0,
      "narration": "안녕하세요 여러분! 오늘은...",
      "visual_type": "intro_card",
      "visual_data": {"title": "영상 제목", "subtitle": "한 줄 부제목"},
      "visual_query": "Cinematic aerial shot of a modern financial district at night with glowing blue lights...",
      "chart_data": null,
      "chart_title": null
    }
  ],
  "total_duration_seconds": 180.0,
  "tags": ["태그1", "태그2", "태그3"]
}
```

**장면 구성 규칙:**
- scene_id 0: 반드시 `type: "intro"`, `visual_type: "intro_card"`
- 마지막 scene: 반드시 `type: "outro"`, `visual_type: "outro_card"`, `duration_seconds: 5.0`
- content 장면: 최소 30개, 최대 50개 (많을수록 좋음 — 10분 영상 목표)
- 각 content 장면 duration: 10~20초 (narration 길이에 맞게 조정)
- total_duration_seconds = 모든 scene duration의 합계 (목표: 580~650초)

## 실행 방법

1. 위 프로세스대로 JSON 대본을 생성하세요
2. 새 workspace 디렉토리를 만드세요:
   ```bash
   python3 -c "import uuid; print(str(uuid.uuid4())[:8])"
   ```
3. 생성된 ID로 디렉토리 생성 및 JSON 저장:
   ```bash
   mkdir -p /home/user/workspaces/youtube/workspace/<ID>
   ```
4. script.json 파일로 저장하세요 (Python 없이 Write 툴 직접 사용)
5. 대본 요약을 사용자에게 표시하세요:
   - 제목, 훅, 총 길이
   - 장면 목록 (번호 / visual_type / 나레이션 앞 40자)
6. 안내: "대본이 괜찮으면 `/make-audio <ID>` 로 음성 생성을 진행하세요"
