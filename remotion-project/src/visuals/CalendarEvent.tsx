import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { theme } from "../styles/theme";

interface CalEvent {
  date: string;
  event: string;
  importance?: "high" | "medium" | "low";
  expected?: string;
  result?: string;
}

interface Props {
  data: {
    month: string;
    events: CalEvent[];
    subtitle?: string;
  };
}

const IMPORTANCE_CONFIG = {
  high:   { color: "#FF6B6B", dot: "🔴", label: "중요" },
  medium: { color: "#FFB347", dot: "🟡", label: "보통" },
  low:    { color: "#81D8D0", dot: "🔵", label: "일반" },
};

export const CalendarEvent: React.FC<Props> = ({ data }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headerProgress = spring({ frame, fps, config: { damping: 100, stiffness: 10 } });
  const glowPulse = (Math.sin(frame * 0.04) + 1) / 2;

  return (
    <div style={{
      width: "100%", height: "100%",
      display: "flex", flexDirection: "column",
      justifyContent: "center", padding: "40px 120px", gap: 24,
    }}>
      {/* 헤더 */}
      <div style={{
        display: "flex", alignItems: "center", gap: 20,
        opacity: Math.min(1, headerProgress),
        transform: `translateY(${interpolate(Math.min(1, headerProgress), [0, 1], [-20, 0])}px)`,
      }}>
        <div style={{ fontSize: 48, fontFamily: theme.font }}>📅</div>
        <div>
          <div style={{
            fontSize: 42, fontWeight: 900, color: theme.white, fontFamily: theme.font,
          }}>
            {data.month}
          </div>
          {data.subtitle && (
            <div style={{
              fontSize: 28, color: theme.grayLight, fontFamily: theme.font,
            }}>
              {data.subtitle}
            </div>
          )}
        </div>
      </div>

      {/* 이벤트 목록 */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {data.events.map((evt, i) => {
          const p = spring({
            frame: frame - 10 - i * 10,
            fps, config: { damping: 100, stiffness: 5 },
          });
          const imp = IMPORTANCE_CONFIG[evt.importance ?? "medium"];

          return (
            <div key={i} style={{
              display: "flex", alignItems: "stretch", gap: 0,
              opacity: Math.min(1, p),
              transform: `translateX(${interpolate(Math.min(1, p), [0, 1], [-40, 0])}px)`,
              background: `${imp.color}08`,
              border: `1px solid ${imp.color}30`,
              borderRadius: 16, overflow: "hidden",
            }}>
              {/* 날짜 컬럼 */}
              <div style={{
                background: `${imp.color}18`,
                padding: "16px 20px",
                display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "center",
                minWidth: 90, flexShrink: 0,
                borderRight: `1px solid ${imp.color}20`,
              }}>
                <div style={{ fontSize: 26, fontFamily: theme.font }}>{imp.dot}</div>
                <div style={{
                  fontSize: 28, fontWeight: 900, color: imp.color,
                  fontFamily: theme.font, marginTop: 4, textAlign: "center",
                }}>
                  {evt.date}
                </div>
              </div>

              {/* 내용 */}
              <div style={{ flex: 1, padding: "16px 24px" }}>
                <div style={{
                  fontSize: 26, fontWeight: 700, color: theme.white,
                  fontFamily: theme.font, lineHeight: 1.3,
                }}>
                  {evt.event}
                </div>
                <div style={{ display: "flex", gap: 16, marginTop: 6, flexWrap: "wrap" as const }}>
                  {evt.expected && (
                    <div style={{
                      fontSize: 24, color: theme.grayLight, fontFamily: theme.font,
                    }}>
                      예상: <span style={{ color: "#FFB347" }}>{evt.expected}</span>
                    </div>
                  )}
                  {evt.result && (
                    <div style={{
                      fontSize: 24, color: theme.grayLight, fontFamily: theme.font,
                    }}>
                      결과: <span style={{ color: "#52D68A" }}>{evt.result}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
