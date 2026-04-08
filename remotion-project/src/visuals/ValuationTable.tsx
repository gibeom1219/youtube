import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { theme } from "../styles/theme";
import { useSceneTheme } from "../contexts/SceneTheme";

interface Stock { name: string; ticker?: string; per: string; pbr: string; roe: string; rating?: string }
interface Props {
  data: { title: string; stocks: Stock[]; highlight_metric?: string };
}

export const ValuationTable: React.FC<Props> = ({ data: props }) => {
  const theme = useSceneTheme();
  const frame = useCurrentFrame();
  if (!props) return null;
  const { fps } = useVideoConfig();
  const titleOpacity = interpolate(frame, [0, 12], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const titleP = spring({ frame, fps, config: { damping: 100, stiffness: 25 } });

  const metrics = ["PER", "PBR", "ROE"];

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: "60px 100px", gap: 16 }}>
      <div style={{ fontSize: 40, fontWeight: 700, color: theme.gold, fontFamily: theme.font, textAlign: "center", textShadow: theme.textShadow.medium, opacity: titleOpacity, transform: `translateY(${interpolate(titleP, [0, 1], [-16, 0])}px)` }}>
        {props.title}
      </div>

      {/* 테이블 전체를 하나로 묶음 */}
      <div>
        {/* Header */}
        <div style={{ display: "flex", padding: "14px 24px", background: `${theme.tiffany}25`, borderRadius: "12px 12px 0 0", border: `1px solid ${theme.tiffany}20` }}>
          <div style={{ flex: 2, fontSize: 26, fontWeight: 800, color: theme.tiffany, fontFamily: theme.font, textShadow: theme.textShadow.medium }}>종목</div>
          {metrics.map((m) => (
            <div key={m} style={{ flex: 1, fontSize: 26, fontWeight: 800, color: props.highlight_metric === m.toLowerCase() ? theme.tiffany : theme.grayLight, fontFamily: theme.fontNum, textAlign: "center", textShadow: theme.textShadow.medium }}>{m}</div>
          ))}
          <div style={{ flex: 1, fontSize: 26, fontWeight: 800, color: theme.grayLight, fontFamily: theme.font, textAlign: "center", textShadow: theme.textShadow.medium }}>투자의견</div>
        </div>

        {/* Rows */}
        {props.stocks.map((stock, i) => {
          const rowP = spring({ frame: frame - 10 - i * 6, fps, config: { damping: 100, stiffness: 10 } });
          const rowOpacity = interpolate(frame, [10 + i * 6, 22 + i * 6], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
          const ratingColor = stock.rating === "매수" ? theme.green : stock.rating === "매도" ? theme.red : theme.grayLight;

          return (
            <div key={i} style={{
              display: "flex", padding: "16px 24px", alignItems: "center",
              background: i % 2 === 0 ? "rgba(129,216,208,0.25)" : "transparent",
              border: "1px solid rgba(129,216,208,0.30)", borderTop: "none",
              opacity: rowOpacity, transform: `translateX(${interpolate(rowP, [0, 1], [20, 0])}px)`,
            }}>
              <div style={{ flex: 2 }}>
                <div style={{ fontSize: 28, fontWeight: 700, color: theme.white, fontFamily: theme.font, textShadow: theme.textShadow.medium }}>{stock.name}</div>
                {stock.ticker && <div style={{ fontSize: 22, color: theme.gray, fontFamily: theme.font, textShadow: theme.textShadow.medium }}>{stock.ticker}</div>}
              </div>
              <div style={{ flex: 1, fontSize: 28, fontWeight: 600, color: theme.white, fontFamily: theme.fontNum, textAlign: "center", textShadow: theme.textShadow.medium }}>{stock.per}</div>
              <div style={{ flex: 1, fontSize: 28, fontWeight: 600, color: theme.white, fontFamily: theme.fontNum, textAlign: "center", textShadow: theme.textShadow.medium }}>{stock.pbr}</div>
              <div style={{ flex: 1, fontSize: 28, fontWeight: 600, color: theme.white, fontFamily: theme.fontNum, textAlign: "center", textShadow: theme.textShadow.medium }}>{stock.roe}</div>
              <div style={{ flex: 1, fontSize: 26, fontWeight: 800, color: ratingColor, fontFamily: theme.font, textAlign: "center", textShadow: theme.textShadow.medium }}>{stock.rating ?? "-"}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
