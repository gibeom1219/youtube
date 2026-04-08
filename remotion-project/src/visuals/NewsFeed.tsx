import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { theme } from "../styles/theme";
import { useSceneTheme } from "../contexts/SceneTheme";

interface NewsItem {
  category: string;
  headline: string;
  sub?: string;
}

interface Props {
  data: {
    title: string;
    items: NewsItem[];
  };
  durationFrames: number;
}

const CATEGORY_COLORS: Record<string, string> = {
  "속보": "#FF6B6B",
  "분석": "#81D8D0",
  "시장": "#52D68A",
  "경제": "#A8E8E2",
  "기업": "#FFB347",
  "글로벌": "#C084FC",
  "주식": "#52D68A",
  "환율": "#FFB347",
  "금리": "#81D8D0",
};

export const NewsFeed: React.FC<Props> = ({ data, durationFrames }) => {
  const theme = useSceneTheme();
  const frame = useCurrentFrame();
  if (!data) return null;
  const { fps } = useVideoConfig();

  const titleProgress = spring({ frame, fps, config: { damping: 100, stiffness: 10 } });
  const lineProgress  = spring({ frame: frame - 10, fps, config: { damping: 120, stiffness: 10 } });
  const interval = Math.min((durationFrames * 0.65) / ((data.items ?? []).length + 1), 18);

  return (
    <div style={{
      width: "100%", height: "100%",
      display: "flex", flexDirection: "column",
      justifyContent: "center", padding: "60px 120px", gap: 0,
    }}>
      {/* 제목 */}
      <div style={{
        fontSize: 42, fontWeight: 900, color: theme.white,
        fontFamily: theme.font, marginBottom: 12,
        opacity: Math.min(1, titleProgress),
        transform: `translateY(${interpolate(Math.min(1, titleProgress), [0, 1], [-20, 0])}px)`,
      }}>
        {data.title}
      </div>

      {/* 구분선 */}
      <div style={{
        height: 3,
        width: `${interpolate(Math.min(1, lineProgress), [0, 1], [0, 100])}px`,
        background: theme.tiffany,
        borderRadius: 2,
        marginBottom: 36,
      }} />

      {/* 뉴스 목록 */}
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {(data.items ?? []).map((item, i) => {
          const startFrame = Math.round(interval * (i + 1));
          const progress = spring({ frame: frame - startFrame, fps, config: { damping: 100, stiffness: 10 } });

          const settled = Math.max(0, frame - (startFrame + 18));
          const pulse = (Math.sin(settled * 0.04 + i * 1.2) + 1) / 2;
          const bgAlpha = 0.04 + pulse * 0.04;

          const catColor = CATEGORY_COLORS[item.category] ?? theme.tiffany;

          return (
            <div key={i} style={{
              display: "flex", alignItems: "flex-start", gap: 20,
              padding: "18px 28px",
              background: `rgba(255,255,255,${bgAlpha})`,
              border: "1px solid rgba(255,255,255,0.07)",
              borderLeft: `4px solid ${catColor}`,
              borderRadius: "0 12px 12px 0",
              opacity: Math.min(1, progress),
              transform: `translateX(${interpolate(Math.min(1, progress), [0, 1], [-60, 0])}px)`,
            }}>
              {/* 카테고리 배지 */}
              <div style={{
                background: `${catColor}20`,
                border: `1px solid ${catColor}60`,
                borderRadius: 6,
                padding: "4px 14px",
                fontSize: 26, fontWeight: 800, color: catColor,
                fontFamily: theme.font,
                whiteSpace: "nowrap" as const,
                flexShrink: 0,
                marginTop: 2,
              }}>
                {item.category}
              </div>

              {/* 헤드라인 + 서브 */}
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <div style={{
                  fontSize: 30, fontWeight: 700, color: theme.white,
                  fontFamily: theme.font, lineHeight: 1.35,
                }}>
                  {item.headline}
                </div>
                {item.sub && (
                  <div style={{
                    fontSize: 28, color: theme.grayLight,
                    fontFamily: theme.font, fontWeight: 500,
                  }}>
                    {item.sub}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
