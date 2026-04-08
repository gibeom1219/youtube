import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { theme } from "../styles/theme";
import { useSceneTheme } from "../contexts/SceneTheme";

interface Props {
  data: { event: string; date: string; days: number; description?: string; icon?: string; importance?: "high" | "medium" | "low" };
}

export const Countdown: React.FC<Props> = ({ data }) => {
  const theme = useSceneTheme();
  const frame = useCurrentFrame();
  if (!data) return null;
  const impColor = data.importance === "high" ? theme.red : data.importance === "medium" ? "#FFB347" : theme.tiffany;
  const pulse = (Math.sin(frame * 0.06) + 1) / 2;

  const iconOpacity = interpolate(frame, [0, 14], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const iconScale = interpolate(frame, [0, 14], [0.5, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const eventOpacity = interpolate(frame, [8, 20], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const numberOpacity = interpolate(frame, [14, 26], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const numberScale = interpolate(frame, [14, 26], [0.7, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const dateOpacity = interpolate(frame, [22, 34], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const descOpacity = interpolate(frame, [28, 40], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "80px 120px", gap: 24 }}>
      {data.icon && (
        <div style={{ fontSize: 88, fontFamily: theme.font, opacity: iconOpacity, transform: `scale(${iconScale})` }}>
          {data.icon}
        </div>
      )}
      <div style={{ fontSize: 38, color: theme.grayLight, fontFamily: theme.font, letterSpacing: 3, fontWeight: 600, opacity: eventOpacity }}>
        {data.event}
      </div>
      <div style={{ display: "flex", alignItems: "baseline", gap: 16, opacity: numberOpacity, transform: `scale(${numberScale})` }}>
        <span style={{ fontSize: 180, fontWeight: 900, color: theme.white, fontFamily: theme.font, textShadow: `0 0 ${30 + pulse * 30}px ${impColor}40` }}>
          D-{data.days}
        </span>
      </div>
      <div style={{ fontSize: 42, color: impColor, fontFamily: theme.font, fontWeight: 700, opacity: dateOpacity }}>
        {data.date}
      </div>
      {data.description && (
        <div style={{ fontSize: 30, color: theme.grayLight, fontFamily: theme.font, textAlign: "center", maxWidth: 1000, lineHeight: 1.5, marginTop: 12, opacity: descOpacity }}>
          {data.description}
        </div>
      )}
    </div>
  );
};
