import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { theme } from "../styles/theme";
import { useSceneTheme } from "../contexts/SceneTheme";

const BAR_COLORS = ["#4A9FFF", "#81D8D0", "#FFB347", "#C084FC"];

interface Props {
  data: {
    title: string;
    chart: {
      label: string;
      unit?: string;
      items: Array<{ label: string; value: number }>;
    };
    stats: Array<{ label: string; value: string }>;
  };
}

export const DataDashboard: React.FC<Props> = ({ data }) => {
  const theme = useSceneTheme();
  const frame = useCurrentFrame();
  if (!data) return null;
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 14], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const titleP = spring({ frame, fps, config: { damping: 100, stiffness: 25 } });
  const chartOpacity = interpolate(frame, [10, 24], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const chartP = spring({ frame: frame - 10, fps, config: { damping: 100, stiffness: 10 } });

  const maxVal = Math.max(...data.chart.items.map((d) => d.value));

  // stat value 폰트 크기 자동 조정
  const getStatFontSize = (value: string) => {
    const len = value.length;
    return len <= 4 ? 72 : len <= 6 ? 60 : len <= 10 ? 48 : 38;
  };

  return (
    <div style={{
      width: "100%", height: "100%",
      display: "flex", flexDirection: "column",
      padding: "50px 80px", gap: 20,
    }}>
      {/* 타이틀 */}
      <div style={{
        fontSize: 44, fontWeight: 900, color: theme.white,
        fontFamily: theme.font, textAlign: "center",
        textShadow: theme.textShadow.medium,
        opacity: titleOpacity,
        transform: `translateY(${interpolate(titleP, [0, 1], [-16, 0])}px)`,
      }}>
        {data.title}
      </div>

      {/* 메인 컨텐츠: 차트 + 스탯 */}
      <div style={{
        flex: 1, display: "flex", gap: 40,
        alignItems: "center",
      }}>
        {/* 왼쪽: 미니 바 차트 */}
        <div style={{
          flex: 1,
          opacity: chartOpacity,
          transform: `translateX(${interpolate(chartP, [0, 1], [-30, 0])}px)`,
        }}>
          {/* 차트 헤더 */}
          <div style={{ marginBottom: 20 }}>
            <div style={{
              fontSize: 30, fontWeight: 700, color: theme.white,
              fontFamily: theme.font, textShadow: theme.textShadow.medium,
            }}>
              {data.chart.label}
            </div>
            {data.chart.unit && (
              <div style={{
                fontSize: 20, color: theme.grayLight,
                fontFamily: theme.font, marginTop: 4,
                textShadow: theme.textShadow.light,
              }}>
                (단위: {data.chart.unit})
              </div>
            )}
          </div>

          {/* 바 차트 */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {data.chart.items.map((item, i) => {
              const barDelay = 14 + i * 6;
              const barGrow = spring({ frame: frame - barDelay, fps, config: { damping: 200, stiffness: 10 } });
              const barOpacity = interpolate(frame, [barDelay, barDelay + 10], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
              const barW = (item.value / maxVal) * 100 * Math.min(1, barGrow);
              const color = BAR_COLORS[i % BAR_COLORS.length];

              return (
                <div key={i} style={{ opacity: barOpacity }}>
                  {/* 수치 */}
                  <div style={{
                    fontSize: 32, fontWeight: 900, color,
                    fontFamily: theme.fontNum, marginBottom: 6,
                    textShadow: theme.textShadow.medium,
                  }}>
                    {item.value.toLocaleString()}
                  </div>
                  {/* 바 */}
                  <div style={{
                    height: 40, background: "rgba(255,255,255,0.10)",
                    borderRadius: 8, overflow: "hidden",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}>
                    <div style={{
                      width: `${barW}%`, height: "100%",
                      background: `linear-gradient(90deg, ${color}60, ${color})`,
                      borderRadius: 8, minWidth: barGrow > 0.01 ? 4 : 0,
                    }} />
                  </div>
                  {/* 라벨 */}
                  <div style={{
                    fontSize: 24, fontWeight: 600, color: theme.grayLight,
                    fontFamily: theme.font, marginTop: 6,
                    textShadow: theme.textShadow.light,
                  }}>
                    {item.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 오른쪽: 핵심 수치 카드 */}
        <div style={{
          flex: 1, display: "flex", flexDirection: "column",
          gap: 24, justifyContent: "center",
        }}>
          {(data.stats ?? []).map((stat, i) => {
            const statDelay = 20 + i * 10;
            const statP = spring({ frame: frame - statDelay, fps, config: { damping: 100, stiffness: 10 } });
            const statOpacity = interpolate(frame, [statDelay, statDelay + 12], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

            const settled = Math.max(0, frame - (statDelay + 30));
            const pulse = (Math.sin(settled * 0.04 + i * 1.5) + 1) / 2;

            return (
              <div key={i} style={{
                padding: "28px 32px",
                background: `rgba(129,216,208,${0.06 + pulse * 0.04})`,
                border: `1px solid rgba(129,216,208,${0.2 + pulse * 0.15})`,
                borderRadius: 16,
                opacity: statOpacity,
                transform: `translateX(${interpolate(statP, [0, 1], [40, 0])}px)`,
              }}>
                <div style={{
                  fontSize: 22, fontWeight: 600, color: theme.grayLight,
                  fontFamily: theme.font, marginBottom: 8,
                  textShadow: theme.textShadow.light,
                }}>
                  {stat.label}
                </div>
                <div style={{
                  fontSize: getStatFontSize(stat.value),
                  fontWeight: 900, color: theme.white,
                  fontFamily: theme.fontNum,
                  textShadow: theme.textShadow.strong,
                  lineHeight: 1.1,
                }}>
                  {stat.value}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
