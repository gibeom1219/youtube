import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { useSceneTheme } from "../contexts/SceneTheme";

const LAYER_COLORS = [
  "rgba(100,180,255,0.20)",
  "rgba(80,160,240,0.18)",
  "rgba(60,140,220,0.16)",
  "rgba(50,120,200,0.14)",
  "rgba(40,100,180,0.12)",
  "rgba(30,80,160,0.10)",
];

interface Props {
  data: {
    title: string;
    layers: Array<{ name: string; detail?: string }>;
    note?: string;
  };
}

export const BlueprintCrossSection: React.FC<Props> = ({ data }) => {
  const theme = useSceneTheme();
  const frame = useCurrentFrame();
  if (!data) return null;
  const titleOp = interpolate(frame, [0, 14], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const n = (data.layers ?? []).length;
  const layerHeight = Math.min(100, 600 / n);

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
        zIndex: 3, padding: "40px 160px",
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

        {/* 레이어 스택 */}
        <div style={{
          display: "flex", flexDirection: "column", gap: 0,
          maxWidth: 900, width: "100%",
        }}>
          {(data.layers ?? []).map((layer, i) => {
            const delay = 10 + i * 10;
            const layerOp = interpolate(frame, [delay, delay + 10], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
            const slideX = interpolate(frame, [delay, delay + 12], [i % 2 === 0 ? -40 : 40, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
            const bgColor = LAYER_COLORS[i % LAYER_COLORS.length];
            const isTop = i === 0;
            const isBottom = i === n - 1;

            return (
              <div key={i} style={{
                display: "flex", alignItems: "center",
                height: layerHeight,
                background: bgColor,
                borderTop: isTop ? "2px solid rgba(100,180,255,0.4)" : "1px solid rgba(100,180,255,0.15)",
                borderBottom: isBottom ? "2px solid rgba(100,180,255,0.4)" : "none",
                borderLeft: "2px solid rgba(100,180,255,0.4)",
                borderRight: "2px solid rgba(100,180,255,0.4)",
                borderRadius: isTop ? "12px 12px 0 0" : isBottom ? "0 0 12px 12px" : 0,
                opacity: layerOp,
                transform: `translateX(${slideX}px)`,
                padding: "0 32px",
                gap: 20,
              }}>
                {/* 레이어 번호 */}
                <div style={{
                  width: 44, height: 44, borderRadius: 8,
                  border: "1.5px solid rgba(100,180,255,0.5)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0,
                }}>
                  <span style={{
                    fontSize: 22, fontWeight: 900, color: "rgba(100,180,255,0.9)",
                    fontFamily: theme.font,
                  }}>
                    L{i + 1}
                  </span>
                </div>

                {/* 이름 */}
                <div style={{
                  fontSize: 30, fontWeight: 800, color: "#fff",
                  fontFamily: theme.font, flex: 1,
                  textShadow: "0 0 10px rgba(100,180,255,0.3)",
                }}>
                  {layer.name}
                </div>

                {/* 설명 */}
                {layer.detail && (
                  <div style={{
                    fontSize: 24, fontWeight: 500, color: "rgba(150,200,255,0.7)",
                    fontFamily: theme.font, textAlign: "right",
                  }}>
                    {layer.detail}
                  </div>
                )}
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
