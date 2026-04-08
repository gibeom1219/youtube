import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { useSceneTheme } from "../contexts/SceneTheme";

interface Props {
  data: {
    title: string;
    rows: Array<{ label: string; score: string; change?: string; highlight?: boolean }>;
    note?: string;
  };
}

export const Scoreboard: React.FC<Props> = ({ data }) => {
  const theme = useSceneTheme();
  const frame = useCurrentFrame();
  if (!data) return null;
  const titleOp = interpolate(frame, [0, 14], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const flicker = (Math.sin(frame * 0.3) + 1) / 2;

  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      {/* Dark overlay */}
      <div style={{
        position: "absolute", top: 0, bottom: 0, left: 0, right: 0,
        background: "rgba(5,5,5,0.55)", zIndex: 2,
      }} />

      <div style={{
        position: "absolute", top: 0, bottom: 0, left: 0, right: 0,
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        zIndex: 3, padding: "40px 200px",
      }}>
        {/* Title */}
        <div style={{
          fontSize: 48, fontWeight: 900, color: "#FFB347",
          fontFamily: theme.font, marginBottom: 32, opacity: titleOp,
          textShadow: "0 0 12px rgba(255,179,71,0.4)",
          letterSpacing: 2,
        }}>
          {data.title}
        </div>

        {/* Scoreboard frame */}
        <div style={{
          maxWidth: 900, width: "100%",
          background: "rgba(15,15,15,0.9)",
          border: "2px solid rgba(255,179,71,0.3)",
          borderRadius: 12, overflow: "hidden",
          boxShadow: "0 0 20px rgba(255,179,71,0.08)",
        }}>
          {/* Header row */}
          <div style={{
            display: "flex", padding: "14px 32px",
            background: "rgba(255,179,71,0.08)",
            borderBottom: "1px solid rgba(255,179,71,0.2)",
            opacity: titleOp,
          }}>
            <span style={{
              flex: 1, fontSize: 20, fontWeight: 700,
              color: "rgba(255,179,71,0.6)", fontFamily: theme.font,
              textTransform: "uppercase" as const, letterSpacing: 1,
            }}>
              항목
            </span>
            <span style={{
              width: 180, textAlign: "right",
              fontSize: 20, fontWeight: 700,
              color: "rgba(255,179,71,0.6)", fontFamily: theme.font,
              textTransform: "uppercase" as const, letterSpacing: 1,
            }}>
              점수
            </span>
            <span style={{
              width: 120, textAlign: "right",
              fontSize: 20, fontWeight: 700,
              color: "rgba(255,179,71,0.6)", fontFamily: theme.font,
              textTransform: "uppercase" as const, letterSpacing: 1,
            }}>
              변동
            </span>
          </div>

          {/* Data rows */}
          {(data.rows ?? []).map((row, i) => {
            const delay = 10 + i * 8;
            const rowOp = interpolate(frame, [delay, delay + 8], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
            const isHighlight = row.highlight;
            const changeColor = row.change?.startsWith("+") ? "#52D68A"
              : row.change?.startsWith("-") ? "#FF6B6B"
              : "rgba(255,255,255,0.4)";

            return (
              <div key={i} style={{
                display: "flex", alignItems: "center",
                padding: "16px 32px",
                background: isHighlight ? "rgba(255,179,71,0.06)" : "transparent",
                borderBottom: i < (data.rows ?? []).length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none",
                opacity: rowOp,
              }}>
                <span style={{
                  flex: 1, fontSize: 28, fontWeight: 700,
                  color: isHighlight ? "#FFB347" : "#fff",
                  fontFamily: theme.font,
                }}>
                  {row.label}
                </span>
                <span style={{
                  width: 180, textAlign: "right",
                  fontSize: 36, fontWeight: 900,
                  color: isHighlight ? "#FFB347" : "#fff",
                  fontFamily: theme.font,
                  textShadow: isHighlight ? `0 0 ${6 + flicker * 6}px rgba(255,179,71,0.5)` : "none",
                }}>
                  {row.score}
                </span>
                <span style={{
                  width: 120, textAlign: "right",
                  fontSize: 24, fontWeight: 700,
                  color: changeColor, fontFamily: theme.font,
                }}>
                  {row.change ?? ""}
                </span>
              </div>
            );
          })}
        </div>

        {/* Note */}
        {data.note && (
          <div style={{
            marginTop: 28, fontSize: 26, fontWeight: 700,
            color: "rgba(255,200,100,0.85)", fontFamily: theme.font,
            fontStyle: "italic" as const,
            opacity: interpolate(frame, [50, 60], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
          }}>
            * {data.note}
          </div>
        )}
      </div>
    </div>
  );
};
