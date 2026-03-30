import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { theme } from "../styles/theme";

interface Step { title: string; explanation: string; icon?: string }
interface Props {
  data: { title: string; subtitle?: string; steps: Step[] };
}

export const Mechanism: React.FC<Props> = ({ data: props }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { title, subtitle, steps } = props;
  const titleOpacity = interpolate(frame, [0, 12], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const titleP = spring({ frame, fps, config: { damping: 100, stiffness: 25 } });

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: "60px 100px", gap: 14 }}>
      <div style={{ textAlign: "center", opacity: titleOpacity, transform: `translateY(${interpolate(titleP, [0, 1], [-16, 0])}px)` }}>
        <div style={{ fontSize: 42, fontWeight: 700, color: theme.gold, fontFamily: theme.font }}>{title}</div>
        {subtitle && <div style={{ fontSize: 24, color: theme.gray, fontFamily: theme.font, marginTop: 6 }}>{subtitle}</div>}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {steps.map((step, i) => {
          const stepP = spring({ frame: frame - 10 - i * 12, fps, config: { damping: 100, stiffness: 10 } });
          const stepOpacity = interpolate(frame, [10 + i * 12, 22 + i * 12], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
          const arrowOpacity = interpolate(frame, [18 + i * 12, 26 + i * 12], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
          const isLast = i === steps.length - 1;

          return (
            <React.Fragment key={i}>
              <div style={{
                display: "flex", alignItems: "center", gap: 20,
                padding: "20px 28px", borderRadius: 14,
                background: isLast ? `${theme.tiffany}10` : "rgba(129,216,208,0.04)",
                border: isLast ? `2px solid ${theme.tiffany}35` : "1px solid rgba(129,216,208,0.08)",
                opacity: stepOpacity, transform: `translateX(${interpolate(stepP, [0, 1], [30, 0])}px)`,
              }}>
                <div style={{
                  width: 50, height: 50, borderRadius: "50%", flexShrink: 0,
                  background: isLast ? `${theme.tiffany}25` : "rgba(129,216,208,0.08)",
                  border: `1px solid ${isLast ? theme.tiffany : "rgba(129,216,208,0.15)"}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 24, fontWeight: 900, color: isLast ? theme.tiffany : theme.grayLight, fontFamily: theme.font,
                }}>
                  {step.icon ?? (i + 1)}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 28, fontWeight: 700, color: theme.white, fontFamily: theme.font }}>{step.title}</div>
                  <div style={{ fontSize: 24, color: theme.grayLight, fontFamily: theme.font, marginTop: 4, lineHeight: 1.4 }}>{step.explanation}</div>
                </div>
              </div>
              {!isLast && (
                <div style={{ textAlign: "center", fontSize: 26, color: `${theme.tiffany}40`, fontFamily: theme.font, opacity: arrowOpacity }}>---</div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
