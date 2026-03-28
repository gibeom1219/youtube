import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { theme } from "../styles/theme";

const COLORS = ["#81D8D0", "#52D68A", "#FFB347", "#FF6B6B", "#C084FC"];

interface Flow { from: string; to: string; amount?: string; note?: string }
interface Props {
  data: { title: string; source: string; flows: Flow[] };
}

export const MoneyFlow: React.FC<Props> = ({ data: props }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { title, source, flows } = props;
  const titleOpacity = interpolate(frame, [0, 12], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const titleP = spring({ frame, fps, config: { damping: 100, stiffness: 25 } });
  const sourceP = spring({ frame: frame - 8, fps, config: { damping: 100, stiffness: 10 } });
  const sourceOpacity = interpolate(frame, [8, 20], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", padding: "60px 80px" }}>
      <div style={{ fontSize: 38, fontWeight: 700, color: theme.gold, fontFamily: theme.font, textAlign: "center", marginBottom: 30, opacity: titleOpacity, transform: `translateY(${interpolate(titleP, [0, 1], [-16, 0])}px)` }}>
        {title}
      </div>

      <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 24 }}>
        {/* Source */}
        <div style={{
          width: 200, padding: "24px 20px", borderRadius: 16,
          background: `${theme.tiffany}15`, border: `2px solid ${theme.tiffany}40`,
          textAlign: "center", flexShrink: 0,
          opacity: sourceOpacity, transform: `scale(${interpolate(sourceP, [0, 1], [0.8, 1])})`,
        }}>
          <div style={{ fontSize: 28, fontWeight: 900, color: theme.tiffany, fontFamily: theme.font }}>{source}</div>
        </div>

        {/* Flows */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 14 }}>
          {flows.map((flow, i) => {
            const flowP = spring({ frame: frame - 16 - i * 8, fps, config: { damping: 100, stiffness: 10 } });
            const flowOpacity = interpolate(frame, [16 + i * 8, 28 + i * 8], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
            const color = COLORS[i % COLORS.length];

            return (
              <div key={i} style={{
                display: "flex", alignItems: "center", gap: 16,
                opacity: flowOpacity, transform: `translateX(${interpolate(flowP, [0, 1], [40, 0])}px)`,
              }}>
                {/* Arrow */}
                <div style={{ fontSize: 24, color: `${color}80` }}>→</div>
                {/* From label */}
                <div style={{ padding: "10px 18px", borderRadius: 10, background: `${color}12`, border: `1px solid ${color}30`, minWidth: 120 }}>
                  <div style={{ fontSize: 18, fontWeight: 700, color, fontFamily: theme.font }}>{flow.from}</div>
                </div>
                {/* Arrow + amount */}
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
                  <div style={{ fontSize: 20, color: `${color}80` }}>→</div>
                  {flow.amount && <div style={{ fontSize: 14, color: theme.gray, fontFamily: theme.font }}>{flow.amount}</div>}
                </div>
                {/* To */}
                <div style={{ padding: "10px 18px", borderRadius: 10, background: `${color}08`, border: `1px solid ${color}20`, flex: 1 }}>
                  <div style={{ fontSize: 18, fontWeight: 700, color: theme.white, fontFamily: theme.font }}>{flow.to}</div>
                  {flow.note && <div style={{ fontSize: 15, color: theme.grayLight, fontFamily: theme.font, marginTop: 4 }}>{flow.note}</div>}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
