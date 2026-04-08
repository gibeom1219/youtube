import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { theme } from "../styles/theme";
import { useSceneTheme } from "../contexts/SceneTheme";

interface Props {
  data: {
    number: string;
    unit: string;
    label: string;
    description: string;
  };
  accentColor?: string;
}

function parseSimpleNumber(str: string): { value: number; decimals: number } | null {
  const cleaned = str.replace(/,/g, "");
  if (/^-?\d+(\.\d+)?$/.test(cleaned)) {
    const val = parseFloat(cleaned);
    const dec = cleaned.includes(".") ? cleaned.split(".")[1].length : 0;
    return { value: val, decimals: dec };
  }
  return null;
}

export const NumberHighlight: React.FC<Props> = ({ data, accentColor = theme.tiffany }) => {
  const theme = useSceneTheme();
  const frame = useCurrentFrame();
  if (!data) return null;
  const { fps } = useVideoConfig();

  const numProgress = spring({ frame, fps, config: { damping: 60, stiffness: 10 } });
  const labelProgress = spring({ frame: frame - 10, fps, config: { damping: 100, stiffness: 25 } });
  const descProgress = spring({ frame: frame - 18, fps, config: { damping: 100, stiffness: 25 } });

  const parsed = parseSimpleNumber(data.number);
  const displayNumber = parsed
    ? interpolate(Math.min(1, numProgress), [0, 1], [0, parsed.value]).toFixed(parsed.decimals)
    : data.number;

  // 글로우 펄싱 (위치 이동 없음)
  const pulse = (Math.sin(frame * 0.05) + 1) / 2;
  const numGlow = 80 + pulse * 50;
  const numGlowOpacity = 0.25 + pulse * 0.18;

  return (
    <div style={{
      width: "100%", height: "100%",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center", gap: 24,
      padding: "0 120px",
    }}>
      {/* 라벨 */}
      <div style={{
        fontSize: 28, fontWeight: 700, color: accentColor,
        fontFamily: theme.font, letterSpacing: 4,
        textTransform: "uppercase" as const,
        opacity: Math.min(1, labelProgress),
        border: `1px solid ${accentColor}40`,
        padding: "8px 24px", borderRadius: 4,
        textShadow: theme.textShadow.medium,
      }}>
        {data.label}
      </div>

      {/* 빅 넘버 */}
      <div style={{
        position: "relative",
        opacity: Math.min(1, numProgress),
        transform: `scale(${interpolate(Math.min(1, numProgress), [0, 1], [0.6, 1])})`,
      }}>
        <div style={{
          position: "absolute", inset: -40,
          background: `radial-gradient(ellipse, rgba(129,216,208,${numGlowOpacity}) 0%, transparent 65%)`,
          filter: `blur(${numGlow * 0.45}px)`,
        }} />
        <div style={{ display: "flex", alignItems: "flex-end", gap: 16, position: "relative" }}>
          <div style={{
            fontSize: 220, fontWeight: 900, color: accentColor,
            fontFamily: theme.fontNum, lineHeight: 0.85,
            textShadow: `${theme.textShadow.strong}, 0 0 ${numGlow}px rgba(129,216,208,${numGlowOpacity})`,
          }}>
            {displayNumber}
          </div>
          {data.unit && (
            <div style={{
              fontSize: 80, fontWeight: 700,
              color: accentColor + "CC",
              fontFamily: theme.font, paddingBottom: 28,
            }}>
              {data.unit}
            </div>
          )}
        </div>
      </div>

      {/* 설명 */}
      <div style={{
        fontSize: 36, color: theme.grayLight,
        fontFamily: theme.font, textAlign: "center" as const,
        opacity: Math.min(1, descProgress),
        transform: `translateY(${interpolate(Math.min(1, descProgress), [0, 1], [20, 0])}px)`,
        marginTop: 8, lineHeight: 1.6,
        maxWidth: 1000,
      }}>
        {data.description}
      </div>
    </div>
  );
};
