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

export const WhiteSummary: React.FC<Props> = ({ data }) => {
  const theme = useSceneTheme();
  const frame = useCurrentFrame();
  if (!data) return null;
  // points가 문자열 배열이면 객체 배열로 변환
  if (data.points && data.points.length > 0 && typeof data.points[0] === "string") {
    (data as any).points = (data.points as any[]).map((p: any) => ({ text: p }));
  }

  const titleOpacity = interpolate(frame, [0, 14], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const conclusionOpacity = interpolate(frame, [30 + (data.points ?? []).length * 6, 42 + (data.points ?? []).length * 6], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const renderText = (text: string, bold?: string) => {
    if (!bold) return text;
    const idx = (text ?? "").indexOf(bold ?? "");
    if (idx === -1) return text;
    return (
      <>
        {text.slice(0, idx)}
        <span style={{ fontWeight: 900, color: "#e67e22", fontSize: "110%" }}>{bold}</span>
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
        {/* 타이틀 */}
        <div style={{
          fontSize: 48, fontWeight: 900, color: "#000",
          fontFamily: theme.font, marginBottom: 28,
          opacity: titleOpacity, letterSpacing: -1,
          textAlign: "center",
        }}>
          {data.title}
        </div>

        <div style={{
          width: 60, height: 3, borderRadius: 2,
          background: "#e67e22", marginBottom: 28, alignSelf: "center",
          opacity: interpolate(frame, [10, 18], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
        }} />

        {/* 번호 포인트 */}
        <div style={{
          display: "flex", flexDirection: "column",
          gap: 18,
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
                {/* 번호 */}
                <div style={{
                  width: 40, height: 40, borderRadius: "50%",
                  background: "#e67e22",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0, marginTop: 4,
                }}>
                  <span style={{
                    fontSize: 22, fontWeight: 900, color: "white",
                  }}>
                    {i + 1}
                  </span>
                </div>

                <span style={{
                  fontSize: 30, fontWeight: 700, color: "#111",
                  fontFamily: theme.font, lineHeight: 1.5,
                }}>
                  {renderText(point.text, point.bold)}
                </span>
              </div>
            );
          })}
        </div>

        {/* 결론 */}
        {data.conclusion && (
          <div style={{
            marginTop: 20,
            padding: "16px 24px",
            background: "rgba(230,126,34,0.08)",
            borderRadius: 10,
            borderLeft: "4px solid #e67e22",
            opacity: conclusionOpacity,
          }}>
            <span style={{
              fontSize: 28, fontWeight: 700, color: "#111",
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
