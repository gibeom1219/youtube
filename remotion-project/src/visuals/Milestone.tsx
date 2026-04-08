import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { theme } from "../styles/theme";
import { useSceneTheme } from "../contexts/SceneTheme";

interface Props {
  data: { title: string; current: number; target: number; unit: string; label: string; icon?: string };
}

export const Milestone: React.FC<Props> = ({ data }) => {
  const theme = useSceneTheme();
  const frame = useCurrentFrame();
  if (!data) return null;
  const { fps } = useVideoConfig();
  const pct = Math.min((data.current / data.target) * 100, 100);
  const titleOpacity = interpolate(frame, [0, 12], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const titleP = spring({ frame, fps, config: { damping: 100, stiffness: 25 } });
  const barP = interpolate(frame, [14, 60], [0, pct], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const barOpacity = interpolate(frame, [10, 20], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const numOpacity = interpolate(frame, [20, 32], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const color = pct >= 100 ? theme.green : pct >= 70 ? theme.tiffany : pct >= 40 ? "#FFB347" : theme.red;
  const pulse = pct >= 100 ? (Math.sin(frame * 0.06) + 1) / 2 : 0;

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "80px 120px", gap: 30 }}>
      {data.icon && <div style={{ fontSize: 64, fontFamily: theme.font, opacity: titleOpacity }}>{data.icon}</div>}
      <div style={{ fontSize: 38, fontWeight: 700, color: theme.gold, fontFamily: theme.font, opacity: titleOpacity, transform: `translateY(${interpolate(titleP, [0, 1], [-16, 0])}px)` }}>
        {data.title}
      </div>

      <div style={{ display: "flex", alignItems: "baseline", gap: 12, opacity: numOpacity }}>
        <span style={{ fontSize: 80, fontWeight: 900, color: theme.white, fontFamily: theme.font }}>{data.current.toLocaleString()}</span>
        <span style={{ fontSize: 36, color: theme.gray, fontFamily: theme.font }}>/ {data.target.toLocaleString()}</span>
        <span style={{ fontSize: 32, color: theme.grayLight, fontFamily: theme.font }}>{data.unit}</span>
      </div>

      {/* Progress bar */}
      <div style={{ width: "100%", maxWidth: 1000, height: 32, background: "rgba(255,255,255,0.20)", borderRadius: 16, overflow: "hidden", opacity: barOpacity }}>
        <div style={{
          width: `${barP}%`, height: "100%",
          background: `linear-gradient(90deg, ${color}80, ${color})`,
          borderRadius: 16, boxShadow: `0 0 ${10 + pulse * 15}px ${color}50`,
          transition: "box-shadow 0s",
        }} />
      </div>

      <div style={{ fontSize: 28, fontWeight: 800, color, fontFamily: theme.font, opacity: numOpacity }}>
        {barP.toFixed(1)}% 달성
      </div>
      <div style={{ fontSize: 28, color: theme.grayLight, fontFamily: theme.font, opacity: numOpacity }}>{data.label}</div>
    </div>
  );
};
