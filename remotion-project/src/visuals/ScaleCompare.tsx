import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { theme } from "../styles/theme";

interface Props {
  data: { title: string; left: { label: string; value: string; amount: number; icon?: string }; right: { label: string; value: string; amount: number; icon?: string }; message?: string };
}

export const ScaleCompare: React.FC<Props> = ({ data }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const titleOpacity = interpolate(frame, [0, 12], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const titleP = spring({ frame, fps, config: { damping: 100, stiffness: 25 } });
  const leftP = spring({ frame: frame - 10, fps, config: { damping: 100, stiffness: 10 } });
  const leftOpacity = interpolate(frame, [10, 22], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const rightP = spring({ frame: frame - 20, fps, config: { damping: 100, stiffness: 10 } });
  const rightOpacity = interpolate(frame, [20, 32], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const msgOpacity = interpolate(frame, [30, 42], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const total = data.left.amount + data.right.amount;
  const leftPct = (data.left.amount / total) * 100;
  const rightPct = (data.right.amount / total) * 100;
  const bigger = data.left.amount >= data.right.amount ? "left" : "right";

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "70px 120px", gap: 30 }}>
      <div style={{ fontSize: 38, fontWeight: 700, color: theme.gold, fontFamily: theme.font, opacity: titleOpacity, transform: `translateY(${interpolate(titleP, [0, 1], [-16, 0])}px)` }}>
        {data.title}
      </div>

      <div style={{ display: "flex", alignItems: "flex-end", gap: 60, marginTop: 20 }}>
        {/* Left block */}
        <div style={{ textAlign: "center", opacity: leftOpacity, transform: `translateY(${interpolate(leftP, [0, 1], [20, 0])}px)` }}>
          {data.left.icon && <div style={{ fontSize: 40, fontFamily: theme.font, marginBottom: 12 }}>{data.left.icon}</div>}
          <div style={{
            width: Math.max(120, leftPct * 4), height: Math.max(80, leftPct * 3),
            background: bigger === "left" ? `${theme.tiffany}20` : "rgba(255,255,255,0.05)",
            border: `2px solid ${bigger === "left" ? theme.tiffany : "rgba(255,255,255,0.1)"}`,
            borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center",
            flexDirection: "column", gap: 8, padding: 20,
          }}>
            <div style={{ fontSize: bigger === "left" ? 40 : 28, fontWeight: 900, color: bigger === "left" ? theme.tiffany : theme.grayLight, fontFamily: theme.font }}>{data.left.value}</div>
          </div>
          <div style={{ fontSize: 22, fontWeight: 700, color: theme.white, fontFamily: theme.font, marginTop: 14 }}>{data.left.label}</div>
        </div>

        <div style={{ fontSize: 36, color: theme.gray, fontFamily: theme.font, marginBottom: 60 }}>vs</div>

        {/* Right block */}
        <div style={{ textAlign: "center", opacity: rightOpacity, transform: `translateY(${interpolate(rightP, [0, 1], [20, 0])}px)` }}>
          {data.right.icon && <div style={{ fontSize: 40, fontFamily: theme.font, marginBottom: 12 }}>{data.right.icon}</div>}
          <div style={{
            width: Math.max(120, rightPct * 4), height: Math.max(80, rightPct * 3),
            background: bigger === "right" ? `${theme.tiffany}20` : "rgba(255,255,255,0.05)",
            border: `2px solid ${bigger === "right" ? theme.tiffany : "rgba(255,255,255,0.1)"}`,
            borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center",
            flexDirection: "column", gap: 8, padding: 20,
          }}>
            <div style={{ fontSize: bigger === "right" ? 40 : 28, fontWeight: 900, color: bigger === "right" ? theme.tiffany : theme.grayLight, fontFamily: theme.font }}>{data.right.value}</div>
          </div>
          <div style={{ fontSize: 22, fontWeight: 700, color: theme.white, fontFamily: theme.font, marginTop: 14 }}>{data.right.label}</div>
        </div>
      </div>

      {data.message && (
        <div style={{ fontSize: 24, color: theme.tiffany, fontFamily: theme.font, textAlign: "center", fontWeight: 600, opacity: msgOpacity, marginTop: 10 }}>
          {data.message}
        </div>
      )}
    </div>
  );
};
