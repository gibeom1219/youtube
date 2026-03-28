import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { theme } from "../styles/theme";

interface Side { claim: string; evidence: string[]; label?: string }
interface Props {
  data: { topic: string; side_a: Side; side_b: Side; verdict?: string };
}

export const ArgumentCard: React.FC<Props> = ({ data }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const titleOpacity = interpolate(frame, [0, 12], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const titleP = spring({ frame, fps, config: { damping: 100, stiffness: 25 } });
  const aP = spring({ frame: frame - 10, fps, config: { damping: 100, stiffness: 10 } });
  const aOpacity = interpolate(frame, [10, 22], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const bP = spring({ frame: frame - 20, fps, config: { damping: 100, stiffness: 10 } });
  const bOpacity = interpolate(frame, [20, 32], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const verdictOpacity = interpolate(frame, [34, 46], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const renderSide = (side: Side, color: string, opacity: number, progress: number, dir: number) => (
    <div style={{
      flex: 1, padding: "24px 28px", borderRadius: 16,
      background: `${color}08`, border: `1px solid ${color}25`,
      opacity, transform: `translateX(${interpolate(progress, [0, 1], [dir * 30, 0])}px)`,
      display: "flex", flexDirection: "column", gap: 14,
    }}>
      <div style={{ fontSize: 18, fontWeight: 800, color, fontFamily: theme.font, padding: "4px 14px", background: `${color}15`, borderRadius: 6, alignSelf: "flex-start" }}>
        {side.label ?? (dir < 0 ? "주장 A" : "주장 B")}
      </div>
      <div style={{ fontSize: 24, fontWeight: 700, color: theme.white, fontFamily: theme.font, lineHeight: 1.4 }}>
        "{side.claim}"
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 4 }}>
        {side.evidence.map((e, i) => (
          <div key={i} style={{ fontSize: 18, color: theme.grayLight, fontFamily: theme.font, paddingLeft: 14, borderLeft: `2px solid ${color}40`, lineHeight: 1.4 }}>
            {e}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", padding: "60px 100px" }}>
      <div style={{ fontSize: 38, fontWeight: 700, color: theme.gold, fontFamily: theme.font, textAlign: "center", marginBottom: 30, opacity: titleOpacity, transform: `translateY(${interpolate(titleP, [0, 1], [-16, 0])}px)` }}>
        {data.topic}
      </div>

      <div style={{ flex: 1, display: "flex", gap: 24 }}>
        {renderSide(data.side_a, "#81D8D0", aOpacity, aP, -1)}
        {renderSide(data.side_b, "#FFB347", bOpacity, bP, 1)}
      </div>

      {data.verdict && (
        <div style={{ fontSize: 22, color: theme.tiffany, fontFamily: theme.font, textAlign: "center", marginTop: 20, fontWeight: 600, opacity: verdictOpacity, padding: "12px 24px", background: `${theme.tiffany}08`, borderRadius: 10 }}>
          💡 {data.verdict}
        </div>
      )}
    </div>
  );
};
