import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { useSceneTheme } from "../contexts/SceneTheme";

interface Props {
  data: {
    title?: string;
    scenarios: Array<{
      label: string;
      color: string;
      description: string;
      probability?: string;
    }>;
  };
}

export const WhiteScenario: React.FC<Props> = ({ data }) => {
  const theme = useSceneTheme();
  const frame = useCurrentFrame();
  if (!data) return null;

  const titleOpacity = interpolate(frame, [0, 14], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      <div style={{
        position: "absolute", top: 140, bottom: 200, left: 180, right: 180,
        display: "flex", flexDirection: "column",
        zIndex: 3,
      }}>
        {data.title && (
          <div style={{
            fontSize: 48, fontWeight: 900, color: "#000",
            fontFamily: theme.font, marginBottom: 32,
            opacity: titleOpacity, letterSpacing: -1,
            textAlign: "center",
          }}>
            {data.title}
          </div>
        )}

        {/* 시나리오 카드들 */}
        <div style={{
          flex: 1, display: "flex", gap: 32,
          alignItems: "flex-start",
        }}>
          {(data.scenarios ?? []).map((scenario, i) => {
            const delay = 8 + i * 10;
            const cardOpacity = interpolate(frame, [delay, delay + 12], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
            const cardSlide = interpolate(frame, [delay, delay + 14], [30, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

            return (
              <div key={i} style={{
                flex: 1,
                opacity: cardOpacity,
                transform: `translateY(${cardSlide}px)`,
                display: "flex", flexDirection: "column",
                borderRadius: 12,
                overflow: "hidden",
                background: "rgba(255,255,255,0.5)",
                border: "1px solid rgba(0,0,0,0.08)",
              }}>
                {/* 헤더 */}
                <div style={{
                  background: scenario.color,
                  padding: "16px 24px",
                  display: "flex", alignItems: "center",
                  justifyContent: "space-between",
                }}>
                  <span style={{
                    fontSize: 28, fontWeight: 800, color: "white",
                    fontFamily: theme.font,
                  }}>
                    {scenario.label}
                  </span>
                  {scenario.probability && (
                    <span style={{
                      fontSize: 22, fontWeight: 700, color: "rgba(255,255,255,0.9)",
                      fontFamily: theme.font,
                    }}>
                      {scenario.probability}
                    </span>
                  )}
                </div>

                {/* 설명 */}
                <div style={{
                  padding: "20px 24px",
                  fontSize: 26, fontWeight: 600, color: "#222",
                  fontFamily: theme.font, lineHeight: 1.6,
                }}>
                  {scenario.description}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
