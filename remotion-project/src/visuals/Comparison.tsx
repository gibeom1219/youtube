import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { theme } from "../styles/theme";
import { useSceneTheme } from "../contexts/SceneTheme";

interface Props {
  data: {
    left_label: string;
    left_color: string;
    left_items: string[];
    right_label: string;
    right_color: string;
    right_items: string[];
  };
  durationFrames: number;
}

export const Comparison: React.FC<Props> = ({ data, durationFrames }) => {
  const theme = useSceneTheme();
  const frame = useCurrentFrame();
  if (!data) return null;
  // 색상 기본값
  if (!data.left_color) (data as any).left_color = "#81D8D0";
  if (!data.right_color) (data as any).right_color = "#FFB347";
  const { fps } = useVideoConfig();

  const leftProgress = spring({ frame, fps, config: { damping: 100, stiffness: 50 } });
  const rightProgress = spring({ frame: frame - 8, fps, config: { damping: 100, stiffness: 50 } });
  const vsProgress = spring({ frame: frame - 4, fps, config: { damping: 120, stiffness: 25 } });

  const itemInterval = Math.min((durationFrames * 0.5) / Math.max((data.left_items ?? []).length, (data.right_items ?? []).length), 18);

  // VS 글로우 펄싱
  const vsPulse = (Math.sin(frame * 0.06) + 1) / 2;

  const renderCard = (
    label: string,
    color: string,
    items: string[],
    progress: any,
    fromLeft: boolean,
    side: number
  ) => {
    const cardGlow = (Math.sin(frame * 0.04 + side * Math.PI) + 1) / 2;
    const borderAlpha = Math.round((0.35 + cardGlow * 0.35) * 255).toString(16).padStart(2, "0");

    return (
      <div style={{
        flex: 1,
        background: `linear-gradient(160deg, ${color}55 0%, ${color}30 100%)`,
        border: `1px solid ${color}${borderAlpha}`,
        borderTop: `3px solid ${color}`,
        borderRadius: 20,
        padding: "50px 52px",
        opacity: Math.min(1, progress),
        transform: `translateX(${interpolate(Math.min(1, progress), [0, 1], [fromLeft ? -80 : 80, 0])}px)`,
        position: "relative" as const,
        overflow: "hidden",
        boxShadow: `0 0 ${14 + cardGlow * 14}px ${color}${Math.round((0.04 + cardGlow * 0.07) * 255).toString(16).padStart(2, "0")}`,
      }}>
        {/* 코너 글로우 */}
        <div style={{
          position: "absolute",
          top: -40, [fromLeft ? "left" : "right"]: -40,
          width: 200, height: 200, borderRadius: "50%",
          background: `radial-gradient(ellipse, ${color}${Math.round((0.12 + cardGlow * 0.08) * 255).toString(16).padStart(2, "0")}, transparent 70%)`,
          filter: "blur(20px)",
        }} />

        <div style={{
          fontSize: 46, fontWeight: 900, color,
          fontFamily: theme.font, marginBottom: 8, textAlign: "center" as const,
          textShadow: theme.textShadow.medium,
        }}>
          {label}
        </div>
        <div style={{ height: 1, background: `${color}40`, marginBottom: 28 }} />

        {items.map((item, i) => {
          const startFrame = Math.round(itemInterval * i + (fromLeft ? 8 : 14));
          const itemProgress = spring({ frame: frame - startFrame, fps, config: { damping: 100, stiffness: 25 } });
          return (
            <div key={i} style={{
              display: "flex", alignItems: "flex-start", gap: 14,
              fontSize: 38, color: theme.white,
              fontFamily: theme.font, fontWeight: 600,
              marginBottom: 20, lineHeight: 1.4,
              textShadow: theme.textShadow.medium,
              opacity: Math.min(1, itemProgress),
              transform: `translateX(${interpolate(Math.min(1, itemProgress), [0, 1], [fromLeft ? -20 : 20, 0])}px)`,
            }}>
              <span style={{ color, fontSize: 34, paddingTop: 5, flexShrink: 0 }}>▶</span>
              <span>{item}</span>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div style={{
      width: "100%", height: "100%",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: "40px 60px", gap: 16,
    }}>
      {renderCard(data.left_label, data.left_color, data.left_items, leftProgress, true, 0)}

      {/* VS */}
      <div style={{
        display: "flex", flexDirection: "column", alignItems: "center",
        gap: 8, flexShrink: 0,
        opacity: Math.min(1, vsProgress),
        transform: `scale(${interpolate(Math.min(1, vsProgress), [0, 1], [0.4, 1])})`,
      }}>
        <div style={{ width: 2, height: 40, background: "rgba(129,216,208,0.25)" }} />
        <div style={{
          fontSize: 56, fontWeight: 900, color: theme.grayLight,
          fontFamily: theme.font,
          textShadow: `${theme.textShadow.medium}, 0 0 ${20 + vsPulse * 16}px rgba(255,255,255,${0.08 + vsPulse * 0.12})`,
        }}>
          VS
        </div>
        <div style={{ width: 2, height: 40, background: "rgba(129,216,208,0.25)" }} />
      </div>

      {renderCard(data.right_label, data.right_color, data.right_items, rightProgress, false, 1)}
    </div>
  );
};
