import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { theme } from "../styles/theme";

interface Stock { rank?: number; ticker: string; name: string; price?: string; change?: string; reason: string; logo?: string }
interface Props {
  data: { title: string; stocks?: Stock[]; picks?: Stock[]; disclaimer?: string };
}

export const StockPick: React.FC<Props> = ({ data: props }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { title } = props;
  const stocks = props.stocks ?? props.picks ?? [];
  const titleOpacity = interpolate(frame, [0, 12], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const titleP = spring({ frame, fps, config: { damping: 100, stiffness: 25 } });

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: "60px 100px", gap: 16 }}>
      <div style={{ fontSize: 40, fontWeight: 700, color: theme.gold, fontFamily: theme.font, textAlign: "center", opacity: titleOpacity, transform: `translateY(${interpolate(titleP, [0, 1], [-16, 0])}px)` }}>
        {title}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {stocks.map((stock, i) => {
          const rowP = spring({ frame: frame - 10 - i * 8, fps, config: { damping: 100, stiffness: 10 } });
          const rowOpacity = interpolate(frame, [10 + i * 8, 22 + i * 8], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

          return (
            <div key={i} style={{
              display: "flex", alignItems: "center", gap: 20,
              padding: "18px 28px", borderRadius: 14,
              background: "rgba(129,216,208,0.04)", border: "1px solid rgba(129,216,208,0.1)",
              opacity: rowOpacity, transform: `translateX(${interpolate(rowP, [0, 1], [40, 0])}px)`,
            }}>
              {stock.rank && (
                <div style={{ width: 48, height: 48, borderRadius: "50%", background: i < 3 ? `${theme.tiffany}20` : "rgba(255,255,255,0.05)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 30, fontWeight: 900, color: i < 3 ? theme.tiffany : theme.gray, fontFamily: theme.font, flexShrink: 0 }}>
                  {stock.rank}
                </div>
              )}
              {stock.logo && <span style={{ fontSize: 40, fontFamily: theme.font, flexShrink: 0 }}>{stock.logo}</span>}
              <div style={{ width: 240, flexShrink: 0 }}>
                <div style={{ fontSize: 32, fontWeight: 800, color: theme.white, fontFamily: theme.font, whiteSpace: "nowrap" }}>{stock.name}</div>
                <div style={{ fontSize: 26, color: theme.gray, fontFamily: theme.font }}>{stock.ticker}</div>
              </div>
              <div style={{ fontSize: 30, color: theme.tiffany, fontFamily: theme.font, fontWeight: 600 }}>{stock.reason}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
