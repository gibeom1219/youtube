import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { theme } from "../styles/theme";

interface Props {
  data: { asset: string; before_price: string; after_price: string; change: string; period: string; icon?: string; context?: string };
}

export const PriceImpact: React.FC<Props> = ({ data }) => {
  const frame = useCurrentFrame();
  const changeStr = data.change ?? "";
  const isNegative = changeStr.startsWith("-");
  const color = isNegative ? theme.red : theme.green;
  const pulse = frame > 30 ? (Math.sin(frame * 0.08) + 1) / 2 : 0;

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "80px 120px", gap: 20 }}>
      {/* Asset name */}
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        {data.icon && <span style={{ fontSize: 56, fontFamily: theme.font }}>{data.icon}</span>}
        <span style={{ fontSize: 44, fontWeight: 700, color: theme.white, fontFamily: theme.font }}>{data.asset}</span>
        <span style={{ fontSize: 26, color: theme.gray, fontFamily: theme.font }}>{data.period}</span>
      </div>

      {/* Before price */}
      <div style={{ fontSize: 44, color: theme.grayLight, fontFamily: theme.font, textDecoration: isNegative ? "line-through" : "none", textDecorationColor: `${theme.red}60` }}>
        {data.before_price}
      </div>

      {/* Change - the big impact */}
      <div style={{
        fontSize: 140, fontWeight: 900, color, fontFamily: theme.font,
        textShadow: `0 0 ${30 + pulse * 40}px ${color}50`,
        lineHeight: 1,
      }}>
        {data.change}
      </div>

      {/* After price */}
      <div style={{ fontSize: 56, fontWeight: 800, color: theme.white, fontFamily: theme.font }}>
        → {data.after_price}
      </div>

      {data.context && (
        <div style={{ fontSize: 28, color: theme.grayLight, fontFamily: theme.font, textAlign: "center", maxWidth: 1000, marginTop: 10, lineHeight: 1.5 }}>
          {data.context}
        </div>
      )}
    </div>
  );
};
