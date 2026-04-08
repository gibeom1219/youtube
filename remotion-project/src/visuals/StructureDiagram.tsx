import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { theme } from "../styles/theme";
import { useSceneTheme } from "../contexts/SceneTheme";

interface Element { label: string; position: "center" | "top" | "bottom" | "left" | "right"; note?: string; icon?: string; color?: string }
interface Props {
  data: { title: string; description?: string; elements: Element[]; connections?: Array<{ from: number; to: number; label?: string }> };
}

const POS_MAP: Record<string, { x: number; y: number }> = {
  center: { x: 880, y: 320 },
  top: { x: 880, y: 110 },
  bottom: { x: 880, y: 530 },
  left: { x: 400, y: 320 },
  right: { x: 1360, y: 320 },
};

export const StructureDiagram: React.FC<Props> = ({ data: props }) => {
  const theme = useSceneTheme();
  const frame = useCurrentFrame();
  if (!props) return null;
  const { fps } = useVideoConfig();
  const titleOpacity = interpolate(frame, [0, 12], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const titleP = spring({ frame, fps, config: { damping: 100, stiffness: 25 } });

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", padding: "50px 80px" }}>
      <div style={{ fontSize: 44, fontWeight: 700, color: theme.gold, fontFamily: theme.font, textAlign: "center", marginBottom: 10, opacity: titleOpacity, transform: `translateY(${interpolate(titleP, [0, 1], [-16, 0])}px)` }}>
        {props.title}
      </div>
      {props.description && (
        <div style={{ fontSize: 30, color: theme.grayLight, fontFamily: theme.font, textAlign: "center", marginBottom: 20, opacity: titleOpacity }}>{props.description}</div>
      )}

      <div style={{ flex: 1, position: "relative" }}>
        {/* Connections */}
        <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
          {(props.connections ?? []).map((conn, i) => {
            const fromEl = props.elements[conn.from];
            const toEl = props.elements[conn.to];
            if (!fromEl || !toEl) return null;
            const fromPos = POS_MAP[fromEl.position] ?? POS_MAP.center;
            const toPos = POS_MAP[toEl.position] ?? POS_MAP.center;
            const connOpacity = interpolate(frame, [20 + i * 6, 30 + i * 6], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

            return (
              <g key={i} opacity={connOpacity}>
                <line x1={fromPos.x} y1={fromPos.y} x2={toPos.x} y2={toPos.y} stroke={`${theme.tiffany}40`} strokeWidth={2} strokeDasharray="8 4" />
                {conn.label && (
                  <text x={(fromPos.x + toPos.x) / 2} y={(fromPos.y + toPos.y) / 2 - 10} fill={theme.gray} fontSize={22} fontFamily={theme.font} textAnchor="middle">
                    {conn.label}
                  </text>
                )}
              </g>
            );
          })}
        </svg>

        {/* Elements */}
        {props.elements.map((el, i) => {
          const pos = POS_MAP[el.position] ?? POS_MAP.center;
          const elP = spring({ frame: frame - 8 - i * 8, fps, config: { damping: 100, stiffness: 10 } });
          const elOpacity = interpolate(frame, [8 + i * 8, 20 + i * 8], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
          const color = el.color ?? theme.tiffany;
          const isCenter = el.position === "center";

          return (
            <div key={i} style={{
              position: "absolute", left: pos.x - (isCenter ? 120 : 100), top: pos.y - (isCenter ? 60 : 45),
              width: isCenter ? 240 : 200, padding: isCenter ? "24px 20px" : "18px 18px",
              borderRadius: 16, textAlign: "center",
              background: `${color}${isCenter ? "18" : "0a"}`,
              border: `${isCenter ? 2 : 1}px solid ${color}${isCenter ? "50" : "25"}`,
              opacity: elOpacity, transform: `scale(${interpolate(elP, [0, 1], [0.7, 1])})`,
              display: "flex", flexDirection: "column", alignItems: "center", gap: 6,
            }}>
              {el.icon && <span style={{ fontSize: isCenter ? 40 : 32, fontFamily: theme.font }}>{el.icon}</span>}
              <div style={{ fontSize: isCenter ? 28 : 24, fontWeight: 800, color: isCenter ? color : theme.white, fontFamily: theme.font }}>{el.label}</div>
              {el.note && <div style={{ fontSize: 22, color: theme.grayLight, fontFamily: theme.font }}>{el.note}</div>}
            </div>
          );
        })}
      </div>
    </div>
  );
};
