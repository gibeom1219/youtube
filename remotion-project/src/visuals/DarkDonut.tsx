import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { useSceneTheme } from "../contexts/SceneTheme";

interface Props {
  data: {
    title: string;
    subtitle?: string;
    side?: "left" | "right";
    segments: Array<{
      label: string;
      value: number;
      color: string;
    }>;
  };
}

export const DarkDonut: React.FC<Props> = ({ data }) => {
  const theme = useSceneTheme();
  const frame = useCurrentFrame();
  if (!data) return null;
  const side = data.side ?? "left";
  const isLeft = side === "left";

  const titleOpacity = interpolate(frame, [0, 14], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const drawProgress = interpolate(frame, [10, 50], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const total = (data.segments ?? []).reduce((s, seg) => s + seg.value, 0);
  const cx = 250, cy = 250, r = 190, strokeW = 52;
  const circumference = 2 * Math.PI * r;

  let accumulated = 0;
  const arcs = (data.segments ?? []).map((seg) => {
    const pct = seg.value / total;
    const offset = accumulated;
    accumulated += pct;
    return { ...seg, pct, offset };
  });

  const contentStyle = isLeft
    ? { left: 140, right: "auto" as const }
    : { right: 140, left: "auto" as const };

  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      <div style={{
        position: "absolute", top: 0, bottom: 0,
        ...contentStyle,
        width: 960,
        display: "flex", flexDirection: "column",
        justifyContent: "center",
        zIndex: 3,
      }}>
        <div style={{
          fontSize: 48, fontWeight: 900, color: "#fff",
          fontFamily: theme.font, marginBottom: 6,
          opacity: titleOpacity, letterSpacing: -1,
        }}>
          {data.title}
        </div>
        {data.subtitle && (
          <div style={{
            fontSize: 26, fontWeight: 600, color: "rgba(255,255,255,0.5)",
            fontFamily: theme.font, marginBottom: 16, opacity: titleOpacity,
          }}>
            {data.subtitle}
          </div>
        )}

        <div style={{ flex: 0, display: "flex", alignItems: "center", gap: 40 }}>
          <svg width={500} height={500} viewBox="0 0 500 500" style={{ flexShrink: 0 }}>
            {arcs.map((arc, i) => {
              const segEnd = Math.min(drawProgress, arc.offset + arc.pct);
              const segDraw = Math.max(0, segEnd - arc.offset);
              const dashLen = segDraw * circumference;
              const dashOff = arc.offset * circumference;
              return (
                <circle key={i} cx={cx} cy={cy} r={r} fill="none" stroke={arc.color}
                  strokeWidth={strokeW}
                  strokeDasharray={`${dashLen} ${circumference}`}
                  strokeDashoffset={-dashOff} strokeLinecap="butt"
                  transform={`rotate(-90 ${cx} ${cy})`}
                />
              );
            })}
            <text x={cx} y={cy - 12} textAnchor="middle" fill="#fff" fontSize={56} fontWeight={900} fontFamily={theme.font}>
              {total}
            </text>
            <text x={cx} y={cy + 32} textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize={28} fontWeight={600} fontFamily={theme.font}>
              합계
            </text>
          </svg>

          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {arcs.map((arc, i) => {
              const delay = 20 + i * 6;
              return (
                <div key={i} style={{
                  display: "flex", alignItems: "center", gap: 12,
                  opacity: interpolate(frame, [delay, delay + 10], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
                }}>
                  <div style={{ width: 20, height: 20, borderRadius: 4, background: arc.color, flexShrink: 0 }} />
                  <span style={{ fontSize: 34, fontWeight: 600, color: "rgba(255,255,255,0.8)", fontFamily: theme.font }}>
                    {arc.label}
                  </span>
                  <span style={{ fontSize: 34, fontWeight: 900, color: "#fff", fontFamily: theme.font, marginLeft: 4 }}>
                    {arc.value}%
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
