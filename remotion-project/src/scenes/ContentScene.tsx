import React from "react";
import { useVideoConfig } from "remotion";
import { BackgroundVideo } from "../components/BackgroundVideo";
import { KeyPointsOverlay } from "../components/KeyPointsOverlay";
import { Subtitle } from "../components/Subtitle";
import { Scene, WordTimestamp } from "../types/props";

interface Props {
  scene: Scene;
  allWords: WordTimestamp[];
  startFrame: number;
}

export const ContentScene: React.FC<Props> = ({ scene, allWords, startFrame }) => {
  const { fps } = useVideoConfig();
  const durationFrames = Math.round(scene.durationSeconds * fps);

  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      <BackgroundVideo
        src={scene.backgroundImage}
        startFrame={startFrame}
        durationFrames={durationFrames}
      />
      {scene.keyPoints && scene.keyPoints.length > 0 && (
        <KeyPointsOverlay
          keyPoints={scene.keyPoints}
          durationFrames={durationFrames}
        />
      )}
      <Subtitle words={allWords} startSeconds={scene.startSeconds} />
    </div>
  );
};
