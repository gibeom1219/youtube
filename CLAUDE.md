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
| `candlestick` | Candlestick | 캔들스틱 차트 |
| `earnings_card` | EarningsCard | 실적 발표 (예상 vs 실제) |
| `valuation_table` | ValuationTable | 밸류에이션 비교 (PER/PBR/ROE) |
| `analyst_rating` | AnalystRating | 증권사 목표가·투자의견 |
| `etf_compare` | EtfCompare | ETF 비교 카드 |
| `sector_rotation` | SectorRotation | 섹터 순환 맵 |
| `law_card` | LawCard | 법안/규제 카드 |
| `liquidation_cascade` | LiquidationCascade | 청산 도미노 (숫자 중심) |
| `bubble_indicator` | BubbleIndicator | 버블 지표 비교 |
| `geo_highlight_map` | GeoHighlightMap | 지정학 지도 하이라이트 |
| `supply_dependency` | SupplyDependency | 공급망 의존도 흐름 |
| `policy_compare` | PolicyCompare | 정권별 정책 비교 |
| `pressure_network` | PressureNetwork | 이해관계자 압력 네트워크 |
| `power_shift` | PowerShift | 파워 역전 차트 |
| `escalation_ladder` | EscalationLadder | 단계별 압박 강도 |
| `vicious_cycle` | ViciousCycle | 악순환 순환 루프 |
| `catch_up_race` | CatchUpRace | 기술 추격 경쟁 |
| `hook_statement` | HookStatement | 초반 훅 — 강렬한 2줄 문장 (첫 씬 추천) |
| `speech_bubble` | SpeechBubble | 말풍선 인용 — 발언자 실루엣 + 흰색 말풍선 + 키워드 빨간 하이라이트 |
| `data_dashboard` | DataDashboard | 데이터 대시보드 — 좌측 미니 바차트 + 우측 핵심 수치 카드 |
| `markup_text` | MarkupText | 마크업 텍스트 — 형광펜 밑줄 + 손그림 동그라미 강조 |
| `rank_shift` | RankShift | 순위 변동 비교 — 좌/우 시대별 순위 대조 (빨간 중앙선) |
| `stock_chart` | StockChart | 주가 차트 — 라인+영역채우기+거래량바+고저현재가 주석 |
| `report_chart` | ReportChart | 리포트 차트 — 흰색 도화지 배경 + 꺾은선 + 사이드 스탯 카드 |
| `parliament_chart` | ParliamentChart | 반원형 의석 차트 — 정당/비율 분포, 과반 라인 표시 |
| `process_flow` | ProcessFlow | 절차 흐름도 — 왼쪽 흰색→오른쪽 투명, 섹션별 색상 구분, 화살표 연결 |
| `side_info` | SideInfo | 한쪽 정보 패널 — 좌/우 선택(side), 반대쪽 배경 노출, 불릿 항목 나열 |
| `center_info` | CenterInfo | 중앙 정보 패널 — 중앙 흰색 배경, 양쪽 배경 노출, 불릿 항목 나열 |
| `bottom_info` | BottomInfo | 하단 정보 패널 — 하단 흰색 배경, 위쪽 배경 노출, 2열 불릿 레이아웃 |
| `top_info` | TopInfo | 상단 정보 패널 — 상단 흰색 배경, 아래쪽 배경 노출, 2열 불릿 레이아웃 |
| `white_quote` | WhiteQuote | 흰색 인용문 — 중앙 큰 문장+출처, 주변 배경 노출, 핵심 발언·인사이트 강조 |
| `split_overlay` | SplitOverlay | 좌우 비교 패널 — 흰색 배경 위 두 칼럼 비교, 상하 배경 노출, 주장vs현실·전vs후 |
| `white_stat` | WhiteStat | 흰색 큰 숫자 — 중앙 큰 숫자+라벨+변동, 주변 배경 노출, 충격 수치 강조 |
| `white_timeline` | WhiteTimeline | 흰색 타임라인 — 가로 타임라인, 상하 배경 노출, 사건 연대기 |
| `white_callout` | WhiteCallout | 흰색 핵심 인사이트 — 아이콘+제목+설명, 주변 배경 노출, 결론·깨달음 |
| `white_ranking` | WhiteRanking | 흰색 랭킹 — 순위 리스트+메달, 좌우 배경 노출, 국가·종목 순위 |
| `diagonal_info` | DiagonalInfo | 대각선 정보 — 좌하단 콘텐츠, 우상단 배경 노출, 역동적 레이아웃 |
| `white_checklist` | WhiteChecklist | 흰색 체크리스트 — 체크/미체크 항목, 투자 기준·리스크 점검 |
| `white_pros_cons` | WhiteProsCons | 흰색 장단점 — 좌우 장점/단점 비교, 정책·투자 평가 |
| `white_scenario` | WhiteScenario | 흰색 시나리오 — 2~3개 시나리오 카드+확률, 전망·예측 |
| `white_warning` | WhiteWarning | 흰색 경고 — 주의/위험/긴급 레벨별 경고, 리스크 알림 |
| `white_summary` | WhiteSummary | 흰색 요약 — 번호 포인트+결론 박스, 핵심 정리 |
| `side_quote` | SideQuote | 좌/우 인용문 — 세로선+큰 문장+출처, 반대쪽 배경 노출 |
| `side_warning` | SideWarning | 좌/우 경고 항목 — 색상 바+제목+불릿, 반대쪽 배경 노출 |
| `side_stat` | SideStat | 좌/우 큰 숫자 — 라벨+대형 수치+항목, 반대쪽 배경 노출 |
| `side_timeline` | SideTimeline | 좌/우 세로 타임라인 — 도트+날짜+사건, 반대쪽 배경 노출 |
| `side_checklist` | SideChecklist | 좌/우 체크리스트 — 체크/미체크 항목, 반대쪽 배경 노출 |
| `dark_side_info` | DarkSideInfo | 검정 좌/우 정보 패널 — 어두운 그라데이션, 반대쪽 배경 노출, 티파니 강조 |
| `dark_center_info` | DarkCenterInfo | 검정 중앙 정보 패널 — 어두운 중앙, 양쪽 배경 노출, 티파니 강조 |
| `dark_top_info` | DarkTopInfo | 검정 상단 정보 패널 — 어두운 상단, 아래쪽 배경 노출, 2열 레이아웃 |
| `dark_bottom_info` | DarkBottomInfo | 검정 하단 정보 패널 — 어두운 하단, 위쪽 배경 노출, 2열 레이아웃 |
| `dark_quote` | DarkQuote | 검정 좌/우 인용문 — 어두운 배경, 세로선+큰 문장, 티파니 강조 |
| `dark_stat` | DarkStat | 검정 좌/우 큰 숫자 — 어두운 배경, 대형 수치+변동, 반대쪽 배경 노출 |
| `dark_timeline` | DarkTimeline | 검정 좌/우 세로 타임라인 — 어두운 배경, 도트+날짜, 반대쪽 배경 노출 |
| `dark_warning` | DarkWarning | 검정 좌/우 경고 — 어두운 배경, 색상 바+불릿, 반대쪽 배경 노출 |
| `dark_summary` | DarkSummary | 검정 중앙 요약 — 어두운 배경, 번호 포인트+결론, 좌우 배경 노출 |
| `dark_split` | DarkSplitOverlay | 검정 좌우 비교 — 어두운 배경, 두 칼럼 비교, 상하 배경 노출 |
| `side_donut` | SideDonut | 좌/우 도넛 차트 — 도넛+범례, 반대쪽 배경 노출, 구성비 시각화 |
| `side_bar_chart` | SideBarChart | 좌/우 가로 막대 — 가로 바 차트, 반대쪽 배경 노출, 항목별 비교 |
| `side_gauge` | SideGauge | 좌/우 반원 게이지 — 게이지+바늘+구간, 반대쪽 배경 노출, 지수·온도 |
| `side_line_chart` | SideLineChart | 좌/우 꺾은선 — 라인+영역 차트, 반대쪽 배경 노출, 추이·변동 |
| `side_radar` | SideRadar | 좌/우 레이더 — 오각형 차트+수치, 반대쪽 배경 노출, 종합 평가 |
| `dark_donut` | DarkDonut | 검정 좌/우 도넛 — 어두운 배경, 도넛+범례, 구성비 시각화 |
| `dark_bar_chart` | DarkBarChart | 검정 좌/우 가로 막대 — 어두운 배경, 티파니 바, 항목별 비교 |
| `dark_gauge` | DarkGauge | 검정 좌/우 게이지 — 어두운 배경, 반원+바늘+구간, 지수 시각화 |
| `dark_line_chart` | DarkLineChart | 검정 좌/우 꺾은선 — 어두운 배경, 라인+영역, 추이 시각화 |
| `dark_radar` | DarkRadar | 검정 좌/우 레이더 — 어두운 배경, 오각형+수치, 종합 평가 |
| `glass_card` | GlassCard | 글래스모피즘 카드 — 반투명 유리 카드, 배경 블러 비침, 수치 나열 |
| `spotlight_reveal` | SpotlightReveal | 스포트라이트 공개 — 어둠 속 사실을 하나씩 비춤, 극적 공개 |
| `newspaper_clip` | NewspaperClip | 신문 스크랩 — 헤드라인+형광펜+테이프, 뉴스·보도 인용 |
| `counter_reveal` | CounterReveal | 슬롯머신 카운터 — 숫자가 돌아가다 멈추는 효과, 극적 수치 |
| `text_reveal` | TextReveal | 타자기 효과 — 한 글자씩 타이핑+커서, 임팩트 문장 |
| `postit_board` | PostItBoard | 포스트잇 보드 — 색색 메모지가 핀으로 붙는 효과, 요점 정리 |
| `receipt_card` | ReceiptCard | 영수증 카드 — 톱니+항목+합계, 비용·대가 시각화 |
| `stamp_card` | StampCard | 도장 카드 — 문서에 판정 도장이 찍히는 효과 |
| `xray_reveal` | XrayReveal | 엑스레이 — 표면 vs 진실 좌우 분할, 스캔 라인 |
| `magnify_reveal` | MagnifyReveal | 돋보기 — 흐린 텍스트에서 핵심을 확대 강조 |
| `polaroid_stack` | PolaroidStack | 폴라로이드 스택 — 사진이 톡톡 떨어지며 캡션 표시 |
| `chat_message` | ChatMessage | 메신저 채팅 — 말풍선이 하나씩 올라오는 대화 형식 |
| `flip_card` | FlipCard | 카드 뒤집기 — 앞면(질문)→뒷면(답) 3D 회전 공개 |
| `wanted_poster` | WantedPoster | 수배 전단지 — WANTED+혐의+현상금 올드 스타일 |
| `password_crack` | PasswordCrack | 해킹 크래킹 — 글자가 랜덤으로 돌다가 맞춰지는 효과 |
| `blueprint` | Blueprint | 청사진 설계도 — 파란 격자 위 구조 분석 |
| `file_folder` | FileFolder | 기밀 문서 — 폴더 열림+검열 해제+극비 도장 |
| `torn_paper` | TornPaper | 종이 찢기 — 공식 발표↔숨겨진 진실 분리 |
| `radar_scan` | RadarScan | 레이더 탐지 — 회전 스캔+블립 대상 탐지 |
| `ticket_stub` | TicketStub | 티켓 스텁 — 이벤트 티켓+절취선+상세 정보 |
| `blueprint_anatomy` | BlueprintAnatomy | 청사진 해부도 — 중앙 주제+방사형 주석선, 구조 분석 |
| `blueprint_equation` | BlueprintEquation | 청사진 공식 분해 — 큰 공식+변수별 카드, 공식/원리 설명 |
| `blueprint_spec` | BlueprintSpec | 청사진 스펙시트 — 그리드 사양서, 기술 스펙/데이터 나열 |
| `blueprint_cross_section` | BlueprintCrossSection | 청사진 단면도 — 수평 레이어 계층, 구조/계층 시각화 |
| `evidence_board` | EvidenceBoard | 수사 보드 — 핀+실로 연결된 증거물, 관계 분석 |
| `terminal_log` | TerminalLog | 터미널 로그 — 해커/코딩 터미널 스타일, 데이터 분석 |
| `control_room` | ControlRoom | 관제실 — 미니 패널 종합 대시보드, 현황 모니터링 |
| `film_reel` | FilmReel | 필름 릴 — 필름 스트립 이벤트, 연혁/역사 |
| `scoreboard` | Scoreboard | 전광판 — LED 스타일 점수/비교표 |
| `envelope_reveal` | EnvelopeReveal | 봉투 공개 — 봉투에서 결과 극적 공개 |

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
- **Nano Banana 2 이미지** (`gemini-3.1-flash-image-preview`): 모든 씬에 이미지 1개씩 생성 (병렬, RPM 100)
  - 지원 파라미터: `response_modalities=["IMAGE","TEXT"]`, `candidate_count=1`, `image_config.aspect_ratio="16:9"`
  - 미지원 파라미터: `person_generation`, `output_mime_type`, `media_resolution` (INVALID_ARGUMENT)
