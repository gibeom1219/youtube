import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { theme } from "../styles/theme";
import { useSceneTheme } from "../contexts/SceneTheme";

interface Stage { label: string; detail?: string; icon?: string }
interface Props {
  data: { title: string; stages: Stage[]; center_label?: string; insight?: string };
}

export const ViciousCycle: React.FC<Props> = ({ data }) => {
  const theme = useSceneTheme();
  const frame = useCurrentFrame();
  if (!data) return null;
  const titleOpacity = interpolate(frame, [0, 14], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const n = (data.stages ?? []).length;
  const cx = 880;
  const cy = 340;
  const radius = 240;
  const rotation = frame * 0.3; // slow rotation animation

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", padding: "50px 80px" }}>
      <div style={{ fontSize: 44, fontWeight: 700, color: theme.gold, fontFamily: theme.font, textAlign: "center", marginBottom: 16, opacity: titleOpacity }}>
        {data.title}
      </div>

      <div style={{ flex: 1, position: "relative" }}>
        {/* Center label */}
        {data.center_label && (
          <div style={{
            position: "absolute", left: cx - 80, top: cy - 30,
            width: 160, textAlign: "center",
            fontSize: 28, fontWeight: 800, color: theme.red, fontFamily: theme.font,
            opacity: interpolate(frame, [4, 16], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
          }}>
            🔄 {data.center_label}
          </div>
        )}

        {/* Circular arrows (SVG) */}
        <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
          {(data.stages ?? []).map((_, i) => {
            const angle1 = (2 * Math.PI * i) / n - Math.PI / 2;
            const angle2 = (2 * Math.PI * (i + 1)) / n - Math.PI / 2;
            const midAngle = (angle1 + angle2) / 2;
            const arrowX = cx + Math.cos(midAngle) * (radius - 20);
            const arrowY = cy + Math.sin(midAngle) * (radius - 20);
            const arrowOpacity = interpolate(frame, [14 + i * 8, 22 + i * 8], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

            return (
              <g key={`arrow-${i}`} opacity={arrowOpacity}>
                <circle cx={arrowX} cy={arrowY} r={12} fill={`${theme.red}40`} />
                <text x={arrowX} y={arrowY + 5} textAnchor="middle" fontSize={16} fill={theme.red} fontFamily={theme.font}>→</text>
              </g>
            );
          })}
        </svg>

        {/* Stage nodes */}
        {(data.stages ?? []).map((stage, i) => {
          const angle = (2 * Math.PI * i) / n - Math.PI / 2;
          const x = cx + Math.cos(angle) * radius;
          const y = cy + Math.sin(angle) * radius;
          const delay = 8 + i * 10;
          const opacity = interpolate(frame, [delay, delay + 12], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
          const t = i / Math.max(n - 1, 1);
          const color = `rgba(${Math.round(255 - t * 50)}, ${Math.round(107 + t * 50)}, ${Math.round(107)}, 1)`;

          return (
            <div key={i} style={{
              position: "absolute", left: x - 130, top: y - 45,
              width: 260, padding: "16px 20px", borderRadius: 14, textAlign: "center",
              background: `rgba(255,107,107,${0.05 + t * 0.1})`,
              border: `1px solid rgba(255,107,107,${0.2 + t * 0.2})`,
              opacity, display: "flex", flexDirection: "column", alignItems: "center", gap: 6,
            }}>
              {stage.icon && <span style={{ fontSize: 30, fontFamily: theme.font }}>{stage.icon}</span>}
              <div style={{ fontSize: 26, fontWeight: 800, color: theme.white, fontFamily: theme.font }}>{stage.label}</div>
              {stage.detail && <div style={{ fontSize: 20, color: theme.grayLight, fontFamily: theme.font }}>{stage.detail}</div>}
            </div>
          );
        })}
      </div>

      {data.insight && (
        <div style={{ fontSize: 28, color: theme.red, fontFamily: theme.font, textAlign: "center", fontWeight: 600, opacity: interpolate(frame, [44, 56], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) }}>
          ⚠️ {data.insight}
        </div>
      )}
    </div>
  );
};
