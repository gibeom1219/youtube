import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { theme } from "../styles/theme";
import { useSceneTheme } from "../contexts/SceneTheme";

interface RankItem {
  rank: number;
  name: string;
  value: string;
  change?: string;
}

interface Props {
  data: {
    title: string;
    unit?: string;
    items: RankItem[];
  };
  durationFrames: number;
}

const MEDALS: Record<number, string> = { 1: "🥇", 2: "🥈", 3: "🥉" };

export const RankingList: React.FC<Props> = ({ data, durationFrames }) => {
  const theme = useSceneTheme();
  const frame = useCurrentFrame();
  if (!data) return null;
  const { fps } = useVideoConfig();

  const titleProgress = spring({ frame, fps, config: { damping: 100, stiffness: 10 } });
  const interval = Math.min((durationFrames * 0.65) / ((data.items ?? []).length + 1), 18);

  const glowPulse = (Math.sin(frame * 0.04) + 1) / 2;

  return (
    <div style={{
      width: "100%", height: "100%",
      display: "flex", flexDirection: "column",
      justifyContent: "center", padding: "60px 140px", gap: 0,
    }}>
      {/* 제목 */}
      <div style={{
        fontSize: 44, fontWeight: 900, color: theme.white,
        fontFamily: theme.font, marginBottom: 36,
        opacity: Math.min(1, titleProgress),
        transform: `translateY(${interpolate(Math.min(1, titleProgress), [0, 1], [-20, 0])}px)`,
      }}>
        {data.title}
      </div>

      {/* 순위 목록 */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {(data.items ?? []).map((item, i) => {
          const startFrame = Math.round(interval * (i + 1));
          const progress = spring({ frame: frame - startFrame, fps, config: { damping: 100, stiffness: 10 } });

          const settled = Math.max(0, frame - (startFrame + 20));
          const pulse = (Math.sin(settled * 0.05 + i * 1.1) + 1) / 2;

          // 1~3위는 강조
          const isTop3 = item.rank <= 3;
          const barWidth = interpolate(Math.min(1, progress), [0, 1], [0, 100 - i * 8]);

          // 변동 색상
          const changeColor =
            item.change?.startsWith("+") ? theme.green :
            item.change?.startsWith("-") ? theme.red :
            theme.grayLight;

          return (
            <div key={i} style={{
              display: "flex", alignItems: "center", gap: 24,
              opacity: Math.min(1, progress),
              transform: `translateX(${interpolate(Math.min(1, progress), [0, 1], [-60, 0])}px)`,
              position: "relative" as const,
            }}>
              {/* 배경 바 */}
              <div style={{
                position: "absolute" as const, left: 0, top: 0, bottom: 0,
                width: `${barWidth}%`,
                background: isTop3
                  ? `rgba(129,216,208,${0.05 + pulse * 0.04})`
                  : `rgba(255,255,255,${0.02 + pulse * 0.02})`,
                borderRadius: 10,
                transition: "none",
              }} />

              {/* 순위 배지 */}
              <div style={{
                width: 64, height: 64, borderRadius: "50%",
                background: isTop3 ? `rgba(129,216,208,0.22)` : `rgba(255,255,255,0.20)`,
                border: isTop3
                  ? `2px solid rgba(129,216,208,${0.5 + pulse * 0.3})`
                  : `1px solid rgba(255,255,255,0.22)`,
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0, zIndex: 1,
                boxShadow: isTop3 ? `0 0 ${8 + pulse * 10}px rgba(129,216,208,0.25)` : "none",
              }}>
                {MEDALS[item.rank] ? (
                  <span style={{ fontSize: 30, fontFamily: theme.font }}>{MEDALS[item.rank]}</span>
                ) : (
                  <span style={{
                    fontSize: 24, fontWeight: 900, color: theme.grayLight,
                    fontFamily: theme.font,
                  }}>
                    {item.rank}
                  </span>
                )}
              </div>

              {/* 이름 */}
              <div style={{
                flex: 1,
                fontSize: isTop3 ? 32 : 28, fontWeight: isTop3 ? 800 : 600,
                color: isTop3 ? theme.white : theme.grayLight,
                fontFamily: theme.font, zIndex: 1,
                padding: "16px 0",
              }}>
                {item.name}
              </div>

              {/* 값 */}
              <div style={{
                fontSize: isTop3 ? 34 : 28, fontWeight: 900,
                color: isTop3 ? theme.tiffany : theme.white,
                fontFamily: theme.font, zIndex: 1,
                minWidth: 120, textAlign: "right" as const,
              }}>
                {item.value}{data.unit ?? ""}
              </div>

              {/* 변동 */}
              {item.change && (
                <div style={{
                  fontSize: 24, fontWeight: 700, color: changeColor,
                  fontFamily: theme.font, zIndex: 1,
                  minWidth: 90, textAlign: "right" as const,
                }}>
                  {item.change}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
