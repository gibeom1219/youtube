import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { useSceneTheme } from "../contexts/SceneTheme";

interface Props {
  data: {
    title?: string;
    left: {
      header: string;
      color: string;
      items: string[];
    };
    right: {
      header: string;
      color: string;
      items: string[];
    };
  };
}

export const SplitOverlay: React.FC<Props> = ({ data }) => {
  const theme = useSceneTheme();
  const frame = useCurrentFrame();
  if (!data) return null;

  const titleOpacity = interpolate(frame, [0, 14], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const renderSide = (side: { header: string; color: string; items: string[] }, baseDelay: number) => {
    const headerOpacity = interpolate(frame, [baseDelay, baseDelay + 10], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
    const headerSlide = interpolate(frame, [baseDelay, baseDelay + 12], [20, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

    return (
      <div style={{
        flex: 1, display: "flex", flexDirection: "column",
        gap: 16,
      }}>
        {/* 헤더 */}
        <div style={{
          background: side.color,
          borderRadius: 8,
          padding: "14px 24px",
          opacity: headerOpacity,
          transform: `translateY(${-headerSlide}px)`,
        }}>
          <span style={{
            fontSize: 30, fontWeight: 800, color: "white",
            fontFamily: theme.font,
          }}>
            {side.header}
          </span>
        </div>

        {/* 항목들 */}
        {side.items.map((item, i) => {
          const itemDelay = baseDelay + 8 + i * 6;
          const itemOpacity = interpolate(frame, [itemDelay, itemDelay + 10], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
          const itemSlide = interpolate(frame, [itemDelay, itemDelay + 12], [20, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

          return (
            <div key={i} style={{
              display: "flex", alignItems: "flex-start", gap: 12,
              opacity: itemOpacity,
              transform: `translateY(${itemSlide}px)`,
            }}>
              <div style={{
                width: 8, height: 8, borderRadius: "50%",
                background: side.color, flexShrink: 0, marginTop: 12,
              }} />
              <span style={{
                fontSize: 28, fontWeight: 600, color: "#111",
                fontFamily: theme.font, lineHeight: 1.5,
              }}>
                {item}
              </span>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      {/* 콘텐츠 — 오버레이는 FinanceVideo에서 SceneTransition 바깥에 렌더링 */}
      <div style={{
        position: "absolute", top: 140, bottom: 200, left: 180, right: 180,
        display: "flex", flexDirection: "column",
        zIndex: 3,
      }}>
        {/* 타이틀 */}
        {data.title && (
          <div style={{
            fontSize: 48, fontWeight: 900, color: "#000",
            fontFamily: theme.font, marginBottom: 28,
            opacity: titleOpacity, letterSpacing: -1,
            textAlign: "center", lineHeight: 1.3,
          }}>
            {data.title}
          </div>
        )}

        {/* 좌우 패널 */}
        <div style={{
          flex: 1, display: "flex", gap: 48,
          alignItems: "flex-start",
        }}>
          {renderSide(data.left, 8)}

          {/* 구분선 */}
          <div style={{
            width: 3, alignSelf: "stretch",
            background: "linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.15) 20%, rgba(0,0,0,0.15) 80%, transparent 100%)",
            opacity: interpolate(frame, [12, 22], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
          }} />

          {renderSide(data.right, 14)}
        </div>
      </div>
    </div>
  );
};
