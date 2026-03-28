import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { theme } from "../styles/theme";

interface Props {
  data: { event: string; date: string; days: number; description?: string; icon?: string; importance?: "high" | "medium" | "low" };
}

export const Countdown: React.FC<Props> = ({ data }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const impColor = data.importance === "high" ? theme.red : data.importance === "medium" ? "#FFB347" : theme.tiffany;

  const iconOpacity = interpolate(frame, [0, 14], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const iconP = spring({ frame, fps, config: { damping: 100, stiffness: 10 } });
  const numberOpacity = interpolate(frame, [10, 22], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const numberP = spring({ frame: frame - 10, fps, config: { damping: 100, stiffness: 10 } });
  const textOpacity = interpolate(frame, [20, 32], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const pulse = (Math.sin(frame * 0.06) + 1) / 2;

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "80px 120px", gap: 24 }}>
      {data.icon && (
        <div style={{ fontSize: 72, fontFamily: theme.font, opacity: iconOpacity, transform: `scale(${interpolate(iconP, [0, 1], [0.5, 1])})` }}>
          {data.icon}
        </div>
      )}
      <div style={{ fontSize: 28, color: theme.grayLight, fontFamily: theme.font, opacity: textOpacity, letterSpacing: 3 }}>
        {data.event}
      </div>
      <div style={{
        display: "flex", alignItems: "baseline", gap: 16, opacity: numberOpacity,
        transform: `scale(${interpolate(numberP, [0, 1], [0.7, 1])})`,
      }}>
        <span style={{ fontSize: 160, fontWeight: 900, color: theme.white, fontFamily: theme.font, textShadow: `0 0 ${30 + pulse * 30}px ${impColor}40` }}>
          D-{data.days}
        </span>
      </div>
      <div style={{ fontSize: 32, color: impColor, fontFamily: theme.font, fontWeight: 700, opacity: textOpacity }}>
        {data.date}
      </div>
      {data.description && (
        <div style={{ fontSize: 24, color: theme.grayLight, fontFamily: theme.font, opacity: textOpacity, textAlign: "center", maxWidth: 800, lineHeight: 1.5, marginTop: 12 }}>
          {data.description}
        </div>
      )}
    </div>
  );
};
