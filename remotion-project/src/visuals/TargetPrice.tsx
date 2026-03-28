import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { theme } from "../styles/theme";

interface Props {
  data: { ticker: string; name: string; current_price: string; target_price: string; analyst: string; rating: "buy" | "hold" | "sell"; upside: string; logo?: string };
}

const RATING_COLORS = { buy: "#52D68A", hold: "#FFB347", sell: "#FF6B6B" };
const RATING_LABELS = { buy: "매수", hold: "보유", sell: "매도" };

export const TargetPrice: React.FC<Props> = ({ data }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const ratingColor = RATING_COLORS[data.rating] ?? theme.tiffany;

  const titleOpacity = interpolate(frame, [0, 12], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const titleP = spring({ frame, fps, config: { damping: 100, stiffness: 25 } });
  const cardP = spring({ frame: frame - 10, fps, config: { damping: 100, stiffness: 10 } });
  const cardOpacity = interpolate(frame, [10, 22], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const arrowP = spring({ frame: frame - 20, fps, config: { damping: 100, stiffness: 10 } });
  const arrowOpacity = interpolate(frame, [20, 32], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", padding: "70px 120px", alignItems: "center", justifyContent: "center" }}>
      {/* Header: Ticker + Name */}
      <div style={{
        display: "flex", alignItems: "center", gap: 20, marginBottom: 20,
        opacity: titleOpacity, transform: `translateY(${interpolate(titleP, [0, 1], [-16, 0])}px)`,
      }}>
        {data.logo && <span style={{ fontSize: 48, fontFamily: theme.font }}>{data.logo}</span>}
        <div>
          <div style={{ fontSize: 48, fontWeight: 900, color: theme.white, fontFamily: theme.font }}>{data.ticker}</div>
          <div style={{ fontSize: 24, color: theme.grayLight, fontFamily: theme.font }}>{data.name}</div>
        </div>
        <div style={{
          padding: "8px 20px", borderRadius: 8, background: `${ratingColor}25`,
          border: `1px solid ${ratingColor}50`, fontSize: 22, fontWeight: 800,
          color: ratingColor, fontFamily: theme.font, marginLeft: 20,
        }}>
          {RATING_LABELS[data.rating]}
        </div>
      </div>

      {/* Price comparison */}
      <div style={{
        display: "flex", alignItems: "center", gap: 60, marginTop: 40,
        opacity: cardOpacity, transform: `scale(${interpolate(cardP, [0, 1], [0.9, 1])})`,
      }}>
        {/* Current Price */}
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 22, color: theme.gray, fontFamily: theme.font, marginBottom: 12 }}>현재가</div>
          <div style={{ fontSize: 64, fontWeight: 900, color: theme.white, fontFamily: theme.font }}>{data.current_price}</div>
        </div>

        {/* Arrow */}
        <div style={{
          display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
          opacity: arrowOpacity, transform: `scaleX(${interpolate(arrowP, [0, 1], [0.3, 1])})`,
        }}>
          <div style={{ fontSize: 48, color: ratingColor, fontFamily: theme.font }}>→</div>
          <div style={{
            fontSize: 28, fontWeight: 900, color: ratingColor, fontFamily: theme.font,
            padding: "6px 16px", background: `${ratingColor}15`, borderRadius: 8,
          }}>
            {data.upside}
          </div>
        </div>

        {/* Target Price */}
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 22, color: theme.gray, fontFamily: theme.font, marginBottom: 12 }}>목표가</div>
          <div style={{ fontSize: 64, fontWeight: 900, color: ratingColor, fontFamily: theme.font }}>{data.target_price}</div>
        </div>
      </div>

      {/* Analyst */}
      <div style={{
        marginTop: 40, fontSize: 20, color: theme.grayLight, fontFamily: theme.font,
        opacity: arrowOpacity,
      }}>
        분석: {data.analyst}
      </div>
    </div>
  );
};
