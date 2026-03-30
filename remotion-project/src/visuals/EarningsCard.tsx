import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { theme } from "../styles/theme";

interface Props {
  data: { company: string; ticker: string; period: string; items: Array<{ metric: string; expected: string; actual: string }>; verdict?: string; logo?: string };
}

export const EarningsCard: React.FC<Props> = ({ data }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const titleOpacity = interpolate(frame, [0, 12], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const titleP = spring({ frame, fps, config: { damping: 100, stiffness: 25 } });

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "60px 120px", gap: 24 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 16, opacity: titleOpacity, transform: `translateY(${interpolate(titleP, [0, 1], [-16, 0])}px)` }}>
        {data.logo && <span style={{ fontSize: 48, fontFamily: theme.font }}>{data.logo}</span>}
        <div>
          <div style={{ fontSize: 40, fontWeight: 900, color: theme.white, fontFamily: theme.font }}>{data.company} ({data.ticker})</div>
          <div style={{ fontSize: 22, color: theme.grayLight, fontFamily: theme.font }}>{data.period} 실적</div>
        </div>
      </div>

      {/* Header */}
      <div style={{ display: "flex", width: "100%", maxWidth: 900, padding: "12px 0", borderBottom: `2px solid ${theme.tiffany}30` }}>
        <div style={{ flex: 2, fontSize: 18, fontWeight: 700, color: theme.gray, fontFamily: theme.font }}>항목</div>
        <div style={{ flex: 1, fontSize: 18, fontWeight: 700, color: theme.gray, fontFamily: theme.font, textAlign: "center" }}>예상</div>
        <div style={{ flex: 1, fontSize: 18, fontWeight: 700, color: theme.gray, fontFamily: theme.font, textAlign: "center" }}>실제</div>
        <div style={{ flex: 1, fontSize: 18, fontWeight: 700, color: theme.gray, fontFamily: theme.font, textAlign: "center" }}>결과</div>
      </div>

      {data.items.map((item, i) => {
        const rowP = spring({ frame: frame - 12 - i * 8, fps, config: { damping: 100, stiffness: 10 } });
        const rowOpacity = interpolate(frame, [12 + i * 8, 24 + i * 8], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
        const expNum = parseFloat(item.expected.replace(/[^0-9.-]/g, ""));
        const actNum = parseFloat(item.actual.replace(/[^0-9.-]/g, ""));
        const beat = actNum >= expNum;

        return (
          <div key={i} style={{
            display: "flex", width: "100%", maxWidth: 900, padding: "16px 0",
            borderBottom: "1px solid rgba(129,216,208,0.08)",
            opacity: rowOpacity, transform: `translateX(${interpolate(rowP, [0, 1], [20, 0])}px)`,
          }}>
            <div style={{ flex: 2, fontSize: 22, fontWeight: 600, color: theme.white, fontFamily: theme.font }}>{item.metric}</div>
            <div style={{ flex: 1, fontSize: 22, color: theme.grayLight, fontFamily: theme.font, textAlign: "center" }}>{item.expected}</div>
            <div style={{ flex: 1, fontSize: 22, fontWeight: 800, color: beat ? theme.green : theme.red, fontFamily: theme.font, textAlign: "center" }}>{item.actual}</div>
            <div style={{ flex: 1, fontSize: 22, fontFamily: theme.font, textAlign: "center" }}>{beat ? "✅ Beat" : "❌ Miss"}</div>
          </div>
        );
      })}

      {data.verdict && (
        <div style={{ fontSize: 24, color: theme.tiffany, fontFamily: theme.font, fontWeight: 600, marginTop: 12, opacity: interpolate(frame, [36, 48], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) }}>
          💡 {data.verdict}
        </div>
      )}
    </div>
  );
};
