import React from "react";
import { useCurrentFrame, interpolate } from "remotion";

interface Props {
  target: number;
  unit: string;
  label: string;
  startFrame: number;
  endFrame: number;
  decimals?: number;
}

export const NumberCounter: React.FC<Props> = ({
  target,
  unit,
  label,
  startFrame,
  endFrame,
  decimals = 2,
}) => {
  const frame = useCurrentFrame();
  const current = interpolate(frame, [startFrame, endFrame], [0, target], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div style={{ textAlign: "center" }}>
      <div
        style={{
          fontSize: 96,
          fontWeight: 900,
          color: "#FFD700",
          fontFamily: "monospace",
          textShadow: "0 0 30px rgba(255,215,0,0.5)",
        }}
      >
        {current.toFixed(decimals)}
        {unit}
      </div>
      <div style={{ color: "white", fontSize: 36, marginTop: 8 }}>{label}</div>
    </div>
  );
};
