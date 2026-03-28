import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { theme } from "../styles/theme";

interface Stage {
  label: string;
  value: number;
  note?: string;
}

interface Props {
  data: {
    title: string;
    stages: Stage[];
    unit?: string;
  };
}

const STAGE_COLORS = ["#81D8D0", "#52D68A", "#FFB347", "#C084FC", "#FF6B6B"];

export const FunnelChart: React.FC<Props> = ({ data }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleProgress = spring({ frame, fps, config: { damping: 100, stiffness: 10 } });
  const glowPulse = (Math.sin(frame * 0.04) + 1) / 2;

  const maxValue = Math.max(...data.stages.map(s => s.value));

  return (
    <div style={{
      width: "100%", height: "100%",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      padding: "40px 100px", gap: 20,
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

      {/* 깔때기 단계 */}
      <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 8 }}>
        {data.stages.map((stage, i) => {
          const p = spring({
            frame: frame - 8 - i * 12,
            fps, config: { damping: 100, stiffness: 5 },
          });
          const color = STAGE_COLORS[i % STAGE_COLORS.length];
          const widthPct = (stage.value / maxValue) * 100;
          const animatedWidth = interpolate(Math.min(1, p), [0, 1], [0, widthPct]);
          const prevValue = i > 0 ? data.stages[i - 1].value : null;
          const dropPct = prevValue ? (((prevValue - stage.value) / prevValue) * 100).toFixed(0) : null;

          return (
            <div key={i} style={{
              width: "100%",
              opacity: Math.min(1, p),
            }}>
              <div style={{
                display: "flex", alignItems: "center", gap: 16, marginBottom: 4,
              }}>
                <div style={{
                  fontSize: 20, color, fontFamily: theme.font,
                  fontWeight: 700, minWidth: 28,
                }}>
                  {i + 1}
                </div>
                <div style={{
                  fontSize: 22, color: theme.white, fontFamily: theme.font,
                  fontWeight: 700, flex: 1,
                }}>
                  {stage.label}
                </div>
                <div style={{
                  fontSize: 24, fontWeight: 900, color,
                  fontFamily: theme.font,
                }}>
                  {stage.value.toLocaleString()}{data.unit ?? ""}
                </div>
                {dropPct && (
                  <div style={{
                    fontSize: 16, color: "#FF6B6B", fontFamily: theme.font,
                    fontWeight: 700, minWidth: 60, textAlign: "right",
                  }}>
                    ▼ {dropPct}%
                  </div>
                )}
              </div>
              {/* 바 */}
              <div style={{
                width: "100%", height: 36, background: "rgba(255,255,255,0.06)",
                borderRadius: 8, overflow: "hidden",
              }}>
                <div style={{
                  height: "100%", width: `${animatedWidth}%`,
                  background: `linear-gradient(to right, ${color}60, ${color})`,
                  borderRadius: 8,
                  boxShadow: `0 0 ${8 + glowPulse * 6}px ${color}40`,
                }} />
              </div>
              {stage.note && (
                <div style={{
                  fontSize: 17, color: theme.grayLight, fontFamily: theme.font,
                  marginTop: 4, marginLeft: 44,
                }}>
                  {stage.note}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
