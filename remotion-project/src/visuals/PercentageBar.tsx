import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { theme } from "../styles/theme";
import { useSceneTheme } from "../contexts/SceneTheme";

interface BarItem {
  label: string;
  value: number;
  color?: string;
}

interface Props {
  data: {
    title: string;
    unit?: string;
    items: BarItem[];
  };
  durationFrames: number;
}

const DEFAULT_COLORS = [
  "#81D8D0", "#52D68A", "#FFB347", "#FF6B6B", "#C084FC", "#A8E8E2",
];

export const PercentageBar: React.FC<Props> = ({ data, durationFrames }) => {
  const theme = useSceneTheme();
  const frame = useCurrentFrame();
  if (!data) return null;
  const { fps } = useVideoConfig();

  const titleProgress = spring({ frame, fps, config: { damping: 100, stiffness: 10 } });
  const interval = Math.min((durationFrames * 0.65) / ((data.items ?? []).length + 1), 18);
  const unit = data.unit ?? "%";

  const maxValue = Math.max(...(data.items ?? []).map((d) => d.value));

  return (
    <div style={{
      width: "100%", height: "100%",
      display: "flex", flexDirection: "column",
      justifyContent: "center", padding: "60px 140px", gap: 0,
    }}>
      <div style={{
        fontSize: 44, fontWeight: 900, color: theme.white,
        fontFamily: theme.font, marginBottom: 44,
        opacity: Math.min(1, titleProgress),
        transform: `translateY(${interpolate(Math.min(1, titleProgress), [0, 1], [-20, 0])}px)`,
      }}>
        {data.title}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        {(data.items ?? []).map((item, i) => {
          const startFrame = Math.round(interval * (i + 1));
          const p = spring({ frame: frame - startFrame, fps, config: { damping: 100, stiffness: 10 } });
          const barP = spring({ frame: frame - startFrame - 4, fps, config: { damping: 80, stiffness: 5 } });

          const color = item.color ?? DEFAULT_COLORS[i % DEFAULT_COLORS.length];
          const barWidth = interpolate(Math.min(1, barP), [0, 1], [0, (item.value / maxValue) * 100]);

          const settled = Math.max(0, frame - (startFrame + 30));
          const pulse = (Math.sin(settled * 0.04 + i * 1.2) + 1) / 2;

          const isTop = item.value === maxValue;

          return (
            <div key={i} style={{
              display: "flex", flexDirection: "column", gap: 8,
              opacity: Math.min(1, p),
              transform: `translateX(${interpolate(Math.min(1, p), [0, 1], [-40, 0])}px)`,
            }}>
              {/* 레이블 + 값 */}
              <div style={{
                display: "flex", justifyContent: "space-between", alignItems: "baseline",
              }}>
                <div style={{
                  fontSize: isTop ? 30 : 26, fontWeight: isTop ? 800 : 600,
                  color: isTop ? theme.white : theme.grayLight,
                  fontFamily: theme.font,
                }}>
                  {item.label}
                </div>
                <div style={{
                  fontSize: isTop ? 36 : 30, fontWeight: 900,
                  color: isTop ? color : theme.white,
                  fontFamily: theme.font,
                }}>
                  {item.value}{unit}
                </div>
              </div>

              {/* 막대 */}
              <div style={{
                width: "100%", height: isTop ? 20 : 14,
                background: "rgba(255,255,255,0.20)",
                borderRadius: 10, overflow: "hidden",
              }}>
                <div style={{
                  width: `${barWidth}%`, height: "100%",
                  background: `linear-gradient(90deg, ${color}90, ${color})`,
                  borderRadius: 10,
                  boxShadow: isTop ? `0 0 ${8 + pulse * 10}px ${color}60` : "none",
                }} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
