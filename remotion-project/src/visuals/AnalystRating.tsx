import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { theme } from "../styles/theme";

interface Analyst { firm: string; target: string; rating: "buy" | "hold" | "sell"; date?: string }
interface Props {
  data: { ticker: string; name: string; current_price: string; analysts: Analyst[]; consensus?: string };
}

const RATING_COLORS = { buy: "#52D68A", hold: "#FFB347", sell: "#FF6B6B" };
const RATING_LABELS = { buy: "매수", hold: "보유", sell: "매도" };

export const AnalystRating: React.FC<Props> = ({ data }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const titleOpacity = interpolate(frame, [0, 12], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const titleP = spring({ frame, fps, config: { damping: 100, stiffness: 25 } });

  const buyCount = data.analysts.filter((a) => a.rating === "buy").length;
  const holdCount = data.analysts.filter((a) => a.rating === "hold").length;
  const sellCount = data.analysts.filter((a) => a.rating === "sell").length;

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: "60px 100px" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24, opacity: titleOpacity, transform: `translateY(${interpolate(titleP, [0, 1], [-16, 0])}px)` }}>
        <div>
          <div style={{ fontSize: 38, fontWeight: 900, color: theme.white, fontFamily: theme.font }}>{data.name} ({data.ticker})</div>
          <div style={{ fontSize: 28, color: theme.grayLight, fontFamily: theme.font }}>현재가: {data.current_price}</div>
        </div>
        <div style={{ display: "flex", gap: 16 }}>
          <div style={{ padding: "8px 16px", borderRadius: 8, background: `${RATING_COLORS.buy}20`, border: `1px solid ${RATING_COLORS.buy}40` }}>
            <span style={{ fontSize: 26, fontWeight: 800, color: RATING_COLORS.buy, fontFamily: theme.font }}>매수 {buyCount}</span>
          </div>
          <div style={{ padding: "8px 16px", borderRadius: 8, background: `${RATING_COLORS.hold}20`, border: `1px solid ${RATING_COLORS.hold}40` }}>
            <span style={{ fontSize: 26, fontWeight: 800, color: RATING_COLORS.hold, fontFamily: theme.font }}>보유 {holdCount}</span>
          </div>
          <div style={{ padding: "8px 16px", borderRadius: 8, background: `${RATING_COLORS.sell}20`, border: `1px solid ${RATING_COLORS.sell}40` }}>
            <span style={{ fontSize: 26, fontWeight: 800, color: RATING_COLORS.sell, fontFamily: theme.font }}>매도 {sellCount}</span>
          </div>
        </div>
      </div>

      {/* Analyst list */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10, }}>
        {data.analysts.map((a, i) => {
          const rowP = spring({ frame: frame - 10 - i * 6, fps, config: { damping: 100, stiffness: 10 } });
          const rowOpacity = interpolate(frame, [10 + i * 6, 22 + i * 6], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
          const color = RATING_COLORS[a.rating];

          return (
            <div key={i} style={{
              display: "flex", alignItems: "center", gap: 16, padding: "14px 24px", borderRadius: 12,
              background: "rgba(129,216,208,0.03)", border: "1px solid rgba(129,216,208,0.08)",
              opacity: rowOpacity, transform: `translateX(${interpolate(rowP, [0, 1], [30, 0])}px)`,
            }}>
              <div style={{ width: 200, fontSize: 26, fontWeight: 700, color: theme.white, fontFamily: theme.font }}>{a.firm}</div>
              <div style={{ width: 80, fontSize: 24, fontWeight: 800, color, fontFamily: theme.font, padding: "4px 12px", background: `${color}15`, borderRadius: 6, textAlign: "center" }}>
                {RATING_LABELS[a.rating]}
              </div>
              <div style={{ fontSize: 24, fontWeight: 800, color: theme.tiffany, fontFamily: theme.font }}>→ {a.target}</div>
              {a.date && <div style={{ fontSize: 22, color: theme.gray, fontFamily: theme.font, marginLeft: "auto" }}>{a.date}</div>}
            </div>
          );
        })}
      </div>

      {data.consensus && (
        <div style={{ fontSize: 28, color: theme.tiffany, fontFamily: theme.font, textAlign: "center", marginTop: 16, fontWeight: 600, opacity: interpolate(frame, [40, 52], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) }}>
          컨센서스: {data.consensus}
        </div>
      )}
    </div>
  );
};
