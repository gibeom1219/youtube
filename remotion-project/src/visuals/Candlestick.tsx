import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { theme } from "../styles/theme";

interface Candle { date: string; open: number; close: number; high: number; low: number }
interface Props {
  data: { title: string; unit?: string; candles: Candle[] };
}

export const Candlestick: React.FC<Props> = ({ data: props }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { title, unit = "", candles } = props;
  const titleOpacity = interpolate(frame, [0, 12], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const titleP = spring({ frame, fps, config: { damping: 100, stiffness: 25 } });

  const allVals = candles.flatMap((c) => [c.high, c.low]);
  const maxVal = Math.max(...allVals);
  const minVal = Math.min(...allVals);
  const range = maxVal - minVal || 1;
  const padTop = 40, padBot = 60, chartH = 500;

  const getY = (v: number) => padTop + ((maxVal - v) / range) * (chartH - padTop - padBot);
  const barW = Math.min(60, Math.floor(1400 / candles.length) - 8);

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", padding: "60px 100px" }}>
      <div style={{ fontSize: 40, fontWeight: 700, color: theme.gold, fontFamily: theme.font, textAlign: "center", marginBottom: 30, opacity: titleOpacity, transform: `translateY(${interpolate(titleP, [0, 1], [-16, 0])}px)` }}>
        {title}{unit ? ` (${unit})` : ""}
      </div>
      <svg width={1500} height={chartH} style={{ margin: "0 auto" }}>
        {/* Grid */}
        {[0, 0.25, 0.5, 0.75, 1].map((r) => {
          const val = minVal + r * range;
          const y = getY(val);
          return (
            <g key={r}>
              <line x1={50} y1={y} x2={1450} y2={y} stroke="rgba(255,255,255,0.06)" />
              <text x={45} y={y + 5} fill={theme.gray} fontSize={14} fontFamily={theme.font} textAnchor="end">{Math.round(val).toLocaleString()}</text>
            </g>
          );
        })}
        {/* Candles */}
        {candles.map((c, i) => {
          const candleP = interpolate(frame, [10 + i * 4, 20 + i * 4], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
          const x = 80 + i * (1370 / candles.length);
          const isUp = c.close >= c.open;
          const color = isUp ? theme.green : theme.red;
          const bodyTop = getY(Math.max(c.open, c.close));
          const bodyBot = getY(Math.min(c.open, c.close));
          const bodyH = Math.max(bodyBot - bodyTop, 2);
          const wickTop = getY(c.high);
          const wickBot = getY(c.low);
          const cx = x + barW / 2;

          return (
            <g key={i} opacity={candleP}>
              {/* Wick */}
              <line x1={cx} y1={wickTop} x2={cx} y2={wickBot} stroke={color} strokeWidth={1.5} />
              {/* Body */}
              <rect x={x} y={bodyTop} width={barW} height={bodyH} fill={isUp ? color : color} rx={2} opacity={0.9} />
              {/* Date label */}
              <text x={cx} y={chartH - padBot + 25} fill={theme.grayLight} fontSize={13} fontFamily={theme.font} textAnchor="middle">{c.date}</text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};
