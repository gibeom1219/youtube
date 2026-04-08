import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { useSceneTheme } from "../contexts/SceneTheme";

interface Props {
  data: {
    title: string;
    subtitle?: string;
    items: Array<{
      rank: number;
      name: string;
      value: string;
      change?: string;
    }>;
  };
}

const RANK_COLORS = ["#e67e22", "#555", "#8B6914"];
const RANK_LABELS = ["🥇", "🥈", "🥉"];

export const WhiteRanking: React.FC<Props> = ({ data }) => {
  const theme = useSceneTheme();
  const frame = useCurrentFrame();
  if (!data) return null;

  const titleOpacity = interpolate(frame, [0, 14], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      <div style={{
        position: "absolute", top: 140, bottom: 180, left: 240, right: 240,
        display: "flex", flexDirection: "column",
        zIndex: 3,
      }}>
        {/* 타이틀 */}
        <div style={{
          fontSize: 48, fontWeight: 900, color: "#000",
          fontFamily: theme.font, marginBottom: 8,
          opacity: titleOpacity, letterSpacing: -1,
          textAlign: "center",
        }}>
          {data.title}
        </div>

        {data.subtitle && (
          <div style={{
            fontSize: 26, fontWeight: 600, color: "#666",
            fontFamily: theme.font, marginBottom: 24,
            opacity: titleOpacity, textAlign: "center",
          }}>
            {data.subtitle}
          </div>
        )}

        {/* 구분선 */}
        <div style={{
          width: 60, height: 3, borderRadius: 2,
          background: "#e67e22", marginBottom: 28, alignSelf: "center",
          opacity: interpolate(frame, [10, 18], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
        }} />

        {/* 랭킹 항목들 */}
        <div style={{
          flex: 1, display: "flex", flexDirection: "column",
          gap: 12, justifyContent: "flex-start",
        }}>
          {(data.items ?? []).map((item, i) => {
            const delay = 10 + i * 6;
            const itemOpacity = interpolate(frame, [delay, delay + 10], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
            const itemSlide = interpolate(frame, [delay, delay + 12], [30, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
            const isTop3 = i < 3;
            const rankColor = isTop3 ? RANK_COLORS[i] : "#999";

            return (
              <div key={i} style={{
                display: "flex", alignItems: "center", gap: 20,
                opacity: itemOpacity,
                transform: `translateX(${itemSlide}px)`,
                padding: "14px 24px",
                background: isTop3 ? "rgba(230,126,34,0.1)" : "rgba(0,0,0,0.03)",
                borderRadius: 10,
                borderLeft: `4px solid ${isTop3 ? rankColor : "#ccc"}`,
              }}>
                {/* 순위 */}
                <div style={{
                  fontSize: isTop3 ? 36 : 28, fontWeight: 900,
                  color: rankColor, width: 50, textAlign: "center",
                  fontFamily: theme.font,
                }}>
                  {isTop3 ? RANK_LABELS[i] : `${item.rank}`}
                </div>

                {/* 이름 */}
                <div style={{
                  flex: 1, fontSize: 30, fontWeight: 700,
                  color: "#111", fontFamily: theme.font,
                }}>
                  {item.name}
                </div>

                {/* 값 */}
                <div style={{
                  fontSize: 30, fontWeight: 900,
                  color: isTop3 ? "#000" : "#444",
                  fontFamily: theme.font,
                }}>
                  {item.value}
                </div>

                {/* 변동 */}
                {item.change && (
                  <div style={{
                    fontSize: 22, fontWeight: 700,
                    color: item.change.startsWith("-") || item.change.startsWith("▼") ? "#dc2626" : "#16a34a",
                    fontFamily: theme.font, width: 80, textAlign: "right",
                  }}>
                    {item.change}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
