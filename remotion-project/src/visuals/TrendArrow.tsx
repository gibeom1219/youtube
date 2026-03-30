import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { theme } from "../styles/theme";

interface Props {
  data: {
    metric: string;
    direction: "up" | "down" | "sideways";
    from_value: string;
    to_value: string;
    period: string;
    change?: string;
    insight?: string;
  };
}

export const TrendArrow: React.FC<Props> = ({ data }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const metricProgress  = spring({ frame,         fps, config: { damping: 100, stiffness: 10 } });
  const arrowProgress   = spring({ frame: frame - 10, fps, config: { damping: 70,  stiffness: 5 } });
  const valuesProgress  = spring({ frame: frame - 18, fps, config: { damping: 100, stiffness: 5 } });
  const insightProgress = spring({ frame: frame - 28, fps, config: { damping: 100, stiffness: 10 } });

  const glowPulse = (Math.sin(frame * 0.04) + 1) / 2;

  const dirColor = data.direction === "up" ? "#52D68A"
                 : data.direction === "down" ? "#FF6B6B"
                 : "#FFB347";
  const arrowSymbol = data.direction === "up" ? "↑" : data.direction === "down" ? "↓" : "→";
  const dirLabel    = data.direction === "up" ? "상승" : data.direction === "down" ? "하락" : "횡보";

  // 화살표 애니메이션: scaleX로 width 확장
  const arrowWidth = interpolate(Math.min(1, arrowProgress), [0, 1], [0, 500]);
  const arrowOpacity = Math.min(1, arrowProgress);

  return (
    <div style={{
      width: "100%", height: "100%",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      padding: "50px 140px", gap: 32,
    }}>
      {/* 지표명 */}
      <div style={{
        fontSize: 36, fontWeight: 700, color: theme.tiffany,
        fontFamily: theme.font, textAlign: "center",
        opacity: Math.min(1, metricProgress),
        transform: `translateY(${interpolate(Math.min(1, metricProgress), [0, 1], [-20, 0])}px)`,
      }}>
        {data.metric}  ·  {data.period}
      </div>

      {/* 방향 뱃지 */}
      <div style={{
        background: `${dirColor}18`,
        border: `2px solid ${dirColor}60`,
        borderRadius: 50, padding: "12px 40px",
        fontSize: 36, fontWeight: 900, color: dirColor,
        fontFamily: theme.font,
        opacity: Math.min(1, arrowProgress),
        transform: `scale(${interpolate(Math.min(1, arrowProgress), [0, 1], [0.6, 1])})`,
        boxShadow: `0 0 ${20 + glowPulse * 16}px ${dirColor}30`,
      }}>
        {arrowSymbol} {dirLabel}
        {data.change && <span style={{ fontSize: 24, marginLeft: 16, fontWeight: 700 }}>{data.change}</span>}
      </div>

      {/* 화살표 진행 바 */}
      <div style={{ width: "100%", position: "relative", height: 56 }}>
        {/* 배경 선 */}
        <div style={{
          position: "absolute", top: "50%", left: 0, right: 0,
          height: 2, background: "rgba(255,255,255,0.08)",
          transform: "translateY(-50%)",
        }} />
        {/* 컬러 화살표 선 */}
        <div style={{
          position: "absolute", top: "50%", left: 0,
          height: 4, borderRadius: 2,
          background: `linear-gradient(to right, ${dirColor}40, ${dirColor})`,
          width: arrowWidth,
          transform: "translateY(-50%)",
          opacity: arrowOpacity,
          boxShadow: `0 0 ${10 + glowPulse * 8}px ${dirColor}60`,
        }} />
        {/* 화살촉 */}
        <div style={{
          position: "absolute", top: "50%",
          left: arrowWidth - 4,
          transform: "translate(-50%, -50%)",
          fontSize: 40, color: dirColor,
          lineHeight: 1,
          opacity: arrowOpacity,
          textShadow: `0 0 ${12 + glowPulse * 10}px ${dirColor}`,
        }}>
          {data.direction === "down" ? "▼" : data.direction === "sideways" ? "▶" : "▲"}
        </div>
      </div>

      {/* FROM → TO 값 */}
      <div style={{
        display: "flex", alignItems: "center", gap: 32,
        opacity: Math.min(1, valuesProgress),
        transform: `translateY(${interpolate(Math.min(1, valuesProgress), [0, 1], [20, 0])}px)`,
      }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 26, color: theme.grayLight, fontFamily: theme.font }}>시작</div>
          <div style={{ fontSize: 52, fontWeight: 900, color: "rgba(255,255,255,0.7)", fontFamily: theme.font }}>
            {data.from_value}
          </div>
        </div>
        <div style={{ fontSize: 48, color: dirColor, fontFamily: theme.font }}>→</div>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 26, color: theme.grayLight, fontFamily: theme.font }}>현재</div>
          <div style={{
            fontSize: 52, fontWeight: 900, color: dirColor, fontFamily: theme.font,
            textShadow: `0 0 ${20 + glowPulse * 15}px ${dirColor}50`,
          }}>
            {data.to_value}
          </div>
        </div>
      </div>

      {/* 인사이트 */}
      {data.insight && (
        <div style={{
          background: `${dirColor}0C`,
          border: `1px solid ${dirColor}30`,
          borderRadius: 16, padding: "16px 32px",
          fontSize: 24, color: theme.grayLight,
          fontFamily: theme.font, fontWeight: 500,
          textAlign: "center", lineHeight: 1.5,
          opacity: Math.min(1, insightProgress),
          transform: `translateY(${interpolate(Math.min(1, insightProgress), [0, 1], [20, 0])}px)`,
        }}>
          {data.insight}
        </div>
      )}
    </div>
  );
};
