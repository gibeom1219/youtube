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
    side?: "left" | "right";
  };
}

export const SideChecklist: React.FC<Props> = ({ data }) => {
  const theme = useSceneTheme();
  const frame = useCurrentFrame();
  if (!data) return null;
  const side = data.side ?? "left";
  const isLeft = side === "left";

  const titleOpacity = interpolate(frame, [0, 14], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const titleSlide = interpolate(frame, [0, 14], [30, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const contentStyle = isLeft
    ? { left: 160, right: "auto" as const }
    : { right: 160, left: "auto" as const };

  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      <div style={{
        position: "absolute", top: 160, bottom: 200,
        ...contentStyle,
        width: 700,
        display: "flex", flexDirection: "column",
        zIndex: 3,
      }}>
        {/* 타이틀 */}
        <div style={{
          fontSize: 48, fontWeight: 900, color: "#000",
          fontFamily: theme.font, marginBottom: 8,
          opacity: titleOpacity, letterSpacing: -1,
          transform: `translateX(${isLeft ? -titleSlide : titleSlide}px)`,
          lineHeight: 1.3,
        }}>
          {data.title}
        </div>

        {data.subtitle && (
          <div style={{
            fontSize: 26, fontWeight: 600, color: "#666",
            fontFamily: theme.font, marginBottom: 20,
            opacity: titleOpacity,
          }}>
            {data.subtitle}
          </div>
        )}

        <div style={{
          width: 60, height: 3, borderRadius: 2,
          background: "#e67e22", marginBottom: 24,
          opacity: interpolate(frame, [10, 18], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
        }} />

        {/* 체크 항목들 */}
        <div style={{
          flex: 1, display: "flex", flexDirection: "column",
          gap: 14, justifyContent: "flex-start",
        }}>
          {(data.items ?? []).map((item, i) => {
            const delay = 10 + i * 6;
            const itemOpacity = interpolate(frame, [delay, delay + 10], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
            const itemSlide = interpolate(frame, [delay, delay + 12], [24, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

            return (
              <div key={i} style={{
                display: "flex", alignItems: "center", gap: 16,
                opacity: itemOpacity,
                transform: `translateX(${isLeft ? -itemSlide : itemSlide}px)`,
              }}>
                <div style={{
                  width: 30, height: 30, borderRadius: 6,
                  background: item.checked ? "#e67e22" : "transparent",
                  border: item.checked ? "none" : "2px solid #bbb",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0,
                }}>
                  {item.checked && (
                    <span style={{ color: "white", fontSize: 18, fontWeight: 900 }}>✓</span>
                  )}
                </div>

                <span style={{
                  fontSize: 30, fontWeight: item.checked ? 700 : 500,
                  color: item.checked ? "#111" : "#888",
                  fontFamily: theme.font, lineHeight: 1.4,
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
