import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { theme } from "../styles/theme";

interface Props {
  data: {
    icon?: string;
    label?: string;
    message: string;
    sub?: string;
    type?: "info" | "warning" | "success" | "insight";
  };
}

const TYPE_COLORS: Record<string, string> = {
  info:    "#81D8D0",
  warning: "#FFB347",
  success: "#52D68A",
  insight: "#C084FC",
};

const TYPE_ICONS: Record<string, string> = {
  info:    "💡",
  warning: "⚠️",
  success: "✅",
  insight: "🔍",
};

export const CalloutBox: React.FC<Props> = ({ data }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const type = data.type ?? "info";
  const color = TYPE_COLORS[type] ?? theme.tiffany;
  const icon = data.icon ?? TYPE_ICONS[type] ?? "💡";
  const label = data.label ?? { info: "핵심 포인트", warning: "주의 사항", success: "결론", insight: "인사이트" }[type] ?? "핵심 포인트";

  const iconProgress    = spring({ frame,         fps, config: { damping: 100, stiffness: 5 } });
  const labelProgress   = spring({ frame: frame - 8,  fps, config: { damping: 100, stiffness: 10 } });
  const msgProgress     = spring({ frame: frame - 18, fps, config: { damping: 100, stiffness: 5 } });
  const subProgress     = spring({ frame: frame - 32, fps, config: { damping: 100, stiffness: 10 } });

  const glowPulse = (Math.sin(frame * 0.04) + 1) / 2;
  const glowIntensity = 30 + glowPulse * 30;

  return (
    <div style={{
      width: "100%", height: "100%",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: "80px 140px",
    }}>
      <div style={{
        width: "100%",
        background: `${color}08`,
        border: `2px solid ${color}${Math.round((0.3 + glowPulse * 0.25) * 255).toString(16).padStart(2, "0")}`,
        borderRadius: 24,
        padding: "60px 72px",
        display: "flex", flexDirection: "column",
        alignItems: "center", gap: 28,
        position: "relative" as const,
        overflow: "hidden",
        boxShadow: `0 0 ${glowIntensity}px ${color}${Math.round((0.08 + glowPulse * 0.08) * 255).toString(16).padStart(2, "0")}`,
      }}>
        {/* 배경 글로우 */}
        <div style={{
          position: "absolute" as const,
          top: -60, left: "50%", transform: "translateX(-50%)",
          width: 400, height: 400, borderRadius: "50%",
          background: `radial-gradient(ellipse, ${color}${Math.round((0.08 + glowPulse * 0.06) * 255).toString(16).padStart(2, "0")} 0%, transparent 70%)`,
          filter: "blur(30px)",
        }} />

        {/* 아이콘 */}
        <div style={{
          fontSize: 80, fontFamily: theme.font,
          opacity: Math.min(1, iconProgress),
          transform: `scale(${interpolate(Math.min(1, iconProgress), [0, 1], [0.5, 1])})`,
          zIndex: 1,
        }}>
          {icon}
        </div>

        {/* 라벨 배지 */}
        <div style={{
          background: `${color}18`,
          border: `1px solid ${color}50`,
          borderRadius: 50, padding: "8px 28px",
          fontSize: 22, fontWeight: 800, color,
          fontFamily: theme.font, letterSpacing: 2,
          opacity: Math.min(1, labelProgress),
          zIndex: 1,
        }}>
          {label}
        </div>

        {/* 핵심 메시지 */}
        <div style={{
          fontSize: 52, fontWeight: 900, color: theme.white,
          fontFamily: theme.font, textAlign: "center" as const,
          lineHeight: 1.45, zIndex: 1,
          opacity: Math.min(1, msgProgress),
          transform: `translateY(${interpolate(Math.min(1, msgProgress), [0, 1], [24, 0])}px)`,
          textShadow: `0 0 ${20 + glowPulse * 15}px ${color}30`,
        }}>
          {data.message}
        </div>

        {/* 서브 텍스트 */}
        {data.sub && (
          <div style={{
            fontSize: 30, color: theme.grayLight,
            fontFamily: theme.font, fontWeight: 500,
            textAlign: "center" as const,
            opacity: Math.min(1, subProgress),
            transform: `translateY(${interpolate(Math.min(1, subProgress), [0, 1], [16, 0])}px)`,
            zIndex: 1,
          }}>
            {data.sub}
          </div>
        )}
      </div>
    </div>
  );
};
