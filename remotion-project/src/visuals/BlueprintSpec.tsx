import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { useSceneTheme } from "../contexts/SceneTheme";

interface Props {
  data: {
    title: string;
    subtitle?: string;
    specs: Array<{ label: string; value: string; unit?: string }>;
    note?: string;
  };
}

export const BlueprintSpec: React.FC<Props> = ({ data }) => {
  const theme = useSceneTheme();
  const frame = useCurrentFrame();
  if (!data) return null;
  const titleOp = interpolate(frame, [0, 14], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const n = (data.specs ?? []).length;
  const cols = n <= 4 ? 2 : 3;

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
        zIndex: 3, padding: "40px 140px",
      }}>
        {/* 제목 */}
        <div style={{
          fontSize: 48, fontWeight: 900, color: "#fff",
          fontFamily: theme.font, marginBottom: 8, opacity: titleOp,
          textShadow: "0 0 20px rgba(100,180,255,0.4)",
          letterSpacing: 2,
        }}>
          {data.title}
        </div>
        {data.subtitle && (
          <div style={{
            fontSize: 26, fontWeight: 600, color: "rgba(150,200,255,0.6)",
            fontFamily: theme.font, marginBottom: 12, opacity: titleOp,
          }}>
            {data.subtitle}
          </div>
        )}
        <div style={{
          width: 300, height: 2, background: "rgba(255,255,255,0.3)",
          marginBottom: 36, opacity: titleOp,
        }} />

        {/* 스펙 그리드 */}
        <div style={{
          display: "flex", flexWrap: "wrap" as const, gap: 16,
          justifyContent: "center", maxWidth: 1000,
        }}>
          {(data.specs ?? []).map((spec, i) => {
            const delay = 12 + i * 8;
            const cardOp = interpolate(frame, [delay, delay + 10], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
            const drawW = interpolate(frame, [delay, delay + 10], [0, 100], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
            const cellWidth = cols === 2 ? 460 : 300;
            return (
              <div key={i} style={{
                width: cellWidth, padding: "20px 24px",
                background: "rgba(100,180,255,0.06)",
                border: "1px solid rgba(100,180,255,0.2)",
                borderRadius: 10, opacity: cardOp,
                clipPath: `inset(0 ${100 - drawW}% 0 0)`,
              }}>
                <div style={{
                  fontSize: 22, fontWeight: 700, color: "rgba(200,225,255,0.9)",
                  fontFamily: theme.font, marginBottom: 8,
                  textTransform: "uppercase" as const, letterSpacing: 1,
                }}>
                  {spec.label}
                </div>
                <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
                  <span style={{
                    fontSize: 38, fontWeight: 900, color: "#fff",
                    fontFamily: theme.font,
                    textShadow: "0 0 10px rgba(100,180,255,0.3)",
                  }}>
                    {spec.value}
                  </span>
                  {spec.unit && (
                    <span style={{
                      fontSize: 24, fontWeight: 600, color: "rgba(150,200,255,0.7)",
                      fontFamily: theme.font,
                    }}>
                      {spec.unit}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* 메모 */}
        {data.note && (
          <div style={{
            marginTop: 32, fontSize: 28, fontWeight: 700,
            color: "rgba(255,200,100,0.85)", fontFamily: theme.font,
            fontStyle: "italic" as const,
            opacity: interpolate(frame, [50, 60], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
          }}>
            * {data.note}
          </div>
        )}
      </div>
    </div>
  );
};
