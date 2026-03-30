import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { theme } from "../styles/theme";

interface Props {
  data: { title: string; items: Array<{ headline: string; source?: string; type?: "positive" | "negative" | "neutral" }> };
}

export const NewsTicker: React.FC<Props> = ({ data: props }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { title, items } = props;
  const titleOpacity = interpolate(frame, [0, 12], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Scrolling speed: each item takes ~90 frames to scroll through
  const scrollSpeed = 4;

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: "60px 100px" }}>
      <div style={{ fontSize: 40, fontWeight: 700, color: theme.gold, fontFamily: theme.font, textAlign: "center", marginBottom: 40, opacity: titleOpacity }}>
        {title}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 16, overflow: "hidden" }}>
        {items.map((item, i) => {
          const delay = i * 18;
          const itemOpacity = interpolate(frame, [8 + delay, 16 + delay], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
          const slideX = interpolate(frame, [8 + delay, 20 + delay], [60, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
          const typeColor = item.type === "positive" ? theme.green : item.type === "negative" ? theme.red : theme.tiffany;
          const dot = item.type === "positive" ? "▲" : item.type === "negative" ? "▼" : "●";

          return (
            <div key={i} style={{
              display: "flex", alignItems: "center", gap: 20,
              padding: "20px 28px", borderRadius: 12,
              background: "rgba(129,216,208,0.04)", border: "1px solid rgba(129,216,208,0.08)",
              opacity: itemOpacity, transform: `translateX(${slideX}px)`,
            }}>
              <span style={{ fontSize: 24, color: typeColor, fontFamily: theme.font, flexShrink: 0 }}>{dot}</span>
              <span style={{ fontSize: 24, fontWeight: 600, color: theme.white, fontFamily: theme.font, flex: 1 }}>
                {item.headline}
              </span>
              {item.source && (
                <span style={{ fontSize: 22, color: theme.gray, fontFamily: theme.font, flexShrink: 0 }}>{item.source}</span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
