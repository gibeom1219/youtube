# Visual Data Reference

90개 visual_type의 visual_data 구조 예시입니다.
대본 작성 시 필요한 타입의 예시를 찾아 참고하세요.

⚠️ **타입 규칙 (렌더링 크래시 방지)**
- `card_items`, `items`, `pros`, `cons`, `left_items`, `right_items`, `do_items`, `dont_items`, `sub_points` 등은 반드시 **문자열 배열**: `["텍스트1", "텍스트2"]`
  - ❌ `[{"label":"A","value":"B"}]` → React 렌더링 크래시
  - ✅ `["A: B", "C: D"]`
- `title`, `label`, `description`, `message`, `headline`, `quote`, `speaker` 등은 반드시 **문자열**
  - ❌ `{"label":"A","value":"B"}` → 크래시
  - ✅ `"A: B"`

---

## 장면별 visual_type 선택 결정 트리

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


---

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
  "trigger": "금리 인상",
  "chain": [
    {"event": "달러 강세", "impact": "기축통화 수요 증가", "icon": "💵"},
    {"event": "신흥국 자금 유출", "impact": "외국인 투자자 이탈", "icon": "📉"},
    {"event": "원화 약세", "impact": "환율 1,500원 돌파", "icon": "🇰🇷"},
    {"event": "수입물가 상승", "impact": "소비자물가 직격탄", "icon": "🛒"}
  ]
}
```
⚠️ trigger: 연쇄 반응의 시작점 (1개)
⚠️ chain은 3~5개, event 10자 이내, impact 15자 이내

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

**candlestick**
```json
{
  "title": "삼성전자 최근 5일 캔들 차트",
  "unit": "원",
  "candles": [
    {"date": "3/24", "open": 71000, "close": 72500, "high": 73000, "low": 70500},
    {"date": "3/25", "open": 72500, "close": 71000, "high": 73200, "low": 70800},
    {"date": "3/26", "open": 71000, "close": 73500, "high": 74000, "low": 70500},
    {"date": "3/27", "open": 73500, "close": 72000, "high": 74200, "low": 71500},
    {"date": "3/28", "open": 72000, "close": 74000, "high": 74500, "low": 71800}
  ]
}
```

**earnings_card**
```json
{
  "company": "삼성전자",
  "ticker": "005930",
  "period": "2025 Q4",
  "items": [
    {"metric": "매출", "expected": "75조 원", "actual": "78조 원"},
    {"metric": "영업이익", "expected": "10조 원", "actual": "12조 원"},
    {"metric": "순이익", "expected": "8조 원", "actual": "9.2조 원"}
  ],
  "verdict": "AI 반도체 수요 폭증으로 어닝 서프라이즈",
  "logo": "📱"
}
```

**valuation_table**
```json
{
  "title": "반도체 빅3 밸류에이션 비교",
  "stocks": [
    {"name": "삼성전자", "ticker": "005930", "per": "12.3x", "pbr": "1.2x", "roe": "9.8%", "rating": "매수"},
    {"name": "SK하이닉스", "ticker": "000660", "per": "8.5x", "pbr": "1.8x", "roe": "21.2%", "rating": "매수"},
    {"name": "TSMC", "ticker": "TSM", "per": "22.1x", "pbr": "6.5x", "roe": "29.4%", "rating": "보유"}
  ],
  "highlight_metric": "roe"
}
```

**analyst_rating**
```json
{
  "ticker": "005930",
  "name": "삼성전자",
  "current_price": "72,000원",
  "analysts": [
    {"firm": "NH투자증권", "target": "95,000원", "rating": "buy", "date": "2026.3"},
    {"firm": "삼성증권", "target": "90,000원", "rating": "buy", "date": "2026.3"},
    {"firm": "키움증권", "target": "85,000원", "rating": "buy", "date": "2026.2"},
    {"firm": "모건스탠리", "target": "75,000원", "rating": "hold", "date": "2026.2"}
  ],
  "consensus": "평균 목표가 86,250원 (상승여력 +19.8%)"
}
```

**etf_compare**
```json
{
  "title": "K방산 ETF 3종 비교",
  "etfs": [
    {"name": "TIGER K방산·우주", "ticker": "464520", "return_1m": "+24.1%", "return_3m": "+38.5%", "return_ytd": "+52.3%", "expense": "0.45%", "aum": "1.2조"},
    {"name": "SOL K방산", "ticker": "473590", "return_1m": "+23.4%", "return_3m": "+35.2%", "return_ytd": "+48.7%", "expense": "0.40%", "aum": "8,500억"},
    {"name": "KODEX K방산TOP10", "ticker": "492050", "return_1m": "+22.3%", "return_3m": "+33.8%", "return_ytd": "+45.1%", "expense": "0.35%", "aum": "6,200억"}
  ]
}
```

**sector_rotation**
```json
{
  "title": "경기 사이클별 유망 섹터",
  "current_phase": 2,
  "phases": [
    {"name": "회복기", "sectors": ["기술주", "소비재", "부동산"], "description": "금리 인하, 유동성 확대"},
    {"name": "확장기", "sectors": ["산업재", "원자재", "금융"], "description": "기업 실적 개선"},
    {"name": "과열기", "sectors": ["에너지", "방산", "원자재"], "description": "인플레 압력, 금리 인상"},
    {"name": "침체기", "sectors": ["헬스케어", "필수소비재", "유틸리티"], "description": "방어적 포지션"}
  ]
}
```

**law_card**
```json
{
  "name": "GENIUS법",
  "full_name": "Guiding and Establishing National Innovation for U.S. Stablecoins Act",
  "status": "passed",
  "date": "2025년 7월 서명",
  "summary": "미국 역사상 최초의 스테이블코인 규제 프레임워크. 발행사에 준비금 의무화, 제도권 편입 허용",
  "impacts": ["USD1 같은 스테이블코인이 합법적으로 기관 거래에 사용 가능", "은행·보험사 등 기관 참여 가능해짐", "트럼프 일가 WLFI의 최대 수혜 — 이해충돌 논란"],
  "icon": "📜"
}
```

**liquidation_cascade**
```json
{
  "title": "비트코인 레버리지 청산 도미노",
  "asset": "BTC",
  "stages": [
    {"label": "가격 10% 급락", "amount": "-$7,000", "icon": "📉"},
    {"label": "롱 포지션 강제 청산", "amount": "4억$ 물량", "cumulative": "4억$", "icon": "💥"},
    {"label": "청산 매도 → 추가 하락", "amount": "-$3,000", "cumulative": "7억$", "icon": "⬇️"},
    {"label": "2차 청산 도미노", "amount": "3억$ 추가", "cumulative": "10억$", "icon": "🔥"},
    {"label": "타 자산(금·은·주식)까지 매도", "amount": "광범위", "icon": "🌊"}
  ],
  "total_loss": "24시간 내 20억$ 이상 청산"
}
```

**bubble_indicator**
```json
{
  "title": "AI 버블 위험도 체크",
  "subtitle": "닷컴 버블(2000) vs 현재(2026) 비교",
  "indicators": [
    {"label": "나스닥 PER", "past_value": "175x", "current_value": "35x", "status": "safe"},
    {"label": "기업 실적 뒷받침", "past_value": "적자 기업 다수", "current_value": "빅테크 흑자", "status": "safe"},
    {"label": "인프라 투자 과잉", "past_value": "공급 과잉 심각", "current_value": "수요 > 공급", "status": "caution"},
    {"label": "레버리지 수준", "past_value": "낮음", "current_value": "높음", "status": "danger"},
    {"label": "IPO 과열", "past_value": "극심", "current_value": "보통", "status": "caution"}
  ],
  "verdict": "닷컴 때보다는 낫지만, 레버리지 수준이 위험 — 조정 가능성은 열어둬야"
}
```

**line_chart**
```json
{
  "title": "코스피 주간 추이",
  "unit": "포인트",
  "trend": "down",
  "data": [
    {"label": "3/3", "value": 2650},
    {"label": "3/10", "value": 2580},
    {"label": "3/17", "value": 2520},
    {"label": "3/24", "value": 2480}
  ]
}
```
⚠️ trend: "up"(녹색), "down"(빨강), "mixed"(티파니)

**heat_map**
```json
{
  "title": "섹터별 주간 수익률",
  "items": [
    {"label": "반도체", "value": "3,200", "change": 2.3},
    {"label": "2차전지", "value": "890", "change": -3.1},
    {"label": "방산", "value": "1,450", "change": 5.7},
    {"label": "바이오", "value": "720", "change": -1.2}
  ]
}
```

**quote_vs**
```json
{
  "topic": "금리 인하 시기 논쟁",
  "left": {"speaker": "김영익", "role": "서강대 교수", "quote": "하반기 인하 불가피", "stance": "비둘기파"},
  "right": {"speaker": "홍춘욱", "role": "프리즘투자자문 대표", "quote": "인플레 잡힐 때까지 동결", "stance": "매파"}
}
```

**stacked_bar**
```json
{
  "title": "트럼프 자산 구성 변화",
  "categories": ["부동산", "코인", "미디어", "기타"],
  "data": [
    {"label": "2024", "values": [25, 5, 8, 5]},
    {"label": "2025", "values": [25, 30, 12, 6]}
  ]
}
```

**swot_card**
```json
{
  "title": "삼성전자 SWOT 분석",
  "strengths": ["메모리 시장 1위", "파운드리 투자 확대"],
  "weaknesses": ["비메모리 경쟁력 부족", "중국 리스크"],
  "opportunities": ["AI 반도체 수요 폭증", "HBM 독점"],
  "threats": ["미중 갈등 심화", "TSMC 격차 확대"]
}
```

**target_price**
```json
{
  "ticker": "005930",
  "name": "삼성전자",
  "current_price": "72,000원",
  "target_price": "95,000원",
  "analyst": "NH투자증권",
  "rating": "buy",
  "upside": "+31.9%",
  "logo": "📱"
}
```
⚠️ rating: "buy"(녹색), "hold"(주황), "sell"(빨강)

**sector_board**
```json
{
  "title": "업종별 등락 현황",
  "date": "2025년 3월 28일",
  "sectors": [
    {"name": "반도체", "change": "+2.3", "index": "3,200"},
    {"name": "자동차", "change": "+1.1", "index": "2,100"},
    {"name": "항공", "change": "-3.5", "index": "890"}
  ]
}
```

**mini_profile**
```json
{
  "name": "케빈 워시",
  "role": "차기 연준 의장 후보",
  "organization": "전 연준 이사",
  "avatar": "🎓",
  "bio": "30대 중반에 최연소 연준 이사. 2008 금융위기 당시 투자은행 구제에 핵심 역할.",
  "stats": [{"label": "연준 이사", "value": "2006~2011"}, {"label": "모건스탠리", "value": "부사장"}]
}
```

**data_counter**
```json
{
  "number": 1500,
  "unit": "원",
  "prefix": "",
  "label": "원달러 환율",
  "description": "2009년 금융위기 이후 처음으로 1,500원 돌파"
}
```

**highlight_quote**
```json
{
  "text": "결국 모든 돈이 밖으로 나가고 있다는 겁니다",
  "emphasis": "밖으로",
  "sub": "기관, 연금, 개인, 기업 — 모든 주체가 달러를 유출하고 있는 구조",
  "icon": "💸"
}
```

**radar_chart**
```json
{
  "title": "삼성전자 투자 매력도 평가",
  "labels": ["수익성", "성장성", "안정성", "배당", "밸류에이션"],
  "values": [85, 70, 90, 60, 75],
  "max": 100
}
```

**tree_map**
```json
{
  "title": "코스피 시가총액 비중",
  "items": [
    {"label": "삼성전자", "value": 350, "display": "20.5%"},
    {"label": "SK하이닉스", "value": 120, "display": "7.0%"},
    {"label": "현대차", "value": 55, "display": "3.2%"},
    {"label": "기타", "value": 1175, "display": "69.3%"}
  ]
}
```

**countdown**
```json
{
  "event": "FOMC 금리 결정",
  "date": "2025년 5월 7일",
  "days": 38,
  "description": "시장은 동결을 예상하고 있지만 서프라이즈 가능성도 있어요",
  "icon": "⏰",
  "importance": "high"
}
```
⚠️ importance: "high"(빨강), "medium"(주황), "low"(티파니)

**matrix_grid**
```json
{
  "title": "종목 포지셔닝 매트릭스",
  "x_axis": "성장성",
  "y_axis": "밸류에이션",
  "quadrants": [
    {"label": "고성장·고평가", "items": ["엔비디아", "테슬라"], "position": "top_right"},
    {"label": "고성장·저평가", "items": ["삼성전자", "SK하이닉스"], "position": "top_left"},
    {"label": "저성장·고평가", "items": ["코카콜라"], "position": "bottom_right"},
    {"label": "저성장·저평가", "items": ["은행주"], "position": "bottom_left"}
  ]
}
```

**before_after**
```json
{
  "title": "트럼프 자산 변화",
  "before": {"label": "취임 전", "value": "39억$"},
  "after": {"label": "취임 1년 후", "value": "73억$"},
  "change": "+87%",
  "period": "2024~2025"
}
```

**big_text**
```json
{
  "text": "대통령이 돈을 버는 구조가 곧 정책의 방향이다",
  "sub": "트럼프 일가의 사업 방향을 보면 다음 정책이 보입니다"
}
```

**waterfall_chart**
```json
{
  "title": "트럼프 자산 증가 요인 분해",
  "unit": "억$",
  "items": [
    {"label": "시작", "value": 39, "type": "total"},
    {"label": "코인 사업", "value": 15, "type": "increase"},
    {"label": "미디어(DJT)", "value": 8, "type": "increase"},
    {"label": "부동산", "value": 6, "type": "increase"},
    {"label": "소송비용", "value": -3, "type": "decrease"},
    {"label": "현재", "value": 73, "type": "total"}
  ]
}
```

**risk_scale**
```json
{
  "title": "현재 시장 리스크 수준",
  "level": 4,
  "labels": ["매우 낮음", "낮음", "보통", "높음", "매우 높음"],
  "description": "중동 리스크 + 고환율 + 외국인 이탈이 겹치면서 리스크가 높아진 상태"
}
```

**relation_map**
```json
{
  "title": "트럼프 코인 사업 관계도",
  "center": {"label": "트럼프", "icon": "🏛️"},
  "nodes": [
    {"label": "WLFI", "relation": "75% 배당", "icon": "💰"},
    {"label": "TRUMP코인", "relation": "밈코인", "icon": "🪙"},
    {"label": "USD1", "relation": "스테이블코인", "icon": "💵"},
    {"label": "아부다비 MGX", "relation": "20억$ 투자", "icon": "🇦🇪"}
  ]
}
```

**milestone**
```json
{
  "title": "트럼프 자산 목표 달성도",
  "current": 73,
  "target": 100,
  "unit": "억 달러",
  "label": "포브스 100억 달러 클럽 진입까지",
  "icon": "🎯"
}
```

**news_ticker**
```json
{
  "title": "트럼프 관련 최신 뉴스",
  "items": [
    {"headline": "TRUMP 코인 고점 대비 -89% 폭락", "source": "코인데스크", "type": "negative"},
    {"headline": "USD1 스테이블코인 발행량 20억 달러 돌파", "source": "로이터", "type": "positive"},
    {"headline": "GENIUS법 상원 통과, 스테이블코인 규제 확립", "source": "블룸버그", "type": "neutral"}
  ]
}
```
⚠️ type: "positive"(녹색▲), "negative"(빨강▼), "neutral"(티파니●)

**emoji_scale**
```json
{
  "title": "시장 분위기 평가",
  "levels": [
    {"emoji": "😱", "label": "극단 공포"},
    {"emoji": "😰", "label": "공포"},
    {"emoji": "😐", "label": "중립"},
    {"emoji": "😊", "label": "낙관"},
    {"emoji": "🤩", "label": "극단 탐욕"}
  ],
  "active": 1,
  "description": "외국인 매도세가 지속되면서 시장 심리가 위축된 상태"
}
```
⚠️ active: 0부터 시작하는 인덱스

**horizontal_bar**
```json
{
  "title": "중동 무기 수출 규모",
  "unit": "조 원",
  "items": [
    {"label": "UAE", "value": 10},
    {"label": "쿠웨이트", "value": 12},
    {"label": "요르단", "value": 6},
    {"label": "기타", "value": 6}
  ]
}
```

**gradient_stat**
```json
{
  "title": "주요 시장 지표",
  "stats": [
    {"label": "코스피", "value": "2,480", "change": "-2.1%", "icon": "📉"},
    {"label": "원달러", "value": "1,505", "change": "+1.3%", "icon": "💱"},
    {"label": "유가", "value": "$94", "change": "+8.5%", "icon": "🛢️"}
  ]
}
```

**area_chart**
```json
{
  "title": "외국인 순매수 추이",
  "labels": ["1월", "2월", "3월", "4월"],
  "series": [
    {"name": "코스피", "values": [2000, -3000, -5000, -8000]},
    {"name": "코스닥", "values": [500, -1000, -2000, -3500]}
  ]
}
```

**money_flow**
```json
{
  "title": "한국 달러 유출 구조",
  "source": "한국 내 달러",
  "flows": [
    {"from": "국민연금", "to": "해외 주식·채권", "amount": "370조 원", "note": "운용자산의 37%"},
    {"from": "서학개미", "to": "미국 주식", "amount": "663억 달러", "note": "2025년 누적"},
    {"from": "기업", "to": "해외 직접 투자", "amount": "537억 달러", "note": "외화 예금 쟁여둠"},
    {"from": "보험사", "to": "미국 장기 국채", "amount": "장기 투자", "note": "회수 어려움"}
  ]
}
```

**scale_compare**
```json
{
  "title": "해외 투자 규모 비교",
  "left": {"label": "국민연금", "value": "370조 원", "amount": 370, "icon": "🏛️"},
  "right": {"label": "개인 투자자", "value": "80조 원", "amount": 80, "icon": "👤"},
  "message": "기관이 개인보다 4.6배 더 많은 달러를 해외로 보내고 있음"
}
```

**career_timeline**
```json
{
  "name": "케빈 워시",
  "role": "차기 연준 의장",
  "avatar": "🎓",
  "events": [
    {"year": "1995", "title": "스탠퍼드 졸업", "detail": "공공 정책학 전공"},
    {"year": "2002", "title": "모건스탠리 부사장", "detail": "30대 초반 승진"},
    {"year": "2006", "title": "최연소 연준 이사", "detail": "부시 대통령 지명", "highlight": true},
    {"year": "2008", "title": "금융위기 대응", "detail": "투자은행 구제 핵심 역할", "highlight": true},
    {"year": "2011", "title": "연준 퇴임", "detail": "양적완화 반대 후 사임"}
  ]
}
```

**price_impact**
```json
{
  "asset": "TRUMP 밈코인",
  "before_price": "$75.35",
  "after_price": "$8.24",
  "change": "-89%",
  "period": "2025년 1월~6월",
  "icon": "🪙",
  "context": "취임 전날 고점 찍고 지속 하락. 개미만 물렸습니다."
}
```

**structure_diagram**
```json
{
  "title": "호르무즈 해협 구조",
  "description": "전 세계 원유 20%가 통과하는 병목 지점",
  "elements": [
    {"label": "이란", "position": "top", "icon": "🇮🇷", "note": "북쪽 해안"},
    {"label": "호르무즈 해협", "position": "center", "icon": "🚢", "note": "폭 54km"},
    {"label": "오만/UAE", "position": "bottom", "icon": "🇦🇪", "note": "남쪽 해안"},
    {"label": "페르시아만", "position": "left", "icon": "🛢️", "note": "산유국"},
    {"label": "인도양", "position": "right", "icon": "🌊", "note": "수출 항로"}
  ],
  "connections": [{"from": 3, "to": 1, "label": "원유 수송"}, {"from": 1, "to": 4, "label": "국제 항로"}]
}
```

**argument_card**
```json
{
  "topic": "M2 통화량 직계 방식 논쟁",
  "side_a": {"claim": "통화량 증가율 8%는 과거보다 심하지 않다", "evidence": ["과거 금리 인하기엔 10%도 찍었다", "절대 규모가 아니라 증가율을 봐야 한다"], "label": "한국은행"},
  "side_b": {"claim": "절대 규모가 문제다. 빚이 너무 많다", "evidence": ["IMF가 수년간 바꾸라고 했는데 이제서야?", "ETF 빼는 건 책임 회피"], "label": "시장 비판"},
  "verdict": "양쪽 다 일리가 있지만, 타이밍이 석연치 않다는 지적은 유효"
}
```

**mechanism**
```json
{
  "title": "레버리지 청산 연쇄 원리",
  "subtitle": "왜 한번 빠지면 더 빠지는가",
  "steps": [
    {"title": "레버리지 투자자 진입", "explanation": "100원으로 1,000원어치 투자. 빚이 900원."},
    {"title": "가격 10% 하락", "explanation": "1,000원이 900원이 됨. 내 돈 100원이 증발."},
    {"title": "강제 청산 발동", "explanation": "거래소가 담보 부족으로 기계적 매도."},
    {"title": "연쇄 청산", "explanation": "청산 물량이 쏟아지면서 추가 하락 → 더 많은 청산."}
  ]
}
```

**debate_card**
```json
{
  "speaker": "이창용",
  "role": "한국은행 총재",
  "quote": "젊은 사람들이 쿨하다고 하면서 유행처럼 해외 투자를 하고 있어서 걱정이다",
  "reactions": [
    {"side": "oppose", "text": "환율에 영향 끼친 요소가 한둘이 아닌데 왜 청년만 탓하냐"},
    {"side": "oppose", "text": "국민연금이 해외 투자 규모가 훨씬 큰데?"},
    {"side": "support", "text": "사실 개인 투자자의 해외 투자가 늘어난 것은 팩트"}
  ]
}
```

**scenario_card**
```json
{
  "title": "환율 전망 3가지 시나리오",
  "scenarios": [
    {"label": "낙관", "icon": "🕊️", "condition": "중동 안정 + 연준 인하", "outcome": "환율 1,350원대 복귀", "probability": "25%", "color": "#52D68A"},
    {"label": "기본", "icon": "⚖️", "condition": "현상 유지, 점진 개선", "outcome": "1,400~1,500원 박스권", "probability": "50%", "color": "#FFB347"},
    {"label": "비관", "icon": "⚠️", "condition": "전쟁 확전 + 관세 전쟁", "outcome": "1,600원 돌파", "probability": "25%", "color": "#FF6B6B"}
  ]
}
```

**split_screen**
```json
{
  "title": "환율 상승 수혜 vs 피해",
  "before_label": "수혜 섹터",
  "before_color": "#52D68A",
  "before_items": ["수출 대형주 (현대차·기아)", "조선·방산", "해외 매출 비중 높은 IT"],
  "after_label": "피해 섹터",
  "after_color": "#FF6B6B",
  "after_items": ["항공사 (연료비 달러)", "수입 원자재 의존 기업", "내수 중소기업"]
}
```

**world_stats**
```json
{
  "title": "주요국 기준금리 현황",
  "subtitle": "2025년 3월 기준",
  "items": [
    {"flag": "🇺🇸", "country": "미국", "value": "3.75%", "change": "-0.5%p", "note": "2회 인하"},
    {"flag": "🇰🇷", "country": "한국", "value": "2.50%", "change": "-0.25%p", "note": "1회 인하"},
    {"flag": "🇯🇵", "country": "일본", "value": "0.50%", "change": "+0.25%p", "note": "인상 기조"}
  ]
}
```

**dual_stat**
```json
{
  "title": "달러 유출 규모 비교",
  "left_number": "663",
  "left_unit": "억$",
  "left_label": "서학개미 해외 투자",
  "left_sub": "2025년 누적",
  "left_color": "#FF6B6B",
  "right_number": "537",
  "right_unit": "억$",
  "right_label": "기업 외화 예금",
  "right_sub": "5대 시중은행",
  "right_color": "#FFB347"
}
```

**icon_grid**
```json
{
  "title": "환율 상승 4가지 원인",
  "items": [
    {"icon": "🏦", "label": "한미 금리차", "desc": "1.25%p 격차"},
    {"icon": "✈️", "label": "서학개미", "desc": "663억 달러 유출"},
    {"icon": "🏭", "label": "기업 달러 쟁여두기", "desc": "537억 달러 예금"},
    {"icon": "⛽", "label": "중동 리스크", "desc": "유가 급등 압력"}
  ]
}
```

**percentage_bar**
```json
{
  "title": "국민연금 자산 배분 비중",
  "unit": "%",
  "items": [
    {"label": "해외 주식", "value": 37},
    {"label": "국내 채권", "value": 28},
    {"label": "국내 주식", "value": 15},
    {"label": "대체투자", "value": 12},
    {"label": "해외 채권", "value": 8}
  ]
}
```

---

## 지정학/전략 비주얼 (8종)

**geo_highlight_map**
```json
{
  "title": "호르무즈 해협 군사 배치 현황",
  "subtitle": "전 세계 원유 20%가 통과하는 병목 지점",
  "locations": [
    {"name": "이란", "icon": "🇮🇷", "note": "해협 봉쇄 고수", "position": "top-center", "highlight": true},
    {"name": "미 해군", "icon": "🇺🇸", "note": "항공모함 2척 배치", "position": "bottom-center"},
    {"name": "사우디", "icon": "🇸🇦", "note": "동맹 기지 제공", "position": "center-left"},
    {"name": "UAE", "icon": "🇦🇪", "note": "알다프라 기지", "position": "center-right"},
    {"name": "호르무즈 해협", "icon": "🚢", "note": "폭 54km", "position": "center", "highlight": true}
  ],
  "context": "이란이 봉쇄를 풀지 않으면 유가 $100+ 지속"
}
```
⚠️ locations는 3~6개, position: top-left/top-center/top-right/center-left/center/center-right/bottom-left/bottom-center/bottom-right

**supply_dependency**
```json
{
  "title": "한국 석유화학 공급망 의존 구조",
  "stages": [
    {"label": "중동 원유", "detail": "수입 의존도 70%", "icon": "🛢️"},
    {"label": "정유·나프타", "detail": "SK에너지, GS칼텍스", "icon": "🏭"},
    {"label": "에틸렌·프로필렌", "detail": "기초 화학 원료", "icon": "⚗️", "bottleneck": true},
    {"label": "플라스틱·합성고무", "detail": "최종 제품", "icon": "📦"}
  ],
  "insight": "중동 의존도가 높아 유가 변동에 취약한 구조"
}
```
⚠️ stages는 3~5개, bottleneck: true로 병목 지점 강조

**policy_compare**
```json
{
  "title": "이란 핵 문제 — 정권별 접근법 비교",
  "policies": [
    {"period": "오바마 (2015)", "leader": "협상 중심", "approach": "JCPOA 핵 합의", "items": ["제재 완화 교환", "우라늄 농축 제한", "IAEA 사찰 허용"]},
    {"period": "트럼프 1기 (2018)", "leader": "최대 압박", "approach": "JCPOA 탈퇴", "items": ["경제 제재 복원", "석유 수출 제로", "군사 위협 병행"]},
    {"period": "트럼프 2기 (2026)", "leader": "군사 행동", "approach": "이란 직접 타격", "items": ["선제 공습 900회", "지도부 제거", "핵 완전 포기 요구"]}
  ],
  "conclusion": "협상 → 제재 → 군사행동으로 점점 강경해지는 패턴"
}
```
⚠️ policies는 2~4개, items는 각 2~4개

**pressure_network**
```json
{
  "title": "베네수엘라 정권 교체 압력 구도",
  "target": "마두로 정권",
  "target_icon": "🇻🇪",
  "actors": [
    {"name": "미국", "icon": "🇺🇸", "incentive": "군사 포위 + 경제 제재 + 현상금", "stance": "oppose"},
    {"name": "군부", "icon": "🎖️", "incentive": "마약 이권 보호 vs 미국 현상금 유혹", "stance": "neutral"},
    {"name": "시민", "icon": "👥", "incentive": "경제 붕괴로 민생 파탄", "stance": "oppose"},
    {"name": "러시아·중국", "icon": "🌏", "incentive": "반미 진영 유지 + 자원 확보", "stance": "support"}
  ],
  "conclusion": "군부의 선택이 정권 운명을 결정 — 이권 vs 현상금 사이 갈등"
}
```
⚠️ actors는 3~5개, stance: support/oppose/neutral

**power_shift**
```json
{
  "title": "중일 GDP 역전의 역사",
  "entity_a": "일본",
  "entity_b": "중국",
  "icon_a": "🇯🇵",
  "icon_b": "🇨🇳",
  "crossing_year": "2010",
  "duration": "일본 우위 115년 (1895~2010)",
  "before_desc": "메이지 유신 이후 일본이 아시아 최강국으로 군림",
  "after_desc": "중국이 세계 2위 경제대국으로 부상, 격차 계속 확대 중",
  "insight": "115년간의 우위가 뒤집힌 순간 — 지정학적 역학도 함께 바뀌었다"
}
```

**escalation_ladder**
```json
{
  "title": "미국의 대베네수엘라 압박 단계",
  "subtitle": "경제 → 군사 → 특수작전으로 점점 강화",
  "stages": [
    {"level": 1, "label": "경제 제재", "detail": "석유 수출 금지, 자산 동결", "icon": "💰"},
    {"level": 2, "label": "군사 포위", "detail": "항공모함 + 해병대 배치", "icon": "🚢"},
    {"level": 3, "label": "특수작전 승인", "detail": "CIA 비밀 작전 허가", "icon": "🕵️"},
    {"level": 4, "label": "현상금 인상", "detail": "마두로 체포 $50M", "icon": "💵"},
    {"level": 5, "label": "직접 군사개입", "detail": "지상군 투입 검토", "icon": "⚔️"}
  ],
  "current_level": 4
}
```
⚠️ stages는 3~6개, current_level: 현재 단계 번호 (해당 단계 강조)

**vicious_cycle**
```json
{
  "title": "석유화학 산업 악순환 구조",
  "center_label": "악순환",
  "stages": [
    {"label": "글로벌 공급 과잉", "detail": "중국·중동 증설", "icon": "🏭"},
    {"label": "가격 폭락", "detail": "원가 이하 판매", "icon": "📉"},
    {"label": "한국 기업 적자", "detail": "10분기 연속 적자", "icon": "💸"},
    {"label": "구조조정·감산", "detail": "공장 폐쇄, 인력 감축", "icon": "🔧"}
  ],
  "insight": "중국 보조금이 계속되는 한 이 사이클은 끊기지 않는다"
}
```
⚠️ stages는 3~6개 (원형으로 배치됨), center_label은 가운데 표시

**catch_up_race**
```json
{
  "title": "중국의 기술 추격 현황",
  "racers": [
    {"field": "배터리", "leader": "한국", "challenger": "중국", "leader_icon": "🇰🇷", "challenger_icon": "🇨🇳", "progress": 95, "note": "LFP 시장 장악"},
    {"field": "반도체", "leader": "한국", "challenger": "중국", "leader_icon": "🇰🇷", "challenger_icon": "🇨🇳", "progress": 65, "note": "레거시 칩 추격"},
    {"field": "AI", "leader": "미국", "challenger": "중국", "leader_icon": "🇺🇸", "challenger_icon": "🇨🇳", "progress": 80, "note": "딥시크 등장"},
    {"field": "태양광", "leader": "세계", "challenger": "중국", "leader_icon": "🌍", "challenger_icon": "🇨🇳", "progress": 98, "note": "사실상 독점"}
  ],
  "conclusion": "배터리·태양광은 이미 추월, 반도체는 시간 문제라는 평가"
}
```
⚠️ racers는 3~5개, progress: 0~100 (90+는 '추월', 70+는 '근접', 나머지 '추격 중')

**hook_statement**
```json
{
  "line1": "GPU는 끝났다",
  "line2": "5조 베팅한 다음 섹터",
  "highlight": "5조",
  "highlight_color": "#FF6B6B",
  "sub": "엔비디아가 직접 선택한 다음 전쟁터"
}
```
⚠️ line1: 흰색 큰 글씨 (80px), line2: 강조색 더 큰 글씨 (88px)
⚠️ highlight: line2 안에서 색상 강조할 키워드 (선택)
⚠️ highlight_color: 강조 색상 (기본값 #FF6B6B 빨강, 선택)
⚠️ sub: 하단 보조 설명 (선택)
⚠️ 첫 씬(인트로)에 사용 추천 — 시청자 이탈 방지용 임팩트 비주얼

**speech_bubble**
```json
{
  "speaker": "젠슨 황",
  "title": "엔비디아 CEO",
  "quote": "우리의 다음 전쟁터는 광학이다. 이 시장이 AI의 미래를 결정할 것",
  "highlight": ["다음 전쟁터는 광학이다", "AI의 미래를 결정"],
  "emoji": "🎖️"
}
```
⚠️ speaker: 발언자 이름 (필수)
⚠️ title: 직함/소속 (선택)
⚠️ quote: 발언 내용 (필수)
⚠️ highlight: 빨간색으로 강조할 문구 배열 (선택)
⚠️ emoji: 발언자 대표 이모지 (선택, 기본 🗣️)
⚠️ 전문가/CEO/정치인 발언 인용 시 사용 — 실루엣 + 흰색 말풍선 디자인

**data_dashboard**
```json
{
  "title": "호르무즈 해협",
  "chart": {
    "label": "석유류 운송량",
    "unit": "만 배럴",
    "items": [
      { "label": "원유", "value": 1420 },
      { "label": "석유제품", "value": 590 }
    ]
  },
  "stats": [
    { "label": "전 세계 원유 해상 수송량", "value": "20%" },
    { "label": "한국으로 오는 중동산 원유", "value": "99%" }
  ]
}
```
⚠️ title: 대시보드 주제 (필수)
⚠️ chart.label: 차트 제목, chart.unit: 단위 (선택), chart.items: 바 차트 항목 2~4개
⚠️ stats: 핵심 수치 카드 2~3개 (label + value)
⚠️ 한 화면에 차트와 핵심 수치를 동시에 보여줄 때 사용

**markup_text**
```json
{
  "lines": [
    { "text": "미국 일반 휘발유 평균 가격", "underline": true },
    { "text": "2005년 허리케인 카트리나 이후 최대 상승폭", "circle": "최대 상승폭" }
  ],
  "color": "#FF44FF",
  "title": "유가 충격"
}
```
⚠️ lines: 표시할 텍스트 라인 배열 (1~4개)
⚠️ underline: true면 형광펜 밑줄 효과
⚠️ circle: 손그림 동그라미로 강조할 키워드 (해당 라인 내 텍스트)
⚠️ color: 밑줄/동그라미 색상 (선택, 기본 #FF44FF 핑크)
⚠️ title: 상단 보조 타이틀 (선택)
⚠️ 놀라운 사실, 핵심 포인트 강조 시 사용 — 밑줄이 그어지고 원이 그려지는 애니메이션

**rank_shift**
```json
{
  "title": "방한 외국인 쇼핑 장소",
  "left_label": "2015년",
  "right_label": "2025년",
  "ranks": [
    { "rank": 1, "left": "시내면세점", "right": "로드숍" },
    { "rank": 2, "left": "명동", "right": "대형쇼핑몰" },
    { "rank": 3, "left": "공항면세점", "right": "백화점" },
    { "rank": 4, "left": "소규모 상점", "right": "시내면세점" },
    { "rank": 5, "left": "대형할인점", "right": "대형마트" }
  ]
}
```
⚠️ title: 비교 주제 (필수)
⚠️ left_label/right_label: 좌/우 시대 라벨 (필수)
⚠️ ranks: 순위 항목 3~7개 (rank, left, right)
⚠️ 중앙에 빨간 세로 구분선 + 순위 번호, 양쪽에 항목이 등장하는 애니메이션
⚠️ 트렌드 변화, 순위 역전, 시대별 비교 시 사용

**stock_chart**
```json
{
  "title": "코스피",
  "prices": [3800, 3750, 4200, 4600, 5100, 6300, 5093, 5583],
  "dates": ["12/01", "01/02", "02/02", "03/03"],
  "high": { "value": "6,307.27", "index": 5 },
  "low": { "value": "5,093.54", "index": 6 },
  "current": "5,583.90",
  "color": "#4A9FFF"
}
```
⚠️ title: 차트 제목 (필수)
⚠️ prices: 가격 데이터 배열 (필수, 8~30개 권장)
⚠️ dates: X축 날짜 라벨 (선택, 3~6개)
⚠️ high: 고점 주석 (value: 표시 텍스트, index: prices 배열 인덱스)
⚠️ low: 저점 주석 (동일 구조)
⚠️ current: 현재가 (오른쪽 끝에 표시)
⚠️ color: 라인/영역 색상 (선택, 기본 #4A9FFF)
⚠️ volumes: 거래량 배열 (선택, 없으면 자동 생성)
⚠️ 주가/지수 추이, 가격 변동 시각화 시 사용 — 라인 드로우 애니메이션

**report_chart**
```json
{
  "title": "트럼프 2기 행정부 국정 운영 지지율",
  "subtitle": "2026년 3월 24일 기준 / 단위: %",
  "prices": [47, 45, 43, 44, 43, 40, 37, 40, 40, 41, 36, 36],
  "dates": ["1월", "3월", "5월", "7월", "9월", "11월"],
  "stats": [
    { "label": "경제 운영 지지율", "value": "29%", "color": "#4A8FD9" },
    { "label": "생활비 대응 지지율", "value": "25%", "color": "#E67E22" }
  ],
  "color": "#6BA4D9"
}
```
⚠️ title: 차트 제목 (필수), subtitle: 부제 (선택)
⚠️ prices: 데이터 포인트 배열 (필수, 각 포인트 위에 숫자 표시)
⚠️ dates: X축 날짜 라벨 (필수)
⚠️ stats: 사이드 스탯 카드 (label, value, color) — 선택
⚠️ color: 라인/영역 색상 (선택, 기본 #6BA4D9)
⚠️ 흰색 도화지 배경 위에 렌더링됨 — 여론조사, 지표 추이, 공식 리포트 스타일

**parliament_chart**
```json
{
  "title": "미국 119대 의회 상·하원 의석 수",
  "subtitle": "2025년 1월 2일 기준",
  "chambers": [
    {
      "name": "상원",
      "total": 100,
      "majority": 51,
      "segments": [
        { "label": "공화당", "value": 52, "color": "#2563eb" },
        { "label": "민주당", "value": 48, "color": "#dc2626" }
      ]
    },
    {
      "name": "하원",
      "total": 435,
      "majority": 218,
      "segments": [
        { "label": "공화당", "value": 219, "color": "#2563eb" },
        { "label": "민주당", "value": 216, "color": "#dc2626" }
      ],
      "emoji": "🇺🇸"
    }
  ]
}
```
⚠️ title: 차트 제목 (필수), subtitle: 부제 (선택)
⚠️ chambers: 반원 차트 배열 (1~2개)

**process_flow**
```json
{
  "title": "미국 대통령 탄핵 절차",
  "sections": [
    {
      "header": "탄핵 소추 전권",
      "color": "#2563eb",
      "steps": [
        "탄핵소추안 발의",
        "본회의서 탄핵 결의(과반 찬성)",
        "탄핵소추안 채택"
      ]
    },
    {
      "header": "탄핵 심판 전권",
      "color": "#dc2626",
      "steps": [
        "탄핵 심리",
        "본회의 의결(3분의 2 찬성)",
        "탄핵 판결(대통령 자동 면직, 부통령 지위 승계)"
      ]
    }
  ]
}
```
⚠️ 왼쪽 흰색→오른쪽 투명 그라데이션 — 배경 이미지가 오른쪽에 잘 보임
⚠️ sections: 섹션 배열 (각 header+color+steps[])
⚠️ 법안·제도·행정 절차 등 단계별 프로세스 설명 시 사용

**side_info**
```json
{
  "title": "리처드 그레넬 특임대사",
  "subtitle": "베네수엘라 접촉 시도",
  "side": "left",
  "items": [
    { "text": "베네수엘라와 접촉을 시도했으나 중단", "bold": "중단" },
    { "text": "지난 10월 트럼프 행정부가 이를 중단시켰다" },
    { "icon": "📌", "text": "체포 현상금 5000만 달러로 상향", "bold": "5000만 달러", "sub": "약 700억 원" }
  ]
}
```
⚠️ side: "left" 또는 "right" — 콘텐츠 위치 (반대쪽은 배경 이미지 노출)
⚠️ items: 불릿 항목 배열 (icon/text/bold/sub)
⚠️ 인물·사건·정책 등 핵심 정보를 비대칭으로 배치할 때 사용
⚠️ 중앙 집중 레이아웃이 연속될 때 변칙적으로 활용

**center_info**
```json
{
  "title": "핵심 쟁점 3가지",
  "subtitle": "2026년 상반기 기준",
  "items": [
    { "icon": "📊", "text": "GDP 성장률 1.2%로 둔화", "bold": "1.2%" },
    { "text": "소비자 물가 상승세 지속", "bold": "물가 상승세" },
    { "icon": "⚠️", "text": "실업률 4.8% 돌파", "bold": "4.8%", "sub": "10년 내 최고치" }
  ]
}
```
⚠️ 중앙에 흰색 배경 + 양쪽으로 배경 이미지 노출
⚠️ items: 불릿 항목 배열 (icon/text/bold/sub)
⚠️ 양쪽 배경을 모두 보여주면서 핵심 정보를 중앙에 집중할 때 사용

**bottom_info**
```json
{
  "title": "트럼프 관세 정책 주요 내용",
  "subtitle": "2026년 4월 발표",
  "items": [
    { "text": "중국산 전품목 60% 관세 부과", "bold": "60%" },
    { "icon": "🇪🇺", "text": "EU 자동차 25% 관세 유지", "bold": "25%" },
    { "text": "멕시코·캐나다 USMCA 재협상 요구", "bold": "재협상" },
    { "icon": "📉", "text": "글로벌 무역량 3.2% 감소 전망", "bold": "3.2%", "sub": "WTO 추정" }
  ]
}
```
⚠️ 하단 흰색 배경 + 위쪽으로 배경 이미지 노출
⚠️ items: 2열 레이아웃으로 자동 배치
⚠️ 풍경·장면·차트 이미지를 위쪽에 크게 보여주면서 하단에 정보 나열할 때 사용

**top_info**
```json
{
  "title": "연준 금리 동결의 배경",
  "subtitle": "2026년 3월 FOMC 회의",
  "items": [
    { "text": "인플레이션 2.8%로 목표 초과", "bold": "2.8%" },
    { "icon": "📊", "text": "고용시장 여전히 견조", "bold": "견조" },
    { "text": "관세 영향 불확실성 지속", "bold": "불확실성" },
    { "icon": "⚠️", "text": "경기침체 신호는 아직 미약", "sub": "GDP 성장률 1.4%" }
  ]
}
```
⚠️ 상단 흰색 배경 + 아래쪽 배경 이미지 노출
⚠️ items: 2열 레이아웃으로 자동 배치
⚠️ 아래쪽에 장면·풍경 이미지를 보여주면서 상단에 정보 나열할 때 사용

**white_quote**
```json
{
  "quote": "결국 모든 돈이 미국으로 흘러가고 있습니다. 이건 단순한 환율 문제가 아닙니다.",
  "highlight": "모든 돈이 미국으로",
  "source": "김영익 서강대 교수",
  "context": "2026년 3월 경제 세미나 발표"
}
```
⚠️ quote: 큰 문장 (한 줄 또는 두 줄)
⚠️ highlight: quote 내에서 강조할 부분 (빨간색 표시)
⚠️ source: 출처/발언자
⚠️ 전문가 발언, 핵심 인사이트, 충격적 사실을 극적으로 보여줄 때 사용

**split_overlay**
```json
{
  "title": "정부 발표 vs 실제 데이터",
  "left": {
    "header": "정부 발표",
    "color": "#2563eb",
    "items": [
      "경제 성장률 목표 2.5%",
      "물가 안정세 진입",
      "고용 회복 순조로움"
    ]
  },
  "right": {
    "header": "실제 데이터",
    "color": "#dc2626",
    "items": [
      "실질 성장률 1.2%",
      "체감 물가 5% 이상",
      "청년 실업률 역대 최고"
    ]
  }
}
```
⚠️ left/right: 각각 header(색상 배경) + items(불릿 목록)
⚠️ title: 선택적 상단 제목
⚠️ 주장vs현실, 전vs후, 찬vs반, 기대vs결과 등 대조할 때 사용

**white_stat**
```json
{
  "label": "미국 국가 부채",
  "value": "$36.2조",
  "change": "▲ $1.8조 (전년 대비)",
  "description": "역대 최고치 경신, GDP 대비 120% 돌파",
  "sub": "미국 재무부 2026년 3월 기준"
}
```
⚠️ value: 큰 숫자 (화면 중앙 대형 표시)
⚠️ change: 변동 표시 (▲/▼ 또는 +/-, 빨강/초록 자동 적용)
⚠️ 충격적 통계, 핵심 수치를 극적으로 강조할 때 사용

**white_timeline**
```json
{
  "title": "트럼프 관세 전쟁 타임라인",
  "events": [
    { "date": "2025.01", "text": "취임 직후 중국 10% 관세", "icon": "🇨🇳" },
    { "date": "2025.04", "text": "상호관세 발표", "icon": "📋" },
    { "date": "2025.08", "text": "EU 자동차 25%", "icon": "🇪🇺" },
    { "date": "2026.01", "text": "중국 60% 전면 확대", "icon": "💥" }
  ]
}
```
⚠️ events: 3~5개 권장 (가로 배치)
⚠️ 사건 연대기, 정책 변천사, 단계별 전개 과정에 사용

**white_callout**
```json
{
  "icon": "💡",
  "title": "핵심은 이겁니다",
  "description": "원화 약세의 진짜 원인은 금리 격차가 아니라 자본 유출 구조 자체에 있습니다",
  "highlight": "자본 유출 구조",
  "source": "한국은행 자본수지 데이터 분석"
}
```
⚠️ highlight: description 내에서 주황색 강조할 부분
⚠️ 핵심 결론, 깨달음, 인사이트를 극적으로 전달할 때 사용

**white_ranking**
```json
{
  "title": "글로벌 GDP 성장률 순위",
  "subtitle": "2026년 전망 / IMF",
  "items": [
    { "rank": 1, "name": "인도", "value": "6.8%", "change": "▲ 0.3%p" },
    { "rank": 2, "name": "중국", "value": "4.2%", "change": "▼ 0.5%p" },
    { "rank": 3, "name": "미국", "value": "1.8%", "change": "▼ 0.7%p" },
    { "rank": 4, "name": "한국", "value": "1.4%", "change": "▼ 0.4%p" },
    { "rank": 5, "name": "일본", "value": "0.9%", "change": "▲ 0.1%p" }
  ]
}
```
⚠️ items: 3~6개 권장, 상위 3개는 메달+강조 표시
⚠️ 국가·종목·지표 순위 비교에 사용

**diagonal_info**
```json
{
  "title": "바이든 행정부의 딜레마",
  "subtitle": "2026년 대선 전략",
  "items": [
    { "text": "인플레이션 억제와 경기 부양 사이 갈등", "bold": "갈등" },
    { "icon": "📊", "text": "지지율 38%로 역대 최저", "bold": "38%", "sub": "갤럽 여론조사" },
    { "text": "중산층 세금 감면 공약 이행 압박", "bold": "세금 감면" }
  ]
}
```
⚠️ 좌하단에 콘텐츠, 우상단에 배경 이미지 노출 (대각선 분할)
⚠️ 역동적 레이아웃이 필요할 때, 중앙/좌우 배치가 연속될 때 변칙 사용

**white_checklist**
```json
{
  "title": "투자 전 체크리스트",
  "subtitle": "이 항목을 확인하세요",
  "items": [
    { "text": "PER이 업종 평균 이하인가?", "checked": true },
    { "text": "최근 3분기 연속 매출 성장?", "checked": true },
    { "text": "부채비율 100% 이하?", "checked": false },
    { "text": "경영진 자사주 매입 이력?", "checked": false },
    { "text": "배당 성향 30% 이상?", "checked": true }
  ]
}
```
⚠️ checked: true면 체크 완료(주황 강조), false면 미체크(회색)
⚠️ 투자 기준, 리스크 점검, 자격 요건 확인에 사용

**white_pros_cons**
```json
{
  "title": "금리 인하의 장단점",
  "pros": {
    "header": "기대 효과",
    "items": [
      "부동산·주식 시장 활성화",
      "기업 투자 확대 기대",
      "소비 심리 회복"
    ]
  },
  "cons": {
    "header": "우려 사항",
    "items": [
      "원화 약세 가속",
      "가계부채 재증가",
      "자산 버블 우려"
    ]
  }
}
```
⚠️ pros/cons: 각각 header + items 배열
⚠️ 정책·투자·기술의 장단점을 비교할 때 사용

**white_scenario**
```json
{
  "title": "2026년 하반기 환율 시나리오",
  "scenarios": [
    { "label": "낙관 시나리오", "color": "#16a34a", "probability": "30%", "description": "연준 금리 인하 시작, 달러 약세 전환으로 원/달러 1,300원대 진입" },
    { "label": "기본 시나리오", "color": "#2563eb", "probability": "50%", "description": "현 수준 유지, 원/달러 1,400~1,450원 박스권" },
    { "label": "비관 시나리오", "color": "#dc2626", "probability": "20%", "description": "무역 전쟁 심화, 원/달러 1,500원 돌파" }
  ]
}
```
⚠️ scenarios: 2~3개 권장, color로 시각 구분, probability 선택적
⚠️ 시장 전망, 정책 시나리오 분석에 사용

**white_warning**
```json
{
  "level": "danger",
  "title": "환율 방어선 붕괴 위험",
  "description": "원/달러 환율이 1,480원을 돌파하면 외국인 자금 이탈이 가속화되며 1997년 외환위기 수준에 근접합니다",
  "highlight": "1997년 외환위기",
  "source": "한국은행 외환보유액 보고서"
}
```
⚠️ level: "caution"(주의/주황), "danger"(위험/빨강), "critical"(긴급/어두운빨강+깜빡임)
⚠️ highlight: description 내 강조 부분
⚠️ 리스크 경고, 위험 신호, 긴급 상황 알림에 사용

**white_summary**
```json
{
  "title": "오늘의 핵심 정리",
  "points": [
    { "text": "트럼프 관세 정책으로 글로벌 무역량 3.2% 감소", "bold": "3.2%" },
    { "text": "원화 약세의 본질은 구조적 자본 유출", "bold": "구조적 자본 유출" },
    { "text": "한국은행 금리 인하 시기가 핵심 변수", "bold": "금리 인하 시기" }
  ],
  "conclusion": "결국 환율 안정은 금리 격차 해소 없이는 불가능합니다"
}
```
⚠️ points: 번호가 자동 부여되는 핵심 포인트
⚠️ conclusion: 하단 결론 박스 (선택적)
⚠️ 영상 마무리, 핵심 내용 정리에 사용

**side_quote**
```json
{
  "quote": "이건 단순한 환율 문제가 아닙니다. 구조적 자본 유출입니다.",
  "highlight": "구조적 자본 유출",
  "source": "김영익 서강대 교수",
  "context": "2026년 경제 세미나",
  "side": "left"
}
```
⚠️ side: "left" 또는 "right" — 인용문 위치 (반대쪽 배경 노출)
⚠️ 전문가 발언, 핵심 인사이트를 비대칭으로 강조할 때 사용

**side_warning**
```json
{
  "icon": "🚨",
  "title": "환율 1,500원 돌파 시 위험 요소",
  "items": [
    { "text": "외국인 자금 대규모 이탈 가능", "bold": "대규모 이탈" },
    { "text": "수입 물가 급등으로 체감 물가 상승", "bold": "체감 물가" },
    { "text": "한국은행 긴급 금리 인상 압박", "bold": "긴급 금리 인상" }
  ],
  "side": "right",
  "color": "#dc2626"
}
```
⚠️ color: 강조 색상 (기본 빨강), side: 좌/우 선택
⚠️ 리스크 요소, 위험 시나리오를 비대칭 레이아웃으로 나열할 때 사용

**side_stat**
```json
{
  "label": "원/달러 환율",
  "value": "1,487원",
  "change": "▲ 42원 (전일 대비)",
  "items": [
    { "text": "2008년 금융위기 이후 최고치", "bold": "최고치" },
    { "text": "한국은행 구두개입 실시", "bold": "구두개입" }
  ],
  "side": "left"
}
```
⚠️ 큰 숫자 + 보조 항목을 한쪽에 배치, 반대쪽 배경 이미지 노출
⚠️ 충격적 수치를 배경 이미지와 함께 극적으로 표현할 때 사용

**side_timeline**
```json
{
  "title": "한국 금리 인하 과정",
  "events": [
    { "date": "2024.10", "text": "기준금리 3.5% → 3.25% 첫 인하", "icon": "📉" },
    { "date": "2025.02", "text": "3.25% → 3.0% 추가 인하", "icon": "📉" },
    { "date": "2025.08", "text": "3.0% → 2.75% 세 번째 인하", "icon": "📉" },
    { "date": "2026.01", "text": "2.75% 동결 (환율 부담)", "icon": "⏸️" }
  ],
  "side": "right"
}
```
⚠️ 세로 타임라인을 좌/우에 배치, 반대쪽 배경 이미지 노출
⚠️ 사건 연대기, 정책 변천사를 비대칭으로 표현할 때 사용

**side_checklist**
```json
{
  "title": "ETF 투자 체크리스트",
  "subtitle": "매수 전 확인사항",
  "items": [
    { "text": "운용보수 0.3% 이하?", "checked": true },
    { "text": "순자산 1,000억 이상?", "checked": true },
    { "text": "추적오차 1% 이내?", "checked": false },
    { "text": "일평균 거래량 충분?", "checked": true }
  ],
  "side": "left"
}
```
⚠️ 체크리스트를 좌/우에 배치, 반대쪽 배경 이미지 노출
⚠️ 투자 기준·조건 점검을 비대칭으로 표현할 때 사용

**dark_side_info**
```json
{
  "title": "글로벌 금융 위기 신호",
  "subtitle": "2026년 주요 리스크",
  "side": "left",
  "items": [
    { "text": "미국 국채 금리 5% 돌파", "bold": "5%" },
    { "icon": "📉", "text": "신흥국 자금 이탈 가속화", "bold": "자금 이탈" },
    { "text": "원자재 가격 급등으로 인플레 재발", "bold": "인플레 재발", "sub": "유가 $120 돌파" }
  ]
}
```
⚠️ side: "left" 또는 "right", 흰색 테마의 side_info와 동일 구조
⚠️ 어두운 분위기, 위기·긴장·야간 장면에 사용, 강조색은 티파니 블루

**dark_center_info**
```json
{
  "title": "긴급 경제 상황 요약",
  "subtitle": "2026년 4월 기준",
  "items": [
    { "icon": "🚨", "text": "코스피 2,100선 붕괴", "bold": "2,100선" },
    { "text": "외국인 순매도 10조원 돌파", "bold": "10조원" },
    { "text": "원/달러 1,500원 근접", "bold": "1,500원", "sub": "장중 최고치" }
  ]
}
```
⚠️ 중앙 어두운 배경 + 양쪽 배경 이미지 노출
⚠️ 심각한 내용, 경고성 정보, 위기 상황 요약에 사용

**dark_top_info**
```json
{
  "title": "위기 시그널 점검",
  "items": [
    { "text": "VIX 지수 35 돌파", "bold": "35" },
    { "icon": "📊", "text": "신용 스프레드 급확대", "bold": "급확대" },
    { "text": "역레포 잔고 급감", "bold": "급감" },
    { "icon": "⚠️", "text": "은행 CDS 프리미엄 상승", "sub": "2020년 이후 최고" }
  ]
}
```
⚠️ 상단 어두운 배경 + 아래쪽 배경 이미지 노출, 2열 레이아웃

**dark_bottom_info**
```json
{
  "title": "시장 충격 요인",
  "subtitle": "트럼프 관세 발표 후",
  "items": [
    { "text": "다우 -1,200포인트 폭락", "bold": "-1,200포인트" },
    { "icon": "💵", "text": "달러 인덱스 107 돌파", "bold": "107" },
    { "text": "금 가격 사상 최고치", "bold": "사상 최고치" },
    { "icon": "🛢️", "text": "유가 $95 급등", "bold": "$95" }
  ]
}
```
⚠️ 하단 어두운 배경 + 위쪽 배경 이미지 노출, 2열 레이아웃

**dark_quote**
```json
{
  "quote": "우리는 지금 1997년과 매우 유사한 상황을 목격하고 있습니다",
  "highlight": "1997년과 매우 유사한",
  "source": "이창용 한국은행 총재",
  "context": "2026년 긴급 기자회견",
  "side": "right"
}
```
⚠️ side: "left" 또는 "right", 어두운 배경 + 반대쪽 배경 노출
⚠️ 강조색은 티파니 블루, 긴장감 있는 발언·경고에 사용

**dark_stat**
```json
{
  "label": "코스피 낙폭",
  "value": "-4.2%",
  "change": "▼ 102포인트",
  "description": "2008년 금융위기 이후 일일 최대 낙폭",
  "sub": "2026년 4월 7일 장마감 기준",
  "side": "left"
}
```
⚠️ side: "left"/"right", 어두운 배경 + 반대쪽 배경 노출
⚠️ 충격적 수치를 어두운 분위기에서 극적으로 표현할 때 사용

**dark_timeline**
```json
{
  "title": "위기 확산 과정",
  "events": [
    { "date": "4월 2일", "text": "트럼프 상호관세 발표", "icon": "📢" },
    { "date": "4월 3일", "text": "아시아 증시 일제히 폭락", "icon": "📉" },
    { "date": "4월 5일", "text": "원/달러 1,480원 돌파", "icon": "💵" },
    { "date": "4월 7일", "text": "코스피 서킷브레이커 발동", "icon": "🚨" }
  ],
  "side": "right"
}
```
⚠️ side: "left"/"right", 어두운 배경의 세로 타임라인
⚠️ 위기 확산·사건 전개를 긴장감 있게 표현할 때 사용

**dark_warning**
```json
{
  "icon": "🔴",
  "title": "긴급 리스크 경고",
  "items": [
    { "text": "외국인 매도 규모 역대 최대", "bold": "역대 최대" },
    { "text": "환율 방어 한계점 근접", "bold": "한계점" },
    { "text": "한국 CDS 프리미엄 급등", "bold": "급등" }
  ],
  "side": "left",
  "color": "#ef4444"
}
```
⚠️ 어두운 배경에서 위험 요소를 강렬하게 나열할 때 사용

**dark_summary**
```json
{
  "title": "오늘의 핵심 정리",
  "points": [
    { "text": "글로벌 관세 전쟁으로 무역량 3.2% 감소", "bold": "3.2%" },
    { "text": "신흥국 자금 이탈 가속화", "bold": "자금 이탈" },
    { "text": "한국 경제 성장률 하향 조정", "bold": "하향 조정" }
  ],
  "conclusion": "결국 글로벌 공급망 재편이 핵심 변수입니다"
}
```
⚠️ 어두운 중앙 배경 + 좌우 배경 노출, 핵심 정리에 사용

**dark_split**
```json
{
  "title": "시장 기대 vs 현실",
  "left": {
    "header": "시장 기대",
    "color": "#16a34a",
    "items": ["연준 6월 금리 인하", "달러 약세 전환", "신흥국 자금 유입"]
  },
  "right": {
    "header": "현실",
    "color": "#ef4444",
    "items": ["인플레 재발 우려", "달러 강세 지속", "자금 이탈 가속"]
  }
}
```
⚠️ 어두운 배경 + 상하 배경 노출, 대조·비교에 사용

**side_donut**
```json
{
  "title": "글로벌 반도체 시장 점유율",
  "subtitle": "2026년 1분기 기준",
  "side": "left",
  "segments": [
    { "label": "TSMC", "value": 54, "color": "#2563eb" },
    { "label": "삼성", "value": 17, "color": "#16a34a" },
    { "label": "인텔", "value": 12, "color": "#e67e22" },
    { "label": "기타", "value": 17, "color": "#999" }
  ]
}
```
⚠️ segments: 3~5개 권장, value는 % 수치
⚠️ 포트폴리오 구성비, 시장 점유율, 투표 비율 시각화에 사용

**side_bar_chart**
```json
{
  "title": "주요국 기준금리 비교",
  "subtitle": "2026년 4월 기준",
  "side": "right",
  "bars": [
    { "label": "미국", "value": 5.25, "color": "#2563eb" },
    { "label": "유로존", "value": 3.75, "color": "#e67e22" },
    { "label": "한국", "value": 2.75, "color": "#16a34a" },
    { "label": "일본", "value": 0.5, "color": "#ef4444" }
  ],
  "unit": "%"
}
```
⚠️ bars: 3~6개 권장, unit으로 단위 지정
⚠️ 항목별 수치 비교, 국가·종목·지표 순위에 사용

**side_gauge**
```json
{
  "title": "시장 공포 지수",
  "label": "공포탐욕지수",
  "value": 22,
  "min": 0,
  "max": 100,
  "zones": [
    { "color": "#ef4444", "label": "극도 공포" },
    { "color": "#f97316", "label": "공포" },
    { "color": "#eab308", "label": "중립" },
    { "color": "#16a34a", "label": "탐욕" }
  ],
  "description": "극도 공포 구간 진입",
  "side": "left"
}
```
⚠️ zones: 3~4개 구간, value가 바늘 위치 결정
⚠️ 공포탐욕지수, 경기온도, 위험도 등 게이지 시각화에 사용

**side_line_chart**
```json
{
  "title": "원/달러 환율 추이",
  "subtitle": "2025~2026년",
  "side": "left",
  "values": [1320, 1350, 1380, 1400, 1420, 1450, 1470, 1487],
  "labels": ["2025.Q1", "Q2", "Q3", "Q4", "2026.Q1", "Q2"],
  "color": "#ef4444",
  "unit": "원"
}
```
⚠️ values: 숫자 배열, labels: X축 라벨 (values보다 적어도 됨)
⚠️ 가격·지표 추이, 시계열 데이터 시각화에 사용

**side_radar**
```json
{
  "title": "삼성전자 종합 평가",
  "subtitle": "5점 만점 기준",
  "side": "right",
  "axes": [
    { "label": "성장성", "value": 72, "max": 100 },
    { "label": "수익성", "value": 85, "max": 100 },
    { "label": "안정성", "value": 90, "max": 100 },
    { "label": "배당", "value": 60, "max": 100 },
    { "label": "밸류", "value": 78, "max": 100 }
  ],
  "color": "#2563eb"
}
```
⚠️ axes: 4~6개 권장, value/max로 비율 계산
⚠️ 종목·기업·국가 종합 평가, 다면 비교에 사용

**dark_donut**
```json
{
  "title": "외국인 매도 비중",
  "subtitle": "2026년 4월 코스피",
  "side": "right",
  "segments": [
    { "label": "외국인 매도", "value": 62, "color": "#ef4444" },
    { "label": "기관 매도", "value": 23, "color": "#f97316" },
    { "label": "개인 매수", "value": 15, "color": "#81D8D0" }
  ]
}
```
⚠️ 검정 배경 도넛, 위기·야간 분위기에서 구성비 시각화

**dark_bar_chart**
```json
{
  "title": "신흥국 자금 유출 규모",
  "subtitle": "2026년 1분기 / 억 달러",
  "side": "left",
  "bars": [
    { "label": "한국", "value": 82, "color": "#ef4444" },
    { "label": "대만", "value": 65, "color": "#f97316" },
    { "label": "인도", "value": 41, "color": "#eab308" },
    { "label": "브라질", "value": 33, "color": "#81D8D0" }
  ],
  "unit": "억$"
}
```
⚠️ 검정 배경 가로 막대, 티파니/빨강 바 색상

**dark_gauge**
```json
{
  "title": "VKOSPI 변동성 지수",
  "label": "변동성",
  "value": 38,
  "min": 0,
  "max": 60,
  "zones": [
    { "color": "#16a34a", "label": "안정" },
    { "color": "#eab308", "label": "주의" },
    { "color": "#f97316", "label": "경계" },
    { "color": "#ef4444", "label": "공포" }
  ],
  "description": "경계 구간 진입",
  "side": "right"
}
```
⚠️ 검정 배경 반원 게이지, 흰색 바늘

**dark_line_chart**
```json
{
  "title": "코스피 지수 추이",
  "subtitle": "최근 8개월",
  "side": "left",
  "values": [2650, 2580, 2520, 2480, 2350, 2280, 2150, 2100],
  "labels": ["9월", "10월", "11월", "12월", "1월", "2월", "3월", "4월"],
  "color": "#ef4444",
  "unit": ""
}
```
⚠️ 검정 배경 꺾은선, 하락 추이·위기 시각화에 적합

**dark_radar**
```json
{
  "title": "한국 경제 리스크 평가",
  "subtitle": "100점 만점 (높을수록 위험)",
  "side": "right",
  "axes": [
    { "label": "환율", "value": 88, "max": 100 },
    { "label": "금리", "value": 65, "max": 100 },
    { "label": "부채", "value": 78, "max": 100 },
    { "label": "성장", "value": 42, "max": 100 },
    { "label": "물가", "value": 71, "max": 100 }
  ],
  "color": "#ef4444"
}
```
⚠️ 검정 배경 레이더, 빨강/티파니 강조, 위기 종합 평가에 사용

**glass_card**
```json
{
  "title": "엔비디아 핵심 실적",
  "cards": [
    { "icon": "💰", "label": "4분기 매출", "value": "681억$", "sub": "전년 대비 +73%" },
    { "icon": "📈", "label": "영업이익률", "value": "65%", "sub": "소프트웨어 기업 수준" },
    { "icon": "🏆", "label": "PER", "value": "22배", "sub": "역사적 저점" }
  ]
}
```
⚠️ cards: 2~4개 권장, 반투명 유리 카드가 배경 위에 떠 있는 효과
⚠️ 고급스러운 수치 나열, 실적 발표, 핵심 데이터 요약에 사용

**spotlight_reveal**
```json
{
  "title": "아무도 모르는 3가지 사실",
  "facts": [
    { "icon": "🔍", "text": "트럼프는 2019년까지 비트코인을 사기라고 불렀다" },
    { "icon": "💵", "text": "밈코인 발행사는 수수료만 1억 달러를 벌었다" },
    { "icon": "🎭", "text": "실제 거래량의 70%가 봇 거래였다" }
  ]
}
```
⚠️ facts: 2~4개 권장, 어둠 속에서 하나씩 스포트라이트로 공개
⚠️ 충격 사실, 비밀 공개, 반전 포인트에 사용

**newspaper_clip**
```json
{
  "headline": "한국은행, 기준금리 전격 동결 결정",
  "highlight": "전격 동결",
  "body": "한국은행 금융통화위원회는 25일 기준금리를 연 2.75%로 동결했다. 시장은 인하를 예상했으나 환율 부담이 결정적 요인으로 작용했다.",
  "source": "한국경제신문",
  "date": "2026년 3월 25일"
}
```
⚠️ highlight: 헤드라인 내 형광펜 강조 부분
⚠️ 뉴스 보도 인용, 공식 발표, 역사적 기사 재현에 사용

**counter_reveal**
```json
{
  "title": "트럼프 관세의 실제 영향",
  "counters": [
    { "label": "관세 대상 품목", "value": 12500, "suffix": "개", "color": "#ef4444" },
    { "label": "평균 관세율", "value": 45, "suffix": "%", "color": "#f97316" },
    { "label": "영향 받는 기업", "value": 3200, "suffix": "곳", "color": "#81D8D0" }
  ]
}
```
⚠️ counters: 2~4개 권장, 숫자가 0부터 빠르게 돌아가다 최종값에 멈춤
⚠️ 극적 수치 공개, 충격적 통계, 누적 데이터 공개에 사용

**text_reveal**
```json
{
  "text": "결국 모든 돈은 미국으로 흘러갑니다",
  "highlight": "미국으로",
  "sub": "— 이것이 환율 위기의 본질입니다",
  "speed": 2
}
```
⚠️ speed: 프레임당 글자 수 (기본 2, 높을수록 빠름)
⚠️ highlight: 타이핑 완료 후 티파니 색상으로 강조
⚠️ 핵심 한 줄 임팩트, 결론, 충격 문장에 사용

**postit_board**
```json
{
  "title": "트럼프 관세 핵심 쟁점",
  "notes": [
    { "text": "중국산 60% 관세\n역대 최고 수준", "color": "#fff9c4", "pin": "📌" },
    { "text": "EU 자동차 25%\n보복 관세 예고", "color": "#bbdefb", "pin": "📍" },
    { "text": "멕시코·캐나다\nUSMCA 재협상", "color": "#c8e6c9" },
    { "text": "글로벌 무역량\n3.2% 감소 전망", "color": "#f8bbd0", "pin": "⚠️" }
  ]
}
```
⚠️ notes: 3~6개 권장, color로 메모지 색상 지정 (기본 6색 로테이션)
⚠️ 브레인스토밍, 핵심 요점 나열, 정보 정리에 사용

**receipt_card**
```json
{
  "store": "트럼프 관세 청구서",
  "date": "2026년 4월",
  "items": [
    { "name": "소비자 물가 상승", "price": "+$1,200/년" },
    { "name": "기업 원가 부담", "price": "+15%" },
    { "name": "일자리 감소", "price": "-340만개" },
    { "name": "GDP 성장률 하락", "price": "-0.8%p" }
  ],
  "total": "국민 1인당 $3,400",
  "footer": "※ 시카고대 경제연구소 추정"
}
```
⚠️ 영수증 스타일로 비용/대가를 시각화, 정책 비용·손익 계산에 사용

**stamp_card**
```json
{
  "verdict": "거짓",
  "title": "정부: 환율은 일시적 현상이다",
  "description": "실제로는 42개월 연속 금리 역전이 지속 중이며, 구조적 자본 유출이 원인입니다",
  "stamp_color": "#ef4444",
  "stamp_text": "거짓"
}
```
⚠️ stamp_text: 도장에 들어갈 텍스트 (팩트/거짓/승인/기각/위험/확인 등)
⚠️ stamp_color: 도장 색상 (빨강=거짓, 초록=팩트 등)
⚠️ 팩트체크, 판정, 결론 선언에 사용

**xray_reveal**
```json
{
  "surface": "정부 발표: 경제 안정적",
  "reality": "실제: 구조적 위기 진행 중",
  "surface_items": ["GDP 성장률 목표 달성", "실업률 안정", "물가 둔화세"],
  "reality_items": ["체감 성장률 0%대", "청년 실업 역대 최고", "식품·주거비 폭등"]
}
```
⚠️ 좌: 표면(밝은 배경) / 우: 진실(어두운 배경), 스캔 라인이 가로질러 감
⚠️ 주장vs현실, 겉vs속, 공식발표vs실제 대조에 사용

**magnify_reveal**
```json
{
  "title": "계약서 세부 조항",
  "main_text": "본 협정에 따라 상호 관세를 단계적으로 조정하되 예외 품목에 대해서는 별도 협의한다",
  "highlight": "예외 품목",
  "detail": "이 '예외 품목'이 바로 반도체와 배터리입니다. 한국 수출의 40%가 여기에 해당합니다.",
  "source": "USTR 관세 협정문 제3조"
}
```
⚠️ main_text는 흐리게, highlight 부분만 돋보기로 확대+강조
⚠️ 숨겨진 디테일, 놓치기 쉬운 핵심, 계약/법안 분석에 사용

### polaroid_stack
```json
{
  "title": "글로벌 위기 타임라인",
  "photos": [
    { "caption": "2008 금융위기\n리먼 파산", "label": "📉" },
    { "caption": "2020 코로나\n팬데믹 충격", "label": "🦠" },
    { "caption": "2024 관세전쟁\n공급망 위기", "label": "⚠️" }
  ]
}
```

### chat_message
```json
{
  "title": "경제 전문가 대화방",
  "messages": [
    { "sender": "기자", "text": "금리 인하 언제쯤 가능할까요?" },
    { "sender": "전문가", "text": "최소 3분기는 더 지켜봐야 합니다", "isMe": true },
    { "sender": "기자", "text": "시장 반응은 어떨까요?" },
    { "sender": "전문가", "text": "이미 선반영된 부분이 많습니다", "isMe": true }
  ]
}
```

### flip_card
```json
{
  "front_title": "왜 물가가 안 잡힐까?",
  "front_text": "금리를 올려도 물가가 계속 오르는 이유",
  "back_title": "공급 측 인플레이션",
  "back_text": "수요가 아닌 공급망 문제가 핵심 원인"
}
```

### wanted_poster
```json
{
  "name": "가계부채 폭탄",
  "description": "한국 경제 최대 리스크",
  "charges": ["GDP 대비 가계부채 108%", "변동금리 비중 75%", "DSR 초과 차주 급증", "부동산 PF 부실 연쇄"],
  "reward": "1,900조 원"
}
```

### password_crack
```json
{
  "title": "핵심 키워드를 해독합니다",
  "revealed_text": "디커플링",
  "hint": "미중 경제가 분리되고 있다"
}
```

### blueprint
```json
{
  "title": "반도체 공급망 구조",
  "components": [
    { "name": "설계 (Design)", "detail": "퀄컴, 애플, 엔비디아" },
    { "name": "제조 (Fabrication)", "detail": "TSMC, 삼성" },
    { "name": "패키징 (Packaging)", "detail": "ASE, 앰코" },
    { "name": "장비 (Equipment)", "detail": "ASML, 도쿄일렉트론" }
  ],
  "note": "한 단계라도 막히면 전체 공급망 중단"
}
```

### file_folder
```json
{
  "classification": "CLASSIFIED",
  "title": "비공개 무역 협상 내역",
  "stamp": "극비",
  "contents": [
    { "label": "협상 대상", "value": "반도체·배터리" },
    { "label": "관세율 합의", "value": "15% → 8%" },
    { "label": "유예 기간", "value": "2027년까지" },
    { "label": "조건", "value": "대중국 수출 제한" }
  ]
}
```

### torn_paper
```json
{
  "top_title": "정부 발표: 고용 시장 안정",
  "top_items": ["실업률 2.8% 유지", "취업자 수 증가", "고용률 역대 최고"],
  "bottom_title": "실제: 고용의 질 악화",
  "bottom_items": ["비정규직 비율 38%", "청년 체감실업률 21%", "주 36시간 미만 근로자 급증"]
}
```

### radar_scan
```json
{
  "title": "리스크 탐지 스캔",
  "targets": [
    { "name": "부동산 PF", "value": "위험도 95%" },
    { "name": "가계부채", "value": "위험도 88%" },
    { "name": "환율 변동", "value": "위험도 72%" },
    { "name": "수출 둔화", "value": "위험도 65%" },
    { "name": "인구 감소", "value": "위험도 82%" }
  ]
}
```

### ticket_stub
```json
{
  "event": "2026 글로벌 경제 위기",
  "date": "2026.04.05",
  "venue": "WORLD ECONOMY",
  "details": [
    { "label": "유형", "value": "복합 위기" },
    { "label": "진원지", "value": "미국 관세" },
    { "label": "피해 규모", "value": "$2.3T" },
    { "label": "영향국", "value": "147개국" }
  ],
  "code": "CRISIS-2026"
}
```

### blueprint_anatomy
```json
{
  "title": "테슬라 사업 해부",
  "subject": "테슬라",
  "parts": [
    { "label": "전기차", "detail": "Model 3/Y/S/X" },
    { "label": "에너지 저장", "detail": "Megapack, Powerwall" },
    { "label": "자율주행", "detail": "FSD 소프트웨어" },
    { "label": "로보택시", "detail": "Cybercab 2026" },
    { "label": "AI/로봇", "detail": "Optimus 휴머노이드" }
  ],
  "note": "5개 사업이 하나의 생태계를 형성"
}
```

### blueprint_equation
```json
{
  "title": "기업가치 산출 공식",
  "equation": "EV = 매출 × PSR",
  "variables": [
    { "symbol": "EV", "name": "기업가치", "detail": "Enterprise Value" },
    { "symbol": "매출", "name": "연매출", "detail": "240억 달러" },
    { "symbol": "PSR", "name": "주가매출비율", "detail": "94배 적용" }
  ],
  "result": "약 2.25조 달러",
  "note": "PSR 94배는 역사적으로 매우 높은 수준"
}
```

### blueprint_spec
```json
{
  "title": "스페이스X 핵심 스펙",
  "subtitle": "2026년 4월 기준",
  "specs": [
    { "label": "기업가치", "value": "1.75조", "unit": "달러" },
    { "label": "연매출", "value": "240억", "unit": "달러" },
    { "label": "연간 발사", "value": "165", "unit": "회" },
    { "label": "스타링크 구독자", "value": "1,000만", "unit": "명" },
    { "label": "시장 점유율", "value": "60", "unit": "%" },
    { "label": "직원 수", "value": "13,000", "unit": "명" }
  ],
  "note": "민간 우주기업 중 압도적 1위"
}
```

### blueprint_cross_section
```json
{
  "title": "자본 구조 단면도",
  "layers": [
    { "name": "보통주 (Class A)", "detail": "일반 투자자 배정" },
    { "name": "우선주 (Series N)", "detail": "초기 투자자 전환" },
    { "name": "전환사채", "detail": "기관 투자 유치분" },
    { "name": "스톡옵션 풀", "detail": "임직원 인센티브" },
    { "name": "창업자 지분", "detail": "머스크 42% 보유" }
  ],
  "note": "IPO 시 유통물량은 전체의 3~4% 수준"
}
```

### evidence_board
```json
{
  "title": "머스크 기업 관계도",
  "clues": [
    { "label": "테슬라", "detail": "전기차·에너지", "icon": "🚗" },
    { "label": "스페이스X", "detail": "로켓·위성", "icon": "🚀" },
    { "label": "xAI", "detail": "AI·그록", "icon": "🤖" },
    { "label": "스타링크", "detail": "인터넷·통신", "icon": "📡" },
    { "label": "보링컴퍼니", "detail": "터널·인프라", "icon": "🔧" }
  ],
  "connections": [[0,1],[1,2],[1,3],[0,2]],
  "note": "모든 기업이 상호 연결된 생태계"
}
```

### terminal_log
```json
{
  "title": "SEC 공시 분석",
  "logs": [
    { "prefix": "SEC", "text": "S-1 Filing detected: SpaceX Inc.", "color": "green" },
    { "prefix": ">>>", "text": "Valuation: $1.75T (PSR 94x)", "color": "yellow" },
    { "prefix": ">>>", "text": "Float: 3-4% of total shares", "color": "white" },
    { "prefix": ">>>", "text": "Insider lock-up: 180 days", "color": "white" },
    { "prefix": "⚠", "text": "WARNING: Keyman risk — single founder dependency", "color": "red" }
  ],
  "status": "Analysis complete. Risk level: ELEVATED"
}
```

### control_room
```json
{
  "title": "시장 종합 현황판",
  "panels": [
    { "label": "S&P 500", "value": "5,420", "sub": "전일 대비", "status": "up" },
    { "label": "나스닥", "value": "17,200", "sub": "기술주 강세", "status": "up" },
    { "label": "원달러", "value": "1,380", "sub": "환율 상승", "status": "down" },
    { "label": "VIX", "value": "18.5", "sub": "공포지수", "status": "neutral" },
    { "label": "비트코인", "value": "$68,500", "sub": "24시간", "status": "up" },
    { "label": "국채 10Y", "value": "4.25%", "sub": "금리 상승", "status": "down" }
  ],
  "alert": "연준 FOMC 회의 D-3"
}
```

### film_reel
```json
{
  "title": "스페이스X IPO 로드맵",
  "frames": [
    { "year": "2002", "label": "스페이스X 설립", "detail": "머스크 1억 달러 투자" },
    { "year": "2015", "label": "팰컨9 착륙 성공", "detail": "재사용 로켓 시대" },
    { "year": "2020", "label": "유인 우주선", "detail": "NASA 크루 드래곤" },
    { "year": "2024", "label": "스타링크 흑자", "detail": "구독자 400만 돌파" },
    { "year": "2026", "label": "나스닥 IPO", "detail": "목표 1.75조 달러" }
  ],
  "note": "24년 만의 상장"
}
```

### scoreboard
```json
{
  "title": "분기 실적 비교",
  "rows": [
    { "label": "스타링크 매출", "score": "60억$", "change": "+45%", "highlight": true },
    { "label": "발사 서비스", "score": "32억$", "change": "+28%" },
    { "label": "정부 계약", "score": "18억$", "change": "+12%" },
    { "label": "스타십 R&D", "score": "-15억$", "change": "-8%" },
    { "label": "영업이익률", "score": "22%", "change": "+5%p", "highlight": true }
  ],
  "note": "스타링크가 전체 매출의 50% 이상 차지"
}
```

### envelope_reveal
```json
{
  "title": "IPO 공모가 결정",
  "category": "SPACEX INC. · NASDAQ",
  "result": "주당 $185",
  "detail": "시가총액 1.75조 달러 · 역대 최대 IPO",
  "verdict": "positive",
  "note": "6월 중순 나스닥 상장 예정"
}
```

