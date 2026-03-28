import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { theme } from "../styles/theme";

interface Props {
  data: { title: string; center: { label: string; icon?: string }; nodes: Array<{ label: string; relation: string; icon?: string }> };
}

export const RelationMap: React.FC<Props> = ({ data: props }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { title, center, nodes } = props;
  const titleOpacity = interpolate(frame, [0, 12], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const titleP = spring({ frame, fps, config: { damping: 100, stiffness: 25 } });
  const centerP = spring({ frame: frame - 8, fps, config: { damping: 100, stiffness: 10 } });
  const centerOpacity = interpolate(frame, [8, 20], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const cx = 800, cy = 380, r = 260;
  const n = nodes.length;

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", padding: "50px 60px" }}>
      <div style={{ fontSize: 38, fontWeight: 700, color: theme.gold, fontFamily: theme.font, textAlign: "center", marginBottom: 20, opacity: titleOpacity, transform: `translateY(${interpolate(titleP, [0, 1], [-16, 0])}px)` }}>
        {title}
      </div>

      <div style={{ flex: 1, position: "relative", width: 1600, height: 700 }}>
        {/* Center node */}
        <div style={{
          position: "absolute", left: cx - 80, top: cy - 80, width: 160, height: 160,
          borderRadius: "50%", background: `${theme.tiffany}15`, border: `2px solid ${theme.tiffany}50`,
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
          opacity: centerOpacity, transform: `scale(${interpolate(centerP, [0, 1], [0.5, 1])})`,
        }}>
          {center.icon && <span style={{ fontSize: 40, fontFamily: theme.font }}>{center.icon}</span>}
          <span style={{ fontSize: 20, fontWeight: 800, color: theme.tiffany, fontFamily: theme.font, textAlign: "center" }}>{center.label}</span>
        </div>

        {/* Outer nodes + connections */}
        {nodes.map((node, i) => {
          const angle = (Math.PI * 2 * i) / n - Math.PI / 2;
          const nx = cx + Math.cos(angle) * r;
          const ny = cy + Math.sin(angle) * r;
          const nodeP = spring({ frame: frame - 16 - i * 6, fps, config: { damping: 100, stiffness: 10 } });
          const nodeOpacity = interpolate(frame, [16 + i * 6, 28 + i * 6], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

          return (
            <React.Fragment key={i}>
              {/* Connection line */}
              <svg style={{ position: "absolute", left: 0, top: 0, width: 1600, height: 700, pointerEvents: "none" }}>
                <line x1={cx} y1={cy} x2={nx} y2={ny} stroke={`${theme.tiffany}30`} strokeWidth={1.5} strokeDasharray="6 4" opacity={nodeOpacity} />
                <text x={(cx + nx) / 2} y={(cy + ny) / 2 - 8} fill={theme.gray} fontSize={14} fontFamily={theme.font} textAnchor="middle" opacity={nodeOpacity}>
                  {node.relation}
                </text>
              </svg>
              {/* Node */}
              <div style={{
                position: "absolute", left: nx - 70, top: ny - 50, width: 140,
                padding: "14px 12px", borderRadius: 14,
                background: "rgba(129,216,208,0.06)", border: "1px solid rgba(129,216,208,0.15)",
                display: "flex", flexDirection: "column", alignItems: "center", gap: 6,
                opacity: nodeOpacity, transform: `scale(${interpolate(nodeP, [0, 1], [0.7, 1])})`,
              }}>
                {node.icon && <span style={{ fontSize: 28, fontFamily: theme.font }}>{node.icon}</span>}
                <span style={{ fontSize: 16, fontWeight: 700, color: theme.white, fontFamily: theme.font, textAlign: "center" }}>{node.label}</span>
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
