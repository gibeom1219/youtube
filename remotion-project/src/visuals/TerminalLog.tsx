import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { useSceneTheme } from "../contexts/SceneTheme";

interface Props {
  data: {
    title: string;
    logs: Array<{ prefix?: string; text: string; color?: string }>;
    status?: string;
    note?: string;
  };
}

export const TerminalLog: React.FC<Props> = ({ data }) => {
  const theme = useSceneTheme();
  const frame = useCurrentFrame();
  if (!data) return null;
  const titleOp = interpolate(frame, [0, 14], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const cursorBlink = Math.floor(frame / 20) % 2 === 0;

  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      {/* Dark overlay */}
      <div style={{
        position: "absolute", top: 0, bottom: 0, left: 0, right: 0,
        background: "rgba(10,10,10,0.50)", zIndex: 2,
      }} />

      <div style={{
        position: "absolute", top: 0, bottom: 0, left: 0, right: 0,
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        zIndex: 3, padding: "40px 160px",
      }}>
        {/* Terminal window */}
        <div style={{
          width: "100%", maxWidth: 1100, borderRadius: 12,
          overflow: "hidden",
          boxShadow: "0 8px 40px rgba(0,255,65,0.08), 0 0 0 1px rgba(0,255,65,0.15)",
        }}>
          {/* Title bar */}
          <div style={{
            background: "rgba(30,30,30,0.95)",
            padding: "12px 20px",
            display: "flex", alignItems: "center", gap: 10,
            opacity: titleOp,
          }}>
            <div style={{ width: 14, height: 14, borderRadius: "50%", background: "#FF5F57" }} />
            <div style={{ width: 14, height: 14, borderRadius: "50%", background: "#FFBD2E" }} />
            <div style={{ width: 14, height: 14, borderRadius: "50%", background: "#28CA41" }} />
            <span style={{
              flex: 1, textAlign: "center",
              fontSize: 18, fontWeight: 600, color: "rgba(255,255,255,0.5)",
              fontFamily: theme.font,
            }}>
              {data.title}
            </span>
          </div>

          {/* Terminal body */}
          <div style={{
            background: "rgba(15,15,15,0.95)",
            padding: "28px 32px", minHeight: 400,
          }}>
            {(data.logs ?? []).map((log, i) => {
              const delay = 8 + i * 8;
              const lineOp = interpolate(frame, [delay, delay + 6], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
              const typeProgress = interpolate(frame, [delay, delay + 12], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
              const visibleChars = Math.floor(typeProgress * (log.text.length + (log.prefix?.length ?? 0) + 2));
              const fullText = `${log.prefix ?? "$"} ${log.text}`;
              const displayed = fullText.slice(0, visibleChars);
              const logColor = log.color === "red" ? "#FF6B6B"
                : log.color === "yellow" ? "#FFB347"
                : log.color === "blue" ? "#64B4FF"
                : log.color === "white" ? "#ffffff"
                : "#00ff41";

              return (
                <div key={i} style={{
                  opacity: lineOp, marginBottom: 12,
                  display: "flex", alignItems: "flex-start",
                }}>
                  <span style={{
                    fontSize: 26, fontWeight: 600,
                    fontFamily: theme.font, color: logColor,
                    lineHeight: 1.6, whiteSpace: "pre-wrap" as const,
                  }}>
                    {displayed}
                    {typeProgress < 1 && <span style={{ opacity: cursorBlink ? 1 : 0, color: logColor }}>_</span>}
                  </span>
                </div>
              );
            })}

            {/* Status line */}
            {data.status && (
              <div style={{
                marginTop: 16, paddingTop: 16,
                borderTop: "1px solid rgba(0,255,65,0.15)",
                opacity: interpolate(frame, [50, 60], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
              }}>
                <span style={{
                  fontSize: 24, fontWeight: 700,
                  fontFamily: theme.font, color: "#00ff41",
                }}>
                  [STATUS] {data.status}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Note */}
        {data.note && (
          <div style={{
            marginTop: 24, fontSize: 26, fontWeight: 700,
            color: "rgba(255,200,100,0.85)", fontFamily: theme.font,
            fontStyle: "italic" as const,
            opacity: interpolate(frame, [55, 65], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
          }}>
            * {data.note}
          </div>
        )}
      </div>
    </div>
  );
};
