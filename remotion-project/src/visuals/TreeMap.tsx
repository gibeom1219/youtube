import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { theme } from "../styles/theme";
import { useSceneTheme } from "../contexts/SceneTheme";

const COLORS = ["#81D8D0", "#52D68A", "#A8E8E2", "#4FA8A0", "#FFB347", "#C084FC", "#FF6B6B", "#6BB5FF"];

interface Props {
  data: { title: string; items: Array<{ label: string; value: number; display?: string }> };
}

export const TreeMap: React.FC<Props> = ({ data: props }) => {
  const theme = useSceneTheme();
  const frame = useCurrentFrame();
  if (!props) return null;
  const { fps } = useVideoConfig();
  const { title, items } = props;
  const total = items.reduce((a, b) => a + b.value, 0);
  const titleOpacity = interpolate(frame, [0, 12], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const titleP = spring({ frame, fps, config: { damping: 100, stiffness: 25 } });

  // Simple treemap layout: rows
  const sorted = [...items].sort((a, b) => b.value - a.value);

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", padding: "60px 100px" }}>
      <div style={{ fontSize: 40, fontWeight: 700, color: theme.gold, fontFamily: theme.font, textAlign: "center", marginBottom: 40, opacity: titleOpacity, transform: `translateY(${interpolate(titleP, [0, 1], [-16, 0])}px)` }}>
        {title}
      </div>
      <div style={{ flex: 1, display: "flex", flexWrap: "wrap", gap: 6, alignContent: "flex-start" }}>
        {sorted.map((item, i) => {
          const pct = (item.value / total) * 100;
          const cellP = spring({ frame: frame - 8 - i * 4, fps, config: { damping: 100, stiffness: 10 } });
          const cellOpacity = interpolate(frame, [8 + i * 4, 18 + i * 4], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
          const color = COLORS[i % COLORS.length];
          const minW = Math.max(pct * 1.6, 12);
          return (
            <div key={i} style={{
              width: `calc(${minW}% - 6px)`, minHeight: pct > 15 ? 200 : pct > 8 ? 140 : 100,
              background: `${color}18`, border: `1px solid ${color}35`, borderRadius: 12,
              display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
              padding: 16, opacity: cellOpacity, transform: `scale(${interpolate(cellP, [0, 1], [0.85, 1])})`,
              gap: 8,
            }}>
              <div style={{ fontSize: pct > 15 ? 32 : 22, fontWeight: 900, color, fontFamily: theme.font }}>
                {item.display ?? `${pct.toFixed(1)}%`}
              </div>
              <div style={{ fontSize: pct > 15 ? 22 : 17, fontWeight: 600, color: theme.white, fontFamily: theme.font, textAlign: "center" }}>
                {item.label}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
