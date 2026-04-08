import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { WordTimestamp } from "../types/props";

interface Props {
  words: WordTimestamp[];
  startSeconds: number;
}

const MAX_WORDS = 6;
const MAX_CHARS = 16;

function splitIntoChunks(words: WordTimestamp[]): WordTimestamp[][] {
  const chunks: WordTimestamp[][] = [];
  let current: WordTimestamp[] = [];
  let charCount = 0;

  for (const w of words) {
    current.push(w);
    charCount += w.word.length;

    const isPunct = /[.!?。…]+$/.test(w.word);
    const isComma = /[,，]+$/.test(w.word) && current.length >= 3;
    const tooLong = current.length >= MAX_WORDS || charCount >= MAX_CHARS;

    if (isPunct || isComma || tooLong) {
      chunks.push(current);
      current = [];
      charCount = 0;
    }
  }
  if (current.length > 0) chunks.push(current);
  return chunks;
}

export const Subtitle: React.FC<Props> = ({ words, startSeconds }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const currentSeconds = (frame / fps) + startSeconds;

  const chunks = splitIntoChunks(words);

  const chunkIndex = chunks.findIndex((chunk) => {
    const start = chunk[0].start_seconds;
    const end = chunk[chunk.length - 1].end_seconds;
    return currentSeconds >= start && currentSeconds <= end + 0.4;
  });

  if (chunkIndex < 0) return null;

  const chunk = chunks[chunkIndex];
  const chunkStart = chunk[0].start_seconds;

  return (
    <div style={{
      position: "absolute",
      bottom: 52,
      left: 0,
      right: 0,
      display: "flex",
      justifyContent: "center",
      zIndex: 10,
    }}>
      <div style={{
        display: "flex",
        alignItems: "stretch",
        borderRadius: 6,
        overflow: "hidden",
        boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
        width: 1050,
      }}>
        {/* 왼쪽 강조 라인 */}
        <div style={{
          width: 5,
          background: "linear-gradient(180deg, #e67e22 0%, #f39c12 100%)",
          flexShrink: 0,
        }} />

        {/* 텍스트 영역 */}
        <div style={{
          flex: 1,
          background: "rgba(20,20,20,0.88)",
          padding: "14px 36px",
          fontSize: 44,
          fontFamily: "'NotoSansKR', 'NotoColorEmoji', sans-serif",
          fontWeight: 700,
          lineHeight: 1.5,
          color: "#FFFFFF",
          whiteSpace: "nowrap",
          textAlign: "center",
        }}>
          {chunk.map((w, i) => (
            <span key={i} style={{ color: "#FFFFFF" }}>
              {w.word}{" "}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
