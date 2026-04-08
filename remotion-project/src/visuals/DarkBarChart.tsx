import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { useSceneTheme } from "../contexts/SceneTheme";

interface Props {
  data: {
    title: string;
    subtitle?: string;
    side?: "left" | "right";
    bars: Array<{
      label: string;
      value: number;
      color?: string;
    }>;
    unit?: string;
  };
}

export const DarkBarChart: React.FC<Props> = ({ data }) => {
  const theme = useSceneTheme();
  const frame = useCurrentFrame();
  if (!data) return null;
  if (!data.bars && (data as any).items) {
    (data as any).bars = (data as any).items;
  }
  const side = data.side ?? "left";
  const isLeft = side === "left";

  const titleOpacity = interpolate(frame, [0, 14], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const maxVal = Math.max(...(data.bars ?? []).map(b => b.value));
  const unit = data.unit ?? "";

  const contentStyle = isLeft
    ? { left: 140, right: "auto" as const }
    : { right: 140, left: "auto" as const };

  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      <div style={{
        position: "absolute", top: 0, bottom: 0,
        ...contentStyle,
        width: 780,
        display: "flex", flexDirection: "column",
        justifyContent: "center",
        zIndex: 3,
      }}>
        <div style={{
          fontSize: 48, fontWeight: 900, color: "#fff",
          fontFamily: theme.font, marginBottom: 6,
          opacity: titleOpacity, letterSpacing: -1,
        }}>
          {data.title}
        </div>
        {data.subtitle && (
          <div style={{
            fontSize: 26, fontWeight: 600, color: "rgba(255,255,255,0.5)",
            fontFamily: theme.font, marginBottom: 24, opacity: titleOpacity,
          }}>
            {data.subtitle}
          </div>
        )}

        <div style={{
          width: 60, height: 3, background: "#81D8D0",
          borderRadius: 2, marginBottom: 28,
          opacity: interpolate(frame, [10, 18], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
        }} />

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {(data.bars ?? []).map((bar, i) => {
            const delay = 12 + i * 6;
            const barOpacity = interpolate(frame, [delay, delay + 8], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
            const barWidth = interpolate(frame, [delay, delay + 16], [0, (bar.value / maxVal) * 100], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
            const barColor = bar.color ?? "#81D8D0";

            return (
              <div key={i} style={{ opacity: barOpacity }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                  <span style={{ fontSize: 26, fontWeight: 700, color: "rgba(255,255,255,0.9)", fontFamily: theme.font }}>
                    {bar.label}
                  </span>
                  <span style={{ fontSize: 26, fontWeight: 900, color: barColor, fontFamily: theme.font }}>
                    {bar.value}{unit}
                  </span>
                </div>
                <div style={{ height: 28, borderRadius: 6, background: "rgba(255,255,255,0.08)", overflow: "hidden" }}>
                  <div style={{
                    width: `${barWidth}%`, height: "100%", borderRadius: 6,
                    background: `linear-gradient(90deg, ${barColor}, ${barColor}aa)`,
                  }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
