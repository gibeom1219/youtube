import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { theme } from "../styles/theme";

interface BubbleItem {
  label: string;
  value: number;
  display?: string;
  note?: string;
  color?: string;
}

interface Props {
  data: {
    title: string;
    items: BubbleItem[];
    unit?: string;
  };
}

const BUBBLE_COLORS = ["#81D8D0", "#52D68A", "#FFB347", "#C084FC", "#FF6B6B", "#FFE66D"];

export const BubbleCompare: React.FC<Props> = ({ data }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleProgress = spring({ frame, fps, config: { damping: 100, stiffness: 10 } });
  const glowPulse = (Math.sin(frame * 0.04) + 1) / 2;

  const maxValue = Math.max(...data.items.map(b => b.value));
  const MAX_RADIUS = 110;
  const MIN_RADIUS = 36;

  return (
    <div style={{
      width: "100%", height: "100%",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      padding: "40px 80px", gap: 24,
    }}>
      {/* 제목 */}
      <div style={{
        fontSize: 40, fontWeight: 900, color: theme.white,
        fontFamily: theme.font, textAlign: "center",
        opacity: Math.min(1, titleProgress),
        transform: `translateY(${interpolate(Math.min(1, titleProgress), [0, 1], [-20, 0])}px)`,
      }}>
        {data.title}
      </div>

      {/* 버블들 */}
      <div style={{
        display: "flex", alignItems: "center",
        justifyContent: "center",
        flexWrap: "wrap" as const,
        gap: 16,
        flex: 1,
        width: "100%",
      }}>
        {data.items.map((item, i) => {
          const p = spring({
            frame: frame - 8 - i * 8,
            fps, config: { damping: 80, stiffness: 5 },
          });
          const color = item.color ?? BUBBLE_COLORS[i % BUBBLE_COLORS.length];
          const ratio = item.value / maxValue;
          const radius = MIN_RADIUS + ratio * (MAX_RADIUS - MIN_RADIUS);
          const animRadius = interpolate(Math.min(1, p), [0, 1], [0, radius]);
          const fontSize = Math.max(14, Math.min(28, radius * 0.26));
          const labelSize = Math.max(12, Math.min(20, radius * 0.18));

          return (
            <div key={i} style={{
              display: "flex", flexDirection: "column",
              alignItems: "center", gap: 8,
              opacity: Math.min(1, p),
            }}>
              {/* 버블 */}
              <div style={{
                width: animRadius * 2, height: animRadius * 2,
                borderRadius: "50%",
                background: `radial-gradient(circle at 35% 35%, ${color}40, ${color}10)`,
                border: `2px solid ${color}${Math.round((0.5 + glowPulse * 0.3) * 255).toString(16).padStart(2, "0")}`,
                display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "center",
                boxShadow: `0 0 ${radius * 0.3 + glowPulse * radius * 0.15}px ${color}30`,
              }}>
                <div style={{
                  fontSize, fontWeight: 900, color,
                  fontFamily: theme.font, lineHeight: 1, textAlign: "center",
                }}>
                  {item.display ?? item.value.toLocaleString()}
                </div>
                {data.unit && (
                  <div style={{
                    fontSize: labelSize, color: `${color}90`, fontFamily: theme.font, fontWeight: 600,
                  }}>
                    {data.unit}
                  </div>
                )}
              </div>

              {/* 라벨 */}
              <div style={{
                fontSize: 20, fontWeight: 700, color: theme.white,
                fontFamily: theme.font, textAlign: "center",
                maxWidth: radius * 2 + 20,
              }}>
                {item.label}
              </div>
              {item.note && (
                <div style={{
                  fontSize: 16, color: theme.grayLight,
                  fontFamily: theme.font, textAlign: "center",
                }}>
                  {item.note}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