- 배경 opacity: 20%
- 파일 확장자로 영상/이미지 자동 감지 (.mp4 vs .png/.jpg/.jpeg)
- 렌더링 타임아웃: 180초 (`render.mjs`의 `timeoutInMilliseconds`)
- ⚠️ **동시 렌더링 금지**: 두 대본을 동시에 렌더링하면 public/audio.mp3가 충돌 → 반드시 순차 실행
- outro_card는 배경 생성에서 자동 건너뜀
- ~~Veo 3.1 Fast 영상은 더 이상 사용하지 않음~~ (초기 seek 떨림 문제 + OffthreadVideo GLIBC 호환 불가)

### 컴포넌트 방어 코드
- **AreaChart**: `series[].values` 또는 `series[].data` 모두 허용
- **StockCard/BeforeAfter**: `data.change`가 undefined일 때 `??""` fallback
- **PriceImpact**: scale 애니메이션에 spring 대신 interpolate 사용 (spring 사용 시 요소 사라짐 버그)
- **StrategyCard**: `do_list`/`dont_list`/`summary` 또는 `do_items`/`dont_items`/`conclusion` 모두 허용
- **DominoEffect**: `dominoes[{label,icon}]` 또는 `trigger`+`chain[{event,impact,icon}]` 모두 허용
- **StockPick**: `picks` 또는 `stocks` 모두 허용
- **SentimentBar**: `bullish`/`bearish`/`neutral` 또는 `buy_pct`/`sell_pct`/`neutral_pct` 모두 허용
- **PsychologyCard**: `tip` 또는 `solution` 모두 허용, `title` 생략 시 기본값 적용
- **EventImpact**: `date`/`event_date`, impacts의 `target`/`market`, `direction`/`change` 모두 허용
- 모든 컴포넌트에서 optional 필드는 `?? ""` 또는 `?? []`로 방어 처리 권장

