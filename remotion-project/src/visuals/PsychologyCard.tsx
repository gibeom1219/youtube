import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { theme } from "../styles/theme";

interface Props {
  data: { title: string; bias: string; description: string; example: string; solution: string; icon?: string };
}

export const PsychologyCard: React.FC<Props> = ({ data }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const titleOpacity = interpolate(frame, [0, 12], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const titleP = spring({ frame, fps, config: { damping: 100, stiffness: 25 } });
  const biasP = spring({ frame: frame - 10, fps, config: { damping: 100, stiffness: 10 } });
  const biasOpacity = interpolate(frame, [10, 22], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const descOpacity = interpolate(frame, [18, 30], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const exOpacity = interpolate(frame, [26, 38], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const solOpacity = interpolate(frame, [34, 46], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "70px 120px", gap: 24 }}>
      <div style={{ fontSize: 38, fontWeight: 700, color: theme.gold, fontFamily: theme.font, opacity: titleOpacity, transform: `translateY(${interpolate(titleP, [0, 1], [-16, 0])}px)` }}>
        {data.title}
      </div>

      {/* Bias name */}
      <div style={{
        display: "flex", alignItems: "center", gap: 16,
        opacity: biasOpacity, transform: `scale(${interpolate(biasP, [0, 1], [0.85, 1])})`,
      }}>
        {data.icon && <span style={{ fontSize: 56, fontFamily: theme.font }}>{data.icon}</span>}
        <span style={{ fontSize: 44, fontWeight: 900, color: theme.white, fontFamily: theme.font }}>{data.bias}</span>
      </div>

      {/* Description */}
      <div style={{
        fontSize: 24, color: theme.grayLight, fontFamily: theme.font, textAlign: "center",
        maxWidth: 900, lineHeight: 1.5, opacity: descOpacity,
      }}>
        {data.description}
      </div>

      {/* Example */}
      <div style={{
        padding: "20px 32px", borderRadius: 14,
        background: `${theme.red}08`, borderLeft: `4px solid ${theme.red}60`,
        maxWidth: 900, width: "100%", opacity: exOpacity,
      }}>
        <div style={{ fontSize: 22, color: theme.red, fontFamily: theme.font, fontWeight: 700, marginBottom: 8 }}>❌ 이런 실수를 합니다</div>
        <div style={{ fontSize: 28, color: theme.white, fontFamily: theme.font, lineHeight: 1.5 }}>{data.example}</div>
      </div>

      {/* Solution */}
      <div style={{
        padding: "20px 32px", borderRadius: 14,
        background: `${theme.green}08`, borderLeft: `4px solid ${theme.green}60`,
        maxWidth: 900, width: "100%", opacity: solOpacity,
      }}>
        <div style={{ fontSize: 22, color: theme.green, fontFamily: theme.font, fontWeight: 700, marginBottom: 8 }}>✅ 이렇게 역이용하세요</div>
        <div style={{ fontSize: 28, color: theme.white, fontFamily: theme.font, lineHeight: 1.5 }}>{data.solution}</div>
      </div>
    </div>
  );
};
