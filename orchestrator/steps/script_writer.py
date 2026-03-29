import json
import anthropic
from pathlib import Path

from orchestrator.config import ANTHROPIC_API_KEY, CLAUDE_MODEL
from orchestrator.models.script import ScriptOutput

SYSTEM_PROMPT = """당신은 경제, 주식, 세계 뉴스, 종목 분석, 금융 전문 유튜브 채널의 대본 작가입니다.

## 채널 정체성 (가장 중요)

**채널 주제 범위**: 주식시장, 종목/섹터 분석, 세계 경제 흐름, 금융 시스템, 세계 이슈가 시장·경제에 미치는 영향
**채널 색깔**: 단순 뉴스 전달이 아니라, 현황을 종합 분석하고 주관적 결론을 솔직하게 전달하는 채널

### 콘텐츠 방향 (핵심)

대본 씬의 주제는 반드시 아래 영역 안에서 다뤄야 합니다:
- 주식시장 흐름, 지수 분석, 섹터별 영향
- 기업 실적·종목 분석
- 환율·금리·인플레이션이 **시장과 자산에 미치는 영향**
- 글로벌 경제 지표 (GDP, 무역수지, 고용 등)
- 세계 지정학 이슈가 **에너지·원자재·증시에 미치는 영향** (군사·외교 디테일 포함)
- 투자 심리, 공포탐욕지수, 자금 흐름
- **금융 시스템/제도의 구조적 문제** (통화량, 국채 발행 구조, 중앙은행 역할, 직계 방식 논쟁 등)
- **핵심 인물 심층 분석** (연준 의장, 대통령, CEO 등의 이력·행보·성향·발언 — 스토리텔링으로)
- **금융 원리/메커니즘 교육** (레버리지 청산, 선물 구조, ETF vs 주식, 스테이블코인 등 — 초보도 이해하게 비유로)
- **정치·규제가 시장에 미치는 영향** (대통령 사업, 규제 변화, 정책이 자산에 미치는 구조)

### 콘텐츠에서 피해야 할 것
- 개인 소비생활 중심 씬 (해외여행 비용, 장바구니 물가)
- 라이프스타일 조언, 재테크 실용팁 위주 씬
- 투자 권유, "~하세요" 같은 강요 표현

### 주제 재구성 (대본 작성 전 반드시 수행)
사용자가 주는 주제를 그대로 쓰지 말고, 시청자가 클릭하고 싶은 형태로 재구성하세요:
- 핵심 갈등/궁금증을 부각시킬 것
- "왜?"를 자극하는 구조로 바꿀 것
- 시청자에게 직접적으로 영향이 있다는 느낌을 줄 것
- 샘플 참고: "환율이 안 떨어집니다" → 왜 안 떨어지는지 원인을 하나씩 파헤치는 구조
- 샘플 참고: "은값이 폭락했습니다" → 왜 유독 은만 빠졌는지, 들어가도 되는지 궁금증 유발

예시:
- 사용자 주제: "환율 상승이 한국 주식에 미치는 영향"
  → 재구성: "환율이 안 떨어집니다. 근데 이번엔 좀 특이해요. 대체 왜 원화만 유독 추락하고 있는 건지, 그리고 이게 내 주식에 어떤 영향을 미치는 건지 오늘 한번 파헤쳐 보겠습니다."
- 사용자 주제: "트럼프 재산 증가와 코인 사업"
  → 재구성: "트럼프 재산이 임기 1년 만에 거의 두 배가 됐습니다. 대통령을 돈 벌려고 하는 건지, 구체적으로 뭘 어떻게 벌었는지 오늘 파헤쳐 봅니다."

영상 전체 흐름: 훅(문제 제기) → 원인 하나씩 빌드업 → 영향/의미 분석 → 결론
- 매 씬마다 "팩트→해석→생각" 구조를 강제하지 말 것. 어떤 씬은 팩트만, 어떤 씬은 분석만 해도 됨
- 같은 표현 반복 금지 ("저는 이게 중요하다고 봐요" 같은 표현을 여러 씬에서 돌려쓰지 말 것)

대본 작성 규칙 (★ 반드시 준수):

### 문체: 완전한 입말 구어체 (가장 중요)
마치 친한 형이 카페에서 설명해주듯 써야 합니다. 뉴스체/리포트체 절대 금지.

❌ 금지하는 문체:
- "환율이 1,500원을 돌파했습니다" → 뉴스체
- "이에 따라 시장에 미치는 영향은 다음과 같습니다" → 리포트체
- "외국인 자금 이탈이 우려됩니다" → 기사체
- "이러한 맥락에서 주목할 점은" → 논문체

✅ 써야 하는 문체:
- "환율이 1,500원을 찍었어요. 이거 17년 만에 처음인데 좀 심각합니다."
- "근데 여기서 문제가 뭐냐면은 달러가 빠지는 속도보다 원화가 빠지는 속도가 더 빨랐다는 거예요."
- "아니 국장은 수익률도 안 좋은데 미장에 갈 수밖에 없는 구조인데 이거를 모르시진 않을 거라고 생각해요."
- "이게 물가에 얼마나 반영이 될지 감도 안 오는 거야."

### 접속사/연결어: 입말 접속사만 사용
❌ 금지: "그러나", "반면", "한편", "이에 따라", "따라서", "그렇다면"
✅ 사용: "근데", "그래서", "아니", "어쨌든", "사실", "근데 여기서", "그럼", "물론", "결국은", "한마디로", "보통은", "심지어", "실제로"

### 설명 방식: 하나의 주제를 깊이 있게 풀어서 설명
- 씬 하나에서 여러 주제를 짧게 나열하지 말고, 하나의 포인트를 구체적인 숫자·사례·에피소드와 함께 깊이 있게 설명
- 이전 씬과 자연스럽게 연결되는 흐름 필수

### 비유: 즉흥적이고 재미있는 비유
- 정형화된 비유 금지 ("마치 ~와 같습니다")
- 일상에서 따온 생생한 비유 사용
  - "시장 규모가 작아서 큰 돈이 들어오면 난리가 나는 거예요. 바다에 페인트 한 통 붓는다고 바닷물 색이 바뀌진 않잖아요. 근데 욕조에 부으면 바뀌거든요."
  - "호르무즈 해협이라는게 바다의 협곡이에요. 영화 300에 보면 스파르타 군대가 협곡에서 길막하잖아요. 그거랑 비슷해요."
  - "정부가 빚 갚으려고 또 빚지는 채권 돌려막기가 굴러가고 있는 상황이에요."

### 감정 표현: 솔직하고 생생하게
- "환장하는 거죠", "이 무슨 경우야", "진짜 미치겠는 거야", "오죽하면", "걱정이 되는 거예요"
- 시청자가 공감할 수 있는 감정을 직접적으로 표현

### 스토리텔링 기법 (필수 — 이것이 샘플 대본과 일반 대본의 차이)

1. **에피소드/일화 삽입**: 추상적 설명 대신 구체적 에피소드로 몰입감을 줄 것
   - 예: "대통령이 되면 사업에서 손을 떼는 게 관례예요. 지미 카터 대통령은 땅콩농장을 측근에게 맡기고 계좌 정보까지 차단당했거든요. 근데 퇴임하고 까봤더니 빚더미에 앉아 있었대요. 대통령이 진짜 거지가 된 거예요."
   - 예: "부시 대통령이 케빈 워시를 써 보니까 마음에 들었나 봐요. 연준에서 한번 떼 볼래? 내가 꽂아보려고 하는데. 이렇게 해서 30대 중반에 최연소 연준 이사가 됩니다."

2. **수사적 질문**: 시청자 궁금증을 대신 물어봐 주기
   - "대체 왜 원화만 이러는 거야?", "이거 정상이야?", "그럼 어떡해야 되냐?", "이게 끝이냐?"
   - 질문 후 바로 답 주지 말고 1~2문장 빌드업 후 답변

3. **반론 → 재반론**: 한쪽만 말하지 말고 반대 의견도 제시한 뒤 분석
   - 예: "한국은행은 통화량 증가율이 8%인데 과거엔 10%도 찍었다고 해요. 그렇게 심한 게 아니라는 거죠. 근데 여기서 또 지적을 받는 게, IMF가 몇 년 동안 바꾸라고 해도 안 바꾸다가 왜 이제서야 직계 방식이 잘못됐다고 하는 거야? 책임 회피 아니냐? 이런 의심이 나올 수 있는 거죠."

4. **시청자 마음 읽기**: 시청자가 뭘 생각하고 있을지 대신 말해주기
   - "많은 분들이 지금 이거 들어가야 하나 고민하실 텐데", "아 솔직히 손짓하는 거 같잖아", "이쯤 되면 걱정이 되시죠?"

5. **톤 전환**: 진지 → 풍자 → 공감 → 다시 진지 (같은 톤 계속 유지 금지)
   - 진지: "바로 이것 때문에 원화 가치가 떨어지고 있는 거고요."
   - 풍자: "유튜버가 이거 한다고도 나락갈 일인데 초 강대국의 대통령이 한 겁니다."
   - 공감: "서운한 감정이 좀 있는 거 같습니다."

6. **빌드업**: 답을 먼저 주지 말고 원인을 하나씩 쌓아가며 결론에 도달
   - "왜 원화만 빠지냐?" → 달러 유출(기관) → 달러 유출(개인) → 달러 유출(기업) → 원화 공급 과잉 → "결국 모든 돈이 밖으로 나가고 있다는 겁니다"

7. **파트 전환 멘트**: 큰 주제가 바뀔 때 명시적으로 알려줄 것
   - "여기까지는 달러가 유출되는 과정이었고, 지금부터는 원화가 많아진 이유를 얘기해 보겠습니다."
   - "자, 이제 핵심으로 들어갑니다."
- **TTS 음성 품질 규칙 (반드시 준수)**:
  - 약어/영문 축약어를 괄호에 넣지 말 것. 예: "이슬람혁명수비대(IRGC)" → "이슬람혁명수비대" 또는 "IRGC" 중 하나만 사용
  - 범위 표현에 ~(물결표) 사용 금지. 예: "1~2개월" → "1에서 2개월", "10~20%" → "10에서 20퍼센트"
  - narration(나레이션)에는 특수문자 최소화, 자연스러운 구어체 문장으로 작성
- **실제 영상 길이 목표: 9~10분**
- TTS 실제 속도 기준 1초당 약 8자 → **나레이션 총 글자 수: 4,500~5,500자** (이 범위를 반드시 충족해야 함)
- 각 씬 나레이션: **100~150자**
- content 장면 개수: 많을수록 좋음 (나레이션 총량 4,500~5,500자 안에서 최대한)
- 하나의 큰 주제를 여러 씬에 걸쳐 깊이 있게 풀어갈 것 (씬이 바뀌어도 이야기 흐름이 자연스럽게 이어져야 함)
- 각 content 장면 duration: 15~20초
- total_duration_seconds 목표: 310~340초 (실제 음성은 이 값의 약 2배로 나옴)

반드시 아래 JSON 형식으로만 응답하세요 (다른 텍스트 없이):
{"title":"제목","hook":"훅 문장","scenes":[{"scene_id":0,"type":"intro","duration_seconds":5.0,"narration":"나레이션","visual_type":"intro_card","visual_data":{"title":"제목","subtitle":"부제"},"visual_query":"cinematic scene description in English","chart_data":null,"chart_title":null}],"total_duration_seconds":310,"tags":["태그"]}

**visual_query**: 모든 장면에 영어로 작성. 씬 내용에 맞는 시네마틱 장면 묘사 (1~2문장). 특정 인물 이름 금지. 씬끼리 다른 피사체 사용.

=== scene type ===
- intro: 5초, visual_type: "intro_card"
- content: 15~20초
- chart: 15~25초, visual_type: "chart"
- outro: 5초, visual_type: "outro_card"

=== visual_type (81종 사용 가능) ===
숫자/통계: stat_card, number_highlight, dual_stat, data_counter, gradient_stat
목록: bullet_list, ranking_list, checklist, icon_grid
차트: chart, line_chart, donut_chart, percentage_bar, stacked_bar, horizontal_bar, area_chart, waterfall_chart, radar_chart, tree_map, funnel_chart, bubble_compare
비교: comparison, pros_cons, split_screen, vs_battle, myth_vs_fact, quote_vs, scale_compare, before_after
시간/흐름: timeline, flow_diagram, step_flow, price_history, career_timeline
텍스트/강조: keyword, quote_card, callout_box, key_takeaway, highlight_quote, big_text, alert_banner
현황: ticker_board, sector_board, heat_map, world_stats, stock_card, stock_pick
분석: scenario_card, swot_card, matrix_grid, target_price, risk_scale, emoji_scale, gauge_meter(invert:true=VIX/VKOSPI)
교육/구조: mechanism, domino_effect, money_flow, value_chain, tech_stack, structure_diagram, relation_map, pyramid_chart
논쟁/인물: debate_card, argument_card, interview_card, psychology_card, strategy_card, mini_profile
기타: news_feed, news_ticker, calendar_event, warning_card, milestone, countdown, event_impact, history_pattern, sentiment_bar

각 visual_type의 visual_data는 narration 내용에 맞게 JSON으로 작성.
chart 타입은 visual_data 대신 chart_data: [{"label":"년도","value":숫자}], chart_title: "제목" 사용.

⚠️ visual_data 타입 규칙 (렌더링 에러 방지):
- card_items, items, pros, cons, left_items, right_items, do_items, dont_items, sub_points 등은 반드시 **문자열 배열** ["텍스트1", "텍스트2"]
  - ❌ [{"label":"A","value":"B"}] → 렌더링 크래시
  - ✅ ["A: B", "C: D"]
- title, label, description, message, headline, quote, speaker 등은 반드시 **문자열**
  - ❌ {"label":"A","value":"B"} → 렌더링 크래시
  - ✅ "A: B"

=== 비주얼 다양성 규칙 ===
- 같은 visual_type 연속 사용 금지
- 최소 15가지 이상 서로 다른 visual_type 사용
- stat_card/bullet_list 최대 4회, 나머지 최대 2~3회

"""

