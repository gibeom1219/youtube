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
  };
}

export const WhiteTimeline: React.FC<Props> = ({ data }) => {
  const theme = useSceneTheme();
  const frame = useCurrentFrame();
  if (!data) return null;

  const titleOpacity = interpolate(frame, [0, 14], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const lineWidth = interpolate(frame, [8, 24], [0, 100], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const events = data.events;
  const n = events.length;

  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      <div style={{
        position: "absolute", top: 0, bottom: 0, left: 140, right: 140,
        display: "flex", flexDirection: "column",
        justifyContent: "center",
        zIndex: 3,
      }}>
        {/* 타이틀 */}
        {data.title && (
          <div style={{
            fontSize: 44, fontWeight: 900, color: "#000",
            fontFamily: theme.font, marginBottom: 40,
            opacity: titleOpacity, letterSpacing: -1,
            textAlign: "center",
          }}>
            {data.title}
          </div>
        )}

        {/* 타임라인 컨테이너 */}
        <div style={{ position: "relative", height: 260 }}>
          {/* 가로선 */}
          <div style={{
            position: "absolute", top: 48, left: 40, right: 40,
            height: 3, background: "#ddd",
            opacity: interpolate(frame, [6, 16], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
          }} />

          {/* 이벤트들 */}
          <div style={{
            display: "flex", justifyContent: "space-between",
            position: "relative", height: "100%",
            padding: "0 40px",
          }}>
            {events.map((event, i) => {
              const delay = 10 + i * 8;
              const dotOpacity = interpolate(frame, [delay, delay + 8], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
              const contentSlide = interpolate(frame, [delay + 2, delay + 12], [16, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

              return (
                <div key={i} style={{
                  display: "flex", flexDirection: "column",
                  alignItems: "center", width: `${100 / n}%`,
                  opacity: dotOpacity,
                }}>
                  {/* 날짜 */}
                  <div style={{
                    fontSize: 22, fontWeight: 700, color: "#e67e22",
                    fontFamily: theme.font, marginBottom: 12,
                  }}>
                    {event.date}
                  </div>

                  {/* 도트 */}
                  <div style={{
                    width: 16, height: 16, borderRadius: "50%",
                    background: "#e67e22", border: "3px solid white",
                    boxShadow: "0 0 0 2px #e67e22",
                    marginBottom: 20, flexShrink: 0,
                  }} />

                  {/* 아이콘 */}
                  {event.icon && (
                    <div style={{
                      fontSize: 28, marginBottom: 8,
                      fontFamily: theme.font,
                      transform: `translateY(${contentSlide}px)`,
                    }}>
                      {event.icon}
                    </div>
                  )}

                  {/* 텍스트 */}
                  <div style={{
                    fontSize: 24, fontWeight: 600, color: "#111",
                    fontFamily: theme.font, textAlign: "center",
                    lineHeight: 1.4,
                    transform: `translateY(${contentSlide}px)`,
                  }}>
                    {event.text}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
