import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { useSceneTheme } from "../contexts/SceneTheme";

interface Props {
  data: {
    title: string;
    counters: Array<{
      label: string;
      value: number;
      prefix?: string;
      suffix?: string;
      color?: string;
    }>;
  };
}

export const CounterReveal: React.FC<Props> = ({ data }) => {
  const theme = useSceneTheme();
  const frame = useCurrentFrame();
  if (!data) return null;

  const titleOpacity = interpolate(frame, [0, 14], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      <div style={{
        position: "absolute", top: 0, bottom: 0, left: 0, right: 0,
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        zIndex: 3, gap: 40,
      }}>
        <div style={{
          fontSize: 48, fontWeight: 900, color: "#fff",
          fontFamily: theme.font, opacity: titleOpacity,
          letterSpacing: -1,
          textShadow: "0 2px 20px rgba(0,0,0,0.5)",
        }}>
          {data.title}
        </div>

        <div style={{
          display: "flex", gap: 48,
          justifyContent: "center",
        }}>
          {(data.counters ?? []).map((counter, i) => {
            const delay = 8 + i * 12;
            const labelOpacity = interpolate(frame, [delay, delay + 8], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

            // 슬롯머신 효과: 빠르게 숫자를 돌리다가 최종 값에 멈춤
            const spinEnd = delay + 30;
            const isSpinning = frame >= delay && frame < spinEnd;
            const spinDone = frame >= spinEnd;
            const spinProgress = interpolate(frame, [delay, spinEnd], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

            let displayValue: string;
            if (frame < delay) {
              displayValue = "0";
            } else if (isSpinning) {
              // 이징 적용: 처음엔 빠르게, 끝에 느리게
              const eased = 1 - Math.pow(1 - spinProgress, 3);
              const current = Math.round(counter.value * eased);
              displayValue = current.toLocaleString();
            } else {
              displayValue = counter.value.toLocaleString();
            }

            const color = counter.color ?? "#81D8D0";
            const doneScale = spinDone
              ? interpolate(frame, [spinEnd, spinEnd + 6], [1.08, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })
              : 1;

            return (
              <div key={i} style={{
                display: "flex", flexDirection: "column",
                alignItems: "center", gap: 12,
                opacity: labelOpacity,
              }}>
                {/* 라벨 */}
                <div style={{
                  fontSize: 28, fontWeight: 700,
                  color: "rgba(255,255,255,0.85)",
                  fontFamily: theme.font, letterSpacing: 1,
                }}>
                  {counter.label}
                </div>

                {/* 숫자 */}
                <div style={{
                  fontSize: 80, fontWeight: 900,
                  color: spinDone ? color : "rgba(255,255,255,0.8)",
                  fontFamily: "Pretendard, sans-serif",
                  lineHeight: 1,
                  transform: `scale(${doneScale})`,
                  textShadow: spinDone ? `0 0 30px ${color}40` : "none",
                }}>
                  {counter.prefix ?? ""}{displayValue}{counter.suffix ?? ""}
                </div>

                {/* 완료 표시선 */}
                <div style={{
                  width: spinDone ? 60 : 0, height: 3,
                  background: color, borderRadius: 2,
                  transition: "width 0.3s",
                }} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
