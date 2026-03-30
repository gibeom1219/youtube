import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { theme } from "../styles/theme";

interface Zone {
  label: string;
  color: string;
  from: number;
  to: number;
}

interface Props {
  data: {
    value: number;       // 0~100
    min?: number;
    max?: number;
    label: string;
    unit?: string;
    description?: string;
    zones?: Zone[];
    invert?: boolean;    // true면 높을수록 공포 (VKOSPI 등)
  };
}

const DEFAULT_ZONES: Zone[] = [
  { label: "극단적 공포", color: "#FF4444", from: 0,  to: 20  },
  { label: "공포",       color: "#FF8C42", from: 20, to: 40  },
  { label: "중립",       color: "#FFD700", from: 40, to: 60  },
  { label: "탐욕",       color: "#82D848", from: 60, to: 80  },
  { label: "극단적 탐욕",color: "#52D68A", from: 80, to: 100 },
];

// 높을수록 공포인 지표 (VKOSPI, VIX 등)
const INVERTED_ZONES: Zone[] = [
  { label: "극단적 탐욕",color: "#52D68A", from: 0,  to: 20  },
  { label: "탐욕",       color: "#82D848", from: 20, to: 40  },
  { label: "중립",       color: "#FFD700", from: 40, to: 60  },
  { label: "공포",       color: "#FF8C42", from: 60, to: 80  },
  { label: "극단적 공포",color: "#FF4444", from: 80, to: 100 },
];

export const GaugeMeter: React.FC<Props> = ({ data }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const zones = data.zones ?? (data.invert ? INVERTED_ZONES : DEFAULT_ZONES);
  const min = data.min ?? 0;
  const max = data.max ?? 100;
  const value = Math.max(min, Math.min(max, data.value));
  const pct = (value - min) / (max - min);

  const titleProgress = spring({ frame, fps, config: { damping: 100, stiffness: 10 } });
  const needleProgress = spring({ frame: frame - 12, fps, config: { damping: 80, stiffness: 25 } });
  const labelProgress  = spring({ frame: frame - 20, fps, config: { damping: 100, stiffness: 10 } });

  const glowPulse = (Math.sin(frame * 0.04) + 1) / 2;

  // 현재 존
  const currentZone = zones.find(z => pct * 100 >= z.from && pct * 100 <= z.to) ?? zones[2];
  const needleAngle = interpolate(Math.min(1, needleProgress), [0, 1], [-180, -180 + pct * 180]);

  // SVG 반원 게이지
  const cx = 300, cy = 300, r = 240;
  const arcStart = -Math.PI;
  const arcEnd = 0;

  const polarToXY = (angle: number, radius: number) => ({
    x: cx + radius * Math.cos(angle),
    y: cy + radius * Math.sin(angle),
  });

  // 존별 호(arc) 경로
  const zoneArcs = zones.map(z => {
    const startAngle = arcStart + (z.from / 100) * Math.PI;
    const endAngle   = arcStart + (z.to   / 100) * Math.PI;
    const s = polarToXY(startAngle, r);
    const e = polarToXY(endAngle, r);
    const largeArc = (z.to - z.from) > 50 ? 1 : 0;
    return { path: `M ${s.x} ${s.y} A ${r} ${r} 0 ${largeArc} 1 ${e.x} ${e.y}`, color: z.color };
  });

  // 바늘 끝 위치
  const needleRad = (needleAngle * Math.PI) / 180;
  const needleTip = { x: cx + r * 0.85 * Math.cos(needleRad), y: cy + r * 0.85 * Math.sin(needleRad) };

  return (
    <div style={{
      width: "100%", height: "100%",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      padding: "40px 120px",
      gap: 0,
    }}>
      {/* 제목 */}
      <div style={{
        fontSize: 48, fontWeight: 900, color: theme.white,
        fontFamily: theme.font, textAlign: "center",
        marginBottom: 16,
        opacity: Math.min(1, titleProgress),
        transform: `translateY(${interpolate(Math.min(1, titleProgress), [0, 1], [-20, 0])}px)`,
      }}>
        {data.label}
      </div>

      {/* 게이지 SVG */}
      <div style={{
        opacity: Math.min(1, needleProgress),
        transform: `scale(${interpolate(Math.min(1, needleProgress), [0, 1], [0.8, 1])})`,
      }}>
        <svg width={600} height={330} viewBox="0 0 600 320">
          {/* 배경 아크 */}
          <path d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`}
            fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth={36} strokeLinecap="butt" />

          {/* 존별 컬러 아크 */}
          {zoneArcs.map((arc, i) => (
            <path key={i} d={arc.path} fill="none" stroke={arc.color}
              strokeWidth={36} strokeLinecap="butt" opacity={0.85} />
          ))}

          {/* 눈금 (0, 25, 50, 75, 100) */}
          {[0, 25, 50, 75, 100].map(tick => {
            const angle = arcStart + (tick / 100) * Math.PI;
            const inner = polarToXY(angle, r - 28);
            const outer = polarToXY(angle, r + 12);
            const label = polarToXY(angle, r - 60);
            return (
              <g key={tick}>
                <line x1={inner.x} y1={inner.y} x2={outer.x} y2={outer.y}
                  stroke="rgba(255,255,255,0.4)" strokeWidth={2} />
                <text x={label.x} y={label.y + 5} textAnchor="middle"
                  fill="rgba(255,255,255,0.5)" fontSize={22} fontFamily={theme.font}>
                  {tick}
                </text>
              </g>
            );
          })}

          {/* 바늘 */}
          <line x1={cx} y1={cy} x2={needleTip.x} y2={needleTip.y}
            stroke={currentZone.color} strokeWidth={5} strokeLinecap="round"
            style={{ filter: `drop-shadow(0 0 ${6 + glowPulse * 4}px ${currentZone.color})` }} />
          <circle cx={cx} cy={cy} r={14} fill={currentZone.color}
            style={{ filter: `drop-shadow(0 0 ${8 + glowPulse * 6}px ${currentZone.color})` }} />

          {/* 중앙 숫자 */}
          <text x={cx} y={cy - 45} textAnchor="middle"
            fill={currentZone.color} fontSize={72} fontWeight="900"
            fontFamily={theme.font}
            style={{ filter: `drop-shadow(0 0 ${10 + glowPulse * 8}px ${currentZone.color})` }}>
            {value}
          </text>
          {data.unit && (
            <text x={cx} y={cy - 6} textAnchor="middle"
              fill="rgba(255,255,255,0.5)" fontSize={26} fontFamily={theme.font}>
              {data.unit}
            </text>
          )}
        </svg>
      </div>

      {/* 존 라벨 */}
      <div style={{
        background: `${currentZone.color}18`,
        border: `2px solid ${currentZone.color}60`,
        borderRadius: 50, padding: "14px 44px",
        fontSize: 36, fontWeight: 800, color: currentZone.color,
        fontFamily: theme.font, marginTop: -4,
        opacity: Math.min(1, labelProgress),
        boxShadow: `0 0 ${16 + glowPulse * 12}px ${currentZone.color}30`,
      }}>
        {currentZone.label}
      </div>

      {data.description && (
        <div style={{
          fontSize: 24, color: theme.grayLight, fontFamily: theme.font,
          textAlign: "center", marginTop: 20, lineHeight: 1.5,
          opacity: Math.min(1, labelProgress),
          transform: `translateY(${interpolate(Math.min(1, labelProgress), [0, 1], [16, 0])}px)`,
        }}>
          {data.description}
        </div>
      )}
    </div>
  );
};