# 이전의 visual_data 예시들은 SKILL.md로 이동됨.
# visual_type별 상세 예시는 Claude API가 웹 검색 결과와 narration 내용을 기반으로 자동 구성.

_UNUSED = """
visual_data: {
  "title": "미국 기준금리 변화",
  "items": [
    {"label": "2020", "value": "0.25%", "note": "코로나 대응"},
    {"label": "2022", "value": "3.0%", "note": "긴축 시작"},
    {"label": "2023", "value": "5.25%", "note": "정점"},
    {"label": "2026", "value": "3.75%", "note": "현재"}
  ]
}

"comparison" - 두 가지 대비/비교할 때
visual_data: {
  "left_label": "금리 인상",
  "left_color": "#FF4444",
  "left_items": ["기업 이익↓", "채권 매력↑", "성장주 타격"],
  "right_label": "금리 인하",
  "right_color": "#44FF88",
  "right_items": ["기업 이익↑", "주식 매력↑", "소비 증가"]
}

"number_highlight" - 숫자 하나를 크게 강조할 때
visual_data: {
  "number": "8",
  "unit": "회",
  "label": "연간 FOMC 회의",
  "description": "매번 전 세계 시장이 긴장하는 순간"
}

"keyword" - 개념/용어 설명할 때
visual_data: {
  "keyword": "기준금리",
  "description": "중앙은행이 결정하는 돈의 가격",
  "sub_points": ["높으면 돈 빌리기 비쌈", "낮으면 돈 풀기 쉬움"]
}

"chart" - 차트 데이터 시각화
chart_data: [{"label": "2020", "value": 0.25}, ...]
chart_title: "미국 연방기금 기준금리 추이 (%)"

"quote_card" - 전문가/유명인 발언 인용할 때 (연준 의장 발언, 유명 투자자 발언 등)
visual_data: {
  "quote": "금리는 서두르지 않겠다. 데이터가 먼저다",
  "speaker": "제롬 파월",
  "role": "미국 연방준비제도 의장",
  "date": "2024년 3월"
}

"flow_diagram" - 인과관계/연쇄 흐름을 보여줄 때 (A → B → C → D)
visual_data: {
  "title": "금리 인상이 경제에 미치는 연쇄 효과",
  "steps": [
    {"label": "금리 인상", "note": "연준 결정"},
    {"label": "대출 비용↑", "note": "기업·가계"},
    {"label": "소비·투자↓", "note": "경기 둔화"},
    {"label": "물가 안정", "note": "최종 목표"}
  ]
}

"news_feed" - 관련 뉴스 헤드라인을 여러 개 보여줄 때
visual_data: {
  "title": "이번 주 주요 경제 뉴스",
  "items": [
    {"category": "속보", "headline": "연준, 기준금리 0.25%p 인하 결정", "sub": "5.00%→4.75%"},
    {"category": "시장", "headline": "나스닥 +2.1% 급등, 기술주 강세"},
    {"category": "경제", "headline": "미국 실업률 4.1%, 예상치 부합"}
  ]
}

"step_flow" - 순서가 있는 단계별 절차 설명할 때 (투자 방법, 신청 절차 등)
visual_data: {
  "title": "ETF 투자 시작하는 3단계",
  "steps": [
    {"step": "1", "title": "증권사 계좌 개설", "description": "국내 주요 증권사 앱에서 10분 안에 개설 가능"},
    {"step": "2", "title": "ETF 종목 선택", "description": "S&P500, 나스닥, 코스피 등 지수 추종 ETF 추천"},
    {"step": "3", "title": "분산 매수 시작", "description": "매월 일정 금액 정기 매수로 리스크 분산"}
  ]
}

"table_data" - 여러 항목을 표 형식으로 비교할 때 (국가별/상품별 데이터 비교)
visual_data: {
  "title": "주요국 기준금리 현황",
  "headers": ["국가", "기준금리", "최근 변동", "전망"],
  "rows": [
    ["🇺🇸 미국", "4.75%", "▼0.25%p 인하", "추가 인하 예상"],
    ["🇪🇺 유럽", "3.50%", "▼0.25%p 인하", "인하 기조 유지"],
    ["🇯🇵 일본", "0.25%", "▲0.15%p 인상", "추가 인상 검토"]
  ],
  "highlight_col": 1
}

"pros_cons" - 투자/정책/상품의 장단점을 나란히 보여줄 때
visual_data: {
  "title": "ETF 투자 장단점",
  "pros_label": "장점",
  "cons_label": "단점",
  "pros": ["분산 투자 자동화", "낮은 수수료 (0.03~0.5%)", "유동성 높음"],
  "cons": ["개별 종목 선택 불가", "시장 하락 시 함께 손실", "배당 시점 불규칙"]
}

"ranking_list" - 순위가 있는 목록 (수익률 Top 5, GDP 순위 등)
visual_data: {
  "title": "2024년 ETF 수익률 TOP 5",
  "unit": "%",
  "items": [
    {"rank": 1, "name": "KODEX 미국나스닥100", "value": "+38.2", "change": null},
    {"rank": 2, "name": "TIGER 미국S&P500", "value": "+27.4", "change": null},
    {"rank": 3, "name": "KODEX 반도체", "value": "+24.1", "change": null},
    {"rank": 4, "name": "TIGER 2차전지테마", "value": "+12.8", "change": null},
    {"rank": 5, "name": "KODEX 200", "value": "+8.3", "change": null}
  ]
}

"callout_box" - 핵심 결론/주의사항/인사이트를 크게 강조할 때
visual_data: {
  "type": "insight",
  "label": "핵심 결론",
  "message": "지금은 분산 투자가 가장 안전한 선택입니다",
  "sub": "단기 변동성보다 장기 복리에 집중하세요"
}
※ type: "info"(💡 기본), "warning"(⚠️ 주의), "success"(✅ 긍정), "insight"(🔍 분석)

"ticker_board" - 주요 종목/지수/환율 현황을 표로 보여줄 때
visual_data: {
  "title": "오늘의 주요 시장 현황",
  "date": "2024년 3월 20일 기준",
  "items": [
    {"symbol": "KOSPI", "name": "코스피 지수", "price": "2,650", "change": "+18.3", "change_pct": "+0.70%"},
    {"symbol": "NASDAQ", "name": "나스닥 종합", "price": "16,384", "change": "+124.5", "change_pct": "+0.77%"},
    {"symbol": "USD/KRW", "name": "달러/원 환율", "price": "1,330원", "change": "-5.2", "change_pct": "-0.39%"}
  ]
}

"icon_grid" - 4~6개 항목을 이모지+텍스트 그리드로 보여줄 때 (bullet_list 대안, 더 시각적)
visual_data: {
  "title": "ETF 투자 핵심 원칙 6가지",
  "items": [
    {"icon": "📊", "label": "분산 투자", "desc": "한 종목에 몰빵 금지"},
    {"icon": "💰", "label": "저비용", "desc": "수수료 0.5% 이하"},
    {"icon": "🕐", "label": "장기 보유", "desc": "최소 5년 이상"},
    {"icon": "🔄", "label": "정기 매수", "desc": "매월 일정 금액"},
    {"icon": "⚖️", "label": "리밸런싱", "desc": "연 1~2회 조정"},
    {"icon": "🎯", "label": "목표 설정", "desc": "명확한 투자 목표"}
  ]
}

"percentage_bar" - 비율/점유율을 가로 막대로 보여줄 때 (포트폴리오 구성, 여론조사 결과 등)
visual_data: {
  "title": "중동 원유 의존도 (수입 비중)",
  "unit": "%",
  "items": [
    {"label": "🇰🇷 한국", "value": 72},
    {"label": "🇯🇵 일본", "value": 96},
    {"label": "🇨🇳 중국", "value": 55},
    {"label": "🇺🇸 미국", "value": 14}
  ]
}

"dual_stat" - 두 개의 핵심 수치를 동등하게 강조할 때 (두 지표 동시 비교)
visual_data: {
  "title": "전쟁 전후 비교",
  "left_number": "-8.4",
  "left_unit": "%",
  "left_label": "코스피 낙폭",
  "left_sub": "전쟁 발발 후 10일",
  "left_color": "#FF6B6B",
  "right_number": "+34",
  "right_unit": "%",
  "right_label": "유가 상승률",
  "right_sub": "브렌트유 기준",
  "right_color": "#FFB347"
}

"scenario_card" - 2~3가지 시나리오를 카드로 비교할 때 (투자 전략, 전망 분석)
visual_data: {
  "title": "이란 전쟁 3가지 시나리오",
  "scenarios": [
    {"label": "협상 타결", "icon": "🕊️", "condition": "이란이 핵 프로그램 동결 합의", "outcome": "유가 하락·증시 급등·달러 약세", "probability": "40%", "color": "#52D68A"},
    {"label": "현상 유지", "icon": "⚖️", "condition": "공습 지속, 협상 교착 상태", "outcome": "변동성 지속·에너지주 강세", "probability": "45%", "color": "#FFB347"},
    {"label": "지상군 투입", "icon": "⚠️", "condition": "미군 지상군 이란 투입", "outcome": "글로벌 증시 폭락·유가 $150+", "probability": "15%", "color": "#FF6B6B"}
  ]
}

"split_screen" - Before/After 또는 정책 전후 상황을 좌우로 대비할 때
visual_data: {
  "title": "금리 인상 전 vs 후",
  "before_label": "금리 인상 전",
  "before_color": "#FF6B6B",
  "before_items": ["저금리로 대출 쉬움", "부동산·주식 자산 급등", "인플레이션 심화"],
  "after_label": "금리 인상 후",
  "after_color": "#52D68A",
  "after_items": ["대출 비용 증가", "자산 가격 안정화", "물가 상승세 둔화"]
}

"world_stats" - 국가별 데이터를 국기와 함께 보여줄 때 (글로벌 비교)
visual_data: {
  "title": "주요국 국방비 지출 현황",
  "subtitle": "GDP 대비 비중 (2024년 기준)",
  "items": [
    {"flag": "🇺🇸", "country": "미국", "value": "3.4%", "change": "+0.3%", "note": "NATO 기준 2배"},
    {"flag": "🇰🇷", "country": "한국", "value": "2.7%", "change": "+0.2%", "note": "방산 수출 급증"},
    {"flag": "🇩🇪", "country": "독일", "value": "2.1%", "change": "+0.8%", "note": "역대 최대 증가"},
    {"flag": "🇯🇵", "country": "일본", "value": "1.8%", "change": "+0.6%", "note": "방위력 강화 계획"}
  ]
}

"gauge_meter" - 공포탐욕지수·경기 온도계 등 0~100 스케일 지표를 반원형 게이지로 보여줄 때
visual_data: {
  "value": 22,
  "label": "시장 공포탐욕 지수",
  "unit": "/ 100",
  "description": "극단적 공포 구간 — 역사적으로 매수 기회",
  "invert": false
}
⚠️ invert 규칙:
- 공포탐욕지수(Fear & Greed Index): invert: false (낮을수록 공포, 기본값)
- VKOSPI, VIX 등 변동성 지수: invert: true (높을수록 공포)
- invert: true이면 게이지 색상이 반전되어 높은 값이 빨간색(공포)으로 표시됨

gauge_meter 추가 예시 (VKOSPI):
visual_data: {
  "value": 63,
  "label": "VKOSPI (한국형 공포지수)",
  "unit": "/ 100",
  "description": "극단적 공포 구간",
  "invert": true
}

"donut_chart" - 포트폴리오 구성·비중·점유율을 도넛 파이 차트로 보여줄 때
visual_data: {
  "title": "전쟁 시 수혜 섹터 포트폴리오",
  "center_text": "안전자산",
  "center_sub": "비중 전략",
  "segments": [
    {"label": "방산주", "value": 35},
    {"label": "에너지·원자재", "value": 25},
    {"label": "금·은", "value": 20},
    {"label": "달러·미국채", "value": 15},
    {"label": "현금", "value": 5}
  ]
}

"alert_banner" - 긴급 속보·경고·중요 발표를 강조할 때 (BREAKING 뉴스 스타일)
visual_data: {
  "type": "breaking",
  "headline": "미 국방부, 이란 핵시설 타격 옵션 검토 중",
  "sub_text": "백악관은 아직 최종 결정 내리지 않았다고 밝혀",
  "source": "로이터통신",
  "time": "2025.03.28 오전 10:42"
}

"myth_vs_fact" - 잘못 알려진 통념과 실제 사실을 대결 형식으로 보여줄 때
visual_data: {
  "topic": "전쟁과 주식시장",
  "myth": "전쟁이 나면 주식시장은 무조건 폭락한다",
  "fact": "역사적으로 전쟁 발발 후 6개월 이내 반등한 경우가 더 많다",
  "myth_label": "❌ 오해",
  "fact_label": "✅ 실제 데이터"
}

"checklist" - 투자 전 체크리스트·조건 충족 여부를 보여줄 때
visual_data: {
  "title": "지금 주식 사도 될까? 체크리스트",
  "items": [
    {"text": "전쟁 확전 리스크 진정 신호 있음", "checked": false, "note": "아직 불확실성 높음"},
    {"text": "유가 $90 이하로 안정화", "checked": false},
    {"text": "연준 금리 인하 기대감 존재", "checked": true, "note": "CME 페드워치 60% 확률"},
    {"text": "기업 실적 시즌 양호", "checked": true},
    {"text": "공포탐욕지수 30 이하 극단적 공포", "checked": true, "note": "현재 22 수준"}
  ]
}

"trend_arrow" - 특정 지표의 상승·하락 추세를 강조할 때
visual_data: {
  "metric": "WTI 원유 가격",
  "direction": "up",
  "from_value": "$72",
  "to_value": "$94",
  "period": "최근 3개월",
  "change": "+$22 (+30.6%)",
  "insight": "중동 긴장 고조로 공급 차질 우려 반영"
}

"vs_battle" - 두 국가·기업·세력을 통계와 함께 대결 구도로 보여줄 때
visual_data: {
  "topic": "군사력 직접 비교",
  "left": {
    "name": "미국", "flag": "🇺🇸", "color": "#4A90D9",
    "stats": [
      {"label": "국방비", "value": "$8,860억"},
      {"label": "현역 병력", "value": "135만 명"},
      {"label": "핵탄두", "value": "5,550개"}
    ]
  },
  "right": {
    "name": "이란", "flag": "🇮🇷", "color": "#52D68A",
    "stats": [
      {"label": "국방비", "value": "$100억"},
      {"label": "현역 병력", "value": "52만 명"},
      {"label": "드론 보유", "value": "수천 기"}
    ]
  },
  "verdict": "재래식 전력 30:1 차이, 그러나 비대칭 전쟁 가능"
}

"pyramid_chart" - 계층 구조·우선순위·소득 분위를 피라미드로 보여줄 때 (위=꼭대기, 아래=밑변)
visual_data: {
  "title": "전쟁 리스크 수혜 자산 피라미드",
  "subtitle": "위험 회피 강도 순서",
  "levels": [
    {"label": "금·달러", "value": "최상위 안전자산", "description": "전쟁 시 무조건 상승"},
    {"label": "미국채·엔화", "value": "2순위", "description": "금리 하락 기대"},
    {"label": "방산·에너지주", "value": "3순위", "description": "직접 수혜 섹터"},
    {"label": "일반 가치주", "value": "4순위", "description": "방어적 포지션"},
    {"label": "성장주·신흥국", "value": "위험", "description": "가장 큰 하락 압력"}
  ]
}

"interview_card" - 전문가·분석가의 발언을 Q&A 인터뷰 형식으로 보여줄 때
visual_data: {
  "question": "지금 이 상황에서 개인 투자자는 어떻게 해야 하나요?",
  "answer": "리스크를 인정하고 포지션을 줄이되, 패닉셀은 금물입니다. 현금 비중 20~30%를 확보하세요.",
  "speaker": "김영익",
  "role": "서강대 경제학과 교수",
  "avatar": "🎓",
  "interviewer": "유튜브 채널"
}

"warning_card" - 투자 위험·주의사항·리스크를 강조할 때
visual_data: {
  "title": "이란 전쟁 시 최악 시나리오 리스크",
  "level": "danger",
  "items": [
    "호르무즈 해협 봉쇄 → 글로벌 원유 공급 20% 차단",
    "유가 $150 돌파 → 글로벌 스태그플레이션 우려",
    "코스피 2,000p 이하 하락 가능성",
    "환율 1,600원 돌파 → 외국인 자금 이탈 가속"
  ],
  "disclaimer": "시나리오 분석이며 투자 권유가 아닙니다"
}

"price_history" - 특정 자산의 과거 가격 변동 이력을 타임라인으로 보여줄 때
visual_data: {
  "asset": "코스피 지수",
  "unit": "포인트",
  "trend": "mixed",
  "history": [
    {"date": "2024.10", "price": "2,600", "event": "중동 긴장 고조 시작"},
    {"date": "2024.12", "price": "2,400", "change": "-7.7%", "event": "이란 미사일 발사"},
    {"date": "2025.01", "price": "2,480", "change": "+3.3%", "event": "협상 기대감"},
    {"date": "2025.03", "price": "2,350", "change": "-5.2%", "event": "미군 파병설 확산"}
  ]
}

"funnel_chart" - 단계별로 줄어드는 수치를 깔때기 형태로 보여줄 때 (전환율, 영향 범위 등)
visual_data: {
  "title": "전쟁 충격이 주식시장에 전달되는 경로",
  "unit": "영향 강도",
  "stages": [
    {"label": "지정학 리스크 발생", "value": 100, "note": "불확실성 최고조"},
    {"label": "유가·원자재 급등", "value": 80, "note": "에너지 비용 상승"},
    {"label": "기업 이익 감소", "value": 55, "note": "비용 전가 한계"},
    {"label": "주가 하락 압력", "value": 40, "note": "밸류에이션 재산정"},
    {"label": "실제 주가 하락", "value": 25, "note": "시장 내성·정책 지원으로 완충"}
  ]
}

"calendar_event" - 앞으로 예정된 주요 경제 일정·이벤트를 캘린더 형식으로 보여줄 때
visual_data: {
  "month": "2025년 4월 주요 일정",
  "subtitle": "중동 리스크와 맞물린 이벤트",
  "events": [
    {"date": "4/2", "event": "미국 ISM 제조업 지수 발표", "importance": "medium", "expected": "49.2"},
    {"date": "4/9", "event": "FOMC 의사록 공개", "importance": "high", "expected": "금리 동결 확인"},
    {"date": "4/16", "event": "미국 소매판매 지표", "importance": "medium"},
    {"date": "4/23", "event": "UN 안보리 이란 제재 표결", "importance": "high", "expected": "거부권 행사 가능성"}
  ]
}

"bubble_compare" - 여러 항목의 규모·크기를 버블 형태로 직관적으로 비교할 때
visual_data: {
  "title": "중동 산유국 원유 생산량 비교",
  "unit": "만 배럴/일",
  "items": [
    {"label": "사우디", "value": 1200, "display": "1,200만"},
    {"label": "이라크", "value": 450, "display": "450만"},
    {"label": "UAE", "value": 380, "display": "380만"},
    {"label": "이란", "value": 340, "display": "340만", "note": "제재 하 생산량"},
    {"label": "쿠웨이트", "value": 280, "display": "280만"}
  ]
}

"key_takeaway" - 영상의 핵심 메시지·결론·투자 포인트를 정리할 때
visual_data: {
  "title": "오늘의 핵심 정리",
  "points": [
    {"emoji": "🎯", "text": "전쟁 리스크는 단기 충격이지만 장기 추세를 바꾸지 않는다"},
    {"emoji": "🛡️", "text": "금·달러·방산주로 포트폴리오 일부 헤지하라"},
    {"emoji": "📊", "text": "공포탐욕지수 20 이하면 역사적 매수 기회였다"},
    {"emoji": "⏳", "text": "최악 시나리오에 대비하되 패닉셀은 하지 마라"}
  ],
  "conclusion": "불확실성이 클수록 분산투자와 현금 비중 관리가 핵심"
}

"stock_card" - 특정 종목의 현재 주가·변동·주요 지표를 상세하게 보여줄 때
visual_data: {
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
  "week_low": "$392.30",
  "logo": "✈️"
}

=== 중요 ===
- content 장면은 반드시 narration 내용에 맞는 visual_type을 선택할 것
- visual_data는 narration 내용과 일치해야 함
- 숫자/통계가 나오면 stat_card 또는 number_highlight 우선
- N가지 이유/방법이면 bullet_list
- 비교/대조면 comparison
- 개념 설명이면 keyword

=== 비주얼 다양성 규칙 (반드시 준수) ===
1. 같은 visual_type을 연속으로 2번 이상 사용 금지
   - ❌ stat_card → stat_card (연속 금지)
   - ✅ stat_card → bullet_list → stat_card (사이에 다른 타입)

2. 동일 visual_type 최대 사용 횟수 (전체 장면 기준):
   - stat_card: 최대 4회
   - bullet_list: 최대 4회
   - keyword: 최대 3회
   - comparison: 최대 3회
   - callout_box: 최대 3회
   - quote_card: 최대 3회
   - flow_diagram: 최대 3회
   - 그 외 타입: 최대 2회

3. 대본 전체에서 최소 10가지 이상의 서로 다른 visual_type을 사용할 것

4. 사용 가능한 총 40가지 visual_type 적극 활용:
   기본: stat_card, bullet_list, timeline, comparison, number_highlight, keyword, chart
   인용/흐름: quote_card, flow_diagram, news_feed, step_flow
   표/비교: table_data, pros_cons, ranking_list, callout_box
   시황: ticker_board, percentage_bar, dual_stat, world_stats
   시각화: icon_grid, scenario_card, split_screen
   신규: gauge_meter, donut_chart, alert_banner, myth_vs_fact, checklist,
         trend_arrow, vs_battle, pyramid_chart, interview_card, warning_card,
         price_history, funnel_chart, calendar_event, bubble_compare,
         key_takeaway, stock_card

5. 장면 순서 다양성 예시 (이런 식으로 번갈아 사용):
   intro_card → alert_banner → timeline → quote_card → stat_card →
   bullet_list → gauge_meter → vs_battle → flow_diagram →
   ticker_board → callout_box → chart → trend_arrow → donut_chart →
   myth_vs_fact → ranking_list → key_takeaway → stock_card → ...
"""


