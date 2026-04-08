import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { useSceneTheme } from "../contexts/SceneTheme";

interface Props {
  data: {
    icon?: string;
    title: string;
    items: Array<{
      text: string;
      bold?: string;
    }>;
    side?: "left" | "right";
    color?: string;
  };
}

export const SideWarning: React.FC<Props> = ({ data }) => {
  const theme = useSceneTheme();
  const frame = useCurrentFrame();
  if (!data) return null;
  const side = data.side ?? "left";
  const isLeft = side === "left";
  const color = data.color ?? "#dc2626";

  const titleOpacity = interpolate(frame, [0, 14], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const titleSlide = interpolate(frame, [0, 14], [30, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const contentStyle = isLeft
    ? { left: 160, right: "auto" as const }
    : { right: 160, left: "auto" as const };

  const renderText = (text: string, bold?: string) => {
    if (!bold) return text;
    const idx = (text ?? "").indexOf(bold ?? "");
    if (idx === -1) return text;
    return (
      <>
        {text.slice(0, idx)}
        <span style={{ fontWeight: 900, color, fontSize: "110%" }}>{bold}</span>
        {text.slice(idx + bold.length)}
      </>
    );
  };

  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      <div style={{
        position: "absolute", top: 160, bottom: 200,
        ...contentStyle,
        width: 720,
        display: "flex", flexDirection: "column",
        zIndex: 3,
      }}>
        {/* 아이콘 + 색상 바 */}
        <div style={{
          display: "flex", alignItems: "center", gap: 16,
          marginBottom: 16, opacity: titleOpacity,
        }}>
          {data.icon && (
            <span style={{ fontSize: 48, fontFamily: theme.font }}>{data.icon}</span>
          )}
          <div style={{
            height: 4, width: 60, borderRadius: 2,
            background: color,
          }} />
        </div>

        {/* 타이틀 */}
        <div style={{
          fontSize: 50, fontWeight: 900, color: "#000",
          fontFamily: theme.font, marginBottom: 24,
          opacity: titleOpacity, letterSpacing: -1,
          transform: `translateX(${isLeft ? -titleSlide : titleSlide}px)`,
          lineHeight: 1.3,
        }}>
          {data.title}
        </div>

        {/* 항목들 */}
        <div style={{
          display: "flex", flexDirection: "column", gap: 16,
        }}>
          {(data.items ?? []).map((item, i) => {
            const delay = 12 + i * 6;
            const itemOpacity = interpolate(frame, [delay, delay + 10], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
            const itemSlide = interpolate(frame, [delay, delay + 12], [24, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

            return (
              <div key={i} style={{
                display: "flex", alignItems: "flex-start", gap: 14,
                opacity: itemOpacity,
                transform: `translateY(${itemSlide}px)`,
                padding: "10px 16px",
                borderLeft: `3px solid ${color}`,
                borderRadius: 4,
              }}>
                <span style={{
                  fontSize: 32, fontWeight: 700, color: "#111",
                  fontFamily: theme.font, lineHeight: 1.5,
                }}>
                  {renderText(item.text, item.bold)}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
