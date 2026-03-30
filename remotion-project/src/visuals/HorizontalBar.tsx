import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { theme } from "../styles/theme";

const COLORS = ["#81D8D0", "#52D68A", "#A8E8E2", "#FFB347", "#C084FC", "#4FA8A0", "#FF6B6B"];

interface Props {
  data: { title: string; unit?: string; items: Array<{ label: string; value: number }> };
}

export const HorizontalBar: React.FC<Props> = ({ data: props }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { title, unit = "", items } = props;
  const maxVal = Math.max(...items.map((d) => d.value));
  const titleOpacity = interpolate(frame, [0, 12], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const titleP = spring({ frame, fps, config: { damping: 100, stiffness: 25 } });

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: "60px 120px" }}>
      <div style={{ fontSize: 40, fontWeight: 700, color: theme.gold, fontFamily: theme.font, textAlign: "center", marginBottom: 40, opacity: titleOpacity, transform: `translateY(${interpolate(titleP, [0, 1], [-16, 0])}px)` }}>
        {title}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
        {items.map((item, i) => {
          const growP = spring({ frame: frame - 10 - i * 5, fps, config: { damping: 200, stiffness: 10 } });
          const rowOpacity = interpolate(frame, [10 + i * 5, 20 + i * 5], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
          const barW = (item.value / maxVal) * 100 * Math.min(1, growP);
          const color = COLORS[i % COLORS.length];

          return (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 16, opacity: rowOpacity }}>
              <div style={{ width: 300, fontSize: 26, fontWeight: 600, color: theme.white, fontFamily: theme.font, textAlign: "right", flexShrink: 0, whiteSpace: "nowrap" }}>
                {item.label}
              </div>
              <div style={{ flex: 1, height: 36, background: "rgba(255,255,255,0.04)", borderRadius: 8, overflow: "hidden" }}>
                <div style={{
                  width: `${barW}%`, height: "100%",
                  background: `linear-gradient(90deg, ${color}80, ${color})`,
                  borderRadius: 8, minWidth: growP > 0.01 ? 4 : 0,
                }} />
              </div>
              <div style={{ width: 140, fontSize: 24, fontWeight: 800, color, fontFamily: theme.font, textAlign: "right", flexShrink: 0, whiteSpace: "nowrap" }}>
                {item.value}{unit}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
