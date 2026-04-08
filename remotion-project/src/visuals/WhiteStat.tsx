import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { useSceneTheme } from "../contexts/SceneTheme";

interface Props {
  data: {
    label: string;
    value: string;
    description?: string;
    change?: string;
    sub?: string;
  };
}

export const WhiteStat: React.FC<Props> = ({ data }) => {
  const theme = useSceneTheme();
  const frame = useCurrentFrame();
  if (!data) return null;

  const labelOpacity = interpolate(frame, [0, 14], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const valueOpacity = interpolate(frame, [8, 20], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const valueScale = interpolate(frame, [8, 22], [0.7, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const descOpacity = interpolate(frame, [18, 30], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const changeOpacity = interpolate(frame, [24, 36], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const isNegative = data.change?.startsWith("-") || data.change?.startsWith("▼");
  const changeColor = isNegative ? "#dc2626" : "#16a34a";

  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      <div style={{
        position: "absolute", top: 0, bottom: 0, left: 0, right: 0,
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        zIndex: 3,
      }}>
        {/* 라벨 */}
        <div style={{
          fontSize: 32, fontWeight: 700, color: "#555",
          fontFamily: theme.font, letterSpacing: 2,
          opacity: labelOpacity, marginBottom: 16,
        }}>
          {data.label}
        </div>

        {/* 큰 숫자 */}
        <div style={{
          fontSize: 120, fontWeight: 900, color: "#000",
          fontFamily: theme.font, lineHeight: 1,
          opacity: valueOpacity,
          transform: `scale(${valueScale})`,
        }}>
          {data.value}
        </div>

        {/* 변동 */}
        {data.change && (
          <div style={{
            fontSize: 36, fontWeight: 800, color: changeColor,
            fontFamily: theme.font, marginTop: 16,
            opacity: changeOpacity,
          }}>
            {data.change}
          </div>
        )}

        {/* 설명 */}
        {data.description && (
          <div style={{
            fontSize: 30, fontWeight: 600, color: "#333",
            fontFamily: theme.font, marginTop: 20,
            opacity: descOpacity, textAlign: "center",
            maxWidth: 700, lineHeight: 1.5,
          }}>
            {data.description}
          </div>
        )}

        {/* 부가 정보 */}
        {data.sub && (
          <div style={{
            fontSize: 24, fontWeight: 500, color: "#888",
            fontFamily: theme.font, marginTop: 12,
            opacity: descOpacity,
          }}>
            {data.sub}
          </div>
        )}
      </div>
    </div>
  );
};