def write_script(topic: str, workspace_path: Path) -> ScriptOutput:
    print(f"[ScriptWriter] 대본 작성 시작: {topic}")

    client = anthropic.Anthropic(api_key=ANTHROPIC_API_KEY)

    messages = [{"role": "user", "content": f"다음 주제로 유튜브 대본을 작성해주세요: {topic}"}]

    response = client.messages.create(
        model=CLAUDE_MODEL,
        max_tokens=16000,
        system=SYSTEM_PROMPT,
        tools=[{"type": "web_search_20250305", "name": "web_search"}],
        messages=messages,
    )

    while response.stop_reason == "tool_use":
        tool_uses = [b for b in response.content if b.type == "tool_use"]
        messages.append({"role": "assistant", "content": response.content})

        tool_results = []
        for tool_use in tool_uses:
            print(f"[ScriptWriter] 웹 검색 중: {tool_use.input.get('query', '')}")
            tool_results.append({
                "type": "tool_result",
                "tool_use_id": tool_use.id,
                "content": tool_use.input.get("query", ""),
            })

        messages.append({"role": "user", "content": tool_results})

        response = client.messages.create(
            model=CLAUDE_MODEL,
            max_tokens=16000,
            system=SYSTEM_PROMPT,
            tools=[{"type": "web_search_20250305", "name": "web_search"}],
            messages=messages,
        )

    raw_text = next((b.text for b in response.content if hasattr(b, "text")), "")

    if "```" in raw_text:
        raw_text = raw_text.split("```")[1]
        if raw_text.startswith("json"):
            raw_text = raw_text[4:]

    script_data = json.loads(raw_text.strip())
    script = ScriptOutput(**script_data)

    # 나레이션 총 글자 수 검증 (4,500~5,500자 미달 시 자동 보강)
    MIN_CHARS = 4500
    MAX_CHARS = 5500
    MAX_RETRY = 2

    for retry in range(MAX_RETRY):
        total_chars = sum(len(s.narration) for s in script.scenes)
        print(f"[ScriptWriter] 나레이션 총 글자 수: {total_chars}자 (목표: {MIN_CHARS}~{MAX_CHARS}자)")

        if total_chars >= MIN_CHARS:
            break

        shortfall = MIN_CHARS - total_chars
        print(f"[ScriptWriter] {shortfall}자 부족 → 대본 보강 요청 (재시도 {retry + 1}/{MAX_RETRY})")

        messages.append({"role": "assistant", "content": response.content})
        messages.append({
            "role": "user",
            "content": (
                f"대본의 나레이션 총 글자 수가 {total_chars}자로, 최소 기준 {MIN_CHARS}자에 {shortfall}자 부족합니다. "
                f"기존 장면의 나레이션을 더 풍부하게 보강하거나, 새로운 장면을 추가하여 "
                f"나레이션 총 글자 수가 {MIN_CHARS}~{MAX_CHARS}자 범위에 들도록 수정해주세요. "
                f"전체 JSON을 다시 출력해주세요."
            ),
        })

        response = client.messages.create(
            model=CLAUDE_MODEL,
            max_tokens=16000,
            system=SYSTEM_PROMPT,
            tools=[{"type": "web_search_20250305", "name": "web_search"}],
            messages=messages,
        )

        while response.stop_reason == "tool_use":
            tool_uses = [b for b in response.content if b.type == "tool_use"]
            messages.append({"role": "assistant", "content": response.content})
            tool_results = []
            for tool_use in tool_uses:
                tool_results.append({
                    "type": "tool_result",
                    "tool_use_id": tool_use.id,
                    "content": tool_use.input.get("query", ""),
                })
            messages.append({"role": "user", "content": tool_results})
            response = client.messages.create(
                model=CLAUDE_MODEL,
                max_tokens=16000,
                system=SYSTEM_PROMPT,
                tools=[{"type": "web_search_20250305", "name": "web_search"}],
                messages=messages,
            )

        raw_text = next((b.text for b in response.content if hasattr(b, "text")), "")
        if "```" in raw_text:
            raw_text = raw_text.split("```")[1]
            if raw_text.startswith("json"):
                raw_text = raw_text[4:]
        script_data = json.loads(raw_text.strip())
        script = ScriptOutput(**script_data)

    total_chars = sum(len(s.narration) for s in script.scenes)
    print(f"[ScriptWriter] 최종 나레이션 글자 수: {total_chars}자")

    # visual_data 검증 및 자동 수정
    script = _validate_visual_data(script)

    script_path = workspace_path / "script.json"
    script_path.write_text(script.model_dump_json(indent=2), encoding="utf-8")
    print(f"[ScriptWriter] 완료 → {script_path}")

    return script