### visual_type 추가 시 동시 업데이트 필수 (8개 파일)
1. `remotion-project/src/visuals/새타입.tsx` — 컴포넌트 생성
2. `remotion-project/src/compositions/FinanceVideo.tsx` — import + switch case
3. `remotion-project/src/types/props.ts` — VisualType 추가
4. `orchestrator/models/script.py` — Literal 추가
5. `remotion-project/src/styles/theme.ts` — accentColors 추가
6. `CLAUDE.md` — 비주얼 타입 테이블
7. `skill-dev/write-script/SKILL.md` — visual_type 목록 테이블 + 총 개수
8. `skill-dev/write-script/VISUAL_DATA_REFERENCE.md` — visual_data 예시

### 대본 스타일
- **완전한 입말 구어체** (뉴스체/리포트체/기사체 절대 금지)
- 접속사: "근데", "아니", "어쨌든", "한마디로" (문어체 접속사 금지)
- 비유: 즉흥적·재미있는 비유 (정형화 금지)
- 주제 재구성: 사용자 주제를 클릭 유발 형태로 자동 재구성
- 나레이션 총량: **5,000~6,000자**, 씬당 40~96자, content 50~70씬
- **씬 duration: 5~12초** (빠른 화면 전환으로 시청자 이탈 방지, 14초 이상 금지)
- **1 포인트 = 2~3 씬**: 하나의 포인트를 여러 씬으로 나눠 배경이 바뀌도록 (지루함 방지)
- **2단계 작성법**: 1차 초안(구조+팩트) → 2차 보강(감정+에피소드+반론)
- **주제별 샘플 매칭**: 대본 작성 전 비슷한 샘플 1~2개를 먼저 읽고 문체 체화
- 유튜브 설명란이 script.md에 자동 포함
- **대본은 Claude Code가 직접 작성** (Claude API 사용 안 함 — rate limit 없음, 샘플 대본 참고 가능, visual_data 정확)
- 샘플 대본: `/home/user/workspaces/youtube/sample/` (18개 파일)

---

## 기술 스택
- **대본**: Claude API (`claude-sonnet-4-6`) + web_search 툴
- **음성**: ElevenLabs v3 TTS (`eleven_v3`), Voice ID: `4JJwo477JUAx3HV0T7n7`
- **영상**: Remotion (React 기반 영상 렌더링)
- **해상도**: 1920x1080, 60fps
- **배경 에셋**: Veo 3.1 Fast (영상) → Nano Banana (이미지) 폴백
- **설정**: `.env` 파일에 API 키 저장 (ANTHROPIC, ELEVENLABS, GOOGLE_AI)
