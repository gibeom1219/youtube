import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { theme } from "../styles/theme";

const COLORS = ["#81D8D0", "#52D68A", "#FFB347"];

interface Series { name: string; values: number[] }
interface Props {
  data: { title: string; labels: string[]; series: Series[] };
}

export const AreaChart: React.FC<Props> = ({ data: props }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { title, labels, series } = props;
  // values 또는 data 필드 모두 허용
  const getValues = (s: any) => s.values ?? s.data ?? [];
  const allVals = series.flatMap((s) => getValues(s));
  const maxVal = Math.max(...allVals);
  const titleOpacity = interpolate(frame, [0, 12], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const titleP = spring({ frame, fps, config: { damping: 100, stiffness: 25 } });
  const drawP = interpolate(frame, [14, 14 + labels.length * 10], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const w = 1500, h = 550, padL = 70, padB = 50, padT = 20;
  const getX = (i: number) => padL + (i / (labels.length - 1)) * (w - padL - 30);
  const getY = (v: number) => padT + ((maxVal - v) / maxVal) * (h - padT - padB);

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", padding: "50px 100px 80px", alignItems: "center" }}>
      <div style={{ fontSize: 40, fontWeight: 700, color: theme.gold, fontFamily: theme.font, textAlign: "center", marginBottom: 20, opacity: titleOpacity, transform: `translateY(${interpolate(titleP, [0, 1], [-16, 0])}px)` }}>
        {title}
      </div>

      {/* Legend */}
      <div style={{ display: "flex", gap: 24, marginBottom: 20 }}>
        {series.map((s, si) => {
          const legOpacity = interpolate(frame, [6 + si * 4, 14 + si * 4], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
          return (
            <div key={si} style={{ display: "flex", alignItems: "center", gap: 8, opacity: legOpacity }}>
              <div style={{ width: 16, height: 16, borderRadius: 4, background: COLORS[si % COLORS.length] }} />
              <span style={{ fontSize: 24, color: theme.grayLight, fontFamily: theme.font }}>{s.name}</span>
            </div>
          );
        })}
      </div>

      <svg width={w} height={h}>
        {/* Grid */}
        {[0.25, 0.5, 0.75, 1].map((r) => {
          const y = getY(maxVal * r);
          return (
            <g key={r}>
              <line x1={padL} y1={y} x2={w - 30} y2={y} stroke="rgba(255,255,255,0.06)" />
              <text x={padL - 10} y={y + 5} fill={theme.gray} fontSize={14} fontFamily={theme.font} textAnchor="end">{Math.round(maxVal * r)}</text>
            </g>
          );
        })}

        {/* Areas + Lines */}
        {series.map((s, si) => {
          const color = COLORS[si % COLORS.length];
          const visibleCount = Math.ceil(drawP * labels.length);
          const vals = getValues(s);
          const pts = vals.slice(0, visibleCount).map((v: number, i: number) => ({ x: getX(i), y: getY(v) }));
          if (pts.length < 2) return null;
          const linePath = pts.map((p: {x: number; y: number}, i: number) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
          const areaPath = `${linePath} L ${pts[pts.length - 1].x} ${h - padB} L ${pts[0].x} ${h - padB} Z`;
          return (
            <g key={si}>
              <path d={areaPath} fill={`${color}12`} />
              <path d={linePath} fill="none" stroke={color} strokeWidth={2.5} strokeLinecap="round" />
              {pts.map((p: {x: number; y: number}, i: number) => (
                <circle key={i} cx={p.x} cy={p.y} r={4} fill={color} stroke={theme.bg} strokeWidth={2} />
              ))}
            </g>
          );
        })}

        {/* X labels */}
        {labels.map((l, i) => {
          const lOpacity = interpolate(frame, [14 + i * 8, 22 + i * 8], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
          return (
            <text key={i} x={getX(i)} y={h - padB + 28} fill={theme.grayLight} fontSize={15} fontFamily={theme.font} textAnchor="middle" opacity={lOpacity}>
              {l}
            </text>
          );
        })}
      </svg>
    </div>
  );
};
