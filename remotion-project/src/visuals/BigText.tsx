import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { theme } from "../styles/theme";
import { useSceneTheme } from "../contexts/SceneTheme";

interface Props {
  data: { text: string; sub?: string; color?: string };
}

export const BigText: React.FC<Props> = ({ data }) => {
  const theme = useSceneTheme();
  const frame = useCurrentFrame();
  if (!data) return null;
  const mainColor = data.color ?? theme.tiffany;
  const glow = (Math.sin(frame * 0.04) + 1) / 2;
  const lineW = interpolate(frame, [0, 20], [0, 200], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const textOpacity = interpolate(frame, [4, 18], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const textY = interpolate(frame, [4, 24], [30, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const subOpacity = interpolate(frame, [16, 28], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "80px 120px", gap: 30 }}>
      <div style={{ width: lineW, height: 3, background: `${mainColor}60`, borderRadius: 2 }} />
      <div style={{
        fontSize: 68, fontWeight: 900, color: theme.white, fontFamily: theme.font,
        textAlign: "center", lineHeight: 1.4, maxWidth: 1300,
        opacity: textOpacity, transform: `translateY(${textY}px)`,
        textShadow: `${theme.textShadow.strong}, 0 0 ${20 + glow * 25}px ${mainColor}25`,
      }}>
        {data.text}
      </div>
      <div style={{ width: lineW, height: 3, background: `${mainColor}60`, borderRadius: 2 }} />
      {data.sub && (
        <div style={{ fontSize: 36, color: theme.tiffany, fontFamily: theme.font, textAlign: "center", opacity: subOpacity, maxWidth: 1000, lineHeight: 1.5, marginTop: 10, fontWeight: 600, textShadow: theme.textShadow.medium }}>
          {data.sub}
        </div>
      )}
      {(data as any).description && (
        <div style={{ fontSize: 32, color: theme.grayLight, fontFamily: theme.font, textAlign: "center", opacity: interpolate(frame, [24, 36], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }), maxWidth: 1000, lineHeight: 1.5, fontWeight: 500 }}>
          {(data as any).description}
        </div>
      )}
    </div>
  );
};
