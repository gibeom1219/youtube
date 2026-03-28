import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { BackgroundVideo } from "../components/BackgroundVideo";
import { Scene } from "../types/props";

interface Props {
  scene: Scene;
  title: string;
  hook: string;
}

export const IntroScene: React.FC<Props> = ({ scene, title, hook }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const durationFrames = Math.round(scene.durationSeconds * fps);

  const titleProgress = spring({ frame, fps, config: { damping: 80, stiffness: 50 } });
  const hookProgress = spring({ frame: frame - 10, fps, config: { damping: 80 } });

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
          padding: "0 120px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontSize: 72,
            fontWeight: 900,
            color: "white",
            lineHeight: 1.2,
            fontFamily: "'NotoSansKR', sans-serif",
            textShadow: "3px 3px 12px rgba(0,0,0,0.8)",
            opacity: titleProgress,
            transform: `translateY(${interpolate(titleProgress, [0, 1], [40, 0])}px)`,
            marginBottom: 32,
          }}
        >
          {title}
        </div>
        <div
          style={{
            fontSize: 44,
            fontWeight: 500,
            color: "#FFD700",
            fontFamily: "'NotoSansKR', sans-serif",
            textShadow: "2px 2px 8px rgba(0,0,0,0.8)",
            opacity: hookProgress,
            transform: `translateY(${interpolate(hookProgress, [0, 1], [20, 0])}px)`,
          }}
        >
          {hook}
        </div>
      </div>
    </div>
  );
};