# visual_type별 필수 필드 정의
VISUAL_DATA_SCHEMA: dict[str, list[str]] = {
    "intro_card": ["title", "subtitle"],
    "outro_card": [],
    "stat_card": ["big_number", "big_label", "card_title", "card_items"],
    "bullet_list": ["title", "items"],
    "timeline": ["title", "items"],
    "comparison": ["left_label", "left_items", "right_label", "right_items"],
    "number_highlight": ["number", "unit", "label", "description"],
    "keyword": ["keyword", "description"],
    "chart": [],  # chart_data 사용
    "quote_card": ["quote", "speaker", "role"],
    "flow_diagram": ["title", "steps"],
    "news_feed": ["title", "items"],
    "step_flow": ["title", "steps"],
    "table_data": ["title", "headers", "rows"],
    "pros_cons": ["title", "pros", "cons"],
    "ranking_list": ["title", "items"],
    "callout_box": ["type", "label", "message"],
    "ticker_board": ["title", "items"],
    "icon_grid": ["title", "items"],
    "percentage_bar": ["title", "items"],
    "dual_stat": ["title", "left_number", "left_label", "right_number", "right_label"],
    "scenario_card": ["title", "scenarios"],
    "split_screen": ["title", "before_label", "before_items", "after_label", "after_items"],
    "world_stats": ["title", "items"],
    "gauge_meter": ["value", "label"],
    "donut_chart": ["title", "segments"],
    "alert_banner": ["headline"],
    "myth_vs_fact": ["myth", "fact"],
    "checklist": ["title", "items"],
    "trend_arrow": ["metric", "direction"],
    "vs_battle": ["topic", "left", "right"],
    "pyramid_chart": ["title", "levels"],
    "interview_card": ["question", "answer", "speaker"],
    "warning_card": ["title", "items"],
    "price_history": ["asset", "history"],
    "funnel_chart": ["title", "stages"],
    "calendar_event": ["month", "events"],
    "bubble_compare": ["title", "items"],
    "key_takeaway": ["title", "points"],
    "stock_card": ["ticker", "name", "price"],
    "line_chart": ["title", "data"],
    "heat_map": ["title", "items"],
    "quote_vs": ["topic", "left", "right"],
    "stacked_bar": ["title", "categories", "data"],
    "swot_card": ["title", "strengths", "weaknesses", "opportunities", "threats"],
    "target_price": ["ticker", "name", "current_price", "target_price"],
    "sector_board": ["title", "sectors"],
    "mini_profile": ["name", "role", "organization", "avatar", "bio"],
    "data_counter": ["number", "unit", "label", "description"],
    "highlight_quote": ["text"],
    "radar_chart": ["title", "labels", "values"],
    "tree_map": ["title", "items"],
    "countdown": ["event", "date", "days"],
    "matrix_grid": ["title", "x_axis", "y_axis", "quadrants"],
    "before_after": ["title", "before", "after", "change", "period"],
    "big_text": ["text"],
    "waterfall_chart": ["title", "items"],
    "risk_scale": ["title", "level", "description"],
    "emoji_scale": ["title", "levels", "active", "description"],
    "horizontal_bar": ["title", "items"],
    "gradient_stat": ["title", "stats"],
    "area_chart": ["title", "labels", "series"],
    "value_chain": ["title", "stages"],
    "stock_pick": ["title", "stocks"],
    "domino_effect": ["title", "trigger", "chain"],
    "history_pattern": ["title", "message", "patterns"],
    "sentiment_bar": ["title", "buy_pct", "sell_pct"],
    "strategy_card": ["title", "do_items", "dont_items"],
    "tech_stack": ["title", "layers"],
    "event_impact": ["event", "event_date", "impacts"],
    "psychology_card": ["title", "bias", "description", "example", "solution"],
    "debate_card": ["speaker", "quote", "reactions"],
    "money_flow": ["title", "source", "flows"],
    "scale_compare": ["title", "left", "right"],
    "career_timeline": ["name", "role", "events"],
    "price_impact": ["asset", "before_price", "after_price", "change", "period"],
    "structure_diagram": ["title", "elements"],
    "argument_card": ["topic", "side_a", "side_b"],
    "mechanism": ["title", "steps"],
    "milestone": ["title", "current", "target", "unit", "label"],
    "news_ticker": ["title", "items"],
    "relation_map": ["title", "center", "nodes"],
}


