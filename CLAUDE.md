# 유튜브 자동화 프로젝트

## 채널 소개
경제, 주식, 세계뉴스, 종목분석, 금융 전문 유튜브 채널.
구독자에게 친근하게 말하는 구어체 사용 (딱딱한 뉴스체 금지).

---

## 자동화 파이프라인 (3단계 Skills)

```
/write-script <주제>   → 대본 생성 → 사용자 검토
/make-audio <id>       → ElevenLabs TTS + Remotion props 생성
/make-video <id>       → Remotion 렌더링 → output.mp4
```

- 각 단계는 독립적으로 실행 가능
- Workspace ID는 자동 생성 (8자리 hex), `/home/user/workspaces/youtube/workspace/<id>/` 에 저장
- **대본은 반드시 사용자가 검토한 후 다음 단계 진행**
- 렌더링은 사용자가 명시적으로 요청할 때만 실행

### 핵심 파일 구조
```
workspace/<id>/
  script.json           ← write-script 결과
  audio.mp3             ← make-audio 결과
  word_timestamps.json  ← make-audio 결과
  remotion_props.json   ← make-audio 결과
  output.mp4            ← make-video 결과

orchestrator/
  run_script.py   ← /write-script 가 호출
  run_audio.py    ← /make-audio 가 호출
  run_video.py    ← /make-video 가 호출

remotion-project/src/
  compositions/FinanceVideo.tsx   ← 메인 영상 컴포지션
  visuals/                        ← 씬별 시각 컴포넌트
  components/                     ← 공통 컴포넌트
  styles/theme.ts                 ← 전체 색상/폰트 테마
```

---

## 비주얼 디자인 원칙

### 색상 테마: 티파니 블루
- 메인 컬러: `#81D8D0` (Tiffany Blue)
- 배경: `#060d0c` (딥 다크 틸)
- 모든 강조색은 `theme.ts`의 `accentColors` 또는 `theme.tiffany` 사용
- **절대 하드코딩 금지**: `rgba(255,215,0,...)` 같은 주황/골드 값 사용 안 함
- 폰트: `'NotoSansKR', 'NotoColorEmoji', sans-serif`

### 애니메이션 규칙
- **floating(둥둥 뜨는) 애니메이션 사용 금지** — 사용자가 명시적으로 거부
- 지속 애니메이션은 `Math.sin(frame * speed)`로 glow/opacity 펄싱만 허용 (위치 이동 없음)
- **opacity에 spring() 직접 사용 금지** → 요소가 사라지는 버그 발생
  - 대신 `interpolate(frame, [start, end], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })` 사용
- spring 설정: `damping: 100+`, `stiffness: 10` (기본값 — 전체 -40 누적 조정)
  - 제목류: stiffness 25 / 콘텐츠 요소: stiffness 5~10 / GaugeMeter 바늘: stiffness 25
- 항목 등장 간격: 최소 `i * 18` 프레임 이상 (너무 빠르면 안 됨)

### 자막 (Subtitle)
- 한 번에 표시되는 최대: 6단어 또는 16자
- 단어 하이라이트 색상 없음 (전체 흰색)
- `extrapolateRight: "clamp"` 적용

---

## 씬 타입별 컴포넌트

