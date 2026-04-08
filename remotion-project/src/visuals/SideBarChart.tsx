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

export const SideBarChart: React.FC<Props> = ({ data }) => {
  const theme = useSceneTheme();
  const frame = useCurrentFrame();
  if (!data) return null;
  // items → bars 호환
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
        position: "absolute", top: 140, bottom: 200,
        ...contentStyle,
        width: 780,
        display: "flex", flexDirection: "column",
        zIndex: 3,
      }}>
        <div style={{
          fontSize: 48, fontWeight: 900, color: "#000",
          fontFamily: theme.font, marginBottom: 6,
          opacity: titleOpacity, letterSpacing: -1,
        }}>
          {data.title}
        </div>
        {data.subtitle && (
          <div style={{
            fontSize: 26, fontWeight: 600, color: "#666",
            fontFamily: theme.font, marginBottom: 24, opacity: titleOpacity,
          }}>
            {data.subtitle}
          </div>
        )}

        <div style={{
          width: 60, height: 3, background: "#e67e22",
          borderRadius: 2, marginBottom: 28,
          opacity: interpolate(frame, [10, 18], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
        }} />

        {/* 가로 막대들 */}
        <div style={{
          flex: 1, display: "flex", flexDirection: "column",
          gap: 16, justifyContent: "flex-start",
        }}>
          {(data.bars ?? []).map((bar, i) => {
            const delay = 12 + i * 6;
            const barOpacity = interpolate(frame, [delay, delay + 8], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
            const barWidth = interpolate(frame, [delay, delay + 16], [0, (bar.value / maxVal) * 100], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
            const barColor = bar.color ?? "#e67e22";

            return (
              <div key={i} style={{ opacity: barOpacity }}>
                {/* 라벨 + 값 */}
                <div style={{
                  display: "flex", justifyContent: "space-between",
                  marginBottom: 6,
                }}>
                  <span style={{
                    fontSize: 32, fontWeight: 700, color: "#111",
                    fontFamily: theme.font,
                  }}>
                    {bar.label}
                  </span>
                  <span style={{
                    fontSize: 32, fontWeight: 900, color: barColor,
                    fontFamily: theme.font,
                  }}>
                    {bar.value}{unit}
                  </span>
                </div>
                {/* 바 */}
                <div style={{
                  height: 28, borderRadius: 6,
                  background: "rgba(0,0,0,0.06)",
                  overflow: "hidden",
                }}>
                  <div style={{
                    width: `${barWidth}%`, height: "100%",
                    borderRadius: 6,
                    background: `linear-gradient(90deg, ${barColor}, ${barColor}cc)`,
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
