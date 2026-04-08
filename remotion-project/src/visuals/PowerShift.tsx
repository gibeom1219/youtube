import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { theme } from "../styles/theme";
import { useSceneTheme } from "../contexts/SceneTheme";

interface Props {
  data: { title: string; entity_a: string; entity_b: string; icon_a?: string; icon_b?: string; crossing_year: string; duration?: string; before_desc: string; after_desc: string; insight?: string };
}

export const PowerShift: React.FC<Props> = ({ data }) => {
  const theme = useSceneTheme();
  const frame = useCurrentFrame();
  if (!data) return null;
  const titleOpacity = interpolate(frame, [0, 14], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const crossOpacity = interpolate(frame, [20, 32], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const afterOpacity = interpolate(frame, [30, 42], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const pulse = (Math.sin(frame * 0.06) + 1) / 2;

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "50px 80px", gap: 24 }}>
      <div style={{ fontSize: 44, fontWeight: 700, color: theme.gold, fontFamily: theme.font, textAlign: "center", opacity: titleOpacity }}>
        {data.title}
      </div>

      {/* Before crossing */}
      <div style={{ display: "flex", alignItems: "center", gap: 40, opacity: titleOpacity }}>
        <div style={{ textAlign: "center" }}>
          {data.icon_a && <div style={{ fontSize: 48, fontFamily: theme.font }}>{data.icon_a}</div>}
          <div style={{ fontSize: 36, fontWeight: 900, color: theme.green, fontFamily: theme.font }}>{data.entity_a}</div>
          <div style={{ fontSize: 24, color: theme.grayLight, fontFamily: theme.font, marginTop: 6 }}>우위</div>
        </div>
        <div style={{ fontSize: 32, color: theme.gray, fontFamily: theme.font }}>{">"}</div>
        <div style={{ textAlign: "center" }}>
          {data.icon_b && <div style={{ fontSize: 48, fontFamily: theme.font }}>{data.icon_b}</div>}
          <div style={{ fontSize: 36, fontWeight: 900, color: theme.grayLight, fontFamily: theme.font }}>{data.entity_b}</div>
        </div>
        <div style={{ fontSize: 26, color: theme.gray, fontFamily: theme.font, maxWidth: 400 }}>{data.before_desc}</div>
      </div>

      {/* Crossing point */}
      <div style={{
        padding: "16px 40px", borderRadius: 12,
        background: `${theme.red}15`, border: `2px solid ${theme.red}50`,
        boxShadow: `0 0 ${10 + pulse * 15}px ${theme.red}25`,
        opacity: crossOpacity, textAlign: "center",
      }}>
        <div style={{ fontSize: 22, color: theme.red, fontFamily: theme.font, fontWeight: 600 }}>역전 시점</div>
        <div style={{ fontSize: 48, fontWeight: 900, color: theme.white, fontFamily: theme.font }}>{data.crossing_year}</div>
        {data.duration && <div style={{ fontSize: 24, color: theme.grayLight, fontFamily: theme.font }}>{data.duration}</div>}
      </div>

      {/* After crossing */}
      <div style={{ display: "flex", alignItems: "center", gap: 40, opacity: afterOpacity }}>
        <div style={{ textAlign: "center" }}>
          {data.icon_b && <div style={{ fontSize: 48, fontFamily: theme.font }}>{data.icon_b}</div>}
          <div style={{ fontSize: 36, fontWeight: 900, color: theme.green, fontFamily: theme.font }}>{data.entity_b}</div>
          <div style={{ fontSize: 24, color: theme.grayLight, fontFamily: theme.font, marginTop: 6 }}>역전</div>
        </div>
        <div style={{ fontSize: 32, color: theme.gray, fontFamily: theme.font }}>{">"}</div>
        <div style={{ textAlign: "center" }}>
          {data.icon_a && <div style={{ fontSize: 48, fontFamily: theme.font }}>{data.icon_a}</div>}
          <div style={{ fontSize: 36, fontWeight: 900, color: theme.grayLight, fontFamily: theme.font }}>{data.entity_a}</div>
        </div>
        <div style={{ fontSize: 26, color: theme.gray, fontFamily: theme.font, maxWidth: 400 }}>{data.after_desc}</div>
      </div>

      {data.insight && (
        <div style={{ fontSize: 28, color: theme.tiffany, fontFamily: theme.font, textAlign: "center", fontWeight: 600, opacity: interpolate(frame, [38, 50], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) }}>
          {data.insight}
        </div>
      )}
    </div>
  );
};
