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
  const { title, flows } = props;
  const titleOpacity = interpolate(frame, [0, 12], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const titleP = spring({ frame, fps, config: { damping: 100, stiffness: 25 } });

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: "60px 100px", gap: 24 }}>
      {/* 제목 */}
      <div style={{ fontSize: 40, fontWeight: 700, color: theme.gold, fontFamily: theme.font, textAlign: "center", opacity: titleOpacity, transform: `translateY(${interpolate(titleP, [0, 1], [-16, 0])}px)` }}>
        {title}
      </div>

      {/* 흐름 카드들 */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {flows.map((flow, i) => {
          const flowP = spring({ frame: frame - 10 - i * 8, fps, config: { damping: 100, stiffness: 10 } });
          const flowOpacity = interpolate(frame, [10 + i * 8, 22 + i * 8], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
          const color = COLORS[i % COLORS.length];

          return (
            <div key={i} style={{
              display: "flex", alignItems: "center", gap: 16,
              padding: "18px 28px", borderRadius: 14,
              background: `${color}08`, border: `1px solid ${color}20`,
              opacity: flowOpacity, transform: `translateX(${interpolate(flowP, [0, 1], [30, 0])}px)`,
            }}>
              {/* From */}
              <div style={{
                padding: "8px 18px", borderRadius: 10,
                background: `${color}18`, border: `1px solid ${color}35`,
                flexShrink: 0,
              }}>
                <div style={{ fontSize: 24, fontWeight: 800, color, fontFamily: theme.font }}>{flow.from}</div>
              </div>

              {/* Arrow + Amount */}
              <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
                <div style={{ fontSize: 28, color: `${color}80` }}>→</div>
                {flow.amount && <div style={{ fontSize: 20, fontWeight: 700, color: theme.grayLight, fontFamily: theme.font }}>{flow.amount}</div>}
                <div style={{ fontSize: 28, color: `${color}80` }}>→</div>
              </div>

              {/* To + Note */}
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 26, fontWeight: 700, color: theme.white, fontFamily: theme.font }}>{flow.to}</div>
                {flow.note && <div style={{ fontSize: 20, color: theme.grayLight, fontFamily: theme.font, marginTop: 4 }}>{flow.note}</div>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
