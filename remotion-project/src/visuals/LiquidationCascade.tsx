import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { theme } from "../styles/theme";

interface Stage { label: string; amount: string; cumulative?: string; icon?: string }
interface Props {
  data: { title: string; asset: string; stages: Stage[]; total_loss?: string };
}

export const LiquidationCascade: React.FC<Props> = ({ data: props }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const titleOpacity = interpolate(frame, [0, 12], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const titleP = spring({ frame, fps, config: { damping: 100, stiffness: 25 } });
  const totalOpacity = interpolate(frame, [40, 52], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const pulse = (Math.sin(frame * 0.08) + 1) / 2;

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", padding: "60px 100px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 30, opacity: titleOpacity, transform: `translateY(${interpolate(titleP, [0, 1], [-16, 0])}px)` }}>
        <div style={{ fontSize: 38, fontWeight: 700, color: theme.gold, fontFamily: theme.font }}>{props.title}</div>
        <div style={{ fontSize: 28, color: theme.red, fontFamily: theme.font, fontWeight: 700 }}>{props.asset}</div>
      </div>

      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8, justifyContent: "center" }}>
        {props.stages.map((stage, i) => {
          const stageP = spring({ frame: frame - 10 - i * 10, fps, config: { damping: 100, stiffness: 10 } });
          const stageOpacity = interpolate(frame, [10 + i * 10, 22 + i * 10], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
          const arrowOpacity = interpolate(frame, [18 + i * 10, 24 + i * 10], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
          // Color gradient: orange → red
          const t = i / Math.max(props.stages.length - 1, 1);
          const r = Math.round(255);
          const g = Math.round(180 - t * 110);
          const b = Math.round(70 + t * 30);

          return (
            <React.Fragment key={i}>
              {i > 0 && <div style={{ textAlign: "center", fontSize: 28, color: `${theme.red}60`, opacity: arrowOpacity }}>⬇️ 연쇄</div>}
              <div style={{
                display: "flex", alignItems: "center", gap: 20,
                padding: "16px 24px", borderRadius: 12,
                background: `rgba(${r},${g},${b},0.08)`,
                borderLeft: `4px solid rgb(${r},${g},${b})`,
                opacity: stageOpacity, transform: `translateX(${interpolate(stageP, [0, 1], [30, 0])}px)`,
              }}>
                {stage.icon && <span style={{ fontSize: 28, fontFamily: theme.font }}>{stage.icon}</span>}
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 28, fontWeight: 700, color: theme.white, fontFamily: theme.font }}>{stage.label}</div>
                </div>
                <div style={{ fontSize: 26, fontWeight: 900, color: theme.red, fontFamily: theme.font }}>{stage.amount}</div>
                {stage.cumulative && <div style={{ fontSize: 22, color: theme.gray, fontFamily: theme.font }}>누적: {stage.cumulative}</div>}
              </div>
            </React.Fragment>
          );
        })}
      </div>

      {props.total_loss && (
        <div style={{
          textAlign: "center", marginTop: 16, fontSize: 32, fontWeight: 900, color: theme.red,
          fontFamily: theme.font, opacity: totalOpacity,
          textShadow: `0 0 ${15 + pulse * 15}px ${theme.red}40`,
        }}>
          총 손실: {props.total_loss}
        </div>
      )}
    </div>
  );
};