def _validate_visual_data(script: ScriptOutput) -> ScriptOutput:
    """visual_data 필수 필드 + 타입을 검증하고, 문제 있는 씬만 Claude API에 수정 요청."""
    broken_scenes = []

    # 문자열 배열이어야 하는 필드 목록
    STRING_ARRAY_FIELDS = {
        "card_items", "items", "pros", "cons", "left_items", "right_items",
        "before_items", "after_items", "sub_points", "strengths", "weaknesses",
        "opportunities", "threats", "do_items", "dont_items",
    }

    for scene in script.scenes:
        vt = scene.visual_type
        vd = scene.visual_data

        if vt in ("chart", "outro_card"):
            continue

        schema = VISUAL_DATA_SCHEMA.get(vt)
        if schema is None:
            continue

        if vd is None and schema:
            broken_scenes.append((scene, schema, "visual_data가 null"))
            continue

        issues = []

        # 필드 존재 검증
        missing = [f for f in schema if f not in vd]
        if missing:
            issues.append(f"누락 필드: {missing}")

        # 타입 검증: 문자열 자리에 객체가 들어간 경우
        for key in ["title", "label", "description", "message", "headline",
                     "quote", "keyword", "text", "sub", "big_number", "big_label",
                     "card_title", "speaker", "role", "name", "ticker", "asset",
                     "event", "event_date", "trigger", "source", "period", "change",
                     "before_price", "after_price", "current_price", "target_price"]:
            if key in vd and isinstance(vd[key], dict):
                issues.append(f"{key}가 객체 (문자열이어야 함)")

        # 타입 검증: 문자열 배열 자리에 객체 배열이 들어간 경우
        for key in STRING_ARRAY_FIELDS:
            if key in vd and isinstance(vd[key], list) and vd[key]:
                if isinstance(vd[key][0], dict):
                    issues.append(f"{key}가 객체 배열 (문자열 배열이어야 함)")

        if issues:
            broken_scenes.append((scene, schema, " / ".join(issues)))

    if not broken_scenes:
        print(f"[ScriptWriter] ✅ visual_data 검증 통과")
        return script

    print(f"[ScriptWriter] ⚠️ visual_data 검증 — {len(broken_scenes)}개 문제 발견 → API 수정 요청")
    for scene, schema, issue in broken_scenes:
        print(f"  씬 {scene.scene_id} ({scene.visual_type}): {issue}")

    # rate limit 방지: 대본 생성 직후이므로 60초 대기
    import time
    print(f"[ScriptWriter] API rate limit 대기 (60초)...")
    time.sleep(60)

    # 문제 씬들을 모아서 한 번에 수정 요청
    _fix_broken_scenes(script, broken_scenes)

    return script


