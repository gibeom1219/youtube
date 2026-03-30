import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { theme } from "../styles/theme";

interface CountryItem {
  flag: string;
  country: string;
  value: string;
  change?: string;
  note?: string;
}

interface Props {
  data: {
    title: string;
    subtitle?: string;
    items: CountryItem[];
  };
  durationFrames: number;
}

export const WorldStats: React.FC<Props> = ({ data, durationFrames }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleProgress = spring({ frame, fps, config: { damping: 100, stiffness: 10 } });
  const interval = Math.min((durationFrames * 0.65) / (data.items.length + 1), 18);

  return (
    <div style={{
      width: "100%", height: "100%",
      display: "flex", flexDirection: "column",
      justifyContent: "center", padding: "60px 120px", gap: 0,
    }}>
      {/* 헤더 */}
      <div style={{
        marginBottom: 32,
        opacity: Math.min(1, titleProgress),
        transform: `translateY(${interpolate(Math.min(1, titleProgress), [0, 1], [-16, 0])}px)`,
      }}>
        <div style={{
          fontSize: 44, fontWeight: 900, color: theme.white,
          fontFamily: theme.font,
        }}>
          🌏 {data.title}
        </div>
        {data.subtitle && (
          <div style={{
            fontSize: 24, color: theme.grayLight,
            fontFamily: theme.font, fontWeight: 500, marginTop: 8,
          }}>
            {data.subtitle}
          </div>
        )}
      </div>

      {/* 국가 목록 - 2열 그리드 */}
      <div style={{
        display: "grid",
        gridTemplateColumns: data.items.length > 4 ? "1fr 1fr" : "1fr",
        gap: 14,
      }}>
        {data.items.map((item, i) => {
          const startFrame = Math.round(interval * (i + 1));
          const p = spring({ frame: frame - startFrame, fps, config: { damping: 100, stiffness: 10 } });
          const settled = Math.max(0, frame - (startFrame + 20));
          const pulse = (Math.sin(settled * 0.04 + i * 1.0) + 1) / 2;

          const isUp = item.change?.startsWith("+");
          const isDown = item.change?.startsWith("-");
          const changeColor = isUp ? theme.green : isDown ? theme.red : theme.grayLight;

          return (
            <div key={i} style={{
              display: "flex", alignItems: "center", gap: 20,
              padding: "16px 24px",
              background: `rgba(129,216,208,${0.04 + pulse * 0.03})`,
              border: `1px solid rgba(129,216,208,${0.2 + pulse * 0.15})`,
              borderRadius: 12,
              opacity: Math.min(1, p),
              transform: `translateX(${interpolate(Math.min(1, p), [0, 1], [-50, 0])}px)`,
            }}>
              {/* 국기 */}
              <span style={{ fontSize: 40, flexShrink: 0, fontFamily: theme.font }}>{item.flag}</span>

              {/* 국가명 */}
              <div style={{ flex: 1 }}>
                <div style={{
                  fontSize: 26, fontWeight: 700, color: theme.white,
                  fontFamily: theme.font,
                }}>
                  {item.country}
                </div>
                {item.note && (
                  <div style={{
                    fontSize: 24, color: theme.gray,
                    fontFamily: theme.font,
                  }}>
                    {item.note}
                  </div>
                )}
              </div>

              {/* 수치 */}
              <div style={{ textAlign: "right" as const }}>
                <div style={{
                  fontSize: 30, fontWeight: 900, color: theme.tiffany,
                  fontFamily: theme.font,
                }}>
                  {item.value}
                </div>
                {item.change && (
                  <div style={{
                    fontSize: 26, fontWeight: 700, color: changeColor,
                    fontFamily: theme.font,
                  }}>
                    {item.change}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
