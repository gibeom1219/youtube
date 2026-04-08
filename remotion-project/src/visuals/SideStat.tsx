import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { useSceneTheme } from "../contexts/SceneTheme";

interface Props {
  data: {
    label: string;
    value: string;
    change?: string;
    items?: Array<{
      text: string;
      bold?: string;
    }>;
    side?: "left" | "right";
  };
}

export const SideStat: React.FC<Props> = ({ data }) => {
  const theme = useSceneTheme();
  const frame = useCurrentFrame();
  if (!data) return null;
  const side = data.side ?? "left";
  const isLeft = side === "left";

  const labelOpacity = interpolate(frame, [0, 12], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const valueOpacity = interpolate(frame, [6, 18], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const valueScale = interpolate(frame, [6, 20], [0.7, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const changeOpacity = interpolate(frame, [14, 26], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const isNegative = data.change?.startsWith("-") || data.change?.startsWith("▼");
  const changeColor = isNegative ? "#dc2626" : "#16a34a";

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
        <span style={{ fontWeight: 900, color: "#e67e22", fontSize: "110%" }}>{bold}</span>
        {text.slice(idx + bold.length)}
      </>
    );
  };

  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      <div style={{
        position: "absolute", top: 180, bottom: 200,
        ...contentStyle,
        width: 700,
        display: "flex", flexDirection: "column",
        justifyContent: "center",
        zIndex: 3,
      }}>
        {/* 라벨 */}
        <div style={{
          fontSize: 36, fontWeight: 700, color: "#555",
          fontFamily: theme.font, marginBottom: 12,
          opacity: labelOpacity, letterSpacing: 1,
        }}>
          {data.label}
        </div>

        {/* 큰 숫자 */}
        <div style={{
          fontSize: 96, fontWeight: 900, color: "#000",
          fontFamily: theme.font, lineHeight: 1.1,
          opacity: valueOpacity,
          transform: `scale(${valueScale})`,
          transformOrigin: isLeft ? "left center" : "right center",
        }}>
          {data.value}
        </div>

        {/* 변동 */}
        {data.change && (
          <div style={{
            fontSize: 32, fontWeight: 800, color: changeColor,
            fontFamily: theme.font, marginTop: 8,
            opacity: changeOpacity,
          }}>
            {data.change}
          </div>
        )}

        {/* 구분선 */}
        <div style={{
          width: 60, height: 3, borderRadius: 2,
          background: "#e67e22", marginTop: 24, marginBottom: 20,
          opacity: interpolate(frame, [16, 24], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
        }} />

        {/* 추가 항목들 */}
        {data.items && (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {(data.items ?? []).map((item, i) => {
              const delay = 20 + i * 6;
              const itemOpacity = interpolate(frame, [delay, delay + 10], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

              return (
                <div key={i} style={{
                  display: "flex", alignItems: "flex-start", gap: 12,
                  opacity: itemOpacity,
                }}>
                  <div style={{
                    width: 8, height: 8, borderRadius: "50%",
                    background: "#e67e22", flexShrink: 0, marginTop: 12,
                  }} />
                  <span style={{
                    fontSize: 34, fontWeight: 600, color: "#222",
                    fontFamily: theme.font, lineHeight: 1.5,
                  }}>
                    {renderText(item.text, item.bold)}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
