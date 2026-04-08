import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { useSceneTheme } from "../contexts/SceneTheme";

interface Props {
  data: {
    text: string;
    highlight?: string;
    sub?: string;
    speed?: number;
  };
}

export const TextReveal: React.FC<Props> = ({ data }) => {
  const theme = useSceneTheme();
  const frame = useCurrentFrame();
  if (!data) return null;
  const speed = data.speed ?? 2;

  const text = data.text;
  const totalChars = text.length;
  const visibleChars = Math.min(totalChars, Math.floor(frame / speed));
  const displayText = text.slice(0, visibleChars);
  const isDone = visibleChars >= totalChars;

  // 커서 깜빡임
  const cursorVisible = !isDone && Math.floor(frame / 8) % 2 === 0;

  const subOpacity = isDone
    ? interpolate(frame, [totalChars * speed, totalChars * speed + 14], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })
    : 0;

  // 하이라이트 처리 (타이핑 완료 후)
  const renderText = () => {
    if (!isDone || !data.highlight) return displayText;
    const idx = (text ?? "").indexOf(data.highlight ?? "");
    if (idx === -1) return displayText;

    const highlightDelay = totalChars * speed + 10;
    const hlOpacity = interpolate(frame, [highlightDelay, highlightDelay + 10], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

    return (
      <>
        {text.slice(0, idx)}
        <span style={{
          position: "relative" as const,
          color: "#81D8D0",
          textShadow: `0 0 ${30 * hlOpacity}px rgba(129,216,208,0.5)`,
        }}>
          {data.highlight}
        </span>
        {text.slice(idx + (data.highlight ?? []).length)}
      </>
    );
  };

  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      <div style={{
        position: "absolute", top: 0, bottom: 0, left: 0, right: 0,
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        padding: "0 200px",
        zIndex: 3,
      }}>
        {/* 메인 텍스트 */}
        <div style={{
          fontSize: 62, fontWeight: 900, color: "#fff",
          fontFamily: theme.font, lineHeight: 1.4,
          textAlign: "center",
          textShadow: "0 2px 20px rgba(0,0,0,0.5)",
        }}>
          {renderText()}
          {/* 커서 */}
          {!isDone && (
            <span style={{
              display: "inline-block",
              width: 4, height: 60,
              background: "#81D8D0",
              marginLeft: 4,
              verticalAlign: "middle",
              opacity: cursorVisible ? 1 : 0,
            }} />
          )}
        </div>

        {/* 보조 텍스트 */}
        {data.sub && (
          <div style={{
            fontSize: 30, fontWeight: 500,
            color: "rgba(255,255,255,0.6)",
            fontFamily: theme.font, marginTop: 28,
            opacity: subOpacity, textAlign: "center",
          }}>
            {data.sub}
          </div>
        )}
      </div>
    </div>
  );
};