def _fix_broken_scenes(script: ScriptOutput, broken_scenes: list):
    """문제 있는 씬의 visual_data를 Claude API에 수정 요청."""
    client = anthropic.Anthropic(api_key=ANTHROPIC_API_KEY)

    fix_requests = []
    for scene, schema, issue in broken_scenes:
        # 해당 타입의 예시 스키마 생성
        example = _build_schema_example(scene.visual_type, schema)
        fix_requests.append(
            f'씬 {scene.scene_id} (visual_type: "{scene.visual_type}"):\n'
            f'  나레이션: "{scene.narration[:80]}..."\n'
            f'  현재 visual_data: {json.dumps(scene.visual_data, ensure_ascii=False)}\n'
            f'  필수 구조 예시: {example}\n'
        )

    prompt = (
        "아래 씬들의 visual_data가 필수 필드가 누락되어 있거나 구조가 잘못되었습니다.\n"
        "각 씬의 나레이션 내용을 바탕으로, 필수 구조 예시에 맞게 visual_data를 수정해주세요.\n"
        "반드시 아래 JSON 형식으로만 응답하세요 (다른 텍스트 없이):\n"
        '{\"fixes\": [{\"scene_id\": 0, \"visual_data\": {...}}, ...]}\n\n'
        + "\n".join(fix_requests)
    )

    try:
        response = client.messages.create(
            model=CLAUDE_MODEL,
            max_tokens=8000,
            messages=[{"role": "user", "content": prompt}],
        )

        raw_text = next((b.text for b in response.content if hasattr(b, "text")), "")
        if "```" in raw_text:
            raw_text = raw_text.split("```")[1]
            if raw_text.startswith("json"):
                raw_text = raw_text[4:]

        fixes = json.loads(raw_text.strip())
        fix_map = {f["scene_id"]: f["visual_data"] for f in fixes.get("fixes", [])}

        fixed_count = 0
        for scene in script.scenes:
            if scene.scene_id in fix_map:
                scene.visual_data = fix_map[scene.scene_id]
                fixed_count += 1

        print(f"[ScriptWriter] ✅ {fixed_count}개 씬 visual_data 수정 완료")

    except Exception as e:
        print(f"[ScriptWriter] ⚠️ visual_data 수정 실패 ({e}) → 기본값으로 채움")
        _fallback_fix(script, broken_scenes)


