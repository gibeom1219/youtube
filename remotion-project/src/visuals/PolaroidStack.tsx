import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { useSceneTheme } from "../contexts/SceneTheme";

interface Props {
  data: {
    title?: string;
    photos: Array<{ caption: string; label?: string }>;
  };
}

const ROTATIONS = [-6, 4, -3, 5, -2, 3];
const POSITIONS = [
  { x: 160, y: 160 },
  { x: 520, y: 140 },
  { x: 900, y: 170 },
  { x: 1260, y: 150 },
  { x: 340, y: 500 },
  { x: 740, y: 480 },
  { x: 1100, y: 510 },
];

export const PolaroidStack: React.FC<Props> = ({ data }) => {
  const theme = useSceneTheme();
  const frame = useCurrentFrame();
  if (!data) return null;
  const titleOp = interpolate(frame, [0, 14], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      {data.title && (
        <div style={{
          position: "absolute", top: 50, left: 0, right: 0,
          textAlign: "center", zIndex: 3, opacity: titleOp,
        }}>
          <span style={{ fontSize: 52, fontWeight: 900, color: "#fff", fontFamily: theme.font, textShadow: "0 2px 20px rgba(0,0,0,0.5)" }}>
            {data.title}
          </span>
        </div>
      )}
      {(data.photos ?? []).slice(0, 6).map((photo, i) => {
        const delay = 8 + i * 10;
        const op = interpolate(frame, [delay, delay + 6], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
        const drop = interpolate(frame, [delay, delay + 8], [-60, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
        const rot = ROTATIONS[i % ROTATIONS.length];
        const pos = POSITIONS[i % POSITIONS.length];
        return (
          <div key={i} style={{
            position: "absolute", left: pos.x, top: pos.y,
            width: 300, background: "#fff", padding: "16px 16px 56px",
            borderRadius: 4, boxShadow: "4px 6px 20px rgba(0,0,0,0.35)",
            transform: `rotate(${rot}deg) translateY(${drop}px)`,
            opacity: op, zIndex: 3 + i,
          }}>
            <div style={{
              width: "100%", height: 180, background: "linear-gradient(135deg, #ddd 0%, #bbb 100%)",
              borderRadius: 2, display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              {photo.label && (
                <span style={{ fontSize: 48, fontFamily: theme.font }}>{photo.label}</span>
              )}
            </div>
            <div style={{
              marginTop: 12, fontSize: 24, fontWeight: 700, color: "#333",
              fontFamily: "'NotoSansKR', sans-serif", textAlign: "center", lineHeight: 1.4,
            }}>
              {photo.caption}
            </div>
          </div>
        );
      })}
    </div>
  );
};
