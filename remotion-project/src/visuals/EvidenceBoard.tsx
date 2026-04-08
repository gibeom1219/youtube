import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { useSceneTheme } from "../contexts/SceneTheme";

const PIN_COLORS = ["#FF6B6B", "#FFB347", "#81D8D0", "#C084FC", "#52D68A", "#FF8FA3"];
const STRING_COLOR = "rgba(255,80,80,0.5)";

interface Props {
  data: {
    title: string;
    clues: Array<{ label: string; detail?: string; icon?: string }>;
    connections?: Array<[number, number]>;
    note?: string;
  };
}

export const EvidenceBoard: React.FC<Props> = ({ data }) => {
  const theme = useSceneTheme();
  const frame = useCurrentFrame();
  if (!data) return null;
  const titleOp = interpolate(frame, [0, 14], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const n = (data.clues ?? []).length;
  // Grid layout positions
  const cols = n <= 4 ? 2 : 3;
  const cardW = 320, cardH = 140, gapX = 80, gapY = 60;
  const totalW = cols * cardW + (cols - 1) * gapX;
  const rows = Math.ceil(n / cols);
  const totalH = rows * cardH + (rows - 1) * gapY;
  const startX = (1920 - totalW) / 2;
  const startY = (1080 - totalH) / 2 + 80;

  const getPos = (i: number) => ({
    x: startX + (i % cols) * (cardW + gapX) + cardW / 2,
    y: startY + Math.floor(i / cols) * (cardH + gapY) + cardH / 2,
  });

  // Default connections: sequential if not provided
  const connections = data.connections ?? (data.clues ?? []).slice(0, -1).map((_, i) => [i, i + 1] as [number, number]);

  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      {/* Cork board texture */}
      <div style={{
        position: "absolute", top: 0, bottom: 0, left: 0, right: 0,
        background: "rgba(60,30,15,0.45)", zIndex: 2,
      }} />

      <div style={{
        position: "absolute", top: 0, bottom: 0, left: 0, right: 0,
        zIndex: 3,
      }}>
        {/* Title */}
        <div style={{
          fontSize: 48, fontWeight: 900, color: "#fff",
          fontFamily: theme.font, textAlign: "center",
          marginTop: 40, opacity: titleOp,
          textShadow: "0 0 16px rgba(255,80,80,0.4)",
          letterSpacing: 1,
        }}>
          {data.title}
        </div>

        {/* String connections SVG */}
        <svg style={{ position: "absolute", top: 0, left: 0, width: 1920, height: 1080, pointerEvents: "none", zIndex: 3 }}>
          {connections.map((conn, ci) => {
            const [a, b] = conn;
            if (a >= n || b >= n) return null;
            const pa = getPos(a);
            const pb = getPos(b);
            const delay = 20 + Math.max(a, b) * 10;
            const lineOp = interpolate(frame, [delay, delay + 10], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
            // Slight curve
            const midX = (pa.x + pb.x) / 2;
            const midY = (pa.y + pb.y) / 2 - 20;
            return (
              <g key={ci} opacity={lineOp}>
                <path
                  d={`M ${pa.x} ${pa.y} Q ${midX} ${midY} ${pb.x} ${pb.y}`}
                  fill="none" stroke={STRING_COLOR} strokeWidth={2}
                />
              </g>
            );
          })}
        </svg>

        {/* Clue cards */}
        {(data.clues ?? []).map((clue, i) => {
          const delay = 10 + i * 10;
          const cardOp = interpolate(frame, [delay, delay + 10], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
          const cardScale = interpolate(frame, [delay, delay + 10], [0.85, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
          const pos = getPos(i);
          const pinColor = PIN_COLORS[i % PIN_COLORS.length];
          const rotation = (i % 2 === 0 ? -1.5 : 1.5) + (i * 0.5);

          return (
            <div key={i} style={{
              position: "absolute",
              left: pos.x - cardW / 2,
              top: pos.y - cardH / 2,
              width: cardW, height: cardH,
              opacity: cardOp,
              transform: `scale(${cardScale}) rotate(${rotation}deg)`,
              zIndex: 4,
            }}>
              {/* Pin */}
              <div style={{
                position: "absolute", top: -10, left: "50%", transform: "translateX(-50%)",
                width: 20, height: 20, borderRadius: "50%",
                background: pinColor,
                boxShadow: `0 2px 6px ${pinColor}80`,
                zIndex: 5,
              }} />

              {/* Card */}
              <div style={{
                width: "100%", height: "100%",
                background: "rgba(255,250,240,0.92)",
                borderRadius: 4, padding: "18px 20px",
                boxShadow: "2px 3px 12px rgba(0,0,0,0.4)",
                display: "flex", flexDirection: "column",
                justifyContent: "center", gap: 6,
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  {clue.icon && <span style={{ fontSize: 28, fontFamily: theme.font }}>{clue.icon}</span>}
                  <span style={{
                    fontSize: 26, fontWeight: 800, color: "#222",
                    fontFamily: theme.font, lineHeight: 1.3,
                  }}>
                    {clue.label}
                  </span>
                </div>
                {clue.detail && (
                  <span style={{
                    fontSize: 20, fontWeight: 500, color: "#666",
                    fontFamily: theme.font, lineHeight: 1.4,
                  }}>
                    {clue.detail}
                  </span>
                )}
              </div>
            </div>
          );
        })}

        {/* Note */}
        {data.note && (
          <div style={{
            position: "absolute", top: 110, left: 0, right: 0,
            textAlign: "center", zIndex: 4,
            fontSize: 26, fontWeight: 700,
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
