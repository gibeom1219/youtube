import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { theme } from "../styles/theme";

interface Props {
  data: { title: string; date?: string; sectors: Array<{ name: string; change: string; index?: string }> };
}

export const SectorBoard: React.FC<Props> = ({ data: props }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const { title, date, sectors } = props;

  const titleOpacity = interpolate(frame, [0, 12], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const titleP = spring({ frame, fps, config: { damping: 100, stiffness: 25 } });

  const getChangeColor = (change: string) => {
    const val = parseFloat(change);
    if (val > 0) return theme.green;
    if (val < 0) return theme.red;
    return theme.gray;
  };

  const getBarWidth = (change: string) => {
    const val = Math.abs(parseFloat(change));
    return Math.min(val * 15, 100);
  };

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", padding: "60px 120px" }}>
      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 40,
        opacity: titleOpacity, transform: `translateY(${interpolate(titleP, [0, 1], [-16, 0])}px)`,
      }}>
        <div style={{ fontSize: 40, fontWeight: 700, color: theme.gold, fontFamily: theme.font }}>{title}</div>
        {date && <div style={{ fontSize: 20, color: theme.gray, fontFamily: theme.font }}>{date}</div>}
      </div>

      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 12, justifyContent: "center" }}>
        {sectors.map((sector, i) => {
          const rowP = spring({ frame: frame - 8 - i * 4, fps, config: { damping: 100, stiffness: 10 } });
          const rowOpacity = interpolate(frame, [8 + i * 4, 18 + i * 4], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
          const changeColor = getChangeColor(sector.change);
          const barW = getBarWidth(sector.change) * Math.min(1, rowP);

          return (
            <div key={i} style={{
              display: "flex", alignItems: "center", gap: 20,
              padding: "16px 24px", borderRadius: 10,
              background: "rgba(129,216,208,0.04)", border: "1px solid rgba(129,216,208,0.08)",
              opacity: rowOpacity, transform: `translateX(${interpolate(rowP, [0, 1], [30, 0])}px)`,
            }}>
              <div style={{ width: 200, fontSize: 22, fontWeight: 700, color: theme.white, fontFamily: theme.font }}>
                {sector.name}
              </div>
              {sector.index && (
                <div style={{ width: 120, fontSize: 18, color: theme.grayLight, fontFamily: theme.font }}>
                  {sector.index}
                </div>
              )}
              <div style={{ flex: 1, height: 8, background: "rgba(255,255,255,0.05)", borderRadius: 4, overflow: "hidden" }}>
                <div style={{ width: `${barW}%`, height: "100%", background: changeColor, borderRadius: 4, transition: "width 0s" }} />
              </div>
              <div style={{ width: 100, fontSize: 24, fontWeight: 900, color: changeColor, fontFamily: theme.font, textAlign: "right" }}>
                {sector.change}%
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
