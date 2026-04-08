import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { theme } from "../styles/theme";
import { useSceneTheme } from "../contexts/SceneTheme";

interface Props {
  data: {
    title?: string;
    left_number: string;
    left_unit?: string;
    left_label: string;
    left_sub?: string;
    left_color?: string;
    right_number: string;
    right_unit?: string;
    right_label: string;
    right_sub?: string;
    right_color?: string;
  };
}

export const DualStat: React.FC<Props> = ({ data }) => {
  const theme = useSceneTheme();
  const frame = useCurrentFrame();
  if (!data) return null;
  const { fps } = useVideoConfig();

  const titleProgress = spring({ frame,         fps, config: { damping: 100, stiffness: 10 } });
  const leftProgress  = spring({ frame: frame - 6,  fps, config: { damping: 100, stiffness: 5 } });
  const rightProgress = spring({ frame: frame - 16, fps, config: { damping: 100, stiffness: 5 } });
  const divProgress   = spring({ frame: frame - 11, fps, config: { damping: 120, stiffness: 20 } });

  const glowPulse = (Math.sin(frame * 0.04) + 1) / 2;

  const leftColor  = data.left_color  ?? theme.tiffany;
  const rightColor = data.right_color ?? "#52D68A";

  const renderStat = (
    number: string, unit: string | undefined, label: string, sub: string | undefined,
    color: string, progress: any, fromLeft: boolean
  ) => {
    const glowSize = 20 + glowPulse * 20;

    return (
      <div style={{
        flex: 1, display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        padding: "40px 40px",
        opacity: Math.min(1, progress),
        transform: `translateX(${interpolate(Math.min(1, progress), [0, 1], [fromLeft ? -60 : 60, 0])}px)`,
      }}>
        {/* 글로우 */}
        <div style={{
          position: "absolute" as const,
          width: 280, height: 280, borderRadius: "50%",
          background: `radial-gradient(ellipse, ${color}${Math.round((0.08 + glowPulse * 0.06) * 255).toString(16).padStart(2, "0")} 0%, transparent 70%)`,
          filter: `blur(${glowSize}px)`,
          pointerEvents: "none" as const,
        }} />

        {/* 숫자 */}
        <div style={{ display: "flex", alignItems: "baseline", gap: 8, position: "relative" as const }}>
          <div style={{
            fontSize: 110, fontWeight: 900, color,
            fontFamily: theme.fontNum, lineHeight: 1,
            textShadow: `${theme.textShadow.strong}, 0 0 ${30 + glowPulse * 20}px ${color}50`,
          }}>
            {number}
          </div>
          {unit && (
            <div style={{
              fontSize: 42, fontWeight: 700, color,
              fontFamily: theme.font,
            }}>
              {unit}
            </div>
          )}
        </div>

        {/* 레이블 */}
        <div style={{
          fontSize: 28, fontWeight: 700, color: theme.white,
          fontFamily: theme.font, textAlign: "center" as const,
          marginTop: 16,
        }}>
          {label}
        </div>

        {/* 서브 */}
        {sub && (
          <div style={{
            fontSize: 28, color: theme.grayLight,
            fontFamily: theme.font, fontWeight: 500,
            textAlign: "center" as const, marginTop: 8,
          }}>
            {sub}
          </div>
        )}

        {/* 하단 라인 */}
        <div style={{
          height: 3, width: 80,
          background: color,
          borderRadius: 2, marginTop: 20,
          boxShadow: `0 0 ${8 + glowPulse * 8}px ${color}`,
          opacity: 0.8 + glowPulse * 0.2,
        }} />
      </div>
    );
  };

  return (
    <div style={{
      width: "100%", height: "100%",
      display: "flex", flexDirection: "column",
      justifyContent: "center", padding: "60px 80px",
    }}>
      {data.title && (
        <div style={{
          fontSize: 46, fontWeight: 900, color: theme.white,
          fontFamily: theme.font, textAlign: "center" as const,
          marginBottom: 60,
          opacity: Math.min(1, titleProgress),
          transform: `translateY(${interpolate(Math.min(1, titleProgress), [0, 1], [-16, 0])}px)`,
        }}>
          {data.title}
        </div>
      )}

      <div style={{ display: "flex", alignItems: "center", position: "relative" as const }}>
        {renderStat(data.left_number, data.left_unit, data.left_label, data.left_sub, leftColor, leftProgress, true)}

        {/* 중앙 구분선 */}
        <div style={{
          display: "flex", flexDirection: "column", alignItems: "center",
          gap: 12, flexShrink: 0,
          opacity: Math.min(1, divProgress),
          transform: `scaleY(${interpolate(Math.min(1, divProgress), [0, 1], [0, 1])})`,
        }}>
          <div style={{ width: 1, height: 80, background: "rgba(129,216,208,0.2)" }} />
          <div style={{
            width: 10, height: 10, borderRadius: "50%",
            background: theme.tiffany,
            boxShadow: `0 0 ${8 + glowPulse * 8}px ${theme.tiffany}`,
          }} />
          <div style={{ width: 1, height: 80, background: "rgba(129,216,208,0.2)" }} />
        </div>

        {renderStat(data.right_number, data.right_unit, data.right_label, data.right_sub, rightColor, rightProgress, false)}
      </div>
    </div>
  );
};
