import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { useSceneTheme } from "../contexts/SceneTheme";

interface Props {
  data: {
    quote: string;
    highlight?: string;
    source: string;
    context?: string;
  };
}

export const WhiteQuote: React.FC<Props> = ({ data }) => {
  const theme = useSceneTheme();
  const frame = useCurrentFrame();
  if (!data) return null;

  const quoteOpacity = interpolate(frame, [0, 16], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const quoteSlide = interpolate(frame, [0, 16], [40, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const sourceOpacity = interpolate(frame, [18, 30], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const lineWidth = interpolate(frame, [10, 22], [0, 100], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const contextOpacity = interpolate(frame, [26, 38], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // 하이라이트 텍스트 렌더링
  const renderQuote = () => {
    const { quote, highlight } = data;
    if (!highlight) return quote;
    const idx = (quote ?? "").indexOf(highlight ?? "");
    if (idx === -1) return quote;
    return (
      <>
        {quote.slice(0, idx)}
        <span style={{ color: "#e67e22", fontWeight: 900 }}>{highlight}</span>
        {quote.slice(idx + highlight.length)}
      </>
    );
  };

  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      {/* 콘텐츠 (중앙) — 오버레이는 FinanceVideo에서 SceneTransition 바깥에 렌더링 */}
      <div style={{
        position: "absolute", top: 0, bottom: 0, left: 0, right: 0,
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        padding: "0 220px",
        zIndex: 3,
      }}>
        {/* 큰따옴표 장식 */}
        <div style={{
          fontSize: 120, fontWeight: 900, color: "rgba(0,0,0,0.08)",
          lineHeight: 0.6, marginBottom: 16,
          opacity: quoteOpacity,
          fontFamily: "Georgia, serif",
        }}>
          "
        </div>

        {/* 인용문 */}
        <div style={{
          fontSize: 46, fontWeight: 800, color: "#111",
          fontFamily: theme.font, lineHeight: 1.5,
          textAlign: "center",
          opacity: quoteOpacity,
          transform: `translateY(${quoteSlide}px)`,
        }}>
          {renderQuote()}
        </div>

        {/* 구분선 */}
        <div style={{
          width: lineWidth, height: 3, borderRadius: 2,
          background: "#e67e22", marginTop: 32, marginBottom: 24,
          opacity: sourceOpacity,
        }} />

        {/* 출처 */}
        <div style={{
          fontSize: 28, fontWeight: 700, color: "#333",
          fontFamily: theme.font,
          opacity: sourceOpacity,
        }}>
          — {data.source}
        </div>

        {/* 추가 맥락 */}
        {data.context && (
          <div style={{
            fontSize: 24, fontWeight: 500, color: "#777",
            fontFamily: theme.font, marginTop: 12,
            opacity: contextOpacity,
          }}>
            {data.context}
          </div>
        )}
      </div>
    </div>
  );
};
