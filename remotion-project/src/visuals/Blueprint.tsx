import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { useSceneTheme } from "../contexts/SceneTheme";

interface Props {
  data: {
    title: string;
    components: Array<{ name: string; detail?: string }>;
    note?: string;
  };
}

export const Blueprint: React.FC<Props> = ({ data }) => {
  const theme = useSceneTheme();
  const frame = useCurrentFrame();
  if (!data) return null;
  const titleOp = interpolate(frame, [0, 14], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

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
        zIndex: 3, padding: "0 180px",
      }}>
        {/* 제목 */}
        <div style={{
          fontSize: 52, fontWeight: 900, color: "#fff",
          fontFamily: theme.font, marginBottom: 12, opacity: titleOp,
          textShadow: "0 0 20px rgba(100,180,255,0.4)",
          letterSpacing: 2,
        }}>
          {data.title}
        </div>
        <div style={{
          width: 300, height: 2, background: "rgba(255,255,255,0.3)",
          marginBottom: 40, opacity: titleOp,
        }} />

        {/* 컴포넌트 목록 */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 700, width: "100%", alignSelf: "center" }}>
          {(data.components ?? []).map((comp, i) => {
            const delay = 10 + i * 10;
            const drawW = interpolate(frame, [delay, delay + 12], [0, 100], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
            const textOp = interpolate(frame, [delay + 6, delay + 14], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
            return (
              <div key={i} style={{
                display: "flex", alignItems: "center", gap: 20,
              }}>
                {/* 선 그리기 효과 */}
                <div style={{
                  width: 60, height: 60,
                  border: "2px solid rgba(255,255,255,0.6)",
                  borderRadius: 8, flexShrink: 0,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  clipPath: `inset(0 ${100 - drawW}% 0 0)`,
                }}>
                  <span style={{
                    fontSize: 28, fontWeight: 900, color: "rgba(100,180,255,0.9)",
                    fontFamily: theme.font, opacity: textOp,
                  }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <div style={{ opacity: textOp }}>
                  <div style={{
                    fontSize: 34, fontWeight: 800, color: "#fff",
                    fontFamily: theme.font, lineHeight: 1.3,
                  }}>
                    {comp.name}
                  </div>
                  {comp.detail && (
                    <div style={{
                      fontSize: 24, fontWeight: 500, color: "rgba(150,200,255,0.7)",
                      fontFamily: theme.font, marginTop: 4,
                    }}>
                      {comp.detail}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* 메모 */}
        {data.note && (
          <div style={{
            marginTop: 36, fontSize: 32, fontWeight: 700,
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
