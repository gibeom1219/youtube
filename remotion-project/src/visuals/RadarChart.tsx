import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { theme } from "../styles/theme";
import { useSceneTheme } from "../contexts/SceneTheme";

interface Props {
  data: { title: string; labels: string[]; values: number[]; max?: number };
}

export const RadarChart: React.FC<Props> = ({ data: props }) => {
  const theme = useSceneTheme();
  const frame = useCurrentFrame();
  if (!props) return null;
  const { fps } = useVideoConfig();
  const { title, labels, values, max = 100 } = props;
  const n = labels.length;
  const cx = 400, cy = 340, r = 260;
  const titleOpacity = interpolate(frame, [0, 12], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const titleP = spring({ frame, fps, config: { damping: 100, stiffness: 25 } });
  const drawP = interpolate(frame, [12, 50], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const getPoint = (i: number, ratio: number) => {
    const angle = (Math.PI * 2 * i) / n - Math.PI / 2;
    return { x: cx + Math.cos(angle) * r * ratio, y: cy + Math.sin(angle) * r * ratio };
  };

  const gridLevels = [0.2, 0.4, 0.6, 0.8, 1.0];
  const dataPoints = values.map((v, i) => getPoint(i, (v / max) * drawP));
  const dataPath = dataPoints.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ") + " Z";

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", padding: "50px 100px" }}>
      <div style={{ fontSize: 40, fontWeight: 700, color: theme.gold, fontFamily: theme.font, textAlign: "center", marginBottom: 20, opacity: titleOpacity, transform: `translateY(${interpolate(titleP, [0, 1], [-16, 0])}px)` }}>
        {title}
      </div>
      <svg width={800} height={700} style={{ margin: "0 auto" }}>
        {gridLevels.map((lv) => {
          const pts = Array.from({ length: n }, (_, i) => getPoint(i, lv));
          const path = pts.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ") + " Z";
          return <path key={lv} d={path} fill="none" stroke="rgba(255,255,255,0.22)" strokeWidth={1} />;
        })}
        {Array.from({ length: n }, (_, i) => {
          const p = getPoint(i, 1);
          return <line key={i} x1={cx} y1={cy} x2={p.x} y2={p.y} stroke="rgba(255,255,255,0.20)" />;
        })}
        <path d={dataPath} fill={`${theme.tiffany}20`} stroke={theme.tiffany} strokeWidth={2.5} />
        {dataPoints.map((p, i) => {
          const pointOpacity = interpolate(frame, [20 + i * 6, 30 + i * 6], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
          const labelP = getPoint(i, 1.18);
          return (
            <g key={i} opacity={pointOpacity}>
              <circle cx={p.x} cy={p.y} r={5} fill={theme.tiffany} stroke={theme.bg} strokeWidth={2} />
              <text x={labelP.x} y={labelP.y} fill={theme.grayLight} fontSize={18} fontFamily={theme.font} textAnchor="middle" dominantBaseline="middle">{labels[i]}</text>
              <text x={p.x} y={p.y - 16} fill={theme.white} fontSize={16} fontWeight={700} fontFamily={theme.font} textAnchor="middle">{values[i]}</text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};
