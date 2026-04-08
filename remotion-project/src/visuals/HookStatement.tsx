import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { theme } from "../styles/theme";
import { useSceneTheme } from "../contexts/SceneTheme";

interface Props {
  data: {
    line1: string;
    line2: string;
    highlight?: string;
    highlight_color?: string;
    sub?: string;
  };
}

export const HookStatement: React.FC<Props> = ({ data }) => {
  const theme = useSceneTheme();
  const frame = useCurrentFrame();
  if (!data) return null;
  const highlightColor = data.highlight_color ?? "#FF6B6B";

  // Line 1: 빠르게 등장
  const line1Opacity = interpolate(frame, [0, 10], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const line1Y = interpolate(frame, [0, 14], [40, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const line1Scale = interpolate(frame, [0, 14], [0.85, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Line 2: 약간 지연 후 등장 (강조색)
  const line2Opacity = interpolate(frame, [10, 20], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const line2Y = interpolate(frame, [10, 24], [40, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const line2Scale = interpolate(frame, [10, 24], [0.85, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Sub: 나중에 페이드인
  const subOpacity = interpolate(frame, [24, 36], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // 배경 펄싱 글로우
  const pulse = (Math.sin(frame * 0.06) + 1) / 2;
  const glowSize = 30 + pulse * 40;

  // Line2 텍스트에서 highlight 키워드 강조 처리
  const renderLine2 = () => {
    if (!data.highlight || !data.line2.includes(data.highlight)) {
      return data.line2;
    }
    const parts = data.line2.split(data.highlight);
    return (
      <>
        {parts[0]}
        <span style={{
          color: highlightColor,
          textShadow: `0 0 ${20 + pulse * 20}px ${highlightColor}60`,
        }}>
          {data.highlight}
        </span>
        {parts[1]}
      </>
    );
  };

  return (
    <div style={{
      width: "100%", height: "100%",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      padding: "60px 100px", gap: 16,
    }}>
      {/* 배경 글로우 */}
      <div style={{
        position: "absolute",
        width: 600, height: 600,
        borderRadius: "50%",
        background: `radial-gradient(circle, ${highlightColor}08 0%, transparent 70%)`,
        filter: `blur(${glowSize}px)`,
        opacity: 0.6 + pulse * 0.4,
      }} />

      {/* Line 1 — 흰색 큰 글씨 */}
      <div style={{
        fontSize: 80, fontWeight: 900, color: theme.white,
        fontFamily: theme.font, textAlign: "center",
        lineHeight: 1.3, maxWidth: 1400,
        opacity: line1Opacity,
        transform: `translateY(${line1Y}px) scale(${line1Scale})`,
        textShadow: theme.textShadow.strong,
        position: "relative",
      }}>
        {data.line1}
      </div>

      {/* Line 2 — 강조색 큰 글씨 */}
      <div style={{
        fontSize: 88, fontWeight: 900, color: highlightColor,
        fontFamily: theme.font, textAlign: "center",
        lineHeight: 1.3, maxWidth: 1400,
        opacity: line2Opacity,
        transform: `translateY(${line2Y}px) scale(${line2Scale})`,
        textShadow: `${theme.textShadow.strong}, 0 0 ${glowSize}px ${highlightColor}40`,
        position: "relative",
      }}>
        {renderLine2()}
      </div>

      {/* Sub — 보조 설명 */}
      {data.sub && (
        <div style={{
          fontSize: 36, fontWeight: 600, color: theme.grayLight,
          fontFamily: theme.font, textAlign: "center",
          opacity: subOpacity, maxWidth: 1100,
          lineHeight: 1.5, marginTop: 20,
          position: "relative",
        }}>
          {data.sub}
        </div>
      )}
    </div>
  );
};
