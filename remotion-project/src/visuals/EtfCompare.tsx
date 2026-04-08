import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { theme } from "../styles/theme";
import { useSceneTheme } from "../contexts/SceneTheme";

const COLORS = ["#81D8D0", "#52D68A", "#FFB347", "#C084FC"];

interface Etf { name: string; ticker: string; return_1m?: string; return_3m?: string; return_ytd?: string; expense?: string; aum?: string }
interface Props {
  data: { title: string; etfs: Etf[] };
}

export const EtfCompare: React.FC<Props> = ({ data: props }) => {
  const theme = useSceneTheme();
  const frame = useCurrentFrame();
  if (!props) return null;
  const { fps } = useVideoConfig();
  const titleOpacity = interpolate(frame, [0, 12], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const titleP = spring({ frame, fps, config: { damping: 100, stiffness: 25 } });

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", padding: "60px 80px" }}>
      <div style={{ fontSize: 38, fontWeight: 700, color: theme.gold, fontFamily: theme.font, textAlign: "center", marginBottom: 30, opacity: titleOpacity, transform: `translateY(${interpolate(titleP, [0, 1], [-16, 0])}px)` }}>
        {props.title}
      </div>

      <div style={{ flex: 1, display: "flex", gap: 16, alignItems: "stretch" }}>
        {props.etfs.map((etf, i) => {
          const cardP = spring({ frame: frame - 8 - i * 8, fps, config: { damping: 100, stiffness: 10 } });
          const cardOpacity = interpolate(frame, [8 + i * 8, 20 + i * 8], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
          const color = COLORS[i % COLORS.length];

          return (
            <div key={i} style={{
              flex: 1, padding: "28px 24px", borderRadius: 16,
              background: `${color}22`, border: `1px solid ${color}25`,
              display: "flex", flexDirection: "column", gap: 16,
              opacity: cardOpacity, transform: `translateY(${interpolate(cardP, [0, 1], [20, 0])}px)`,
            }}>
              <div style={{ fontSize: 24, fontWeight: 800, color, fontFamily: theme.font }}>{etf.ticker}</div>
              <div style={{ fontSize: 28, fontWeight: 700, color: theme.white, fontFamily: theme.font }}>{etf.name}</div>

              <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: "auto" }}>
                {etf.return_1m && <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontSize: 24, color: theme.gray, fontFamily: theme.font }}>1개월</span>
                  <span style={{ fontSize: 26, fontWeight: 700, color: (etf.return_1m ?? "").startsWith("-") ? theme.red : theme.green, fontFamily: theme.font }}>{etf.return_1m}</span>
                </div>}
                {etf.return_3m && <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontSize: 24, color: theme.gray, fontFamily: theme.font }}>3개월</span>
                  <span style={{ fontSize: 26, fontWeight: 700, color: (etf.return_3m ?? "").startsWith("-") ? theme.red : theme.green, fontFamily: theme.font }}>{etf.return_3m}</span>
                </div>}
                {etf.return_ytd && <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontSize: 24, color: theme.gray, fontFamily: theme.font }}>YTD</span>
                  <span style={{ fontSize: 26, fontWeight: 700, color: (etf.return_ytd ?? "").startsWith("-") ? theme.red : theme.green, fontFamily: theme.font }}>{etf.return_ytd}</span>
                </div>}
                {etf.expense && <div style={{ display: "flex", justifyContent: "space-between", borderTop: "1px solid rgba(255,255,255,0.20)", paddingTop: 8, marginTop: 4 }}>
                  <span style={{ fontSize: 24, color: theme.gray, fontFamily: theme.font }}>보수</span>
                  <span style={{ fontSize: 24, color: theme.grayLight, fontFamily: theme.font }}>{etf.expense}</span>
                </div>}
                {etf.aum && <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontSize: 24, color: theme.gray, fontFamily: theme.font }}>순자산</span>
                  <span style={{ fontSize: 24, color: theme.grayLight, fontFamily: theme.font }}>{etf.aum}</span>
                </div>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
