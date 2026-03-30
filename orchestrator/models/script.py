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
