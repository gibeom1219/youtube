import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { theme } from "../styles/theme";

const LAYER_COLORS = ["#81D8D0", "#52D68A", "#A8E8E2", "#FFB347", "#C084FC"];

interface Props {
  data: { title: string; layers: Array<{ name: string; items: string[]; icon?: string }> };
}

export const TechStack: React.FC<Props> = ({ data: props }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { title, layers } = props;
  const titleOpacity = interpolate(frame, [0, 12], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const titleP = spring({ frame, fps, config: { damping: 100, stiffness: 25 } });

  // Render bottom to top
  const reversed = [...layers].reverse();

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", padding: "60px 120px" }}>
      <div style={{ fontSize: 40, fontWeight: 700, color: theme.gold, fontFamily: theme.font, textAlign: "center", marginBottom: 36, opacity: titleOpacity, transform: `translateY(${interpolate(titleP, [0, 1], [-16, 0])}px)` }}>
        {title}
      </div>

      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", gap: 8 }}>
        {reversed.map((layer, ri) => {
          const i = layers.length - 1 - ri; // original index (bottom=0)
          const layerP = spring({ frame: frame - 10 - ri * 10, fps, config: { damping: 100, stiffness: 10 } });
          const layerOpacity = interpolate(frame, [10 + ri * 10, 22 + ri * 10], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
          const color = LAYER_COLORS[i % LAYER_COLORS.length];
          const width = 60 + (layers.length - i) * (30 / layers.length);

          return (
            <div key={ri} style={{
              width: `${width}%`, alignSelf: "center",
              padding: "20px 32px", borderRadius: 14,
              background: `${color}10`, border: `1px solid ${color}25`,
              display: "flex", alignItems: "center", gap: 20,
              opacity: layerOpacity, transform: `translateY(${interpolate(layerP, [0, 1], [20, 0])}px)`,
            }}>
              {layer.icon && <span style={{ fontSize: 32, fontFamily: theme.font, flexShrink: 0 }}>{layer.icon}</span>}
              <div style={{ fontSize: 28, fontWeight: 800, color, fontFamily: theme.font, width: 140, flexShrink: 0 }}>
                {layer.name}
              </div>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap", flex: 1 }}>
                {layer.items.map((item, ii) => (
                  <span key={ii} style={{ fontSize: 24, color: theme.white, fontFamily: theme.font, padding: "4px 12px", background: `${color}12`, borderRadius: 6, border: `1px solid ${color}20` }}>
                    {item}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
