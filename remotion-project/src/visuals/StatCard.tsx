import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { theme } from "../styles/theme";

interface Props {
  data: {
    big_number: string;
    big_label: string;
    card_title: string;
    card_items: string[];
  };
  accentColor?: string;
}

export const StatCard: React.FC<Props> = ({ data, accentColor = theme.tiffany }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const leftProgress = spring({ frame, fps, config: { damping: 100, stiffness: 25 } });
  const rightProgress = spring({ frame: frame - 10, fps, config: { damping: 100, stiffness: 25 } });

  // 글로우 펄싱만 (위치 이동 없음)
  const glowPulse = (Math.sin(frame * 0.05) + 1) / 2;
  const numGlowSize = 40 + glowPulse * 35;
  const cardGlow = (Math.sin(frame * 0.04 + 1.0) + 1) / 2;

  return (
    <div style={{
      width: "100%", height: "100%",
      display: "flex", alignItems: "center",
      padding: "0 80px", gap: 60,
    }}>
      {/* 왼쪽: 빅 넘버 */}
      <div style={{
        flex: 1,
        opacity: Math.min(1, leftProgress),
        transform: `translateX(${interpolate(Math.min(1, leftProgress), [0, 1], [-80, 0])}px)`,
        display: "flex", flexDirection: "column", gap: 20,
      }}>
        <div style={{
          fontSize: 28, fontWeight: 700, color: accentColor,
          fontFamily: theme.font, letterSpacing: 5,
          textTransform: "uppercase" as const,
          border: `1px solid ${accentColor}40`,
          padding: "6px 20px", borderRadius: 4,
          display: "inline-block", alignSelf: "flex-start",
        }}>
          현재 수치
        </div>

        {/* 빅 넘버 (글로우만) */}
        <div style={{ position: "relative" }}>
          <div style={{
            position: "absolute", inset: -20,
            background: `radial-gradient(ellipse, rgba(129,216,208,${0.12 + glowPulse * 0.1}) 0%, transparent 70%)`,
            filter: `blur(${numGlowSize * 0.5}px)`,
          }} />
          <div style={{
            fontSize: 110, fontWeight: 900, color: accentColor,
            fontFamily: theme.font, lineHeight: 1,
            textShadow: `0 0 ${numGlowSize}px rgba(129,216,208,${0.2 + glowPulse * 0.15})`,
            position: "relative",
          }}>
            {data.big_number}
          </div>
        </div>

        <div style={{
          fontSize: 32, color: theme.grayLight,
          fontFamily: theme.font, fontWeight: 500, lineHeight: 1.4,
        }}>
          {data.big_label}
        </div>

        <div style={{
          width: 60, height: 3,
          background: `linear-gradient(90deg, ${accentColor}, transparent)`,
          borderRadius: 2,
        }} />
      </div>

      {/* 오른쪽: 정보 카드 */}
      <div style={{
        width: 780,
        background: "rgba(129,216,208,0.05)",
        border: `1px solid rgba(129,216,208,${0.2 + cardGlow * 0.15})`,
        borderRadius: 24,
        padding: "44px 52px",
        opacity: Math.min(1, rightProgress),
        transform: `translateX(${interpolate(Math.min(1, rightProgress), [0, 1], [80, 0])}px)`,
        position: "relative" as const,
        overflow: "hidden",
        boxShadow: `0 0 ${20 + cardGlow * 16}px rgba(129,216,208,${0.04 + cardGlow * 0.06})`,
      }}>
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: 2,
          background: `linear-gradient(90deg, transparent, rgba(129,216,208,${0.6 + cardGlow * 0.35}), transparent)`,
        }} />

        <div style={{
          fontSize: 24, color: accentColor,
          fontFamily: theme.font, fontWeight: 900,
          letterSpacing: 2, marginBottom: 20,
        }}>
          {data.card_title}
        </div>
        <div style={{ width: 48, height: 2, background: `${accentColor}60`, marginBottom: 32 }} />

        {data.card_items.map((item, i) => {
          const itemProgress = spring({ frame: frame - 20 - i * 18, fps, config: { damping: 100, stiffness: 10 } });
          return (
            <div key={i} style={{
              fontSize: 26, color: theme.white,
              fontFamily: theme.font, fontWeight: 500,
              marginBottom: 18, lineHeight: 1.3,
              whiteSpace: "nowrap" as const,
              opacity: Math.min(1, itemProgress),
              transform: `translateY(${interpolate(Math.min(1, itemProgress), [0, 1], [16, 0])}px)`,
              paddingLeft: 20,
              borderLeft: `2px solid rgba(129,216,208,0.45)`,
            }}>
              {item}
            </div>
          );
        })}
      </div>
    </div>
  );
};
