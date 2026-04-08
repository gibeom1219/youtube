import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { theme } from "../styles/theme";
import { useSceneTheme } from "../contexts/SceneTheme";

interface Actor { name: string; icon?: string; incentive: string; stance: "support" | "oppose" | "neutral" }
interface Props {
  data: { title: string; target: string; target_icon?: string; actors: Actor[]; conclusion?: string };
}

export const PressureNetwork: React.FC<Props> = ({ data }) => {
  const theme = useSceneTheme();
  const frame = useCurrentFrame();
  if (!data) return null;
  const titleOpacity = interpolate(frame, [0, 14], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const centerOpacity = interpolate(frame, [6, 18], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const STANCE_COLORS = { support: theme.green, oppose: theme.red, neutral: "#FFB347" };
  const STANCE_LABELS = { support: "지지", oppose: "반대", neutral: "중립" };

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: "50px 80px", gap: 20 }}>
      <div style={{ fontSize: 44, fontWeight: 700, color: theme.gold, fontFamily: theme.font, textAlign: "center", opacity: titleOpacity }}>
        {data.title}
      </div>

      {/* Center target */}
      <div style={{ alignSelf: "center", padding: "20px 40px", borderRadius: 16, background: `${theme.tiffany}30`, border: `2px solid ${theme.tiffany}50`, display: "flex", alignItems: "center", gap: 14, opacity: centerOpacity }}>
        {data.target_icon && <span style={{ fontSize: 44, fontFamily: theme.font }}>{data.target_icon}</span>}
        <span style={{ fontSize: 36, fontWeight: 900, color: theme.white, fontFamily: theme.font }}>{data.target}</span>
      </div>

      {/* Actors */}
      <div style={{ display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center" }}>
        {(data.actors ?? []).map((actor, i) => {
          const delay = 14 + i * 8;
          const opacity = interpolate(frame, [delay, delay + 12], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
          const color = STANCE_COLORS[actor.stance];

          return (
            <div key={i} style={{
              width: 380, padding: "20px 24px", borderRadius: 14,
              background: `${color}22`, borderLeft: `4px solid ${color}60`,
              opacity, display: "flex", flexDirection: "column", gap: 10,
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                {actor.icon && <span style={{ fontSize: 32, fontFamily: theme.font }}>{actor.icon}</span>}
                <span style={{ fontSize: 28, fontWeight: 800, color: theme.white, fontFamily: theme.font }}>{actor.name}</span>
                <span style={{ fontSize: 22, fontWeight: 700, color, fontFamily: theme.font, marginLeft: "auto", padding: "2px 10px", background: `${color}30`, borderRadius: 6 }}>{STANCE_LABELS[actor.stance]}</span>
              </div>
              <div style={{ fontSize: 24, color: theme.grayLight, fontFamily: theme.font, lineHeight: 1.4 }}>{actor.incentive}</div>
            </div>
          );
        })}
      </div>

      {data.conclusion && (
        <div style={{ fontSize: 26, color: theme.tiffany, fontFamily: theme.font, textAlign: "center", fontWeight: 600, opacity: interpolate(frame, [44, 56], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) }}>
          {data.conclusion}
        </div>
      )}
    </div>
  );
};
