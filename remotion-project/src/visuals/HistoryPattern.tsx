import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { theme } from "../styles/theme";
import { useSceneTheme } from "../contexts/SceneTheme";

interface Pattern { period: string; event: string; result: string; change?: string }
interface Props {
  data: { title: string; message: string; patterns: Pattern[] };
}

export const HistoryPattern: React.FC<Props> = ({ data: props }) => {
  const theme = useSceneTheme();
  const frame = useCurrentFrame();
  if (!props) return null;
  const { fps } = useVideoConfig();
  const { title, message, patterns } = props;
  const titleOpacity = interpolate(frame, [0, 12], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const titleP = spring({ frame, fps, config: { damping: 100, stiffness: 25 } });
  const msgOpacity = interpolate(frame, [40, 52], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: "60px 100px" }}>
      <div style={{ fontSize: 38, fontWeight: 700, color: theme.gold, fontFamily: theme.font, textAlign: "center", marginBottom: 36, textShadow: theme.textShadow.medium, opacity: titleOpacity, transform: `translateY(${interpolate(titleP, [0, 1], [-16, 0])}px)` }}>
        {title}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 16, }}>
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
              background: isLast ? `${theme.tiffany}25` : "rgba(129,216,208,0.25)",
              border: isLast ? `2px solid ${theme.tiffany}40` : "1px solid rgba(129,216,208,0.30)",
              opacity: rowOpacity, transform: `translateX(${interpolate(rowP, [0, 1], [-30, 0])}px)`,
              boxShadow: isLast ? `0 0 ${10 + pulse * 15}px ${theme.tiffany}30` : "none",
            }}>
              <div style={{ width: 220, fontSize: 30, fontWeight: 800, color: isLast ? theme.tiffany : theme.grayLight, fontFamily: theme.font, flexShrink: 0, whiteSpace: "nowrap", textShadow: theme.textShadow.medium }}>
                {p.period}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 34, fontWeight: 700, color: theme.white, fontFamily: theme.font, textShadow: theme.textShadow.medium }}>{p.event}</div>
                <div style={{ fontSize: 28, color: theme.grayLight, fontFamily: theme.font, marginTop: 4, textShadow: theme.textShadow.medium }}>{p.result}</div>
              </div>
              {p.change && (
                <div style={{ fontSize: 30, fontWeight: 900, color: changeColor, fontFamily: theme.fontNum, flexShrink: 0, textShadow: theme.textShadow.medium }}>{p.change}</div>
              )}
              {isLast && <div style={{ fontSize: 28, fontWeight: 800, color: theme.tiffany, fontFamily: theme.font, padding: "6px 16px", background: `${theme.tiffany}30`, borderRadius: 8, textShadow: theme.textShadow.medium }}>NOW</div>}
            </div>
          );
        })}
      </div>

      <div style={{ fontSize: 24, color: theme.tiffany, fontFamily: theme.font, textAlign: "center", marginTop: 16, opacity: msgOpacity, fontWeight: 600, textShadow: theme.textShadow.medium }}>
        {message}
      </div>
    </div>
  );
};
