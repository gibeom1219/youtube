import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { theme } from "../styles/theme";
import { useSceneTheme } from "../contexts/SceneTheme";

interface Props {
  data: { title: string; level: 1 | 2 | 3 | 4 | 5; labels?: string[]; description: string };
}

const DEFAULT_LABELS = ["매우 낮음", "낮음", "보통", "높음", "매우 높음"];
const LEVEL_COLORS = ["#52D68A", "#A8E8E2", "#FFB347", "#FF8C42", "#FF6B6B"];

export const RiskScale: React.FC<Props> = ({ data }) => {
  const theme = useSceneTheme();
  const frame = useCurrentFrame();
  if (!data) return null;
  // items[] → description 변환
  if (!data.description && (data as any).items) {
    (data as any).description = ((data as any).items as any[]).map((it: any) => `${it.label}: ${it.description}`).join("  |  ");
  }
  const { fps } = useVideoConfig();
  const labels = data.labels ?? DEFAULT_LABELS;
  const titleOpacity = interpolate(frame, [0, 12], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const titleP = spring({ frame, fps, config: { damping: 100, stiffness: 25 } });
  const scaleOpacity = interpolate(frame, [10, 22], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const indicatorP = spring({ frame: frame - 20, fps, config: { damping: 100, stiffness: 10 } });
  const indicatorOpacity = interpolate(frame, [20, 32], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const descOpacity = interpolate(frame, [28, 40], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const pulse = (Math.sin(frame * 0.06) + 1) / 2;
  const activeColor = LEVEL_COLORS[data.level - 1];

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "80px 120px", gap: 40 }}>
      <div style={{ fontSize: 40, fontWeight: 700, color: theme.gold, fontFamily: theme.font, opacity: titleOpacity, transform: `translateY(${interpolate(titleP, [0, 1], [-16, 0])}px)` }}>
        {data.title}
      </div>

      <div style={{ display: "flex", gap: 12, width: "100%", maxWidth: 1200, opacity: scaleOpacity }}>
        {[1, 2, 3, 4, 5].map((lv) => {
          const isActive = lv <= data.level;
          const isCurrent = lv === data.level;
          const color = LEVEL_COLORS[lv - 1];
          return (
            <div key={lv} style={{
              flex: 1, height: 60, borderRadius: 10,
              background: isActive ? `${color}${isCurrent ? "cc" : "50"}` : "rgba(255,255,255,0.20)",
              border: isCurrent ? `2px solid ${color}` : "1px solid rgba(255,255,255,0.22)",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: isCurrent ? `0 0 ${15 + pulse * 15}px ${color}40` : "none",
              transition: "box-shadow 0s",
            }}>
              <span style={{ fontSize: 24, fontWeight: isCurrent ? 800 : 500, color: isActive ? theme.white : theme.gray, fontFamily: theme.font }}>
                {labels[lv - 1]}
              </span>
            </div>
          );
        })}
      </div>

      <div style={{
        opacity: indicatorOpacity, transform: `scale(${interpolate(indicatorP, [0, 1], [0.8, 1])})`,
        fontSize: 64, fontWeight: 900, color: activeColor, fontFamily: theme.font,
        textShadow: `0 0 ${20 + pulse * 20}px ${activeColor}50`,
      }}>
        Level {data.level}
      </div>

      <div style={{ fontSize: 26, color: theme.grayLight, fontFamily: theme.font, textAlign: "center", maxWidth: 900, lineHeight: 1.5, opacity: descOpacity }}>
        {data.description}
      </div>
    </div>
  );
};
