import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { useSceneTheme } from "../contexts/SceneTheme";

interface Props {
  data: {
    title?: string;
    notes: Array<{
      text: string;
      color?: string;
      pin?: string;
    }>;
  };
}

const NOTE_COLORS = ["#fff9c4", "#c8e6c9", "#bbdefb", "#f8bbd0", "#ffe0b2", "#e1bee7"];
const NOTE_ROTATIONS = [-3, 2, -1.5, 2.5, -2, 1.8];
// 최대 3+3 레이아웃: 상단 3개, 하단 3개
const NOTE_POSITIONS = [
  { x: 200, y: 180 },
  { x: 680, y: 160 },
  { x: 1160, y: 190 },
  { x: 320, y: 510 },
  { x: 800, y: 490 },
  { x: 1260, y: 520 },
];

export const PostItBoard: React.FC<Props> = ({ data }) => {
  const theme = useSceneTheme();
  const frame = useCurrentFrame();
  if (!data) return null;

  const titleOpacity = interpolate(frame, [0, 14], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      {/* 타이틀 */}
      {data.title && (
        <div style={{
          position: "absolute", top: 60, left: 0, right: 0,
          textAlign: "center", zIndex: 3,
          opacity: titleOpacity,
        }}>
          <span style={{
            fontSize: 56, fontWeight: 900, color: "#fff",
            fontFamily: theme.font, letterSpacing: -1,
            textShadow: "0 2px 20px rgba(0,0,0,0.5)",
          }}>
            {data.title}
          </span>
        </div>
      )}

      {/* 포스트잇들 */}
      {(data.notes ?? []).map((note, i) => {
        const delay = 6 + i * 8;
        const noteOpacity = interpolate(frame, [delay, delay + 6], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
        const noteDrop = interpolate(frame, [delay, delay + 8], [-40, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
        const noteRotate = NOTE_ROTATIONS[i % NOTE_ROTATIONS.length];
        const pos = NOTE_POSITIONS[i % NOTE_POSITIONS.length];
        const bgColor = note.color ?? NOTE_COLORS[i % NOTE_COLORS.length];

        return (
          <div key={i} style={{
            position: "absolute",
            left: pos.x, top: pos.y,
            width: 340, minHeight: 220,
            background: bgColor,
            borderRadius: 2,
            padding: "40px 24px 24px",
            boxShadow: "3px 4px 12px rgba(0,0,0,0.25)",
            transform: `rotate(${noteRotate}deg) translateY(${noteDrop}px)`,
            opacity: noteOpacity,
            zIndex: 3 + i,
          }}>
            {/* 핀/테이프 */}
            <div style={{
              position: "absolute",
              top: 8, left: "50%", transform: "translateX(-50%)",
              fontSize: 30,
              fontFamily: theme.font,
            }}>
              {note.pin ?? "📌"}
            </div>

            {/* 텍스트 */}
            <div style={{
              fontSize: 32, fontWeight: 700, color: "#333",
              fontFamily: "'NotoSansKR', sans-serif",
              lineHeight: 1.5,
              wordBreak: "keep-all" as const,
            }}>
              {note.text}
            </div>
          </div>
        );
      })}
    </div>
  );
};
