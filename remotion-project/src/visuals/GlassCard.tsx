import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { useSceneTheme } from "../contexts/SceneTheme";

interface Props {
  data: {
    title: string;
    cards: Array<{
      icon?: string;
      label: string;
      value: string;
      sub?: string;
    }>;
  };
}

export const GlassCard: React.FC<Props> = ({ data }) => {
  const theme = useSceneTheme();
  const frame = useCurrentFrame();
  if (!data) return null;

  const titleOpacity = interpolate(frame, [0, 14], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      <div style={{
        position: "absolute", top: 0, bottom: 0, left: 0, right: 0,
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        padding: "0 120px",
        zIndex: 3,
      }}>
        {/* 타이틀 */}
        <div style={{
          fontSize: 52, fontWeight: 900, color: "#fff",
          fontFamily: theme.font, marginBottom: 40,
          opacity: titleOpacity, letterSpacing: -1,
          textShadow: "0 2px 20px rgba(0,0,0,0.5)",
        }}>
          {data.title}
        </div>

        {/* 유리 카드들 */}
        <div style={{
          display: "flex", gap: 28,
          justifyContent: "center",
        }}>
          {(data.cards ?? []).map((card, i) => {
            const delay = 10 + i * 10;
            const cardOpacity = interpolate(frame, [delay, delay + 12], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
            const cardScale = interpolate(frame, [delay, delay + 14], [0.85, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

            return (
              <div key={i} style={{
                width: 320, padding: "36px 28px",
                background: "rgba(255,255,255,0.12)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                borderRadius: 20,
                border: "1px solid rgba(255,255,255,0.2)",
                boxShadow: "0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.15)",
                display: "flex", flexDirection: "column",
                alignItems: "center", gap: 16,
                opacity: cardOpacity,
                transform: `scale(${cardScale})`,
              }}>
                {/* 아이콘 */}
                {card.icon && (
                  <div style={{
                    fontSize: 48, fontFamily: theme.font,
                  }}>
                    {card.icon}
                  </div>
                )}

                {/* 라벨 */}
                <div style={{
                  fontSize: 22, fontWeight: 600,
                  color: "rgba(255,255,255,0.6)",
                  fontFamily: theme.font, letterSpacing: 1,
                }}>
                  {card.label}
                </div>

                {/* 값 */}
                <div style={{
                  fontSize: 52, fontWeight: 900,
                  color: "#fff",
                  fontFamily: theme.font, lineHeight: 1,
                }}>
                  {card.value}
                </div>

                {/* 보조 */}
                {card.sub && (
                  <div style={{
                    fontSize: 20, fontWeight: 500,
                    color: "rgba(255,255,255,0.5)",
                    fontFamily: theme.font,
                  }}>
                    {card.sub}
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
