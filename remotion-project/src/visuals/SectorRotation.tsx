import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { theme } from "../styles/theme";

const PHASE_COLORS = ["#52D68A", "#81D8D0", "#FFB347", "#FF6B6B"];

interface Phase { name: string; sectors: string[]; description?: string }
interface Props {
  data: { title: string; current_phase: number; phases: Phase[] };
}

export const SectorRotation: React.FC<Props> = ({ data: props }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const titleOpacity = interpolate(frame, [0, 12], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const titleP = spring({ frame, fps, config: { damping: 100, stiffness: 25 } });
  const pulse = (Math.sin(frame * 0.06) + 1) / 2;

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", padding: "60px 100px" }}>
      <div style={{ fontSize: 40, fontWeight: 700, color: theme.gold, fontFamily: theme.font, textAlign: "center", marginBottom: 36, opacity: titleOpacity, transform: `translateY(${interpolate(titleP, [0, 1], [-16, 0])}px)` }}>
        {props.title}
      </div>

      <div style={{ flex: 1, display: "flex", gap: 12 }}>
        {props.phases.map((phase, i) => {
          const phaseP = spring({ frame: frame - 8 - i * 8, fps, config: { damping: 100, stiffness: 10 } });
          const phaseOpacity = interpolate(frame, [8 + i * 8, 20 + i * 8], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
          const isCurrent = i === props.current_phase;
          const color = PHASE_COLORS[i % PHASE_COLORS.length];

          return (
            <div key={i} style={{
              flex: 1, padding: "24px 20px", borderRadius: 16,
              background: isCurrent ? `${color}15` : "rgba(129,216,208,0.03)",
              border: isCurrent ? `2px solid ${color}50` : "1px solid rgba(129,216,208,0.08)",
              boxShadow: isCurrent ? `0 0 ${12 + pulse * 12}px ${color}20` : "none",
              opacity: phaseOpacity, transform: `translateY(${interpolate(phaseP, [0, 1], [20, 0])}px)`,
              display: "flex", flexDirection: "column", gap: 14,
            }}>
              {/* Phase header */}
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 32, height: 32, borderRadius: "50%", background: `${color}30`, border: `2px solid ${color}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, fontWeight: 900, color, fontFamily: theme.font }}>
                  {i + 1}
                </div>
                <div style={{ fontSize: 28, fontWeight: 800, color: isCurrent ? color : theme.grayLight, fontFamily: theme.font }}>{phase.name}</div>
              </div>

              {isCurrent && <div style={{ fontSize: 20, fontWeight: 800, color, fontFamily: theme.font, padding: "4px 10px", background: `${color}15`, borderRadius: 4, alignSelf: "flex-start" }}>현재 국면</div>}

              {phase.description && <div style={{ fontSize: 24, color: theme.grayLight, fontFamily: theme.font, lineHeight: 1.4 }}>{phase.description}</div>}

              <div style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: "auto" }}>
                {phase.sectors.map((s, si) => (
                  <div key={si} style={{ fontSize: 24, color: isCurrent ? theme.white : theme.gray, fontFamily: theme.font, paddingLeft: 12, borderLeft: `2px solid ${isCurrent ? color : "rgba(255,255,255,0.1)"}` }}>
                    {s}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Arrow indicator */}
      <div style={{ display: "flex", justifyContent: "center", marginTop: 16 }}>
        {props.phases.map((_, i) => (
          <React.Fragment key={i}>
            <div style={{ width: 12, height: 12, borderRadius: "50%", background: i === props.current_phase ? PHASE_COLORS[i % PHASE_COLORS.length] : "rgba(255,255,255,0.15)" }} />
            {i < props.phases.length - 1 && <div style={{ width: 40, height: 2, background: "rgba(255,255,255,0.1)", alignSelf: "center" }} />}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
