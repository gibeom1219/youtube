import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { BackgroundVideo } from "../components/BackgroundVideo";
import { Scene } from "../types/props";

interface Props {
  scene: Scene;
}

export const OutroScene: React.FC<Props> = ({ scene }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const durationFrames = Math.round(scene.durationSeconds * fps);

  const progress = spring({ frame, fps, config: { damping: 100 } });

  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      <BackgroundVideo src={scene.backgroundImage} startFrame={0} durationFrames={durationFrames} />
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 32,
        }}
      >
        <div
          style={{
            fontSize: 80,
            fontWeight: 900,
            color: "#FFD700",
            fontFamily: "'NotoSansKR', sans-serif",
            textShadow: "3px 3px 12px rgba(0,0,0,0.8)",
            opacity: progress,
            transform: `scale(${interpolate(progress, [0, 1], [0.8, 1])})`,
          }}
        >
          구독 & 좋아요 눌러주세요!
        </div>
        <div
          style={{
            fontSize: 44,
            color: "white",
            fontFamily: "'NotoSansKR', sans-serif",
            opacity: progress,
          }}
        >
          🔔 알림 설정도 잊지 마세요
        </div>
      </div>
    </div>
  );
};
