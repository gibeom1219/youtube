import React from "react";
import { useCurrentFrame } from "remotion";
import { theme } from "../styles/theme";
import { useSceneTheme } from "../contexts/SceneTheme";

interface Side { speaker: string; role: string; quote: string; stance: string }
interface Props {
  data: { topic: string; left: Side; right: Side };
}

export const QuoteVs: React.FC<Props> = ({ data: props }) => {
  const theme = useSceneTheme();
  const { topic, left, right } = props;
  const frame = useCurrentFrame();
  if (!props) return null;
  const pulse = (Math.sin(frame * 0.06) + 1) / 2;

  const renderSide = (side: Side, color: string) => (
    <div style={{
      flex: 1, padding: "28px 32px", borderRadius: 14,
      background: `${color}35`, border: `1px solid ${color}45`,
      display: "flex", flexDirection: "column", gap: 16,
    }}>
      <div style={{
        fontSize: 28, fontWeight: 800, color, fontFamily: theme.font,
        padding: "6px 16px", background: `${color}30`, borderRadius: 6, alignSelf: "flex-start",
      }}>
        {side.stance}
      </div>
      <div style={{ fontSize: 30, color: theme.white, fontFamily: theme.font, lineHeight: 1.5, fontWeight: 500 }}>
        "{side.quote}"
      </div>
      <div style={{ marginTop: "auto" }}>
        <div style={{ fontSize: 30, fontWeight: 700, color: theme.white, fontFamily: theme.font }}>{side.speaker}</div>
        <div style={{ fontSize: 26, color: theme.grayLight, fontFamily: theme.font }}>{side.role}</div>
      </div>
    </div>
  );

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: "60px 80px", gap: 24 }}>
      <div style={{
        fontSize: 42, fontWeight: 700, color: theme.gold, fontFamily: theme.font,
        textAlign: "center",
      }}>
        {topic}
      </div>

      <div style={{ display: "flex", gap: 24, alignItems: "stretch", width: "100%" }}>
        {renderSide(left, theme.green)}

        <div style={{
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <div style={{
            width: 70, height: 70, borderRadius: "50%",
            background: `linear-gradient(135deg, ${theme.tiffany}40, ${theme.tiffany}30)`,
            border: `2px solid ${theme.tiffany}60`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 28, fontWeight: 900, color: theme.tiffany, fontFamily: theme.font,
            boxShadow: `0 0 ${10 + pulse * 15}px ${theme.tiffany}30`,
          }}>
            VS
          </div>
        </div>

        {renderSide(right, theme.red)}
      </div>
    </div>
  );
};
