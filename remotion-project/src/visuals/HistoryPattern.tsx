import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { theme } from "../styles/theme";

interface Pattern { period: string; event: string; result: string; change?: string }
interface Props {
  data: { title: string; message: string; patterns: Pattern[] };
}

export const HistoryPattern: React.FC<Props> = ({ data: props }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { title, message, patterns } = props;
  const titleOpacity = interpolate(frame, [0, 12], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const titleP = spring({ frame, fps, config: { damping: 100, stiffness: 25 } });
  const msgOpacity = interpolate(frame, [40, 52], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", padding: "60px 100px" }}>
      <div style={{ fontSize: 38, fontWeight: 700, color: theme.gold, fontFamily: theme.font, textAlign: "center", marginBottom: 36, opacity: titleOpacity, transform: `translateY(${interpolate(titleP, [0, 1], [-16, 0])}px)` }}>
        {title}
      </div>

      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 16, justifyContent: "center" }}>
        {patterns.map((p, i) => {
          const isLast = i === patterns.length - 1;
          const rowP = spring({ frame: frame - 10 - i * 10, fps, config: { damping: 100, stiffness: 10 } });
          const rowOpacity = interpolate(frame, [10 + i * 10, 22 + i * 10], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
          const changeColor = p.change?.startsWith("+") ? theme.green : p.change?.startsWith("-") ? theme.red : theme.tiffany;
          const pulse = isLast ? (Math.sin(frame * 0.06) + 1) / 2 : 0;

          return (
            <div key={i} style={{
              display: "flex", alignItems: "center", gap: 20,
              padding: "20px 28px", borderRadius: 14,
              background: isLast ? `${theme.tiffany}10` : "rgba(129,216,208,0.04)",
              border: isLast ? `2px solid ${theme.tiffany}40` : "1px solid rgba(129,216,208,0.08)",
              opacity: rowOpacity, transform: `translateX(${interpolate(rowP, [0, 1], [-30, 0])}px)`,
              boxShadow: isLast ? `0 0 ${10 + pulse * 15}px ${theme.tiffany}15` : "none",
            }}>
              <div style={{ width: 100, fontSize: 26, fontWeight: 800, color: isLast ? theme.tiffany : theme.grayLight, fontFamily: theme.font, flexShrink: 0 }}>
                {p.period}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 28, fontWeight: 600, color: theme.white, fontFamily: theme.font }}>{p.event}</div>
                <div style={{ fontSize: 24, color: theme.grayLight, fontFamily: theme.font, marginTop: 4 }}>{p.result}</div>
              </div>
              {p.change && (
                <div style={{ fontSize: 24, fontWeight: 900, color: changeColor, fontFamily: theme.font, flexShrink: 0 }}>{p.change}</div>
              )}
              {isLast && <div style={{ fontSize: 24, fontWeight: 800, color: theme.tiffany, fontFamily: theme.font, padding: "4px 12px", background: `${theme.tiffany}15`, borderRadius: 6 }}>NOW</div>}
            </div>
          );
        })}
      </div>

      <div style={{ fontSize: 24, color: theme.tiffany, fontFamily: theme.font, textAlign: "center", marginTop: 16, opacity: msgOpacity, fontWeight: 600 }}>
        {message}
      </div>
    </div>
  );
};
