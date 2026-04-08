import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { useSceneTheme } from "../contexts/SceneTheme";

interface Props {
  data: {
    title?: string;
    messages: Array<{ sender: string; text: string; isMe?: boolean }>;
  };
}

export const ChatMessage: React.FC<Props> = ({ data }) => {
  const theme = useSceneTheme();
  const frame = useCurrentFrame();
  if (!data) return null;

  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      <div style={{
        position: "absolute", top: 0, bottom: 0, left: 0, right: 0,
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        zIndex: 3, padding: "0 300px",
      }}>
        {/* 채팅 헤더 */}
        {data.title && (
          <div style={{
            width: "100%", padding: "16px 24px", marginBottom: 8,
            background: "rgba(255,255,255,0.95)", borderRadius: "16px 16px 0 0",
            textAlign: "center",
          }}>
            <span style={{ fontSize: 28, fontWeight: 800, color: "#111", fontFamily: theme.font }}>
              {data.title}
            </span>
          </div>
        )}
        {/* 메시지 영역 */}
        <div style={{
          width: "100%", padding: "24px 28px",
          background: "rgba(180,200,220,0.25)", borderRadius: data.title ? "0 0 16px 16px" : 16,
          display: "flex", flexDirection: "column", gap: 16,
        }}>
          {(data.messages ?? []).slice(0, 6).map((msg, i) => {
            const delay = 6 + i * 12;
            const op = interpolate(frame, [delay, delay + 6], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
            const slideY = interpolate(frame, [delay, delay + 8], [20, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
            const isMe = msg.isMe ?? false;
            return (
              <div key={i} style={{
                display: "flex", flexDirection: "column",
                alignItems: isMe ? "flex-end" : "flex-start",
                opacity: op, transform: `translateY(${slideY}px)`,
              }}>
                <span style={{
                  fontSize: 18, fontWeight: 600, color: "rgba(255,255,255,0.6)",
                  fontFamily: theme.font, marginBottom: 4,
                }}>
                  {msg.sender}
                </span>
                <div style={{
                  maxWidth: "80%", padding: "14px 20px",
                  background: isMe ? "#3B82F6" : "rgba(255,255,255,0.92)",
                  borderRadius: isMe ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                }}>
                  <span style={{
                    fontSize: 28, fontWeight: 600,
                    color: isMe ? "#fff" : "#111",
                    fontFamily: "'NotoSansKR', sans-serif", lineHeight: 1.5,
                  }}>
                    {msg.text}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
