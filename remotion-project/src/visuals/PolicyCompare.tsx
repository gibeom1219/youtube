import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { theme } from "../styles/theme";
import { useSceneTheme } from "../contexts/SceneTheme";

interface Policy { period: string; leader?: string; approach: string; items: string[]; color?: string }
interface Props {
  data: { title: string; policies: Policy[]; conclusion?: string };
}

const COLORS = ["#81D8D0", "#FFB347", "#C084FC", "#52D68A", "#FF6B6B"];

export const PolicyCompare: React.FC<Props> = ({ data }) => {
  const theme = useSceneTheme();
  const frame = useCurrentFrame();
  if (!data) return null;
  const titleOpacity = interpolate(frame, [0, 14], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: "50px 70px", gap: 20 }}>
      <div style={{ fontSize: 44, fontWeight: 700, color: theme.gold, fontFamily: theme.font, textAlign: "center", opacity: titleOpacity }}>
        {data.title}
      </div>

      <div style={{ display: "flex", gap: 20 }}>
        {(data.policies ?? []).map((policy, i) => {
          const delay = 8 + i * 10;
          const opacity = interpolate(frame, [delay, delay + 12], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
          const color = policy.color ?? COLORS[i % COLORS.length];

          return (
            <div key={i} style={{
              flex: 1, padding: "28px 24px", borderRadius: 16,
              background: `${color}22`, borderTop: `3px solid ${color}`,
              border: `1px solid ${color}20`, opacity,
              display: "flex", flexDirection: "column", gap: 14,
            }}>
              <div style={{ fontSize: 26, fontWeight: 800, color, fontFamily: theme.font }}>{policy.period}</div>
              {policy.leader && <div style={{ fontSize: 24, color: theme.grayLight, fontFamily: theme.font }}>{policy.leader}</div>}
              <div style={{ fontSize: 28, fontWeight: 700, color: theme.white, fontFamily: theme.font }}>{policy.approach}</div>
              <div style={{ height: 1, background: `${color}30` }} />
              {policy.items.map((item, j) => (
                <div key={j} style={{ fontSize: 24, color: theme.grayLight, fontFamily: theme.font, paddingLeft: 14, borderLeft: `3px solid ${color}40`, lineHeight: 1.4 }}>
                  {item}
                </div>
              ))}
            </div>
          );
        })}
      </div>

      {data.conclusion && (
        <div style={{ fontSize: 28, color: theme.tiffany, fontFamily: theme.font, textAlign: "center", fontWeight: 600, opacity: interpolate(frame, [40, 52], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) }}>
          {data.conclusion}
        </div>
      )}
    </div>
  );
};
