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
import { GeoHighlightMap } from "../visuals/GeoHighlightMap";
import { SupplyDependency } from "../visuals/SupplyDependency";
import { PolicyCompare } from "../visuals/PolicyCompare";
import { PressureNetwork } from "../visuals/PressureNetwork";
import { PowerShift } from "../visuals/PowerShift";
import { EscalationLadder } from "../visuals/EscalationLadder";
import { ViciousCycle } from "../visuals/ViciousCycle";
import { CatchUpRace } from "../visuals/CatchUpRace";
import { HookStatement } from "../visuals/HookStatement";
import { SpeechBubble } from "../visuals/SpeechBubble";
import { DataDashboard } from "../visuals/DataDashboard";
import { MarkupText } from "../visuals/MarkupText";
import { RankShift } from "../visuals/RankShift";
import { StockChart } from "../visuals/StockChart";
import { ReportChart } from "../visuals/ReportChart";
import { ParliamentChart } from "../visuals/ParliamentChart";
import { ProcessFlow } from "../visuals/ProcessFlow";
import { SideInfo } from "../visuals/SideInfo";
import { CenterInfo } from "../visuals/CenterInfo";
import { BottomInfo } from "../visuals/BottomInfo";
import { TopInfo } from "../visuals/TopInfo";
import { WhiteQuote } from "../visuals/WhiteQuote";
import { SplitOverlay } from "../visuals/SplitOverlay";
import { WhiteStat } from "../visuals/WhiteStat";
import { WhiteTimeline } from "../visuals/WhiteTimeline";
import { WhiteCallout } from "../visuals/WhiteCallout";
import { WhiteRanking } from "../visuals/WhiteRanking";
import { DiagonalInfo } from "../visuals/DiagonalInfo";
import { WhiteChecklist } from "../visuals/WhiteChecklist";
import { WhiteProsCons } from "../visuals/WhiteProsCons";
import { WhiteScenario } from "../visuals/WhiteScenario";
import { WhiteWarning } from "../visuals/WhiteWarning";
import { WhiteSummary } from "../visuals/WhiteSummary";
import { SideQuote } from "../visuals/SideQuote";
import { SideWarning } from "../visuals/SideWarning";
import { SideStat } from "../visuals/SideStat";
import { SideTimeline } from "../visuals/SideTimeline";
import { SideChecklist } from "../visuals/SideChecklist";
import { DarkSideInfo } from "../visuals/DarkSideInfo";
import { DarkCenterInfo } from "../visuals/DarkCenterInfo";
import { DarkTopInfo } from "../visuals/DarkTopInfo";
import { DarkBottomInfo } from "../visuals/DarkBottomInfo";
import { DarkQuote } from "../visuals/DarkQuote";
import { DarkStat } from "../visuals/DarkStat";
import { DarkTimeline } from "../visuals/DarkTimeline";
import { DarkWarning } from "../visuals/DarkWarning";
import { DarkSummary } from "../visuals/DarkSummary";
import { DarkSplitOverlay } from "../visuals/DarkSplitOverlay";
import { SideDonut } from "../visuals/SideDonut";
import { SideBarChart } from "../visuals/SideBarChart";
import { SideGauge } from "../visuals/SideGauge";
import { SideLineChart } from "../visuals/SideLineChart";
import { SideRadar } from "../visuals/SideRadar";
import { DarkDonut } from "../visuals/DarkDonut";
import { DarkBarChart } from "../visuals/DarkBarChart";
import { DarkGauge } from "../visuals/DarkGauge";
import { DarkLineChart } from "../visuals/DarkLineChart";
import { DarkRadar } from "../visuals/DarkRadar";
import { GlassCard } from "../visuals/GlassCard";
import { SpotlightReveal } from "../visuals/SpotlightReveal";
import { NewspaperClip } from "../visuals/NewspaperClip";
import { CounterReveal } from "../visuals/CounterReveal";
import { TextReveal } from "../visuals/TextReveal";
import { PostItBoard } from "../visuals/PostItBoard";
import { ReceiptCard } from "../visuals/ReceiptCard";
import { StampCard } from "../visuals/StampCard";
import { XrayReveal } from "../visuals/XrayReveal";
import { MagnifyReveal } from "../visuals/MagnifyReveal";
import { PolaroidStack } from "../visuals/PolaroidStack";
import { ChatMessage } from "../visuals/ChatMessage";
import { FlipCard } from "../visuals/FlipCard";
import { WantedPoster } from "../visuals/WantedPoster";
import { PasswordCrack } from "../visuals/PasswordCrack";
import { Blueprint } from "../visuals/Blueprint";
import { FileFolder } from "../visuals/FileFolder";
import { TornPaper } from "../visuals/TornPaper";
import { RadarScan } from "../visuals/RadarScan";
import { TicketStub } from "../visuals/TicketStub";
import { BlueprintAnatomy } from "../visuals/BlueprintAnatomy";
import { BlueprintEquation } from "../visuals/BlueprintEquation";
import { BlueprintSpec } from "../visuals/BlueprintSpec";
import { BlueprintCrossSection } from "../visuals/BlueprintCrossSection";
import { EvidenceBoard } from "../visuals/EvidenceBoard";
import { TerminalLog } from "../visuals/TerminalLog";
import { ControlRoom } from "../visuals/ControlRoom";
import { FilmReel } from "../visuals/FilmReel";
import { Scoreboard } from "../visuals/Scoreboard";
import { EnvelopeReveal } from "../visuals/EnvelopeReveal";
import { theme, accentColors } from "../styles/theme";
import { SceneThemeProvider, useSceneTheme } from "../contexts/SceneTheme";

