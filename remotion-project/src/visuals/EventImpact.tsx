import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { theme } from "../styles/theme";

interface Props {
  data: { event: string; event_date?: string; date?: string; impacts: Array<{ market?: string; target?: string; reaction: string; change?: string; direction?: string; delay?: string }> };
}

export const EventImpact: React.FC<Props> = ({ data }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const eventDate = data.event_date ?? data.date ?? "";
  const eventP = spring({ frame, fps, config: { damping: 100, stiffness: 25 } });
  const eventOpacity = interpolate(frame, [0, 14], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const pulse = (Math.sin(frame * 0.08) + 1) / 2;

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: "60px 100px", gap: 16 }}>
      {/* Event header */}
      <div style={{
        alignSelf: "center", padding: "20px 40px", borderRadius: 14,
        background: `${theme.red}12`, border: `2px solid ${theme.red}40`,
        opacity: eventOpacity, transform: `scale(${interpolate(eventP, [0, 1], [0.85, 1])})`,
        display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
        boxShadow: `0 0 ${15 + pulse * 15}px ${theme.red}20`,
      }}>
        <div style={{ fontSize: 24, color: theme.red, fontFamily: theme.font, fontWeight: 600 }}>{eventDate}</div>
        <div style={{ fontSize: 32, fontWeight: 800, color: theme.white, fontFamily: theme.font }}>⚡ {data.event}</div>
      </div>

      {/* Shockwave line */}
      <div style={{ alignSelf: "center", fontSize: 26, color: `${theme.tiffany}50`, fontFamily: theme.font, opacity: eventOpacity }}>--- 시장 충격 ---</div>

      {/* Impacts */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {data.impacts.map((impact, i) => {
          const impP = spring({ frame: frame - 16 - i * 10, fps, config: { damping: 100, stiffness: 10 } });
          const impOpacity = interpolate(frame, [16 + i * 10, 28 + i * 10], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
          const marketName = impact.market ?? impact.target ?? "";
          const changeStr = impact.change ?? impact.reaction ?? "";
          const dir = impact.direction;
          const changeVal = dir === "up" ? 1 : dir === "down" ? -1 : parseFloat(changeStr);
          const changeColor = changeVal > 0 ? theme.green : changeVal < 0 ? theme.red : theme.grayLight;

          return (
            <div key={i} style={{
              display: "flex", alignItems: "center", gap: 20,
              padding: "18px 28px", borderRadius: 12,
              background: "rgba(129,216,208,0.04)", border: "1px solid rgba(129,216,208,0.1)",
              opacity: impOpacity, transform: `translateX(${interpolate(impP, [0, 1], [40, 0])}px)`,
            }}>
              <div style={{ width: 200, fontSize: 24, fontWeight: 700, color: theme.tiffany, fontFamily: theme.font }}>{marketName}</div>
              <div style={{ flex: 1, fontSize: 28, color: theme.grayLight, fontFamily: theme.font }}>{impact.reaction}</div>
              <div style={{ fontSize: 30, fontWeight: 900, color: changeColor, fontFamily: theme.font, flexShrink: 0 }}>{changeStr}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
