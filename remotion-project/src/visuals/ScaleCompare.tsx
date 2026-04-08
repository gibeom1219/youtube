import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { theme } from "../styles/theme";
import { useSceneTheme } from "../contexts/SceneTheme";

interface Props {
  data: { title: string; left: { label: string; value: string; amount: number; icon?: string }; right: { label: string; value: string; amount: number; icon?: string }; message?: string };
}

export const ScaleCompare: React.FC<Props> = ({ data }) => {
  const theme = useSceneTheme();
  const frame = useCurrentFrame();
  if (!data) return null;
  const { fps } = useVideoConfig();

  // items[] 형태도 수용
  const items = (data as any).items;
  const left = data.left ?? (items?.[0] ? { label: items[0].label, value: items[0].value, amount: items[0].scale ?? 1 } : { label: "", value: "", amount: 1 });
  const right = data.right ?? (items?.[1] ? { label: items[1].label, value: items[1].value, amount: items[1].scale ?? 1 } : { label: "", value: "", amount: 1 });

  const titleOpacity = interpolate(frame, [0, 12], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const titleP = spring({ frame, fps, config: { damping: 100, stiffness: 25 } });
  const leftP = spring({ frame: frame - 10, fps, config: { damping: 100, stiffness: 10 } });
  const leftOpacity = interpolate(frame, [10, 22], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const rightP = spring({ frame: frame - 20, fps, config: { damping: 100, stiffness: 10 } });
  const rightOpacity = interpolate(frame, [20, 32], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const msgOpacity = interpolate(frame, [30, 42], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const bigger = (left.amount ?? 0) >= (right.amount ?? 0) ? "left" : "right";

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "70px 100px", gap: 24 }}>
      <div style={{ fontSize: 48, fontWeight: 700, color: theme.gold, fontFamily: theme.font, textShadow: theme.textShadow.medium, opacity: titleOpacity, transform: `translateY(${interpolate(titleP, [0, 1], [-16, 0])}px)` }}>
        {data.title}
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 50, marginTop: 10 }}>
        {/* Left block */}
        <div style={{ textAlign: "center", opacity: leftOpacity, transform: `translateY(${interpolate(leftP, [0, 1], [20, 0])}px)` }}>
          <div style={{
            minWidth: 340, minHeight: 220, padding: "36px 44px",
            background: bigger === "left" ? `${theme.tiffany}30` : "rgba(255,255,255,0.20)",
            border: `2px solid ${bigger === "left" ? theme.tiffany + "50" : "rgba(255,255,255,0.1)"}`,
            borderRadius: 20, display: "flex", alignItems: "center", justifyContent: "center",
            flexDirection: "column", gap: 14,
          }}>
            {left.icon && <div style={{ fontSize: 60, fontFamily: theme.font }}>{left.icon}</div>}
            <div style={{ fontSize: 44, fontWeight: 900, color: bigger === "left" ? theme.tiffany : theme.grayLight, fontFamily: theme.font, textAlign: "center", lineHeight: 1.3, textShadow: theme.textShadow.strong }}>{left.value}</div>
          </div>
          <div style={{ fontSize: 30, fontWeight: 700, color: theme.white, fontFamily: theme.font, marginTop: 16, textShadow: theme.textShadow.medium }}>{left.label}</div>
        </div>

        <div style={{ fontSize: 48, color: theme.gray, fontFamily: theme.font, fontWeight: 700 }}>vs</div>

        {/* Right block */}
        <div style={{ textAlign: "center", opacity: rightOpacity, transform: `translateY(${interpolate(rightP, [0, 1], [20, 0])}px)` }}>
          <div style={{
            minWidth: 340, minHeight: 220, padding: "36px 44px",
            background: bigger === "right" ? `${theme.tiffany}30` : "rgba(255,255,255,0.20)",
            border: `2px solid ${bigger === "right" ? theme.tiffany + "50" : "rgba(255,255,255,0.1)"}`,
            borderRadius: 20, display: "flex", alignItems: "center", justifyContent: "center",
            flexDirection: "column", gap: 14,
          }}>
            {right.icon && <div style={{ fontSize: 60, fontFamily: theme.font }}>{right.icon}</div>}
            <div style={{ fontSize: 44, fontWeight: 900, color: bigger === "right" ? theme.tiffany : theme.grayLight, fontFamily: theme.font, textAlign: "center", lineHeight: 1.3, textShadow: theme.textShadow.strong }}>{right.value}</div>
          </div>
          <div style={{ fontSize: 30, fontWeight: 700, color: theme.white, fontFamily: theme.font, marginTop: 16, textShadow: theme.textShadow.medium }}>{right.label}</div>
        </div>
      </div>

      {data.message && (
        <div style={{ fontSize: 30, color: theme.tiffany, fontFamily: theme.font, textAlign: "center", fontWeight: 600, opacity: msgOpacity, maxWidth: 1000, textShadow: theme.textShadow.medium }}>
          {data.message}
        </div>
      )}
    </div>
  );
};