// 전환 효과 타입
type TransitionType = "fade" | "slideLeft" | "slideRight" | "slideUp" | "zoomIn" | "zoomFade" | "slideDown";

const TRANSITION_TYPES: TransitionType[] = ["fade", "slideLeft", "slideRight", "slideUp", "zoomIn", "zoomFade", "slideDown"];

// 씬 인덱스로 전환 효과 결정 (intro/outro는 항상 fade)
const getTransition = (sceneIndex: number, visualType: string): TransitionType => {
  if (visualType === "intro_card" || visualType === "outro_card") return "fade";
  return TRANSITION_TYPES[sceneIndex % TRANSITION_TYPES.length];
};

// 장면 전환 애니메이션
// 입장: transform만 (slide/zoom 움직임) — opacity는 내부 컴포넌트에 맡김
// 퇴장: opacity + transform 둘 다 적용
const SceneTransition: React.FC<{
  children: React.ReactNode;
  durationFrames: number;
  transition: TransitionType;
  noExit?: boolean;
}> = ({ children, durationFrames, transition, noExit }) => {
  const frame = useCurrentFrame();
  const IN = 30;    // 입장 0.5초
  const OUT = 25;   // 퇴장 ~0.4초
  const safeOutStart = Math.max(IN + 1, durationFrames - OUT);

  // 입장 진행도 (0→1) — transform에만 사용
  const enterP = interpolate(frame, [0, IN], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  // 퇴장 진행도 (1→0) — opacity + transform에 사용
  const exitP = noExit ? 1 : interpolate(frame, [safeOutStart, durationFrames], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // opacity: 퇴장 시에만 적용 (입장 시 항상 1)
  const opacity = exitP;

  // transform: 입장 + 퇴장 둘 다 적용
  let transform = "";
  const isExiting = frame >= safeOutStart && !noExit;
  const exitMove = 1 - exitP;

  switch (transition) {
    case "fade":
      break;
    case "slideLeft":
      transform = isExiting ? `translateX(${-60 * exitMove}px)` : `translateX(${interpolate(enterP, [0, 1], [60, 0])}px)`;
      break;
    case "slideRight":
      transform = isExiting ? `translateX(${60 * exitMove}px)` : `translateX(${interpolate(enterP, [0, 1], [-60, 0])}px)`;
      break;
    case "slideUp":
      transform = isExiting ? `translateY(${-30 * exitMove}px)` : `translateY(${interpolate(enterP, [0, 1], [50, 0])}px)`;
      break;
    case "slideDown":
      transform = isExiting ? `translateY(${30 * exitMove}px)` : `translateY(${interpolate(enterP, [0, 1], [-50, 0])}px)`;
      break;
    case "zoomIn":
      transform = isExiting ? `scale(${1 + 0.05 * exitMove})` : `scale(${interpolate(enterP, [0, 1], [0.92, 1])})`;
      break;
    case "zoomFade":
      transform = isExiting ? `scale(${1 - 0.06 * exitMove})` : `scale(${interpolate(enterP, [0, 1], [1.06, 1])})`;
      break;
  }

  return (
    <div style={{ width: "100%", height: "100%", opacity, transform, position: "relative", zIndex: 1 }}>
      {children}
    </div>
  );
};

// 인트로 카드
const IntroCard: React.FC<{ scene: Scene; title: string; hook: string }> = ({ scene, title, hook }) => {
  const frame = useCurrentFrame();
  const theme = useSceneTheme();

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
  const theme = useSceneTheme();

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
      case "geo_highlight_map":
        return visualData ? <GeoHighlightMap data={visualData as any} /> : null;
      case "supply_dependency":
        return visualData ? <SupplyDependency data={visualData as any} /> : null;
      case "policy_compare":
        return visualData ? <PolicyCompare data={visualData as any} /> : null;
      case "pressure_network":
        return visualData ? <PressureNetwork data={visualData as any} /> : null;
      case "power_shift":
        return visualData ? <PowerShift data={visualData as any} /> : null;
      case "escalation_ladder":
        return visualData ? <EscalationLadder data={visualData as any} /> : null;
      case "vicious_cycle":
        return visualData ? <ViciousCycle data={visualData as any} /> : null;
      case "catch_up_race":
        return visualData ? <CatchUpRace data={visualData as any} /> : null;
      case "hook_statement":
        return visualData ? <HookStatement data={visualData as any} /> : null;
      case "speech_bubble":
        return visualData ? <SpeechBubble data={visualData as any} /> : null;
      case "data_dashboard":
        return visualData ? <DataDashboard data={visualData as any} /> : null;
      case "markup_text":
        return visualData ? <MarkupText data={visualData as any} /> : null;
      case "rank_shift":
        return visualData ? <RankShift data={visualData as any} /> : null;
      case "stock_chart":
        return visualData ? <StockChart data={visualData as any} /> : null;
      case "report_chart":
        return visualData ? <ReportChart data={visualData as any} /> : null;
      case "parliament_chart":
        return visualData ? <ParliamentChart data={visualData as any} /> : null;
      case "process_flow":
        return visualData ? <ProcessFlow data={visualData as any} /> : null;
      case "side_info":
        return visualData ? <SideInfo data={visualData as any} /> : null;
      case "center_info":
        return visualData ? <CenterInfo data={visualData as any} /> : null;
      case "bottom_info":
        return visualData ? <BottomInfo data={visualData as any} /> : null;
      case "top_info":
        return visualData ? <TopInfo data={visualData as any} /> : null;
      case "white_quote":
        return visualData ? <WhiteQuote data={visualData as any} /> : null;
      case "split_overlay":
        return visualData ? <SplitOverlay data={visualData as any} /> : null;
      case "white_stat":
        return visualData ? <WhiteStat data={visualData as any} /> : null;
      case "white_timeline":
        return visualData ? <WhiteTimeline data={visualData as any} /> : null;
      case "white_callout":
        return visualData ? <WhiteCallout data={visualData as any} /> : null;
      case "white_ranking":
        return visualData ? <WhiteRanking data={visualData as any} /> : null;
      case "diagonal_info":
        return visualData ? <DiagonalInfo data={visualData as any} /> : null;
      case "white_checklist":
        return visualData ? <WhiteChecklist data={visualData as any} /> : null;
      case "white_pros_cons":
        return visualData ? <WhiteProsCons data={visualData as any} /> : null;
      case "white_scenario":
        return visualData ? <WhiteScenario data={visualData as any} /> : null;
      case "white_warning":
        return visualData ? <WhiteWarning data={visualData as any} /> : null;
      case "white_summary":
        return visualData ? <WhiteSummary data={visualData as any} /> : null;
      case "side_quote":
        return visualData ? <SideQuote data={visualData as any} /> : null;
      case "side_warning":
        return visualData ? <SideWarning data={visualData as any} /> : null;
      case "side_stat":
        return visualData ? <SideStat data={visualData as any} /> : null;
      case "side_timeline":
        return visualData ? <SideTimeline data={visualData as any} /> : null;
      case "side_checklist":
        return visualData ? <SideChecklist data={visualData as any} /> : null;
      case "dark_side_info":
        return visualData ? <DarkSideInfo data={visualData as any} /> : null;
      case "dark_center_info":
        return visualData ? <DarkCenterInfo data={visualData as any} /> : null;
      case "dark_top_info":
        return visualData ? <DarkTopInfo data={visualData as any} /> : null;
      case "dark_bottom_info":
        return visualData ? <DarkBottomInfo data={visualData as any} /> : null;
      case "dark_quote":
        return visualData ? <DarkQuote data={visualData as any} /> : null;
      case "dark_stat":
        return visualData ? <DarkStat data={visualData as any} /> : null;
      case "dark_timeline":
        return visualData ? <DarkTimeline data={visualData as any} /> : null;
      case "dark_warning":
        return visualData ? <DarkWarning data={visualData as any} /> : null;
      case "dark_summary":
        return visualData ? <DarkSummary data={visualData as any} /> : null;
      case "dark_split":
        return visualData ? <DarkSplitOverlay data={visualData as any} /> : null;
      case "side_donut":
        return visualData ? <SideDonut data={visualData as any} /> : null;
      case "side_bar_chart":
        return visualData ? <SideBarChart data={visualData as any} /> : null;
      case "side_gauge":
        return visualData ? <SideGauge data={visualData as any} /> : null;
      case "side_line_chart":
        return visualData ? <SideLineChart data={visualData as any} /> : null;
      case "side_radar":
        return visualData ? <SideRadar data={visualData as any} /> : null;
      case "dark_donut":
        return visualData ? <DarkDonut data={visualData as any} /> : null;
      case "dark_bar_chart":
        return visualData ? <DarkBarChart data={visualData as any} /> : null;
      case "dark_gauge":
        return visualData ? <DarkGauge data={visualData as any} /> : null;
      case "dark_line_chart":
        return visualData ? <DarkLineChart data={visualData as any} /> : null;
      case "dark_radar":
        return visualData ? <DarkRadar data={visualData as any} /> : null;
      case "glass_card":
        return visualData ? <GlassCard data={visualData as any} /> : null;
      case "spotlight_reveal":
        return visualData ? <SpotlightReveal data={visualData as any} /> : null;
      case "newspaper_clip":
        return visualData ? <NewspaperClip data={visualData as any} /> : null;
      case "counter_reveal":
        return visualData ? <CounterReveal data={visualData as any} /> : null;
      case "text_reveal":
        return visualData ? <TextReveal data={visualData as any} /> : null;
      case "postit_board":
        return visualData ? <PostItBoard data={visualData as any} /> : null;
      case "receipt_card":
        return visualData ? <ReceiptCard data={visualData as any} /> : null;
      case "stamp_card":
        return visualData ? <StampCard data={visualData as any} /> : null;
      case "xray_reveal":
        return visualData ? <XrayReveal data={visualData as any} /> : null;
      case "magnify_reveal":
        return visualData ? <MagnifyReveal data={visualData as any} /> : null;
      case "polaroid_stack":
        return visualData ? <PolaroidStack data={visualData as any} /> : null;
      case "chat_message":
        return visualData ? <ChatMessage data={visualData as any} /> : null;
      case "flip_card":
        return visualData ? <FlipCard data={visualData as any} /> : null;
      case "wanted_poster":
        return visualData ? <WantedPoster data={visualData as any} /> : null;
      case "password_crack":
        return visualData ? <PasswordCrack data={visualData as any} /> : null;
      case "blueprint":
        return visualData ? <Blueprint data={visualData as any} /> : null;
      case "file_folder":
        return visualData ? <FileFolder data={visualData as any} /> : null;
      case "torn_paper":
        return visualData ? <TornPaper data={visualData as any} /> : null;
      case "radar_scan":
        return visualData ? <RadarScan data={visualData as any} /> : null;
      case "ticket_stub":
        return visualData ? <TicketStub data={visualData as any} /> : null;
      case "blueprint_anatomy":
        return visualData ? <BlueprintAnatomy data={visualData as any} /> : null;
      case "blueprint_equation":
        return visualData ? <BlueprintEquation data={visualData as any} /> : null;
      case "blueprint_spec":
        return visualData ? <BlueprintSpec data={visualData as any} /> : null;
      case "blueprint_cross_section":
        return visualData ? <BlueprintCrossSection data={visualData as any} /> : null;
      case "evidence_board":
        return visualData ? <EvidenceBoard data={visualData as any} /> : null;
      case "terminal_log":
        return visualData ? <TerminalLog data={visualData as any} /> : null;
      case "control_room":
        return visualData ? <ControlRoom data={visualData as any} /> : null;
      case "film_reel":
        return visualData ? <FilmReel data={visualData as any} /> : null;
      case "scoreboard":
        return visualData ? <Scoreboard data={visualData as any} /> : null;
      case "envelope_reveal":
        return visualData ? <EnvelopeReveal data={visualData as any} /> : null;
      default:
        return visualData ? <Keyword data={visualData as any} /> : null;
    }
  };

  const showSubtitle = visualType !== "intro_card" && visualType !== "outro_card";

  const bright = !!scene.bright;
  const transparentBgTypes = ["side_info", "process_flow", "center_info", "bottom_info", "top_info", "white_quote", "split_overlay", "white_stat", "white_timeline", "white_callout", "white_ranking", "diagonal_info", "white_checklist", "white_pros_cons", "white_scenario", "white_warning", "white_summary", "side_quote", "side_warning", "side_stat", "side_timeline", "side_checklist", "dark_side_info", "dark_center_info", "dark_top_info", "dark_bottom_info", "dark_quote", "dark_stat", "dark_timeline", "dark_warning", "dark_summary", "dark_split", "side_donut", "side_bar_chart", "side_gauge", "side_line_chart", "side_radar", "dark_donut", "dark_bar_chart", "dark_gauge", "dark_line_chart", "dark_radar", "glass_card", "spotlight_reveal", "newspaper_clip", "counter_reveal", "text_reveal", "postit_board", "receipt_card", "stamp_card", "xray_reveal", "magnify_reveal", "polaroid_stack", "chat_message", "flip_card", "wanted_poster", "password_crack", "blueprint", "file_folder", "torn_paper", "radar_scan", "ticket_stub"];
  const transparentBg = transparentBgTypes.includes(visualType);

  // 오버레이 그라데이션 + 도화지 마스크 설정
  const getOverlayConfig = () => {
    switch (visualType) {
      case "process_flow":
        return {
          gradient: "linear-gradient(90deg, rgba(240,240,236,0.95) 0%, rgba(240,240,236,0.9) 28%, rgba(240,240,236,0.5) 42%, rgba(240,240,236,0.15) 55%, transparent 65%)",
          mask: "linear-gradient(90deg, black 0%, black 30%, transparent 60%)",
        };
      case "side_info": {
        const side = visualData ? ((visualData as any).side ?? "left") : "left";
        const isLeft = side === "left";
        return {
          gradient: isLeft
            ? "linear-gradient(90deg, rgba(240,240,236,0.95) 0%, rgba(240,240,236,0.92) 35%, rgba(240,240,236,0.7) 55%, rgba(240,240,236,0.3) 72%, transparent 88%)"
            : "linear-gradient(270deg, rgba(240,240,236,0.95) 0%, rgba(240,240,236,0.92) 35%, rgba(240,240,236,0.7) 55%, rgba(240,240,236,0.3) 72%, transparent 88%)",
          mask: isLeft
            ? "linear-gradient(90deg, black 0%, black 30%, transparent 60%)"
            : "linear-gradient(270deg, black 0%, black 30%, transparent 60%)",
        };
      }
      case "center_info":
        return {
          gradient: "linear-gradient(90deg, transparent 0%, rgba(240,240,236,0.3) 12%, rgba(240,240,236,0.92) 28%, rgba(240,240,236,0.95) 50%, rgba(240,240,236,0.92) 72%, rgba(240,240,236,0.3) 88%, transparent 100%)",
          mask: "linear-gradient(90deg, transparent 8%, black 22%, black 78%, transparent 92%)",
        };
      case "bottom_info":
        return {
          gradient: "linear-gradient(0deg, rgba(240,240,236,0.95) 0%, rgba(240,240,236,0.95) 35%, rgba(240,240,236,0.85) 50%, rgba(240,240,236,0.5) 65%, rgba(240,240,236,0.15) 78%, transparent 90%)",
          mask: "linear-gradient(0deg, black 0%, black 35%, transparent 65%)",
        };
      case "top_info":
        return {
          gradient: "linear-gradient(180deg, rgba(240,240,236,0.95) 0%, rgba(240,240,236,0.95) 35%, rgba(240,240,236,0.85) 50%, rgba(240,240,236,0.5) 65%, rgba(240,240,236,0.15) 78%, transparent 90%)",
          mask: "linear-gradient(180deg, black 0%, black 35%, transparent 65%)",
        };
      case "white_quote":
        return {
          gradient: "radial-gradient(ellipse 85% 80% at center, rgba(240,240,236,0.95) 0%, rgba(240,240,236,0.92) 35%, rgba(240,240,236,0.6) 55%, rgba(240,240,236,0.2) 72%, transparent 90%)",
          mask: "radial-gradient(ellipse 85% 80% at center, black 0%, black 30%, transparent 65%)",
        };
      case "split_overlay":
        return {
          gradient: "linear-gradient(180deg, transparent 0%, rgba(240,240,236,0.3) 8%, rgba(240,240,236,0.95) 18%, rgba(240,240,236,0.95) 82%, rgba(240,240,236,0.3) 92%, transparent 100%)",
          mask: "linear-gradient(180deg, transparent 3%, black 15%, black 85%, transparent 97%)",
        };
      case "white_stat":
      case "white_callout":
        return {
          gradient: "radial-gradient(ellipse 85% 80% at center, rgba(240,240,236,0.95) 0%, rgba(240,240,236,0.92) 35%, rgba(240,240,236,0.6) 55%, rgba(240,240,236,0.2) 72%, transparent 90%)",
          mask: "radial-gradient(ellipse 85% 80% at center, black 0%, black 30%, transparent 65%)",
        };
      case "white_timeline":
        return {
          gradient: "linear-gradient(180deg, transparent 0%, rgba(240,240,236,0.3) 12%, rgba(240,240,236,0.95) 25%, rgba(240,240,236,0.95) 75%, rgba(240,240,236,0.3) 88%, transparent 100%)",
          mask: "linear-gradient(180deg, transparent 8%, black 20%, black 80%, transparent 92%)",
        };
      case "white_ranking":
        return {
          gradient: "linear-gradient(90deg, transparent 0%, rgba(240,240,236,0.5) 8%, rgba(240,240,236,0.98) 16%, rgba(240,240,236,0.98) 84%, rgba(240,240,236,0.5) 92%, transparent 100%)",
          mask: "linear-gradient(90deg, transparent 3%, black 12%, black 88%, transparent 97%)",
        };
      case "diagonal_info":
        return {
          gradient: "linear-gradient(135deg, rgba(240,240,236,0.95) 0%, rgba(240,240,236,0.92) 30%, rgba(240,240,236,0.7) 45%, rgba(240,240,236,0.3) 60%, transparent 75%)",
          mask: "linear-gradient(135deg, black 0%, black 25%, transparent 55%)",
        };
      case "white_checklist":
      case "white_summary":
        return {
          gradient: "linear-gradient(90deg, transparent 0%, rgba(240,240,236,0.5) 8%, rgba(240,240,236,0.98) 16%, rgba(240,240,236,0.98) 84%, rgba(240,240,236,0.5) 92%, transparent 100%)",
          mask: "linear-gradient(90deg, transparent 3%, black 12%, black 88%, transparent 97%)",
        };
      case "white_pros_cons":
      case "white_scenario":
        return {
          gradient: "linear-gradient(180deg, transparent 0%, rgba(240,240,236,0.3) 8%, rgba(240,240,236,0.95) 18%, rgba(240,240,236,0.95) 82%, rgba(240,240,236,0.3) 92%, transparent 100%)",
          mask: "linear-gradient(180deg, transparent 3%, black 15%, black 85%, transparent 97%)",
        };
      case "white_warning":
        return {
          gradient: "radial-gradient(ellipse 85% 80% at center, rgba(240,240,236,0.95) 0%, rgba(240,240,236,0.92) 35%, rgba(240,240,236,0.6) 55%, rgba(240,240,236,0.2) 72%, transparent 90%)",
          mask: "radial-gradient(ellipse 85% 80% at center, black 0%, black 30%, transparent 65%)",
        };
      case "side_quote":
      case "side_warning":
      case "side_stat":
      case "side_timeline":
      case "side_checklist":
      case "side_donut":
      case "side_bar_chart":
      case "side_gauge":
      case "side_line_chart":
      case "side_radar": {
        const sSide = visualData ? ((visualData as any).side ?? "left") : "left";
        const sLeft = sSide === "left";
        return {
          gradient: sLeft
            ? "linear-gradient(90deg, rgba(240,240,236,0.95) 0%, rgba(240,240,236,0.92) 35%, rgba(240,240,236,0.7) 55%, rgba(240,240,236,0.3) 72%, transparent 88%)"
            : "linear-gradient(270deg, rgba(240,240,236,0.95) 0%, rgba(240,240,236,0.92) 35%, rgba(240,240,236,0.7) 55%, rgba(240,240,236,0.3) 72%, transparent 88%)",
          mask: sLeft
            ? "linear-gradient(90deg, black 0%, black 30%, transparent 60%)"
            : "linear-gradient(270deg, black 0%, black 30%, transparent 60%)",
        };
      }
      case "dark_side_info":
      case "dark_quote":
      case "dark_stat":
      case "dark_timeline":
      case "dark_warning":
      case "dark_donut":
      case "dark_bar_chart":
      case "dark_gauge":
      case "dark_line_chart":
      case "dark_radar":
      case "glass_card":
      case "counter_reveal":
      case "text_reveal":
      case "magnify_reveal": {
        const dSide = visualData ? ((visualData as any).side ?? "left") : "left";
        const dLeft = dSide === "left";
        return {
          gradient: dLeft
            ? "linear-gradient(90deg, rgba(6,13,12,0.95) 0%, rgba(6,13,12,0.92) 35%, rgba(6,13,12,0.7) 55%, rgba(6,13,12,0.3) 72%, transparent 88%)"
            : "linear-gradient(270deg, rgba(6,13,12,0.95) 0%, rgba(6,13,12,0.92) 35%, rgba(6,13,12,0.7) 55%, rgba(6,13,12,0.3) 72%, transparent 88%)",
          mask: dLeft
            ? "linear-gradient(90deg, black 0%, black 30%, transparent 60%)"
            : "linear-gradient(270deg, black 0%, black 30%, transparent 60%)",
        };
      }
      case "postit_board":
        return {
          gradient: "rgba(6,13,12,0.82)",
          mask: "none",
        };
      case "dark_center_info":
        return {
          gradient: "linear-gradient(90deg, transparent 0%, rgba(6,13,12,0.3) 12%, rgba(6,13,12,0.92) 28%, rgba(6,13,12,0.95) 50%, rgba(6,13,12,0.92) 72%, rgba(6,13,12,0.3) 88%, transparent 100%)",
          mask: "linear-gradient(90deg, transparent 8%, black 22%, black 78%, transparent 92%)",
        };
      case "dark_top_info":
        return {
          gradient: "linear-gradient(180deg, rgba(6,13,12,0.95) 0%, rgba(6,13,12,0.95) 35%, rgba(6,13,12,0.85) 50%, rgba(6,13,12,0.5) 65%, rgba(6,13,12,0.15) 78%, transparent 90%)",
          mask: "linear-gradient(180deg, black 0%, black 35%, transparent 65%)",
        };
      case "dark_bottom_info":
        return {
          gradient: "linear-gradient(0deg, rgba(6,13,12,0.95) 0%, rgba(6,13,12,0.95) 35%, rgba(6,13,12,0.85) 50%, rgba(6,13,12,0.5) 65%, rgba(6,13,12,0.15) 78%, transparent 90%)",
          mask: "linear-gradient(0deg, black 0%, black 35%, transparent 65%)",
        };
      case "dark_summary":
        return {
          gradient: "linear-gradient(90deg, transparent 0%, rgba(6,13,12,0.5) 8%, rgba(6,13,12,0.98) 16%, rgba(6,13,12,0.98) 84%, rgba(6,13,12,0.5) 92%, transparent 100%)",
          mask: "linear-gradient(90deg, transparent 3%, black 12%, black 88%, transparent 97%)",
        };
      case "dark_split":
        return {
          gradient: "linear-gradient(180deg, transparent 0%, rgba(6,13,12,0.3) 8%, rgba(6,13,12,0.95) 18%, rgba(6,13,12,0.95) 82%, rgba(6,13,12,0.3) 92%, transparent 100%)",
          mask: "linear-gradient(180deg, transparent 3%, black 15%, black 85%, transparent 97%)",
        };
      case "spotlight_reveal":
        return {
          gradient: "none",
          mask: "none",
        };
      case "newspaper_clip":
      case "receipt_card":
      case "stamp_card":
        return {
          gradient: "radial-gradient(ellipse 70% 75% at center, rgba(240,240,236,0.15) 0%, transparent 70%)",
          mask: "radial-gradient(ellipse 70% 75% at center, black 0%, black 20%, transparent 60%)",
        };
      case "xray_reveal":
      case "torn_paper":
        return {
          gradient: "none",
          mask: "none",
        };
      case "polaroid_stack":
      case "password_crack":
      case "radar_scan":
      case "flip_card":
      case "ticket_stub":
      case "blueprint":
      case "blueprint_anatomy":
      case "blueprint_equation":
      case "blueprint_spec":
      case "blueprint_cross_section":
      case "evidence_board":
      case "terminal_log":
      case "control_room":
      case "film_reel":
      case "scoreboard":
      case "envelope_reveal":
        return {
          gradient: "rgba(6,13,12,0.82)",
          mask: "none",
        };
      case "chat_message":
        return {
          gradient: "rgba(6,13,12,0.75)",
          mask: "none",
        };
      case "wanted_poster":
      case "file_folder":
        return {
          gradient: "radial-gradient(ellipse 70% 75% at center, rgba(240,240,236,0.15) 0%, transparent 70%)",
          mask: "radial-gradient(ellipse 70% 75% at center, black 0%, black 20%, transparent 60%)",
        };
      default:
        return null;
    }
  };
  const overlayConfig = transparentBg ? getOverlayConfig() : null;

  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      <Background accentColor={accent} videoSrc={scene.backgroundVideo} bright={bright} transparent={transparentBg} />

      {/* 그라데이션 + 도화지 오버레이 — SceneTransition 바깥 (씬 전환 시 고정) */}
      {overlayConfig && (
        <>
          <div style={{
            position: "absolute", inset: 0,
            background: overlayConfig.gradient,
            pointerEvents: "none",
            zIndex: 1,
          }} />
          <div style={{
            position: "absolute", top: 0, left: 0, width: "100%", height: "100%",
            zIndex: 2, pointerEvents: "none",
            WebkitMaskImage: overlayConfig.mask,
            maskImage: overlayConfig.mask,
          }}>
            <svg style={{ width: "100%", height: "100%", opacity: 0.1 }}>
              <defs>
                <filter id={`overlay-paper-${scene.sceneId}`} x="0" y="0" width="100%" height="100%">
                  <feTurbulence type="turbulence" baseFrequency="0.15" numOctaves="5" seed={scene.sceneId * 7 + 3} stitchTiles="stitch" result="noise" />
                  <feDiffuseLighting in="noise" lightingColor="white" surfaceScale="3" result="lit">
                    <feDistantLight azimuth="135" elevation="45" />
                  </feDiffuseLighting>
                </filter>
              </defs>
              <rect width="100%" height="100%" filter={`url(#overlay-paper-${scene.sceneId})`} />
            </svg>
          </div>
        </>
      )}

      <SceneThemeProvider bright={bright}>
        <SceneTransition durationFrames={durationFrames} transition={transition} noExit={visualType === "intro_card" || visualType === "outro_card"}>
          {renderVisual()}
        </SceneTransition>
      </SceneThemeProvider>

      {/* 자막 — SceneTransition 바깥 (씬 전환 애니메이션 영향 없음) */}
      {showSubtitle && (
        <Subtitle words={allWords} startSeconds={scene.startSeconds} />
      )}
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
