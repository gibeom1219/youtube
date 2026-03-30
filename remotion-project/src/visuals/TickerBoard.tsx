import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { theme } from "../styles/theme";

interface TickerItem {
  symbol: string;
  name: string;
  price: string;
  change: string;
  change_pct: string;
}

interface Props {
  data: {
    title: string;
    date?: string;
    items: TickerItem[];
  };
  durationFrames: number;
}

export const TickerBoard: React.FC<Props> = ({ data, durationFrames }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleProgress = spring({ frame, fps, config: { damping: 100, stiffness: 10 } });
  const titleOpacity = interpolate(frame, [0, 15], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const blinkPulse = Math.sin(frame * 0.15) > 0 ? 1 : 0.4;

  return (
    <div style={{
      width: "100%", height: "100%",
      display: "flex", flexDirection: "column",
      justifyContent: "center", padding: "60px 100px", gap: 0,
    }}>
      {/* 헤더 */}
      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "flex-end",
        marginBottom: 28,
        opacity: titleOpacity,
        transform: `translateY(${interpolate(Math.min(1, titleProgress), [0, 1], [-16, 0])}px)`,
      }}>
        <div style={{
          fontSize: 44, fontWeight: 900, color: theme.white,
          fontFamily: theme.font,
        }}>
          {data.title}
        </div>
        {data.date && (
          <div style={{
            fontSize: 28, color: theme.grayLight,
            fontFamily: theme.font, fontWeight: 500,
            display: "flex", alignItems: "center", gap: 8,
          }}>
            <span style={{ color: theme.green, opacity: blinkPulse, fontSize: 20 }}>●</span>
            {data.date}
          </div>
        )}
      </div>

      {/* 컬럼 헤더 */}
      <div style={{
        display: "flex", padding: "10px 24px",
        borderBottom: `1px solid rgba(129,216,208,0.2)`,
        marginBottom: 8,
        opacity: titleOpacity,
      }}>
        {["종목", "현재가", "전일대비", "등락률"].map((h, i) => (
          <div key={i} style={{
            flex: i === 0 ? 1.8 : 1,
            fontSize: 26, fontWeight: 700, color: theme.gray,
            fontFamily: theme.font,
            textAlign: i === 0 ? "left" as const : "right" as const,
          }}>
            {h}
          </div>
        ))}
      </div>

      {/* 종목 목록 */}
      <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
        {data.items.map((item, i) => {
          const startFrame = 5 + i * 12;
          const progress = spring({ frame: frame - startFrame, fps, config: { damping: 100, stiffness: 10 } });

          const isUp = item.change.startsWith("+") || item.change_pct.startsWith("+");
          const isDown = item.change.startsWith("-") || item.change_pct.startsWith("-");
          const priceColor = isUp ? theme.green : isDown ? theme.red : theme.white;
          const arrow = isUp ? "▲" : isDown ? "▼" : "━";

          const settled = Math.max(0, frame - (startFrame + 20));
          const pulse = (Math.sin(settled * 0.04 + i * 1.1) + 1) / 2;
          const bgAlpha = i % 2 === 0 ? 0.03 + pulse * 0.02 : 0.06 + pulse * 0.02;

          return (
            <div key={i} style={{
              display: "flex", alignItems: "center",
              padding: "18px 24px",
              background: `rgba(255,255,255,${bgAlpha})`,
              borderBottom: "1px solid rgba(255,255,255,0.05)",
              opacity: Math.min(1, progress),
              transform: `translateX(${interpolate(Math.min(1, progress), [0, 1], [-50, 0])}px)`,
            }}>
              {/* 종목 */}
              <div style={{ flex: 1.8, display: "flex", flexDirection: "column", gap: 3 }}>
                <div style={{
                  fontSize: 28, fontWeight: 800, color: theme.white,
                  fontFamily: theme.font,
                }}>
                  {item.symbol}
                </div>
                <div style={{
                  fontSize: 26, color: theme.gray,
                  fontFamily: theme.font, fontWeight: 500,
                }}>
                  {item.name}
                </div>
              </div>

              {/* 현재가 */}
              <div style={{
                flex: 1, textAlign: "right" as const,
                fontSize: 30, fontWeight: 800, color: theme.white,
                fontFamily: theme.font,
              }}>
                {item.price}
              </div>

              {/* 전일대비 */}
              <div style={{
                flex: 1, textAlign: "right" as const,
                fontSize: 26, fontWeight: 700, color: priceColor,
                fontFamily: theme.font,
                display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 6,
              }}>
                <span style={{ fontSize: 24 }}>{arrow}</span>
                {item.change}
              </div>

              {/* 등락률 */}
              <div style={{
                flex: 1,
                fontSize: 28, fontWeight: 900, color: priceColor,
                fontFamily: theme.font,
                background: `${priceColor}15`,
                border: `1px solid ${priceColor}40`,
                borderRadius: 8, padding: "6px 16px",
                textAlign: "center" as const,
                marginLeft: 8,
              }}>
                {item.change_pct}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
