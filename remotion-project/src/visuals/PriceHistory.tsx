import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { theme } from "../styles/theme";

interface HistoryPoint {
  date: string;
  price: string;
  change?: string;
  event?: string;
}

interface Props {
  data: {
    asset: string;
    unit?: string;
    history: HistoryPoint[];
    trend?: "up" | "down" | "mixed";
  };
}

export const PriceHistory: React.FC<Props> = ({ data }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleProgress = spring({ frame, fps, config: { damping: 100, stiffness: 10 } });
  const glowPulse = (Math.sin(frame * 0.04) + 1) / 2;

  const trendColor = data.trend === "up" ? "#52D68A"
                   : data.trend === "down" ? "#FF6B6B"
                   : theme.tiffany;

  return (
    <div style={{
      width: "100%", height: "100%",
      display: "flex", flexDirection: "column",
      justifyContent: "center", padding: "50px 120px", gap: 28,
    }}>
      {/* 자산명 */}
      <div style={{
        fontSize: 38, fontWeight: 900, color: theme.white,
        fontFamily: theme.font, textAlign: "center",
        opacity: Math.min(1, titleProgress),
        transform: `translateY(${interpolate(Math.min(1, titleProgress), [0, 1], [-20, 0])}px)`,
      }}>
        {data.asset}
        {data.unit && (
          <span style={{ fontSize: 22, color: theme.grayLight, marginLeft: 12, fontWeight: 500 }}>
            ({data.unit})
          </span>
        )}
      </div>

      {/* 히스토리 타임라인 */}
      <div style={{
        display: "flex", flexDirection: "column", gap: 0,
        position: "relative",
      }}>
        {/* 왼쪽 세로 선 */}
        <div style={{
          position: "absolute", left: 19, top: 20, bottom: 20, width: 2,
          background: `linear-gradient(to bottom, ${trendColor}60, ${trendColor}10)`,
        }} />

        {data.history.map((point, i) => {
          const p = spring({
            frame: frame - 8 - i * 12,
            fps, config: { damping: 100, stiffness: 5 },
          });
          const isLast = i === data.history.length - 1;
          const changeColor = point.change
            ? (point.change.startsWith("+") ? "#52D68A" : point.change.startsWith("-") ? "#FF6B6B" : theme.grayLight)
            : theme.grayLight;

          return (
            <div key={i} style={{
              display: "flex", alignItems: "flex-start", gap: 24,
              padding: "12px 0",
              opacity: Math.min(1, p),
              transform: `translateX(${interpolate(Math.min(1, p), [0, 1], [-40, 0])}px)`,
            }}>
              {/* 점 */}
              <div style={{
                width: 14, height: 14, borderRadius: "50%",
                background: isLast ? trendColor : `${trendColor}80`,
                border: `2px solid ${isLast ? trendColor : `${trendColor}50`}`,
                flexShrink: 0, marginTop: 10, zIndex: 1,
                boxShadow: isLast ? `0 0 ${8 + glowPulse * 8}px ${trendColor}` : "none",
                marginLeft: 13,
              }} />

              {/* 내용 */}
              <div style={{
                flex: 1,
                background: isLast ? `${trendColor}10` : "rgba(255,255,255,0.03)",
                border: `1px solid ${isLast ? `${trendColor}40` : "rgba(255,255,255,0.08)"}`,
                borderRadius: 14, padding: "14px 24px",
                display: "flex", alignItems: "center",
                justifyContent: "space-between",
              }}>
                <div>
                  <div style={{
                    fontSize: 18, color: theme.grayLight,
                    fontFamily: theme.font, marginBottom: 4,
                  }}>
                    {point.date}
                  </div>
                  {point.event && (
                    <div style={{
                      fontSize: 18, color: theme.grayLight,
                      fontFamily: theme.font, fontStyle: "italic",
                    }}>
                      {point.event}
                    </div>
                  )}
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{
                    fontSize: isLast ? 32 : 26, fontWeight: 900,
                    color: isLast ? trendColor : theme.white,
                    fontFamily: theme.font,
                  }}>
                    {point.price}
                  </div>
                  {point.change && (
                    <div style={{
                      fontSize: 18, fontWeight: 700, color: changeColor,
                      fontFamily: theme.font,
                    }}>
                      {point.change}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
