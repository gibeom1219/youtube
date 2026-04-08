import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { theme } from "../styles/theme";
import { useSceneTheme } from "../contexts/SceneTheme";

interface Stage { level: number; label: string; detail?: string; icon?: string }
interface Props {
  data: { title: string; subtitle?: string; stages: Stage[]; current_level?: number };
}

const LEVEL_COLORS = ["#52D68A", "#81D8D0", "#FFB347", "#FF8C42", "#FF6B6B"];

export const EscalationLadder: React.FC<Props> = ({ data }) => {
  const theme = useSceneTheme();
  const frame = useCurrentFrame();
  if (!data) return null;
  const titleOpacity = interpolate(frame, [0, 14], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const currentLevel = data.current_level ?? (data.stages ?? []).length;

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: "50px 100px", gap: 20 }}>
      <div style={{ textAlign: "center", opacity: titleOpacity }}>
        <div style={{ fontSize: 44, fontWeight: 700, color: theme.gold, fontFamily: theme.font }}>{data.title}</div>
        {data.subtitle && <div style={{ fontSize: 28, color: theme.grayLight, fontFamily: theme.font, marginTop: 6 }}>{data.subtitle}</div>}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {(data.stages ?? []).map((stage, i) => {
          const delay = 8 + i * 10;
          const opacity = interpolate(frame, [delay, delay + 12], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
          const color = LEVEL_COLORS[Math.min(i, LEVEL_COLORS.length - 1)];
          const isCurrent = stage.level === currentLevel;
          const pulse = isCurrent ? (Math.sin(frame * 0.06) + 1) / 2 : 0;
          const widthPct = 60 + (i / Math.max((data.stages ?? []).length - 1, 1)) * 40;

          return (
            <div key={i} style={{
              alignSelf: "center", width: `${widthPct}%`,
              display: "flex", alignItems: "center", gap: 16,
              padding: "18px 28px", borderRadius: 12,
              background: `${color}${isCurrent ? "18" : "08"}`,
              border: `${isCurrent ? 2 : 1}px solid ${color}${isCurrent ? "60" : "25"}`,
              boxShadow: isCurrent ? `0 0 ${10 + pulse * 15}px ${color}25` : "none",
              opacity,
            }}>
              <div style={{ width: 44, height: 44, borderRadius: "50%", background: `${color}20`, border: `2px solid ${color}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, fontWeight: 900, color, fontFamily: theme.font, flexShrink: 0 }}>
                {stage.icon ?? stage.level}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 30, fontWeight: 700, color: isCurrent ? color : theme.white, fontFamily: theme.font }}>{stage.label}</div>
                {stage.detail && <div style={{ fontSize: 24, color: theme.grayLight, fontFamily: theme.font, marginTop: 4 }}>{stage.detail}</div>}
              </div>
              {isCurrent && <div style={{ fontSize: 22, fontWeight: 800, color, fontFamily: theme.font, padding: "4px 12px", background: `${color}30`, borderRadius: 6 }}>현재</div>}
            </div>
          );
        })}
      </div>
    </div>
  );
};
