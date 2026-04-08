import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { theme } from "../styles/theme";
import { useSceneTheme } from "../contexts/SceneTheme";

interface Props {
  data: {
    title: string;
    items: string[];
  };
  durationFrames: number;
}

export const BulletList: React.FC<Props> = ({ data, durationFrames }) => {
  const theme = useSceneTheme();
  const frame = useCurrentFrame();
  if (!data) return null;
  const { fps } = useVideoConfig();

  const titleProgress = spring({ frame, fps, config: { damping: 100, stiffness: 10 } });
  const lineProgress = spring({ frame: frame - 10, fps, config: { damping: 120, stiffness: 10 } });
  const interval = Math.min((durationFrames * 0.7) / ((data.items ?? []).length + 1), 18);

  return (
    <div style={{
      width: "100%", height: "100%",
      display: "flex", flexDirection: "column",
      justifyContent: "center", padding: "60px 140px",
    }}>
      {/* 제목 */}
      <div style={{
        fontSize: 48, fontWeight: 900, color: theme.white,
        fontFamily: theme.font, marginBottom: 16,
        opacity: Math.min(1, titleProgress),
        transform: `translateY(${interpolate(Math.min(1, titleProgress), [0, 1], [-24, 0])}px)`,
        lineHeight: 1.3,
        textShadow: theme.textShadow.medium,
      }}>
        {data.title}
      </div>

      {/* 골드 구분선 */}
      <div style={{
        height: 3,
        width: `${interpolate(Math.min(1, lineProgress), [0, 1], [0, 80])}px`,
        background: theme.gold,
        borderRadius: 2,
        marginBottom: 44,
      }} />

      {/* 항목들 */}
      <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
        {(data.items ?? []).map((item, i) => {
          const startFrame = Math.round(interval * (i + 1));
          const progress = spring({ frame: frame - startFrame, fps, config: { damping: 100, stiffness: 10 } });

          // 등장 후 지속 애니메이션: 왼쪽 보더 글로우 펄싱
          const settled = Math.max(0, frame - (startFrame + 18));
          const pulse = (Math.sin(settled * 0.05 + i * 1.3) + 1) / 2;
          const borderOpacity = 0.6 + pulse * 0.4;
          const bgOpacity = 0.03 + pulse * 0.03;

          // 번호 원형 스케일 펄싱 (0.04 → 미세하게 유지)
          const numPulse = 1 + Math.sin(settled * 0.05 + i * 1.3) * 0.02;

          return (
            <div key={i} style={{
              display: "flex", alignItems: "center",
              opacity: Math.min(1, progress),
              transform: `translateX(${interpolate(Math.min(1, progress), [0, 1], [-60, 0])}px)`,
              background: `rgba(255,255,255,${bgOpacity})`,
              border: "1px solid rgba(255,255,255,0.22)",
              borderLeft: `4px solid rgba(129,216,208,${borderOpacity})`,
              borderRadius: "0 12px 12px 0",
              padding: "18px 36px",
            }}>
              <div style={{
                fontSize: 36, fontWeight: 700, color: theme.white,
                fontFamily: theme.font, lineHeight: 1.35,
                textShadow: theme.textShadow.light,
              }}>
                {item}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
