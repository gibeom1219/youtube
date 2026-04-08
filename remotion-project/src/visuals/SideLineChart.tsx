import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { useSceneTheme } from "../contexts/SceneTheme";

interface Props {
  data: {
    title: string;
    subtitle?: string;
    side?: "left" | "right";
    values: number[];
    labels: string[];
    color?: string;
    unit?: string;
  };
}

export const SideLineChart: React.FC<Props> = ({ data }) => {
  const theme = useSceneTheme();
  const frame = useCurrentFrame();
  if (!data) return null;
  const side = data.side ?? "left";
  const isLeft = side === "left";

  const titleOpacity = interpolate(frame, [0, 14], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const color = data.color ?? "#e67e22";
  const unit = data.unit ?? "";

  const values = data.values;
  const n = values.length;
  const minV = Math.min(...values);
  const maxV = Math.max(...values);
  const range = maxV - minV || 1;

  const chartW = 680, chartH = 360;
  const padL = 70, padT = 50, padB = 50;
  const drawW = chartW - padL - 20;
  const drawH = chartH - padT - padB;

  const getX = (i: number) => padL + (i / (n - 1)) * drawW;
  const getY = (v: number) => padT + drawH - ((v - minV) / range) * drawH;

  const drawProgress = interpolate(frame, [12, 12 + n * 4], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const visibleCount = Math.min(n, Math.floor(drawProgress * n) + 1);

  const linePath = values.slice(0, visibleCount).map((v, i) => `${i === 0 ? "M" : "L"} ${getX(i)} ${getY(v)}`).join(" ");
  const areaPath = visibleCount >= 2
    ? linePath + ` L ${getX(visibleCount - 1)} ${padT + drawH} L ${padL} ${padT + drawH} Z`
    : "";

  const contentStyle = isLeft
    ? { left: 140, right: "auto" as const }
    : { right: 140, left: "auto" as const };

  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      {/* 반투명 배경 패널 */}
      <div style={{
        position: "absolute", top: 0, bottom: 0,
        ...contentStyle,
        width: 820,
        background: "rgba(255,255,255,0.88)",
        borderRadius: 0, zIndex: 2,
      }} />
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
          fontFamily: theme.font, marginBottom: 6,
          opacity: titleOpacity, letterSpacing: -1,
        }}>
          {data.title}
        </div>
        {data.subtitle && (
          <div style={{
            fontSize: 26, fontWeight: 600, color: "#666",
            fontFamily: theme.font, marginBottom: 20, opacity: titleOpacity,
          }}>
            {data.subtitle}
          </div>
        )}

        {/* 차트 */}
        <svg width={chartW} height={chartH} viewBox={`0 0 ${chartW} ${chartH}`}>
          {/* Y축 눈금 */}
          {[0, 0.25, 0.5, 0.75, 1].map((pct, i) => {
            const y = padT + drawH * (1 - pct);
            const val = Math.round(minV + range * pct);
            return (
              <g key={i} opacity={interpolate(frame, [4 + i * 2, 10 + i * 2], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}>
                <line x1={padL} y1={y} x2={padL + drawW} y2={y} stroke="rgba(0,0,0,0.08)" strokeWidth={1} />
                <text x={padL - 10} y={y + 5} fill="#999" fontSize={18} fontWeight={500} textAnchor="end" fontFamily="Pretendard, sans-serif">
                  {val}{unit}
                </text>
              </g>
            );
          })}

          {/* 영역 */}
          <defs>
            <linearGradient id="slc-area" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity={0.3} />
              <stop offset="100%" stopColor={color} stopOpacity={0.05} />
            </linearGradient>
          </defs>
          {visibleCount >= 2 && <path d={areaPath} fill="url(#slc-area)" />}

          {/* 라인 */}
          {visibleCount >= 2 && (
            <path d={linePath} fill="none" stroke={color} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />
          )}

          {/* 포인트 */}
          {values.slice(0, visibleCount).map((v, i) => {
            const pointDelay = 12 + i * 4;
            const pOp = interpolate(frame, [pointDelay, pointDelay + 6], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
            return (
              <g key={i} opacity={pOp}>
                <circle cx={getX(i)} cy={getY(v)} r={5} fill="white" stroke={color} strokeWidth={2.5} />
                {(i === 0 || i === n - 1) && (
                  <text x={getX(i)} y={getY(v) - 14} fill="#111" fontSize={20} fontWeight={800} textAnchor="middle" fontFamily="Pretendard, sans-serif">
                    {v}{unit}
                  </text>
                )}
              </g>
            );
          })}

          {/* X축 라벨 */}
          {(data.labels ?? []).map((label, i) => {
            const idx = Math.round((i / ((data.labels ?? []).length - 1)) * (n - 1));
            return (
              <text key={i} x={getX(idx)} y={padT + drawH + 30} fill="#999" fontSize={18} textAnchor="middle"
                fontFamily="Pretendard, sans-serif"
                opacity={interpolate(frame, [8, 18], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
              >
                {label}
              </text>
            );
          })}
        </svg>
      </div>
    </div>
  );
};
