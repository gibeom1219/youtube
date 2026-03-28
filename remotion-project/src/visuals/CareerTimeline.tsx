import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { theme } from "../styles/theme";

interface Event { year: string; title: string; detail?: string; highlight?: boolean }
interface Props {
  data: { name: string; role: string; avatar?: string; events: Event[] };
}

export const CareerTimeline: React.FC<Props> = ({ data }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const headerP = spring({ frame, fps, config: { damping: 100, stiffness: 10 } });
  const headerOpacity = interpolate(frame, [0, 14], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", padding: "60px 100px" }}>
      {/* Header */}
      <div style={{
        display: "flex", alignItems: "center", gap: 20, marginBottom: 30,
        opacity: headerOpacity, transform: `translateX(${interpolate(headerP, [0, 1], [-20, 0])}px)`,
      }}>
        {data.avatar && <span style={{ fontSize: 56, fontFamily: theme.font }}>{data.avatar}</span>}
        <div>
          <div style={{ fontSize: 36, fontWeight: 900, color: theme.white, fontFamily: theme.font }}>{data.name}</div>
          <div style={{ fontSize: 20, color: theme.tiffany, fontFamily: theme.font, fontWeight: 600 }}>{data.role}</div>
        </div>
      </div>

      {/* Timeline */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 6, justifyContent: "center", position: "relative", paddingLeft: 30 }}>
        {/* Vertical line */}
        <div style={{ position: "absolute", left: 14, top: 0, bottom: 0, width: 2, background: `${theme.tiffany}20` }} />

        {data.events.map((evt, i) => {
          const evtP = spring({ frame: frame - 10 - i * 8, fps, config: { damping: 100, stiffness: 10 } });
          const evtOpacity = interpolate(frame, [10 + i * 8, 22 + i * 8], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
          const isHighlight = evt.highlight;
          const pulse = isHighlight ? (Math.sin(frame * 0.06) + 1) / 2 : 0;

          return (
            <div key={i} style={{
              display: "flex", alignItems: "flex-start", gap: 20,
              opacity: evtOpacity, transform: `translateX(${interpolate(evtP, [0, 1], [20, 0])}px)`,
              position: "relative",
            }}>
              {/* Dot */}
              <div style={{
                position: "absolute", left: -22, top: 14,
                width: 14, height: 14, borderRadius: "50%",
                background: isHighlight ? theme.tiffany : `${theme.tiffany}50`,
                border: `2px solid ${theme.bg}`,
                boxShadow: isHighlight ? `0 0 ${8 + pulse * 8}px ${theme.tiffany}50` : "none",
              }} />

              {/* Year */}
              <div style={{ width: 80, fontSize: 18, fontWeight: 800, color: isHighlight ? theme.tiffany : theme.grayLight, fontFamily: theme.font, flexShrink: 0, marginTop: 8 }}>
                {evt.year}
              </div>

              {/* Content */}
              <div style={{
                flex: 1, padding: "12px 20px", borderRadius: 12,
                background: isHighlight ? `${theme.tiffany}10` : "rgba(129,216,208,0.03)",
                border: isHighlight ? `1px solid ${theme.tiffany}30` : "1px solid rgba(129,216,208,0.06)",
              }}>
                <div style={{ fontSize: 20, fontWeight: 700, color: theme.white, fontFamily: theme.font }}>{evt.title}</div>
                {evt.detail && <div style={{ fontSize: 17, color: theme.grayLight, fontFamily: theme.font, marginTop: 4, lineHeight: 1.4 }}>{evt.detail}</div>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
