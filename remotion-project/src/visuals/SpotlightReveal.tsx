import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { useSceneTheme } from "../contexts/SceneTheme";

interface Props {
  data: {
    title?: string;
    facts: Array<{
      text: string;
      icon?: string;
    }>;
  };
}

export const SpotlightReveal: React.FC<Props> = ({ data }) => {
  const theme = useSceneTheme();
  const frame = useCurrentFrame();
  if (!data) return null;

  const titleOpacity = interpolate(frame, [0, 14], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      {/* 어두운 오버레이 */}
      <div style={{
        position: "absolute", inset: 0,
        background: "rgba(0,0,0,0.75)",
        zIndex: 1,
      }} />

      {/* 스포트라이트들 */}
      {(data.facts ?? []).map((fact, i) => {
        const delay = 10 + i * 14;
        const spotOpacity = interpolate(frame, [delay, delay + 8], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

        // 위치를 분산 배치
        const positions = [
          { x: 380, y: 340 },
          { x: 960, y: 300 },
          { x: 1540, y: 360 },
          { x: 650, y: 620 },
          { x: 1250, y: 640 },
        ];
        const pos = positions[i % positions.length];

        return (
          <React.Fragment key={i}>
            {/* 스포트라이트 빛 */}
            <div style={{
              position: "absolute",
              left: pos.x - 200, top: pos.y - 120,
              width: 400, height: 240,
              borderRadius: "50%",
              background: "radial-gradient(ellipse, rgba(255,255,255,0.15) 0%, transparent 70%)",
              opacity: spotOpacity,
              zIndex: 2,
            }} />
          </React.Fragment>
        );
      })}

      {/* 콘텐츠 */}
      <div style={{
        position: "absolute", inset: 0,
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        padding: "0 200px", gap: 20,
        zIndex: 3,
      }}>
        {data.title && (
          <div style={{
            fontSize: 48, fontWeight: 900, color: "#fff",
            fontFamily: theme.font, marginBottom: 24,
            opacity: titleOpacity, letterSpacing: -1,
            textShadow: "0 0 40px rgba(255,255,255,0.3)",
          }}>
            {data.title}
          </div>
        )}

        {(data.facts ?? []).map((fact, i) => {
          const delay = 10 + i * 14;
          const factOpacity = interpolate(frame, [delay, delay + 10], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
          const factScale = interpolate(frame, [delay, delay + 12], [0.9, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
          const glowPulse = interpolate(Math.sin(frame * 0.05 + i), [-1, 1], [0.7, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

          return (
            <div key={i} style={{
              display: "flex", alignItems: "center", gap: 20,
              opacity: factOpacity * glowPulse,
              transform: `scale(${factScale})`,
              padding: "16px 32px",
              background: "rgba(255,255,255,0.05)",
              borderRadius: 12,
              border: "1px solid rgba(255,255,255,0.1)",
            }}>
              {fact.icon && (
                <span style={{ fontSize: 36, fontFamily: theme.font }}>{fact.icon}</span>
              )}
              <span style={{
                fontSize: 34, fontWeight: 700, color: "#fff",
                fontFamily: theme.font, lineHeight: 1.4,
                textShadow: "0 0 20px rgba(255,255,255,0.2)",
              }}>
                {fact.text}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
