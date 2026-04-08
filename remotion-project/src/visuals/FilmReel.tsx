import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { useSceneTheme } from "../contexts/SceneTheme";

interface Props {
  data: {
    title: string;
    frames: Array<{ label: string; detail?: string; year?: string }>;
    note?: string;
  };
}

export const FilmReel: React.FC<Props> = ({ data }) => {
  const theme = useSceneTheme();
  const frame = useCurrentFrame();
  if (!data) return null;
  const titleOp = interpolate(frame, [0, 14], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const n = (data.frames ?? []).length;
  const filmW = 280, filmH = 340, gap = 24;
  const totalW = n * filmW + (n - 1) * gap;
  const startX = (1920 - totalW) / 2;

  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      {/* Dark overlay */}
      <div style={{
        position: "absolute", top: 0, bottom: 0, left: 0, right: 0,
        background: "rgba(10,10,10,0.50)", zIndex: 2,
      }} />

      <div style={{
        position: "absolute", top: 0, bottom: 0, left: 0, right: 0,
        zIndex: 3,
      }}>
        {/* Title */}
        <div style={{
          fontSize: 48, fontWeight: 900, color: "#fff",
          fontFamily: theme.font, textAlign: "center",
          marginTop: 60, opacity: titleOp,
          textShadow: "0 0 16px rgba(255,200,100,0.3)",
          letterSpacing: 1,
        }}>
          {data.title}
        </div>

        {/* Film strip */}
        <div style={{
          position: "absolute", top: 280, left: 0, right: 0,
          height: filmH + 60,
        }}>
          {/* Top sprocket holes */}
          <div style={{
            position: "absolute", top: 0, left: startX - 20, width: totalW + 40, height: 30,
            display: "flex", gap: 36, justifyContent: "center", alignItems: "center",
            opacity: interpolate(frame, [4, 14], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
          }}>
            {Array.from({ length: Math.floor(totalW / 50) }).map((_, i) => (
              <div key={i} style={{
                width: 18, height: 14, borderRadius: 3,
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.12)",
              }} />
            ))}
          </div>

          {/* Bottom sprocket holes */}
          <div style={{
            position: "absolute", bottom: 0, left: startX - 20, width: totalW + 40, height: 30,
            display: "flex", gap: 36, justifyContent: "center", alignItems: "center",
            opacity: interpolate(frame, [4, 14], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
          }}>
            {Array.from({ length: Math.floor(totalW / 50) }).map((_, i) => (
              <div key={i} style={{
                width: 18, height: 14, borderRadius: 3,
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.12)",
              }} />
            ))}
          </div>

          {/* Film frames */}
          {(data.frames ?? []).map((f, i) => {
            const delay = 10 + i * 10;
            const frameOp = interpolate(frame, [delay, delay + 10], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
            const frameScale = interpolate(frame, [delay, delay + 10], [0.9, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
            const x = startX + i * (filmW + gap);

            return (
              <div key={i} style={{
                position: "absolute",
                left: x, top: 30,
                width: filmW, height: filmH,
                background: "rgba(30,25,20,0.9)",
                border: "2px solid rgba(255,200,100,0.25)",
                borderRadius: 6,
                padding: "24px 20px",
                display: "flex", flexDirection: "column",
                justifyContent: "center", alignItems: "center",
                gap: 12,
                opacity: frameOp,
                transform: `scale(${frameScale})`,
                boxShadow: "inset 0 0 30px rgba(255,200,100,0.04)",
              }}>
                {f.year && (
                  <div style={{
                    fontSize: 22, fontWeight: 700, color: "rgba(255,200,100,0.7)",
                    fontFamily: theme.font, letterSpacing: 1,
                  }}>
                    {f.year}
                  </div>
                )}
                <div style={{
                  fontSize: 28, fontWeight: 800, color: "#fff",
                  fontFamily: theme.font, textAlign: "center",
                  lineHeight: 1.3,
                  textShadow: "0 0 8px rgba(255,200,100,0.2)",
                }}>
                  {f.label}
                </div>
                {f.detail && (
                  <div style={{
                    fontSize: 22, fontWeight: 500, color: "rgba(255,255,255,0.55)",
                    fontFamily: theme.font, textAlign: "center",
                    lineHeight: 1.4,
                  }}>
                    {f.detail}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Note */}
        {data.note && (
          <div style={{
            position: "absolute", top: 130, left: 0, right: 0,
            textAlign: "center", zIndex: 4,
            fontSize: 26, fontWeight: 700,
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
