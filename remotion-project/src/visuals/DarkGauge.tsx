import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { useSceneTheme } from "../contexts/SceneTheme";

interface Props {
  data: {
    title: string;
    label: string;
    value: number;
    min?: number;
    max?: number;
    zones?: Array<{ color: string; label: string }>;
    description?: string;
    side?: "left" | "right";
  };
}

export const DarkGauge: React.FC<Props> = ({ data }) => {
  const theme = useSceneTheme();
  const frame = useCurrentFrame();
  if (!data) return null;
  const side = data.side ?? "left";
  const isLeft = side === "left";

  const titleOpacity = interpolate(frame, [0, 14], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const min = data.min ?? 0;
  const max = data.max ?? 100;
  const pct = (data.value - min) / (max - min);
  const needleAngle = interpolate(frame, [12, 40], [-90, -90 + pct * 180], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const valueOpacity = interpolate(frame, [30, 42], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const zones = data.zones ?? [
    { color: "#16a34a", label: "안전" },
    { color: "#eab308", label: "주의" },
    { color: "#f97316", label: "경계" },
    { color: "#ef4444", label: "위험" },
  ];

  const cx = 180, cy = 180, r = 140;

  const contentStyle = isLeft
    ? { left: 140, right: "auto" as const }
    : { right: 140, left: "auto" as const };

  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      <div style={{
        position: "absolute", top: 0, bottom: 0,
        ...contentStyle,
        width: 780,
        display: "flex", flexDirection: "column",
        justifyContent: "center",
        zIndex: 3,
      }}>
        <div style={{
          fontSize: 48, fontWeight: 900, color: "#fff",
          fontFamily: theme.font, marginBottom: 20,
          opacity: titleOpacity, letterSpacing: -1,
        }}>
          {data.title}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 40 }}>
          <svg width={360} height={280} viewBox="0 0 360 280" style={{ flexShrink: 0 }}>
            {zones.map((zone, i) => {
              const segStart = i / zones.length;
              const segEnd = (i + 1) / zones.length;
              const startAngle = Math.PI + segStart * Math.PI;
              const endAngle = Math.PI + segEnd * Math.PI;
              const x1 = cx + r * Math.cos(startAngle);
              const y1 = cy + r * Math.sin(startAngle);
              const x2 = cx + r * Math.cos(endAngle);
              const y2 = cy + r * Math.sin(endAngle);
              return (
                <path key={i}
                  d={`M ${x1} ${y1} A ${r} ${r} 0 0 1 ${x2} ${y2}`}
                  fill="none" stroke={zone.color} strokeWidth={24} strokeLinecap="butt"
                  opacity={interpolate(frame, [6 + i * 3, 14 + i * 3], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
                />
              );
            })}
            <line x1={cx} y1={cy}
              x2={cx + 100 * Math.cos(needleAngle * Math.PI / 180)}
              y2={cy + 100 * Math.sin(needleAngle * Math.PI / 180)}
              stroke="#fff" strokeWidth={4} strokeLinecap="round"
            />
            <circle cx={cx} cy={cy} r={8} fill="#fff" />
            <text x={cx} y={cy + 50} textAnchor="middle" fill="#fff" fontSize={48} fontWeight={900} fontFamily="Pretendard, sans-serif" opacity={valueOpacity}>
              {data.value}
            </text>
            <text x={cx} y={cy + 80} textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize={22} fontWeight={600} fontFamily="Pretendard, sans-serif" opacity={valueOpacity}>
              {data.label}
            </text>
          </svg>

          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {zones.map((zone, i) => (
              <div key={i} style={{
                display: "flex", alignItems: "center", gap: 10,
                opacity: interpolate(frame, [20 + i * 4, 28 + i * 4], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
              }}>
                <div style={{ width: 14, height: 14, borderRadius: 3, background: zone.color, flexShrink: 0 }} />
                <span style={{ fontSize: 24, fontWeight: 600, color: "rgba(255,255,255,0.8)", fontFamily: theme.font }}>
                  {zone.label}
                </span>
              </div>
            ))}
            {data.description && (
              <div style={{
                fontSize: 24, fontWeight: 600, color: "rgba(255,255,255,0.6)",
                fontFamily: theme.font, marginTop: 10, lineHeight: 1.5,
                opacity: valueOpacity,
              }}>
                {data.description}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
