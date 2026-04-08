import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { theme } from "../styles/theme";
import { useSceneTheme } from "../contexts/SceneTheme";

interface Props {
  data: {
    speaker: string;
    title?: string;
    quote: string;
    highlight?: string[];
    emoji?: string;
  };
}

export const SpeechBubble: React.FC<Props> = ({ data }) => {
  const theme = useSceneTheme();
  const frame = useCurrentFrame();
  if (!data) return null;
  const { fps } = useVideoConfig();

  const silhouetteP = spring({ frame, fps, config: { damping: 100, stiffness: 15 } });
  const silhouetteOpacity = interpolate(frame, [0, 14], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const bubbleP = spring({ frame: frame - 8, fps, config: { damping: 100, stiffness: 10 } });
  const bubbleOpacity = interpolate(frame, [8, 22], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const nameOpacity = interpolate(frame, [20, 32], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // 하이라이트 단어 처리
  const renderQuote = () => {
    if (!data.highlight || (data.highlight ?? []).length === 0) {
      return <span>{data.quote}</span>;
    }

    let result: React.ReactNode[] = [data.quote];

    for (const word of data.highlight) {
      const newResult: React.ReactNode[] = [];
      for (const part of result) {
        if (typeof part !== "string") {
          newResult.push(part);
          continue;
        }
        const segments = part.split(word);
        segments.forEach((seg, i) => {
          if (i > 0) {
            newResult.push(
              <span key={`hl-${word}-${i}`} style={{ color: "#dc2626", fontWeight: 900 }}>
                {word}
              </span>
            );
          }
          if (seg) newResult.push(seg);
        });
      }
      result = newResult;
    }

    return <>{result}</>;
  };

  // 텍스트 길이에 따라 폰트 크기 자동 조정
  const quoteLen = (data.quote ?? []).length;
  const quoteFontSize = quoteLen <= 40 ? 44 : quoteLen <= 80 ? 38 : quoteLen <= 120 ? 32 : 28;

  return (
    <div style={{
      width: "100%", height: "100%",
      display: "flex", alignItems: "center",
      padding: "60px 100px", gap: 0,
    }}>
      {/* 왼쪽: 실루엣 */}
      <div style={{
        display: "flex", flexDirection: "column", alignItems: "center",
        flexShrink: 0, width: 280,
        opacity: silhouetteOpacity,
        transform: `translateX(${interpolate(silhouetteP, [0, 1], [-40, 0])}px)`,
      }}>
        {/* 실루엣 몸체 */}
        <div style={{
          width: 180, height: 220,
          background: "linear-gradient(180deg, #1a1a1a 0%, #2a2a2a 100%)",
          borderRadius: "90px 90px 40px 40px",
          border: "3px solid rgba(255,255,255,0.25)",
          display: "flex", alignItems: "center", justifyContent: "center",
          position: "relative",
          boxShadow: "0 8px 32px rgba(0,0,0,0.5), inset 0 0 30px rgba(255,255,255,0.03)",
        }}>
          {/* 이모지 아이콘 */}
          <span style={{
            fontSize: 72,
            fontFamily: theme.font,
            filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.5))",
          }}>
            {data.emoji ?? "🗣️"}
          </span>
        </div>

        {/* 발화자 정보 */}
        <div style={{
          marginTop: 20,
          opacity: nameOpacity,
          textAlign: "center",
        }}>
          {data.title && (
            <div style={{
              fontSize: 22, color: theme.grayLight, fontFamily: theme.font,
              fontWeight: 500, marginBottom: 6,
              textShadow: theme.textShadow.medium,
            }}>
              {data.title}
            </div>
          )}
          <div style={{
            fontSize: 30, fontWeight: 900, color: theme.white,
            fontFamily: theme.font,
            textShadow: theme.textShadow.medium,
          }}>
            {data.speaker}
          </div>
        </div>
      </div>

      {/* 오른쪽: 말풍선 */}
      <div style={{
        flex: 1, position: "relative",
        opacity: bubbleOpacity,
        transform: `scale(${interpolate(bubbleP, [0, 1], [0.85, 1])})`,
        transformOrigin: "left center",
      }}>
        {/* 말풍선 꼬리 (삼각형) */}
        <div style={{
          position: "absolute",
          left: -24, top: "50%", transform: "translateY(-50%)",
          width: 0, height: 0,
          borderTop: "20px solid transparent",
          borderBottom: "20px solid transparent",
          borderRight: "28px solid rgba(255,255,255,0.95)",
          filter: "drop-shadow(-3px 0 4px rgba(0,0,0,0.15))",
        }} />

        {/* 말풍선 본체 */}
        <div style={{
          background: "rgba(255,255,255,0.95)",
          borderRadius: 20,
          padding: "36px 44px",
          boxShadow: "0 8px 40px rgba(0,0,0,0.3), 0 2px 8px rgba(0,0,0,0.15)",
          border: "2px solid rgba(255,255,255,0.98)",
        }}>
          <div style={{
            fontSize: quoteFontSize,
            fontWeight: 700,
            color: "#1a1a1a",
            fontFamily: theme.font,
            lineHeight: 1.6,
            wordBreak: "keep-all" as const,
          }}>
            {renderQuote()}
          </div>
        </div>
      </div>
    </div>
  );
};
