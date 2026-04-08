import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { useSceneTheme } from "../contexts/SceneTheme";

interface Props {
  data: {
    name: string;
    charges: string[];
    reward: string;
    description?: string;
  };
}

export const WantedPoster: React.FC<Props> = ({ data }) => {
  const theme = useSceneTheme();
  const frame = useCurrentFrame();
  if (!data) return null;

  const posterOp = interpolate(frame, [0, 14], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const slamScale = interpolate(frame, [0, 6], [1.3, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      <div style={{
        position: "absolute", top: 0, bottom: 0, left: 0, right: 0,
        display: "flex", alignItems: "center", justifyContent: "center",
        zIndex: 3,
      }}>
        <div style={{
          width: 750, padding: "48px 56px",
          background: "#f5e6c8",
          borderRadius: 4,
          boxShadow: "0 8px 40px rgba(0,0,0,0.5), inset 0 0 80px rgba(139,90,43,0.15)",
          opacity: posterOp,
          transform: `scale(${slamScale})`,
          border: "3px solid #8b5a2b",
        }}>
          {/* WANTED */}
          <div style={{
            textAlign: "center", marginBottom: 20,
            borderBottom: "3px double #8b5a2b", paddingBottom: 16,
          }}>
            <div style={{
              fontSize: 64, fontWeight: 900, color: "#8b0000",
              fontFamily: "'NotoSansKR', serif",
              letterSpacing: 12, textTransform: "uppercase" as const,
            }}>
              WANTED
            </div>
          </div>

          {/* 이름 */}
          <div style={{
            textAlign: "center", marginBottom: 24,
            borderBottom: "2px solid #c9a96e", paddingBottom: 20,
          }}>
            <div style={{
              fontSize: 52, fontWeight: 900, color: "#2c1810",
              fontFamily: theme.font, lineHeight: 1.3,
            }}>
              {data.name}
            </div>
            {data.description && (
              <div style={{
                fontSize: 24, fontWeight: 600, color: "#6b4226",
                fontFamily: theme.font, marginTop: 8,
              }}>
                {data.description}
              </div>
            )}
          </div>

          {/* 혐의 */}
          <div style={{ marginBottom: 24 }}>
            <div style={{
              fontSize: 22, fontWeight: 800, color: "#8b5a2b",
              fontFamily: theme.font, marginBottom: 12, letterSpacing: 2,
              textAlign: "center",
            }}>
              혐 의
            </div>
            {(data.charges ?? []).map((charge, i) => {
              const delay = 14 + i * 8;
              const op = interpolate(frame, [delay, delay + 6], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
              return (
                <div key={i} style={{
                  fontSize: 28, fontWeight: 700, color: "#3c2415",
                  fontFamily: theme.font, textAlign: "center",
                  marginBottom: 6, opacity: op,
                }}>
                  • {charge}
                </div>
              );
            })}
          </div>

          {/* 현상금 */}
          <div style={{
            textAlign: "center", padding: "16px 0",
            borderTop: "3px double #8b5a2b",
            opacity: interpolate(frame, [36, 44], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
          }}>
            <div style={{ fontSize: 22, fontWeight: 700, color: "#8b5a2b", fontFamily: theme.font, letterSpacing: 2 }}>
              현 상 금
            </div>
            <div style={{
              fontSize: 48, fontWeight: 900, color: "#8b0000",
              fontFamily: theme.font, marginTop: 4,
            }}>
              {data.reward}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
