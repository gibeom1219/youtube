import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { useSceneTheme } from "../contexts/SceneTheme";

interface Props {
  data: {
    top_title: string;
    bottom_title: string;
    top_items: string[];
    bottom_items: string[];
  };
}

export const TornPaper: React.FC<Props> = ({ data }) => {
  const theme = useSceneTheme();
  const frame = useCurrentFrame();
  if (!data) return null;

  const paperOp = interpolate(frame, [0, 14], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const tearStart = 30;
  const tearY = interpolate(frame, [tearStart, tearStart + 16], [0, 60], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const revealOp = interpolate(frame, [tearStart + 8, tearStart + 18], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const zigzag = "polygon(0 0, 100% 0, 100% calc(100% - 8px), 95% 100%, 90% calc(100% - 12px), 85% 100%, 80% calc(100% - 8px), 75% 100%, 70% calc(100% - 12px), 65% 100%, 60% calc(100% - 8px), 55% 100%, 50% calc(100% - 12px), 45% 100%, 40% calc(100% - 8px), 35% 100%, 30% calc(100% - 12px), 25% 100%, 20% calc(100% - 8px), 15% 100%, 10% calc(100% - 12px), 5% 100%, 0 calc(100% - 8px))";
  const zigzagBottom = "polygon(0 8px, 5% 0, 10% 12px, 15% 0, 20% 8px, 25% 0, 30% 12px, 35% 0, 40% 8px, 45% 0, 50% 12px, 55% 0, 60% 8px, 65% 0, 70% 12px, 75% 0, 80% 8px, 85% 0, 90% 12px, 95% 0, 100% 8px, 100% 100%, 0 100%)";

  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      <div style={{
        position: "absolute", top: 0, bottom: 0, left: 0, right: 0,
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        zIndex: 3, padding: "0 240px", opacity: paperOp,
      }}>
        {/* 윗부분 (찢겨 올라감) */}
        <div style={{
          width: "100%", padding: "40px 48px 52px",
          background: "#f5f0e8",
          clipPath: zigzag,
          boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
          transform: `translateY(-${tearY}px)`,
        }}>
          <div style={{
            fontSize: 22, fontWeight: 700, color: "#999",
            fontFamily: theme.font, letterSpacing: 2, marginBottom: 12,
            textAlign: "center",
          }}>
            공식 발표
          </div>
          <div style={{
            fontSize: 40, fontWeight: 900, color: "#111",
            fontFamily: theme.font, textAlign: "center", marginBottom: 16,
          }}>
            {data.top_title}
          </div>
          {(data.top_items ?? []).map((item, i) => (
            <div key={i} style={{
              fontSize: 28, fontWeight: 600, color: "#555",
              fontFamily: theme.font, textAlign: "center", marginBottom: 4,
            }}>
              {item}
            </div>
          ))}
        </div>

        {/* 아랫부분 (찢겨 내려감) — 숨겨진 진실 */}
        <div style={{
          width: "100%", padding: "52px 48px 40px",
          background: "linear-gradient(180deg, #1a1a2e 0%, #16213e 100%)",
          clipPath: zigzagBottom,
          boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
          transform: `translateY(${tearY}px)`,
          opacity: revealOp,
        }}>
          <div style={{
            fontSize: 22, fontWeight: 700, color: "#81D8D0",
            fontFamily: theme.font, letterSpacing: 2, marginBottom: 12,
            textAlign: "center",
          }}>
            숨겨진 진실
          </div>
          <div style={{
            fontSize: 40, fontWeight: 900, color: "#fff",
            fontFamily: theme.font, textAlign: "center", marginBottom: 16,
          }}>
            {data.bottom_title}
          </div>
          {(data.bottom_items ?? []).map((item, i) => (
            <div key={i} style={{
              fontSize: 28, fontWeight: 600, color: "rgba(255,255,255,0.75)",
              fontFamily: theme.font, textAlign: "center", marginBottom: 4,
              opacity: interpolate(frame, [tearStart + 14 + i * 6, tearStart + 20 + i * 6], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
            }}>
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
