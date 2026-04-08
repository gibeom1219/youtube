import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { useSceneTheme } from "../contexts/SceneTheme";

interface Props {
  data: {
    title?: string;
    pros: {
      header?: string;
      items: string[];
    };
    cons: {
      header?: string;
      items: string[];
    };
  };
}

export const WhiteProsCons: React.FC<Props> = ({ data }) => {
  const theme = useSceneTheme();
  const frame = useCurrentFrame();
  if (!data) return null;

  const titleOpacity = interpolate(frame, [0, 14], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const renderColumn = (
    items: string[],
    color: string,
    icon: string,
    header: string,
    baseDelay: number
  ) => {
    const headerOpacity = interpolate(frame, [baseDelay, baseDelay + 10], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

    return (
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 14 }}>
        <div style={{
          display: "flex", alignItems: "center", gap: 12,
          opacity: headerOpacity, marginBottom: 8,
        }}>
          <div style={{
            width: 40, height: 40, borderRadius: 8,
            background: color, display: "flex",
            alignItems: "center", justifyContent: "center",
          }}>
            <span style={{ fontSize: 22, color: "white", fontWeight: 900 }}>{icon}</span>
          </div>
          <span style={{
            fontSize: 32, fontWeight: 800, color: "#111",
            fontFamily: theme.font,
          }}>
            {header}
          </span>
        </div>

        {items.map((item, i) => {
          const delay = baseDelay + 8 + i * 6;
          const itemOpacity = interpolate(frame, [delay, delay + 10], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
          const itemSlide = interpolate(frame, [delay, delay + 12], [20, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

          return (
            <div key={i} style={{
              display: "flex", alignItems: "flex-start", gap: 12,
              opacity: itemOpacity,
              transform: `translateY(${itemSlide}px)`,
              padding: "10px 16px",
              borderLeft: `3px solid ${color}`,
              borderRadius: 4,
            }}>
              <span style={{
                fontSize: 28, fontWeight: 600, color: "#222",
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
            fontSize: 48, fontWeight: 900, color: "#000",
            fontFamily: theme.font, marginBottom: 32,
            opacity: titleOpacity, letterSpacing: -1,
            textAlign: "center",
          }}>
            {data.title}
          </div>
        )}

        <div style={{
          flex: 1, display: "flex", gap: 48,
        }}>
          {renderColumn(data.pros.items, "#16a34a", "✓", data.pros.header ?? "장점", 6)}

          <div style={{
            width: 2, alignSelf: "stretch",
            background: "linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.12) 20%, rgba(0,0,0,0.12) 80%, transparent 100%)",
          }} />

          {renderColumn(data.cons.items, "#dc2626", "✕", data.cons.header ?? "단점", 12)}
        </div>
      </div>
    </div>
  );
};
