import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { useSceneTheme } from "../contexts/SceneTheme";

interface Props {
  data: {
    level?: "caution" | "danger" | "critical";
    title: string;
    description: string;
    highlight?: string;
    source?: string;
  };
}

const LEVEL_CONFIG = {
  caution: { color: "#e67e22", icon: "⚠️", label: "주의" },
  danger: { color: "#dc2626", icon: "🚨", label: "위험" },
  critical: { color: "#7f1d1d", icon: "🔴", label: "긴급" },
};

export const WhiteWarning: React.FC<Props> = ({ data }) => {
  const theme = useSceneTheme();
  const frame = useCurrentFrame();
  if (!data) return null;

  const level = data.level ?? "danger";
  const config = LEVEL_CONFIG[level];

  const iconOpacity = interpolate(frame, [0, 10], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const iconScale = interpolate(frame, [0, 12], [0.5, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const titleOpacity = interpolate(frame, [6, 18], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const descOpacity = interpolate(frame, [14, 26], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const descSlide = interpolate(frame, [14, 26], [20, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const sourceOpacity = interpolate(frame, [22, 34], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // 깜빡임 (critical만)
  const pulse = level === "critical"
    ? interpolate(Math.sin(frame * 0.08) , [-1, 1], [0.85, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })
    : 1;

  const renderDescription = () => {
    const { description, highlight } = data;
    if (!highlight) return description;
    const idx = (description ?? "").indexOf(highlight ?? "");
    if (idx === -1) return description;
    return (
      <>
        {description.slice(0, idx)}
        <span style={{ fontWeight: 900, color: config.color }}>{highlight}</span>
        {description.slice(idx + highlight.length)}
      </>
    );
  };

  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      <div style={{
        position: "absolute", top: 0, bottom: 0, left: 0, right: 0,
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        padding: "0 240px",
        zIndex: 3,
      }}>
        {/* 경고 아이콘 */}
        <div style={{
          fontSize: 88, marginBottom: 20,
          fontFamily: theme.font,
          opacity: iconOpacity * pulse,
          transform: `scale(${iconScale})`,
        }}>
          {config.icon}
        </div>

        {/* 레벨 뱃지 */}
        <div style={{
          background: config.color,
          borderRadius: 6,
          padding: "6px 20px", marginBottom: 20,
          opacity: iconOpacity,
        }}>
          <span style={{
            fontSize: 26, fontWeight: 800, color: "white",
            fontFamily: theme.font, letterSpacing: 2,
          }}>
            {config.label}
          </span>
        </div>

        {/* 타이틀 */}
        <div style={{
          fontSize: 58, fontWeight: 900, color: "#000",
          fontFamily: theme.font, textAlign: "center",
          lineHeight: 1.3, marginBottom: 24,
          opacity: titleOpacity, letterSpacing: -1,
        }}>
          {data.title}
        </div>

        {/* 설명 */}
        <div style={{
          fontSize: 38, fontWeight: 600, color: "#222",
          fontFamily: theme.font, textAlign: "center",
          lineHeight: 1.6,
          opacity: descOpacity,
          transform: `translateY(${descSlide}px)`,
        }}>
          {renderDescription()}
        </div>

        {/* 출처 */}
        {data.source && (
          <div style={{
            fontSize: 28, fontWeight: 500, color: "#888",
            fontFamily: theme.font, marginTop: 20,
            opacity: sourceOpacity,
          }}>
            {data.source}
          </div>
        )}
      </div>
    </div>
  );
};
