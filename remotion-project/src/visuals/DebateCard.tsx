import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { theme } from "../styles/theme";

interface Props {
  data: { speaker: string; role?: string; quote: string; reactions: Array<{ side: "support" | "oppose"; text: string }> };
}

export const DebateCard: React.FC<Props> = ({ data }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const quoteP = spring({ frame, fps, config: { damping: 100, stiffness: 10 } });
  const quoteOpacity = interpolate(frame, [0, 14], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", padding: "60px 100px", gap: 20 }}>
      {/* 발언 */}
      <div style={{
        padding: "28px 36px", borderRadius: 16,
        background: `${theme.tiffany}08`, border: `1px solid ${theme.tiffany}25`,
        opacity: quoteOpacity, transform: `translateY(${interpolate(quoteP, [0, 1], [-20, 0])}px)`,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
          <div style={{ fontSize: 20, fontWeight: 800, color: theme.tiffany, fontFamily: theme.font }}>{data.speaker}</div>
          {data.role && <div style={{ fontSize: 16, color: theme.gray, fontFamily: theme.font }}>{data.role}</div>}
        </div>
        <div style={{ fontSize: 26, color: theme.white, fontFamily: theme.font, lineHeight: 1.5, fontWeight: 500 }}>
          "{data.quote}"
        </div>
      </div>

      {/* 반응들 */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 12, justifyContent: "center" }}>
        {data.reactions.map((r, i) => {
          const rP = spring({ frame: frame - 16 - i * 10, fps, config: { damping: 100, stiffness: 10 } });
          const rOpacity = interpolate(frame, [16 + i * 10, 28 + i * 10], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
          const isSupport = r.side === "support";
          const color = isSupport ? theme.green : theme.red;
          const icon = isSupport ? "👍" : "👎";

          return (
            <div key={i} style={{
              display: "flex", alignItems: "center", gap: 16,
              padding: "18px 28px", borderRadius: 12,
              background: `${color}08`, borderLeft: `4px solid ${color}60`,
              opacity: rOpacity, transform: `translateX(${interpolate(rP, [0, 1], [isSupport ? -30 : 30, 0])}px)`,
            }}>
              <span style={{ fontSize: 24, fontFamily: theme.font }}>{icon}</span>
              <span style={{ fontSize: 22, color: theme.white, fontFamily: theme.font, lineHeight: 1.5 }}>{r.text}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
