import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { ChartBar as ChartBarData } from "../types/props";
import { theme } from "../styles/theme";

interface Props {
  data: ChartBarData[];
  title: string;
  startFrame: number;
}

export const ChartBar: React.FC<Props> = ({ data, title, startFrame }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const rawMax = Math.max(...data.map((d) => d.value));
  const rawMin = Math.min(...data.map((d) => d.value));

  // 데이터 범위가 좁으면(최대값의 30% 이내 차이) Y축 바닥을 올려서 등락폭 강조
  const range = rawMax - rawMin;
  const useOffset = range > 0 && range < rawMax * 0.5;
  const baseValue = useOffset ? Math.floor(rawMin * 0.9) : 0;  // min의 90% 지점부터 시작
  const maxValue = rawMax;

  // 제목에서 단위 자동 감지
  // "(원)" 또는 "원)" 포함 시 원화 → $ 접두사 없음
  const isWon = title.includes("원)") || title.includes("(원");
  const prefix = (!isWon && (title.includes("달러") || title.includes("$") || title.includes("USD"))) ? "$" : "";
  const suffix = (!prefix && title.includes("%")) ? "%" : "";
  const formatValue = (v: number) => `${prefix}${v}${suffix}`;

  // 제목 페이드인 (로컬 프레임 기준)
  const titleP = spring({ frame, fps, config: { damping: 100, stiffness: 25 } });

  // 바 높이에 따른 색상
  const barColor = (ratio: number) => {
    if (ratio >= 0.85) return { from: "#A8E8E2", to: "#81D8D0" };
    if (ratio >= 0.6)  return { from: "#81D8D0", to: "#4FA8A0" };
    if (ratio >= 0.3)  return { from: "#4FA8A0", to: "#2D7A74" };
    return              { from: "#2D7A74", to: "#1A5550" };
  };

  return (
    <div style={{
      width: "100%", height: "100%",
      display: "flex", flexDirection: "column",
      padding: "70px 120px 90px",
    }}>
      {/* 차트 제목 */}
      {title && (
        <div style={{
          fontSize: 40, fontWeight: 700, color: theme.gold,
          fontFamily: theme.font, textAlign: "center",
          marginBottom: 52,
          opacity: titleP,
          transform: `translateY(${interpolate(titleP, [0, 1], [-16, 0])}px)`,
        }}>
          {title}
        </div>
      )}

      {/* 차트 영역 */}
      <div style={{ flex: 1, display: "flex", alignItems: "flex-end", gap: 20, position: "relative" }}>

        {/* 가로 기준선들 */}
        {[0.25, 0.5, 0.75, 1.0].map((ratio) => (
          <div key={ratio} style={{
            position: "absolute", left: 0, right: 0,
            bottom: `${ratio * 100}%`, height: 1,
            background: "rgba(255,255,255,0.07)",
          }}>
            <span style={{
              position: "absolute", right: "calc(100% + 10px)",
              fontSize: 24, color: theme.gray, fontFamily: theme.font,
              whiteSpace: "nowrap" as const,
              transform: "translateY(50%)",
            }}>
              {formatValue(parseFloat((baseValue + (maxValue - baseValue) * ratio).toFixed(1)))}
            </span>
          </div>
        ))}

        {/* 바들 */}
        {data.map((bar, i) => {
          // startFrame은 로컬 프레임 기준 (10 ~ 20 정도로 전달)
          const growProgress = spring({
            frame: frame - startFrame - i * 5,
            fps,
            config: { damping: 200, stiffness: 25 },
          });

          const ratio = (bar.value - baseValue) / (maxValue - baseValue);
          const barHeightPct = ratio * 100 * Math.min(1, growProgress);
          const colors = barColor(ratio);

          // 정착 후 shimmer (바가 다 자란 뒤에만)
          const settled = Math.max(0, frame - (startFrame + i * 5 + 20));
          const shimmer = (Math.sin(settled * 0.06 + i * 1.1) + 1) / 2;

          const labelP = spring({
            frame: frame - startFrame - i * 5 - 3,
            fps,
            config: { damping: 120, stiffness: 60 },
          });

          return (
            <div key={bar.label} style={{
              flex: 1, display: "flex", flexDirection: "column",
              alignItems: "center", height: "100%", justifyContent: "flex-end",
            }}>
              {/* 값 레이블 */}
              <div style={{
                fontSize: 26, fontWeight: 900, color: theme.white,
                fontFamily: theme.font, marginBottom: 10,
                opacity: Math.min(1, labelP),
                transform: `translateY(${interpolate(Math.min(1, labelP), [0, 1], [10, 0])}px)`,
              }}>
                {formatValue(bar.value)}
              </div>

              {/* 바 */}
              <div style={{
                width: "100%",
                height: `${barHeightPct}%`,
                minHeight: growProgress > 0.01 ? 4 : 0,
                background: `linear-gradient(to top, ${colors.to}, ${colors.from})`,
                borderRadius: "8px 8px 0 0",
                position: "relative",
                boxShadow: `0 0 ${16 + shimmer * 20}px ${colors.from}${Math.round(40 + shimmer * 60).toString(16)}`,
                transition: "box-shadow 0s",
              }}>
                {/* 상단 shimmer 라인 */}
                <div style={{
                  position: "absolute", top: 0, left: 0, right: 0,
                  height: 3, borderRadius: "8px 8px 0 0",
                  background: `rgba(255,255,255,${0.2 + shimmer * 0.4})`,
                }} />
              </div>

              {/* 레이블 */}
              <div style={{
                fontSize: 26, color: theme.grayLight,
                fontFamily: theme.font, fontWeight: 600,
                marginTop: 14, textAlign: "center" as const,
                opacity: Math.min(1, labelP),
                lineHeight: 1.3,
              }}>
                {bar.label}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
