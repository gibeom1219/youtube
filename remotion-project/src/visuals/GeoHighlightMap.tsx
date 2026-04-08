import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { theme } from "../styles/theme";
import { useSceneTheme } from "../contexts/SceneTheme";

interface Location { name: string; icon?: string; note?: string; position: "top-left" | "top-center" | "top-right" | "center-left" | "center" | "center-right" | "bottom-left" | "bottom-center" | "bottom-right"; highlight?: boolean }
interface Props {
  data: { title: string; subtitle?: string; locations: Location[]; context?: string };
}

const POS: Record<string, { left: string; top: string }> = {
  "top-left": { left: "8%", top: "12%" },
  "top-center": { left: "38%", top: "8%" },
  "top-right": { left: "68%", top: "12%" },
  "center-left": { left: "5%", top: "40%" },
  "center": { left: "35%", top: "38%" },
  "center-right": { left: "65%", top: "40%" },
  "bottom-left": { left: "8%", top: "68%" },
  "bottom-center": { left: "38%", top: "68%" },
  "bottom-right": { left: "68%", top: "68%" },
};

export const GeoHighlightMap: React.FC<Props> = ({ data }) => {
  const theme = useSceneTheme();
  const frame = useCurrentFrame();
  if (!data) return null;
  const titleOpacity = interpolate(frame, [0, 14], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", padding: "50px 80px" }}>
      <div style={{ textAlign: "center", marginBottom: 16, opacity: titleOpacity }}>
        <div style={{ fontSize: 44, fontWeight: 700, color: theme.gold, fontFamily: theme.font }}>{data.title}</div>
        {data.subtitle && <div style={{ fontSize: 28, color: theme.grayLight, fontFamily: theme.font, marginTop: 6 }}>{data.subtitle}</div>}
      </div>

      <div style={{ flex: 1, position: "relative" }}>
        {(data.locations ?? []).map((loc, i) => {
          const pos = POS[loc.position] ?? POS.center;
          const delay = 8 + i * 8;
          const opacity = interpolate(frame, [delay, delay + 12], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
          const color = loc.highlight ? theme.red : theme.tiffany;
          const pulse = loc.highlight ? (Math.sin(frame * 0.06) + 1) / 2 : 0;

          return (
            <div key={i} style={{
              position: "absolute", left: pos.left, top: pos.top,
              width: 280, padding: "18px 22px", borderRadius: 14,
              background: `${color}${loc.highlight ? "15" : "08"}`,
              border: `${loc.highlight ? 2 : 1}px solid ${color}${loc.highlight ? "50" : "25"}`,
              boxShadow: loc.highlight ? `0 0 ${10 + pulse * 15}px ${color}25` : "none",
              opacity, display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
            }}>
              {loc.icon && <span style={{ fontSize: 36, fontFamily: theme.font }}>{loc.icon}</span>}
              <div style={{ fontSize: 28, fontWeight: 800, color: loc.highlight ? color : theme.white, fontFamily: theme.font, textAlign: "center" }}>{loc.name}</div>
              {loc.note && <div style={{ fontSize: 22, color: theme.grayLight, fontFamily: theme.font, textAlign: "center" }}>{loc.note}</div>}
            </div>
          );
        })}
      </div>

      {data.context && (
        <div style={{ fontSize: 26, color: theme.grayLight, fontFamily: theme.font, textAlign: "center", marginTop: 12, opacity: interpolate(frame, [40, 52], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) }}>
          {data.context}
        </div>
      )}
    </div>
  );
};
