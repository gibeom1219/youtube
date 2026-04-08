import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { theme } from "../styles/theme";
import { useSceneTheme } from "../contexts/SceneTheme";

interface Props {
  data: {
    title: string;
    before_label: string;
    before_items: string[];
    after_label: string;
    after_items: string[];
    before_color?: string;
    after_color?: string;
  };
  durationFrames: number;
}

export const SplitScreen: React.FC<Props> = ({ data, durationFrames }) => {
  const theme = useSceneTheme();
  const frame = useCurrentFrame();
  if (!data) return null;
  const { fps } = useVideoConfig();

  const titleProgress = spring({ frame, fps, config: { damping: 100, stiffness: 10 } });
  const leftProgress  = spring({ frame: frame - 8,  fps, config: { damping: 100, stiffness: 10 } });
  const rightProgress = spring({ frame: frame - 14, fps, config: { damping: 100, stiffness: 10 } });

  const interval = Math.min((durationFrames * 0.55) / Math.max((data.before_items ?? []).length, (data.after_items ?? []).length), 18);

  const beforeColor = data.before_color ?? "#FF6B6B";
  const afterColor  = data.after_color  ?? "#52D68A";
  const glowPulse = (Math.sin(frame * 0.04) + 1) / 2;

  const renderPanel = (
    label: string, items: string[], color: string, progress: any, fromLeft: boolean
  ) => (
    <div style={{
      flex: 1,
      display: "flex", flexDirection: "column",
      gap: 16,
      opacity: Math.min(1, progress),
      transform: `translateX(${interpolate(Math.min(1, progress), [0, 1], [fromLeft ? -80 : 80, 0])}px)`,
    }}>
      {/* 패널 헤더 */}
      <div style={{
        textAlign: "center" as const,
        padding: "16px 24px",
        background: `${color}30`,
        border: `1px solid ${color}50`,
        borderBottom: `3px solid ${color}`,
        borderRadius: "12px 12px 0 0",
        fontSize: 32, fontWeight: 900, color,
        fontFamily: theme.font,
        letterSpacing: 1,
      }}>
        {label}
      </div>

      {/* 아이템들 */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {items.map((item, i) => {
          const startFrame = Math.round(interval * i + (fromLeft ? 10 : 16));
          const itemP = spring({ frame: frame - startFrame, fps, config: { damping: 100, stiffness: 20 } });
          const settled = Math.max(0, frame - (startFrame + 18));
          const pulse = (Math.sin(settled * 0.05 + i * 1.1) + 1) / 2;

          return (
            <div key={i} style={{
              display: "flex", alignItems: "flex-start", gap: 14,
              padding: "14px 20px",
              background: `rgba(255,255,255,${0.03 + pulse * 0.02})`,
              border: `1px solid rgba(255,255,255,0.07)`,
              borderLeft: `3px solid ${color}${Math.round((0.5 + pulse * 0.4) * 255).toString(16).padStart(2, "0")}`,
              borderRadius: "0 10px 10px 0",
              opacity: Math.min(1, itemP),
              transform: `translateX(${interpolate(Math.min(1, itemP), [0, 1], [fromLeft ? -30 : 30, 0])}px)`,
            }}>
              <span style={{ color, fontSize: 26, flexShrink: 0, marginTop: 3 }}>
                {fromLeft ? "✗" : "✓"}
              </span>
              <span style={{
                fontSize: 24, fontWeight: 600, color: theme.white,
                fontFamily: theme.font, lineHeight: 1.4,
              }}>
                {item}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <div style={{
      width: "100%", height: "100%",
      display: "flex", flexDirection: "column",
      justifyContent: "center", padding: "60px 80px", gap: 28,
    }}>
      <div style={{
        fontSize: 44, fontWeight: 900, color: theme.white,
        fontFamily: theme.font, textAlign: "center" as const,
        opacity: Math.min(1, titleProgress),
        transform: `translateY(${interpolate(Math.min(1, titleProgress), [0, 1], [-20, 0])}px)`,
      }}>
        {data.title}
      </div>

      <div style={{ display: "flex", gap: 32, alignItems: "flex-start", flex: 1 }}>
        {renderPanel(data.before_label, data.before_items, beforeColor, leftProgress, true)}

        {/* 중앙 화살표 */}
        <div style={{
          display: "flex", flexDirection: "column", alignItems: "center",
          justifyContent: "center", flexShrink: 0, gap: 8,
          paddingTop: 80,
          opacity: Math.min(1, spring({ frame: frame - 12, fps, config: { damping: 120, stiffness: 20 } })),
        }}>
          <div style={{ width: 1, height: 50, background: "rgba(129,216,208,0.2)" }} />
          <div style={{
            fontSize: 36, color: theme.tiffany,
            filter: `drop-shadow(0 0 ${6 + glowPulse * 6}px ${theme.tiffany})`,
          }}>→</div>
          <div style={{ width: 1, height: 50, background: "rgba(129,216,208,0.2)" }} />
        </div>

        {renderPanel(data.after_label, data.after_items, afterColor, rightProgress, false)}
      </div>
    </div>
  );
};
