import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { useSceneTheme } from "../contexts/SceneTheme";

interface Props {
  data: {
    quote: string;
    highlight?: string;
    source: string;
    context?: string;
    side?: "left" | "right";
  };
}

export const DarkQuote: React.FC<Props> = ({ data }) => {
  const theme = useSceneTheme();
  const frame = useCurrentFrame();
  if (!data) return null;
  const side = data.side ?? "left";
  const isLeft = side === "left";

  const quoteOpacity = interpolate(frame, [0, 16], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const quoteSlide = interpolate(frame, [0, 16], [30, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const sourceOpacity = interpolate(frame, [16, 28], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const lineHeight = interpolate(frame, [8, 20], [0, 80], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const renderQuote = () => {
    const { quote, highlight } = data;
    if (!highlight) return quote;
    const idx = (quote ?? "").indexOf(highlight ?? "");
    if (idx === -1) return quote;
    return (
      <>
        {quote.slice(0, idx)}
        <span style={{ color: "#81D8D0", fontWeight: 900 }}>{highlight}</span>
        {quote.slice(idx + highlight.length)}
      </>
    );
  };

  const contentStyle = isLeft
    ? { left: 160, right: "auto" as const }
    : { right: 160, left: "auto" as const };

  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      <div style={{
        position: "absolute", top: 180, bottom: 200,
        ...contentStyle,
        width: 720,
        display: "flex", flexDirection: "column",
        justifyContent: "center",
        zIndex: 3,
      }}>
        <div style={{
          fontSize: 100, fontWeight: 900, color: "#81D8D0",
          lineHeight: 0.6, marginBottom: 20, opacity: 0.3,
          fontFamily: "Georgia, serif",
        }}>
          "
        </div>

        <div style={{ display: "flex", gap: 20 }}>
          <div style={{
            width: 4, borderRadius: 2,
            background: "#81D8D0",
            height: lineHeight,
            flexShrink: 0,
          }} />
          <div style={{
            fontSize: 42, fontWeight: 800, color: "rgba(255,255,255,0.95)",
            fontFamily: theme.font, lineHeight: 1.5,
            opacity: quoteOpacity,
            transform: `translateX(${isLeft ? -quoteSlide : quoteSlide}px)`,
          }}>
            {renderQuote()}
          </div>
        </div>

        <div style={{
          marginTop: 28, paddingLeft: 24,
          opacity: sourceOpacity,
        }}>
          <div style={{
            fontSize: 28, fontWeight: 700, color: "rgba(255,255,255,0.7)",
            fontFamily: theme.font,
          }}>
            — {(data as any).speaker ? `${(data as any).speaker}, ` : ""}{data.source}
          </div>
          {data.context && (
            <div style={{
              fontSize: 22, fontWeight: 500, color: "rgba(255,255,255,0.4)",
              fontFamily: theme.font, marginTop: 8,
            }}>
              {data.context}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
