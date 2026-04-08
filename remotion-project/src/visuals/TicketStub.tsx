import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { useSceneTheme } from "../contexts/SceneTheme";

interface Props {
  data: {
    event: string;
    date?: string;
    venue?: string;
    details: Array<{ label: string; value: string }>;
    code?: string;
  };
}

export const TicketStub: React.FC<Props> = ({ data }) => {
  const theme = useSceneTheme();
  const frame = useCurrentFrame();
  if (!data) return null;

  const ticketOp = interpolate(frame, [0, 14], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const slideX = interpolate(frame, [0, 16], [100, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      <div style={{
        position: "absolute", top: 0, bottom: 0, left: 0, right: 0,
        display: "flex", alignItems: "center", justifyContent: "center",
        zIndex: 3, opacity: ticketOp,
        transform: `translateX(${slideX}px)`,
      }}>
        <div style={{ display: "flex", height: 420 }}>
          {/* 메인 티켓 */}
          <div style={{
            width: 640, padding: "44px 48px",
            background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
            borderRadius: "16px 0 0 16px",
            display: "flex", flexDirection: "column",
            justifyContent: "space-between",
            boxShadow: "0 8px 40px rgba(0,0,0,0.4)",
          }}>
            <div>
              {data.venue && (
                <div style={{
                  fontSize: 22, fontWeight: 600, color: "rgba(129,216,208,0.7)",
                  fontFamily: theme.font, letterSpacing: 2, marginBottom: 8,
                }}>
                  {data.venue}
                </div>
              )}
              <div style={{
                fontSize: 48, fontWeight: 900, color: "#fff",
                fontFamily: theme.font, lineHeight: 1.3, marginBottom: 8,
              }}>
                {data.event}
              </div>
              {data.date && (
                <div style={{
                  fontSize: 28, fontWeight: 700, color: "#81D8D0",
                  fontFamily: theme.font,
                }}>
                  {data.date}
                </div>
              )}
            </div>

            <div style={{ display: "flex", flexWrap: "wrap" as const, gap: 24 }}>
              {(data.details ?? []).map((d, i) => {
                const delay = 14 + i * 8;
                const op = interpolate(frame, [delay, delay + 6], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
                return (
                  <div key={i} style={{ opacity: op }}>
                    <div style={{
                      fontSize: 16, fontWeight: 600, color: "rgba(255,255,255,0.4)",
                      fontFamily: theme.font, letterSpacing: 1, marginBottom: 4,
                    }}>
                      {d.label}
                    </div>
                    <div style={{
                      fontSize: 28, fontWeight: 800, color: "#fff",
                      fontFamily: theme.font,
                    }}>
                      {d.value}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 절취선 */}
          <div style={{
            width: 3, background: "repeating-linear-gradient(180deg, rgba(255,255,255,0.3) 0px, rgba(255,255,255,0.3) 8px, transparent 8px, transparent 16px)",
          }} />

          {/* 스텁 */}
          <div style={{
            width: 180, padding: "44px 24px",
            background: "linear-gradient(135deg, #16213e 0%, #1a1a2e 100%)",
            borderRadius: "0 16px 16px 0",
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "space-between",
            boxShadow: "0 8px 40px rgba(0,0,0,0.4)",
          }}>
            <div style={{
              fontSize: 18, fontWeight: 700, color: "rgba(255,255,255,0.5)",
              fontFamily: theme.font, letterSpacing: 2,
              writingMode: "vertical-rl" as const,
            }}>
              ADMIT ONE
            </div>
            {data.code && (
              <div style={{
                fontSize: 16, fontWeight: 700, color: "rgba(129,216,208,0.6)",
                fontFamily: "'Courier New', monospace", letterSpacing: 2,
              }}>
                {data.code}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
