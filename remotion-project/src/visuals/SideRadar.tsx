import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { useSceneTheme } from "../contexts/SceneTheme";

interface Props {
  data: {
    title: string;
    subtitle?: string;
    side?: "left" | "right";
    axes: Array<{
      label: string;
      value: number;
      max?: number;
    }>;
    color?: string;
  };
}

export const SideRadar: React.FC<Props> = ({ data }) => {
  const theme = useSceneTheme();
  const frame = useCurrentFrame();
  if (!data) return null;
  const side = data.side ?? "left";
  const isLeft = side === "left";

  const titleOpacity = interpolate(frame, [0, 14], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const radarProgress = interpolate(frame, [10, 40], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const color = data.color ?? "#e67e22";

  const cx = 190, cy = 190, maxR = 140;
  const axes = data.axes;
  const n = axes.length;
  const angleStep = (2 * Math.PI) / n;

  const getPoint = (i: number, r: number) => ({
    x: cx + r * Math.sin(i * angleStep),
    y: cy - r * Math.cos(i * angleStep),
  });

  const gridLevels = [0.25, 0.5, 0.75, 1];

  const dataPoints = axes.map((axis, i) => {
    const maxVal = axis.max ?? 100;
    const pct = (axis.value / maxVal) * radarProgress;
    return getPoint(i, maxR * pct);
  });
  const dataPath = dataPoints.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ") + " Z";

  const contentStyle = isLeft
    ? { left: 140, right: "auto" as const }
    : { right: 140, left: "auto" as const };

  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      <div style={{
        position: "absolute", top: 0, bottom: 0,
        ...contentStyle,
        width: 800,
        display: "flex", flexDirection: "column",
        justifyContent: "center",
        zIndex: 3,
      }}>
        <div style={{
          fontSize: 52, fontWeight: 900, color: "#000",
          fontFamily: theme.font, marginBottom: 8,
          opacity: titleOpacity, letterSpacing: -1,
        }}>
          {data.title}
        </div>
        {data.subtitle && (
          <div style={{
            fontSize: 28, fontWeight: 600, color: "#666",
            fontFamily: theme.font, marginBottom: 16, opacity: titleOpacity,
          }}>
            {data.subtitle}
          </div>
        )}

        <div style={{ display: "flex", alignItems: "center", gap: 30 }}>
          {/* 레이더 차트 */}
          <svg width={380} height={380} viewBox="0 0 380 380" style={{ flexShrink: 0 }}>
            {/* 그리드 */}
            {gridLevels.map((level, li) => {
              const gridPoints = Array.from({ length: n }, (_, i) => getPoint(i, maxR * level));
              const gridPath = gridPoints.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ") + " Z";
              return (
                <path key={li} d={gridPath} fill="none" stroke="rgba(0,0,0,0.08)" strokeWidth={1}
                  opacity={interpolate(frame, [4 + li * 2, 10 + li * 2], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
                />
              );
            })}

            {/* 축선 */}
            {axes.map((_, i) => {
              const p = getPoint(i, maxR);
              return <line key={i} x1={cx} y1={cy} x2={p.x} y2={p.y} stroke="rgba(0,0,0,0.06)" strokeWidth={1} />;
            })}

            {/* 데이터 영역 */}
            <path d={dataPath} fill={`${color}30`} stroke={color} strokeWidth={2.5} />

            {/* 데이터 포인트 */}
            {dataPoints.map((p, i) => (
              <circle key={i} cx={p.x} cy={p.y} r={5} fill="white" stroke={color} strokeWidth={2.5}
                opacity={interpolate(frame, [20 + i * 3, 26 + i * 3], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
              />
            ))}

            {/* 축 라벨 */}
            {axes.map((axis, i) => {
              const p = getPoint(i, maxR + 28);
              return (
                <text key={i} x={p.x} y={p.y + 5} textAnchor="middle" fill="#555" fontSize={22} fontWeight={700}
                  fontFamily="Pretendard, sans-serif"
                  opacity={interpolate(frame, [6, 16], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
                >
                  {axis.label}
                </text>
              );
            })}
          </svg>

          {/* 값 목록 */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {axes.map((axis, i) => {
              const delay = 22 + i * 5;
              return (
                <div key={i} style={{
                  display: "flex", alignItems: "center", gap: 10,
                  opacity: interpolate(frame, [delay, delay + 8], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
                }}>
                  <div style={{
                    width: 10, height: 10, borderRadius: "50%",
                    background: color, flexShrink: 0,
                  }} />
                  <span style={{
                    fontSize: 28, fontWeight: 600, color: "#333",
                    fontFamily: theme.font,
                  }}>
                    {axis.label}
                  </span>
                  <span style={{
                    fontSize: 28, fontWeight: 900, color: "#111",
                    fontFamily: theme.font, marginLeft: "auto",
                  }}>
                    {axis.value}
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
