import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { theme } from "../styles/theme";
import { useSceneTheme } from "../contexts/SceneTheme";

interface Side {
  name: string;
  flag?: string;
  color?: string;
  stats: Array<{ label: string; value: string }>;
}

interface Props {
  data: {
    topic: string;
    left: Side;
    right: Side;
    verdict?: string;
  };
}

export const VsBattle: React.FC<Props> = ({ data }) => {
  const theme = useSceneTheme();
  const frame = useCurrentFrame();
  if (!data) return null;
  const { fps } = useVideoConfig();

  const topicProgress   = spring({ frame,         fps, config: { damping: 100, stiffness: 10 } });
  const leftProgress    = spring({ frame: frame - 8,  fps, config: { damping: 100, stiffness: 5 } });
  const vsProgress      = spring({ frame: frame - 14, fps, config: { damping: 120, stiffness: 20 } });
  const rightProgress   = spring({ frame: frame - 20, fps, config: { damping: 100, stiffness: 5 } });
  const verdictProgress = spring({ frame: frame - 30, fps, config: { damping: 100, stiffness: 10 } });

  const glowPulse = (Math.sin(frame * 0.05) + 1) / 2;

  const leftColor  = data.left.color  ?? theme.tiffany;
  const rightColor = data.right.color ?? "#C084FC";

  const renderSide = (side: Side, color: string, progress: number, fromLeft: boolean) => (
    <div style={{
      flex: 1,
      background: `${color}0A`,
      border: `2px solid ${color}35`,
      borderRadius: fromLeft ? "20px 0 0 20px" : "0 20px 20px 0",
      padding: "40px 44px",
      display: "flex", flexDirection: "column", gap: 20,
      alignItems: "center",
      opacity: Math.min(1, progress),
      transform: `translateX(${interpolate(Math.min(1, progress), [0, 1], [fromLeft ? -80 : 80, 0])}px)`,
    }}>
      {/* 국기 + 이름 */}
      {side.flag && (
        <div style={{ fontSize: 54, fontFamily: theme.font }}>{side.flag}</div>
      )}
      <div style={{
        fontSize: 32, fontWeight: 900, color,
        fontFamily: theme.font, textAlign: "center",
        textShadow: `0 0 ${12 + glowPulse * 10}px ${color}40`,
      }}>
        {side.name}
      </div>

      {/* 구분선 */}
      <div style={{
        width: "60%", height: 2,
        background: `linear-gradient(to right, transparent, ${color}60, transparent)`,
      }} />

      {/* 통계 */}
      <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 12 }}>
        {side.stats.map((stat, i) => (
          <div key={i} style={{
            display: "flex", justifyContent: "space-between", alignItems: "baseline",
            padding: "8px 12px",
            background: `${color}06`,
            borderRadius: 10,
          }}>
            <div style={{ fontSize: 26, color: theme.grayLight, fontFamily: theme.font }}>
              {stat.label}
            </div>
            <div style={{ fontSize: 24, fontWeight: 800, color, fontFamily: theme.font }}>
              {stat.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div style={{
      width: "100%", height: "100%",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      padding: "40px 80px", gap: 24,
    }}>
      {/* 주제 */}
      <div style={{
        fontSize: 44, fontWeight: 700, color: theme.white,
        fontFamily: theme.font, textAlign: "center",
        opacity: Math.min(1, topicProgress),
        transform: `translateY(${interpolate(Math.min(1, topicProgress), [0, 1], [-20, 0])}px)`,
      }}>
        {data.topic}
      </div>

      {/* 대결 */}
      <div style={{ display: "flex", alignItems: "stretch", width: "100%", gap: 0 }}>
        {renderSide(data.left, leftColor, leftProgress, true)}

        {/* VS */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "center",
          width: 80, flexShrink: 0,
          background: "rgba(255,255,255,0.20)",
          opacity: Math.min(1, vsProgress),
          transform: `scale(${interpolate(Math.min(1, vsProgress), [0, 1], [0, 1])})`,
        }}>
          <div style={{
            fontSize: 38, fontWeight: 900, color: "#FFB347",
            fontFamily: theme.font,
            textShadow: `0 0 ${16 + glowPulse * 12}px #FFB34780`,
          }}>
            VS
          </div>
        </div>

        {renderSide(data.right, rightColor, rightProgress, false)}
      </div>

      {/* 판정 */}
      {data.verdict && (
        <div style={{
          background: "rgba(255,179,71,0.12)",
          border: "1px solid rgba(255,179,71,0.4)",
          borderRadius: 50, padding: "12px 40px",
          fontSize: 26, fontWeight: 800, color: "#FFB347",
          fontFamily: theme.font, textAlign: "center",
          opacity: Math.min(1, verdictProgress),
          transform: `translateY(${interpolate(Math.min(1, verdictProgress), [0, 1], [20, 0])}px)`,
        }}>
          {data.verdict}
        </div>
      )}
    </div>
  );
};
