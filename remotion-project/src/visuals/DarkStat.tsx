import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { useSceneTheme } from "../contexts/SceneTheme";

interface Props {
  data: {
    label: string;
    value: string;
    change?: string;
    description?: string;
    sub?: string;
    side?: "left" | "right";
  };
}

export const DarkStat: React.FC<Props> = ({ data }) => {
  const theme = useSceneTheme();
  const frame = useCurrentFrame();
  if (!data) return null;
  const side = data.side ?? "left";
  const isLeft = side === "left";

  const labelOpacity = interpolate(frame, [0, 12], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const valueOpacity = interpolate(frame, [6, 18], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const valueScale = interpolate(frame, [6, 20], [0.7, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const changeOpacity = interpolate(frame, [14, 26], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const descOpacity = interpolate(frame, [20, 32], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const isNegative = data.change?.startsWith("-") || data.change?.startsWith("▼");
  const changeColor = isNegative ? "#ef4444" : "#4ade80";

  const contentStyle = isLeft
    ? { left: 160, right: "auto" as const }
    : { right: 160, left: "auto" as const };

  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      <div style={{
        position: "absolute", top: 180, bottom: 200,
        ...contentStyle,
        width: 700,
        display: "flex", flexDirection: "column",
        justifyContent: "center",
        zIndex: 3,
      }}>
        <div style={{
          fontSize: 30, fontWeight: 700, color: "rgba(255,255,255,0.5)",
          fontFamily: theme.font, marginBottom: 12,
          opacity: labelOpacity, letterSpacing: 1,
        }}>
          {data.label}
        </div>

        <div style={{
          fontSize: 96, fontWeight: 900, color: "#fff",
          fontFamily: theme.font, lineHeight: 1.1,
          opacity: valueOpacity,
          transform: `scale(${valueScale})`,
          transformOrigin: isLeft ? "left center" : "right center",
        }}>
          {data.value}
        </div>

        {data.change && (
          <div style={{
            fontSize: 32, fontWeight: 800, color: changeColor,
            fontFamily: theme.font, marginTop: 8,
            opacity: changeOpacity,
          }}>
            {data.change}
          </div>
        )}

        <div style={{
          width: 60, height: 3, borderRadius: 2,
          background: "#81D8D0", marginTop: 24, marginBottom: 20,
          opacity: interpolate(frame, [16, 24], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
        }} />

        {data.description && (
          <div style={{
            fontSize: 28, fontWeight: 600, color: "rgba(255,255,255,0.8)",
            fontFamily: theme.font, lineHeight: 1.5,
            opacity: descOpacity,
          }}>
            {data.description}
          </div>
        )}

        {data.sub && (
          <div style={{
            fontSize: 22, fontWeight: 500, color: "rgba(255,255,255,0.4)",
            fontFamily: theme.font, marginTop: 10,
            opacity: descOpacity,
          }}>
            {data.sub}
          </div>
        )}
      </div>
    </div>
  );
};