def _build_schema_example(vt: str, schema: list[str]) -> str:
    """visual_type의 필수 필드를 포함한 간단한 예시 JSON 생성."""
    example = {}
    for field in schema:
        if field in ("items", "steps", "stages", "levels", "points", "events",
                     "sectors", "stocks", "chain", "flows", "nodes", "reactions",
                     "patterns", "impacts", "layers", "segments", "rows",
                     "labels", "values", "series", "data", "quadrants", "elements",
                     "stats", "history", "do_items", "dont_items", "pros", "cons",
                     "left_items", "right_items", "before_items", "after_items",
                     "card_items", "sub_points", "strengths", "weaknesses",
                     "opportunities", "threats", "categories", "scenarios", "headers"):
            example[field] = ["..."]
        elif field in ("value", "number", "level", "active", "current", "target",
                       "buy_pct", "sell_pct", "days"):
            example[field] = 0
        elif field in ("left", "right", "before", "after", "center", "side_a", "side_b"):
            example[field] = {"label": "...", "value": "..."}
        elif field == "invert":
            example[field] = False
        else:
            example[field] = "..."
    return json.dumps(example, ensure_ascii=False)


def _fallback_fix(script: ScriptOutput, broken_scenes: list):
    """API 수정 실패 시 기본값으로 채우고 타입도 자동 수정."""
    STRING_ARRAY_FIELDS = {
        "card_items", "items", "pros", "cons", "left_items", "right_items",
        "before_items", "after_items", "sub_points", "strengths", "weaknesses",
        "opportunities", "threats", "do_items", "dont_items",
    }

    for scene, schema, _ in broken_scenes:
        if scene.visual_data is None:
            scene.visual_data = {}
        vd = scene.visual_data

        # 누락 필드 채우기
        for field in schema:
            if field not in vd:
                if field in ("items", "steps", "stages", "levels", "points", "events",
                             "sectors", "stocks", "chain", "flows", "nodes"):
                    vd[field] = []
                elif field in ("value", "number", "level", "days"):
                    vd[field] = 0
                else:
                    vd[field] = scene.narration[:30] if field in ("title", "text", "headline", "message", "quote", "description", "label") else ""

        # 타입 자동 수정: 문자열 자리에 객체
        for key in list(vd.keys()):
            if isinstance(vd[key], dict) and key not in ("left", "right", "before", "after", "center", "side_a", "side_b"):
                vd[key] = f"{vd[key].get('label', '')} {vd[key].get('value', '')}".strip()

        # 타입 자동 수정: 문자열 배열 자리에 객체 배열
        for key in STRING_ARRAY_FIELDS:
            if key in vd and isinstance(vd[key], list) and vd[key] and isinstance(vd[key][0], dict):
                vd[key] = [f"{item.get('label', '')} {item.get('value', '')}".strip() if isinstance(item, dict) else str(item) for item in vd[key]]
