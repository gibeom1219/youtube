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

