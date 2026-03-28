import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { theme } from "../styles/theme";

interface Props {
  data: { title: string; x_axis: string; y_axis: string; quadrants: Array<{ label: string; items: string[]; position: "top_left" | "top_right" | "bottom_left" | "bottom_right" }> };
}

const POS_STYLE: Record<string, { color: string }> = {
  top_right: { color: "#52D68A" },
  top_left: { color: "#FFB347" },
  bottom_right: { color: "#81D8D0" },
  bottom_left: { color: "#FF6B6B" },
};

export const MatrixGrid: React.FC<Props> = ({ data: props }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const titleOpacity = interpolate(frame, [0, 12], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const titleP = spring({ frame, fps, config: { damping: 100, stiffness: 25 } });

  const ordered = ["top_left", "top_right", "bottom_left", "bottom_right"];
  const quadrantMap = Object.fromEntries(props.quadrants.map((q) => [q.position, q]));

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", padding: "60px 100px" }}>
      <div style={{ fontSize: 38, fontWeight: 700, color: theme.gold, fontFamily: theme.font, textAlign: "center", marginBottom: 30, opacity: titleOpacity, transform: `translateY(${interpolate(titleP, [0, 1], [-16, 0])}px)` }}>
        {props.title}
      </div>

      <div style={{ flex: 1, display: "flex", position: "relative" }}>
        {/* Y axis label */}
        <div style={{ position: "absolute", left: -10, top: "50%", transform: "translateY(-50%) rotate(-90deg)", fontSize: 18, color: theme.gray, fontFamily: theme.font, whiteSpace: "nowrap" }}>
          {props.y_axis} →
        </div>

        <div style={{ flex: 1, display: "flex", flexWrap: "wrap", gap: 12, marginLeft: 30 }}>
          {ordered.map((pos, qi) => {
            const q = quadrantMap[pos];
            if (!q) return <div key={pos} style={{ width: "calc(50% - 6px)" }} />;
            const style = POS_STYLE[pos];
            const qP = spring({ frame: frame - 8 - qi * 8, fps, config: { damping: 100, stiffness: 10 } });
            const qOpacity = interpolate(frame, [8 + qi * 8, 20 + qi * 8], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

            return (
              <div key={pos} style={{
                width: "calc(50% - 6px)", padding: "28px 32px", borderRadius: 16,
                background: `${style.color}08`, border: `1px solid ${style.color}20`,
                opacity: qOpacity, transform: `scale(${interpolate(qP, [0, 1], [0.9, 1])})`,
                display: "flex", flexDirection: "column", gap: 14,
              }}>
                <div style={{ fontSize: 22, fontWeight: 800, color: style.color, fontFamily: theme.font }}>{q.label}</div>
                {q.items.map((item, ii) => (
                  <div key={ii} style={{ fontSize: 19, color: theme.white, fontFamily: theme.font, paddingLeft: 14, borderLeft: `2px solid ${style.color}40`, lineHeight: 1.4 }}>
                    {item}
                  </div>
                ))}
              </div>
            );
          })}
        </div>

        {/* X axis label */}
        <div style={{ position: "absolute", bottom: -30, left: "50%", transform: "translateX(-50%)", fontSize: 18, color: theme.gray, fontFamily: theme.font }}>
          {props.x_axis} →
        </div>
      </div>
    </div>
  );
};
