import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { theme } from "../styles/theme";

interface Indicator { label: string; past_value: string; current_value: string; status: "safe" | "caution" | "danger" }
interface Props {
  data: { title: string; subtitle?: string; indicators: Indicator[]; verdict: string };
}

const STATUS_STYLE = {
  safe: { color: "#52D68A", label: "안전" },
  caution: { color: "#FFB347", label: "주의" },
  danger: { color: "#FF6B6B", label: "위험" },
};

export const BubbleIndicator: React.FC<Props> = ({ data: props }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const titleOpacity = interpolate(frame, [0, 12], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const titleP = spring({ frame, fps, config: { damping: 100, stiffness: 25 } });
  const verdictOpacity = interpolate(frame, [40, 52], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const dangerCount = props.indicators.filter((i) => i.status === "danger").length;
  const cautionCount = props.indicators.filter((i) => i.status === "caution").length;

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", padding: "60px 100px" }}>
      <div style={{ textAlign: "center", marginBottom: 30, opacity: titleOpacity, transform: `translateY(${interpolate(titleP, [0, 1], [-16, 0])}px)` }}>
        <div style={{ fontSize: 40, fontWeight: 700, color: theme.gold, fontFamily: theme.font }}>{props.title}</div>
        {props.subtitle && <div style={{ fontSize: 20, color: theme.grayLight, fontFamily: theme.font, marginTop: 6 }}>{props.subtitle}</div>}
      </div>

      {/* Header */}
      <div style={{ display: "flex", padding: "16px 24px", background: `${theme.tiffany}08`, borderRadius: "10px 10px 0 0" }}>
        <div style={{ flex: 2, fontSize: 22, fontWeight: 700, color: theme.gray, fontFamily: theme.font }}>지표</div>
        <div style={{ flex: 1, fontSize: 22, fontWeight: 700, color: theme.gray, fontFamily: theme.font, textAlign: "center" }}>과거(닷컴)</div>
        <div style={{ flex: 1, fontSize: 22, fontWeight: 700, color: theme.gray, fontFamily: theme.font, textAlign: "center" }}>현재</div>
        <div style={{ flex: 1, fontSize: 22, fontWeight: 700, color: theme.gray, fontFamily: theme.font, textAlign: "center" }}>판단</div>
      </div>

      {props.indicators.map((ind, i) => {
        const rowP = spring({ frame: frame - 10 - i * 8, fps, config: { damping: 100, stiffness: 10 } });
        const rowOpacity = interpolate(frame, [10 + i * 8, 22 + i * 8], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
        const style = STATUS_STYLE[ind.status];

        return (
          <div key={i} style={{
            display: "flex", padding: "20px 24px", alignItems: "center",
            background: i % 2 === 0 ? "rgba(129,216,208,0.03)" : "transparent",
            border: "1px solid rgba(129,216,208,0.06)", borderTop: "none",
            opacity: rowOpacity, transform: `translateX(${interpolate(rowP, [0, 1], [20, 0])}px)`,
          }}>
            <div style={{ flex: 2, fontSize: 26, fontWeight: 600, color: theme.white, fontFamily: theme.font }}>{ind.label}</div>
            <div style={{ flex: 1, fontSize: 24, color: theme.grayLight, fontFamily: theme.font, textAlign: "center" }}>{ind.past_value}</div>
            <div style={{ flex: 1, fontSize: 24, fontWeight: 700, color: style.color, fontFamily: theme.font, textAlign: "center" }}>{ind.current_value}</div>
            <div style={{ flex: 1, textAlign: "center" }}>
              <span style={{ fontSize: 22, fontWeight: 800, color: style.color, fontFamily: theme.font, padding: "6px 16px", background: `${style.color}15`, borderRadius: 8 }}>{style.label}</span>
            </div>
          </div>
        );
      })}

      <div style={{ fontSize: 24, color: dangerCount >= 2 ? theme.red : cautionCount >= 2 ? "#FFB347" : theme.tiffany, fontFamily: theme.font, textAlign: "center", marginTop: 20, fontWeight: 700, opacity: verdictOpacity }}>
        💡 {props.verdict}
      </div>
    </div>
  );
};
