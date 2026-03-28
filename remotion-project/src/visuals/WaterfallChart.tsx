import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { theme } from "../styles/theme";

interface Props {
  data: { title: string; items: Array<{ label: string; value: number; type?: "increase" | "decrease" | "total" }>; unit?: string };
}

export const WaterfallChart: React.FC<Props> = ({ data: props }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { title, items, unit = "" } = props;
  const titleOpacity = interpolate(frame, [0, 12], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const titleP = spring({ frame, fps, config: { damping: 100, stiffness: 25 } });

  // Calculate running totals
  let running = 0;
  const bars = items.map((item) => {
    const type = item.type ?? (item.value >= 0 ? "increase" : "decrease");
    const start = type === "total" ? 0 : running;
    const end = type === "total" ? item.value : running + item.value;
    running = end;
    return { ...item, start, end, type };
  });

  const allVals = bars.flatMap((b) => [b.start, b.end]);
  const maxVal = Math.max(...allVals, 0);
  const minVal = Math.min(...allVals, 0);
  const range = maxVal - minVal || 1;
  const chartH = 500;

  const getY = (v: number) => 40 + ((maxVal - v) / range) * (chartH - 80);

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", padding: "60px 100px" }}>
      <div style={{ fontSize: 40, fontWeight: 700, color: theme.gold, fontFamily: theme.font, textAlign: "center", marginBottom: 40, opacity: titleOpacity, transform: `translateY(${interpolate(titleP, [0, 1], [-16, 0])}px)` }}>
        {title}
      </div>

      <div style={{ flex: 1, display: "flex", alignItems: "flex-end", gap: 12, position: "relative" }}>
        {/* Zero line */}
        <div style={{ position: "absolute", left: 0, right: 0, bottom: `${((0 - minVal) / range) * 100}%`, height: 1, background: "rgba(255,255,255,0.15)" }} />

        {bars.map((bar, i) => {
          const growP = spring({ frame: frame - 10 - i * 6, fps, config: { damping: 200, stiffness: 10 } });
          const labelOpacity = interpolate(frame, [10 + i * 6, 20 + i * 6], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
          const color = bar.type === "total" ? theme.tiffany : bar.type === "increase" ? theme.green : theme.red;
          const top = getY(Math.max(bar.start, bar.end));
          const bottom = getY(Math.min(bar.start, bar.end));
          const barH = (bottom - top) * Math.min(1, growP);

          return (
            <div key={i} style={{ flex: 1, height: chartH, position: "relative", display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div style={{
                position: "absolute", top, width: "70%", height: Math.max(barH, 2),
                background: `linear-gradient(to top, ${color}90, ${color})`,
                borderRadius: 4, opacity: labelOpacity,
              }} />
              <div style={{ position: "absolute", top: top - 28, fontSize: 20, fontWeight: 700, color, fontFamily: theme.font, opacity: labelOpacity }}>
                {bar.value > 0 ? "+" : ""}{bar.value}{unit}
              </div>
              <div style={{ position: "absolute", bottom: -35, fontSize: 16, color: theme.grayLight, fontFamily: theme.font, textAlign: "center", opacity: labelOpacity, whiteSpace: "nowrap" }}>
                {bar.label}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
