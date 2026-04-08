import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { useSceneTheme } from "../contexts/SceneTheme";

interface Props {
  data: {
    headline: string;
    highlight?: string;
    body: string;
    source: string;
    date?: string;
  };
}

export const NewspaperClip: React.FC<Props> = ({ data }) => {
  const theme = useSceneTheme();
  const frame = useCurrentFrame();
  if (!data) return null;

  const clipOpacity = interpolate(frame, [0, 16], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const clipRotate = interpolate(frame, [0, 16], [-2, -0.5], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const highlightWidth = interpolate(frame, [20, 35], [0, 100], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const bodyOpacity = interpolate(frame, [18, 30], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const renderHeadline = () => {
    const { headline, highlight } = data;
    if (!highlight) return headline;
    const idx = (headline ?? "").indexOf(highlight ?? "");
    if (idx === -1) return headline;
    return (
      <>
        {headline.slice(0, idx)}
        <span style={{
          position: "relative" as const,
          display: "inline" as const,
        }}>
          {/* 형광펜 효과 */}
          <span style={{
            position: "absolute" as const,
            bottom: 2, left: -4, right: -4,
            height: "45%",
            background: "rgba(255,230,0,0.5)",
            width: `${highlightWidth}%`,
            zIndex: -1,
            borderRadius: 2,
          }} />
          {highlight}
        </span>
        {headline.slice(idx + highlight.length)}
      </>
    );
  };

  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      <div style={{
        position: "absolute", top: 0, bottom: 0, left: 0, right: 0,
        display: "flex", alignItems: "center", justifyContent: "center",
        zIndex: 3,
      }}>
        {/* 신문 스크랩 카드 */}
        <div style={{
          width: 820, padding: "60px 56px 72px",
          background: "#f5f0e8",
          borderRadius: 4,
          boxShadow: "4px 6px 24px rgba(0,0,0,0.4), 0 0 0 1px rgba(0,0,0,0.05)",
          transform: `rotate(${clipRotate}deg)`,
          opacity: clipOpacity,
          position: "relative" as const,
        }}>
          {/* 테이프 장식 */}
          <div style={{
            position: "absolute" as const,
            top: -14, left: "50%", transform: "translateX(-50%) rotate(1deg)",
            width: 120, height: 28,
            background: "rgba(255,230,150,0.7)",
            borderRadius: 2,
            boxShadow: "0 1px 4px rgba(0,0,0,0.15)",
          }} />

          {/* 신문사 + 날짜 */}
          <div style={{
            display: "flex", justifyContent: "space-between",
            marginBottom: 16, paddingBottom: 12,
            borderBottom: "2px solid #222",
          }}>
            <span style={{
              fontSize: 20, fontWeight: 800, color: "#333",
              fontFamily: theme.font, letterSpacing: 3,
              textTransform: "uppercase" as const,
            }}>
              {data.source}
            </span>
            {data.date && (
              <span style={{
                fontSize: 18, fontWeight: 500, color: "#888",
                fontFamily: theme.font,
              }}>
                {data.date}
              </span>
            )}
          </div>

          {/* 헤드라인 */}
          <div style={{
            fontSize: 44, fontWeight: 900, color: "#111",
            fontFamily: "Georgia, 'NotoSansKR', serif",
            lineHeight: 1.3, marginBottom: 24,
          }}>
            {renderHeadline()}
          </div>

          {/* 구분선 */}
          <div style={{
            width: "100%", height: 1,
            background: "#ccc", marginBottom: 20,
          }} />

          {/* 본문 */}
          <div style={{
            fontSize: 26, fontWeight: 500, color: "#444",
            fontFamily: theme.font, lineHeight: 1.8,
            opacity: bodyOpacity,
          }}>
            {data.body}
          </div>
        </div>
      </div>
    </div>
  );
};
