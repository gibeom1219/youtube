import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { theme } from "../styles/theme";
import { useSceneTheme } from "../contexts/SceneTheme";

interface LineItem {
  text: string;
  underline?: boolean;
  circle?: string;
}

interface Props {
  data: {
    lines: LineItem[];
    color?: string;
    title?: string;
  };
}

// SVG 손그림 스타일 원 경로 생성
const handDrawnEllipse = (cx: number, cy: number, rx: number, ry: number) => {
  const points: string[] = [];
  const steps = 60;
  for (let i = 0; i <= steps; i++) {
    const angle = (i / steps) * Math.PI * 2;
    // 약간의 불규칙성 추가 (손그림 느낌)
    const jitterX = Math.sin(angle * 7) * (rx * 0.03) + Math.cos(angle * 11) * (rx * 0.02);
    const jitterY = Math.cos(angle * 5) * (ry * 0.04) + Math.sin(angle * 9) * (ry * 0.02);
    const x = cx + (rx + jitterX) * Math.cos(angle);
    const y = cy + (ry + jitterY) * Math.sin(angle);
    points.push(`${i === 0 ? "M" : "L"} ${x} ${y}`);
  }
  return points.join(" ") + " Z";
};

export const MarkupText: React.FC<Props> = ({ data }) => {
  const theme = useSceneTheme();
  const frame = useCurrentFrame();
  if (!data) return null;
  const { fps } = useVideoConfig();

  const markupColor = data.color ?? "#FF44FF";

  const titleOpacity = interpolate(frame, [0, 12], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // 라인 수에 따라 폰트 크기 조정
  const lineCount = (data.lines ?? []).length;
  const fontSize = lineCount <= 2 ? 56 : lineCount <= 3 ? 48 : 40;

  return (
    <div style={{
      width: "100%", height: "100%",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      padding: "60px 120px", gap: 20,
    }}>
      {/* 선택적 타이틀 */}
      {data.title && (
        <div style={{
          fontSize: 34, fontWeight: 700, color: theme.grayLight,
          fontFamily: theme.font, marginBottom: 16, opacity: titleOpacity,
          textShadow: theme.textShadow.medium,
        }}>
          {data.title}
        </div>
      )}

      {/* 마크업 라인들 */}
      <div style={{
        display: "flex", flexDirection: "column",
        alignItems: "center", gap: 24,
      }}>
        {(data.lines ?? []).map((line, i) => {
          const lineDelay = 6 + i * 14;
          const textOpacity = interpolate(frame, [lineDelay, lineDelay + 10], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
          const textP = spring({ frame: frame - lineDelay, fps, config: { damping: 100, stiffness: 15 } });

          // 밑줄 애니메이션
          const underlineDelay = lineDelay + 10;
          const underlineProgress = interpolate(frame, [underlineDelay, underlineDelay + 15], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

          // 동그라미 애니메이션
          const circleDelay = lineDelay + 12;
          const circleProgress = interpolate(frame, [circleDelay, circleDelay + 18], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

          // 동그라미 키워드가 있으면 텍스트 분할
          const renderLine = () => {
            if (!line.circle || !line.text.includes(line.circle)) {
              return (
                <span style={{
                  fontSize, fontWeight: 900, color: theme.white,
                  fontFamily: theme.font, textShadow: theme.textShadow.strong,
                }}>
                  {line.text}
                </span>
              );
            }

            const idx = (line.text ?? "").indexOf(line.circle ?? "");
            const before = line.text.slice(0, idx);
            const keyword = line.circle;
            const after = line.text.slice(idx + keyword.length);

            return (
              <span style={{
                fontSize, fontWeight: 900, color: theme.white,
                fontFamily: theme.font, textShadow: theme.textShadow.strong,
              }}>
                {before}
                <span style={{ position: "relative", display: "inline-block" }}>
                  <span style={{ position: "relative", zIndex: 2, color: markupColor }}>
                    {keyword}
                  </span>
                  {/* 손그림 원 SVG */}
                  <svg
                    style={{
                      position: "absolute",
                      left: "-14%", top: "-20%",
                      width: "128%", height: "140%",
                      zIndex: 1, overflow: "visible",
                      pointerEvents: "none",
                    }}
                    viewBox="0 0 200 100"
                    preserveAspectRatio="none"
                  >
                    <path
                      d={handDrawnEllipse(100, 50, 96, 44)}
                      fill="none"
                      stroke={markupColor}
                      strokeWidth={3.5}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeDasharray={620}
                      strokeDashoffset={620 * (1 - circleProgress)}
                      opacity={0.9}
                    />
                  </svg>
                </span>
                {after}
              </span>
            );
          };

          return (
            <div key={i} style={{
              position: "relative", display: "inline-block",
              opacity: textOpacity,
              transform: `translateY(${interpolate(textP, [0, 1], [20, 0])}px)`,
            }}>
              {renderLine()}

              {/* 밑줄 (형광펜 스타일) */}
              {line.underline && (
                <div style={{
                  position: "absolute",
                  bottom: -2, left: 0,
                  width: `${underlineProgress * 100}%`,
                  height: fontSize * 0.22,
                  background: markupColor,
                  opacity: 0.5,
                  borderRadius: 4,
                  transform: "skewX(-2deg)",
                }} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
