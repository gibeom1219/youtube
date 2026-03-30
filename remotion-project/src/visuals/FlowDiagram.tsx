import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { theme } from "../styles/theme";

interface FlowStep {
  label: string;
  note?: string;
}

interface Props {
  data: {
    title: string;
    steps: FlowStep[];
  };
  durationFrames: number;
}

export const FlowDiagram: React.FC<Props> = ({ data, durationFrames }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleProgress = spring({ frame, fps, config: { damping: 100, stiffness: 10 } });
  const interval = Math.min((durationFrames * 0.65) / data.steps.length, 18);

  const glowPulse = (Math.sin(frame * 0.05) + 1) / 2;

  const n = data.steps.length;
  const stepFontSize = n <= 3 ? 30 : n <= 4 ? 26 : 22;
  const noteFontSize = n <= 3 ? 22 : n <= 4 ? 20 : 18;
  const boxPadding   = n <= 3 ? "36px 32px 24px" : n <= 4 ? "32px 24px 20px" : "30px 18px 18px";
  const arrowWidth   = n <= 3 ? 40 : n <= 4 ? 28 : 20;

  return (
    <div style={{
      width: "100%", height: "100%",
      display: "flex", flexDirection: "column",
      justifyContent: "center", padding: "60px 100px", gap: 48,
    }}>
      {/* 제목 */}
      <div style={{
        fontSize: 44, fontWeight: 900, color: theme.white,
        fontFamily: theme.font, textAlign: "center" as const,
        opacity: Math.min(1, titleProgress),
        transform: `translateY(${interpolate(Math.min(1, titleProgress), [0, 1], [-20, 0])}px)`,
      }}>
        {data.title}
      </div>

      {/* 흐름 단계 */}
      <div style={{
        display: "flex", alignItems: "center",
        justifyContent: "center",
        gap: 0, flexWrap: "nowrap" as const,
        paddingTop: 24,
      }}>
        {data.steps.map((step, i) => {
          const stepStart = Math.round(interval * i + 6);
          const stepProgress = spring({ frame: frame - stepStart, fps, config: { damping: 100, stiffness: 10 } });
          const arrowProgress = spring({ frame: frame - stepStart - 4, fps, config: { damping: 120, stiffness: 20 } });

          const settled = Math.max(0, frame - (stepStart + 20));
          const pulse = (Math.sin(settled * 0.05 + i * 1.1) + 1) / 2;
          const borderAlpha = 0.4 + pulse * 0.4;

          return (
            <React.Fragment key={i}>
              {/* 단계 박스 */}
              <div style={{
                display: "flex", flexDirection: "column",
                alignItems: "center", gap: 12,
                opacity: Math.min(1, stepProgress),
                transform: `scale(${interpolate(Math.min(1, stepProgress), [0, 1], [0.7, 1])})`,
                flex: 1, minWidth: 0,
              }}>
                {/* 박스 */}
                <div style={{
                  background: `rgba(129,216,208,0.08)`,
                  border: `2px solid rgba(129,216,208,${borderAlpha})`,
                  borderRadius: 16,
                  padding: boxPadding,
                  width: "100%",
                  textAlign: "center" as const,
                  boxShadow: `0 0 ${12 + pulse * 12}px rgba(129,216,208,0.1)`,
                  position: "relative" as const,
                }}>
                  {/* 단계 번호 */}
                  <div style={{
                    position: "absolute" as const,
                    top: -18, left: "50%",
                    transform: "translateX(-50%)",
                    background: theme.tiffany,
                    color: theme.bg,
                    fontSize: 22, fontWeight: 900,
                    fontFamily: theme.font,
                    width: 36, height: 36, borderRadius: "50%",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0,
                    lineHeight: 1,
                  }}>
                    {i + 1}
                  </div>
                  <div style={{
                    fontSize: stepFontSize, fontWeight: 800, color: theme.white,
                    fontFamily: theme.font, lineHeight: 1.3,
                    wordBreak: "keep-all" as const,
                  }}>
                    {step.label}
                  </div>
                </div>
                {/* 노트 */}
                {step.note && (
                  <div style={{
                    fontSize: noteFontSize, color: theme.grayLight,
                    fontFamily: theme.font, fontWeight: 500,
                    textAlign: "center" as const,
                    wordBreak: "keep-all" as const,
                  }}>
                    {step.note}
                  </div>
                )}
              </div>

              {/* 화살표 (마지막 제외) */}
              {i < data.steps.length - 1 && (
                <div style={{
                  display: "flex", alignItems: "center",
                  flexShrink: 0, padding: "0 8px",
                  opacity: Math.min(1, arrowProgress),
                  transform: `scaleX(${interpolate(Math.min(1, arrowProgress), [0, 1], [0, 1])})`,
                }}>
                  <div style={{
                    height: 3,
                    width: arrowWidth,
                    background: `linear-gradient(90deg, rgba(129,216,208,0.4), ${theme.tiffany})`,
                    borderRadius: 2,
                  }} />
                  <div style={{
                    width: 0, height: 0,
                    borderTop: "9px solid transparent",
                    borderBottom: "9px solid transparent",
                    borderLeft: `14px solid ${theme.tiffany}`,
                    filter: `drop-shadow(0 0 ${4 + glowPulse * 4}px ${theme.tiffany})`,
                  }} />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
