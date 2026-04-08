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

export const CenterInfo: React.FC<Props> = ({ data }) => {
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
        <span style={{ fontWeight: 900, color: "#e67e22", fontSize: "115%" }}>{bold}</span>
        {text.slice(idx + bold.length)}
      </>
    );
  };

  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      {/* 콘텐츠 (중앙) — 오버레이는 FinanceVideo에서 SceneTransition 바깥에 렌더링 */}
      <div style={{
        position: "absolute", top: 160, bottom: 180,
        left: "50%", transform: "translateX(-50%)",
        width: 780,
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        zIndex: 3,
      }}>
        {/* 타이틀 */}
        <div style={{
          fontSize: 52, fontWeight: 900, color: "#000",
          fontFamily: theme.font, marginBottom: 8,
          opacity: titleOpacity, letterSpacing: -1,
          transform: `translateY(${-titleSlide}px)`,
          lineHeight: 1.3, textAlign: "center",
        }}>
          {data.title}
        </div>

        {/* 서브타이틀 */}
        {data.subtitle && (
          <div style={{
            fontSize: 28, fontWeight: 600, color: "#555",
            fontFamily: theme.font, marginBottom: 24,
            opacity: titleOpacity, textAlign: "center",
          }}>
            {data.subtitle}
          </div>
        )}

        {/* 구분선 */}
        <div style={{
          width: 80, height: 4, borderRadius: 2,
          background: "#111", marginBottom: 28,
          opacity: interpolate(frame, [10, 18], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
        }} />

        {/* 항목들 */}
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
                    background: "#111", flexShrink: 0, marginTop: 14,
                  }} />
                )}

                <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                  <span style={{
                    fontSize: 34, fontWeight: 700, color: "#111",
                    fontFamily: theme.font, lineHeight: 1.5,
                  }}>
                    {renderText(item.text, item.bold)}
                  </span>
                  {item.sub && (
                    <span style={{
                      fontSize: 24, fontWeight: 500, color: "#666",
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
