import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { useSceneTheme } from "../contexts/SceneTheme";

interface Props {
  data: {
    title: string;
    subtitle?: string;
    items: Array<{
      icon?: string;
      text: string;
      bold?: string;
      sub?: string;
    }>;
  };
}

export const DarkCenterInfo: React.FC<Props> = ({ data }) => {
  const theme = useSceneTheme();
  const frame = useCurrentFrame();
  if (!data) return null;

  const titleOpacity = interpolate(frame, [0, 14], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const titleSlide = interpolate(frame, [0, 14], [30, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const renderText = (text: string, bold?: string) => {
    if (!bold) return text;
    const idx = (text ?? "").indexOf(bold ?? "");
    if (idx === -1) return text;
    return (
      <>
        {text.slice(0, idx)}
        <span style={{ fontWeight: 900, color: "#81D8D0", fontSize: "115%" }}>{bold}</span>
        {text.slice(idx + bold.length)}
      </>
    );
  };

  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      <div style={{
        position: "absolute", top: 160, bottom: 180,
        left: "50%", transform: "translateX(-50%)",
        width: 780,
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        zIndex: 3,
      }}>
        <div style={{
          fontSize: 52, fontWeight: 900, color: "#fff",
          fontFamily: theme.font, marginBottom: 8,
          opacity: titleOpacity, letterSpacing: -1,
          transform: `translateY(${-titleSlide}px)`,
          lineHeight: 1.3, textAlign: "center",
        }}>
          {data.title}
        </div>

        {data.subtitle && (
          <div style={{
            fontSize: 28, fontWeight: 600, color: "rgba(255,255,255,0.6)",
            fontFamily: theme.font, marginBottom: 24,
            opacity: titleOpacity, textAlign: "center",
          }}>
            {data.subtitle}
          </div>
        )}

        <div style={{
          width: 80, height: 4, borderRadius: 2,
          background: "#81D8D0", marginBottom: 28,
          opacity: interpolate(frame, [10, 18], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
        }} />

        <div style={{
          display: "flex", flexDirection: "column",
          gap: 18, width: "100%",
        }}>
          {(data.items ?? []).map((item, i) => {
            const delay = 12 + i * 6;
            const itemOpacity = interpolate(frame, [delay, delay + 10], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
            const itemSlide = interpolate(frame, [delay, delay + 12], [24, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

            return (
              <div key={i} style={{
                display: "flex", alignItems: "flex-start", gap: 16,
                opacity: itemOpacity,
                transform: `translateY(${itemSlide}px)`,
              }}>
                {item.icon ? (
                  <span style={{ fontSize: 32, flexShrink: 0, marginTop: 2, fontFamily: theme.font }}>{item.icon}</span>
                ) : (
                  <div style={{
                    width: 10, height: 10, borderRadius: "50%",
                    background: "#81D8D0", flexShrink: 0, marginTop: 14,
                  }} />
                )}
                <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                  <span style={{
                    fontSize: 34, fontWeight: 700, color: "rgba(255,255,255,0.92)",
                    fontFamily: theme.font, lineHeight: 1.5,
                  }}>
                    {renderText(item.text, item.bold)}
                  </span>
                  {item.sub && (
                    <span style={{
                      fontSize: 24, fontWeight: 500, color: "rgba(255,255,255,0.5)",
                      fontFamily: theme.font, lineHeight: 1.4,
                    }}>
                      {item.sub}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
