import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { theme } from "../styles/theme";
import { useSceneTheme } from "../contexts/SceneTheme";

interface Racer { field: string; leader: string; challenger: string; leader_icon?: string; challenger_icon?: string; progress: number; note?: string }
interface Props {
  data: { title: string; racers: Racer[]; conclusion?: string };
}

export const CatchUpRace: React.FC<Props> = ({ data }) => {
  const theme = useSceneTheme();
  const frame = useCurrentFrame();
  if (!data) return null;
  const titleOpacity = interpolate(frame, [0, 14], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: "50px 80px", gap: 20 }}>
      <div style={{ fontSize: 44, fontWeight: 700, color: theme.gold, fontFamily: theme.font, textAlign: "center", textShadow: theme.textShadow.medium, opacity: titleOpacity }}>
        {data.title}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {(data.racers ?? []).map((racer, i) => {
          const delay = 8 + i * 10;
          const opacity = interpolate(frame, [delay, delay + 12], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
          const barGrow = interpolate(frame, [delay + 5, delay + 30], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
          const pct = racer.progress;
          const color = pct >= 90 ? theme.red : pct >= 70 ? "#FFB347" : theme.tiffany;
          const label = pct >= 90 ? "추월" : pct >= 70 ? "근접" : "추격 중";

          return (
            <div key={i} style={{ opacity, padding: "18px 24px", borderRadius: 14, background: "rgba(129,216,208,0.25)", border: "1px solid rgba(129,216,208,0.30)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontSize: 28, fontWeight: 800, color: theme.white, fontFamily: theme.font, textShadow: theme.textShadow.medium }}>{racer.field}</span>
                  {racer.note && <span style={{ fontSize: 24, fontWeight: 600, color: theme.grayLight, fontFamily: theme.font, textShadow: theme.textShadow.medium }}>({racer.note})</span>}
                </div>
                <span style={{ fontSize: 24, fontWeight: 800, color, fontFamily: theme.font, padding: "4px 12px", background: `${color}30`, borderRadius: 6, textShadow: theme.textShadow.medium }}>{label}</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ fontSize: 24, fontWeight: 700, color: theme.white, fontFamily: theme.font, minWidth: 120, textAlign: "right", whiteSpace: "nowrap", flexShrink: 0, textShadow: theme.textShadow.medium }}>{racer.challenger_icon ?? "🏃"} {racer.challenger}</span>
                <div style={{ flex: 1, height: 32, background: "rgba(255,255,255,0.20)", borderRadius: 16, overflow: "hidden", position: "relative" }}>
                  <div style={{ width: `${pct * barGrow}%`, height: "100%", background: `linear-gradient(90deg, ${color}60, ${color})`, borderRadius: 16 }} />
                  <div style={{ position: "absolute", right: 8, top: 0, bottom: 0, display: "flex", alignItems: "center", fontSize: 20, color: theme.grayLight, fontFamily: theme.font, textShadow: theme.textShadow.medium }}>{racer.leader_icon ?? "🏁"} {racer.leader}</div>
                </div>
                <span style={{ fontSize: 28, fontWeight: 900, color, fontFamily: theme.fontNum, width: 70, textShadow: theme.textShadow.medium }}>{pct}%</span>
              </div>
            </div>
          );
        })}
      </div>

      {data.conclusion && (
        <div style={{ fontSize: 28, color: theme.tiffany, fontFamily: theme.font, textAlign: "center", fontWeight: 600, textShadow: theme.textShadow.medium, opacity: interpolate(frame, [50, 62], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) }}>
          {data.conclusion}
        </div>
      )}
    </div>
  );
};
