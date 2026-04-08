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

export const SideGauge: React.FC<Props> = ({ data }) => {
  const theme = useSceneTheme();
  const frame = useCurrentFrame();
  if (!data) return null;
  const side = data.side ?? "left";
  const isLeft = side === "left";

  const titleOpacity = interpolate(frame, [0, 14], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const min = data.min ?? 0;
  const max = data.max ?? 100;
  const pct = (data.value - min) / (max - min);
  // 바늘 각도: 왼쪽(-180°) ~ 오른쪽(0°), 라디안으로 변환
  const needleAngleDeg = interpolate(frame, [12, 40], [180, 180 - pct * 180], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const needleAngleRad = (needleAngleDeg * Math.PI) / 180;
  const valueOpacity = interpolate(frame, [30, 42], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const zones = data.zones ?? [
    { color: "#16a34a", label: "안전" },
    { color: "#eab308", label: "주의" },
    { color: "#f97316", label: "경계" },
    { color: "#ef4444", label: "위험" },
  ];

  const cx = 220, cy = 220, r = 180;

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
          fontSize: 48, fontWeight: 900, color: "#000",
          fontFamily: theme.font, marginBottom: 20,
          opacity: titleOpacity, letterSpacing: -1,
        }}>
          {data.title}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 40 }}>
          {/* 게이지 */}
          <svg width={440} height={340} viewBox="0 0 440 340" style={{ flexShrink: 0 }}>
            {/* 구간 아크 */}
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
                <path
                  key={i}
                  d={`M ${x1} ${y1} A ${r} ${r} 0 0 1 ${x2} ${y2}`}
                  fill="none"
                  stroke={zone.color}
                  strokeWidth={30}
                  strokeLinecap="butt"
                  opacity={interpolate(frame, [6 + i * 3, 14 + i * 3], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
                />
              );
            })}

            {/* 바늘 */}
            <line
              x1={cx} y1={cy}
              x2={cx + 130 * Math.cos(needleAngleRad)}
              y2={cy - 130 * Math.sin(needleAngleRad)}
              stroke="#111" strokeWidth={5} strokeLinecap="round"
            />
            <circle cx={cx} cy={cy} r={10} fill="#111" />

            {/* 값 */}
            <text x={cx} y={cy + 60} textAnchor="middle" fill="#000" fontSize={56} fontWeight={900} fontFamily={theme.font} opacity={valueOpacity}>
              {data.value}
            </text>
            <text x={cx} y={cy + 95} textAnchor="middle" fill="#888" fontSize={26} fontWeight={600} fontFamily={theme.font} opacity={valueOpacity}>
              {data.label}
            </text>
          </svg>

          {/* 범례 + 설명 */}
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {zones.map((zone, i) => (
              <div key={i} style={{
                display: "flex", alignItems: "center", gap: 10,
                opacity: interpolate(frame, [20 + i * 4, 28 + i * 4], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
              }}>
                <div style={{
                  width: 14, height: 14, borderRadius: 3,
                  background: zone.color, flexShrink: 0,
                }} />
                <span style={{
                  fontSize: 30, fontWeight: 700, color: "#333",
                  fontFamily: theme.font,
                }}>
                  {zone.label}
                </span>
              </div>
            ))}

            {data.description && (
              <div style={{
                fontSize: 28, fontWeight: 600, color: "#555",
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
