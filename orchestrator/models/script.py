from typing import Literal, Any
from pydantic import BaseModel


class ChartBar(BaseModel):
    label: str
    value: float


class Scene(BaseModel):
    scene_id: int
    type: Literal["intro", "content", "chart", "outro"]
    duration_seconds: float
    narration: str
    visual_type: Literal[
        "stat_card",       # 큰 숫자/통계 + 오른쪽 카드
        "bullet_list",     # 항목이 하나씩 등장
        "timeline",        # 가로 타임라인
        "comparison",      # 좌우 비교
        "number_highlight",# 거대 숫자 강조
        "keyword",         # 키워드 + 설명
        "chart",           # 바 차트
        "quote_card",      # 전문가/유명인 발언 인용
        "flow_diagram",    # A→B→C 인과관계 흐름도
        "news_feed",       # 뉴스 헤드라인 목록
        "step_flow",       # 단계별 방법/절차
        "table_data",      # 표 형식 데이터 비교
        "pros_cons",       # 장단점 나란히 비교
        "ranking_list",    # 순위/랭킹 목록
        "callout_box",     # 핵심 결론/주의사항 강조
        "ticker_board",    # 주식·지수·환율 현황판
        "icon_grid",       # 이모지+텍스트 2~3열 그리드
        "percentage_bar",  # 가로 비율 막대 차트
        "dual_stat",       # 두 숫자 나란히 강조
        "scenario_card",   # A/B/C 시나리오 카드
        "split_screen",    # Before/After 좌우 분할
        "world_stats",     # 국가별 데이터 (국기+수치)
        "gauge_meter",     # 공포탐욕지수·경기 온도계 반원형 게이지
        "donut_chart",     # 포트폴리오·구성비 도넛 파이 차트
        "alert_banner",    # 긴급 속보·BREAKING 배너
        "myth_vs_fact",    # 오해 vs 사실 대결 카드
        "checklist",       # 투자 체크리스트
        "trend_arrow",     # 상승/하락 트렌드 방향성
        "vs_battle",       # 두 국가·세력·주체 대결
        "pyramid_chart",   # 소득·자산 계층 피라미드
        "interview_card",  # Q&A 인터뷰 형식
        "warning_card",    # 위험 경고 카드
        "price_history",   # 가격 변동 히스토리
        "funnel_chart",    # 단계별 감소 깔때기 차트
        "calendar_event",  # 주요 경제 일정 카드
        "bubble_compare",  # 버블 크기 비교
        "key_takeaway",    # 핵심 요약 정리 박스
        "stock_card",      # 개별 종목 상세 카드
        "line_chart",      # 꺾은선 차트 (시간 추이)
        "heat_map",        # 섹터·종목별 히트맵 (색상 격자)
        "quote_vs",        # 두 전문가 의견 대결
        "stacked_bar",     # 누적 막대 차트
        "swot_card",       # SWOT 분석 2x2 그리드
        "target_price",    # 목표가 vs 현재가 카드
        "sector_board",    # 업종별 등락 현황판
        "mini_profile",    # 인물·기관 프로필 카드
        "data_counter",    # 숫자 카운트업 애니메이션
        "highlight_quote", # 핵심 문장 대형 강조
        "radar_chart",     # 레이더 차트 (종합 평가 5각형)
        "tree_map",        # 트리맵 (비중 시각화)
        "countdown",       # D-day 카운트다운
        "matrix_grid",     # 2x2 포지셔닝 매트릭스
        "before_after",    # 전후 수치 비교
        "big_text",        # 임팩트 한 줄 텍스트
        "waterfall_chart", # 워터폴 차트 (증감 분해)
        "risk_scale",      # 5단계 위험도 스케일
        "relation_map",    # 관계/연결 네트워크
        "milestone",       # 목표 대비 달성도
        "news_ticker",     # 뉴스 티커 (슬라이드 목록)
        "emoji_scale",     # 이모지 평가 척도
        "horizontal_bar",  # 가로 막대 차트
        "gradient_stat",   # 그라데이션 통계 카드
        "area_chart",      # 영역 차트 (다중 시리즈)
        "value_chain",     # 밸류체인/공급망 흐름도
        "stock_pick",      # 다종목 추천 리스트
        "domino_effect",   # 도미노 연쇄 효과
        "history_pattern", # 역사적 패턴 반복 비교
        "sentiment_bar",   # 매수/매도 센티멘트 바
        "strategy_card",   # 투자 전략 DO/DON'T
        "tech_stack",      # 기술 스택/구조 분해도
        "event_impact",    # 이벤트 → 시장 충격 반응
        "psychology_card", # 투자 심리 편향 카드
        "debate_card",     # 발언+반박 논쟁 카드
        "money_flow",      # 자금 흐름 다이어그램
        "scale_compare",   # 규모 직관적 비교
        "career_timeline", # 인물 연대기
        "price_impact",    # 가격 변동 극적 강조
        "structure_diagram", # 구조/공간 설명도
        "argument_card",   # 데이터 기반 찬반 논쟁
        "mechanism",       # 단계별 메커니즘 교육
        "candlestick",     # 캔들스틱 차트
        "earnings_card",   # 실적 발표 (예상 vs 실제)
        "valuation_table", # 밸류에이션 비교 (PER/PBR/ROE)
        "analyst_rating",  # 증권사 목표가·투자의견
        "etf_compare",     # ETF 비교 카드
        "sector_rotation", # 섹터 순환 맵
        "law_card",        # 법안/규제 카드
        "liquidation_cascade", # 청산 도미노 (숫자 중심)
        "bubble_indicator", # 버블 지표 비교
        "geo_highlight_map", # 지정학 지도 하이라이트
        "supply_dependency", # 공급망 의존도 흐름
        "policy_compare",  # 정권별 정책 비교
        "pressure_network", # 이해관계자 압력 네트워크
        "power_shift",     # 파워 역전 차트
        "escalation_ladder", # 단계별 압박 강도
        "vicious_cycle",   # 악순환 순환 루프
        "catch_up_race",   # 기술 추격 경쟁
        "hook_statement",  # 초반 훅 강렬한 2줄 문장
        "speech_bubble",   # 말풍선 인용 (발언자+하이라이트)
        "data_dashboard",  # 차트+수치 대시보드
        "markup_text",     # 밑줄+동그라미 강조 텍스트
        "rank_shift",      # 시대별 순위 비교
        "stock_chart",     # 주가 차트 (라인+거래량+주석)
        "report_chart",    # 리포트 차트 (흰색 배경+꺾은선+스탯카드)
        "parliament_chart", # 반원형 의석/비율 분포 차트
        "process_flow",   # 절차/프로세스 흐름도 (왼쪽 흰색→오른쪽 투명)
        "side_info",      # 한쪽 정보 패널 (좌/우 선택, 반대쪽 배경 노출)
        "center_info",    # 중앙 정보 패널 (양쪽 배경 노출)
        "bottom_info",    # 하단 정보 패널 (위쪽 배경 노출)
        "top_info",       # 상단 정보 패널 (아래쪽 배경 노출)
        "white_quote",    # 흰색 배경 인용문 (주변 배경 노출)
        "split_overlay",  # 좌우 비교 패널 (상하 배경 노출)
        "white_stat",     # 흰색 배경 큰 숫자 강조 (주변 배경 노출)
        "white_timeline", # 흰색 배경 타임라인 (상하 배경 노출)
        "white_callout",  # 흰색 배경 핵심 인사이트 (주변 배경 노출)
        "white_ranking",  # 흰색 배경 랭킹 리스트 (주변 배경 노출)
        "diagonal_info",  # 대각선 레이아웃 (좌하단 콘텐츠, 우상단 배경)
        "white_checklist", # 흰색 체크리스트 (체크/미체크 항목)
        "white_pros_cons", # 흰색 장단점 비교 (좌우 칼럼)
        "white_scenario",  # 흰색 시나리오 카드 (2~3개 시나리오)
        "white_warning",   # 흰색 경고 카드 (주의/위험/긴급)
        "white_summary",   # 흰색 요약 (번호 포인트 + 결론)
        "side_quote",      # 좌/우 인용문 (반대쪽 배경 노출)
        "side_warning",    # 좌/우 경고 항목 (반대쪽 배경 노출)
        "side_stat",       # 좌/우 큰 숫자 + 항목 (반대쪽 배경 노출)
        "side_timeline",   # 좌/우 세로 타임라인 (반대쪽 배경 노출)
        "side_checklist",  # 좌/우 체크리스트 (반대쪽 배경 노출)
        "dark_side_info",  # 검정 좌/우 정보 패널 (반대쪽 배경 노출)
        "dark_center_info",# 검정 중앙 정보 패널 (양쪽 배경 노출)
        "dark_top_info",   # 검정 상단 정보 패널 (아래 배경 노출)
        "dark_bottom_info",# 검정 하단 정보 패널 (위 배경 노출)
        "dark_quote",      # 검정 좌/우 인용문 (반대쪽 배경 노출)
        "dark_stat",       # 검정 좌/우 큰 숫자 (반대쪽 배경 노출)
        "dark_timeline",   # 검정 좌/우 세로 타임라인 (반대쪽 배경 노출)
        "dark_warning",    # 검정 좌/우 경고 항목 (반대쪽 배경 노출)
        "dark_summary",    # 검정 중앙 요약 (번호 포인트 + 결론)
        "dark_split",      # 검정 좌우 비교 패널 (상하 배경 노출)
        "side_donut",      # 좌/우 도넛 차트 + 범례 (반대쪽 배경 노출)
        "side_bar_chart",  # 좌/우 가로 막대 차트 (반대쪽 배경 노출)
        "side_gauge",      # 좌/우 반원 게이지 + 범례 (반대쪽 배경 노출)
        "side_line_chart", # 좌/우 꺾은선 차트 (반대쪽 배경 노출)
        "side_radar",      # 좌/우 레이더 차트 + 수치 (반대쪽 배경 노출)
        "dark_donut",      # 검정 좌/우 도넛 차트 (반대쪽 배경 노출)
        "dark_bar_chart",  # 검정 좌/우 가로 막대 (반대쪽 배경 노출)
        "dark_gauge",      # 검정 좌/우 반원 게이지 (반대쪽 배경 노출)
        "dark_line_chart", # 검정 좌/우 꺾은선 차트 (반대쪽 배경 노출)
        "dark_radar",      # 검정 좌/우 레이더 차트 (반대쪽 배경 노출)
        "glass_card",      # 글래스모피즘 반투명 카드 (배경 블러 비침)
        "spotlight_reveal", # 스포트라이트 사실 공개 (어둠 속 하나씩 비춤)
        "newspaper_clip",  # 신문 스크랩 (형광펜 하이라이트 + 테이프)
        "counter_reveal",  # 슬롯머신 카운터 (숫자가 돌아가다 멈춤)
        "text_reveal",     # 타자기 효과 (한 글자씩 나타남 + 커서)
        "postit_board",    # 포스트잇 보드 (색색 메모지가 붙는 효과)
        "receipt_card",    # 영수증 카드 (톱니+항목+합계 영수증 스타일)
        "stamp_card",      # 도장 카드 (문서에 도장 찍히는 효과)
        "xray_reveal",     # 엑스레이 (표면 vs 진실, 스캔 라인)
        "magnify_reveal",  # 돋보기 (흐린 텍스트에서 핵심 확대)
        "polaroid_stack",  # 폴라로이드 사진 스택 (캡션 부착)
        "chat_message",    # 메신저 채팅 (말풍선 대화)
        "flip_card",       # 카드 뒤집기 (질문→답 공개)
        "wanted_poster",   # 수배 전단지 (혐의+현상금)
        "password_crack",  # 해킹 크래킹 (글자 맞추기)
        "blueprint",       # 청사진 설계도 (구조 분석)
        "file_folder",     # 기밀 문서 폴더 (검열 해제)
        "torn_paper",      # 종이 찢기 (공식→진실)
        "radar_scan",      # 레이더 탐지 (대상 스캔)
        "ticket_stub",     # 티켓 스텁 (이벤트 정보)
        "blueprint_anatomy",       # 해부도 (중앙 주제 + 방사형 주석)
        "blueprint_equation",      # 공식 분해 (큰 공식 + 변수 카드)
        "blueprint_spec",          # 스펙시트 (그리드 사양서)
        "blueprint_cross_section", # 단면도 (수평 레이어 계층)
        "evidence_board",          # 수사 보드 (핀+실 증거물 연결)
        "terminal_log",            # 터미널 로그 (해커 스타일 데이터)
        "control_room",            # 관제실 (종합 대시보드 패널)
        "film_reel",               # 필름 릴 (필름 스트립 이벤트)
        "scoreboard",              # 전광판 (LED 점수/비교표)
        "envelope_reveal",         # 봉투 공개 (극적 결과 발표)
        "intro_card",      # 인트로 타이틀
        "outro_card",      # 아웃트로
    ] = "keyword"
    visual_data: dict[str, Any] | None = None
    visual_query: str | None = None
    chart_data: list[ChartBar] | None = None
    chart_title: str | None = None


class ScriptOutput(BaseModel):
    title: str
    hook: str
    scenes: list[Scene]
    total_duration_seconds: float
    tags: list[str]
