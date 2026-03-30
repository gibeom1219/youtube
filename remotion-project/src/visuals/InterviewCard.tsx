import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { theme } from "../styles/theme";

interface Props {
  data: {
    question: string;
    answer: string;
    speaker: string;
    role?: string;
    avatar?: string;   // 이모지 아바타
    interviewer?: string;
  };
}

export const InterviewCard: React.FC<Props> = ({ data }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const qProgress = spring({ frame,         fps, config: { damping: 100, stiffness: 10 } });
  const aProgress = spring({ frame: frame - 16, fps, config: { damping: 100, stiffness: 5 } });
  const speakerProgress = spring({ frame: frame - 28, fps, config: { damping: 100, stiffness: 10 } });

  const glowPulse = (Math.sin(frame * 0.04) + 1) / 2;
  const accentColor = theme.tiffany;
  const avatar = data.avatar ?? "🎙️";

  return (
    <div style={{
      width: "100%", height: "100%",
      display: "flex", flexDirection: "column",
      justifyContent: "center", padding: "50px 130px",
      gap: 28,
    }}>
      {/* 질문 */}
      <div style={{
        background: "rgba(255,255,255,0.05)",
        border: "1px solid rgba(255,255,255,0.15)",
        borderRadius: "20px 20px 20px 4px",
        padding: "28px 36px",
        opacity: Math.min(1, qProgress),
        transform: `translateY(${interpolate(Math.min(1, qProgress), [0, 1], [-24, 0])}px)`,
      }}>
        <div style={{
          fontSize: 28, color: theme.grayLight, fontFamily: theme.font,
          fontWeight: 700, marginBottom: 10, letterSpacing: 0.5,
        }}>
          {data.interviewer ? data.interviewer : "Q"}
        </div>
        <div style={{
          fontSize: 34, fontWeight: 700, color: theme.white,
          fontFamily: theme.font, lineHeight: 1.45,
        }}>
          {data.question}
        </div>
      </div>

      {/* 답변 */}
      <div style={{
        background: `${accentColor}0C`,
        border: `2px solid ${accentColor}40`,
        borderRadius: "4px 20px 20px 20px",
        padding: "28px 36px",
        opacity: Math.min(1, aProgress),
        transform: `translateY(${interpolate(Math.min(1, aProgress), [0, 1], [24, 0])}px)`,
        boxShadow: `0 0 ${20 + glowPulse * 14}px ${accentColor}15`,
      }}>
        <div style={{
          fontSize: 28, color: accentColor, fontFamily: theme.font,
          fontWeight: 700, marginBottom: 10, letterSpacing: 0.5,
        }}>
          A
        </div>
        <div style={{
          fontSize: 34, fontWeight: 600, color: theme.white,
          fontFamily: theme.font, lineHeight: 1.5,
        }}>
          {data.answer}
        </div>
      </div>

      {/* 발언자 */}
      <div style={{
        display: "flex", alignItems: "center", gap: 20,
        alignSelf: "flex-end",
        opacity: Math.min(1, speakerProgress),
        transform: `translateX(${interpolate(Math.min(1, speakerProgress), [0, 1], [40, 0])}px)`,
      }}>
        <div style={{
          width: 52, height: 52, borderRadius: "50%",
          background: `${accentColor}18`,
          border: `2px solid ${accentColor}50`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 28, fontFamily: theme.font,
        }}>
          {avatar}
        </div>
        <div>
          <div style={{
            fontSize: 28, fontWeight: 800, color: accentColor,
            fontFamily: theme.font,
          }}>
            {data.speaker}
          </div>
          {data.role && (
            <div style={{
              fontSize: 24, color: theme.grayLight, fontFamily: theme.font,
            }}>
              {data.role}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
