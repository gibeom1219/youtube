import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { theme } from "../styles/theme";
import { useSceneTheme } from "../contexts/SceneTheme";

interface Level {
  label: string;
  value?: string;
  description?: string;
  color?: string;
}

interface Props {
  data: {
    title: string;
    levels: Level[];   // 위(꼭대기)부터 아래(밑변) 순서
    subtitle?: string;
  };
}

const LEVEL_COLORS = ["#C084FC", "#81D8D0", "#52D68A", "#FFB347", "#FF6B6B", "#FFE66D"];

export const PyramidChart: React.FC<Props> = ({ data }) => {
  const theme = useSceneTheme();
  const frame = useCurrentFrame();
  if (!data) return null;
  const { fps } = useVideoConfig();

  const titleProgress = spring({ frame, fps, config: { damping: 100, stiffness: 10 } });
  const glowPulse = (Math.sin(frame * 0.04) + 1) / 2;

  const n = (data.levels ?? []).length;

  return (
    <div style={{
      width: "100%", height: "100%",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      padding: "40px 120px", gap: 24,
    }}>
      {/* 제목 */}
      <div style={{
        fontSize: 42, fontWeight: 900, color: theme.white,
        fontFamily: theme.font, textAlign: "center",
        opacity: Math.min(1, titleProgress),
        transform: `translateY(${interpolate(Math.min(1, titleProgress), [0, 1], [-20, 0])}px)`,
      }}>
        {data.title}
      </div>
      {data.subtitle && (
        <div style={{
          fontSize: 28, color: theme.grayLight, fontFamily: theme.font,
          textAlign: "center", marginBottom: 8,
          opacity: Math.min(1, titleProgress),
        }}>
          {data.subtitle}
        </div>
      )}

      {/* 피라미드 레벨들 */}
      <div style={{
        display: "flex", flexDirection: "column",
        alignItems: "center", gap: 6, width: "100%",
      }}>
        {(data.levels ?? []).map((level, i) => {
          const levelProgress = spring({
            frame: frame - 10 - i * 10,
            fps, config: { damping: 100, stiffness: 5 },
          });
          const color = level.color ?? LEVEL_COLORS[i % LEVEL_COLORS.length];
          // 위에서 아래로 갈수록 넓어짐 (최소 42%로 상단 박스도 충분한 너비 확보)
          const widthPct = 42 + (58 / (n - 1 || 1)) * i;

          return (
            <div key={i} style={{
              width: `${widthPct}%`,
              opacity: Math.min(1, levelProgress),
              transform: `scaleX(${interpolate(Math.min(1, levelProgress), [0, 1], [0.3, 1])})`,
            }}>
              <div style={{
                background: `${color}22`,
                border: `2px solid ${color}60`,
                borderRadius: 12,
                padding: "14px 28px",
                display: "flex", alignItems: "center",
                justifyContent: "space-between",
                boxShadow: `0 0 ${10 + glowPulse * 8}px ${color}18`,
              }}>
                {/* 레벨 번호 + 라벨 */}
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <div style={{
                    width: 30, height: 30, borderRadius: "50%",
                    background: color,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 20, fontWeight: 900, color: "#060d0c",
                    fontFamily: theme.font, flexShrink: 0,
                  }}>
                    {i + 1}
                  </div>
                  <div>
                    <div style={{
                      fontSize: 24, fontWeight: 800, color,
                      fontFamily: theme.font,
                      whiteSpace: "nowrap" as const,
                    }}>
                      {level.label}
                    </div>
                    {level.description && (
                      <div style={{
                        fontSize: 24, color: theme.grayLight,
                        fontFamily: theme.font, marginTop: 2,
                      }}>
                        {level.description}
                      </div>
                    )}
                  </div>
                </div>
                {level.value && (
                  <div style={{
                    fontSize: 28, fontWeight: 900, color,
                    fontFamily: theme.font, flexShrink: 0,
                    whiteSpace: "nowrap" as const,
                  }}>
                    {level.value}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
