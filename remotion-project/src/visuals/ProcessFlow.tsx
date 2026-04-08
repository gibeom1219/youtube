import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { useSceneTheme } from "../contexts/SceneTheme";

interface Section {
  header: string;
  color: string;
  steps: string[];
}

interface Props {
  data: {
    title: string;
    sections: Section[];
  };
}

export const ProcessFlow: React.FC<Props> = ({ data }) => {
  const theme = useSceneTheme();
  const frame = useCurrentFrame();
  if (!data) return null;

  const titleOpacity = interpolate(frame, [0, 14], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // 전체 아이템 수 계산 (헤더 + 스텝)
  let itemIdx = 0;

  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      {/* 콘텐츠 (왼쪽 정렬) — 오버레이는 FinanceVideo에서 SceneTransition 바깥에 렌더링 */}
      <div style={{
        position: "absolute", top: 40, left: 140, bottom: 140,
        width: 780,
        display: "flex", flexDirection: "column",
        zIndex: 3,
      }}>
        {/* 타이틀 */}
        <div style={{
          fontSize: 48, fontWeight: 900, color: "#1a1a1a",
          fontFamily: theme.font, marginBottom: 20,
          opacity: titleOpacity, letterSpacing: -1,
          textAlign: "center",
        }}>
          {data.title}
        </div>

        {/* 섹션들 */}
        <div style={{
          flex: 1, display: "flex", flexDirection: "column",
          gap: 4, justifyContent: "flex-start",
        }}>
          {(data.sections ?? []).map((section, si) => {
            const headerIdx = itemIdx++;
            const headerDelay = 8 + headerIdx * 4;
            const headerOpacity = interpolate(frame, [headerDelay, headerDelay + 8], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
            const headerSlide = interpolate(frame, [headerDelay, headerDelay + 10], [20, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

            return (
              <React.Fragment key={si}>
                {/* 섹션 헤더 (채워진 색 배경) */}
                <div style={{
                  background: section.color,
                  borderRadius: 6,
                  padding: "12px 28px",
                  opacity: headerOpacity,
                  transform: `translateX(${-headerSlide}px)`,
                  textAlign: "center",
                }}>
                  <span style={{
                    fontSize: 30, fontWeight: 800, color: "white",
                    fontFamily: theme.font,
                  }}>
                    {section.header}
                  </span>
                </div>

                {/* 스텝들 */}
                {section.steps.map((step, stepIdx) => {
                  const sIdx = itemIdx++;
                  const stepDelay = 8 + sIdx * 4;
                  const stepOpacity = interpolate(frame, [stepDelay, stepDelay + 8], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
                  const stepSlide = interpolate(frame, [stepDelay, stepDelay + 10], [20, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

                  return (
                    <React.Fragment key={stepIdx}>
                      {/* 화살표 */}
                      <div style={{
                        textAlign: "center", color: section.color,
                        fontSize: 22, lineHeight: 1, opacity: stepOpacity,
                      }}>
                        ↓
                      </div>

                      {/* 스텝 박스 (테두리만) */}
                      <div style={{
                        border: `2px solid ${section.color}`,
                        borderRadius: 6,
                        padding: "10px 28px",
                        background: "rgba(255,255,255,0.35)",
                        opacity: stepOpacity,
                        transform: `translateX(${-stepSlide}px)`,
                        textAlign: "center",
                      }}>
                        <span style={{
                          fontSize: 28, fontWeight: 600, color: "#333",
                          fontFamily: theme.font,
                        }}>
                          {step}
                        </span>
                      </div>
                    </React.Fragment>
                  );
                })}

                {/* 섹션 사이 간격 */}
                {si < (data.sections ?? []).length - 1 && (
                  <div style={{ height: 8 }} />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
};
