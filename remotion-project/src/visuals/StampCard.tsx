import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { useSceneTheme } from "../contexts/SceneTheme";

interface Props {
  data: {
    verdict: string;
    title: string;
    description?: string;
    stamp_color?: string;
    stamp_text?: string;
  };
}

export const StampCard: React.FC<Props> = ({ data }) => {
  const theme = useSceneTheme();
  const frame = useCurrentFrame();
  if (!data) return null;

  const cardOpacity = interpolate(frame, [0, 14], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const stampDelay = 24;
  const stampScale = interpolate(frame, [stampDelay, stampDelay + 4], [3, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const stampOpacity = interpolate(frame, [stampDelay, stampDelay + 3], [0, 0.85], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const stampRotate = interpolate(frame, [stampDelay, stampDelay + 4], [-30, -12], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const descOpacity = interpolate(frame, [30, 42], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const stampColor = data.stamp_color ?? "#ef4444";
  const stampText = data.stamp_text ?? data.verdict;

  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      <div style={{
        position: "absolute", top: 0, bottom: 0, left: 0, right: 0,
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        zIndex: 3, padding: "0 200px",
      }}>
        {/* 문서 카드 */}
        <div style={{
          width: 1000, padding: "72px 80px",
          background: "#f8f6f0",
          borderRadius: 8,
          boxShadow: "0 8px 40px rgba(0,0,0,0.4)",
          opacity: cardOpacity,
          position: "relative" as const,
        }}>
          {/* 제목 */}
          <div style={{
            fontSize: 60, fontWeight: 900, color: "#111",
            fontFamily: theme.font, lineHeight: 1.3,
            marginBottom: 20, textAlign: "center",
          }}>
            {data.title}
          </div>

          {/* 설명 */}
          {data.description && (
            <div style={{
              fontSize: 36, fontWeight: 500, color: "#555",
              fontFamily: theme.font, lineHeight: 1.6,
              textAlign: "center", opacity: descOpacity,
            }}>
              {data.description}
            </div>
          )}

          {/* 도장 */}
          <div style={{
            position: "absolute" as const,
            top: "50%", left: "50%",
            transform: `translate(-50%, -50%) rotate(${stampRotate}deg) scale(${stampScale})`,
            opacity: stampOpacity,
          }}>
            <div style={{
              width: 280, height: 280,
              borderRadius: "50%",
              border: `8px solid ${stampColor}`,
              display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center",
              background: `${stampColor}10`,
            }}>
              <span style={{
                fontSize: 52, fontWeight: 900, color: stampColor,
                fontFamily: theme.font,
                textAlign: "center", lineHeight: 1.2,
                letterSpacing: 4,
              }}>
                {stampText}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
