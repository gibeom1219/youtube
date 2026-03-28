import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { theme } from "../styles/theme";

interface Props {
  data: { title: string; levels: Array<{ emoji: string; label: string }>; active: number; description: string };
}

export const EmojiScale: React.FC<Props> = ({ data }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const titleOpacity = interpolate(frame, [0, 12], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const titleP = spring({ frame, fps, config: { damping: 100, stiffness: 25 } });
  const descOpacity = interpolate(frame, [30, 42], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const pulse = (Math.sin(frame * 0.06) + 1) / 2;

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "80px 120px", gap: 40 }}>
      <div style={{ fontSize: 40, fontWeight: 700, color: theme.gold, fontFamily: theme.font, opacity: titleOpacity, transform: `translateY(${interpolate(titleP, [0, 1], [-16, 0])}px)` }}>
        {data.title}
      </div>

      <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
        {data.levels.map((lv, i) => {
          const isActive = i === data.active;
          const lvP = spring({ frame: frame - 10 - i * 6, fps, config: { damping: 100, stiffness: 10 } });
          const lvOpacity = interpolate(frame, [10 + i * 6, 20 + i * 6], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

          return (
            <div key={i} style={{
              display: "flex", flexDirection: "column", alignItems: "center", gap: 16,
              opacity: lvOpacity, transform: `scale(${interpolate(lvP, [0, 1], [0.7, 1])})`,
              padding: "24px 20px", borderRadius: 16,
              background: isActive ? `${theme.tiffany}15` : "transparent",
              border: isActive ? `2px solid ${theme.tiffany}50` : "2px solid transparent",
              boxShadow: isActive ? `0 0 ${15 + pulse * 15}px ${theme.tiffany}25` : "none",
              transition: "box-shadow 0s",
              minWidth: 100,
            }}>
              <span style={{ fontSize: isActive ? 72 : 48, fontFamily: theme.font, filter: isActive ? "none" : "grayscale(0.5) opacity(0.5)" }}>
                {lv.emoji}
              </span>
              <span style={{ fontSize: isActive ? 20 : 16, fontWeight: isActive ? 800 : 500, color: isActive ? theme.tiffany : theme.gray, fontFamily: theme.font, textAlign: "center" }}>
                {lv.label}
              </span>
            </div>
          );
        })}
      </div>

      <div style={{ fontSize: 26, color: theme.grayLight, fontFamily: theme.font, textAlign: "center", maxWidth: 900, lineHeight: 1.5, opacity: descOpacity }}>
        {data.description}
      </div>
    </div>
  );
};
