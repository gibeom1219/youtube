import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { theme } from "../styles/theme";
import { useSceneTheme } from "../contexts/SceneTheme";

interface Segment {
  label: string;
  value: number;
  color: string;
}

interface Chamber {
  name: string;
  total: number;
  majority?: number;
  segments: Segment[];
  emoji?: string;
}

interface Props {
  data: {
    title: string;
    subtitle?: string;
    chambers: Chamber[];
  };
}

// 반원 아크 경로 (filled wedge)
const wedgePath = (cx: number, cy: number, outerR: number, innerR: number, startAngle: number, endAngle: number) => {
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  // Outer arc: startAngle → endAngle
  const ox1 = cx + outerR * Math.cos(toRad(startAngle));
  const oy1 = cy - outerR * Math.sin(toRad(startAngle));
  const ox2 = cx + outerR * Math.cos(toRad(endAngle));
  const oy2 = cy - outerR * Math.sin(toRad(endAngle));
  // Inner arc: endAngle → startAngle (reverse)
  const ix1 = cx + innerR * Math.cos(toRad(endAngle));
  const iy1 = cy - innerR * Math.sin(toRad(endAngle));
  const ix2 = cx + innerR * Math.cos(toRad(startAngle));
  const iy2 = cy - innerR * Math.sin(toRad(startAngle));

  const sweep = Math.abs(startAngle - endAngle);
  const largeArc = sweep > 180 ? 1 : 0;

  return [
    `M ${ox1} ${oy1}`,
    `A ${outerR} ${outerR} 0 ${largeArc} 1 ${ox2} ${oy2}`,
    `L ${ix1} ${iy1}`,
    `A ${innerR} ${innerR} 0 ${largeArc} 0 ${ix2} ${iy2}`,
    `Z`,
  ].join(" ");
};

