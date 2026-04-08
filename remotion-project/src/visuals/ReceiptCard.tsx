import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { useSceneTheme } from "../contexts/SceneTheme";

interface Props {
  data: {
    store: string;
    date?: string;
    items: Array<{
      name: string;
      price: string;
    }>;
    total: string;
    footer?: string;
  };
}

export const ReceiptCard: React.FC<Props> = ({ data }) => {
  const theme = useSceneTheme();
  const frame = useCurrentFrame();
  if (!data) return null;

  const receiptOpacity = interpolate(frame, [0, 14], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const unrollY = interpolate(frame, [0, 20], [-200, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      <div style={{
        position: "absolute", top: 0, bottom: 0, left: 0, right: 0,
        display: "flex", alignItems: "center", justifyContent: "center",
        zIndex: 3,
      }}>
        {/* 영수증 */}
        <div style={{
          width: 720, padding: "50px 48px 56px",
          background: "#fefefe",
          borderRadius: 4,
          boxShadow: "0 8px 40px rgba(0,0,0,0.4)",
          opacity: receiptOpacity,
          transform: `translateY(${unrollY}px)`,
          position: "relative" as const,
        }}>
          {/* 톱니 상단 */}
          <div style={{
            position: "absolute" as const,
            top: -10, left: 0, right: 0, height: 10,
            background: `repeating-linear-gradient(90deg, transparent 0px, transparent 8px, #fefefe 8px, #fefefe 16px)`,
          }} />

          {/* 상호 */}
          <div style={{
            textAlign: "center", marginBottom: 20,
            paddingBottom: 16,
            borderBottom: "2px dashed #ccc",
          }}>
            <div style={{
              fontSize: 42, fontWeight: 900, color: "#111",
              fontFamily: "'NotoSansKR', 'Courier New', monospace",
              letterSpacing: 4,
            }}>
              {data.store}
            </div>
            {data.date && (
              <div style={{
                fontSize: 24, fontWeight: 500, color: "#999",
                fontFamily: "'NotoSansKR', 'Courier New', monospace",
                marginTop: 8,
              }}>
                {data.date}
              </div>
            )}
          </div>

          {/* 항목들 */}
          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 20 }}>
            {(data.items ?? []).map((item, i) => {
              const delay = 14 + i * 5;
              const itemOpacity = interpolate(frame, [delay, delay + 6], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

              return (
                <div key={i} style={{
                  display: "flex", justifyContent: "space-between",
                  opacity: itemOpacity,
                }}>
                  <span style={{
                    fontSize: 32, fontWeight: 600, color: "#333",
                    fontFamily: "'NotoSansKR', 'Courier New', monospace",
                  }}>
                    {item.name}
                  </span>
                  <span style={{
                    fontSize: 32, fontWeight: 700, color: "#111",
                    fontFamily: "'NotoSansKR', 'Courier New', monospace",
                  }}>
                    {item.price}
                  </span>
                </div>
              );
            })}
          </div>

          {/* 구분선 */}
          <div style={{
            borderTop: "2px dashed #ccc",
            paddingTop: 16, marginBottom: 12,
          }}>
            <div style={{
              display: "flex", justifyContent: "space-between",
              opacity: interpolate(frame, [30, 38], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
            }}>
              <span style={{
                fontSize: 38, fontWeight: 900, color: "#111",
                fontFamily: "'NotoSansKR', 'Courier New', monospace",
              }}>
                합계
              </span>
              <span style={{
                fontSize: 38, fontWeight: 900, color: "#ef4444",
                fontFamily: "'NotoSansKR', 'Courier New', monospace",
              }}>
                {data.total}
              </span>
            </div>
          </div>

          {/* 푸터 */}
          {data.footer && (
            <div style={{
              textAlign: "center", marginTop: 16,
              fontSize: 24, fontWeight: 500, color: "#aaa",
              fontFamily: "'NotoSansKR', 'Courier New', monospace",
              opacity: interpolate(frame, [36, 44], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
            }}>
              {data.footer}
            </div>
          )}

          {/* 톱니 하단 */}
          <div style={{
            position: "absolute" as const,
            bottom: -10, left: 0, right: 0, height: 10,
            background: `repeating-linear-gradient(90deg, transparent 0px, transparent 8px, #fefefe 8px, #fefefe 16px)`,
          }} />
        </div>
      </div>
    </div>
  );
};
