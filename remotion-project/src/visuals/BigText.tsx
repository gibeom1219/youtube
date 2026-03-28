import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { theme } from "../styles/theme";

interface Props {
  data: { text: string; sub?: string; color?: string };
}

export const BigText: React.FC<Props> = ({ data }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const mainColor = data.color ?? theme.tiffany;
  const textP = spring({ frame: frame - 4, fps, config: { damping: 100, stiffness: 10 } });
  const textOpacity = interpolate(frame, [4, 18], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const subOpacity = interpolate(frame, [18, 30], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const glow = (Math.sin(frame * 0.04) + 1) / 2;
  const lineW = interpolate(frame, [0, 20], [0, 200], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "80px 120px", gap: 30 }}>
      <div style={{ width: lineW, height: 3, background: `${mainColor}60`, borderRadius: 2 }} />
      <div style={{
        fontSize: 68, fontWeight: 900, color: theme.white, fontFamily: theme.font,
        textAlign: "center", lineHeight: 1.4, maxWidth: 1300,
        opacity: textOpacity, transform: `translateY(${interpolate(textP, [0, 1], [30, 0])}px)`,
        textShadow: `0 0 ${20 + glow * 25}px ${mainColor}25`,
      }}>
        {data.text}
      </div>
      <div style={{ width: lineW, height: 3, background: `${mainColor}60`, borderRadius: 2 }} />
      {data.sub && (
        <div style={{ fontSize: 28, color: theme.grayLight, fontFamily: theme.font, textAlign: "center", opacity: subOpacity, maxWidth: 900, lineHeight: 1.5, marginTop: 10 }}>
          {data.sub}
        </div>
      )}
    </div>
  );
};
