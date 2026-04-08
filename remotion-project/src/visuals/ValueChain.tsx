import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { theme } from "../styles/theme";
import { useSceneTheme } from "../contexts/SceneTheme";

const STAGE_COLORS = ["#4FA8A0", "#52D68A", "#81D8D0", "#A8E8E2", "#FFB347"];

interface Props {
  data: { title: string; stages: Array<{ name: string; companies?: string[]; icon?: string; note?: string }> };
}

export const ValueChain: React.FC<Props> = ({ data: props }) => {
  const theme = useSceneTheme();
  const frame = useCurrentFrame();
  if (!props) return null;
  const { fps } = useVideoConfig();
  const { title, stages } = props;
  const titleOpacity = interpolate(frame, [0, 12], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const titleP = spring({ frame, fps, config: { damping: 100, stiffness: 25 } });

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", padding: "60px 80px" }}>
      <div style={{ fontSize: 38, fontWeight: 700, color: theme.gold, fontFamily: theme.font, textAlign: "center", marginBottom: 40, textShadow: theme.textShadow.medium, opacity: titleOpacity, transform: `translateY(${interpolate(titleP, [0, 1], [-16, 0])}px)` }}>
        {title}
      </div>
      <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 8 }}>
        {stages.map((stage, i) => {
          const stageP = spring({ frame: frame - 10 - i * 10, fps, config: { damping: 100, stiffness: 10 } });
          const stageOpacity = interpolate(frame, [10 + i * 10, 22 + i * 10], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
          const color = STAGE_COLORS[i % STAGE_COLORS.length];
          const arrowOpacity = interpolate(frame, [18 + i * 10, 26 + i * 10], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

          return (
            <React.Fragment key={i}>
              <div style={{
                flex: 1, padding: "24px 20px", borderRadius: 16,
                background: `${color}12`, border: `1px solid ${color}30`,
                display: "flex", flexDirection: "column", alignItems: "center", gap: 12,
                opacity: stageOpacity, transform: `translateY(${interpolate(stageP, [0, 1], [20, 0])}px)`,
                minHeight: 200,
              }}>
                {stage.icon && <span style={{ fontSize: 36, fontFamily: theme.font }}>{stage.icon}</span>}
                <div style={{ fontSize: 28, fontWeight: 800, color, fontFamily: theme.font, textAlign: "center", textShadow: theme.textShadow.medium }}>{stage.name}</div>
                {stage.note && <div style={{ fontSize: 22, color: theme.grayLight, fontFamily: theme.font, textAlign: "center", textShadow: theme.textShadow.light }}>{stage.note}</div>}
                {stage.companies && stage.companies.map((c, ci) => (
                  <div key={ci} style={{ fontSize: 24, color: theme.white, fontFamily: theme.font, padding: "4px 12px", background: `${color}30`, borderRadius: 6 }}>{c}</div>
                ))}
              </div>
              {i < stages.length - 1 && (
                <div style={{ fontSize: 32, color: `${theme.tiffany}60`, fontFamily: theme.font, opacity: arrowOpacity, flexShrink: 0 }}>→</div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
