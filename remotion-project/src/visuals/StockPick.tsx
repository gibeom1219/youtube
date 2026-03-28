import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { theme } from "../styles/theme";

interface Stock { rank?: number; ticker: string; name: string; price?: string; change?: string; reason: string; logo?: string }
interface Props {
  data: { title: string; stocks: Stock[] };
}

export const StockPick: React.FC<Props> = ({ data: props }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { title, stocks } = props;
  const titleOpacity = interpolate(frame, [0, 12], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const titleP = spring({ frame, fps, config: { damping: 100, stiffness: 25 } });

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", padding: "60px 100px" }}>
      <div style={{ fontSize: 40, fontWeight: 700, color: theme.gold, fontFamily: theme.font, textAlign: "center", marginBottom: 36, opacity: titleOpacity, transform: `translateY(${interpolate(titleP, [0, 1], [-16, 0])}px)` }}>
        {title}
      </div>

      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 14, justifyContent: "center" }}>
        {stocks.map((stock, i) => {
          const rowP = spring({ frame: frame - 10 - i * 8, fps, config: { damping: 100, stiffness: 10 } });
          const rowOpacity = interpolate(frame, [10 + i * 8, 22 + i * 8], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
          const changeVal = parseFloat(stock.change ?? "0");
          const changeColor = changeVal > 0 ? theme.green : changeVal < 0 ? theme.red : theme.gray;

          return (
            <div key={i} style={{
              display: "flex", alignItems: "center", gap: 20,
              padding: "18px 28px", borderRadius: 14,
              background: "rgba(129,216,208,0.04)", border: "1px solid rgba(129,216,208,0.1)",
              opacity: rowOpacity, transform: `translateX(${interpolate(rowP, [0, 1], [40, 0])}px)`,
            }}>
              {stock.rank && (
                <div style={{ width: 40, height: 40, borderRadius: "50%", background: i < 3 ? `${theme.tiffany}20` : "rgba(255,255,255,0.05)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, fontWeight: 900, color: i < 3 ? theme.tiffany : theme.gray, fontFamily: theme.font }}>
                  {stock.rank}
                </div>
              )}
              {stock.logo && <span style={{ fontSize: 32, fontFamily: theme.font }}>{stock.logo}</span>}
              <div style={{ flex: "none", width: 100 }}>
                <div style={{ fontSize: 22, fontWeight: 800, color: theme.tiffany, fontFamily: theme.font }}>{stock.ticker}</div>
                <div style={{ fontSize: 16, color: theme.grayLight, fontFamily: theme.font }}>{stock.name}</div>
              </div>
              {stock.price && <div style={{ fontSize: 22, fontWeight: 700, color: theme.white, fontFamily: theme.font, width: 120 }}>{stock.price}</div>}
              {stock.change && <div style={{ fontSize: 20, fontWeight: 800, color: changeColor, fontFamily: theme.font, width: 80 }}>{stock.change}</div>}
              <div style={{ flex: 1, fontSize: 18, color: theme.grayLight, fontFamily: theme.font, textAlign: "right" }}>{stock.reason}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
