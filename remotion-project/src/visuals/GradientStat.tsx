import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { theme } from "../styles/theme";

interface Props {
  data: { title: string; stats: Array<{ label: string; value: string; change?: string; icon?: string }> };
}

const GRADIENTS = [
  "linear-gradient(135deg, #81D8D020, #81D8D008)",
  "linear-gradient(135deg, #52D68A20, #52D68A08)",
  "linear-gradient(135deg, #C084FC20, #C084FC08)",
  "linear-gradient(135deg, #FFB34720, #FFB34708)",
];
const ACCENT_COLORS = ["#81D8D0", "#52D68A", "#C084FC", "#FFB347"];

export const GradientStat: React.FC<Props> = ({ data: props }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const titleOpacity = interpolate(frame, [0, 12], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const titleP = spring({ frame, fps, config: { damping: 100, stiffness: 25 } });

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", padding: "60px 100px" }}>
      <div style={{ fontSize: 40, fontWeight: 700, color: theme.gold, fontFamily: theme.font, textAlign: "center", marginBottom: 40, opacity: titleOpacity, transform: `translateY(${interpolate(titleP, [0, 1], [-16, 0])}px)` }}>
        {props.title}
      </div>

      <div style={{ flex: 1, display: "flex", gap: 20, alignItems: "center" }}>
        {props.stats.map((stat, i) => {
          const cardP = spring({ frame: frame - 8 - i * 8, fps, config: { damping: 100, stiffness: 10 } });
          const cardOpacity = interpolate(frame, [8 + i * 8, 20 + i * 8], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
          const accent = ACCENT_COLORS[i % ACCENT_COLORS.length];
          const changeColor = stat.change?.startsWith("+") ? theme.green : stat.change?.startsWith("-") ? theme.red : theme.gray;

          return (
            <div key={i} style={{
              flex: 1, padding: "40px 32px", borderRadius: 20,
              background: GRADIENTS[i % GRADIENTS.length],
              border: `1px solid ${accent}20`,
              display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16,
              opacity: cardOpacity, transform: `translateY(${interpolate(cardP, [0, 1], [30, 0])}px)`,
              minHeight: 280,
            }}>
              {stat.icon && <span style={{ fontSize: 44, fontFamily: theme.font }}>{stat.icon}</span>}
              <div style={{ fontSize: 18, color: theme.grayLight, fontFamily: theme.font, fontWeight: 600 }}>{stat.label}</div>
              <div style={{ fontSize: 48, fontWeight: 900, color: theme.white, fontFamily: theme.font }}>{stat.value}</div>
              {stat.change && (
                <div style={{ fontSize: 22, fontWeight: 700, color: changeColor, fontFamily: theme.font, padding: "4px 14px", background: `${changeColor}12`, borderRadius: 8 }}>
                  {stat.change}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
