import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { useSceneTheme } from "../contexts/SceneTheme";

interface Props {
  data: {
    front_title: string;
    front_text: string;
    back_title: string;
    back_text: string;
  };
}

export const FlipCard: React.FC<Props> = ({ data }) => {
  const theme = useSceneTheme();
  const frame = useCurrentFrame();
  if (!data) return null;

  const cardOp = interpolate(frame, [0, 14], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const flipStart = 150;
  const rotateY = interpolate(frame, [flipStart, flipStart + 30], [0, 180], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const showFront = rotateY < 90;

  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      <div style={{
        position: "absolute", top: 0, bottom: 0, left: 0, right: 0,
        display: "flex", alignItems: "center", justifyContent: "center",
        zIndex: 3, perspective: 1200, opacity: cardOp,
      }}>
        <div style={{
          width: 800, height: 460, position: "relative",
          transformStyle: "preserve-3d" as const,
          transform: `rotateY(${rotateY}deg)`,
        }}>
          {/* 앞면 */}
          <div style={{
            position: "absolute", width: "100%", height: "100%",
            backfaceVisibility: "hidden" as const,
            background: "linear-gradient(135deg, #1e3a5f 0%, #2d5a87 100%)",
            borderRadius: 20, padding: "60px 56px",
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
            boxShadow: "0 12px 48px rgba(0,0,0,0.4)",
            opacity: showFront ? 1 : 0,
          }}>
            <div style={{
              fontSize: 28, fontWeight: 600, color: "rgba(255,255,255,0.5)",
              fontFamily: theme.font, marginBottom: 20, letterSpacing: 3,
            }}>
              Q U E S T I O N
            </div>
            <div style={{
              fontSize: 52, fontWeight: 900, color: "#fff",
              fontFamily: theme.font, textAlign: "center", lineHeight: 1.4,
              marginBottom: 16,
            }}>
              {data.front_title}
            </div>
            <div style={{
              fontSize: 34, fontWeight: 600, color: "rgba(255,255,255,0.7)",
              fontFamily: theme.font, textAlign: "center", lineHeight: 1.5,
            }}>
              {data.front_text}
            </div>
          </div>
          {/* 뒷면 */}
          <div style={{
            position: "absolute", width: "100%", height: "100%",
            backfaceVisibility: "hidden" as const,
            transform: "rotateY(180deg)",
            background: "linear-gradient(135deg, #81D8D0 0%, #5ab8b0 100%)",
            borderRadius: 20, padding: "60px 56px",
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
            boxShadow: "0 12px 48px rgba(0,0,0,0.4)",
            opacity: showFront ? 0 : 1,
          }}>
            <div style={{
              fontSize: 28, fontWeight: 600, color: "rgba(0,0,0,0.4)",
              fontFamily: theme.font, marginBottom: 20, letterSpacing: 3,
            }}>
              A N S W E R
            </div>
            <div style={{
              fontSize: 52, fontWeight: 900, color: "#fff",
              fontFamily: theme.font, textAlign: "center", lineHeight: 1.4,
              marginBottom: 16, textShadow: "0 2px 10px rgba(0,0,0,0.2)",
            }}>
              {data.back_title}
            </div>
            <div style={{
              fontSize: 34, fontWeight: 600, color: "rgba(255,255,255,0.85)",
              fontFamily: theme.font, textAlign: "center", lineHeight: 1.5,
            }}>
              {data.back_text}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
