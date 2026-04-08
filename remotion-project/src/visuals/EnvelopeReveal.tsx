import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { useSceneTheme } from "../contexts/SceneTheme";

interface Props {
  data: {
    title: string;
    category?: string;
    result: string;
    detail?: string;
    verdict?: "positive" | "negative" | "neutral";
    note?: string;
  };
}

export const EnvelopeReveal: React.FC<Props> = ({ data }) => {
  const theme = useSceneTheme();
  const frame = useCurrentFrame();
  if (!data) return null;

  const titleOp = interpolate(frame, [0, 14], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const envelopeOp = interpolate(frame, [8, 20], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const flapAngle = interpolate(frame, [20, 50], [0, 180], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const cardSlide = interpolate(frame, [45, 75], [0, -200], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const cardOp = interpolate(frame, [45, 60], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const resultOp = interpolate(frame, [70, 85], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const resultScale = interpolate(frame, [70, 85], [0.8, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const verdictColor = data.verdict === "positive" ? "#52D68A"
    : data.verdict === "negative" ? "#FF6B6B"
    : "#FFB347";

  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      {/* Dark overlay */}
      <div style={{
        position: "absolute", top: 0, bottom: 0, left: 0, right: 0,
        background: "rgba(10,10,10,0.50)", zIndex: 2,
      }} />

      <div style={{
        position: "absolute", top: 0, bottom: 0, left: 0, right: 0,
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        zIndex: 3,
      }}>
        {/* Title */}
        <div style={{
          fontSize: 44, fontWeight: 900, color: "#fff",
          fontFamily: theme.font, marginBottom: 40, opacity: titleOp,
          textShadow: "0 0 16px rgba(255,200,100,0.3)",
          letterSpacing: 1,
        }}>
          {data.title}
        </div>

        {/* Envelope */}
        <div style={{
          position: "relative", width: 600, height: 360,
          opacity: envelopeOp,
        }}>
          {/* Envelope body */}
          <div style={{
            position: "absolute", bottom: 0, left: 0, right: 0,
            height: 260,
            background: "linear-gradient(180deg, #d4a574 0%, #c4956a 100%)",
            borderRadius: "0 0 12px 12px",
            boxShadow: "0 8px 30px rgba(0,0,0,0.5)",
            zIndex: 2,
          }} />

          {/* Envelope flap */}
          <div style={{
            position: "absolute", top: 0, left: 0, right: 0,
            height: 180,
            transformOrigin: "top center",
            transform: `perspective(600px) rotateX(${Math.min(flapAngle, 180)}deg)`,
            zIndex: flapAngle > 90 ? 0 : 3,
          }}>
            <div style={{
              width: 0, height: 0,
              borderLeft: "300px solid transparent",
              borderRight: "300px solid transparent",
              borderTop: "180px solid #c4956a",
              filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.2))",
            }} />
          </div>

          {/* Card sliding out */}
          <div style={{
            position: "absolute", left: 40, right: 40,
            top: 60 + cardSlide,
            background: "#fff", borderRadius: 8,
            padding: "36px 40px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
            zIndex: 1, opacity: cardOp,
            display: "flex", flexDirection: "column",
            alignItems: "center", gap: 16,
          }}>
            {data.category && (
              <div style={{
                fontSize: 20, fontWeight: 700, color: "#999",
                fontFamily: theme.font, letterSpacing: 2,
                textTransform: "uppercase" as const,
              }}>
                {data.category}
              </div>
            )}

            {/* Result */}
            <div style={{
              fontSize: 48, fontWeight: 900, color: verdictColor,
              fontFamily: theme.font,
              opacity: resultOp,
              transform: `scale(${resultScale})`,
              textShadow: `0 0 16px ${verdictColor}40`,
            }}>
              {data.result}
            </div>

            {data.detail && (
              <div style={{
                fontSize: 26, fontWeight: 600, color: "#555",
                fontFamily: theme.font, textAlign: "center",
                opacity: resultOp, lineHeight: 1.4,
              }}>
                {data.detail}
              </div>
            )}
          </div>
        </div>

        {/* Note */}
        {data.note && (
          <div style={{
            marginTop: 36, fontSize: 26, fontWeight: 700,
            color: "rgba(255,200,100,0.85)", fontFamily: theme.font,
            fontStyle: "italic" as const,
            opacity: interpolate(frame, [80, 90], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
          }}>
            * {data.note}
          </div>
        )}
      </div>
    </div>
  );
};
