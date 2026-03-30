import React from "react";
import { Video, Img, staticFile, useCurrentFrame, interpolate } from "remotion";

interface Props {
  accentColor?: string;
  videoSrc?: string | null;
}

export const Background: React.FC<Props> = ({ accentColor = "#81D8D0", videoSrc }) => {
  const frame = useCurrentFrame();
  const bgOpacity = interpolate(frame, [0, 15], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // 파일 확장자로 영상/이미지 구분
  const isVideo = videoSrc && (videoSrc.endsWith(".mp4") || videoSrc.endsWith(".webm"));
  const isImage = videoSrc && (videoSrc.endsWith(".png") || videoSrc.endsWith(".jpg") || videoSrc.endsWith(".jpeg") || videoSrc.endsWith(".webp"));

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
      {/* Deep dark base gradient - Tiffany */}
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(135deg, #060d0c 0%, #071210 50%, #060e0d 100%)",
      }} />

      {/* 배경 영상 (있으면 어둡게 깔기) */}
      {isVideo && (
        <div style={{
          position: "absolute", inset: 0,
          opacity: bgOpacity * 0.20,
        }}>
          <Video
            src={staticFile(videoSrc!)}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            muted
            loop
          />
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(135deg, rgba(6,13,12,0.6) 0%, rgba(6,13,12,0.4) 50%, rgba(6,13,12,0.6) 100%)",
          }} />
        </div>
      )}

      {/* 배경 이미지 (있으면 어둡게 깔기) */}
      {isImage && (
        <div style={{
          position: "absolute", inset: 0,
          opacity: bgOpacity * 0.20,
        }}>
          <Img
            src={staticFile(videoSrc!)}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(135deg, rgba(6,13,12,0.6) 0%, rgba(6,13,12,0.4) 50%, rgba(6,13,12,0.6) 100%)",
          }} />
        </div>
      )}

      {/* Ambient glow - left side */}
      <div style={{
        position: "absolute",
        left: -240, top: "50%",
        transform: "translateY(-50%)",
        width: 900, height: 700,
        borderRadius: "50%",
        background: `radial-gradient(ellipse, ${accentColor}1a 0%, transparent 65%)`,
        filter: "blur(60px)",
      }} />

      {/* Ambient glow - bottom right */}
      <div style={{
        position: "absolute",
        right: -100, bottom: -100,
        width: 600, height: 500,
        borderRadius: "50%",
        background: `radial-gradient(ellipse, ${accentColor}0d 0%, transparent 70%)`,
        filter: "blur(80px)",
      }} />

      {/* Grid pattern (배경 에셋 없을 때만) */}
      {!videoSrc && (
        <svg
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.06 }}
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern id="bg-grid" width="80" height="80" patternUnits="userSpaceOnUse">
              <path d="M 80 0 L 0 0 0 80" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#bg-grid)" />
        </svg>
      )}

      {/* Top accent line */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 2,
        background: `linear-gradient(90deg, transparent 0%, ${accentColor}90 25%, ${accentColor}90 75%, transparent 100%)`,
      }} />

      {/* Bottom subtle line */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: 1,
        background: `linear-gradient(90deg, transparent 0%, ${accentColor}35 50%, transparent 100%)`,
      }} />
    </div>
  );
};
