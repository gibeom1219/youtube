import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { theme } from "../styles/theme";

interface Props {
  data: { text: string; sub?: string; color?: string };
}

export const BigText: React.FC<Props> = ({ data }) => {
  const frame = useCurrentFrame();
  const mainColor = data.color ?? theme.tiffany;
  const glow = (Math.sin(frame * 0.04) + 1) / 2;

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "80px 120px", gap: 30 }}>
      <div style={{ width: 200, height: 3, background: `${mainColor}60`, borderRadius: 2 }} />
      <div style={{
        fontSize: 68, fontWeight: 900, color: theme.white, fontFamily: theme.font,
        textAlign: "center", lineHeight: 1.4, maxWidth: 1300,
        textShadow: `0 0 ${20 + glow * 25}px ${mainColor}25`,
      }}>
        {data.text}
      </div>
      <div style={{ width: 200, height: 3, background: `${mainColor}60`, borderRadius: 2 }} />
      {data.sub && (
        <div style={{ fontSize: 36, color: theme.tiffany, fontFamily: theme.font, textAlign: "center", maxWidth: 1000, lineHeight: 1.5, marginTop: 10, fontWeight: 600 }}>
          {data.sub}
        </div>
      )}
    </div>
  );
};
