import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { theme } from "../styles/theme";

interface Props {
  data: { title: string; trigger?: string; chain?: Array<{ event: string; impact: string; icon?: string }>; dominoes?: Array<{ label: string; icon?: string }> };
}

export const DominoEffect: React.FC<Props> = ({ data: props }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { title } = props;
  // dominoes 형식도 허용: { label, icon } → { event: label, impact: "", icon }
  const chain = props.chain ?? (props.dominoes ?? []).map(d => ({ event: d.label, impact: "", icon: d.icon }));
  const trigger = props.trigger ?? (chain.length > 0 ? chain[0].event : "");
  const titleOpacity = interpolate(frame, [0, 12], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const titleP = spring({ frame, fps, config: { damping: 100, stiffness: 25 } });
  const triggerP = spring({ frame: frame - 10, fps, config: { damping: 100, stiffness: 10 } });
  const triggerOpacity = interpolate(frame, [10, 22], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: "60px 80px" }}>
      <div style={{ fontSize: 38, fontWeight: 700, color: theme.gold, fontFamily: theme.font, textAlign: "center", marginBottom: 30, opacity: titleOpacity, transform: `translateY(${interpolate(titleP, [0, 1], [-16, 0])}px)` }}>
        {title}
      </div>

      {/* Trigger */}
      <div style={{
        alignSelf: "center", padding: "16px 36px", borderRadius: 12,
        background: `${theme.red}18`, border: `2px solid ${theme.red}50`,
        fontSize: 26, fontWeight: 800, color: theme.red, fontFamily: theme.font,
        opacity: triggerOpacity, transform: `scale(${interpolate(triggerP, [0, 1], [0.8, 1])})`,
        marginBottom: 24,
      }}>
        💥 {trigger}
      </div>

      {/* Chain */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8, }}>
        {chain.map((item, i) => {
          const delay = 18 + i * 12;
          const itemP = spring({ frame: frame - delay, fps, config: { damping: 100, stiffness: 10 } });
          const itemOpacity = interpolate(frame, [delay, delay + 12], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
          const arrowOpacity = interpolate(frame, [delay - 4, delay + 4], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
          // Color gradient from orange to red
          const t = i / Math.max(chain.length - 1, 1);
          const severity = `rgba(${Math.round(255 - t * 50)}, ${Math.round(179 - t * 110)}, ${Math.round(71 + t * 30)}, 1)`;

          return (
            <React.Fragment key={i}>
              <div style={{ textAlign: "center", fontSize: 24, color: `${theme.tiffany}50`, opacity: arrowOpacity }}>▼</div>
              <div style={{
                display: "flex", alignItems: "center", gap: 20,
                padding: "16px 28px", borderRadius: 12,
                background: `rgba(255,${Math.round(179 - t * 110)},${Math.round(71 + t * 30)}, 0.08)`,
                borderLeft: `4px solid ${severity}`,
                opacity: itemOpacity, transform: `translateX(${interpolate(itemP, [0, 1], [i % 2 === 0 ? -30 : 30, 0])}px)`,
              }}>
                {item.icon && <span style={{ fontSize: 32, fontFamily: theme.font, flexShrink: 0 }}>{item.icon}</span>}
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 28, fontWeight: 700, color: theme.white, fontFamily: theme.font }}>{item.event}</div>
                  <div style={{ fontSize: 24, color: theme.grayLight, fontFamily: theme.font, marginTop: 4 }}>{item.impact}</div>
                </div>
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
