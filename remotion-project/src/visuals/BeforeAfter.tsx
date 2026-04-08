import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { theme } from "../styles/theme";
import { useSceneTheme } from "../contexts/SceneTheme";

interface Props {
  data: { title: string; before: { label: string; value: string; sub?: string }; after: { label: string; value: string; sub?: string }; change: string; period: string };
}

export const BeforeAfter: React.FC<Props> = ({ data }) => {
  const theme = useSceneTheme();
  const frame = useCurrentFrame();
  if (!data) return null;
  const { fps } = useVideoConfig();
  // SceneTransition IN이 20프레임이므로 내부 요소는 20+ 에서 시작
  const titleOpacity = interpolate(frame, [20, 32], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const beforeOpacity = interpolate(frame, [28, 40], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const arrowOpacity = interpolate(frame, [36, 46], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const afterOpacity = interpolate(frame, [40, 52], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const changeOpacity = interpolate(frame, [48, 58], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const changeStr = data.change ?? "";
  const isPositive = changeStr.startsWith("+");
  const changeColor = isPositive ? theme.green : changeStr.startsWith("-") ? theme.red : theme.tiffany;

  // value 텍스트 길이에 따라 폰트 크기 자동 조정
  const beforeLen = (data.before.value ?? "").length;
  const afterLen = (data.after.value ?? "").length;
  const maxLen = Math.max(beforeLen, afterLen);
  const valueFontSize = maxLen <= 8 ? 80 : maxLen <= 15 ? 52 : maxLen <= 25 ? 38 : 30;

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "70px 120px", gap: 20 }}>
      <div style={{ fontSize: 46, fontWeight: 700, color: theme.gold, fontFamily: theme.font, opacity: titleOpacity, textShadow: theme.textShadow.strong }}>
        {data.title}
      </div>
      <div style={{ fontSize: 28, color: theme.grayLight, fontFamily: theme.font, fontWeight: 600, opacity: titleOpacity, textShadow: theme.textShadow.medium }}>{data.period}</div>

      <div style={{ display: "flex", alignItems: "center", gap: 50, marginTop: 30 }}>
        <div style={{ textAlign: "center", opacity: beforeOpacity }}>
          <div style={{ fontSize: 30, color: theme.grayLight, fontFamily: theme.font, fontWeight: 600, marginBottom: 12, textShadow: theme.textShadow.medium }}>{data.before.label}</div>
          <div style={{ fontSize: valueFontSize, fontWeight: 900, color: theme.grayLight, fontFamily: theme.font, textShadow: theme.textShadow.medium, maxWidth: 650, lineHeight: 1.3 }}>{data.before.value}</div>
          {data.before.sub && <div style={{ fontSize: 24, color: theme.gray, fontFamily: theme.font, marginTop: 8, textShadow: theme.textShadow.medium }}>{data.before.sub}</div>}
        </div>

        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12, opacity: arrowOpacity }}>
          <div style={{ fontSize: 56, color: changeColor, fontFamily: theme.font }}>→</div>
        </div>

        <div style={{ textAlign: "center", opacity: afterOpacity }}>
          <div style={{ fontSize: 30, color: theme.grayLight, fontFamily: theme.font, fontWeight: 600, marginBottom: 12, textShadow: theme.textShadow.medium }}>{data.after.label}</div>
          <div style={{ fontSize: valueFontSize, fontWeight: 900, color: theme.white, fontFamily: theme.font, textShadow: theme.textShadow.medium, maxWidth: 650, lineHeight: 1.3 }}>{data.after.value}</div>
          {data.after.sub && <div style={{ fontSize: 24, color: theme.grayLight, fontFamily: theme.font, marginTop: 8, textShadow: theme.textShadow.medium }}>{data.after.sub}</div>}
        </div>
      </div>

      <div style={{ fontSize: 36, fontWeight: 900, color: changeColor, fontFamily: theme.font, opacity: changeOpacity, marginTop: 20, padding: "10px 28px", background: `${changeColor}12`, borderRadius: 12, textShadow: theme.textShadow.medium }}>
        {data.change}
      </div>
    </div>
  );
};
