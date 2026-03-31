import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { theme } from "../styles/theme";

interface Props {
  data: { title?: string; bias: string; description: string; example: string; solution?: string; tip?: string; icon?: string };
}

export const PsychologyCard: React.FC<Props> = ({ data }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const title = data.title ?? "투자 심리 편향";
  const solution = data.solution ?? data.tip ?? "";
  const titleOpacity = interpolate(frame, [0, 12], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const titleP = spring({ frame, fps, config: { damping: 100, stiffness: 25 } });
  const biasP = spring({ frame: frame - 10, fps, config: { damping: 100, stiffness: 10 } });
  const biasOpacity = interpolate(frame, [10, 22], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const descOpacity = interpolate(frame, [18, 30], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const exOpacity = interpolate(frame, [26, 38], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const solOpacity = interpolate(frame, [34, 46], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "60px 80px", gap: 24 }}>
      <div style={{ fontSize: 42, fontWeight: 700, color: theme.gold, fontFamily: theme.font, opacity: titleOpacity, transform: `translateY(${interpolate(titleP, [0, 1], [-16, 0])}px)` }}>
        {title}
      </div>

      {/* Bias name */}
      <div style={{
        display: "flex", alignItems: "center", gap: 16,
        opacity: biasOpacity, transform: `scale(${interpolate(biasP, [0, 1], [0.85, 1])})`,
      }}>
        {data.icon && <span style={{ fontSize: 64, fontFamily: theme.font }}>{data.icon}</span>}
        <span style={{ fontSize: 52, fontWeight: 900, color: theme.white, fontFamily: theme.font }}>{data.bias}</span>
      </div>

      {/* Description */}
      <div style={{
        fontSize: 30, color: theme.grayLight, fontFamily: theme.font, textAlign: "center",
        maxWidth: 1200, lineHeight: 1.5, opacity: descOpacity,
      }}>
        {data.description}
      </div>

      {/* Example */}
      <div style={{
        padding: "24px 40px", borderRadius: 14,
        background: `${theme.red}08`, borderLeft: `4px solid ${theme.red}60`,
        maxWidth: 1200, width: "100%", opacity: exOpacity,
      }}>
        <div style={{ fontSize: 26, color: theme.red, fontFamily: theme.font, fontWeight: 700, marginBottom: 8 }}>❌ 이런 실수를 합니다</div>
        <div style={{ fontSize: 32, color: theme.white, fontFamily: theme.font, lineHeight: 1.5 }}>{data.example}</div>
      </div>

      {/* Solution */}
      <div style={{
        padding: "24px 40px", borderRadius: 14,
        background: `${theme.green}08`, borderLeft: `4px solid ${theme.green}60`,
        maxWidth: 1200, width: "100%", opacity: solOpacity,
      }}>
        <div style={{ fontSize: 26, color: theme.green, fontFamily: theme.font, fontWeight: 700, marginBottom: 8 }}>✅ 이렇게 역이용하세요</div>
        <div style={{ fontSize: 32, color: theme.white, fontFamily: theme.font, lineHeight: 1.5 }}>{solution}</div>
      </div>
    </div>
  );
};
