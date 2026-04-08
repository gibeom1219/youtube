import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { theme } from "../styles/theme";
import { useSceneTheme } from "../contexts/SceneTheme";

interface Props {
  data: {
    keyword: string;
    description: string;
    sub_points?: string[];
  };
}

export const Keyword: React.FC<Props> = ({ data }) => {
  const theme = useSceneTheme();
  const frame = useCurrentFrame();
  if (!data) return null;
  const { fps } = useVideoConfig();

  // Support both field name variants (keyword/description and term/definition)
  const keywordText = (data as any).term ?? data.keyword ?? "";
  const descriptionText = (data as any).definition ?? data.description ?? "";

  const kwProgress = spring({ frame, fps, config: { damping: 100, stiffness: 10 } });
  const lineProgress = spring({ frame: frame - 14, fps, config: { damping: 120, stiffness: 10 } });
  const descProgress = spring({ frame: frame - 26, fps, config: { damping: 100, stiffness: 10 } });

  // 글로우 펄싱 (위치 이동 없음)
  const glowPulse = (Math.sin(frame * 0.05) + 1) / 2;
  const glowIntensity = 15 + glowPulse * 25;
  const glowOpacity = 0.1 + glowPulse * 0.1;
  const lineWave = 110 + Math.sin(frame * 0.04) * 12;

  return (
    <div style={{
      width: "100%", height: "100%",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      padding: "0 140px", gap: 36,
    }}>
      {/* 키워드 */}
      <div style={{
        position: "relative",
        opacity: Math.min(1, kwProgress),
        transform: `scale(${interpolate(Math.min(1, kwProgress), [0, 1], [0.82, 1])})`,
      }}>
        <div style={{
          position: "absolute", inset: -20,
          background: `radial-gradient(ellipse, rgba(129,216,208,${glowOpacity}) 0%, transparent 70%)`,
          filter: `blur(${glowIntensity}px)`,
          borderRadius: 16,
        }} />
        <div style={{
          fontSize: 100, fontWeight: 900, color: theme.white,
          fontFamily: theme.font, textAlign: "center" as const,
          lineHeight: 1.15,
          textShadow: `${theme.textShadow.medium}, 0 0 ${40 + glowPulse * 20}px rgba(129,216,208,${0.1 + glowPulse * 0.08})`,
          position: "relative",
        }}>
          {keywordText}
        </div>
      </div>

      {/* 양방향 라인 */}
      <div style={{ display: "flex", alignItems: "center", gap: 16, width: "100%", justifyContent: "center" }}>
        <div style={{
          height: 2, background: `linear-gradient(90deg, transparent, ${theme.tiffany})`,
          borderRadius: 1, width: `${lineWave}px`,
        }} />
        <div style={{
          width: 8, height: 8, borderRadius: "50%",
          background: theme.tiffany,
          boxShadow: `0 0 ${10 + glowPulse * 10}px ${theme.tiffany}`,
          flexShrink: 0,
          opacity: Math.min(1, lineProgress),
        }} />
        <div style={{
          height: 2, background: `linear-gradient(90deg, ${theme.tiffany}, transparent)`,
          borderRadius: 1, width: `${lineWave}px`,
        }} />
      </div>

      {/* 설명 */}
      <div style={{
        fontSize: 44, color: theme.grayLight,
        fontFamily: theme.font, textAlign: "center" as const,
        fontWeight: 500, lineHeight: 1.6,
        opacity: Math.min(1, descProgress),
        transform: `translateY(${interpolate(Math.min(1, descProgress), [0, 1], [24, 0])}px)`,
        whiteSpace: "nowrap" as const,
      }}>
        {descriptionText}
      </div>

      {/* 서브 포인트 태그 */}
      {data.sub_points && (
        <div style={{ display: "flex", gap: 20, marginTop: 8, flexWrap: "wrap" as const, justifyContent: "center" as const }}>
          {(data.sub_points ?? []).map((point, i) => {
            const p = spring({ frame: frame - 40 - i * 18, fps, config: { damping: 100, stiffness: 10 } });
            return (
              <div key={i} style={{
                background: `rgba(129,216,208,0.1)`,
                border: `1px solid rgba(129,216,208,0.4)`,
                borderRadius: 50,
                padding: "14px 32px",
                fontSize: 28, color: theme.tiffany,
                fontFamily: theme.font, fontWeight: 700,
                opacity: Math.min(1, p),
                transform: `scale(${interpolate(Math.min(1, p), [0, 1], [0.75, 1])})`,
                boxShadow: `0 0 ${10 + glowPulse * 10}px rgba(129,216,208,0.1)`,
                textShadow: theme.textShadow.light,
              }}>
                {point}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
