import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { theme } from "../styles/theme";

interface CheckItem {
  text: string;
  checked: boolean;
  note?: string;
}

interface Props {
  data: {
    title: string;
    items: CheckItem[];
    subtitle?: string;
  };
}

export const Checklist: React.FC<Props> = ({ data }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleProgress = spring({ frame, fps, config: { damping: 100, stiffness: 10 } });
  const glowPulse = (Math.sin(frame * 0.04) + 1) / 2;

  const checkedColor   = "#52D68A";
  const uncheckedColor = "#FF6B6B";

  return (
    <div style={{
      width: "100%", height: "100%",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      padding: "50px 140px", gap: 0,
    }}>
      {/* 제목 */}
      <div style={{
        fontSize: 42, fontWeight: 900, color: theme.white,
        fontFamily: theme.font, textAlign: "center",
        marginBottom: data.subtitle ? 8 : 36,
        opacity: Math.min(1, titleProgress),
        transform: `translateY(${interpolate(Math.min(1, titleProgress), [0, 1], [-20, 0])}px)`,
      }}>
        {data.title}
      </div>

      {data.subtitle && (
        <div style={{
          fontSize: 24, color: theme.grayLight, fontFamily: theme.font,
          fontWeight: 500, textAlign: "center", marginBottom: 32,
          opacity: Math.min(1, titleProgress),
        }}>
          {data.subtitle}
        </div>
      )}

      {/* 체크리스트 */}
      <div style={{
        width: "100%", display: "flex", flexDirection: "column", gap: 16,
      }}>
        {data.items.map((item, i) => {
          const itemProgress = spring({
            frame: frame - 8 - i * 12,
            fps, config: { damping: 100, stiffness: 10 },
          });
          const color = item.checked ? checkedColor : uncheckedColor;
          const icon  = item.checked ? "✅" : "❌";

          return (
            <div key={i} style={{
              display: "flex", alignItems: "flex-start", gap: 20,
              background: `${color}08`,
              border: `1px solid ${color}30`,
              borderRadius: 16, padding: "20px 28px",
              opacity: Math.min(1, itemProgress),
              transform: `translateX(${interpolate(Math.min(1, itemProgress), [0, 1], [-40, 0])}px)`,
            }}>
              <div style={{
                fontSize: 30, flexShrink: 0, lineHeight: 1.3,
                fontFamily: theme.font,
              }}>
                {icon}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{
                  fontSize: 28, fontWeight: 700, color: theme.white,
                  fontFamily: theme.font, lineHeight: 1.35,
                  textDecoration: item.checked ? "none" : "none",
                }}>
                  {item.text}
                </div>
                {item.note && (
                  <div style={{
                    fontSize: 20, color: theme.grayLight,
                    fontFamily: theme.font, marginTop: 6, lineHeight: 1.4,
                  }}>
                    {item.note}
                  </div>
                )}
              </div>
              {/* 오른쪽 상태 라벨 */}
              <div style={{
                fontSize: 18, fontWeight: 800, color,
                fontFamily: theme.font, letterSpacing: 0.5,
                flexShrink: 0, alignSelf: "center",
                opacity: 0.8 + glowPulse * 0.2,
              }}>
                {item.checked ? "충족" : "미충족"}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
