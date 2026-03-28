import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { theme } from "../styles/theme";

interface Props {
  data: { text: string; emphasis?: string; sub?: string; icon?: string };
}

export const HighlightQuote: React.FC<Props> = ({ data }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const quoteMarkP = spring({ frame, fps, config: { damping: 100, stiffness: 10 } });
  const quoteMarkOpacity = interpolate(frame, [0, 14], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const textP = spring({ frame: frame - 10, fps, config: { damping: 100, stiffness: 10 } });
  const textOpacity = interpolate(frame, [10, 24], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const subOpacity = interpolate(frame, [22, 34], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Glow pulse after text appears
  const glowPhase = Math.max(0, frame - 30);
  const glow = (Math.sin(glowPhase * 0.04) + 1) / 2;

  // Highlight emphasis word in text
  const renderText = () => {
    if (!data.emphasis || !data.text.includes(data.emphasis)) {
      return <span>{data.text}</span>;
    }
    const parts = data.text.split(data.emphasis);
    return (
      <>
        {parts[0]}
        <span style={{ color: theme.tiffany, textShadow: `0 0 20px rgba(129,216,208,0.4)` }}>{data.emphasis}</span>
        {parts.slice(1).join(data.emphasis)}
      </>
    );
  };

  return (
    <div style={{
      width: "100%", height: "100%", display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center", padding: "80px 140px",
    }}>
      {/* Icon or quote mark */}
      <div style={{
        opacity: quoteMarkOpacity, transform: `scale(${interpolate(quoteMarkP, [0, 1], [0.5, 1])})`,
        marginBottom: 30,
      }}>
        {data.icon ? (
          <span style={{ fontSize: 72, fontFamily: theme.font }}>{data.icon}</span>
        ) : (
          <div style={{ fontSize: 120, color: `${theme.tiffany}30`, fontFamily: theme.font, lineHeight: 0.6, fontWeight: 900 }}>
            "
          </div>
        )}
      </div>

      {/* Main text */}
      <div style={{
        fontSize: 48, fontWeight: 700, color: theme.white, fontFamily: theme.font,
        textAlign: "center", lineHeight: 1.5, maxWidth: 1200,
        opacity: textOpacity, transform: `translateY(${interpolate(textP, [0, 1], [20, 0])}px)`,
        textShadow: `0 0 ${30 + glow * 20}px rgba(129,216,208,${0.05 + glow * 0.1})`,
      }}>
        {renderText()}
      </div>

      {/* Sub text */}
      {data.sub && (
        <div style={{
          fontSize: 26, color: theme.grayLight, fontFamily: theme.font,
          textAlign: "center", marginTop: 30, opacity: subOpacity,
          maxWidth: 900, lineHeight: 1.5,
        }}>
          {data.sub}
        </div>
      )}
    </div>
  );
};
