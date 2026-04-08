import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { useSceneTheme } from "../contexts/SceneTheme";

interface Props {
  data: {
    surface: string;
    reality: string;
    surface_items?: string[];
    reality_items?: string[];
  };
}

export const XrayReveal: React.FC<Props> = ({ data }) => {
  const theme = useSceneTheme();
  const frame = useCurrentFrame();
  if (!data) return null;

  const scanLine = interpolate(frame, [10, 50], [0, 100], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const surfaceOpacity = interpolate(frame, [0, 14], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const revealOpacity = interpolate(frame, [30, 44], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      <div style={{
        position: "absolute", top: 0, bottom: 0, left: 0, right: 0,
        display: "flex",
        zIndex: 3,
      }}>
        {/* 왼쪽: 표면 (밝은 배경) */}
        <div style={{
          flex: 1, display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
          padding: "0 60px",
          background: "rgba(240,240,236,0.85)",
          opacity: surfaceOpacity,
        }}>
          <div style={{
            fontSize: 30, fontWeight: 700, color: "#999",
            fontFamily: theme.font, letterSpacing: 3,
            marginBottom: 20,
          }}>
            표면
          </div>
          <div style={{
            fontSize: 52, fontWeight: 900, color: "#111",
            fontFamily: theme.font, textAlign: "center",
            lineHeight: 1.4, marginBottom: 24,
          }}>
            {data.surface}
          </div>
          {data.surface_items && (data.surface_items ?? []).map((item, i) => (
            <div key={i} style={{
              fontSize: 34, fontWeight: 600, color: "#555",
              fontFamily: theme.font, marginBottom: 8,
              opacity: interpolate(frame, [14 + i * 4, 20 + i * 4], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
            }}>
              · {item}
            </div>
          ))}
        </div>

        {/* 스캔 라인 */}
        <div style={{
          position: "absolute" as const,
          left: `${scanLine}%`, top: 0, bottom: 0,
          width: 3,
          background: "linear-gradient(180deg, transparent 0%, #81D8D0 30%, #81D8D0 70%, transparent 100%)",
          boxShadow: "0 0 20px rgba(129,216,208,0.8), 0 0 60px rgba(129,216,208,0.3)",
          opacity: scanLine < 100 ? 1 : 0,
          zIndex: 10,
        }} />

        {/* 오른쪽: 진실 (어두운 배경) */}
        <div style={{
          flex: 1, display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
          padding: "0 60px",
          background: "rgba(6,13,12,0.9)",
          opacity: revealOpacity,
        }}>
          <div style={{
            fontSize: 30, fontWeight: 700, color: "#81D8D0",
            fontFamily: theme.font, letterSpacing: 3,
            marginBottom: 20,
          }}>
            진실
          </div>
          <div style={{
            fontSize: 52, fontWeight: 900, color: "#fff",
            fontFamily: theme.font, textAlign: "center",
            lineHeight: 1.4, marginBottom: 24,
          }}>
            {data.reality}
          </div>
          {data.reality_items && (data.reality_items ?? []).map((item, i) => (
            <div key={i} style={{
              fontSize: 34, fontWeight: 600, color: "rgba(255,255,255,0.7)",
              fontFamily: theme.font, marginBottom: 8,
              opacity: interpolate(frame, [36 + i * 4, 42 + i * 4], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
            }}>
              · {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
