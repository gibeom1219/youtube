import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { theme } from "../styles/theme";

interface TimelineItem {
  label: string;
  value: string;
  note?: string;
}

interface Props {
  data: {
    title: string;
    items: TimelineItem[];
  };
  durationFrames: number;
  accentColor?: string;
}

export const Timeline: React.FC<Props> = ({ data, durationFrames, accentColor = theme.tiffany }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Support both field name variants: items[] or events[{date,title,description}]
  const rawEvents = (data as any).events;
  const items: TimelineItem[] = rawEvents
    ? rawEvents.map((e: any) => ({ label: e.date ?? e.label ?? "", value: e.title ?? e.value ?? "", note: e.description ?? e.note }))
    : data.items ?? [];

  const titleProgress = spring({ frame, fps, config: { damping: 100, stiffness: 25 } });
  const lineProgress = spring({ frame: frame - 5, fps, config: { damping: 120, stiffness: 15 } });
  const interval = Math.min((durationFrames * 0.55) / items.length, 18);

  return (
    <div style={{
      width: "100%", height: "100%",
      display: "flex", flexDirection: "column",
      justifyContent: "center", padding: "60px 100px",
    }}>
      {/* 제목 */}
      <div style={{
        fontSize: 44, fontWeight: 900, color: theme.white,
        fontFamily: theme.font, marginBottom: 64, textAlign: "center" as const,
        opacity: Math.min(1, titleProgress),
        transform: `translateY(${interpolate(Math.min(1, titleProgress), [0, 1], [-20, 0])}px)`,
      }}>
        <span style={{ color: accentColor }}>//</span> {data.title}
      </div>

      {/* 타임라인 */}
      <div style={{ position: "relative", padding: "0 40px" }}>
        {/* 배경 라인 */}
        <div style={{
          position: "absolute", top: 28, left: 40, right: 40, height: 2,
          background: "rgba(129,216,208,0.1)", borderRadius: 1,
        }} />
        {/* 진행 라인 */}
        <div style={{
          position: "absolute", top: 28, left: 40, height: 2,
          width: `${interpolate(Math.min(1, lineProgress), [0, 1], [0, 100])}%`,
          maxWidth: "calc(100% - 80px)",
          background: `linear-gradient(90deg, ${accentColor}, ${accentColor}70)`,
          borderRadius: 1,
          boxShadow: `0 0 10px rgba(129,216,208,0.6)`,
        }} />

        {/* 노드들 */}
        <div style={{ display: "flex", justifyContent: "space-between", position: "relative" }}>
          {items.map((item, i) => {
            const startFrame = Math.round(interval * i + 8);
            const progress = spring({ frame: frame - startFrame, fps, config: { damping: 100, stiffness: 80 } });

            // 도트 글로우 펄싱 (위치 이동 없음)
            const settled = Math.max(0, frame - (startFrame + 15));
            const glow = (Math.sin(settled * 0.07 + i * 1.5) + 1) / 2;
            const glowSize = 18 + glow * 18;
            const glowOpacity = 0.35 + glow * 0.35;

            return (
              <div key={i} style={{
                display: "flex", flexDirection: "column", alignItems: "center",
                flex: 1, opacity: Math.min(1, progress),
              }}>
                {/* 도트 */}
                <div style={{
                  width: 56, height: 56, borderRadius: "50%",
                  background: `rgba(129,216,208,0.15)`,
                  border: `3px solid ${accentColor}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  boxShadow: `0 0 ${glowSize}px rgba(129,216,208,${glowOpacity})`,
                  transform: `scale(${interpolate(Math.min(1, progress), [0, 1], [0, 1])})`,
                  zIndex: 1, position: "relative",
                }}>
                  <div style={{ width: 16, height: 16, borderRadius: "50%", background: accentColor }} />
                </div>

                {/* 카드 */}
                <div style={{
                  marginTop: 24,
                  background: "rgba(129,216,208,0.05)",
                  border: `1px solid rgba(129,216,208,0.2)`,
                  borderRadius: 12,
                  padding: "16px 20px",
                  textAlign: "center" as const,
                  width: "90%",
                  transform: `translateY(${interpolate(Math.min(1, progress), [0, 1], [16, 0])}px)`,
                }}>
                  <div style={{
                    fontSize: 22, fontWeight: 900, color: accentColor,
                    fontFamily: theme.font, marginBottom: 6,
                  }}>
                    {item.label}
                  </div>
                  <div style={{
                    fontSize: 30, fontWeight: 900, color: theme.white,
                    fontFamily: theme.font, lineHeight: 1.2,
                  }}>
                    {item.value}
                  </div>
                  {item.note && (
                    <div style={{
                      fontSize: 17, color: theme.gray,
                      fontFamily: theme.font, marginTop: 8, lineHeight: 1.4,
                    }}>
                      {item.note}
                    </div>
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
