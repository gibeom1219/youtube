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

export const DarkTimeline: React.FC<Props> = ({ data }) => {
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
        {data.title && (
          <div style={{
            fontSize: 48, fontWeight: 900, color: "#fff",
            fontFamily: theme.font, marginBottom: 28,
            opacity: titleOpacity, letterSpacing: -1,
            transform: `translateX(${isLeft ? -titleSlide : titleSlide}px)`,
            lineHeight: 1.3,
          }}>
            {data.title}
          </div>
        )}

        <div style={{
          flex: 1, display: "flex", flexDirection: "column",
          position: "relative",
        }}>
          <div style={{
            position: "absolute", left: 14, top: 8, bottom: 8,
            width: 3, background: "rgba(129,216,208,0.3)",
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
                <div style={{
                  width: 30, height: 30, borderRadius: "50%",
                  background: "#060d0c", border: "3px solid #81D8D0",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0, marginTop: 4,
                  boxShadow: "0 0 12px rgba(129,216,208,0.3)",
                }}>
                  {event.icon && (
                    <span style={{ fontSize: 14, fontFamily: theme.font }}>{event.icon}</span>
                  )}
                </div>

                <div style={{ transform: `translateX(${contentSlide}px)` }}>
                  <div style={{
                    fontSize: 28, fontWeight: 700, color: "#81D8D0",
                    fontFamily: theme.font, marginBottom: 4,
                  }}>
                    {event.date}
                  </div>
                  <div style={{
                    fontSize: 34, fontWeight: 600, color: "rgba(255,255,255,0.9)",
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
