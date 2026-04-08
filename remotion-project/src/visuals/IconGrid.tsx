import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { theme } from "../styles/theme";
import { useSceneTheme } from "../contexts/SceneTheme";

interface GridItem {
  icon: string;
  label: string;
  desc?: string;
}

interface Props {
  data: {
    title: string;
    items: GridItem[];
  };
  durationFrames: number;
}

export const IconGrid: React.FC<Props> = ({ data, durationFrames }) => {
  const theme = useSceneTheme();
  const frame = useCurrentFrame();
  if (!data) return null;
  const { fps } = useVideoConfig();

  const titleProgress = spring({ frame, fps, config: { damping: 100, stiffness: 10 } });
  const interval = Math.min((durationFrames * 0.6) / ((data.items ?? []).length + 1), 18);
  const cols = (data.items ?? []).length <= 4 ? 2 : 3;

  const glowPulse = (Math.sin(frame * 0.04) + 1) / 2;

  return (
    <div style={{
      width: "100%", height: "100%",
      display: "flex", flexDirection: "column",
      justifyContent: "center", padding: "60px 120px", gap: 36,
    }}>
      <div style={{
        fontSize: 44, fontWeight: 900, color: theme.white,
        fontFamily: theme.font, textAlign: "center" as const,
        textShadow: theme.textShadow.medium,
        opacity: Math.min(1, titleProgress),
        transform: `translateY(${interpolate(Math.min(1, titleProgress), [0, 1], [-20, 0])}px)`,
      }}>
        {data.title}
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gap: 20,
      }}>
        {(data.items ?? []).map((item, i) => {
          const startFrame = Math.round(interval * (i + 1));
          const p = spring({ frame: frame - startFrame, fps, config: { damping: 100, stiffness: 10 } });
          const settled = Math.max(0, frame - (startFrame + 20));
          const pulse = (Math.sin(settled * 0.05 + i * 1.1) + 1) / 2;
          const borderAlpha = 0.2 + pulse * 0.25;

          return (
            <div key={i} style={{
              display: "flex", flexDirection: "column",
              alignItems: "center", gap: 14,
              padding: "28px 24px",
              background: `rgba(129,216,208,0.30)`,
              border: `1px solid rgba(129,216,208,${borderAlpha})`,
              borderRadius: 16,
              opacity: Math.min(1, p),
              transform: `scale(${interpolate(Math.min(1, p), [0, 1], [0.75, 1])})`,
              boxShadow: `0 0 ${10 + pulse * 10}px rgba(129,216,208,0.30)`,
            }}>
              <div style={{ fontSize: 52, fontFamily: theme.font }}>{item.icon}</div>
              <div style={{
                fontSize: 26, fontWeight: 800, color: theme.white,
                fontFamily: theme.font, textAlign: "center" as const,
                textShadow: theme.textShadow.medium,
              }}>
                {item.label ?? (item.text ? (item.text as string).split("\n")[0] : "")}
              </div>
              {(item.desc || (item.text && (item.text as string).includes("\n"))) && (
                <div style={{
                  fontSize: 26, color: theme.grayLight,
                  fontFamily: theme.font, fontWeight: 500,
                  textAlign: "center" as const, lineHeight: 1.4,
                  textShadow: theme.textShadow.light,
                }}>
                  {item.desc ?? (item.text ? (item.text as string).split("\n").slice(1).join("\n") : "")}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
