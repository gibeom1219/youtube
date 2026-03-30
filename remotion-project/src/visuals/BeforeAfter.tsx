import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { theme } from "../styles/theme";

interface Props {
  data: { title: string; before: { label: string; value: string; sub?: string }; after: { label: string; value: string; sub?: string }; change: string; period: string };
}

export const BeforeAfter: React.FC<Props> = ({ data }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const titleOpacity = interpolate(frame, [0, 12], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const titleP = spring({ frame, fps, config: { damping: 100, stiffness: 25 } });
  const beforeOpacity = interpolate(frame, [10, 22], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const beforeP = spring({ frame: frame - 10, fps, config: { damping: 100, stiffness: 10 } });
  const arrowOpacity = interpolate(frame, [20, 30], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const afterOpacity = interpolate(frame, [26, 38], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const afterP = spring({ frame: frame - 26, fps, config: { damping: 100, stiffness: 10 } });
  const changeOpacity = interpolate(frame, [34, 44], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const changeStr = data.change ?? "";
  const isPositive = changeStr.startsWith("+");
  const changeColor = isPositive ? theme.green : changeStr.startsWith("-") ? theme.red : theme.tiffany;

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "70px 120px", gap: 20 }}>
      <div style={{ fontSize: 46, fontWeight: 700, color: theme.gold, fontFamily: theme.font, opacity: titleOpacity, transform: `translateY(${interpolate(titleP, [0, 1], [-16, 0])}px)` }}>
        {data.title}
      </div>
      <div style={{ fontSize: 28, color: theme.gray, fontFamily: theme.font, opacity: titleOpacity }}>{data.period}</div>

      <div style={{ display: "flex", alignItems: "center", gap: 50, marginTop: 30 }}>
        <div style={{ textAlign: "center", opacity: beforeOpacity, transform: `translateX(${interpolate(beforeP, [0, 1], [-30, 0])}px)` }}>
          <div style={{ fontSize: 30, color: theme.gray, fontFamily: theme.font, marginBottom: 12 }}>{data.before.label}</div>
          <div style={{ fontSize: 80, fontWeight: 900, color: theme.grayLight, fontFamily: theme.font }}>{data.before.value}</div>
          {data.before.sub && <div style={{ fontSize: 24, color: theme.gray, fontFamily: theme.font, marginTop: 8 }}>{data.before.sub}</div>}
        </div>

        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12, opacity: arrowOpacity }}>
          <div style={{ fontSize: 56, color: changeColor, fontFamily: theme.font }}>→</div>
        </div>

        <div style={{ textAlign: "center", opacity: afterOpacity, transform: `translateX(${interpolate(afterP, [0, 1], [30, 0])}px)` }}>
          <div style={{ fontSize: 30, color: theme.gray, fontFamily: theme.font, marginBottom: 12 }}>{data.after.label}</div>
          <div style={{ fontSize: 80, fontWeight: 900, color: theme.white, fontFamily: theme.font }}>{data.after.value}</div>
          {data.after.sub && <div style={{ fontSize: 24, color: theme.grayLight, fontFamily: theme.font, marginTop: 8 }}>{data.after.sub}</div>}
        </div>
      </div>

      <div style={{ fontSize: 36, fontWeight: 900, color: changeColor, fontFamily: theme.font, opacity: changeOpacity, marginTop: 20, padding: "10px 28px", background: `${changeColor}12`, borderRadius: 12 }}>
        {data.change}
      </div>
    </div>
  );
};
