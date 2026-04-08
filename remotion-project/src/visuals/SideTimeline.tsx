import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { useSceneTheme } from "../contexts/SceneTheme";

interface Props {
  data: {
    title?: string;
    events: Array<{
      date: string;
      text: string;
      icon?: string;
    }>;
    side?: "left" | "right";
  };
}

export const SideTimeline: React.FC<Props> = ({ data }) => {
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
        position: "absolute", top: 120, bottom: 180,
        ...contentStyle,
        width: 720,
        display: "flex", flexDirection: "column",
        zIndex: 3,
      }}>
        {/* 타이틀 */}
        {data.title && (
          <div style={{
            fontSize: 48, fontWeight: 900, color: "#000",
            fontFamily: theme.font, marginBottom: 28,
            opacity: titleOpacity, letterSpacing: -1,
            transform: `translateX(${isLeft ? -titleSlide : titleSlide}px)`,
            lineHeight: 1.3,
          }}>
            {data.title}
          </div>
        )}

        {/* 세로 타임라인 */}
        <div style={{
          flex: 1, display: "flex", flexDirection: "column",
          position: "relative",
        }}>
          {/* 세로선 */}
          <div style={{
            position: "absolute", left: 14, top: 8, bottom: 8,
            width: 3, background: "rgba(0,0,0,0.1)",
            opacity: interpolate(frame, [6, 16], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
          }} />

          {(data.events ?? []).map((event, i) => {
            const delay = 8 + i * 8;
            const dotOpacity = interpolate(frame, [delay, delay + 8], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
            const contentSlide = interpolate(frame, [delay + 2, delay + 12], [20, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

            return (
              <div key={i} style={{
                display: "flex", alignItems: "flex-start", gap: 20,
                marginBottom: 24, opacity: dotOpacity,
              }}>
                {/* 도트 */}
                <div style={{
                  width: 30, height: 30, borderRadius: "50%",
                  background: "white", border: "3px solid #e67e22",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0, marginTop: 4,
                  boxShadow: "0 0 0 4px rgba(230,126,34,0.15)",
                }}>
                  {event.icon && (
                    <span style={{ fontSize: 14, fontFamily: theme.font }}>{event.icon}</span>
                  )}
                </div>

                <div style={{
                  transform: `translateX(${contentSlide}px)`,
                }}>
                  {/* 날짜 */}
                  <div style={{
                    fontSize: 22, fontWeight: 700, color: "#e67e22",
                    fontFamily: theme.font, marginBottom: 4,
                  }}>
                    {event.date}
                  </div>
                  {/* 텍스트 */}
                  <div style={{
                    fontSize: 28, fontWeight: 600, color: "#111",
                    fontFamily: theme.font, lineHeight: 1.5,
                  }}>
                    {event.text ?? ((event as any).title ? `${(event as any).title}${(event as any).description ? ' — ' + (event as any).description : ''}` : "")}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
