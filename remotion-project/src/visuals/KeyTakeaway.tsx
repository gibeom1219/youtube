import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { theme } from "../styles/theme";

interface TakeawayPoint {
  emoji: string;
  text: string;
}

interface Props {
  data: {
    title?: string;
    points: TakeawayPoint[];
    conclusion?: string;
  };
}

export const KeyTakeaway: React.FC<Props> = ({ data }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleProgress = spring({ frame, fps, config: { damping: 100, stiffness: 10 } });
  const conclusionProgress = spring({
    frame: frame - 10 - data.points.length * 12,
    fps, config: { damping: 100, stiffness: 5 },
  });

  const glowPulse = (Math.sin(frame * 0.04) + 1) / 2;
  const accentColor = theme.tiffany;

  return (
    <div style={{
      width: "100%", height: "100%",
      display: "flex", flexDirection: "column",
      justifyContent: "center", padding: "50px 130px", gap: 24,
    }}>
      {/* 제목 */}
      {data.title && (
        <div style={{
          display: "flex", alignItems: "center", gap: 16,
          opacity: Math.min(1, titleProgress),
          transform: `translateY(${interpolate(Math.min(1, titleProgress), [0, 1], [-20, 0])}px)`,
        }}>
          <div style={{
            width: 5, height: 40, background: accentColor, borderRadius: 3,
            boxShadow: `0 0 ${8 + glowPulse * 6}px ${accentColor}`,
          }} />
          <div style={{
            fontSize: 40, fontWeight: 900, color: theme.white, fontFamily: theme.font,
          }}>
            {data.title}
          </div>
        </div>
      )}

      {/* 핵심 포인트들 */}
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {data.points.map((pt, i) => {
          const p = spring({
            frame: frame - 10 - i * 12,
            fps, config: { damping: 100, stiffness: 10 },
          });

          return (
            <div key={i} style={{
              display: "flex", alignItems: "flex-start", gap: 20,
              background: `${accentColor}08`,
              border: `1px solid ${accentColor}25`,
              borderLeft: `3px solid ${accentColor}`,
              borderRadius: "0 16px 16px 0",
              padding: "18px 28px",
              opacity: Math.min(1, p),
              transform: `translateX(${interpolate(Math.min(1, p), [0, 1], [-50, 0])}px)`,
            }}>
              <div style={{ fontSize: 32, lineHeight: 1.3, flexShrink: 0, fontFamily: theme.font }}>
                {pt.emoji}
              </div>
              <div style={{
                fontSize: 28, fontWeight: 600, color: theme.white,
                fontFamily: theme.font, lineHeight: 1.45, flex: 1,
              }}>
                {pt.text}
              </div>
            </div>
          );
        })}
      </div>

      {/* 최종 결론 */}
      {data.conclusion && (
        <div style={{
          background: `${accentColor}14`,
          border: `2px solid ${accentColor}50`,
          borderRadius: 20, padding: "22px 36px",
          display: "flex", alignItems: "center", gap: 16,
          opacity: Math.min(1, conclusionProgress),
          transform: `translateY(${interpolate(Math.min(1, conclusionProgress), [0, 1], [24, 0])}px)`,
          boxShadow: `0 0 ${20 + glowPulse * 14}px ${accentColor}18`,
        }}>
          <div style={{ fontSize: 30, fontFamily: theme.font }}>💎</div>
          <div style={{
            fontSize: 28, fontWeight: 800, color: accentColor,
            fontFamily: theme.font, lineHeight: 1.4, flex: 1,
          }}>
            {data.conclusion}
          </div>
        </div>
      )}
    </div>
  );
};
