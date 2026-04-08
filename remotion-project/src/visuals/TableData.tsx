import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { theme } from "../styles/theme";
import { useSceneTheme } from "../contexts/SceneTheme";

interface Props {
  data: {
    title: string;
    headers: string[];
    rows: string[][];
    highlight_col?: number;
  };
  durationFrames: number;
}

export const TableData: React.FC<Props> = ({ data, durationFrames }) => {
  const theme = useSceneTheme();
  const frame = useCurrentFrame();
  if (!data) return null;
  const { fps } = useVideoConfig();

  const titleProgress = spring({ frame, fps, config: { damping: 100, stiffness: 10 } });
  const headerProgress = spring({ frame: frame - 10, fps, config: { damping: 100, stiffness: 10 } });
  const interval = Math.min((durationFrames * 0.6) / ((data.rows ?? []).length + 1), 18);

  const glowPulse = (Math.sin(frame * 0.04) + 1) / 2;
  const highlightCol = data.highlight_col ?? 1;

  return (
    <div style={{
      width: "100%", height: "100%",
      display: "flex", flexDirection: "column",
      justifyContent: "center", padding: "60px 120px", gap: 0,
    }}>
      {/* 제목 */}
      <div style={{
        fontSize: 44, fontWeight: 900, color: theme.white,
        fontFamily: theme.font, marginBottom: 36,
        opacity: Math.min(1, titleProgress),
        transform: `translateY(${interpolate(Math.min(1, titleProgress), [0, 1], [-20, 0])}px)`,
      }}>
        {data.title}
      </div>

      {/* 표 */}
      <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
        {/* 헤더 */}
        <div style={{
          display: "flex",
          background: `rgba(129,216,208,0.22)`,
          border: `1px solid rgba(129,216,208,0.35)`,
          borderBottom: `2px solid ${theme.tiffany}`,
          borderRadius: "12px 12px 0 0",
          overflow: "hidden",
          opacity: Math.min(1, headerProgress),
          transform: `translateY(${interpolate(Math.min(1, headerProgress), [0, 1], [-16, 0])}px)`,
        }}>
          {(data.headers ?? []).map((header, j) => (
            <div key={j} style={{
              flex: j === 0 ? 1.4 : 1,
              padding: "18px 28px",
              fontSize: 26, fontWeight: 900, color: theme.tiffany,
              fontFamily: theme.font,
              textAlign: j === 0 ? "left" as const : "center" as const,
              borderRight: j < (data.headers ?? []).length - 1 ? "1px solid rgba(129,216,208,0.25)" : "none",
            }}>
              {header}
            </div>
          ))}
        </div>

        {/* 데이터 행 */}
        {(data.rows ?? []).map((row, i) => {
          const startFrame = Math.round(interval * (i + 1));
          const progress = spring({ frame: frame - startFrame, fps, config: { damping: 100, stiffness: 10 } });

          const settled = Math.max(0, frame - (startFrame + 20));
          const pulse = (Math.sin(settled * 0.04 + i * 1.1) + 1) / 2;
          const bgAlpha = i % 2 === 0 ? 0.025 + pulse * 0.02 : 0.05 + pulse * 0.02;

          return (
            <div key={i} style={{
              display: "flex",
              background: `rgba(255,255,255,${bgAlpha})`,
              border: "1px solid rgba(255,255,255,0.20)",
              borderTop: "none",
              borderRadius: i === (data.rows ?? []).length - 1 ? "0 0 12px 12px" : 0,
              opacity: Math.min(1, progress),
              transform: `translateX(${interpolate(Math.min(1, progress), [0, 1], [-40, 0])}px)`,
              overflow: "hidden",
            }}>
              {row.map((cell, j) => {
                const isHighlight = j === highlightCol;
                return (
                  <div key={j} style={{
                    flex: j === 0 ? 1.4 : 1,
                    padding: "16px 28px",
                    fontSize: 28, fontWeight: isHighlight ? 800 : 600,
                    color: isHighlight ? theme.tiffany : theme.white,
                    fontFamily: theme.font,
                    textAlign: j === 0 ? "left" as const : "center" as const,
                    borderRight: j < row.length - 1 ? "1px solid rgba(255,255,255,0.20)" : "none",
                    background: isHighlight ? `rgba(129,216,208,${0.04 + pulse * 0.04})` : "transparent",
                  }}>
                    {cell}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};
