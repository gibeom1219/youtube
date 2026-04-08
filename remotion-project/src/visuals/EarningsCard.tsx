import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { theme } from "../styles/theme";
import { useSceneTheme } from "../contexts/SceneTheme";

interface Props {
  data: { company: string; ticker: string; period: string; items: Array<{ metric: string; expected: string; actual: string }>; verdict?: string; logo?: string };
}

export const EarningsCard: React.FC<Props> = ({ data }) => {
  const theme = useSceneTheme();
  const frame = useCurrentFrame();
  if (!data) return null;
  const titleOpacity = interpolate(frame, [0, 14], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const headerOpacity = interpolate(frame, [8, 20], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const verdictOpacity = interpolate(frame, [30, 42], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "60px 120px", gap: 24 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 16, opacity: titleOpacity }}>
        {data.logo && <span style={{ fontSize: 48, fontFamily: theme.font }}>{data.logo}</span>}
        <div>
          <div style={{ fontSize: 48, fontWeight: 900, color: theme.white, fontFamily: theme.font, textShadow: theme.textShadow.medium }}>{data.company} ({data.ticker})</div>
          <div style={{ fontSize: 32, color: theme.grayLight, fontFamily: theme.font, textShadow: theme.textShadow.medium }}>{data.period} 실적</div>
        </div>
      </div>

      <div style={{ display: "flex", width: "100%", maxWidth: 900, padding: "12px 0", borderBottom: `2px solid ${theme.tiffany}30`, opacity: headerOpacity }}>
        <div style={{ flex: 2, fontSize: 30, fontWeight: 700, color: theme.grayLight, fontFamily: theme.font }}>항목</div>
        <div style={{ flex: 1, fontSize: 30, fontWeight: 700, color: theme.grayLight, fontFamily: theme.font, textAlign: "center" }}>예상</div>
        <div style={{ flex: 1, fontSize: 30, fontWeight: 700, color: theme.grayLight, fontFamily: theme.font, textAlign: "center" }}>실제</div>
        <div style={{ flex: 1, fontSize: 30, fontWeight: 700, color: theme.grayLight, fontFamily: theme.font, textAlign: "center" }}>결과</div>
      </div>

      {(data.items ?? []).map((item, i) => {
        const rowOpacity = interpolate(frame, [14 + i * 8, 26 + i * 8], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
        const expNum = parseFloat(item.expected.replace(/[^0-9.-]/g, ""));
        const actNum = parseFloat(item.actual.replace(/[^0-9.-]/g, ""));
        const beat = actNum >= expNum;

        return (
          <div key={i} style={{
            display: "flex", width: "100%", maxWidth: 900, padding: "16px 0",
            borderBottom: "1px solid rgba(129,216,208,0.30)",
            opacity: rowOpacity,
          }}>
            <div style={{ flex: 2, fontSize: 36, fontWeight: 700, color: theme.white, fontFamily: theme.font, textShadow: theme.textShadow.medium }}>{item.metric}</div>
            <div style={{ flex: 1, fontSize: 34, color: theme.grayLight, fontFamily: theme.fontNum, textAlign: "center", textShadow: theme.textShadow.medium }}>{item.expected}</div>
            <div style={{ flex: 1, fontSize: 36, fontWeight: 800, color: beat ? theme.green : theme.red, fontFamily: theme.fontNum, textAlign: "center", textShadow: theme.textShadow.medium }}>{item.actual}</div>
            <div style={{ flex: 1, fontSize: 34, fontFamily: theme.font, textAlign: "center", color: beat ? theme.green : theme.red, textShadow: theme.textShadow.medium }}>{beat ? "✅ Beat" : "❌ Miss"}</div>
          </div>
        );
      })}

      {data.verdict && (
        <div style={{ fontSize: 34, color: theme.tiffany, fontFamily: theme.font, fontWeight: 700, marginTop: 16, opacity: verdictOpacity, textShadow: theme.textShadow.medium }}>
          💡 {data.verdict}
        </div>
      )}
    </div>
  );
};
