import React from "react";
import { Composition, staticFile } from "remotion";
import { FinanceVideo } from "./compositions/FinanceVideo";
import { VideoProps } from "./types/props";

const fontStyle = `
  @font-face {
    font-family: 'NotoSansKR';
    src: url('${staticFile("fonts/NotoSansKR.ttf")}') format('truetype');
    font-weight: 100 900;
  }
  @font-face {
    font-family: 'NotoColorEmoji';
    src: url('${staticFile("fonts/NotoColorEmoji.ttf")}') format('truetype');
  }
`;

// 기본 props (Remotion Studio 미리보기용)
const defaultProps: VideoProps = {
  title: "미리보기 영상",
  hook: "오늘의 경제 소식",
  totalDurationSeconds: 10,
  audioFile: "audio.mp3",
  fps: 30,
  scenes: [
    {
      sceneId: 0,
      type: "intro",
      startSeconds: 0,
      durationSeconds: 5,
      narration: "안녕하세요",
      backgroundImage: null,
      chartData: null,
      chartTitle: null,
    },
    {
      sceneId: 1,
      type: "outro",
      startSeconds: 5,
      durationSeconds: 5,
      narration: "감사합니다",
      backgroundImage: null,
      chartData: null,
      chartTitle: null,
    },
  ],
  wordTimestamps: [],
  tags: [],
};

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <style>{fontStyle}</style>
      <Composition
      id="FinanceVideo"
      component={FinanceVideo}
      durationInFrames={300}
      fps={30}
      width={1920}
      height={1080}
      defaultProps={defaultProps}
      calculateMetadata={({ props }) => ({
        durationInFrames: Math.round(props.totalDurationSeconds * props.fps),
        fps: props.fps,
      })}
    />
    </>
  );
};
