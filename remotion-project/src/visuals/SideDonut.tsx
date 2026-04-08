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

export const SideDonut: React.FC<Props> = ({ data }) => {
  const theme = useSceneTheme();
  const frame = useCurrentFrame();
  if (!data) return null;
  const side = data.side ?? "left";
  const isLeft = side === "left";

  const titleOpacity = interpolate(frame, [0, 14], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const drawProgress = interpolate(frame, [10, 50], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const total = (data.segments ?? []).reduce((s, seg) => s + seg.value, 0);
  const cx = 270, cy = 270, r = 210, strokeW = 60;
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
        position: "absolute", top: 120, bottom: 140,
        ...contentStyle,
        width: 960,
        display: "flex", flexDirection: "column",
        zIndex: 3,
      }}>
        {/* 타이틀 */}
        <div style={{
          fontSize: 48, fontWeight: 900, color: "#000",
          fontFamily: theme.font, marginBottom: 8,
          opacity: titleOpacity, letterSpacing: -1,
        }}>
          {data.title}
        </div>
        {data.subtitle && (
          <div style={{
            fontSize: 26, fontWeight: 600, color: "#666",
            fontFamily: theme.font, marginBottom: 16, opacity: titleOpacity,
          }}>
            {data.subtitle}
          </div>
        )}

        {/* 도넛 + 범례 */}
        <div style={{
          flex: 1, display: "flex", alignItems: "center", gap: 40,
        }}>
          {/* 도넛 차트 */}
          <svg width={540} height={540} viewBox="0 0 540 540" style={{ flexShrink: 0 }}>
            {arcs.map((arc, i) => {
              const segEnd = Math.min(drawProgress, arc.offset + arc.pct);
              const segDraw = Math.max(0, segEnd - arc.offset);
              const dashLen = segDraw * circumference;
              const dashOff = arc.offset * circumference;

              return (
                <circle
                  key={i}
                  cx={cx} cy={cy} r={r}
                  fill="none"
                  stroke={arc.color}
                  strokeWidth={strokeW}
                  strokeDasharray={`${dashLen} ${circumference}`}
                  strokeDashoffset={-dashOff}
                  strokeLinecap="butt"
                  transform={`rotate(-90 ${cx} ${cy})`}
                />
              );
            })}
            {/* 중앙 텍스트 */}
            <text x={cx} y={cy - 10} textAnchor="middle" fill="#111" fontSize={64} fontWeight={900} fontFamily="Pretendard, sans-serif">
              {(data as any).center_text ?? total}
            </text>
            <text x={cx} y={cy + 36} textAnchor="middle" fill="#888" fontSize={30} fontWeight={600} fontFamily="Pretendard, sans-serif">
              합계
            </text>
          </svg>

          {/* 범례 */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {arcs.map((arc, i) => {
              const delay = 20 + i * 6;
              const legendOpacity = interpolate(frame, [delay, delay + 10], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

              return (
                <div key={i} style={{
                  display: "flex", alignItems: "center", gap: 14,
                  opacity: legendOpacity,
                }}>
                  <div style={{
                    width: 20, height: 20, borderRadius: 4,
                    background: arc.color, flexShrink: 0,
                  }} />
                  <span style={{
                    fontSize: 36, fontWeight: 600, color: "#333",
                    fontFamily: theme.font,
                  }}>
                    {arc.label}
                  </span>
                  <span style={{
                    fontSize: 36, fontWeight: 900, color: "#111",
                    fontFamily: theme.font, marginLeft: 4,
                  }}>
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
