import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { useSceneTheme } from "../contexts/SceneTheme";

interface Props {
  data: {
    title: string;
    subject: string;
    parts: Array<{ label: string; detail?: string }>;
    note?: string;
  };
}

export const BlueprintAnatomy: React.FC<Props> = ({ data }) => {
  const theme = useSceneTheme();
  const frame = useCurrentFrame();
  if (!data) return null;
  const titleOp = interpolate(frame, [0, 14], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const subjectOp = interpolate(frame, [8, 20], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const subjectScale = interpolate(frame, [8, 22], [0.8, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const cx = 960, cy = 500;
  const n = (data.parts ?? []).length;
  const r = 280;

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
        zIndex: 3,
      }}>
        {/* 제목 */}
        <div style={{
          fontSize: 48, fontWeight: 900, color: "#fff",
          fontFamily: theme.font, textAlign: "center",
          marginTop: 50, opacity: titleOp,
          textShadow: "0 0 20px rgba(100,180,255,0.4)",
          letterSpacing: 2,
        }}>
          {data.title}
        </div>

        {/* 중앙 주제 */}
        <div style={{
          position: "absolute", left: cx - 110, top: cy - 55,
          width: 220, height: 110, borderRadius: 16,
          background: "rgba(100,180,255,0.15)",
          border: "2px solid rgba(100,180,255,0.5)",
          display: "flex", alignItems: "center", justifyContent: "center",
          opacity: subjectOp, transform: `scale(${subjectScale})`,
          boxShadow: "0 0 24px rgba(100,180,255,0.2)",
        }}>
          <span style={{
            fontSize: 34, fontWeight: 900, color: "#fff",
            fontFamily: theme.font, textAlign: "center",
            textShadow: "0 0 12px rgba(100,180,255,0.5)",
          }}>
            {data.subject}
          </span>
        </div>

        {/* SVG 주석선 */}
        <svg style={{ position: "absolute", top: 0, left: 0, width: 1920, height: 1080, pointerEvents: "none", zIndex: 3 }}>
          {(data.parts ?? []).map((_, i) => {
            const angle = (Math.PI * 2 * i) / n - Math.PI / 2;
            const nx = cx + Math.cos(angle) * r;
            const ny = cy + Math.sin(angle) * r;
            const delay = 16 + i * 10;
            const lineOp = interpolate(frame, [delay, delay + 10], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
            const lineLen = interpolate(frame, [delay, delay + 10], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
            const midX = cx + Math.cos(angle) * 130;
            const midY = cy + Math.sin(angle) * 60;
            return (
              <g key={i} opacity={lineOp}>
                <line
                  x1={midX} y1={midY}
                  x2={midX + (nx - midX) * lineLen} y2={midY + (ny - midY) * lineLen}
                  stroke="rgba(100,180,255,0.5)" strokeWidth={1.5}
                  strokeDasharray="6 4"
                />
                <circle cx={nx} cy={ny} r={4} fill="rgba(100,180,255,0.8)" />
              </g>
            );
          })}
        </svg>

        {/* 방사형 주석 카드 */}
        {(data.parts ?? []).map((part, i) => {
          const angle = (Math.PI * 2 * i) / n - Math.PI / 2;
          const nx = cx + Math.cos(angle) * r;
          const ny = cy + Math.sin(angle) * r;
          const delay = 18 + i * 10;
          const partOp = interpolate(frame, [delay, delay + 10], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
          const isRight = nx > cx;

          return (
            <div key={i} style={{
              position: "absolute",
              left: isRight ? nx + 10 : nx - 250,
              top: ny - 30,
              width: 240, opacity: partOp, zIndex: 4,
            }}>
              <div style={{
                fontSize: 28, fontWeight: 800, color: "#fff",
                fontFamily: theme.font, lineHeight: 1.3,
                textAlign: isRight ? "left" : "right",
                textShadow: "0 0 10px rgba(100,180,255,0.3)",
              }}>
                {part.label}
              </div>
              {part.detail && (
                <div style={{
                  fontSize: 22, fontWeight: 500, color: "rgba(150,200,255,0.7)",
                  fontFamily: theme.font, marginTop: 4,
                  textAlign: isRight ? "left" : "right",
                }}>
                  {part.detail}
                </div>
              )}
            </div>
          );
        })}

        {/* 메모 (제목 아래) */}
        {data.note && (
          <div style={{
            position: "absolute", top: 110, left: 0, right: 0,
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
