import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { useSceneTheme } from "../contexts/SceneTheme";

interface Props {
  data: {
    title: string;
    subtitle?: string;
    side?: "left" | "right";
    items: Array<{
      icon?: string;
      text: string;
      bold?: string;
      sub?: string;
    }>;
  };
}

export const SideInfo: React.FC<Props> = ({ data }) => {
  const theme = useSceneTheme();
  const frame = useCurrentFrame();
  if (!data) return null;
  const side = data.side ?? "left";
  const isLeft = side === "left";

  const titleOpacity = interpolate(frame, [0, 14], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const titleSlide = interpolate(frame, [0, 14], [30, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // 그라데이션 방향
  const gradient = isLeft
    ? "linear-gradient(90deg, rgba(240,240,236,0.95) 0%, rgba(240,240,236,0.92) 35%, rgba(240,240,236,0.7) 55%, rgba(240,240,236,0.3) 72%, transparent 88%)"
    : "linear-gradient(270deg, rgba(240,240,236,0.95) 0%, rgba(240,240,236,0.92) 35%, rgba(240,240,236,0.7) 55%, rgba(240,240,236,0.3) 72%, transparent 88%)";

  // 도화지 질감: 전체 커버 + 마스크로 페이드
  const textureMask = isLeft
    ? "linear-gradient(90deg, black 0%, black 30%, transparent 60%)"
    : "linear-gradient(270deg, black 0%, black 30%, transparent 60%)";
  const textureStyle = { left: 0, width: "100%", WebkitMaskImage: textureMask, maskImage: textureMask };

  // 콘텐츠 위치
  const contentStyle = isLeft
    ? { left: 180, right: "auto" as const }
    : { right: 180, left: "auto" as const };

  // 볼드 텍스트 렌더링
  const renderText = (text: string, bold?: string) => {
    if (!bold) return text;
    const idx = (text ?? "").indexOf(bold ?? "");
    if (idx === -1) return text;
    return (
      <>
        {text.slice(0, idx)}
        <span style={{ fontWeight: 900, color: "#e67e22", fontSize: "115%" }}>{bold}</span>
        {text.slice(idx + bold.length)}
      </>
    );
  };

  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      {/* 콘텐츠 — 오버레이는 FinanceVideo에서 SceneTransition 바깥에 렌더링 */}
      <div style={{
        position: "absolute", top: 200, bottom: 180,
        ...contentStyle,
        width: 700,
        display: "flex", flexDirection: "column",
        zIndex: 3,
      }}>
        {/* 타이틀 */}
        <div style={{
          fontSize: 52, fontWeight: 900, color: "#000",
          fontFamily: theme.font, marginBottom: 8,
          opacity: titleOpacity, letterSpacing: -1,
          transform: `translateX(${isLeft ? -titleSlide : titleSlide}px)`,
          lineHeight: 1.3,
        }}>
          {data.title}
        </div>

        {/* 서브타이틀 */}
        {data.subtitle && (
          <div style={{
            fontSize: 28, fontWeight: 600, color: "#555",
            fontFamily: theme.font, marginBottom: 24,
            opacity: titleOpacity,
          }}>
            {data.subtitle}
          </div>
        )}

        {/* 구분선 */}
        <div style={{
          width: 80, height: 4, borderRadius: 2,
          background: "#111", marginBottom: 28,
          opacity: interpolate(frame, [10, 18], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
        }} />

        {/* 항목들 */}
        <div style={{
          flex: 1, display: "flex", flexDirection: "column",
          gap: 18, justifyContent: "flex-start",
        }}>
          {(data.items ?? []).map((item, i) => {
            const delay = 12 + i * 6;
            const itemOpacity = interpolate(frame, [delay, delay + 10], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
            const itemSlide = interpolate(frame, [delay, delay + 12], [24, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

            return (
              <div key={i} style={{
                display: "flex", alignItems: "flex-start", gap: 16,
                opacity: itemOpacity,
                transform: `translateY(${itemSlide}px)`,
              }}>
                {/* 아이콘 또는 불릿 */}
                {item.icon ? (
                  <span style={{ fontSize: 32, flexShrink: 0, marginTop: 2, fontFamily: theme.font }}>{item.icon}</span>
                ) : (
                  <div style={{
                    width: 10, height: 10, borderRadius: "50%",
                    background: "#111", flexShrink: 0, marginTop: 14,
                  }} />
                )}

                {/* 텍스트 */}
                <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                  <span style={{
                    fontSize: 34, fontWeight: 700, color: "#111",
                    fontFamily: theme.font, lineHeight: 1.5,
                  }}>
                    {renderText(item.text, item.bold)}
                  </span>
                  {item.sub && (
                    <span style={{
                      fontSize: 24, fontWeight: 500, color: "#666",
                      fontFamily: theme.font, lineHeight: 1.4,
                    }}>
                      {item.sub}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
