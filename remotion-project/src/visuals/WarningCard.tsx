import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { theme } from "../styles/theme";
import { useSceneTheme } from "../contexts/SceneTheme";

interface Props {
  data: {
    title: string;
    level?: "caution" | "danger" | "critical";
    items: string[];
    disclaimer?: string;
    icon?: string;
  };
}

const LEVEL_CONFIG = {
  caution:  { color: "#FFB347", icon: "⚠️",  label: "주의" },
  danger:   { color: "#FF6B6B", icon: "🚫",  label: "위험" },
  critical: { color: "#FF4444", icon: "🚨",  label: "긴급 경고" },
};

export const WarningCard: React.FC<Props> = ({ data }) => {
  const theme = useSceneTheme();
  const frame = useCurrentFrame();
  if (!data) return null;
  const { fps } = useVideoConfig();

  const level  = data.level ?? "caution";
  const cfg    = LEVEL_CONFIG[level];
  const color  = cfg.color;
  const icon   = data.icon ?? cfg.icon;

  const headerProgress = spring({ frame,         fps, config: { damping: 100, stiffness: 10 } });
  const itemProgress0  = spring({ frame: frame - 14, fps, config: { damping: 100, stiffness: 10 } });

  // 깜빡임 (critical만)
  const blinkOpacity = level === "critical"
    ? (Math.floor(frame / 20) % 2 === 0 ? 1 : 0.5)
    : 1;

  const glowPulse = (Math.sin(frame * 0.05) + 1) / 2;

  return (
    <div style={{
      width: "100%", height: "100%",
      display: "flex", flexDirection: "column",
      justifyContent: "center", padding: "50px 130px", gap: 0,
    }}>
      <div style={{
        background: `${color}0C`,
        border: `2px solid ${color}${Math.round((0.4 + glowPulse * 0.3) * 255).toString(16).padStart(2, "0")}`,
        borderRadius: 24, overflow: "hidden",
        boxShadow: `0 0 ${40 + glowPulse * 30}px ${color}20`,
        opacity: Math.min(1, headerProgress),
        transform: `scale(${interpolate(Math.min(1, headerProgress), [0, 1], [0.95, 1])})`,
      }}>
        {/* 헤더 */}
        <div style={{
          background: `${color}20`,
          borderBottom: `1px solid ${color}40`,
          padding: "20px 40px",
          display: "flex", alignItems: "center", gap: 16,
          opacity: blinkOpacity,
        }}>
          <div style={{ fontSize: 36, fontFamily: theme.font }}>{icon}</div>
          <div style={{
            fontSize: 30, fontWeight: 900, color,
            fontFamily: theme.font, letterSpacing: 1,
            textShadow: theme.textShadow.medium,
          }}>
            {cfg.label}
          </div>
          <div style={{
            flex: 1, fontSize: 28, fontWeight: 700, color: theme.white,
            fontFamily: theme.font,
            textShadow: theme.textShadow.medium,
          }}>
            {data.title}
          </div>
        </div>

        {/* 항목 목록 */}
        <div style={{ padding: "32px 40px", display: "flex", flexDirection: "column", gap: 16 }}>
          {(data.items ?? []).map((item, i) => {
            const p = spring({
              frame: frame - 14 - i * 10,
              fps, config: { damping: 100, stiffness: 10 },
            });
            return (
              <div key={i} style={{
                display: "flex", alignItems: "flex-start", gap: 16,
                opacity: Math.min(1, p),
                transform: `translateX(${interpolate(Math.min(1, p), [0, 1], [-30, 0])}px)`,
              }}>
                <div style={{
                  width: 8, height: 8, borderRadius: "50%",
                  background: color, flexShrink: 0,
                  marginTop: 12,
                  boxShadow: `0 0 6px ${color}`,
                }} />
                <div style={{
                  fontSize: 28, fontWeight: 600, color: theme.white,
                  fontFamily: theme.font, lineHeight: 1.45,
                  textShadow: theme.textShadow.medium,
                }}>
                  {item}
                </div>
              </div>
            );
          })}
        </div>

        {data.disclaimer && (
          <div style={{
            borderTop: `1px solid ${color}20`,
            padding: "14px 40px",
            fontSize: 24, color: "rgba(255,255,255,0.4)",
            fontFamily: theme.font, lineHeight: 1.4,
          }}>
            ※ {data.disclaimer}
          </div>
        )}
      </div>
    </div>
  );
};
