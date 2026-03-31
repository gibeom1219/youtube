import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { theme } from "../styles/theme";

interface Props {
  data: { number: number; unit: string; prefix?: string; label: string; description: string };
}

export const DataCounter: React.FC<Props> = ({ data }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const labelOpacity = interpolate(frame, [0, 12], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const labelP = spring({ frame, fps, config: { damping: 100, stiffness: 25 } });

  // Count up animation: 0 → target over 60 frames
  const countDuration = 60;
  const countProgress = interpolate(frame, [10, 10 + countDuration], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  // Ease out for natural feel
  const easedProgress = 1 - Math.pow(1 - countProgress, 3);
  const currentNumber = Math.round(data.number * easedProgress);

  const numberOpacity = interpolate(frame, [8, 16], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const descOpacity = interpolate(frame, [30, 42], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Subtle glow on complete
  const glowIntensity = countProgress >= 1 ? (Math.sin(frame * 0.05) + 1) / 2 : 0;

  // Format number with commas
  const formatted = currentNumber.toLocaleString();

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "80px 120px" }}>
      {/* Label */}
      <div style={{
        fontSize: 40, fontWeight: 700, color: theme.tiffany, fontFamily: theme.font,
        opacity: labelOpacity, transform: `translateY(${interpolate(labelP, [0, 1], [-16, 0])}px)`,
        marginBottom: 30, letterSpacing: 2,
      }}>
        {data.label}
      </div>

      {/* Number */}
      <div style={{
        fontSize: 140, fontWeight: 900, color: theme.white, fontFamily: theme.font,
        opacity: numberOpacity,
        textShadow: `0 0 ${40 + glowIntensity * 40}px rgba(129,216,208,${0.1 + glowIntensity * 0.3})`,
        display: "flex", alignItems: "baseline", gap: 8,
      }}>
        {data.prefix && <span style={{ fontSize: 80, color: theme.tiffany }}>{data.prefix}</span>}
        <span>{formatted}</span>
        <span style={{ fontSize: 64, color: theme.grayLight, fontWeight: 600 }}>{data.unit}</span>
      </div>

      {/* Description */}
      <div style={{
        fontSize: 34, color: theme.grayLight, fontFamily: theme.font,
        opacity: descOpacity, marginTop: 30, textAlign: "center", lineHeight: 1.5,
        maxWidth: 900,
      }}>
        {data.description}
      </div>
    </div>
  );
};
