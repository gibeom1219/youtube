import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { useSceneTheme } from "../contexts/SceneTheme";

interface Props {
  data: {
    title?: string;
    revealed_text: string;
    hint?: string;
  };
}

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";

export const PasswordCrack: React.FC<Props> = ({ data }) => {
  const theme = useSceneTheme();
  const frame = useCurrentFrame();
  if (!data) return null;

  const titleOp = interpolate(frame, [0, 14], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const chars = (data.revealed_text ?? "").split("");
  const crackStart = 18;
  const charInterval = 6;

  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      <div style={{
        position: "absolute", top: 0, bottom: 0, left: 0, right: 0,
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        zIndex: 3, padding: "0 140px",
      }}>
        {/* 타이틀 */}
        {data.title && (
          <div style={{
            fontSize: 32, fontWeight: 700, color: "#00ff41",
            fontFamily: "'Courier New', monospace", marginBottom: 40,
            opacity: titleOp, letterSpacing: 3,
          }}>
            {'> '}{data.title}
          </div>
        )}

        {/* 크래킹 텍스트 */}
        <div style={{
          padding: "40px 56px",
          background: "rgba(0,20,0,0.8)",
          borderRadius: 8,
          border: "1px solid rgba(0,255,65,0.3)",
          boxShadow: "0 0 40px rgba(0,255,65,0.1), inset 0 0 40px rgba(0,20,0,0.5)",
        }}>
          <div style={{ display: "flex", flexWrap: "wrap" as const, justifyContent: "center", gap: 4 }}>
            {chars.map((char, i) => {
              const lockFrame = crackStart + i * charInterval;
              const isLocked = frame >= lockFrame;
              const isSpace = char === " ";
              // Scramble effect using frame-based pseudo-random
              const scrambleIdx = (frame * 7 + i * 13) % CHARS.length;
              const displayChar = isSpace ? "\u00A0" : (isLocked ? char : CHARS[scrambleIdx]);
              return (
                <span key={i} style={{
                  fontSize: 56, fontWeight: 900,
                  fontFamily: "'Courier New', monospace",
                  color: isLocked ? "#00ff41" : "rgba(0,255,65,0.3)",
                  textShadow: isLocked ? "0 0 20px rgba(0,255,65,0.6)" : "none",
                  minWidth: isSpace ? 24 : undefined,
                }}>
                  {displayChar}
                </span>
              );
            })}
          </div>
        </div>

        {/* 힌트 */}
        {data.hint && (
          <div style={{
            marginTop: 32, fontSize: 28, fontWeight: 600,
            color: "rgba(0,255,65,0.6)", fontFamily: "'Courier New', monospace",
            opacity: interpolate(frame, [crackStart + chars.length * charInterval, crackStart + chars.length * charInterval + 10], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
          }}>
            {'// '}{data.hint}
          </div>
        )}
      </div>
    </div>
  );
};
