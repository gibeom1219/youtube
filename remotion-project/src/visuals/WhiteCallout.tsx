import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { useSceneTheme } from "../contexts/SceneTheme";

interface Props {
  data: {
    icon?: string;
    title: string;
    description: string;
    highlight?: string;
    source?: string;
  };
}

export const WhiteCallout: React.FC<Props> = ({ data }) => {
  const theme = useSceneTheme();
  const frame = useCurrentFrame();
  if (!data) return null;

  const iconOpacity = interpolate(frame, [0, 12], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const iconScale = interpolate(frame, [0, 14], [0.5, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const titleOpacity = interpolate(frame, [6, 18], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const descOpacity = interpolate(frame, [14, 26], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const descSlide = interpolate(frame, [14, 26], [20, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const sourceOpacity = interpolate(frame, [22, 34], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const renderDescription = () => {
    const { description, highlight } = data;
    if (!highlight) return description;
    const idx = (description ?? "").indexOf(highlight ?? "");
    if (idx === -1) return description;
    return (
      <>
        {description.slice(0, idx)}
        <span style={{ fontWeight: 900, color: "#e67e22" }}>{highlight}</span>
        {description.slice(idx + highlight.length)}
      </>
    );
  };

  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      <div style={{
        position: "absolute", top: 0, bottom: 0, left: 0, right: 0,
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        padding: "0 240px",
        zIndex: 3,
      }}>
        {/* 아이콘 */}
        {data.icon && (
          <div style={{
            fontSize: 72, marginBottom: 24,
            fontFamily: theme.font,
            opacity: iconOpacity,
            transform: `scale(${iconScale})`,
          }}>
            {data.icon}
          </div>
        )}

        {/* 타이틀 */}
        <div style={{
          fontSize: 48, fontWeight: 900, color: "#000",
          fontFamily: theme.font, textAlign: "center",
          lineHeight: 1.3, marginBottom: 20,
          opacity: titleOpacity, letterSpacing: -1,
        }}>
          {data.title}
        </div>

        {/* 구분선 */}
        <div style={{
          width: 60, height: 4, borderRadius: 2,
          background: "#e67e22", marginBottom: 24,
          opacity: titleOpacity,
        }} />

        {/* 설명 */}
        <div style={{
          fontSize: 32, fontWeight: 600, color: "#222",
          fontFamily: theme.font, textAlign: "center",
          lineHeight: 1.6,
          opacity: descOpacity,
          transform: `translateY(${descSlide}px)`,
        }}>
          {renderDescription()}
        </div>

        {/* 출처 */}
        {data.source && (
          <div style={{
            fontSize: 24, fontWeight: 500, color: "#888",
            fontFamily: theme.font, marginTop: 20,
            opacity: sourceOpacity,
          }}>
            {data.source}
          </div>
        )}
      </div>
    </div>
  );
};
