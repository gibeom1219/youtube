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

  const cx = 800, cy = 400, r = 300;
  const n = nodes.length;

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", padding: "50px 60px" }}>
      <div style={{ fontSize: 40, fontWeight: 700, color: theme.gold, fontFamily: theme.font, textAlign: "center", marginBottom: 16, opacity: titleOpacity, transform: `translateY(${interpolate(titleP, [0, 1], [-16, 0])}px)` }}>
        {title}
      </div>

      <div style={{ flex: 1, position: "relative", width: 1600, height: 720 }}>
        {/* Center node */}
        <div style={{
          position: "absolute", left: cx - 100, top: cy - 100, width: 200, height: 200,
          borderRadius: "50%", background: `${theme.tiffany}15`, border: `3px solid ${theme.tiffany}50`,
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
          opacity: centerOpacity, transform: `scale(${interpolate(centerP, [0, 1], [0.5, 1])})`,
        }}>
          {center.icon && <span style={{ fontSize: 52, fontFamily: theme.font }}>{center.icon}</span>}
          <span style={{ fontSize: 26, fontWeight: 900, color: theme.tiffany, fontFamily: theme.font, textAlign: "center" }}>{center.label}</span>
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
              <svg style={{ position: "absolute", left: 0, top: 0, width: 1600, height: 720, pointerEvents: "none" }}>
                <line x1={cx} y1={cy} x2={nx} y2={ny} stroke={`${theme.tiffany}35`} strokeWidth={2} strokeDasharray="8 5" opacity={nodeOpacity} />
                <text x={(cx + nx) / 2} y={(cy + ny) / 2 - 12} fill={theme.grayLight} fontSize={20} fontWeight="600" fontFamily={theme.font} textAnchor="middle" opacity={nodeOpacity}>
                  {node.relation}
                </text>
              </svg>
              {/* Node */}
              <div style={{
                position: "absolute", left: nx - 95, top: ny - 60, width: 190,
                padding: "18px 16px", borderRadius: 16,
                background: "rgba(129,216,208,0.08)", border: "1px solid rgba(129,216,208,0.2)",
                display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
                opacity: nodeOpacity, transform: `scale(${interpolate(nodeP, [0, 1], [0.7, 1])})`,
              }}>
                {node.icon && <span style={{ fontSize: 38, fontFamily: theme.font }}>{node.icon}</span>}
                <span style={{ fontSize: 28, fontWeight: 700, color: theme.white, fontFamily: theme.font, textAlign: "center" }}>{node.label}</span>
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
