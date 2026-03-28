import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { theme } from "../styles/theme";

interface Props {
  data: { title: string; items: Array<{ label: string; value: string; change: number }> };
}

export const HeatMap: React.FC<Props> = ({ data: props }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const { title, items } = props;
  const cols = items.length <= 6 ? 3 : 4;

  const titleOpacity = interpolate(frame, [0, 12], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const titleP = spring({ frame, fps, config: { damping: 100, stiffness: 25 } });

  const getCellColor = (change: number) => {
    if (change >= 3) return "rgba(82,214,138,0.35)";
    if (change >= 1) return "rgba(82,214,138,0.2)";
    if (change > 0) return "rgba(82,214,138,0.1)";
    if (change === 0) return "rgba(255,255,255,0.05)";
    if (change > -1) return "rgba(255,107,107,0.1)";
    if (change > -3) return "rgba(255,107,107,0.2)";
    return "rgba(255,107,107,0.35)";
  };

  const getTextColor = (change: number) => {
    if (change > 0) return theme.green;
    if (change < 0) return theme.red;
    return theme.gray;
  };

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", padding: "70px 100px", alignItems: "center" }}>
      <div style={{
        fontSize: 40, fontWeight: 700, color: theme.gold, fontFamily: theme.font,
        textAlign: "center", marginBottom: 50, opacity: titleOpacity,
        transform: `translateY(${interpolate(titleP, [0, 1], [-16, 0])}px)`,
      }}>
        {title}
      </div>

      <div style={{
        display: "flex", flexWrap: "wrap", gap: 16, justifyContent: "center",
        maxWidth: 1500, width: "100%",
      }}>
        {items.map((item, i) => {
          const cellP = spring({ frame: frame - 8 - i * 4, fps, config: { damping: 100, stiffness: 10 } });
          const cellOpacity = interpolate(frame, [8 + i * 4, 18 + i * 4], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

          return (
            <div key={i} style={{
              width: `calc(${100 / cols}% - 16px)`, minWidth: 200,
              padding: "28px 24px", borderRadius: 12,
              background: getCellColor(item.change),
              border: `1px solid rgba(129,216,208,0.1)`,
              opacity: cellOpacity,
              transform: `scale(${interpolate(cellP, [0, 1], [0.9, 1])})`,
              display: "flex", flexDirection: "column", gap: 8,
            }}>
              <div style={{ fontSize: 22, fontWeight: 700, color: theme.white, fontFamily: theme.font }}>
                {item.label}
              </div>
              <div style={{ fontSize: 28, fontWeight: 900, color: getTextColor(item.change), fontFamily: theme.font }}>
                {item.change > 0 ? "+" : ""}{item.change}%
              </div>
              <div style={{ fontSize: 18, color: theme.grayLight, fontFamily: theme.font }}>
                {item.value}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
