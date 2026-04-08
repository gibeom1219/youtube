import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { theme } from "../styles/theme";
import { useSceneTheme } from "../contexts/SceneTheme";

interface Props {
  data: { title: string; do_items?: string[]; dont_items?: string[]; do_list?: string[]; dont_list?: string[]; do_label?: string; dont_label?: string; conclusion?: string; summary?: string };
}

export const StrategyCard: React.FC<Props> = ({ data }) => {
  const theme = useSceneTheme();
  const frame = useCurrentFrame();
  if (!data) return null;
  const { fps } = useVideoConfig();
  const doItems = data.do_items ?? data.do_list ?? [];
  const dontItems = data.dont_items ?? data.dont_list ?? [];
  const doLabel = data.do_label ?? "이렇게 하세요";
  const dontLabel = data.dont_label ?? "이건 피하세요";
  const conclusion = data.conclusion ?? data.summary;

  const titleOpacity = interpolate(frame, [0, 12], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const titleP = spring({ frame, fps, config: { damping: 100, stiffness: 25 } });
  const leftP = spring({ frame: frame - 10, fps, config: { damping: 100, stiffness: 10 } });
  const leftOpacity = interpolate(frame, [10, 22], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const rightP = spring({ frame: frame - 18, fps, config: { damping: 100, stiffness: 10 } });
  const rightOpacity = interpolate(frame, [18, 30], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const concOpacity = interpolate(frame, [34, 46], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: "60px 100px" }}>
      <div style={{ fontSize: 46, fontWeight: 700, color: theme.gold, fontFamily: theme.font, textAlign: "center", marginBottom: 36, textShadow: theme.textShadow.medium, opacity: titleOpacity, transform: `translateY(${interpolate(titleP, [0, 1], [-16, 0])}px)` }}>
        {data.title}
      </div>

      <div style={{ display: "flex", gap: 24 }}>
        {/* DO */}
        <div style={{
          flex: 1, padding: "32px 40px", borderRadius: 16,
          background: `${theme.green}22`, border: `1px solid ${theme.green}25`,
          opacity: leftOpacity, transform: `translateX(${interpolate(leftP, [0, 1], [-30, 0])}px)`,
          display: "flex", flexDirection: "column", gap: 20,
        }}>
          <div style={{ fontSize: 32, fontWeight: 800, color: theme.green, fontFamily: theme.font, display: "flex", alignItems: "center", gap: 10, textShadow: theme.textShadow.medium }}>
            <span style={{ fontSize: 36, fontFamily: theme.font }}>✅</span> {doLabel}
          </div>
          {doItems.map((item, i) => {
            const itemOpacity = interpolate(frame, [16 + i * 6, 24 + i * 6], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
            return (
              <div key={i} style={{ fontSize: 34, color: theme.white, fontFamily: theme.font, paddingLeft: 20, borderLeft: `4px solid ${theme.green}40`, opacity: itemOpacity, lineHeight: 1.4, textShadow: theme.textShadow.medium }}>
                {item}
              </div>
            );
          })}
        </div>

        {/* DON'T */}
        <div style={{
          flex: 1, padding: "32px 40px", borderRadius: 16,
          background: `${theme.red}22`, border: `1px solid ${theme.red}25`,
          opacity: rightOpacity, transform: `translateX(${interpolate(rightP, [0, 1], [30, 0])}px)`,
          display: "flex", flexDirection: "column", gap: 20,
        }}>
          <div style={{ fontSize: 32, fontWeight: 800, color: theme.red, fontFamily: theme.font, display: "flex", alignItems: "center", gap: 10, textShadow: theme.textShadow.medium }}>
            <span style={{ fontSize: 36, fontFamily: theme.font }}>❌</span> {dontLabel}
          </div>
          {dontItems.map((item, i) => {
            const itemOpacity = interpolate(frame, [24 + i * 6, 32 + i * 6], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
            return (
              <div key={i} style={{ fontSize: 34, color: theme.white, fontFamily: theme.font, paddingLeft: 20, borderLeft: `4px solid ${theme.red}40`, opacity: itemOpacity, lineHeight: 1.4, textShadow: theme.textShadow.medium }}>
                {item}
              </div>
            );
          })}
        </div>
      </div>

      {conclusion && (
        <div style={{ fontSize: 30, color: theme.tiffany, fontFamily: theme.font, textAlign: "center", marginTop: 20, fontWeight: 600, opacity: concOpacity, textShadow: theme.textShadow.medium }}>
          💡 {conclusion}
        </div>
      )}
    </div>
  );
};
