import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { theme } from "../styles/theme";

interface Props {
  data: {
    quote: string;
    speaker: string;
    role: string;
    date?: string;
  };
}

export const QuoteCard: React.FC<Props> = ({ data }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const markProgress  = spring({ frame,         fps, config: { damping: 100, stiffness: 10 } });
  const quoteProgress = spring({ frame: frame - 10, fps, config: { damping: 100, stiffness: 5 } });
  const lineProgress  = spring({ frame: frame - 22, fps, config: { damping: 120, stiffness: 10 } });
  const attrProgress  = spring({ frame: frame - 32, fps, config: { damping: 100, stiffness: 10 } });

  const glowPulse = (Math.sin(frame * 0.04) + 1) / 2;

  return (
    <div style={{
      width: "100%", height: "100%",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      padding: "80px 140px", gap: 40,
    }}>
      {/* 큰따옴표 */}
      <div style={{
        fontSize: 200, fontWeight: 900, color: theme.tiffany,
        fontFamily: theme.font, lineHeight: 0.6,
        opacity: interpolate(Math.min(1, markProgress), [0, 1], [0, 0.35]),
        transform: `translateY(${interpolate(Math.min(1, markProgress), [0, 1], [-30, 0])}px)`,
        alignSelf: "flex-start",
        userSelect: "none" as const,
      }}>
        "
      </div>

      {/* 인용구 */}
      <div style={{
        fontSize: 52, fontWeight: 700, color: theme.white,
        fontFamily: theme.font, textAlign: "center" as const,
        lineHeight: 1.55, letterSpacing: -0.5,
        opacity: Math.min(1, quoteProgress),
        transform: `translateY(${interpolate(Math.min(1, quoteProgress), [0, 1], [30, 0])}px)`,
        textShadow: `0 0 ${40 + glowPulse * 20}px rgba(129,216,208,${0.06 + glowPulse * 0.06})`,
        marginTop: -60,
      }}>
        {data.quote}
      </div>

      {/* 구분선 */}
      <div style={{
        height: 2,
        width: `${interpolate(Math.min(1, lineProgress), [0, 1], [0, 200])}px`,
        background: `linear-gradient(90deg, transparent, ${theme.tiffany}, transparent)`,
        borderRadius: 1,
      }} />

      {/* 발화자 정보 */}
      <div style={{
        display: "flex", flexDirection: "column",
        alignItems: "center", gap: 10,
        opacity: Math.min(1, attrProgress),
        transform: `translateY(${interpolate(Math.min(1, attrProgress), [0, 1], [20, 0])}px)`,
      }}>
        <div style={{
          fontSize: 36, fontWeight: 900, color: theme.tiffany,
          fontFamily: theme.font, letterSpacing: 1,
        }}>
          — {data.speaker}
        </div>
        <div style={{
          fontSize: 26, color: theme.grayLight,
          fontFamily: theme.font, fontWeight: 500,
        }}>
          {data.role}{data.date ? ` · ${data.date}` : ""}
        </div>
      </div>
    </div>
  );
};
