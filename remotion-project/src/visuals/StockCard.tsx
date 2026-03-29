import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { theme } from "../styles/theme";

interface Props {
  data: {
    ticker: string;
    name: string;
    price: string;
    change: string;
    change_pct: string;
    currency?: string;
    pe?: string;
    market_cap?: string;
    sector?: string;
    rating?: string;
    logo?: string;   // 이모지
    week_high?: string;
    week_low?: string;
  };
}

export const StockCard: React.FC<Props> = ({ data }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const cardProgress  = spring({ frame,         fps, config: { damping: 80,  stiffness: 5 } });
  const priceProgress = spring({ frame: frame - 10, fps, config: { damping: 100, stiffness: 5 } });
  const statsProgress = spring({ frame: frame - 22, fps, config: { damping: 100, stiffness: 10 } });

  const changeStr = data.change ?? "";
  const isPositive = changeStr.startsWith("+") || (!changeStr.startsWith("-") && parseFloat(changeStr) >= 0);
  const changeColor = isPositive ? "#52D68A" : "#FF6B6B";
  const changeArrow = isPositive ? "▲" : "▼";

  const glowPulse = (Math.sin(frame * 0.05) + 1) / 2;

  const detailItems = [
    data.pe        && { label: "P/E", value: data.pe },
    data.market_cap && { label: "시가총액", value: data.market_cap },
    data.sector    && { label: "섹터", value: data.sector },
    data.rating    && { label: "투자의견", value: data.rating },
    data.week_high && { label: "52주 최고", value: data.week_high },
    data.week_low  && { label: "52주 최저", value: data.week_low },
  ].filter(Boolean) as Array<{ label: string; value: string }>;

  return (
    <div style={{
      width: "100%", height: "100%",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      padding: "50px 180px",
    }}>
      <div style={{
        width: "100%",
        background: `${changeColor}08`,
        border: `2px solid ${changeColor}35`,
        borderRadius: 28,
        overflow: "hidden",
        opacity: Math.min(1, cardProgress),
        transform: `scale(${interpolate(Math.min(1, cardProgress), [0, 1], [0.92, 1])})`,
        boxShadow: `0 0 ${40 + glowPulse * 24}px ${changeColor}20`,
      }}>
        {/* 상단: 티커 + 가격 */}
        <div style={{
          padding: "40px 52px",
          borderBottom: `1px solid ${changeColor}15`,
          display: "flex", alignItems: "flex-start",
          justifyContent: "space-between",
        }}>
          {/* 왼쪽: 티커/이름 */}
          <div style={{
            opacity: Math.min(1, cardProgress),
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 6 }}>
              {data.logo && <div style={{ fontSize: 42, fontFamily: theme.font }}>{data.logo}</div>}
              <div>
                <div style={{
                  fontSize: 48, fontWeight: 900, color: theme.white,
                  fontFamily: theme.font, lineHeight: 1,
                }}>
                  {data.ticker}
                </div>
                <div style={{
                  fontSize: 22, color: theme.grayLight,
                  fontFamily: theme.font, marginTop: 4,
                }}>
                  {data.name}
                </div>
              </div>
            </div>
            {data.sector && (
              <div style={{
                background: `${theme.tiffany}15`,
                border: `1px solid ${theme.tiffany}30`,
                borderRadius: 50, padding: "4px 16px",
                fontSize: 16, color: theme.tiffany,
                fontFamily: theme.font, fontWeight: 700,
                display: "inline-block",
              }}>
                {data.sector}
              </div>
            )}
          </div>

          {/* 오른쪽: 가격 */}
          <div style={{
            textAlign: "right",
            opacity: Math.min(1, priceProgress),
            transform: `translateY(${interpolate(Math.min(1, priceProgress), [0, 1], [-20, 0])}px)`,
          }}>
            <div style={{
              fontSize: 60, fontWeight: 900, color: theme.white,
              fontFamily: theme.font, lineHeight: 1,
            }}>
              {data.currency ?? "$"}{data.price}
            </div>
            <div style={{
              fontSize: 30, fontWeight: 800, color: changeColor,
              fontFamily: theme.font, marginTop: 8,
              textShadow: `0 0 ${12 + glowPulse * 8}px ${changeColor}60`,
            }}>
              {changeArrow} {data.change} ({data.change_pct})
            </div>
          </div>
        </div>

        {/* 하단: 세부 지표 */}
        {detailItems.length > 0 && (
          <div style={{
            padding: "24px 52px",
            display: "flex", flexWrap: "wrap" as const, gap: 12,
            opacity: Math.min(1, statsProgress),
            transform: `translateY(${interpolate(Math.min(1, statsProgress), [0, 1], [20, 0])}px)`,
          }}>
            {detailItems.map((item, i) => (
              <div key={i} style={{
                background: "rgba(255,255,255,0.06)",
                borderRadius: 12, padding: "10px 20px",
                display: "flex", flexDirection: "column", gap: 4,
                minWidth: 120,
              }}>
                <div style={{
                  fontSize: 15, color: theme.grayLight, fontFamily: theme.font,
                }}>
                  {item.label}
                </div>
                <div style={{
                  fontSize: 22, fontWeight: 800, color: theme.white,
                  fontFamily: theme.font,
                }}>
                  {item.value}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
