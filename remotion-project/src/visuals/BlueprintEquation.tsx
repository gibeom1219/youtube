import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { useSceneTheme } from "../contexts/SceneTheme";

interface Props {
  data: {
    title: string;
    equation: string;
    variables: Array<{ symbol: string; name: string; detail?: string }>;
    result?: string;
    note?: string;
  };
}

export const BlueprintEquation: React.FC<Props> = ({ data }) => {
  const theme = useSceneTheme();
  const frame = useCurrentFrame();
  if (!data) return null;
  const titleOp = interpolate(frame, [0, 14], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const eqOp = interpolate(frame, [10, 24], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const eqScale = interpolate(frame, [10, 24], [0.9, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      {/* 청사진 배경 */}
      <div style={{
        position: "absolute", top: 0, bottom: 0, left: 0, right: 0,
        background: "rgba(20,60,100,0.35)", zIndex: 2,
        backgroundImage: `
          linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)
        `,
        backgroundSize: "40px 40px",
      }} />

      <div style={{
        position: "absolute", top: 0, bottom: 0, left: 0, right: 0,
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        zIndex: 3, padding: "40px 120px",
      }}>
        {/* 제목 */}
        <div style={{
          fontSize: 48, fontWeight: 900, color: "#fff",
          fontFamily: theme.font, marginBottom: 12, opacity: titleOp,
          textShadow: "0 0 20px rgba(100,180,255,0.4)",
          letterSpacing: 2,
        }}>
          {data.title}
        </div>
        <div style={{
          width: 300, height: 2, background: "rgba(255,255,255,0.3)",
          marginBottom: 36, opacity: titleOp,
        }} />

        {/* 공식 */}
        <div style={{
          fontSize: 56, fontWeight: 900, color: "rgba(100,180,255,0.95)",
          fontFamily: theme.font, marginBottom: 40,
          opacity: eqOp, transform: `scale(${eqScale})`,
          textShadow: "0 0 24px rgba(100,180,255,0.4)",
          letterSpacing: 4,
        }}>
          {data.equation}
        </div>

        {/* 변수 카드들 */}
        <div style={{
          display: "flex", gap: 24, flexWrap: "wrap" as const,
          justifyContent: "center", maxWidth: 1200,
        }}>
          {(data.variables ?? []).map((v, i) => {
            const delay = 22 + i * 10;
            const cardOp = interpolate(frame, [delay, delay + 10], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
            const cardSlide = interpolate(frame, [delay, delay + 12], [20, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
            return (
              <div key={i} style={{
                padding: "20px 28px", borderRadius: 12,
                background: "rgba(100,180,255,0.08)",
                border: "1px solid rgba(100,180,255,0.25)",
                opacity: cardOp,
                transform: `translateY(${cardSlide}px)`,
                minWidth: 200, textAlign: "center",
              }}>
                <div style={{
                  fontSize: 36, fontWeight: 900, color: "rgba(100,180,255,0.9)",
                  fontFamily: theme.font, marginBottom: 8,
                }}>
                  {v.symbol}
                </div>
                <div style={{
                  fontSize: 28, fontWeight: 700, color: "#fff",
                  fontFamily: theme.font, marginBottom: 4,
                }}>
                  {v.name}
                </div>
                {v.detail && (
                  <div style={{
                    fontSize: 22, fontWeight: 500, color: "rgba(150,200,255,0.7)",
                    fontFamily: theme.font,
                  }}>
                    {v.detail}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* 결과 */}
        {data.result && (
          <div style={{
            marginTop: 32, padding: "14px 36px", borderRadius: 10,
            background: "rgba(255,200,100,0.12)",
            border: "1px solid rgba(255,200,100,0.3)",
            fontSize: 30, fontWeight: 800, color: "rgba(255,200,100,0.9)",
            fontFamily: theme.font,
            opacity: interpolate(frame, [50, 60], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
          }}>
            = {data.result}
          </div>
        )}

        {/* 메모 */}
        {data.note && (
          <div style={{
            marginTop: 24, fontSize: 26, fontWeight: 700,
            color: "rgba(255,200,100,0.85)", fontFamily: theme.font,
            fontStyle: "italic" as const,
            opacity: interpolate(frame, [55, 65], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
          }}>
            * {data.note}
          </div>
        )}
      </div>
    </div>
  );
};
