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

  const fadeIn = interpolate(
    currentSeconds,
    [chunkStart, chunkStart + 0.15],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <div style={{
      position: "absolute",
      bottom: 72,
      left: 140,
      right: 140,
      textAlign: "center",
      opacity: fadeIn,
    }}>
      <span style={{
        backgroundColor: "rgba(0,0,0,0.82)",
        borderRadius: 10,
        padding: "10px 24px",
        fontSize: 46,
        fontFamily: "'NotoSansKR', 'NotoColorEmoji', sans-serif",
        fontWeight: 700,
        lineHeight: 1.5,
        color: "#FFFFFF",
        whiteSpace: "nowrap",
        display: "inline-block",
        maxWidth: "100%",
        overflow: "hidden",
        textOverflow: "ellipsis",
      }}>
        {chunk.map((w, i) => (
          <span key={i} style={{ color: "#FFFFFF" }}>
            {w.word}{" "}
          </span>
        ))}
      </span>
    </div>
  );
};
