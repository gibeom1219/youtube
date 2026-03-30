import React from "react";
import { Audio, Sequence, staticFile, useVideoConfig, spring, interpolate, useCurrentFrame } from "remotion";
import { VideoProps, Scene } from "../types/props";
import { Subtitle } from "../components/Subtitle";
import { ChartBar } from "../components/ChartBar";
import { Background } from "../components/Background";
import { StatCard } from "../visuals/StatCard";
import { BulletList } from "../visuals/BulletList";
import { Timeline } from "../visuals/Timeline";
import { Comparison } from "../visuals/Comparison";
import { NumberHighlight } from "../visuals/NumberHighlight";
import { Keyword } from "../visuals/Keyword";
import { QuoteCard } from "../visuals/QuoteCard";
import { FlowDiagram } from "../visuals/FlowDiagram";
import { NewsFeed } from "../visuals/NewsFeed";
import { StepFlow } from "../visuals/StepFlow";
import { TableData } from "../visuals/TableData";
import { ProsConsCard } from "../visuals/ProsConsCard";
import { RankingList } from "../visuals/RankingList";
import { CalloutBox } from "../visuals/CalloutBox";
import { TickerBoard } from "../visuals/TickerBoard";
import { IconGrid } from "../visuals/IconGrid";
import { PercentageBar } from "../visuals/PercentageBar";
import { DualStat } from "../visuals/DualStat";
import { ScenarioCard } from "../visuals/ScenarioCard";
import { SplitScreen } from "../visuals/SplitScreen";
import { WorldStats } from "../visuals/WorldStats";
import { GaugeMeter } from "../visuals/GaugeMeter";
import { DonutChart } from "../visuals/DonutChart";
import { AlertBanner } from "../visuals/AlertBanner";
import { MythVsFact } from "../visuals/MythVsFact";
import { Checklist } from "../visuals/Checklist";
import { TrendArrow } from "../visuals/TrendArrow";
import { VsBattle } from "../visuals/VsBattle";
import { PyramidChart } from "../visuals/PyramidChart";
import { InterviewCard } from "../visuals/InterviewCard";
import { WarningCard } from "../visuals/WarningCard";
import { PriceHistory } from "../visuals/PriceHistory";
import { FunnelChart } from "../visuals/FunnelChart";
import { CalendarEvent } from "../visuals/CalendarEvent";
import { BubbleCompare } from "../visuals/BubbleCompare";
import { KeyTakeaway } from "../visuals/KeyTakeaway";
import { StockCard } from "../visuals/StockCard";
import { LineChart } from "../visuals/LineChart";
import { HeatMap } from "../visuals/HeatMap";
import { QuoteVs } from "../visuals/QuoteVs";
import { StackedBar } from "../visuals/StackedBar";
import { SwotCard } from "../visuals/SwotCard";
import { TargetPrice } from "../visuals/TargetPrice";
import { SectorBoard } from "../visuals/SectorBoard";
import { MiniProfile } from "../visuals/MiniProfile";
import { DataCounter } from "../visuals/DataCounter";
import { HighlightQuote } from "../visuals/HighlightQuote";
import { RadarChart } from "../visuals/RadarChart";
import { TreeMap } from "../visuals/TreeMap";
import { Countdown } from "../visuals/Countdown";
import { MatrixGrid } from "../visuals/MatrixGrid";
import { BeforeAfter } from "../visuals/BeforeAfter";
import { BigText } from "../visuals/BigText";
import { WaterfallChart } from "../visuals/WaterfallChart";
import { RiskScale } from "../visuals/RiskScale";
import { RelationMap } from "../visuals/RelationMap";
import { Milestone } from "../visuals/Milestone";
import { NewsTicker } from "../visuals/NewsTicker";
import { EmojiScale } from "../visuals/EmojiScale";
import { HorizontalBar } from "../visuals/HorizontalBar";
import { GradientStat } from "../visuals/GradientStat";
import { AreaChart } from "../visuals/AreaChart";
import { ValueChain } from "../visuals/ValueChain";
import { StockPick } from "../visuals/StockPick";
import { DominoEffect } from "../visuals/DominoEffect";
import { HistoryPattern } from "../visuals/HistoryPattern";
import { SentimentBar } from "../visuals/SentimentBar";
import { StrategyCard } from "../visuals/StrategyCard";
import { TechStack } from "../visuals/TechStack";
import { EventImpact } from "../visuals/EventImpact";
import { PsychologyCard } from "../visuals/PsychologyCard";
import { DebateCard } from "../visuals/DebateCard";
import { MoneyFlow } from "../visuals/MoneyFlow";
import { ScaleCompare } from "../visuals/ScaleCompare";
import { CareerTimeline } from "../visuals/CareerTimeline";
import { PriceImpact } from "../visuals/PriceImpact";
import { StructureDiagram } from "../visuals/StructureDiagram";
import { ArgumentCard } from "../visuals/ArgumentCard";
import { Mechanism } from "../visuals/Mechanism";
import { Candlestick } from "../visuals/Candlestick";
import { EarningsCard } from "../visuals/EarningsCard";
import { ValuationTable } from "../visuals/ValuationTable";
import { AnalystRating } from "../visuals/AnalystRating";
import { EtfCompare } from "../visuals/EtfCompare";
import { SectorRotation } from "../visuals/SectorRotation";
import { LawCard } from "../visuals/LawCard";
import { LiquidationCascade } from "../visuals/LiquidationCascade";
import { BubbleIndicator } from "../visuals/BubbleIndicator";
import { theme, accentColors } from "../styles/theme";

