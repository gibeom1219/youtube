export interface ChartBar {
  label: string;
  value: number;
}

export interface WordTimestamp {
  word: string;
  start_seconds: number;
  end_seconds: number;
}

export type SceneType = "intro" | "content" | "chart" | "outro";

export type VisualType =
  | "stat_card"
  | "bullet_list"
  | "timeline"
  | "comparison"
  | "number_highlight"
  | "keyword"
  | "chart"
  | "quote_card"
  | "flow_diagram"
  | "news_feed"
  | "step_flow"
  | "table_data"
  | "pros_cons"
  | "ranking_list"
  | "callout_box"
  | "ticker_board"
  | "icon_grid"
  | "percentage_bar"
  | "dual_stat"
  | "scenario_card"
  | "split_screen"
  | "world_stats"
  | "gauge_meter"
  | "donut_chart"
  | "alert_banner"
  | "myth_vs_fact"
  | "checklist"
  | "trend_arrow"
  | "vs_battle"
  | "pyramid_chart"
  | "interview_card"
  | "warning_card"
  | "price_history"
  | "funnel_chart"
  | "calendar_event"
  | "bubble_compare"
  | "key_takeaway"
  | "stock_card"
  | "line_chart"
  | "heat_map"
  | "quote_vs"
  | "stacked_bar"
  | "swot_card"
  | "target_price"
  | "sector_board"
  | "mini_profile"
  | "data_counter"
  | "highlight_quote"
  | "radar_chart"
  | "tree_map"
  | "countdown"
  | "matrix_grid"
  | "before_after"
  | "big_text"
  | "waterfall_chart"
  | "risk_scale"
  | "relation_map"
  | "milestone"
  | "news_ticker"
  | "emoji_scale"
  | "horizontal_bar"
  | "gradient_stat"
  | "area_chart"
  | "value_chain"
  | "stock_pick"
  | "domino_effect"
  | "history_pattern"
  | "sentiment_bar"
  | "strategy_card"
  | "tech_stack"
  | "event_impact"
  | "psychology_card"
  | "debate_card"
  | "money_flow"
  | "scale_compare"
  | "career_timeline"
  | "price_impact"
  | "structure_diagram"
  | "argument_card"
  | "mechanism"
  | "candlestick"
  | "earnings_card"
  | "valuation_table"
  | "analyst_rating"
  | "etf_compare"
  | "sector_rotation"
  | "law_card"
  | "liquidation_cascade"
  | "bubble_indicator"
  | "intro_card"
  | "outro_card";

export interface Scene {
  sceneId: number;
  type: SceneType;
  startSeconds: number;
  durationSeconds: number;
  narration: string;
  visualType: VisualType;
  visualData: Record<string, any> | null;
  backgroundVideo?: string | null;
  chartData: ChartBar[] | null;
  chartTitle: string | null;
}

export interface VideoProps {
  title: string;
  hook: string;
  totalDurationSeconds: number;
  audioFile: string;
  fps: number;
  scenes: Scene[];
  wordTimestamps: WordTimestamp[];
  tags: string[];
}
