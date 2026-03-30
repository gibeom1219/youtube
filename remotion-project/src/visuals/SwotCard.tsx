import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { theme } from "../styles/theme";

interface Props {
  data: { title: string; strengths: string[]; weaknesses: string[]; opportunities: string[]; threats: string[] };
}

const QUADRANTS = [
  { key: "strengths", label: "강점 (S)", color: "#52D68A", icon: "💪" },
  { key: "weaknesses", label: "약점 (W)", color: "#FF6B6B", icon: "⚠️" },
  { key: "opportunities", label: "기회 (O)", color: "#81D8D0", icon: "🚀" },
  { key: "threats", label: "위협 (T)", color: "#FFB347", icon: "🔥" },
] as const;

export const SwotCard: React.FC<Props> = ({ data: props }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 12], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const titleP = spring({ frame, fps, config: { damping: 100, stiffness: 25 } });

  const getItems = (key: string): string[] => {
    return (props as any)[key] ?? [];
  };

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", padding: "60px 100px" }}>
      <div style={{
        fontSize: 40, fontWeight: 700, color: theme.gold, fontFamily: theme.font,
        textAlign: "center", marginBottom: 40, opacity: titleOpacity,
        transform: `translateY(${interpolate(titleP, [0, 1], [-16, 0])}px)`,
      }}>
        {props.title}
      </div>

      <div style={{ flex: 1, display: "flex", flexWrap: "wrap", gap: 16 }}>
        {QUADRANTS.map((q, qi) => {
          const items = getItems(q.key);
          const qP = spring({ frame: frame - 8 - qi * 8, fps, config: { damping: 100, stiffness: 10 } });
          const qOpacity = interpolate(frame, [8 + qi * 8, 20 + qi * 8], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

          return (
            <div key={q.key} style={{
              width: "calc(50% - 8px)", flex: "none",
              padding: "28px 32px", borderRadius: 16,
              background: `${q.color}0a`, border: `1px solid ${q.color}25`,
              opacity: qOpacity, transform: `scale(${interpolate(qP, [0, 1], [0.92, 1])})`,
              display: "flex", flexDirection: "column", gap: 16,
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ fontSize: 28, fontFamily: theme.font }}>{q.icon}</span>
                <span style={{ fontSize: 24, fontWeight: 800, color: q.color, fontFamily: theme.font }}>{q.label}</span>
              </div>
              {items.map((item, ii) => {
                const itemOpacity = interpolate(frame, [16 + qi * 8 + ii * 5, 24 + qi * 8 + ii * 5], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
                return (
                  <div key={ii} style={{
                    fontSize: 26, color: theme.white, fontFamily: theme.font,
                    paddingLeft: 16, borderLeft: `3px solid ${q.color}50`,
                    opacity: itemOpacity, lineHeight: 1.4,
                  }}>
                    {item}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};
