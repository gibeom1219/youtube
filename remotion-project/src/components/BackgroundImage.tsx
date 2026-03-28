import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, staticFile } from "remotion";

interface Props {
  src: string | null;
  startFrame: number;
  durationFrames: number;
}

export const BackgroundImage: React.FC<Props> = ({ src, startFrame, durationFrames }) => {
  const frame = useCurrentFrame();
  const localFrame = frame - startFrame;

  // Ken Burns 효과: 천천히 확대
  const scale = interpolate(localFrame, [0, durationFrames], [1.0, 1.08], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const translateX = interpolate(localFrame, [0, durationFrames], [0, -20], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  if (!src) {
    // 이미지 없을 경우 그라디언트 배경
    return (
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(135deg, #0f0c29, #302b63, #24243e)",
        }}
      />
    );
  }

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
      <img
        src={staticFile(src)}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transform: `scale(${scale}) translateX(${translateX}px)`,
          transformOrigin: "center center",
        }}
      />
      {/* 가독성을 위한 어두운 오버레이 */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0.6))",
        }}
      />
    </div>
  );
};
