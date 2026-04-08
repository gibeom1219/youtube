import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { theme } from "../styles/theme";
import { useSceneTheme } from "../contexts/SceneTheme";

interface Props {
  data: {
    type?: "breaking" | "warning" | "update" | "alert";
    headline: string;
    sub_text?: string;
    source?: string;
    time?: string;
  };
}

const TYPE_CONFIG = {
  breaking: { label: "🔴 BREAKING",  color: "#FF4444", bg: "#FF444435" },
  warning:  { label: "⚠️ 경고",       color: "#FFB347", bg: "#FFB34735" },
  update:   { label: "📢 업데이트",   color: "#81D8D0", bg: "#81D8D035" },
  alert:    { label: "🚨 긴급",       color: "#FF6B6B", bg: "#FF6B6B35" },
};

export const AlertBanner: React.FC<Props> = ({ data }) => {
  const theme = useSceneTheme();
  const frame = useCurrentFrame();
  if (!data) return null;
  // message → sub_text, description → source 호환
  if (!data.sub_text && (data as any).message) {
    (data as any).sub_text = (data as any).message;
  }
  if (!data.source && (data as any).description) {
    (data as any).source = (data as any).description;
  }
  const { fps } = useVideoConfig();

  const type = data.type ?? "breaking";
  const cfg  = TYPE_CONFIG[type] ?? TYPE_CONFIG.breaking;

  const bannerProgress   = spring({ frame,         fps, config: { damping: 80,  stiffness: 5 } });
  const headlineProgress = spring({ frame: frame - 10, fps, config: { damping: 100, stiffness: 5 } });
  const subProgress      = spring({ frame: frame - 22, fps, config: { damping: 100, stiffness: 10 } });

  // 깜빡임 (0.5초 주기)
  const blinkCycle = Math.floor(frame / 15) % 2 === 0;
  const badgeOpacity = type === "breaking" || type === "alert"
    ? (blinkCycle ? 1.0 : 0.4)
    : 1.0;

  const glowPulse = (Math.sin(frame * 0.05) + 1) / 2;

  return (
    <div style={{
      width: "100%", height: "100%",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      padding: "60px 120px", gap: 0,
    }}>
      <div style={{
        width: "100%",
        background: cfg.bg,
        border: `2px solid ${cfg.color}${Math.round((0.4 + glowPulse * 0.3) * 255).toString(16).padStart(2, "0")}`,
        borderRadius: 20,
        overflow: "hidden",
        opacity: Math.min(1, bannerProgress),
        transform: `scaleY(${interpolate(Math.min(1, bannerProgress), [0, 1], [0.6, 1])})`,
        boxShadow: `0 0 ${40 + glowPulse * 30}px ${cfg.color}25`,
      }}>
        {/* 상단 배지 바 */}
        <div style={{
          background: `${cfg.color}35`,
          borderBottom: `1px solid ${cfg.color}40`,
          padding: "14px 40px",
          display: "flex", alignItems: "center",
          justifyContent: "space-between",
        }}>
          <div style={{
            fontSize: 24, fontWeight: 900, color: cfg.color,
            fontFamily: theme.font, letterSpacing: 2,
            opacity: badgeOpacity,
          }}>
            {cfg.label}
          </div>
          {data.time && (
            <div style={{
              fontSize: 24, color: "rgba(255,255,255,0.5)",
              fontFamily: theme.font,
            }}>
              {data.time}
            </div>
          )}
        </div>

        {/* 헤드라인 */}
        <div style={{ padding: "48px 48px 32px" }}>
          <div style={{
            fontSize: 52, fontWeight: 900, color: theme.white,
            fontFamily: theme.font, lineHeight: 1.35,
            textAlign: "center",
            opacity: Math.min(1, headlineProgress),
            transform: `translateY(${interpolate(Math.min(1, headlineProgress), [0, 1], [30, 0])}px)`,
            textShadow: theme.textShadow.strong,
          }}>
            {data.headline}
          </div>

          {data.sub_text && (
            <div style={{
              fontSize: 28, color: theme.grayLight,
              fontFamily: theme.font, fontWeight: 500,
              textAlign: "center", marginTop: 24,
              textShadow: theme.textShadow.medium,
              opacity: Math.min(1, subProgress),
              transform: `translateY(${interpolate(Math.min(1, subProgress), [0, 1], [20, 0])}px)`,
            }}>
              {data.sub_text}
            </div>
          )}
        </div>

        {/* 출처 */}
        {data.source && (
          <div style={{
            borderTop: `1px solid ${cfg.color}20`,
            padding: "14px 48px",
            fontSize: 24, color: "rgba(255,255,255,0.4)",
            fontFamily: theme.font,
            opacity: Math.min(1, subProgress),
          }}>
            출처: {data.source}
          </div>
        )}
      </div>
    </div>
  );
};
