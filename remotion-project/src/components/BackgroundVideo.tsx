import React from "react";
import { Video, Img, staticFile, useVideoConfig, useCurrentFrame, interpolate } from "remotion";

interface Props {
  src: string | null;
  startFrame: number;
  durationFrames: number;
}

export const BackgroundVideo: React.FC<Props> = ({ src, startFrame, durationFrames }) => {
  const frame = useCurrentFrame();
  const localFrame = frame - startFrame;

  if (!src) {
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
      <Video
        src={staticFile(src)}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
        muted
        playbackRate={1}
      />
      {/* 가독성을 위한 어두운 오버레이 */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to bottom, rgba(0,0,0,0.35), rgba(0,0,0,0.55))",
        }}
      />
    </div>
  );
};
