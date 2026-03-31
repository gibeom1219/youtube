import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { theme } from "../styles/theme";

interface Props {
  data: { title: string; buy_pct?: number; sell_pct?: number; neutral_pct?: number; bullish?: number; bearish?: number; neutral?: number; buy_label?: string; sell_label?: string; description?: string; source?: string; date?: string };
}

export const SentimentBar: React.FC<Props> = ({ data }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const buyPct = data.buy_pct ?? data.bullish ?? 50;
  const sellPct = data.sell_pct ?? data.bearish ?? 50;
  const buyLabel = data.buy_label ?? "매수";
  const sellLabel = data.sell_label ?? "매도";
  const neutral = data.neutral_pct ?? data.neutral ?? (100 - buyPct - sellPct);

  const titleOpacity = interpolate(frame, [0, 12], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const titleP = spring({ frame, fps, config: { damping: 100, stiffness: 25 } });
  const barP = interpolate(frame, [14, 50], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const barOpacity = interpolate(frame, [10, 20], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const numOpacity = interpolate(frame, [30, 42], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const descOpacity = interpolate(frame, [38, 50], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const winner = buyPct > sellPct ? "buy" : sellPct > buyPct ? "sell" : "neutral";

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "80px 120px", gap: 30 }}>
      <div style={{ fontSize: 40, fontWeight: 700, color: theme.gold, fontFamily: theme.font, opacity: titleOpacity, transform: `translateY(${interpolate(titleP, [0, 1], [-16, 0])}px)` }}>
        {data.title}
      </div>

      {/* Labels */}
      <div style={{ display: "flex", justifyContent: "space-between", width: "100%", maxWidth: 1000, opacity: barOpacity }}>
        <span style={{ fontSize: 34, fontWeight: 800, color: theme.green, fontFamily: theme.font }}>{buyLabel}</span>
        {neutral > 0 && <span style={{ fontSize: 34, color: theme.gray, fontFamily: theme.font }}>중립</span>}
        <span style={{ fontSize: 34, fontWeight: 800, color: theme.red, fontFamily: theme.font }}>{sellLabel}</span>
      </div>

      {/* Bar */}
      <div style={{ width: "100%", maxWidth: 1000, height: 72, borderRadius: 36, overflow: "hidden", display: "flex", opacity: barOpacity }}>
        <div style={{ width: `${buyPct * barP}%`, height: "100%", background: `linear-gradient(90deg, ${theme.green}90, ${theme.green})` }} />
        {neutral > 0 && <div style={{ width: `${neutral * barP}%`, height: "100%", background: "rgba(255,255,255,0.08)" }} />}
        <div style={{ width: `${sellPct * barP}%`, height: "100%", background: `linear-gradient(90deg, ${theme.red}, ${theme.red}90)` }} />
      </div>

      {/* Percentages */}
      <div style={{ display: "flex", justifyContent: "space-between", width: "100%", maxWidth: 1000, opacity: numOpacity }}>
        <span style={{ fontSize: 64, fontWeight: 900, color: winner === "buy" ? theme.green : theme.grayLight, fontFamily: theme.font }}>{buyPct}%</span>
        {neutral > 0 && <span style={{ fontSize: 44, fontWeight: 600, color: theme.gray, fontFamily: theme.font }}>{neutral}%</span>}
        <span style={{ fontSize: 64, fontWeight: 900, color: winner === "sell" ? theme.red : theme.grayLight, fontFamily: theme.font }}>{sellPct}%</span>
      </div>

      {data.description && (
        <div style={{ fontSize: 30, color: theme.grayLight, fontFamily: theme.font, textAlign: "center", maxWidth: 900, opacity: descOpacity, marginTop: 10 }}>
          {data.description}
        </div>
      )}
    </div>
  );
};
