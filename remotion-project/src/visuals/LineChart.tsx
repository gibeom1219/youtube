import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { theme } from "../styles/theme";
import { useSceneTheme } from "../contexts/SceneTheme";

interface Props {
  data: { title: string; unit?: string; data: Array<{ label: string; value: number }>; trend?: "up" | "down" | "mixed" };
}

export const LineChart: React.FC<Props> = ({ data: props }) => {
  const theme = useSceneTheme();
  const frame = useCurrentFrame();
  if (!props) return null;
  const { fps } = useVideoConfig();

  const { title, unit, data, trend = "mixed" } = props;
  const maxVal = Math.max(...data.map((d) => d.value));
  const minVal = Math.min(...data.map((d) => d.value));
  const range = maxVal - minVal || 1;
  const baseVal = Math.floor(minVal * 0.9);
  const topVal = maxVal;
  const effectiveRange = topVal - baseVal || 1;

  const trendColor = trend === "up" ? theme.green : trend === "down" ? theme.red : theme.tiffany;

  const titleP = spring({ frame, fps, config: { damping: 100, stiffness: 25 } });
  const titleOpacity = interpolate(frame, [0, 12], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const chartW = 1600;
  const chartH = 600;
  const padL = 80;
  const padB = 60;

  const getX = (i: number) => padL + (i / (data.length - 1)) * (chartW - padL - 40);
  const getY = (v: number) => chartH - padB - ((v - baseVal) / effectiveRange) * (chartH - padB - 40);

  // Build path
  const points = data.map((d, i) => ({ x: getX(i), y: getY(d.value) }));
  const linePath = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
  const areaPath = `${linePath} L ${points[points.length - 1].x} ${chartH - padB} L ${points[0].x} ${chartH - padB} Z`;

  const drawProgress = interpolate(frame, [15, 15 + data.length * 12], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", padding: "60px 100px 80px" }}>
      <div style={{
        fontSize: 40, fontWeight: 700, color: theme.gold, fontFamily: theme.font,
        textAlign: "center", marginBottom: 40, opacity: titleOpacity,
        transform: `translateY(${interpolate(titleP, [0, 1], [-16, 0])}px)`,
      }}>
        {title}{unit ? ` (${unit})` : ""}
      </div>

      <svg width={chartW} height={chartH} style={{ margin: "0 auto" }}>
        {/* Grid lines */}
        {[0, 0.25, 0.5, 0.75, 1].map((r) => {
          const y = chartH - padB - r * (chartH - padB - 40);
          const val = baseVal + r * effectiveRange;
          return (
            <g key={r}>
              <line x1={padL} y1={y} x2={chartW - 40} y2={y} stroke="rgba(255,255,255,0.07)" />
              <text x={padL - 10} y={y + 5} fill={theme.gray} fontSize={16} fontFamily={theme.font} textAnchor="end">
                {Math.round(val)}
              </text>
            </g>
          );
        })}

        {/* Area fill */}
        <path d={areaPath} fill={`${trendColor}15`} strokeDasharray="2000" strokeDashoffset={2000 * (1 - drawProgress)} />

        {/* Line */}
        <path d={linePath} fill="none" stroke={trendColor} strokeWidth={3}
          strokeDasharray="2000" strokeDashoffset={2000 * (1 - drawProgress)} strokeLinecap="round" />

        {/* Points + Labels */}
        {points.map((p, i) => {
          const pointP = interpolate(frame, [15 + i * 12, 25 + i * 12], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
          return (
            <g key={i} opacity={pointP}>
              <circle cx={p.x} cy={p.y} r={6} fill={trendColor} stroke={theme.bg} strokeWidth={2} />
              <text x={p.x} y={p.y - 16} fill={theme.white} fontSize={18} fontWeight={700} fontFamily={theme.font} textAnchor="middle">
                {data[i].value}
              </text>
              <text x={p.x} y={chartH - padB + 30} fill={theme.grayLight} fontSize={16} fontFamily={theme.font} textAnchor="middle">
                {data[i].label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};
