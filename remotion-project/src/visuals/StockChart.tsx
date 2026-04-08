import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { theme } from "../styles/theme";
import { useSceneTheme } from "../contexts/SceneTheme";

interface Props {
  data: {
    title: string;
    prices: number[];
    dates?: string[];
    volumes?: number[];
    high?: { value: string; index: number };
    low?: { value: string; index: number };
    current?: string;
    color?: string;
  };
}

export const StockChart: React.FC<Props> = ({ data }) => {
  const theme = useSceneTheme();
  const frame = useCurrentFrame();
  if (!data) return null;
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 14], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const chartColor = data.color ?? "#4A9FFF";
  const prices = data.prices;
  const n = prices.length;
  if (n < 2) return null;

  const minP = Math.min(...prices);
  const maxP = Math.max(...prices);
  const range = maxP - minP || 1;

  // 차트 영역
  const chartLeft = 120;
  const chartRight = 1700;
  const chartTop = 140;
  const chartBottom = 740;
  const chartW = chartRight - chartLeft;
  const chartH = chartBottom - chartTop;

  // 거래량 영역
  const volTop = 780;
  const volBottom = 880;
  const volH = volBottom - volTop;

  // 가격→좌표 변환
  const getX = (i: number) => chartLeft + (i / (n - 1)) * chartW;
  const getY = (val: number) => chartBottom - ((val - minP) / range) * chartH;

  // 라인 드로우 애니메이션
  const drawProgress = interpolate(frame, [10, 10 + n * 3], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const visibleCount = Math.floor(drawProgress * n);

  // 라인 경로
  const linePath = prices
    .slice(0, Math.max(2, visibleCount))
    .map((p, i) => `${i === 0 ? "M" : "L"} ${getX(i)} ${getY(p)}`)
    .join(" ");

  // 영역 채우기 경로
  const areaPath = linePath +
    ` L ${getX(Math.max(1, visibleCount - 1))} ${chartBottom}` +
    ` L ${chartLeft} ${chartBottom} Z`;

  // 주석 애니메이션
  const annotDelay = 10 + n * 3 + 5;
  const annotOpacity = interpolate(frame, [annotDelay, annotDelay + 12], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Y축 눈금 (5단계)
  const yTicks: number[] = [];
  const step = range / 4;
  for (let i = 0; i <= 4; i++) {
    yTicks.push(minP + step * i);
  }

  // 거래량 생성 (없으면 랜덤 패턴)
  const volumes = data.volumes ?? prices.map((_, i) => {
    const base = 30 + Math.sin(i * 0.8) * 20 + Math.cos(i * 1.3) * 15;
    return Math.max(10, Math.min(100, base + (i > n * 0.6 ? 30 : 0)));
  });
  const maxVol = Math.max(...volumes);

  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      {/* 타이틀 */}
      <div style={{
        position: "absolute", top: 40, left: 0, right: 0,
        textAlign: "center",
        fontSize: 44, fontWeight: 900, color: theme.white,
        fontFamily: theme.font, textShadow: theme.textShadow.medium,
        opacity: titleOpacity,
      }}>
        {data.title}
      </div>

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
                stroke="rgba(255,255,255,0.08)" strokeWidth={1}
                strokeDasharray="6 4"
              />
              <text
                x={chartLeft - 16} y={y + 5}
                fill={theme.gray} fontSize={20} fontFamily={theme.fontNum}
                textAnchor="end"
              >
                {val.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
              </text>
            </g>
          );
        })}

        {/* X축 날짜 */}
        {data.dates && (data.dates ?? []).map((date, i) => {
          const x = chartLeft + (i / (data.dates!.length - 1)) * chartW;
          const dateOpacity = interpolate(frame, [8, 18], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
          return (
            <text
              key={i} x={x} y={chartBottom + 36}
              fill={theme.gray} fontSize={22} fontFamily={theme.fontNum}
              textAnchor="middle" opacity={dateOpacity}
            >
              {date}
            </text>
          );
        })}

        {/* 영역 채우기 (그라데이션) */}
        <defs>
          <linearGradient id="area-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={chartColor} stopOpacity={0.3} />
            <stop offset="100%" stopColor={chartColor} stopOpacity={0.02} />
          </linearGradient>
        </defs>
        {visibleCount >= 2 && (
          <path d={areaPath} fill="url(#area-grad)" />
        )}

        {/* 라인 */}
        {visibleCount >= 2 && (
          <path
            d={linePath}
            fill="none" stroke={chartColor}
            strokeWidth={3} strokeLinecap="round" strokeLinejoin="round"
          />
        )}

        {/* 거래량 바 */}
        {volumes.map((vol, i) => {
          const barDelay = 10 + i * 2;
          const barH = (vol / maxVol) * volH;
          const barOpacity = interpolate(frame, [barDelay, barDelay + 8], [0, 0.6], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
          const barW = Math.max(4, (chartW / volumes.length) * 0.6);
          const x = chartLeft + (i / (volumes.length - 1)) * chartW - barW / 2;

          return (
            <rect
              key={i}
              x={x} y={volBottom - barH}
              width={barW} height={barH}
              fill={theme.grayLight} opacity={barOpacity}
              rx={2}
            />
          );
        })}

        {/* 고점 주석 */}
        {data.high && visibleCount > data.high.index && (
          <g opacity={annotOpacity}>
            <circle cx={getX(data.high.index)} cy={getY(prices[data.high.index])} r={5} fill={chartColor} />
            <line
              x1={getX(data.high.index)} y1={getY(prices[data.high.index]) - 8}
              x2={getX(data.high.index)} y2={getY(prices[data.high.index]) - 40}
              stroke={theme.white} strokeWidth={2}
            />
            <rect
              x={getX(data.high.index) - 70} y={getY(prices[data.high.index]) - 72}
              width={140} height={32} rx={4}
              fill="rgba(0,0,0,0.85)"
            />
            <text
              x={getX(data.high.index)} y={getY(prices[data.high.index]) - 50}
              fill={theme.white} fontSize={22} fontWeight={900}
              fontFamily={theme.fontNum} textAnchor="middle"
            >
              {data.high.value}
            </text>
          </g>
        )}

        {/* 저점 주석 */}
        {data.low && visibleCount > data.low.index && (
          <g opacity={annotOpacity}>
            <circle cx={getX(data.low.index)} cy={getY(prices[data.low.index])} r={5} fill={theme.red} />
            <line
              x1={getX(data.low.index)} y1={getY(prices[data.low.index]) + 8}
              x2={getX(data.low.index)} y2={getY(prices[data.low.index]) + 40}
              stroke={theme.white} strokeWidth={2}
            />
            <rect
              x={getX(data.low.index) - 70} y={getY(prices[data.low.index]) + 40}
              width={140} height={32} rx={4}
              fill="rgba(0,0,0,0.85)"
            />
            <text
              x={getX(data.low.index)} y={getY(prices[data.low.index]) + 62}
              fill={theme.white} fontSize={22} fontWeight={900}
              fontFamily={theme.fontNum} textAnchor="middle"
            >
              {data.low.value}
            </text>
          </g>
        )}

        {/* 현재가 주석 (오른쪽 끝) */}
        {data.current && visibleCount >= n && (
          <g opacity={annotOpacity}>
            <circle cx={getX(n - 1)} cy={getY(prices[n - 1])} r={6} fill={chartColor} />
            <rect
              x={getX(n - 1) + 12} y={getY(prices[n - 1]) - 16}
              width={160} height={34} rx={4}
              fill={`${chartColor}dd`}
            />
            <text
              x={getX(n - 1) + 92} y={getY(prices[n - 1]) + 6}
              fill={theme.white} fontSize={24} fontWeight={900}
              fontFamily={theme.fontNum} textAnchor="middle"
            >
              {data.current}
            </text>
          </g>
        )}
      </svg>
    </div>
  );
};
