import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { theme } from "../styles/theme";
import { useSceneTheme } from "../contexts/SceneTheme";

interface StatCard {
  label: string;
  value: string;
  color: string;
}

interface Props {
  data: {
    title: string;
    subtitle?: string;
    prices: number[];
    dates: string[];
    stats?: StatCard[];
    color?: string;
  };
}

export const ReportChart: React.FC<Props> = ({ data }) => {
  const theme = useSceneTheme();
  const frame = useCurrentFrame();
  if (!data) return null;
  const { fps } = useVideoConfig();

  const chartColor = data.color ?? "#6BA4D9";
  const prices = data.prices;
  const n = prices.length;
  if (n < 2) return null;

  const titleOpacity = interpolate(frame, [0, 14], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const minP = Math.min(...prices);
  const maxP = Math.max(...prices);
  const range = maxP - minP || 1;

  // Y축 범위: 깔끔한 눈금을 위해 step 기반 계산
  const rawStep = range / 4;
  const step = rawStep <= 2 ? 1 : rawStep <= 5 ? 5 : rawStep <= 10 ? 10 : Math.ceil(rawStep / 5) * 5;
  const yMin = Math.floor(minP / step) * step;
  const yMax = Math.ceil(maxP / step) * step + step;
  const yRange = yMax - yMin;

  // Y축 눈금
  const yTicks: number[] = [];
  for (let v = yMin; v <= yMax; v += step) {
    yTicks.push(v);
  }

  // 차트 영역 (양쪽 여백 동일하게)
  const hasStats = data.stats && (data.stats ?? []).length > 0;
  const chartLeft = 280;
  const chartRight = hasStats ? 1100 : 1440;
  const chartTop = 240;
  const chartBottom = 820;
  const chartW = chartRight - chartLeft;
  const chartH = chartBottom - chartTop;

  const getX = (i: number) => chartLeft + (i / (n - 1)) * chartW;
  const getY = (val: number) => chartBottom - ((val - yMin) / yRange) * chartH;

  // 라인 드로우 애니메이션
  const drawProgress = interpolate(frame, [12, 12 + n * 3], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const visibleCount = Math.min(n, Math.floor(drawProgress * n) + 1);

  // 라인 경로
  const linePath = prices
    .slice(0, visibleCount)
    .map((p, i) => `${i === 0 ? "M" : "L"} ${getX(i)} ${getY(p)}`)
    .join(" ");

  // 영역 채우기
  const areaPath = visibleCount >= 2
    ? linePath + ` L ${getX(visibleCount - 1)} ${chartBottom} L ${chartLeft} ${chartBottom} Z`
    : "";

  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      {/* 흰색 배경 패널 + 도화지 질감 */}
      <div style={{
        position: "absolute", inset: 20,
        background: "linear-gradient(180deg, #f0f0ec 0%, #e8e8e4 100%)",
        borderRadius: 12,
        overflow: "hidden",
      }}>
        {/* 도화지 질감 */}
        <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.12, pointerEvents: "none" }}>
          <defs>
            <filter id="report-paper" x="0" y="0" width="100%" height="100%">
              <feTurbulence type="turbulence" baseFrequency="0.15" numOctaves="5" seed={7} stitchTiles="stitch" result="noise" />
              <feDiffuseLighting in="noise" lightingColor="white" surfaceScale="3" result="lit">
                <feDistantLight azimuth="135" elevation="45" />
              </feDiffuseLighting>
            </filter>
          </defs>
          <rect width="100%" height="100%" filter="url(#report-paper)" />
        </svg>
      </div>

      {/* 타이틀 */}
      <div style={{
        position: "absolute", top: 60, left: 0, right: 0,
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

      {/* 차트 SVG */}
      <svg
        viewBox="0 0 1920 1080"
        style={{ width: "100%", height: "100%", position: "absolute", inset: 0 }}
      >
        {/* Y축 눈금선 + 라벨 */}
        {yTicks.map((val, i) => {
          const y = getY(val);
          const tickOpacity = interpolate(frame, [4 + i * 2, 10 + i * 2], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
          return (
            <g key={i} opacity={tickOpacity}>
              <line
                x1={chartLeft} y1={y} x2={chartRight} y2={y}
                stroke="rgba(0,0,0,0.1)" strokeWidth={1}
              />
              <text
                x={chartLeft - 16} y={y + 7}
                fill="#999" fontSize={26} fontWeight={500}
                fontFamily="Pretendard, sans-serif"
                textAnchor="end"
              >
                {val}
              </text>
            </g>
          );
        })}

        {/* 영역 채우기 */}
        <defs>
          <linearGradient id="report-area" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={chartColor} stopOpacity={0.35} />
            <stop offset="100%" stopColor={chartColor} stopOpacity={0.08} />
          </linearGradient>
        </defs>
        {visibleCount >= 2 && <path d={areaPath} fill="url(#report-area)" />}

        {/* 라인 */}
        {visibleCount >= 2 && (
          <path d={linePath} fill="none" stroke={chartColor} strokeWidth={3.5} strokeLinecap="round" strokeLinejoin="round" />
        )}

        {/* 데이터 포인트 + 라벨 */}
        {prices.slice(0, visibleCount).map((p, i) => {
          const x = getX(i);
          const y = getY(p);
          const pointDelay = 12 + i * 3;
          const pointOpacity = interpolate(frame, [pointDelay, pointDelay + 6], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

          return (
            <g key={i} opacity={pointOpacity}>
              <circle cx={x} cy={y} r={6} fill="white" stroke={chartColor} strokeWidth={3} />
              <text
                x={x} y={y - 20}
                fill="#333" fontSize={26} fontWeight={800}
                fontFamily="Pretendard, sans-serif"
                textAnchor="middle"
              >
                {p}
              </text>
            </g>
          );
        })}

        {/* X축 날짜 */}
        {(data.dates ?? []).map((date, i) => {
          const idx = Math.round((i / ((data.dates ?? []).length - 1)) * (n - 1));
          const x = getX(idx);
          const dateOpacity = interpolate(frame, [8, 18], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
          return (
            <text
              key={i} x={x} y={chartBottom + 44}
              fill="#999" fontSize={22} fontFamily="Pretendard, sans-serif"
              textAnchor="middle" opacity={dateOpacity}
            >
              {date}
            </text>
          );
        })}
      </svg>

      {/* 사이드 스탯 카드 */}
      {hasStats && (
        <div style={{
          position: "absolute",
          right: 200, top: 0, bottom: 0,
          display: "flex", flexDirection: "column",
          justifyContent: "center",
          gap: 24,
          width: 360,
        }}>
          {data.stats!.map((stat, i) => {
            const cardDelay = 20 + n * 3 + i * 8;
            const cardP = spring({ frame: frame - cardDelay, fps, config: { damping: 100, stiffness: 10 } });
            const cardOpacity = interpolate(frame, [cardDelay, cardDelay + 10], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

            return (
              <div key={i} style={{
                background: stat.color,
                borderRadius: 14,
                padding: "24px 32px 28px",
                opacity: cardOpacity,
                transform: `translateX(${interpolate(cardP, [0, 1], [40, 0])}px)`,
              }}>
                <div style={{
                  fontSize: 26, fontWeight: 700, color: "rgba(255,255,255,0.95)",
                  fontFamily: theme.font, marginBottom: 10,
                }}>
                  {stat.label}
                </div>
                <div style={{
                  fontSize: 72, fontWeight: 900, color: "#FFFFFF",
                  fontFamily: "Pretendard, sans-serif",
                  lineHeight: 1,
                }}>
                  {stat.value}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