| visual_type | 컴포넌트 | 용도 |
|---|---|---|
| `intro_card` | IntroCard | 첫 씬, 제목+훅 |
| `outro_card` | OutroCard | 마지막 씬, 구독 유도 |
| `stat_card` | StatCard | 핵심 수치 강조 |
| `bullet_list` | BulletList | N가지 이유/목록 |
| `timeline` | Timeline | 시간 흐름 |
| `comparison` | Comparison | 두 가지 비교 |
| `number_highlight` | NumberHighlight | 숫자 하나 강조 |
| `keyword` | Keyword | 개념/용어 설명 |
| `chart` | ChartBar | 막대 차트 |
| `quote_card` | QuoteCard | 전문가/유명인 발언 인용 |
| `flow_diagram` | FlowDiagram | A→B→C 인과관계 흐름도 |
| `news_feed` | NewsFeed | 관련 뉴스 헤드라인 목록 |
| `step_flow` | StepFlow | 단계별 방법/절차 안내 |
| `table_data` | TableData | 여러 항목 표 형식 비교 |
| `pros_cons` | ProsConsCard | 장단점 ✅/❌ 나란히 비교 |
| `ranking_list` | RankingList | 순위/랭킹 목록 (1~3위 메달) |
| `callout_box` | CalloutBox | 핵심 결론/주의사항/인사이트 강조 |
| `ticker_board` | TickerBoard | 주식·지수·환율 현황판 |
| `icon_grid` | IconGrid | 이모지+텍스트 2~3열 그리드 |
| `percentage_bar` | PercentageBar | 가로 비율 막대 차트 |
| `dual_stat` | DualStat | 두 숫자 나란히 강조 |
| `scenario_card` | ScenarioCard | A/B/C 시나리오 카드 |
| `split_screen` | SplitScreen | Before/After 좌우 분할 |
| `world_stats` | WorldStats | 국가별 데이터 (국기+수치) |
| `gauge_meter` | GaugeMeter | 공포탐욕지수·경기 온도계 반원형 게이지 |
| `donut_chart` | DonutChart | 포트폴리오 구성비 도넛 파이 차트 |
| `alert_banner` | AlertBanner | 긴급 속보·BREAKING 배너 |
| `myth_vs_fact` | MythVsFact | 오해 vs 사실 대결 카드 |
| `checklist` | Checklist | 투자 체크리스트 |
| `trend_arrow` | TrendArrow | 상승/하락 트렌드 방향성 |
| `vs_battle` | VsBattle | 두 국가·세력·주체 대결 |
| `pyramid_chart` | PyramidChart | 소득·자산 계층 피라미드 |
| `interview_card` | InterviewCard | Q&A 인터뷰 형식 |
| `warning_card` | WarningCard | 위험 경고 카드 |
| `price_history` | PriceHistory | 가격 변동 히스토리 |
| `funnel_chart` | FunnelChart | 단계별 감소 깔때기 차트 |
| `calendar_event` | CalendarEvent | 주요 경제 일정 카드 |
| `bubble_compare` | BubbleCompare | 버블 크기 비교 |
| `key_takeaway` | KeyTakeaway | 핵심 요약 정리 박스 |
| `stock_card` | StockCard | 개별 종목 상세 카드 |
| `line_chart` | LineChart | 꺾은선 차트 (시간 추이/추세) |
| `heat_map` | HeatMap | 섹터·종목별 히트맵 (색상 격자) |
| `quote_vs` | QuoteVs | 두 전문가 의견 대결 |
| `stacked_bar` | StackedBar | 누적 막대 차트 |
| `swot_card` | SwotCard | SWOT 분석 2x2 그리드 |
| `target_price` | TargetPrice | 목표가 vs 현재가 카드 |
| `sector_board` | SectorBoard | 업종별 등락 현황판 |
| `mini_profile` | MiniProfile | 인물·기관 프로필 카드 |
| `data_counter` | DataCounter | 숫자 카운트업 애니메이션 |
| `highlight_quote` | HighlightQuote | 핵심 문장 대형 강조 |
| `radar_chart` | RadarChart | 레이더 차트 (종합 평가 5각형) |
| `tree_map` | TreeMap | 트리맵 (비중 시각화) |
| `countdown` | Countdown | D-day 카운트다운 |
| `matrix_grid` | MatrixGrid | 2x2 포지셔닝 매트릭스 |
| `before_after` | BeforeAfter | 전후 수치 비교 |
| `big_text` | BigText | 임팩트 한 줄 텍스트 |
| `waterfall_chart` | WaterfallChart | 워터폴 차트 (증감 분해) |
| `risk_scale` | RiskScale | 5단계 위험도 스케일 |
| `relation_map` | RelationMap | 관계/연결 네트워크 |
| `milestone` | Milestone | 목표 대비 달성도 |
| `news_ticker` | NewsTicker | 뉴스 티커 (슬라이드 목록) |
| `emoji_scale` | EmojiScale | 이모지 평가 척도 |
| `horizontal_bar` | HorizontalBar | 가로 막대 차트 |
| `gradient_stat` | GradientStat | 그라데이션 통계 카드 |
| `area_chart` | AreaChart | 영역 차트 (다중 시리즈) |
| `value_chain` | ValueChain | 밸류체인/공급망 흐름도 |
| `stock_pick` | StockPick | 다종목 추천 리스트 |
| `domino_effect` | DominoEffect | 도미노 연쇄 효과 |
| `history_pattern` | HistoryPattern | 역사적 패턴 반복 비교 |
| `sentiment_bar` | SentimentBar | 매수/매도 센티멘트 바 |
| `strategy_card` | StrategyCard | 투자 전략 DO/DON'T |
| `tech_stack` | TechStack | 기술 스택/구조 분해도 |
| `event_impact` | EventImpact | 이벤트 → 시장 충격 반응 |
| `psychology_card` | PsychologyCard | 투자 심리 편향 카드 |
| `debate_card` | DebateCard | 발언+반박 논쟁 카드 |
| `money_flow` | MoneyFlow | 자금 흐름 다이어그램 |
| `scale_compare` | ScaleCompare | 규모 직관적 비교 |
| `career_timeline` | CareerTimeline | 인물 연대기 |
| `price_impact` | PriceImpact | 가격 변동 극적 강조 |
| `structure_diagram` | StructureDiagram | 구조/공간 설명도 |
| `argument_card` | ArgumentCard | 데이터 기반 찬반 논쟁 |
| `mechanism` | Mechanism | 단계별 메커니즘 교육 |

