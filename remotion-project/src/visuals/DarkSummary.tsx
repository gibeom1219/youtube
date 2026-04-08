import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { useSceneTheme } from "../contexts/SceneTheme";

interface Props {
  data: {
    title: string;
    points: Array<{
      text: string;
      bold?: string;
    }>;
    conclusion?: string;
  };
}

export const DarkSummary: React.FC<Props> = ({ data }) => {
  const theme = useSceneTheme();
  const frame = useCurrentFrame();
  if (!data) return null;

  const titleOpacity = interpolate(frame, [0, 14], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const conclusionOpacity = interpolate(frame, [30 + (data.points ?? []).length * 6, 42 + (data.points ?? []).length * 6], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const renderText = (text: string, bold?: string) => {
    if (!bold) return text;
    const idx = (text ?? "").indexOf(bold ?? "");
    if (idx === -1) return text;
    return (
      <>
        {text.slice(0, idx)}
        <span style={{ fontWeight: 900, color: "#81D8D0", fontSize: "110%" }}>{bold}</span>
        {text.slice(idx + bold.length)}
      </>
    );
  };

  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      <div style={{
        position: "absolute", top: 140, bottom: 200, left: 260, right: 260,
        display: "flex", flexDirection: "column",
        zIndex: 3,
      }}>
        <div style={{
          fontSize: 48, fontWeight: 900, color: "#fff",
          fontFamily: theme.font, marginBottom: 28,
          opacity: titleOpacity, letterSpacing: -1,
          textAlign: "center",
        }}>
          {data.title}
        </div>

        <div style={{
          width: 60, height: 3, borderRadius: 2,
          background: "#81D8D0", marginBottom: 28, alignSelf: "center",
          opacity: interpolate(frame, [10, 18], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
        }} />

        <div style={{
          flex: 1, display: "flex", flexDirection: "column",
          gap: 18, justifyContent: "flex-start",
        }}>
          {(data.points ?? []).map((point, i) => {
            const delay = 12 + i * 6;
            const itemOpacity = interpolate(frame, [delay, delay + 10], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
            const itemSlide = interpolate(frame, [delay, delay + 12], [24, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

            return (
              <div key={i} style={{
                display: "flex", alignItems: "flex-start", gap: 18,
                opacity: itemOpacity,
                transform: `translateX(${itemSlide}px)`,
              }}>
                <div style={{
                  width: 40, height: 40, borderRadius: "50%",
                  background: "#81D8D0",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0, marginTop: 4,
                }}>
                  <span style={{ fontSize: 22, fontWeight: 900, color: "#060d0c" }}>
                    {i + 1}
                  </span>
                </div>

                <span style={{
                  fontSize: 30, fontWeight: 700, color: "rgba(255,255,255,0.92)",
                  fontFamily: theme.font, lineHeight: 1.5,
                }}>
                  {renderText(point.text, point.bold)}
                </span>
              </div>
            );
          })}
        </div>

        {data.conclusion && (
          <div style={{
            marginTop: 20,
            padding: "16px 24px",
            background: "rgba(129,216,208,0.1)",
            borderRadius: 10,
            borderLeft: "4px solid #81D8D0",
            opacity: conclusionOpacity,
          }}>
            <span style={{
              fontSize: 28, fontWeight: 700, color: "rgba(255,255,255,0.9)",
              fontFamily: theme.font, lineHeight: 1.5,
            }}>
              {data.conclusion}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
