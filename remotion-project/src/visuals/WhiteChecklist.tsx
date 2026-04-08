import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { useSceneTheme } from "../contexts/SceneTheme";

interface Props {
  data: {
    title: string;
    subtitle?: string;
    items: Array<{
      text: string;
      checked: boolean;
    }>;
  };
}

export const WhiteChecklist: React.FC<Props> = ({ data }) => {
  const theme = useSceneTheme();
  const frame = useCurrentFrame();
  if (!data) return null;

  const titleOpacity = interpolate(frame, [0, 14], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      <div style={{
        position: "absolute", top: 160, bottom: 200, left: 0, right: 0,
        alignItems: "center",
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

        <div style={{
          width: 60, height: 3, borderRadius: 2,
          background: "#e67e22", marginBottom: 28, alignSelf: "center",
          opacity: interpolate(frame, [10, 18], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
        }} />

        {/* 체크리스트 */}
        <div style={{
          flex: 1, display: "flex", flexDirection: "column",
          gap: 14, justifyContent: "flex-start",
          width: 700,
        }}>
          {(data.items ?? []).map((item, i) => {
            const delay = 10 + i * 6;
            const itemOpacity = interpolate(frame, [delay, delay + 10], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
            const itemSlide = interpolate(frame, [delay, delay + 12], [24, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

            return (
              <div key={i} style={{
                display: "flex", alignItems: "center", gap: 18,
                opacity: itemOpacity,
                transform: `translateX(${itemSlide}px)`,
                padding: "12px 20px",
                background: item.checked ? "rgba(230,126,34,0.08)" : "rgba(0,0,0,0.02)",
                borderRadius: 10,
                borderLeft: `4px solid ${item.checked ? "#e67e22" : "#ccc"}`,
              }}>
                {/* 체크 아이콘 */}
                <div style={{
                  width: 32, height: 32, borderRadius: 6,
                  background: item.checked ? "#e67e22" : "transparent",
                  border: item.checked ? "none" : "2px solid #ccc",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0,
                }}>
                  {item.checked && (
                    <span style={{ color: "white", fontSize: 20, fontWeight: 900 }}>✓</span>
                  )}
                </div>

                <span style={{
                  fontSize: 30, fontWeight: item.checked ? 700 : 500,
                  color: item.checked ? "#111" : "#888",
                  fontFamily: theme.font, lineHeight: 1.4,
                  textDecoration: item.checked ? "none" : "none",
                }}>
                  {item.text}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
