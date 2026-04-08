import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { theme } from "../styles/theme";
import { useSceneTheme } from "../contexts/SceneTheme";

interface RankItem {
  rank: number;
  left: string;
  right: string;
}

interface Props {
  data: {
    title: string;
    left_label: string;
    right_label: string;
    ranks: RankItem[];
  };
}

export const RankShift: React.FC<Props> = ({ data }) => {
  const theme = useSceneTheme();
  const frame = useCurrentFrame();
  if (!data) return null;
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 14], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const titleP = spring({ frame, fps, config: { damping: 100, stiffness: 25 } });

  // 중앙 라인 애니메이션
  const lineGrow = interpolate(frame, [8, 28], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // 라벨 (2015년 / 2025년)
  const labelOpacity = interpolate(frame, [12, 22], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const n = (data.ranks ?? []).length;
  const rowFontSize = n <= 4 ? 38 : n <= 6 ? 32 : 28;
  const rankFontSize = n <= 4 ? 36 : n <= 6 ? 30 : 26;
  const rowGap = n <= 4 ? 20 : n <= 6 ? 14 : 10;

  return (
    <div style={{
      width: "100%", height: "100%",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      padding: "50px 100px", gap: 16,
    }}>
      {/* 타이틀 */}
      <div style={{
        fontSize: 44, fontWeight: 900, color: theme.white,
        fontFamily: theme.font, textAlign: "center",
        textShadow: theme.textShadow.medium,
        opacity: titleOpacity,
        transform: `translateY(${interpolate(titleP, [0, 1], [-16, 0])}px)`,
      }}>
        {data.title}
      </div>

      {/* 메인 비교 영역 */}
      <div style={{
        width: "100%", maxWidth: 1100,
        display: "flex", flexDirection: "column",
        alignItems: "center", gap: rowGap,
        position: "relative",
        paddingTop: 12,
      }}>
        {/* 중앙 세로 라인 */}
        <div style={{
          position: "absolute",
          left: "50%", top: 0, bottom: 0,
          transform: "translateX(-50%)",
          width: 3,
          background: `linear-gradient(180deg, ${theme.red} 0%, ${theme.red}80 100%)`,
          borderRadius: 2,
          transformOrigin: "top center",
          clipPath: `inset(0 0 ${(1 - lineGrow) * 100}% 0)`,
        }} />

        {/* 라벨 행 */}
        <div style={{
          display: "flex", width: "100%", alignItems: "center",
          opacity: labelOpacity, marginBottom: 4,
        }}>
          <div style={{
            flex: 1, textAlign: "center",
            fontSize: 28, fontWeight: 700, color: theme.grayLight,
            fontFamily: theme.font,
            textShadow: theme.textShadow.medium,
          }}>
            <span style={{
              padding: "6px 24px", borderRadius: 20,
              border: `1px solid ${theme.grayLight}40`,
              background: "rgba(255,255,255,0.05)",
            }}>
              {data.left_label}
            </span>
          </div>
          <div style={{ width: 80 }} />
          <div style={{
            flex: 1, textAlign: "center",
            fontSize: 28, fontWeight: 700, color: theme.grayLight,
            fontFamily: theme.font,
            textShadow: theme.textShadow.medium,
          }}>
            <span style={{
              padding: "6px 24px", borderRadius: 20,
              border: `1px solid ${theme.grayLight}40`,
              background: "rgba(255,255,255,0.05)",
            }}>
              {data.right_label}
            </span>
          </div>
        </div>

        {/* 순위 행들 */}
        {(data.ranks ?? []).map((item, i) => {
          const rowDelay = 16 + i * 6;
          const leftP = spring({ frame: frame - rowDelay, fps, config: { damping: 100, stiffness: 10 } });
          const leftOpacity = interpolate(frame, [rowDelay, rowDelay + 10], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
          const rightDelay = rowDelay + 4;
          const rightP = spring({ frame: frame - rightDelay, fps, config: { damping: 100, stiffness: 10 } });
          const rightOpacity = interpolate(frame, [rightDelay, rightDelay + 10], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
          const rankOpacity = interpolate(frame, [rowDelay - 2, rowDelay + 6], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

          return (
            <div key={i} style={{
              display: "flex", width: "100%", alignItems: "center",
            }}>
              {/* 왼쪽 항목 */}
              <div style={{
                flex: 1, textAlign: "center",
                fontSize: rowFontSize, fontWeight: 700,
                color: theme.gold,
                fontFamily: theme.font,
                textShadow: theme.textShadow.medium,
                opacity: leftOpacity,
                transform: `translateX(${interpolate(leftP, [0, 1], [-30, 0])}px)`,
              }}>
                {item.left}
              </div>

              {/* 중앙 순위 */}
              <div style={{
                width: 80, textAlign: "center",
                fontSize: rankFontSize, fontWeight: 900,
                color: theme.white,
                fontFamily: theme.fontNum,
                textShadow: theme.textShadow.strong,
                opacity: rankOpacity,
                background: "rgba(0,0,0,0.6)",
                padding: "6px 0",
                borderRadius: 6,
              }}>
                {item.rank}위
              </div>

              {/* 오른쪽 항목 */}
              <div style={{
                flex: 1, textAlign: "center",
                fontSize: rowFontSize, fontWeight: 700,
                color: theme.gold,
                fontFamily: theme.font,
                textShadow: theme.textShadow.medium,
                opacity: rightOpacity,
                transform: `translateX(${interpolate(rightP, [0, 1], [30, 0])}px)`,
              }}>
                {item.right}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
