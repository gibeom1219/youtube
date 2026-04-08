import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { theme } from "../styles/theme";
import { useSceneTheme } from "../contexts/SceneTheme";

interface Step {
  step: string;
  title: string;
  description: string;
}

interface Props {
  data: {
    title: string;
    steps: Step[];
  };
  durationFrames: number;
}

export const StepFlow: React.FC<Props> = ({ data, durationFrames }) => {
  const theme = useSceneTheme();
  const frame = useCurrentFrame();
  if (!data) return null;
  const { fps } = useVideoConfig();

  const titleProgress = spring({ frame, fps, config: { damping: 100, stiffness: 10 } });
  const interval = Math.min((durationFrames * 0.65) / ((data.steps ?? []).length + 1), 18);

  const glowPulse = (Math.sin(frame * 0.04) + 1) / 2;

  return (
    <div style={{
      width: "100%", height: "100%",
      display: "flex", flexDirection: "column",
      justifyContent: "center", padding: "60px 140px", gap: 0,
    }}>
      {/* 제목 */}
      <div style={{
        fontSize: 44, fontWeight: 900, color: theme.white,
        fontFamily: theme.font, marginBottom: 40,
        opacity: Math.min(1, titleProgress),
        transform: `translateY(${interpolate(Math.min(1, titleProgress), [0, 1], [-20, 0])}px)`,
      }}>
        {data.title}
      </div>

      {/* 단계 목록 */}
      <div style={{ display: "flex", flexDirection: "column", gap: 0, position: "relative" as const }}>
        {/* 수직 연결선 */}
        {(data.steps ?? []).length > 1 && (
          <div style={{
            position: "absolute" as const,
            left: 28, top: 56, bottom: 56,
            width: 2,
            background: `linear-gradient(180deg, ${theme.tiffany}60, ${theme.tiffany}25)`,
          }} />
        )}

        {(data.steps ?? []).map((step, i) => {
          const startFrame = Math.round(interval * (i + 1));
          const progress = spring({ frame: frame - startFrame, fps, config: { damping: 100, stiffness: 10 } });

          const settled = Math.max(0, frame - (startFrame + 20));
          const pulse = (Math.sin(settled * 0.05 + i * 1.3) + 1) / 2;
          const circleGlow = 8 + pulse * 12;

          return (
            <div key={i} style={{
              display: "flex", alignItems: "flex-start", gap: 36,
              paddingBottom: i < (data.steps ?? []).length - 1 ? 28 : 0,
              opacity: Math.min(1, progress),
              transform: `translateX(${interpolate(Math.min(1, progress), [0, 1], [-50, 0])}px)`,
              position: "relative" as const,
            }}>
              {/* 단계 원형 배지 */}
              <div style={{
                width: 56, height: 56, borderRadius: "50%",
                background: `rgba(129,216,208,0.22)`,
                border: `2px solid ${theme.tiffany}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0,
                boxShadow: `0 0 ${circleGlow}px rgba(129,216,208,0.25)`,
                zIndex: 1,
                position: "relative" as const,
              }}>
                <div style={{
                  fontSize: 28, fontWeight: 900, color: theme.tiffany,
                  fontFamily: theme.font,
                }}>
                  {step.step}
                </div>
              </div>

              {/* 내용 */}
              <div style={{
                flex: 1,
                background: `rgba(255,255,255,0.20)`,
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: 12,
                padding: "16px 28px",
              }}>
                <div style={{
                  fontSize: 32, fontWeight: 800, color: theme.white,
                  fontFamily: theme.font, marginBottom: 6,
                }}>
                  {step.title}
                </div>
                <div style={{
                  fontSize: 24, color: theme.grayLight,
                  fontFamily: theme.font, fontWeight: 500,
                  lineHeight: 1.45,
                }}>
                  {step.description}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
