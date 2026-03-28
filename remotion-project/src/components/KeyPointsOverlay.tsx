import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";

interface Props {
  keyPoints: string[];
  durationFrames: number;
}

export const KeyPointsOverlay: React.FC<Props> = ({ keyPoints, durationFrames }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 각 포인트가 등장하는 프레임 간격 (전체 장면을 n+1 구간으로 나눔)
  const interval = durationFrames / (keyPoints.length + 1);

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 160,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "center",
        padding: "0 100px",
        gap: 28,
        pointerEvents: "none",
      }}
    >
      {keyPoints.map((point, i) => {
        const startFrame = Math.round(interval * (i + 0.5));
        const progress = spring({
          frame: frame - startFrame,
          fps,
          config: { damping: 80, stiffness: 110, mass: 0.8 },
        });
        const slideX = interpolate(progress, [0, 1], [-80, 0]);
        const opacity = interpolate(progress, [0, 0.3], [0, 1], {
          extrapolateRight: "clamp",
        });

        return (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 20,
              opacity,
              transform: `translateX(${slideX}px)`,
            }}
          >
            {/* 번호 뱃지 */}
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #FFD700, #FF6B35)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 26,
                fontWeight: 900,
                color: "#000",
                flexShrink: 0,
                boxShadow: "0 4px 20px rgba(255,215,0,0.4)",
              }}
            >
              {i + 1}
            </div>
            {/* 포인트 텍스트 */}
            <div
              style={{
                background: "rgba(0,0,0,0.75)",
                backdropFilter: "blur(8px)",
                borderLeft: "4px solid #FFD700",
                borderRadius: "0 12px 12px 0",
                padding: "14px 28px",
                fontSize: 44,
                fontWeight: 800,
                color: "white",
                fontFamily: "'NotoSansKR', sans-serif",
                letterSpacing: "-0.5px",
              }}
            >
              {point}
            </div>
          </div>
        );
      })}
    </div>
  );
};