### 이모지 렌더링 규칙

**이모지가 있는 모든 요소에 `fontFamily: theme.font` 필수** — 없으면 검은 박스로 표시됨
```tsx
// ✅ 올바른 예시
<span style={{ fontSize: 40, fontFamily: theme.font }}>{item.flag}</span>
<div style={{ fontSize: 52, fontFamily: theme.font }}>{item.icon}</div>
```
적용 대상: WorldStats(국기), IconGrid(아이콘), ProsConsCard(체크/엑스 아이콘), InterviewCard(아바타), RankingList(메달), CalloutBox(아이콘)

### script.json vs remotion_props.json

**두 파일은 독립적** — script.json 수정 시 remotion_props.json도 반드시 같이 수정해야 함
- `script.json`: `/write-script` 결과 (대본)
- `remotion_props.json`: `/make-audio` 결과 (렌더링용 props) — audio 단계에서 script.json 기반으로 생성됨
- 렌더링 전에 visual_data 필드 오류 발견 시 **두 파일 모두** 수정 필요

### visual_data 필드명 변형 허용 목록

컴포넌트가 여러 필드명을 수용하도록 패치됨 (스크립트 생성 오류 방지):
- **Timeline**: `items[{label,value,note}]` 또는 `events[{date,title,description}]`
- **Keyword**: `keyword`/`description` 또는 `term`/`definition`

### 컴포넌트별 주의사항

**StatCard**
- 오른쪽 카드 너비: `780px` (좁으면 텍스트 2줄 됨)
- 카드 아이템 폰트: `26px`, `whiteSpace: "nowrap"`

**BulletList**
- 데이터에 이미 ①②③ 번호가 포함됨 → 컴포넌트에서 번호 원형 추가 안 함 (중복 방지)
- 항목 등장 간격: `durationFrames * 0.7 / (items.length + 1)`

