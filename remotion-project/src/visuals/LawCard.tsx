import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { theme } from "../styles/theme";

interface Props {
  data: { name: string; full_name?: string; status: "passed" | "pending" | "rejected"; date?: string; summary: string; impacts: string[]; icon?: string };
}

const STATUS_STYLE = {
  passed: { color: "#52D68A", label: "통과", icon: "✅" },
  pending: { color: "#FFB347", label: "심의 중", icon: "⏳" },
  rejected: { color: "#FF6B6B", label: "부결", icon: "❌" },
};

export const LawCard: React.FC<Props> = ({ data }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const titleP = spring({ frame, fps, config: { damping: 100, stiffness: 25 } });
  const titleOpacity = interpolate(frame, [0, 14], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const bodyOpacity = interpolate(frame, [12, 24], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const status = STATUS_STYLE[data.status] ?? STATUS_STYLE.pending;

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "70px 120px", gap: 24 }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 16, opacity: titleOpacity, transform: `translateY(${interpolate(titleP, [0, 1], [-16, 0])}px)` }}>
        <span style={{ fontSize: 48, fontFamily: theme.font }}>{data.icon ?? "📜"}</span>
        <div>
          <div style={{ fontSize: 42, fontWeight: 900, color: theme.white, fontFamily: theme.font }}>{data.name}</div>
          {data.full_name && <div style={{ fontSize: 20, color: theme.grayLight, fontFamily: theme.font }}>{data.full_name}</div>}
        </div>
        <div style={{ padding: "8px 20px", borderRadius: 8, background: `${status.color}20`, border: `1px solid ${status.color}50`, marginLeft: 16 }}>
          <span style={{ fontSize: 20, fontWeight: 800, color: status.color, fontFamily: theme.font }}>{status.icon} {status.label}</span>
        </div>
      </div>

      {data.date && <div style={{ fontSize: 18, color: theme.gray, fontFamily: theme.font, opacity: titleOpacity }}>{data.date}</div>}

      {/* Summary */}
      <div style={{
        fontSize: 24, color: theme.grayLight, fontFamily: theme.font, textAlign: "center",
        maxWidth: 1000, lineHeight: 1.5, opacity: bodyOpacity,
        padding: "20px 32px", borderRadius: 14,
        background: "rgba(129,216,208,0.04)", border: "1px solid rgba(129,216,208,0.1)",
      }}>
        {data.summary}
      </div>

      {/* Impacts */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10, width: "100%", maxWidth: 1000 }}>
        {data.impacts.map((impact, i) => {
          const impOpacity = interpolate(frame, [20 + i * 6, 30 + i * 6], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
          return (
            <div key={i} style={{ fontSize: 21, color: theme.white, fontFamily: theme.font, paddingLeft: 16, borderLeft: `3px solid ${theme.tiffany}50`, opacity: impOpacity, lineHeight: 1.4 }}>
              {impact}
            </div>
          );
        })}
      </div>
    </div>
  );
};
