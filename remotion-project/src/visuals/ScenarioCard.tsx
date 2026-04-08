import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { theme } from "../styles/theme";
import { useSceneTheme } from "../contexts/SceneTheme";

interface Scenario {
  label: string;
  icon?: string;
  condition?: string;
  outcome?: string;
  value?: string;
  description?: string;
  probability?: string;
  color?: string;
}

interface Props {
  data: {
    title: string;
    scenarios: Scenario[];
  };
  durationFrames: number;
}

const DEFAULT_COLORS = ["#81D8D0", "#FFB347", "#FF6B6B"];

export const ScenarioCard: React.FC<Props> = ({ data, durationFrames }) => {
  const theme = useSceneTheme();
  const frame = useCurrentFrame();
  if (!data) return null;
  const { fps } = useVideoConfig();

  const titleProgress = spring({ frame, fps, config: { damping: 100, stiffness: 10 } });
  const interval = Math.min((durationFrames * 0.6) / ((data.scenarios ?? []).length + 1), 18);

  const glowPulse = (Math.sin(frame * 0.04) + 1) / 2;

  return (
    <div style={{
      width: "100%", height: "100%",
      display: "flex", flexDirection: "column",
      justifyContent: "center", padding: "60px 100px", gap: 32,
    }}>
      <div style={{
        fontSize: 44, fontWeight: 900, color: theme.white,
        fontFamily: theme.font, textAlign: "center" as const,
        textShadow: theme.textShadow.medium,
        opacity: Math.min(1, titleProgress),
        transform: `translateY(${interpolate(Math.min(1, titleProgress), [0, 1], [-20, 0])}px)`,
      }}>
        {data.title}
      </div>

      <div style={{
        display: "flex",
        gap: 24,
        alignItems: "stretch",
      }}>
        {(data.scenarios ?? []).map((sc, i) => {
          const startFrame = Math.round(interval * (i + 1));
          const p = spring({ frame: frame - startFrame, fps, config: { damping: 100, stiffness: 5 } });
          const settled = Math.max(0, frame - (startFrame + 20));
          const pulse = (Math.sin(settled * 0.05 + i * 1.2) + 1) / 2;

          const color = sc.color ?? DEFAULT_COLORS[i % DEFAULT_COLORS.length];
          const borderAlpha = 0.3 + pulse * 0.3;

          return (
            <div key={i} style={{
              flex: 1,
              display: "flex", flexDirection: "column",
              gap: 16,
              padding: "28px 28px",
              background: `${color}22`,
              border: `1px solid ${color}${Math.round(borderAlpha * 255).toString(16).padStart(2, "0")}`,
              borderTop: `3px solid ${color}`,
              borderRadius: 16,
              opacity: Math.min(1, p),
              transform: `translateY(${interpolate(Math.min(1, p), [0, 1], [40, 0])}px)`,
              boxShadow: `0 0 ${12 + pulse * 12}px ${color}12`,
              position: "relative" as const,
            }}>
              {/* 확률 배지 */}
              {sc.probability && (
                <div style={{
                  position: "absolute" as const,
                  top: -14, right: 20,
                  background: color,
                  color: theme.bg,
                  fontSize: 24, fontWeight: 900,
                  fontFamily: theme.font,
                  padding: "4px 14px", borderRadius: 20,
                }}>
                  {sc.probability}
                </div>
              )}

              {/* 아이콘 + 레이블 */}
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ fontSize: 36, fontFamily: theme.font }}>{sc.icon}</span>
                <div style={{
                  fontSize: 34, fontWeight: 900, color,
                  fontFamily: theme.font,
                  textShadow: theme.textShadow.medium,
                }}>
                  {sc.label}
                </div>
              </div>

              {/* 조건 */}
              <div style={{
                fontSize: 32, color: theme.grayLight,
                fontFamily: theme.font, fontWeight: 500,
                lineHeight: 1.45,
                textShadow: theme.textShadow.medium,
                borderLeft: `3px solid ${color}60`,
                paddingLeft: 12,
              }}>
                {sc.condition ?? sc.value ?? ""}
              </div>

              {/* 결과 */}
              <div style={{
                fontSize: 30, fontWeight: 700, color: theme.white,
                fontFamily: theme.font, lineHeight: 1.4,
                textShadow: theme.textShadow.medium,
              }}>
                → {sc.outcome ?? sc.description ?? ""}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
