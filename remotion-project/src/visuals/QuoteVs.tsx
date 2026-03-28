import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { theme } from "../styles/theme";

interface Side { speaker: string; role: string; quote: string; stance: string }
interface Props {
  data: { topic: string; left: Side; right: Side };
}

export const QuoteVs: React.FC<Props> = ({ data: props }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const { topic, left, right } = props;

  const titleOpacity = interpolate(frame, [0, 12], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const titleP = spring({ frame, fps, config: { damping: 100, stiffness: 25 } });
  const vsP = spring({ frame: frame - 10, fps, config: { damping: 100, stiffness: 10 } });
  const vsOpacity = interpolate(frame, [10, 20], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const leftP = spring({ frame: frame - 14, fps, config: { damping: 100, stiffness: 10 } });
  const leftOpacity = interpolate(frame, [14, 26], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const rightP = spring({ frame: frame - 22, fps, config: { damping: 100, stiffness: 10 } });
  const rightOpacity = interpolate(frame, [22, 34], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const renderSide = (side: Side, color: string, opacity: number, progress: number, dir: number) => (
    <div style={{
      flex: 1, padding: "36px 40px", borderRadius: 16,
      background: `${color}10`, border: `1px solid ${color}30`,
      display: "flex", flexDirection: "column", gap: 20,
      opacity, transform: `translateX(${interpolate(progress, [0, 1], [dir * 40, 0])}px)`,
    }}>
      <div style={{
        fontSize: 20, fontWeight: 800, color, fontFamily: theme.font,
        padding: "6px 16px", background: `${color}18`, borderRadius: 6, alignSelf: "flex-start",
      }}>
        {side.stance}
      </div>
      <div style={{ fontSize: 28, color: theme.white, fontFamily: theme.font, lineHeight: 1.5, fontWeight: 500 }}>
        "{side.quote}"
      </div>
      <div style={{ marginTop: "auto" }}>
        <div style={{ fontSize: 22, fontWeight: 700, color: theme.white, fontFamily: theme.font }}>{side.speaker}</div>
        <div style={{ fontSize: 18, color: theme.grayLight, fontFamily: theme.font }}>{side.role}</div>
      </div>
    </div>
  );

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", padding: "60px 100px", alignItems: "center" }}>
      <div style={{
        fontSize: 38, fontWeight: 700, color: theme.gold, fontFamily: theme.font,
        textAlign: "center", marginBottom: 50, opacity: titleOpacity,
        transform: `translateY(${interpolate(titleP, [0, 1], [-16, 0])}px)`,
      }}>
        {topic}
      </div>

      <div style={{ display: "flex", gap: 32, alignItems: "stretch", width: "100%", flex: 1 }}>
        {renderSide(left, theme.green, leftOpacity, leftP, -1)}

        <div style={{
          display: "flex", alignItems: "center", justifyContent: "center",
          opacity: vsOpacity, transform: `scale(${interpolate(vsP, [0, 1], [0.5, 1])})`,
        }}>
          <div style={{
            width: 80, height: 80, borderRadius: "50%",
            background: `linear-gradient(135deg, ${theme.tiffany}40, ${theme.tiffany}15)`,
            border: `2px solid ${theme.tiffany}60`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 28, fontWeight: 900, color: theme.tiffany, fontFamily: theme.font,
          }}>
            VS
          </div>
        </div>

        {renderSide(right, theme.red, rightOpacity, rightP, 1)}
      </div>
    </div>
  );
};
