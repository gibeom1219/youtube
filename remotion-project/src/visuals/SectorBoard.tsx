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

  // 최대값 기준으로 비율 계산
  const maxChange = Math.max(...sectors.map((s) => Math.abs(parseFloat(s.change) || 0)), 1);

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: "60px 120px", gap: 16 }}>
      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "flex-end",
        opacity: titleOpacity, transform: `translateY(${interpolate(titleP, [0, 1], [-16, 0])}px)`,
      }}>
        <div style={{ fontSize: 40, fontWeight: 700, color: theme.gold, fontFamily: theme.font }}>{title}</div>
        {date && <div style={{ fontSize: 20, color: theme.gray, fontFamily: theme.font }}>{date}</div>}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {sectors.map((sector, i) => {
          const rowP = spring({ frame: frame - 8 - i * 4, fps, config: { damping: 100, stiffness: 10 } });
          const rowOpacity = interpolate(frame, [8 + i * 4, 18 + i * 4], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
          const changeColor = getChangeColor(sector.change);
          const changeVal = Math.abs(parseFloat(sector.change) || 0);
          const barW = (changeVal / maxChange) * 100 * Math.min(1, rowP);

          return (
            <div key={i} style={{
              display: "flex", alignItems: "center", gap: 20,
              padding: "18px 24px", borderRadius: 12,
              background: "rgba(129,216,208,0.04)", border: "1px solid rgba(129,216,208,0.08)",
              opacity: rowOpacity, transform: `translateX(${interpolate(rowP, [0, 1], [30, 0])}px)`,
            }}>
              <div style={{ width: 220, fontSize: 24, fontWeight: 700, color: theme.white, fontFamily: theme.font, flexShrink: 0 }}>
                {sector.name}
              </div>
              {sector.index && (
                <div style={{ width: 120, fontSize: 20, color: theme.grayLight, fontFamily: theme.font, flexShrink: 0 }}>
                  {sector.index}
                </div>
              )}
              <div style={{ flex: 1, height: 12, background: "rgba(255,255,255,0.05)", borderRadius: 6, overflow: "hidden" }}>
                <div style={{ width: `${barW}%`, height: "100%", background: changeColor, borderRadius: 6 }} />
              </div>
              <div style={{ width: 120, fontSize: 26, fontWeight: 900, color: changeColor, fontFamily: theme.font, textAlign: "right", flexShrink: 0 }}>
                {sector.change}%
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
