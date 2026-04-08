import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { theme } from "../styles/theme";
import { useSceneTheme } from "../contexts/SceneTheme";

interface Props {
  data: {
    myth: string;
    fact: string;
    myth_label?: string;
    fact_label?: string;
    topic?: string;
  };
}

export const MythVsFact: React.FC<Props> = ({ data }) => {
  const theme = useSceneTheme();
  const frame = useCurrentFrame();
  if (!data) return null;
  const { fps } = useVideoConfig();

  const topicProgress = spring({ frame,         fps, config: { damping: 100, stiffness: 10 } });
  const mythProgress  = spring({ frame: frame - 8,  fps, config: { damping: 100, stiffness: 5 } });
  const vsProgress    = spring({ frame: frame - 18, fps, config: { damping: 120, stiffness: 20 } });
  const factProgress  = spring({ frame: frame - 24, fps, config: { damping: 100, stiffness: 5 } });

  const glowPulse = (Math.sin(frame * 0.04) + 1) / 2;

  const mythColor = "#FF6B6B";
  const factColor = "#52D68A";

  const mythLabel = data.myth_label ?? "❌ 오해";
  const factLabel = data.fact_label ?? "✅ 사실";

  return (
    <div style={{
      width: "100%", height: "100%",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      padding: "50px 100px", gap: 28,
    }}>
      {data.topic && (
        <div style={{
          fontSize: 42, fontWeight: 700, color: theme.tiffany,
          fontFamily: theme.font, letterSpacing: 1,
          opacity: Math.min(1, topicProgress),
          transform: `translateY(${interpolate(Math.min(1, topicProgress), [0, 1], [-16, 0])}px)`,
        }}>
          {data.topic}
        </div>
      )}

      <div style={{ display: "flex", alignItems: "stretch", gap: 0, width: "100%" }}>
        {/* 오해 카드 */}
        <div style={{
          flex: 1,
          background: `${mythColor}10`,
          border: `2px solid ${mythColor}40`,
          borderRadius: "20px 0 0 20px",
          padding: "40px 44px",
          display: "flex", flexDirection: "column", gap: 20,
          opacity: Math.min(1, mythProgress),
          transform: `translateX(${interpolate(Math.min(1, mythProgress), [0, 1], [-60, 0])}px)`,
        }}>
          <div style={{
            fontSize: 24, fontWeight: 900, color: mythColor,
            fontFamily: theme.font, letterSpacing: 1,
          }}>
            {mythLabel}
          </div>
          <div style={{
            fontSize: 34, fontWeight: 700, color: theme.white,
            fontFamily: theme.font, lineHeight: 1.45,
          }}>
            {data.myth}
          </div>
        </div>

        {/* VS 구분 */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "center",
          width: 80, flexShrink: 0,
          background: "rgba(255,255,255,0.20)",
          opacity: Math.min(1, vsProgress),
          transform: `scale(${interpolate(Math.min(1, vsProgress), [0, 1], [0.6, 1])})`,
        }}>
          <div style={{
            fontSize: 32, fontWeight: 900,
            color: theme.tiffany,
            fontFamily: theme.font, letterSpacing: 1,
            textShadow: `0 0 ${12 + glowPulse * 10}px ${theme.tiffany}60`,
          }}>
            VS
          </div>
        </div>

        {/* 사실 카드 */}
        <div style={{
          flex: 1,
          background: `${factColor}10`,
          border: `2px solid ${factColor}40`,
          borderRadius: "0 20px 20px 0",
          padding: "40px 44px",
          display: "flex", flexDirection: "column", gap: 20,
          opacity: Math.min(1, factProgress),
          transform: `translateX(${interpolate(Math.min(1, factProgress), [0, 1], [60, 0])}px)`,
        }}>
          <div style={{
            fontSize: 24, fontWeight: 900, color: factColor,
            fontFamily: theme.font, letterSpacing: 1,
          }}>
            {factLabel}
          </div>
          <div style={{
            fontSize: 34, fontWeight: 700, color: theme.white,
            fontFamily: theme.font, lineHeight: 1.45,
          }}>
            {data.fact}
          </div>
        </div>
      </div>
    </div>
  );
};
