import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { theme } from "../styles/theme";
import { useSceneTheme } from "../contexts/SceneTheme";

interface Props {
  data: { title?: string; bias: string; description: string; example: string; solution?: string; tip?: string; icon?: string };
}

export const PsychologyCard: React.FC<Props> = ({ data }) => {
  const theme = useSceneTheme();
  const frame = useCurrentFrame();
  if (!data) return null;
  const { fps } = useVideoConfig();
  const title = data.title ?? "투자 심리 편향";
  const solution = data.solution ?? data.tip ?? "";
  // SceneTransition IN이 20프레임이므로 내부 요소는 20+ 에서 시작
  const titleOpacity = interpolate(frame, [20, 32], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const biasOpacity = interpolate(frame, [28, 40], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const descOpacity = interpolate(frame, [36, 48], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const exOpacity = interpolate(frame, [44, 56], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const solOpacity = interpolate(frame, [52, 64], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "60px 80px", gap: 24 }}>
      <div style={{ fontSize: 42, fontWeight: 700, color: theme.gold, fontFamily: theme.font, opacity: titleOpacity, textShadow: theme.textShadow.medium }}>
        {title}
      </div>

      {/* Bias name */}
      <div style={{
        display: "flex", alignItems: "center", gap: 16,
        opacity: biasOpacity,
      }}>
        {data.icon && <span style={{ fontSize: 64, fontFamily: theme.font }}>{data.icon}</span>}
        <span style={{ fontSize: 52, fontWeight: 900, color: theme.white, fontFamily: theme.font, textShadow: theme.textShadow.medium }}>{data.bias}</span>
      </div>

      {/* Description */}
      <div style={{
        fontSize: 30, color: theme.grayLight, fontFamily: theme.font, textAlign: "center",
        maxWidth: 1200, lineHeight: 1.5, opacity: descOpacity, textShadow: theme.textShadow.medium,
      }}>
        {data.description}
      </div>

      {/* Example */}
      <div style={{
        padding: "24px 40px", borderRadius: 14,
        background: `${theme.red}22`, borderLeft: `4px solid ${theme.red}60`,
        maxWidth: 1200, width: "100%", opacity: exOpacity,
      }}>
        <div style={{ fontSize: 26, color: theme.red, fontFamily: theme.font, fontWeight: 700, marginBottom: 8, textShadow: theme.textShadow.medium }}>❌ 이런 실수를 합니다</div>
        <div style={{ fontSize: 32, color: theme.white, fontFamily: theme.font, lineHeight: 1.5, textShadow: theme.textShadow.medium }}>{data.example}</div>
      </div>

      {/* Solution */}
      <div style={{
        padding: "24px 40px", borderRadius: 14,
        background: `${theme.green}22`, borderLeft: `4px solid ${theme.green}60`,
        maxWidth: 1200, width: "100%", opacity: solOpacity,
      }}>
        <div style={{ fontSize: 26, color: theme.green, fontFamily: theme.font, fontWeight: 700, marginBottom: 8, textShadow: theme.textShadow.medium }}>✅ 이렇게 역이용하세요</div>
        <div style={{ fontSize: 32, color: theme.white, fontFamily: theme.font, lineHeight: 1.5, textShadow: theme.textShadow.medium }}>{solution}</div>
      </div>
    </div>
  );
};
