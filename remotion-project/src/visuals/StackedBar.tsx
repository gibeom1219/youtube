import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { theme } from "../styles/theme";

const COLORS = ["#81D8D0", "#52D68A", "#FFB347", "#FF6B6B", "#C084FC", "#4FA8A0"];

interface Props {
  data: { title: string; categories: string[]; data: Array<{ label: string; values: number[] }> };
}

export const StackedBar: React.FC<Props> = ({ data: props }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const { title, categories, data } = props;
  const maxTotal = Math.max(...data.map((d) => d.values.reduce((a, b) => a + b, 0)));

  const titleOpacity = interpolate(frame, [0, 12], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const titleP = spring({ frame, fps, config: { damping: 100, stiffness: 25 } });

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", padding: "60px 120px 80px" }}>
      <div style={{
        fontSize: 40, fontWeight: 700, color: theme.gold, fontFamily: theme.font,
        textAlign: "center", marginBottom: 30, opacity: titleOpacity,
        transform: `translateY(${interpolate(titleP, [0, 1], [-16, 0])}px)`,
      }}>
        {title}
      </div>

      {/* Legend */}
      <div style={{ display: "flex", gap: 24, justifyContent: "center", marginBottom: 40 }}>
        {categories.map((cat, i) => {
          const legOpacity = interpolate(frame, [6 + i * 3, 14 + i * 3], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
          return (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, opacity: legOpacity }}>
              <div style={{ width: 16, height: 16, borderRadius: 4, background: COLORS[i % COLORS.length] }} />
              <span style={{ fontSize: 24, color: theme.grayLight, fontFamily: theme.font }}>{cat}</span>
            </div>
          );
        })}
      </div>

      {/* Bars */}
      <div style={{ flex: 1, display: "flex", alignItems: "flex-end", gap: 24 }}>
        {data.map((bar, i) => {
          const growP = spring({ frame: frame - 12 - i * 6, fps, config: { damping: 200, stiffness: 10 } });
          const total = bar.values.reduce((a, b) => a + b, 0);
          const heightPct = (total / maxTotal) * 100 * Math.min(1, growP);
          const labelOpacity = interpolate(frame, [12 + i * 6, 22 + i * 6], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

          return (
            <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", height: "100%", justifyContent: "flex-end" }}>
              {/* Value label */}
              <div style={{ fontSize: 28, fontWeight: 700, color: theme.white, fontFamily: theme.font, marginBottom: 8, opacity: labelOpacity }}>
                {total}
              </div>
              {/* Stacked segments */}
              <div style={{ width: "100%", height: `${heightPct}%`, minHeight: growP > 0.01 ? 4 : 0, borderRadius: "8px 8px 0 0", overflow: "hidden", display: "flex", flexDirection: "column-reverse" }}>
                {bar.values.map((val, j) => {
                  const segPct = total > 0 ? (val / total) * 100 : 0;
                  return (
                    <div key={j} style={{ width: "100%", height: `${segPct}%`, background: COLORS[j % COLORS.length], minHeight: val > 0 ? 2 : 0 }} />
                  );
                })}
              </div>
              {/* Label */}
              <div style={{ fontSize: 24, color: theme.grayLight, fontFamily: theme.font, fontWeight: 600, marginTop: 14, textAlign: "center", opacity: labelOpacity }}>
                {bar.label}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
