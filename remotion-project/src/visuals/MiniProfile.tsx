import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { theme } from "../styles/theme";

interface Props {
  data: { name: string; role: string; organization: string; avatar: string; bio: string; stats?: Array<{ label: string; value: string }> };
}

export const MiniProfile: React.FC<Props> = ({ data }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const avatarP = spring({ frame, fps, config: { damping: 100, stiffness: 10 } });
  const avatarOpacity = interpolate(frame, [0, 14], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const infoP = spring({ frame: frame - 8, fps, config: { damping: 100, stiffness: 10 } });
  const infoOpacity = interpolate(frame, [8, 20], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const bioOpacity = interpolate(frame, [16, 28], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const statsOpacity = interpolate(frame, [24, 36], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", padding: "70px 120px" }}>
      <div style={{
        display: "flex", gap: 60, alignItems: "center", width: "100%",
        padding: "50px 60px", borderRadius: 24,
        background: "rgba(129,216,208,0.04)", border: "1px solid rgba(129,216,208,0.12)",
      }}>
        {/* Avatar */}
        <div style={{
          fontSize: 120, fontFamily: theme.font, flexShrink: 0,
          opacity: avatarOpacity, transform: `scale(${interpolate(avatarP, [0, 1], [0.7, 1])})`,
          width: 180, height: 180, display: "flex", alignItems: "center", justifyContent: "center",
          background: `${theme.tiffany}10`, borderRadius: "50%", border: `2px solid ${theme.tiffany}30`,
        }}>
          {data.avatar}
        </div>

        {/* Info */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ opacity: infoOpacity, transform: `translateX(${interpolate(infoP, [0, 1], [20, 0])}px)` }}>
            <div style={{ fontSize: 52, fontWeight: 900, color: theme.white, fontFamily: theme.font }}>{data.name}</div>
            <div style={{ fontSize: 30, color: theme.tiffany, fontFamily: theme.font, fontWeight: 600, marginTop: 6 }}>{data.role}</div>
            <div style={{ fontSize: 24, color: theme.grayLight, fontFamily: theme.font }}>{data.organization}</div>
          </div>

          <div style={{
            fontSize: 28, color: theme.grayLight, fontFamily: theme.font, lineHeight: 1.6,
            opacity: bioOpacity, marginTop: 8,
            paddingTop: 16, borderTop: `1px solid rgba(129,216,208,0.15)`,
          }}>
            {data.bio}
          </div>

          {data.stats && data.stats.length > 0 && (
            <div style={{ display: "flex", gap: 32, marginTop: 12, opacity: statsOpacity }}>
              {data.stats.map((s, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 32, fontWeight: 900, color: theme.tiffany, fontFamily: theme.font }}>{s.value}</div>
                  <div style={{ fontSize: 20, color: theme.gray, fontFamily: theme.font }}>{s.label}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