const SemiCircle: React.FC<{
  cx: number; cy: number; radius: number;
  chamber: Chamber; frame: number; fps: number; delay: number;
  theme: any;
}> = ({ cx, cy, radius, chamber, frame, fps, delay, theme }) => {
  const total = chamber.total;
  const growP = interpolate(frame, [delay, delay + 25], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const labelOpacity = interpolate(frame, [delay + 15, delay + 25], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const majorityOpacity = interpolate(frame, [delay + 20, delay + 30], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const innerRadius = radius * 0.5;

  // 세그먼트 (180도 반원, 왼쪽 180도 → 오른쪽 0도)
  let currentAngle = 180;
  const segWedges: Array<{ path: string; color: string; label: string; value: number; midAngle: number }> = [];

  for (const seg of chamber.segments) {
    const sweep = (seg.value / total) * 180 * growP;
    const endAngle = currentAngle - sweep;
    if (sweep > 0.5) {
      const midAngle = currentAngle - sweep / 2;
      segWedges.push({
        path: wedgePath(cx, cy, radius, innerRadius, currentAngle, Math.max(0, endAngle)),
        color: seg.color,
        label: seg.label,
        value: seg.value,
        midAngle,
      });
    }
    currentAngle = endAngle;
  }

  // 과반 라인
  const majorityAngle = chamber.majority
    ? 180 - (chamber.majority / total) * 180
    : 90;
  const majOuterX = cx + (radius + 6) * Math.cos((majorityAngle * Math.PI) / 180);
  const majOuterY = cy - (radius + 6) * Math.sin((majorityAngle * Math.PI) / 180);
  const majInnerX = cx + (innerRadius - 6) * Math.cos((majorityAngle * Math.PI) / 180);
  const majInnerY = cy - (innerRadius - 6) * Math.sin((majorityAngle * Math.PI) / 180);
  // 과반 라벨 위치 (반원 위)
  const majLabelX = cx + (radius + 50) * Math.cos((majorityAngle * Math.PI) / 180);
  const majLabelY = cy - (radius + 50) * Math.sin((majorityAngle * Math.PI) / 180);

  return (
    <g>
      {/* 배경 반원 (연한 회색) */}
      <path
        d={wedgePath(cx, cy, radius, innerRadius, 180, 0)}
        fill="rgba(0,0,0,0.06)"
      />

      {/* 세그먼트 (채워진 wedge, 반투명으로 배경 질감 비침) */}
      {segWedges.map((seg, i) => (
        <path key={i} d={seg.path} fill={seg.color} opacity={0.85} />
      ))}

      {/* 세그먼트 라벨 (이름 + 석수) */}
      {segWedges.map((seg, i) => {
        const labelR = (radius + innerRadius) / 2;
        const lx = cx + labelR * Math.cos((seg.midAngle * Math.PI) / 180);
        const ly = cy - labelR * Math.sin((seg.midAngle * Math.PI) / 180);
        return (
          <g key={`label-${i}`} opacity={labelOpacity}>
            <text
              x={lx} y={ly - 14}
              fill="white" fontSize={36} fontWeight={700}
              fontFamily={theme.font} textAnchor="middle"
            >
              {seg.label}
            </text>
            <text
              x={lx} y={ly + 28}
              fill="white" fontSize={40} fontWeight={900}
              fontFamily="Pretendard, sans-serif" textAnchor="middle"
            >
              {seg.value}석
            </text>
          </g>
        );
      })}

      {/* 과반 라인 */}
      {chamber.majority && (
        <g opacity={majorityOpacity}>
          <line
            x1={majInnerX} y1={majInnerY} x2={majOuterX} y2={majOuterY}
            stroke="rgba(255,255,255,0.8)" strokeWidth={2.5}
          />
          {/* 과반 라벨 + 화살표 */}
          <text
            x={majLabelX} y={majLabelY - 12}
            fill="#333" fontSize={40} fontWeight={800}
            fontFamily={theme.font} textAnchor="middle"
          >
            과반 {chamber.majority}석
          </text>
          {/* 아래 화살표 */}
          <polygon
            points={`${majLabelX},${majLabelY + 2} ${majLabelX - 8},${majLabelY - 6} ${majLabelX + 8},${majLabelY - 6}`}
            fill="#888"
          />
        </g>
      )}

      {/* 하단: 이름 + 총 석수 (큰 글씨, 반원에 가깝게) */}
      <text
        x={cx} y={cy + 30}
        fill="#222" fontSize={58} fontWeight={900}
        fontFamily={theme.font} textAnchor="middle"
        opacity={labelOpacity}
      >
        {chamber.name}
      </text>
      <text
        x={cx} y={cy + 84}
        fill="#222" fontSize={54} fontWeight={900}
        fontFamily="Pretendard, sans-serif" textAnchor="middle"
        opacity={labelOpacity}
      >
        {chamber.total}석
      </text>
    </g>
  );
};

export const ParliamentChart: React.FC<Props> = ({ data }) => {
  const theme = useSceneTheme();
  const frame = useCurrentFrame();
  if (!data) return null;
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 14], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const chamberCount = (data.chambers ?? []).length;
  const isSingle = chamberCount === 1;

  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      {/* 흰색 배경 패널 + 도화지 질감 */}
      <div style={{
        position: "absolute", inset: 20,
        background: "linear-gradient(180deg, #f0f0ec 0%, #e8e8e4 100%)",
        borderRadius: 12,
        overflow: "hidden",
      }}>
        <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.12, pointerEvents: "none" }}>
          <defs>
            <filter id="parliament-paper" x="0" y="0" width="100%" height="100%">
              <feTurbulence type="turbulence" baseFrequency="0.15" numOctaves="5" seed={11} stitchTiles="stitch" result="noise" />
              <feDiffuseLighting in="noise" lightingColor="white" surfaceScale="3" result="lit">
                <feDistantLight azimuth="135" elevation="45" />
              </feDiffuseLighting>
            </filter>
          </defs>
          <rect width="100%" height="100%" filter="url(#parliament-paper)" />
        </svg>
      </div>

      {/* 타이틀 */}
      <div style={{
        position: "absolute", top: 100, left: 0, right: 0,
        textAlign: "center", opacity: titleOpacity,
      }}>
        <div style={{
          fontSize: 52, fontWeight: 900, color: "#1a1a1a",
          fontFamily: theme.font, letterSpacing: -1,
        }}>
          {data.title}
        </div>
        {data.subtitle && (
          <div style={{
            fontSize: 26, color: "#888",
            fontFamily: theme.font, marginTop: 10,
          }}>
            ({data.subtitle})
          </div>
        )}
      </div>

      <svg viewBox="0 0 1920 1080" style={{ width: "100%", height: "100%", position: "absolute", inset: 0 }}>
        {(data.chambers ?? []).map((chamber, i) => {
          const cx = isSingle ? 960 : (i === 0 ? 560 : 1360);
          const cy = 680;
          const radius = isSingle ? 360 : 310;
          return (
            <SemiCircle
              key={i}
              cx={cx} cy={cy} radius={radius}
              chamber={chamber}
              frame={frame} fps={fps}
              delay={8 + i * 12}
              theme={theme}
            />
          );
        })}

      </svg>
    </div>
  );
};
