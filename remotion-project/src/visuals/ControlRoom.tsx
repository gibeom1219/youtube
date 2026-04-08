import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { useSceneTheme } from "../contexts/SceneTheme";

const PANEL_COLORS = ["#81D8D0", "#64B4FF", "#52D68A", "#FFB347", "#FF6B6B", "#C084FC"];

interface Props {
  data: {
    title: string;
    panels: Array<{ label: string; value: string; sub?: string; status?: "up" | "down" | "neutral" }>;
    alert?: string;
  };
}

export const ControlRoom: React.FC<Props> = ({ data }) => {
  const theme = useSceneTheme();
  const frame = useCurrentFrame();
  if (!data) return null;
  const titleOp = interpolate(frame, [0, 14], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const scanLine = (frame * 3) % 1080;

  const n = (data.panels ?? []).length;
  const cols = n <= 4 ? 2 : 3;

  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      {/* Dark overlay */}
      <div style={{
        position: "absolute", top: 0, bottom: 0, left: 0, right: 0,
        background: "rgba(5,10,15,0.55)", zIndex: 2,
      }} />

      {/* Scan line effect */}
      <div style={{
        position: "absolute", top: scanLine, left: 0, right: 0,
        height: 2, background: "rgba(129,216,208,0.08)",
        zIndex: 3,
      }} />

      <div style={{
        position: "absolute", top: 0, bottom: 0, left: 0, right: 0,
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        zIndex: 4, padding: "40px 120px",
      }}>
        {/* Title */}
        <div style={{
          display: "flex", alignItems: "center", gap: 16,
          marginBottom: 32, opacity: titleOp,
        }}>
          <div style={{
            width: 12, height: 12, borderRadius: "50%",
            background: "#52D68A",
            boxShadow: "0 0 8px #52D68A",
          }} />
          <span style={{
            fontSize: 44, fontWeight: 900, color: "#fff",
            fontFamily: theme.font, letterSpacing: 2,
            textShadow: "0 0 16px rgba(129,216,208,0.3)",
          }}>
            {data.title}
          </span>
        </div>

        {/* Panel grid */}
        <div style={{
          display: "flex", flexWrap: "wrap" as const, gap: 20,
          justifyContent: "center", maxWidth: 1100,
        }}>
          {(data.panels ?? []).map((panel, i) => {
            const delay = 10 + i * 8;
            const panelOp = interpolate(frame, [delay, delay + 10], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
            const color = PANEL_COLORS[i % PANEL_COLORS.length];
            const statusIcon = panel.status === "up" ? "▲" : panel.status === "down" ? "▼" : "●";
            const statusColor = panel.status === "up" ? "#52D68A" : panel.status === "down" ? "#FF6B6B" : "#FFB347";
            const pulse = (Math.sin(frame * 0.04 + i * 1.2) + 1) / 2;
            const cellWidth = cols === 2 ? 480 : 320;

            return (
              <div key={i} style={{
                width: cellWidth, padding: "24px 28px",
                background: "rgba(20,30,40,0.85)",
                border: `1px solid ${color}30`,
                borderRadius: 10, opacity: panelOp,
                boxShadow: `0 0 ${8 + pulse * 8}px ${color}10`,
              }}>
                <div style={{
                  fontSize: 20, fontWeight: 600, color: `${color}90`,
                  fontFamily: theme.font, marginBottom: 10,
                  textTransform: "uppercase" as const, letterSpacing: 1,
                }}>
                  {panel.label}
                </div>
                <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
                  <span style={{
                    fontSize: 40, fontWeight: 900, color: "#fff",
                    fontFamily: theme.font,
                    textShadow: `0 0 8px ${color}40`,
                  }}>
                    {panel.value}
                  </span>
                  <span style={{
                    fontSize: 22, fontWeight: 700, color: statusColor,
                    fontFamily: theme.font,
                  }}>
                    {statusIcon}
                  </span>
                </div>
                {panel.sub && (
                  <div style={{
                    fontSize: 20, fontWeight: 500, color: "rgba(255,255,255,0.45)",
                    fontFamily: theme.font, marginTop: 6,
                  }}>
                    {panel.sub}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Alert bar */}
        {data.alert && (
          <div style={{
            marginTop: 28, padding: "12px 32px", borderRadius: 8,
            background: "rgba(255,107,107,0.12)",
            border: "1px solid rgba(255,107,107,0.3)",
            opacity: interpolate(frame, [50, 60], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
          }}>
            <span style={{
              fontSize: 24, fontWeight: 700, color: "#FF6B6B",
              fontFamily: theme.font,
            }}>
              ⚠ {data.alert}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
