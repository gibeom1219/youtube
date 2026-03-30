import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { theme } from "../styles/theme";

interface Props {
  data: {
    title: string;
    pros: string[];
    cons: string[];
    pros_label?: string;
    cons_label?: string;
  };
  durationFrames: number;
}

export const ProsConsCard: React.FC<Props> = ({ data, durationFrames }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleProgress = spring({ frame, fps, config: { damping: 100, stiffness: 10 } });
  const maxItems = Math.max(data.pros.length, data.cons.length);
  const interval = Math.min((durationFrames * 0.6) / (maxItems + 1), 18);

  const prosLabel = data.pros_label ?? "장점";
  const consLabel = data.cons_label ?? "단점";

  const renderItems = (items: string[], color: string, icon: string, fromLeft: boolean) => {
    const headerProgress = spring({ frame: frame - 6, fps, config: { damping: 100, stiffness: 10 } });
    return (
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 14 }}>
        {/* 컬럼 헤더 */}
        <div style={{
          display: "flex", alignItems: "center", gap: 12,
          paddingBottom: 16,
          borderBottom: `2px solid ${color}50`,
          opacity: Math.min(1, headerProgress),
          transform: `translateX(${interpolate(Math.min(1, headerProgress), [0, 1], [fromLeft ? -30 : 30, 0])}px)`,
        }}>
          <span style={{ fontSize: 36, fontFamily: theme.font }}>{icon}</span>
          <span style={{
            fontSize: 30, fontWeight: 900, color,
            fontFamily: theme.font,
          }}>
            {fromLeft ? prosLabel : consLabel}
          </span>
        </div>

        {/* 항목들 */}
        {items.map((item, i) => {
          const startFrame = Math.round(interval * (i + 1) + (fromLeft ? 0 : 6));
          const p = spring({ frame: frame - startFrame, fps, config: { damping: 100, stiffness: 10 } });
          const settled = Math.max(0, frame - (startFrame + 20));
          const pulse = (Math.sin(settled * 0.05 + i * 1.2) + 1) / 2;

          return (
            <div key={i} style={{
              display: "flex", alignItems: "flex-start", gap: 14,
              padding: "14px 20px",
              background: `${color}08`,
              border: `1px solid ${color}${Math.round((0.2 + pulse * 0.2) * 255).toString(16).padStart(2, "0")}`,
              borderRadius: 10,
              opacity: Math.min(1, p),
              transform: `translateX(${interpolate(Math.min(1, p), [0, 1], [fromLeft ? -40 : 40, 0])}px)`,
            }}>
              <span style={{ fontSize: 28, flexShrink: 0, marginTop: 2, fontFamily: theme.font }}>{icon}</span>
              <span style={{
                fontSize: 26, fontWeight: 600, color: theme.white,
                fontFamily: theme.font, lineHeight: 1.4,
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
    <div style={{
      width: "100%", height: "100%",
      display: "flex", flexDirection: "column",
      justifyContent: "center", padding: "60px 100px", gap: 32,
    }}>
      {/* 제목 */}
      <div style={{
        fontSize: 44, fontWeight: 900, color: theme.white,
        fontFamily: theme.font, textAlign: "center" as const,
        opacity: Math.min(1, titleProgress),
        transform: `translateY(${interpolate(Math.min(1, titleProgress), [0, 1], [-20, 0])}px)`,
      }}>
        {data.title}
      </div>

      {/* 좌우 컬럼 */}
      <div style={{ display: "flex", gap: 36, flex: 1, alignItems: "flex-start" }}>
        {renderItems(data.pros, theme.green, "✅", true)}
        <div style={{ width: 1, alignSelf: "stretch", background: "rgba(255,255,255,0.1)" }} />
        {renderItems(data.cons, theme.red, "❌", false)}
      </div>
    </div>
  );
};
