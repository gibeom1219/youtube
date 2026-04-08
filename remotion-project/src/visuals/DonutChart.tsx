import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { theme } from "../styles/theme";
import { useSceneTheme } from "../contexts/SceneTheme";

interface Segment {
  label: string;
  value: number;
  color?: string;
}

interface Props {
  data: {
    title?: string;
    segments: Segment[];
    center_text?: string;
    center_sub?: string;
  };
}

const PALETTE = [
  "#81D8D0", "#52D68A", "#FFB347", "#C084FC",
  "#FF6B6B", "#4ECDC4", "#FFE66D", "#A8E6CF",
];

export const DonutChart: React.FC<Props> = ({ data }) => {
  const theme = useSceneTheme();
  const frame = useCurrentFrame();
  if (!data) return null;
  const { fps } = useVideoConfig();

  const titleProgress  = spring({ frame,         fps, config: { damping: 100, stiffness: 10 } });
  const chartProgress  = spring({ frame: frame - 8,  fps, config: { damping: 80,  stiffness: 5 } });
  const legendProgress = spring({ frame: frame - 20, fps, config: { damping: 100, stiffness: 5 } });

  const glowPulse = (Math.sin(frame * 0.04) + 1) / 2;

  const total = (data.segments ?? []).reduce((s, seg) => s + seg.value, 0);

  // SVG 도넛 (cx=220, cy=220, outerR=180, innerR=110)
  const cx = 220, cy = 220, outerR = 180, innerR = 110;

  const polarToXY = (angleDeg: number, r: number) => ({
    x: cx + r * Math.cos((angleDeg - 90) * Math.PI / 180),
    y: cy + r * Math.sin((angleDeg - 90) * Math.PI / 180),
  });

  const revealAngle = interpolate(Math.min(1, chartProgress), [0, 1], [0, 360]);

  // 세그먼트 경로 생성
  let cumulativeAngle = 0;
  const segments = (data.segments ?? []).map((seg, i) => {
    const angle = (seg.value / total) * 360;
    const visibleAngle = Math.min(angle, Math.max(0, revealAngle - cumulativeAngle));
    const startAngle = cumulativeAngle;
    const endAngle = startAngle + visibleAngle;
    const color = seg.color ?? PALETTE[i % PALETTE.length];

    cumulativeAngle += angle;

    if (visibleAngle < 0.5) return { path: null, color, seg, pct: (seg.value / total * 100).toFixed(1) };

    const s = polarToXY(startAngle, outerR);
    const e = polarToXY(endAngle,   outerR);
    const si = polarToXY(startAngle, innerR);
    const ei = polarToXY(endAngle,   innerR);
    const largeArc = visibleAngle > 180 ? 1 : 0;

    const path = [
      `M ${s.x} ${s.y}`,
      `A ${outerR} ${outerR} 0 ${largeArc} 1 ${e.x} ${e.y}`,
      `L ${ei.x} ${ei.y}`,
      `A ${innerR} ${innerR} 0 ${largeArc} 0 ${si.x} ${si.y}`,
      "Z",
    ].join(" ");

    return { path, color, seg, pct: (seg.value / total * 100).toFixed(1) };
  });

  return (
    <div style={{
      width: "100%", height: "100%",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      padding: "40px 100px",
    }}>
      {data.title && (
        <div style={{
          fontSize: 40, fontWeight: 900, color: theme.white,
          fontFamily: theme.font, textAlign: "center",
          marginBottom: 32,
          opacity: Math.min(1, titleProgress),
          transform: `translateY(${interpolate(Math.min(1, titleProgress), [0, 1], [-20, 0])}px)`,
        }}>
          {data.title}
        </div>
      )}

      <div style={{ display: "flex", alignItems: "center", gap: 60 }}>
        {/* 도넛 SVG */}
        <div style={{ position: "relative", flexShrink: 0 }}>
          <svg width={440} height={440} viewBox="0 0 440 440">
            {/* 배경 */}
            <circle cx={cx} cy={cy} r={outerR} fill="none"
              stroke="rgba(255,255,255,0.20)" strokeWidth={outerR - innerR} />

            {/* 세그먼트 */}
            {segments.map((s, i) =>
              s.path ? (
                <path key={i} d={s.path} fill={s.color}
                  opacity={0.9}
                  style={{ filter: `drop-shadow(0 0 ${4 + glowPulse * 4}px ${s.color}50)` }} />
              ) : null
            )}

            {/* 중앙 텍스트 */}
            {data.center_text && (
              <>
                <text x={cx} y={cy - 10} textAnchor="middle"
                  fill={theme.tiffany} fontSize={28} fontWeight="900"
                  fontFamily={theme.font}>
                  {data.center_text}
                </text>
                {data.center_sub && (
                  <text x={cx} y={cy + 24} textAnchor="middle"
                    fill="rgba(255,255,255,0.5)" fontSize={20} fontFamily={theme.font}>
                    {data.center_sub}
                  </text>
                )}
              </>
            )}
          </svg>
        </div>

        {/* 범례 */}
        <div style={{
          display: "flex", flexDirection: "column", gap: 16,
          opacity: Math.min(1, legendProgress),
          transform: `translateX(${interpolate(Math.min(1, legendProgress), [0, 1], [40, 0])}px)`,
        }}>
          {segments.map((s, i) => (
            <div key={i} style={{
              display: "flex", alignItems: "center", gap: 16,
            }}>
              <div style={{
                width: 16, height: 16, borderRadius: 4,
                background: s.color, flexShrink: 0,
                boxShadow: `0 0 ${6 + glowPulse * 4}px ${s.color}80`,
              }} />
              <div style={{ display: "flex", gap: 12, alignItems: "baseline" }}>
                <div style={{
                  fontSize: 28, fontWeight: 700, color: s.color,
                  fontFamily: theme.font, minWidth: 60,
                }}>
                  {s.pct}%
                </div>
                <div style={{
                  fontSize: 26, color: theme.white,
                  fontFamily: theme.font, fontWeight: 500,
                }}>
                  {s.seg.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
