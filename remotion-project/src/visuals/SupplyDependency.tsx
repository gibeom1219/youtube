import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { theme } from "../styles/theme";
import { useSceneTheme } from "../contexts/SceneTheme";

interface Stage { label: string; detail?: string; icon?: string; bottleneck?: boolean }
interface Props {
  data: { title: string; stages: Stage[]; insight?: string };
}

export const SupplyDependency: React.FC<Props> = ({ data }) => {
  const theme = useSceneTheme();
  const frame = useCurrentFrame();
  if (!data) return null;
  const titleOpacity = interpolate(frame, [0, 14], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: "50px 70px", gap: 24 }}>
      <div style={{ fontSize: 44, fontWeight: 700, color: theme.gold, fontFamily: theme.font, textAlign: "center", opacity: titleOpacity }}>
        {data.title}
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 0 }}>
        {(data.stages ?? []).map((stage, i) => {
          const delay = 8 + i * 10;
          const opacity = interpolate(frame, [delay, delay + 12], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
          const color = stage.bottleneck ? theme.red : theme.tiffany;
          const pulse = stage.bottleneck ? (Math.sin(frame * 0.08) + 1) / 2 : 0;
          const isLast = i === (data.stages ?? []).length - 1;

          return (
            <React.Fragment key={i}>
              <div style={{
                flex: 1, padding: "24px 16px", borderRadius: 14, textAlign: "center",
                background: `${color}${stage.bottleneck ? "15" : "08"}`,
                border: `${stage.bottleneck ? 2 : 1}px solid ${color}${stage.bottleneck ? "50" : "25"}`,
                boxShadow: stage.bottleneck ? `0 0 ${10 + pulse * 15}px ${color}25` : "none",
                opacity, display: "flex", flexDirection: "column", alignItems: "center", gap: 10,
              }}>
                {stage.icon && <span style={{ fontSize: 40, fontFamily: theme.font }}>{stage.icon}</span>}
                <div style={{ fontSize: 28, fontWeight: 800, color: stage.bottleneck ? color : theme.white, fontFamily: theme.font }}>{stage.label}</div>
                {stage.detail && <div style={{ fontSize: 22, color: theme.grayLight, fontFamily: theme.font, lineHeight: 1.4 }}>{stage.detail}</div>}
              </div>
              {!isLast && (
                <div style={{ fontSize: 36, color: `${theme.tiffany}60`, fontFamily: theme.font, padding: "0 8px", opacity }}>→</div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      {data.insight && (
        <div style={{ fontSize: 28, color: theme.tiffany, fontFamily: theme.font, textAlign: "center", fontWeight: 600, opacity: interpolate(frame, [40, 52], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) }}>
          💡 {data.insight}
        </div>
      )}
    </div>
  );
};
