import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { useSceneTheme } from "../contexts/SceneTheme";

interface Props {
  data: {
    title: string;
    main_text: string;
    highlight: string;
    detail: string;
    source?: string;
  };
}

export const MagnifyReveal: React.FC<Props> = ({ data }) => {
  const theme = useSceneTheme();
  const frame = useCurrentFrame();
  if (!data) return null;

  const titleOpacity = interpolate(frame, [0, 14], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const textOpacity = interpolate(frame, [8, 20], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const lensDelay = 22;
  const lensOpacity = interpolate(frame, [lensDelay, lensDelay + 10], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const lensScale = interpolate(frame, [lensDelay, lensDelay + 12], [0.6, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const detailOpacity = interpolate(frame, [lensDelay + 8, lensDelay + 18], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      <div style={{
        position: "absolute", top: 0, bottom: 0, left: 0, right: 0,
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        zIndex: 3, padding: "0 180px",
      }}>
        {/* 타이틀 */}
        <div style={{
          fontSize: 36, fontWeight: 700, color: "rgba(255,255,255,0.9)",
          fontFamily: theme.font, marginBottom: 20,
          opacity: titleOpacity, letterSpacing: 2,
        }}>
          {data.title}
        </div>

        {/* 메인 텍스트 (흐릿) */}
        <div style={{
          fontSize: 48, fontWeight: 800, color: "rgba(255,255,255,0.75)",
          fontFamily: theme.font, textAlign: "center",
          lineHeight: 1.5, marginBottom: 40,
          opacity: textOpacity,
        }}>
          {data.main_text}
        </div>

        {/* 돋보기 + 확대된 핵심 */}
        <div style={{
          display: "flex", flexDirection: "column",
          alignItems: "center", gap: 16,
          opacity: lensOpacity,
          transform: `scale(${lensScale})`,
        }}>
          {/* 돋보기 아이콘 */}
          <div style={{
            fontSize: 56,
            fontFamily: theme.font,
          }}>
            🔍
          </div>

          {/* 확대된 텍스트 */}
          <div style={{
            padding: "20px 48px",
            background: "rgba(129,216,208,0.1)",
            border: "2px solid rgba(129,216,208,0.4)",
            borderRadius: 16,
          }}>
            <div style={{
              fontSize: 56, fontWeight: 900, color: "#81D8D0",
              fontFamily: theme.font, textAlign: "center",
              textShadow: "0 0 30px rgba(129,216,208,0.4)",
            }}>
              {data.highlight}
            </div>
          </div>

          {/* 상세 설명 */}
          <div style={{
            fontSize: 30, fontWeight: 600, color: "rgba(255,255,255,0.95)",
            fontFamily: theme.font, textAlign: "center",
            marginTop: 12, opacity: detailOpacity,
            lineHeight: 1.5,
          }}>
            {data.detail}
          </div>

          {data.source && (
            <div style={{
              fontSize: 22, fontWeight: 500, color: "rgba(255,255,255,0.7)",
              fontFamily: theme.font, marginTop: 8,
              opacity: detailOpacity,
            }}>
              {data.source}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