**Keyword**
- description에 `\n` 포함되어도 한 줄 표시 (`whiteSpace: "nowrap"`)
- sub_points 태그 간격: `i * 18` 프레임
- `term`/`definition` 필드명도 허용 (컴포넌트 패치됨)

**ChartBar**
- `startFrame={10}` 고정 전달 (Sequence 내부는 로컬 프레임 기준, 글로벌 프레임 전달 금지)
- 단위 접두어: title에 "원)" 또는 "(원"이 포함되면 원화 차트로 판단 → $ 접두어 제외
  - "원달러" 처럼 "달러"가 포함되어도 isWon 체크로 $ 제외

**Timeline**
- `events[{date,title,description}]` 형식도 허용 (컴포넌트 패치됨)

**InterviewCard**
- `interviewer` 필드: "Q · 시청자 질문" 형식 금지 → 레이블만 작성 ("시청자 질문")
- 컴포넌트가 Q 라벨을 자동 추가하지 않음 — interviewer 값 그대로 표시

**SceneFade / IntroCard / OutroCard**
- 배지, 구분선 등 모든 요소: `interpolate + clamp` 사용 (spring 사용 시 사라지는 버그)
- intro_card/outro_card는 `noExit` (퇴장 페이드 없음 — 구분선 사라짐 방지)

**GaugeMeter**
- `invert: true` → 높을수록 공포 (VKOSPI, VIX 등)
- `invert: false` (기본값) → 낮을수록 공포 (공포탐욕지수)

**ChartBar (Y축)**
- 데이터 범위가 최대값의 50% 이내일 때 → Y축 바닥을 최솟값의 90%로 올림 (등락폭 강조)

### 씬 전환 애니메이션
- 7가지 타입 로테이션: fade, slideLeft, slideRight, slideUp, zoomIn, zoomFade, slideDown
- intro/outro는 항상 fade
- IN: 30프레임 (0.5초) / OUT: 25프레임 (~0.4초)

### 배경 에셋
- **1차: Veo 3.1 Fast 영상** — 3씬 1영상 그룹화, 720p, 4초
- **2차: Nano Banana 이미지** — Veo 실패 시 자동 전환, 씬마다 1개 .png
- 배경 opacity: 20%, 영상은 muted+loop+playbackRate 0.8
- Veo 영상은 ffmpeg로 매 프레임 키프레임 재인코딩 (seek 떨림 방지)
- 파일 확장자로 영상/이미지 자동 감지 (.mp4 vs .png)

### 대본 스타일
- **완전한 입말 구어체** (뉴스체/리포트체/기사체 절대 금지)
- 접속사: "근데", "아니", "어쨌든", "한마디로" (문어체 접속사 금지)
- 비유: 즉흥적·재미있는 비유 (정형화 금지)
- 주제 재구성: 사용자 주제를 클릭 유발 형태로 자동 재구성
- 나레이션 총량: 4,500~5,500자 (미달 시 자동 보강), 씬당 100~150자
- 유튜브 설명란이 script.md에 자동 포함
- **visual_data 검증 파이프라인**: 대본 생성 후 필수 필드 스키마 체크 → 문제 씬만 Claude API에 수정 요청 (60초 rate limit 대기 포함)
- SYSTEM_PROMPT는 6,375자로 경량화 (visual_data 예시는 SKILL.md에만 보관)

---

## 기술 스택
- **대본**: Claude API (`claude-sonnet-4-6`) + web_search 툴
- **음성**: ElevenLabs v3 TTS (`eleven_v3`), Voice ID: `4JJwo477JUAx3HV0T7n7`
- **영상**: Remotion (React 기반 영상 렌더링)
- **해상도**: 1920x1080, 60fps
- **배경 에셋**: Veo 3.1 Fast (영상) → Nano Banana (이미지) 폴백
- **설정**: `.env` 파일에 API 키 저장 (ANTHROPIC, ELEVENLABS, GOOGLE_AI)