// 전환 효과 타입
type TransitionType = "fade" | "slideLeft" | "slideRight" | "slideUp" | "zoomIn" | "zoomFade" | "slideDown";

const TRANSITION_TYPES: TransitionType[] = ["fade", "slideLeft", "slideRight", "slideUp", "zoomIn", "zoomFade", "slideDown"];

// 씬 인덱스로 전환 효과 결정 (intro/outro는 항상 fade)
const getTransition = (sceneIndex: number, visualType: string): TransitionType => {
  if (visualType === "intro_card" || visualType === "outro_card") return "fade";
  return TRANSITION_TYPES[sceneIndex % TRANSITION_TYPES.length];
};

// 장면 전환 애니메이션 (입장 + 퇴장)
const SceneTransition: React.FC<{
  children: React.ReactNode;
  durationFrames: number;
  transition: TransitionType;
  noExit?: boolean;
}> = ({ children, durationFrames, transition, noExit }) => {
  const frame = useCurrentFrame();
  const IN = 30;    // 입장 0.5초 (60fps 기준)
  const OUT = 25;   // 퇴장 ~0.4초
  const safeOutStart = Math.max(IN + 1, durationFrames - OUT);

  // 입장 진행도 (0→1)
  const enterP = interpolate(frame, [0, IN], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  // 퇴장 진행도 (1→0) — noExit이면 퇴장 없음
  const exitP = noExit ? 1 : interpolate(frame, [safeOutStart, durationFrames], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const progress = Math.min(enterP, exitP);

  let opacity = progress;
  let transform = "";

  // 퇴장 중인지 여부
  const isExiting = frame >= safeOutStart;
  // 퇴장 시 이동량 (exitP: 1→0 이므로 1-exitP: 0→1)
  const exitMove = 1 - exitP;

  switch (transition) {
    case "fade":
      opacity = progress;
      break;
    case "slideLeft":
      opacity = progress;
      transform = isExiting ? `translateX(${-60 * exitMove}px)` : `translateX(${interpolate(enterP, [0, 1], [60, 0])}px)`;
      break;
    case "slideRight":
      opacity = progress;
      transform = isExiting ? `translateX(${60 * exitMove}px)` : `translateX(${interpolate(enterP, [0, 1], [-60, 0])}px)`;
      break;
    case "slideUp":
      opacity = progress;
      transform = isExiting ? `translateY(${-30 * exitMove}px)` : `translateY(${interpolate(enterP, [0, 1], [50, 0])}px)`;
      break;
    case "slideDown":
      opacity = progress;
      transform = isExiting ? `translateY(${30 * exitMove}px)` : `translateY(${interpolate(enterP, [0, 1], [-50, 0])}px)`;
      break;
    case "zoomIn":
      opacity = progress;
      transform = isExiting ? `scale(${1 + 0.05 * exitMove})` : `scale(${interpolate(enterP, [0, 1], [0.92, 1])})`;
      break;
    case "zoomFade":
      opacity = progress;
      transform = isExiting ? `scale(${1 - 0.06 * exitMove})` : `scale(${interpolate(enterP, [0, 1], [1.06, 1])})`;
      break;
  }

  return (
    <div style={{ width: "100%", height: "100%", opacity, transform }}>
      {children}
    </div>
  );
};

// 인트로 카드
const IntroCard: React.FC<{ scene: Scene; title: string; hook: string }> = ({ scene, title, hook }) => {
  const frame = useCurrentFrame();

  // interpolate 사용 → extrapolateRight: "clamp" 로 최종값 고정 (사라짐 방지)
  const labelOpacity  = interpolate(frame, [8, 20],  [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const titleOpacity  = interpolate(frame, [0, 16],  [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const titleY        = interpolate(frame, [0, 16],  [50, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const lineWidth     = interpolate(frame, [12, 28], [0, 120], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const subOpacity    = interpolate(frame, [20, 34], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const subY          = interpolate(frame, [20, 34], [20, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const displayTitle = (scene.visualData as any)?.title ?? title;
  const displayHook  = (scene.visualData as any)?.subtitle ?? hook;

  return (
    <div style={{
      width: "100%", height: "100%",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      padding: "0 160px", textAlign: "center", gap: 36,
    }}>
      {/* 상단 레이블 */}
      <div style={{
        fontSize: 30, fontWeight: 700, color: theme.tiffany,
        fontFamily: theme.font, letterSpacing: 8,
        textTransform: "uppercase" as const,
        opacity: labelOpacity,
        transform: `translateY(${interpolate(labelOpacity, [0, 1], [-12, 0])}px)`,
        border: `1px solid rgba(129,216,208,0.35)`,
        padding: "12px 32px", borderRadius: 6,
      }}>
        경제 인사이트
      </div>

      {/* 메인 타이틀 */}
      <div style={{
        fontSize: 88, fontWeight: 900, color: theme.white,
        fontFamily: theme.font, lineHeight: 1.2,
        opacity: titleOpacity,
        transform: `translateY(${titleY}px)`,
        textShadow: `0 0 80px rgba(129,216,208,0.2)`,
      }}>
        {displayTitle}
      </div>

      {/* 구분선 */}
      <div style={{
        width: `${lineWidth}px`,
        height: 3, background: theme.tiffany, borderRadius: 2,
      }} />

      {/* 훅 텍스트 */}
      <div style={{
        fontSize: 46, color: theme.grayLight,
        fontFamily: theme.font, fontWeight: 500,
        opacity: subOpacity,
        transform: `translateY(${subY}px)`,
        lineHeight: 1.5,
      }}>
        {displayHook}
      </div>
    </div>
  );
};

// 아웃트로 카드
const OutroCard: React.FC = () => {
  const frame = useCurrentFrame();

  // interpolate 사용 → 나타난 뒤 절대 사라지지 않음
  const badgeOpacity = interpolate(frame, [0, 14],  [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const badgeY       = interpolate(frame, [0, 14],  [-12, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const textOpacity  = interpolate(frame, [10, 24], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const textScale    = interpolate(frame, [10, 24], [0.88, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const subOpacity   = interpolate(frame, [22, 36], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const subY         = interpolate(frame, [22, 36], [15, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <div style={{
      width: "100%", height: "100%",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center", gap: 32,
    }}>
      <div style={{
        fontSize: 28, fontWeight: 700, color: theme.tiffany,
        fontFamily: theme.font, letterSpacing: 6,
        opacity: badgeOpacity,
        transform: `translateY(${badgeY}px)`,
        textTransform: "uppercase" as const,
        border: `1px solid rgba(129,216,208,0.35)`,
        padding: "8px 28px", borderRadius: 4,
      }}>
        채널 구독하기
      </div>
      <div style={{
        fontSize: 96, fontWeight: 900, color: theme.white,
        fontFamily: theme.font,
        opacity: textOpacity,
        transform: `scale(${textScale})`,
        textShadow: `0 0 60px rgba(129,216,208,0.3)`,
      }}>
        구독 &amp; 좋아요
      </div>
      <div style={{
        fontSize: 36, color: theme.grayLight, fontFamily: theme.font,
        opacity: subOpacity,
        transform: `translateY(${subY}px)`,
      }}>
        알림 설정으로 다음 영상을 놓치지 마세요
      </div>
    </div>
  );
};

// 장면별 시각 컴포넌트 렌더링
const SceneVisual: React.FC<{
  scene: Scene;
  title: string;
  hook: string;
  durationFrames: number;
  allWords: any[];
  startFrame: number;
  sceneIndex: number;
}> = ({ scene, title, hook, durationFrames, allWords, startFrame, sceneIndex }) => {
  const { visualType, visualData, chartData, chartTitle } = scene;
  const accent = accentColors[visualType] ?? theme.gold;
  const transition = getTransition(sceneIndex, visualType);

  const renderVisual = () => {
    switch (visualType) {
      case "intro_card":
        return <IntroCard scene={scene} title={title} hook={hook} />;
      case "outro_card":
        return <OutroCard />;
      case "stat_card":
        return visualData ? <StatCard data={visualData as any} accentColor={accent} /> : null;
      case "bullet_list":
        return visualData ? <BulletList data={visualData as any} durationFrames={durationFrames} /> : null;
      case "timeline":
        return visualData ? <Timeline data={visualData as any} durationFrames={durationFrames} accentColor={accent} /> : null;
      case "comparison":
        return visualData ? <Comparison data={visualData as any} durationFrames={durationFrames} /> : null;
      case "number_highlight":
        return visualData ? <NumberHighlight data={visualData as any} accentColor={accent} /> : null;
      case "keyword":
        return visualData ? <Keyword data={visualData as any} /> : null;
      case "quote_card":
        return visualData ? <QuoteCard data={visualData as any} /> : null;
      case "flow_diagram":
        return visualData ? <FlowDiagram data={visualData as any} durationFrames={durationFrames} /> : null;
      case "news_feed":
        return visualData ? <NewsFeed data={visualData as any} durationFrames={durationFrames} /> : null;
      case "step_flow":
        return visualData ? <StepFlow data={visualData as any} durationFrames={durationFrames} /> : null;
      case "table_data":
        return visualData ? <TableData data={visualData as any} durationFrames={durationFrames} /> : null;
      case "pros_cons":
        return visualData ? <ProsConsCard data={visualData as any} durationFrames={durationFrames} /> : null;
      case "ranking_list":
        return visualData ? <RankingList data={visualData as any} durationFrames={durationFrames} /> : null;
      case "callout_box":
        return visualData ? <CalloutBox data={visualData as any} /> : null;
      case "ticker_board":
        return visualData ? <TickerBoard data={visualData as any} durationFrames={durationFrames} /> : null;
      case "icon_grid":
        return visualData ? <IconGrid data={visualData as any} durationFrames={durationFrames} /> : null;
      case "percentage_bar":
        return visualData ? <PercentageBar data={visualData as any} durationFrames={durationFrames} /> : null;
      case "dual_stat":
        return visualData ? <DualStat data={visualData as any} /> : null;
      case "scenario_card":
        return visualData ? <ScenarioCard data={visualData as any} durationFrames={durationFrames} /> : null;
      case "split_screen":
        return visualData ? <SplitScreen data={visualData as any} durationFrames={durationFrames} /> : null;
      case "world_stats":
        return visualData ? <WorldStats data={visualData as any} durationFrames={durationFrames} /> : null;
      case "gauge_meter":
        return visualData ? <GaugeMeter data={visualData as any} /> : null;
      case "donut_chart":
        return visualData ? <DonutChart data={visualData as any} /> : null;
      case "alert_banner":
        return visualData ? <AlertBanner data={visualData as any} /> : null;
      case "myth_vs_fact":
        return visualData ? <MythVsFact data={visualData as any} /> : null;
      case "checklist":
        return visualData ? <Checklist data={visualData as any} /> : null;
      case "trend_arrow":
        return visualData ? <TrendArrow data={visualData as any} /> : null;
      case "vs_battle":
        return visualData ? <VsBattle data={visualData as any} /> : null;
      case "pyramid_chart":
        return visualData ? <PyramidChart data={visualData as any} /> : null;
      case "interview_card":
        return visualData ? <InterviewCard data={visualData as any} /> : null;
      case "warning_card":
        return visualData ? <WarningCard data={visualData as any} /> : null;
      case "price_history":
        return visualData ? <PriceHistory data={visualData as any} /> : null;
      case "funnel_chart":
        return visualData ? <FunnelChart data={visualData as any} /> : null;
      case "calendar_event":
        return visualData ? <CalendarEvent data={visualData as any} /> : null;
      case "bubble_compare":
        return visualData ? <BubbleCompare data={visualData as any} /> : null;
      case "key_takeaway":
        return visualData ? <KeyTakeaway data={visualData as any} /> : null;
      case "stock_card":
        return visualData ? <StockCard data={visualData as any} /> : null;
      case "chart":
        return chartData ? (
          <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "flex-end" }}>
            <ChartBar data={chartData} title={chartTitle ?? ""} startFrame={10} />
          </div>
        ) : null;
      case "line_chart":
        return visualData ? <LineChart data={visualData as any} /> : null;
      case "heat_map":
        return visualData ? <HeatMap data={visualData as any} /> : null;
      case "quote_vs":
        return visualData ? <QuoteVs data={visualData as any} /> : null;
      case "stacked_bar":
        return visualData ? <StackedBar data={visualData as any} /> : null;
      case "swot_card":
        return visualData ? <SwotCard data={visualData as any} /> : null;
      case "target_price":
        return visualData ? <TargetPrice data={visualData as any} /> : null;
      case "sector_board":
        return visualData ? <SectorBoard data={visualData as any} /> : null;
      case "mini_profile":
        return visualData ? <MiniProfile data={visualData as any} /> : null;
      case "data_counter":
        return visualData ? <DataCounter data={visualData as any} /> : null;
      case "highlight_quote":
        return visualData ? <HighlightQuote data={visualData as any} /> : null;
      case "radar_chart":
        return visualData ? <RadarChart data={visualData as any} /> : null;
      case "tree_map":
        return visualData ? <TreeMap data={visualData as any} /> : null;
      case "countdown":
        return visualData ? <Countdown data={visualData as any} /> : null;
      case "matrix_grid":
        return visualData ? <MatrixGrid data={visualData as any} /> : null;
      case "before_after":
        return visualData ? <BeforeAfter data={visualData as any} /> : null;
      case "big_text":
        return visualData ? <BigText data={visualData as any} /> : null;
      case "waterfall_chart":
        return visualData ? <WaterfallChart data={visualData as any} /> : null;
      case "risk_scale":
        return visualData ? <RiskScale data={visualData as any} /> : null;
      case "relation_map":
        return visualData ? <RelationMap data={visualData as any} /> : null;
      case "milestone":
        return visualData ? <Milestone data={visualData as any} /> : null;
      case "news_ticker":
        return visualData ? <NewsTicker data={visualData as any} /> : null;
      case "emoji_scale":
        return visualData ? <EmojiScale data={visualData as any} /> : null;
      case "horizontal_bar":
        return visualData ? <HorizontalBar data={visualData as any} /> : null;
      case "gradient_stat":
        return visualData ? <GradientStat data={visualData as any} /> : null;
      case "area_chart":
        return visualData ? <AreaChart data={visualData as any} /> : null;
      case "value_chain":
        return visualData ? <ValueChain data={visualData as any} /> : null;
      case "stock_pick":
        return visualData ? <StockPick data={visualData as any} /> : null;
      case "domino_effect":
        return visualData ? <DominoEffect data={visualData as any} /> : null;
      case "history_pattern":
        return visualData ? <HistoryPattern data={visualData as any} /> : null;
      case "sentiment_bar":
        return visualData ? <SentimentBar data={visualData as any} /> : null;
      case "strategy_card":
        return visualData ? <StrategyCard data={visualData as any} /> : null;
      case "tech_stack":
        return visualData ? <TechStack data={visualData as any} /> : null;
      case "event_impact":
        return visualData ? <EventImpact data={visualData as any} /> : null;
      case "psychology_card":
        return visualData ? <PsychologyCard data={visualData as any} /> : null;
      case "debate_card":
        return visualData ? <DebateCard data={visualData as any} /> : null;
      case "money_flow":
        return visualData ? <MoneyFlow data={visualData as any} /> : null;
      case "scale_compare":
        return visualData ? <ScaleCompare data={visualData as any} /> : null;
      case "career_timeline":
        return visualData ? <CareerTimeline data={visualData as any} /> : null;
      case "price_impact":
        return visualData ? <PriceImpact data={visualData as any} /> : null;
      case "structure_diagram":
        return visualData ? <StructureDiagram data={visualData as any} /> : null;
      case "argument_card":
        return visualData ? <ArgumentCard data={visualData as any} /> : null;
      case "mechanism":
        return visualData ? <Mechanism data={visualData as any} /> : null;
      case "candlestick":
        return visualData ? <Candlestick data={visualData as any} /> : null;
      case "earnings_card":
        return visualData ? <EarningsCard data={visualData as any} /> : null;
      case "valuation_table":
        return visualData ? <ValuationTable data={visualData as any} /> : null;
      case "analyst_rating":
        return visualData ? <AnalystRating data={visualData as any} /> : null;
      case "etf_compare":
        return visualData ? <EtfCompare data={visualData as any} /> : null;
      case "sector_rotation":
        return visualData ? <SectorRotation data={visualData as any} /> : null;
      case "law_card":
        return visualData ? <LawCard data={visualData as any} /> : null;
      case "liquidation_cascade":
        return visualData ? <LiquidationCascade data={visualData as any} /> : null;
      case "bubble_indicator":
        return visualData ? <BubbleIndicator data={visualData as any} /> : null;
      default:
        return visualData ? <Keyword data={visualData as any} /> : null;
    }
  };

  const showSubtitle = visualType !== "intro_card" && visualType !== "outro_card";

  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      <Background accentColor={accent} videoSrc={scene.backgroundVideo} />
      <SceneTransition durationFrames={durationFrames} transition={transition} noExit={visualType === "intro_card" || visualType === "outro_card"}>
        {renderVisual()}
        {showSubtitle && (
          <Subtitle words={allWords} startSeconds={scene.startSeconds} />
        )}
      </SceneTransition>
    </div>
  );
};

export const FinanceVideo: React.FC<VideoProps> = (props) => {
  const { fps } = useVideoConfig();
  const { title, hook, audioFile, scenes, wordTimestamps } = props;

  return (
    <>
      <Audio src={staticFile(audioFile)} />
      {scenes.map((scene, index) => {
        const startFrame = Math.round(scene.startSeconds * fps);
        const durationFrames = Math.round(scene.durationSeconds * fps);

        return (
          <Sequence key={scene.sceneId} from={startFrame} durationInFrames={durationFrames}>
            <SceneVisual
              scene={scene}
              title={title}
              hook={hook}
              durationFrames={durationFrames}
              allWords={wordTimestamps}
              startFrame={startFrame}
              sceneIndex={index}
            />
          </Sequence>
        );
      })}
    </>
  );
};
