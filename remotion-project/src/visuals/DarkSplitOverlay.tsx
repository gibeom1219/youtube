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

export const DarkSplitOverlay: React.FC<Props> = ({ data }) => {
  const theme = useSceneTheme();
  const frame = useCurrentFrame();
  if (!data) return null;

  // left_title/left_items 형태도 수용
  const left = data.left ?? { header: (data as any).left_title ?? "", color: "#81D8D0", items: (data as any).left_items ?? [] };
  const right = data.right ?? { header: (data as any).right_title ?? "", color: "#ef4444", items: (data as any).right_items ?? [] };
  const normalizedData = { ...data, left, right };

  const titleOpacity = interpolate(frame, [0, 14], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const renderSide = (side: { header: string; color: string; items: string[] }, baseDelay: number) => {
    const headerOpacity = interpolate(frame, [baseDelay, baseDelay + 10], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

    return (
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 14 }}>
        <div style={{
          display: "flex", alignItems: "center", gap: 12,
          opacity: headerOpacity, marginBottom: 8,
        }}>
          <div style={{
            width: 40, height: 40, borderRadius: 8,
            background: side.color, display: "flex",
            alignItems: "center", justifyContent: "center",
          }}>
            <span style={{ fontSize: 22, color: "white", fontWeight: 900 }}>
              {side === left ? "A" : "B"}
            </span>
          </div>
          <span style={{
            fontSize: 32, fontWeight: 800, color: "#fff",
            fontFamily: theme.font,
          }}>
            {side.header}
          </span>
        </div>

        {side.items.map((item, i) => {
          const delay = baseDelay + 8 + i * 6;
          const itemOpacity = interpolate(frame, [delay, delay + 10], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
          const itemSlide = interpolate(frame, [delay, delay + 12], [20, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

          return (
            <div key={i} style={{
              display: "flex", alignItems: "flex-start", gap: 12,
              opacity: itemOpacity,
              transform: `translateY(${itemSlide}px)`,
              padding: "10px 16px",
              borderLeft: `3px solid ${side.color}`,
              borderRadius: 4,
            }}>
              <span style={{
                fontSize: 28, fontWeight: 600, color: "rgba(255,255,255,0.88)",
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
      <div style={{
        position: "absolute", top: 160, bottom: 200, left: 200, right: 200,
        display: "flex", flexDirection: "column",
        zIndex: 3,
      }}>
        {data.title && (
          <div style={{
            fontSize: 48, fontWeight: 900, color: "#fff",
            fontFamily: theme.font, marginBottom: 32,
            opacity: titleOpacity, letterSpacing: -1,
            textAlign: "center",
          }}>
            {data.title}
          </div>
        )}

        <div style={{ flex: 1, display: "flex", gap: 48 }}>
          {renderSide(left, 6)}

          <div style={{
            width: 2, alignSelf: "stretch",
            background: "linear-gradient(180deg, transparent 0%, rgba(129,216,208,0.3) 20%, rgba(129,216,208,0.3) 80%, transparent 100%)",
          }} />

          {renderSide(right, 12)}
        </div>
      </div>
    </div>
  );
};
