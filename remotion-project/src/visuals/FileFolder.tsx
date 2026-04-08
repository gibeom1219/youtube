import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { useSceneTheme } from "../contexts/SceneTheme";

interface Props {
  data: {
    classification?: string;
    title: string;
    contents: Array<{ label: string; value: string }>;
    stamp?: string;
  };
}

export const FileFolder: React.FC<Props> = ({ data }) => {
  const theme = useSceneTheme();
  const frame = useCurrentFrame();
  if (!data) return null;

  const folderOp = interpolate(frame, [0, 14], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const openAngle = interpolate(frame, [10, 28], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const stampOp = interpolate(frame, [4, 8], [0, 0.7], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const stampScale = interpolate(frame, [4, 8], [2.5, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      <div style={{
        position: "absolute", top: 0, bottom: 0, left: 0, right: 0,
        display: "flex", alignItems: "center", justifyContent: "center",
        zIndex: 3, opacity: folderOp,
      }}>
        {/* 폴더 */}
        <div style={{
          width: 820, position: "relative",
        }}>
          {/* 폴더 탭 */}
          <div style={{
            width: 240, height: 36, background: "#c4a265",
            borderRadius: "8px 8px 0 0", marginLeft: 32,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <span style={{ fontSize: 18, fontWeight: 800, color: "#5a3e1b", fontFamily: theme.font, letterSpacing: 2 }}>
              {data.classification ?? "CLASSIFIED"}
            </span>
          </div>

          {/* 폴더 본체 */}
          <div style={{
            width: "100%", padding: "48px 56px",
            background: "linear-gradient(180deg, #d4a650 0%, #c4963c 100%)",
            borderRadius: "0 8px 8px 8px",
            boxShadow: "0 8px 40px rgba(0,0,0,0.4)",
            position: "relative",
          }}>
            {/* CLASSIFIED 도장 */}
            <div style={{
              position: "absolute", top: 20, right: 40,
              transform: `rotate(-15deg) scale(${stampScale})`,
              opacity: stampOp,
            }}>
              <span style={{
                fontSize: 32, fontWeight: 900, color: "#cc0000",
                fontFamily: theme.font,
                border: "3px solid #cc0000", padding: "4px 16px",
                letterSpacing: 4,
              }}>
                {data.stamp ?? "극비"}
              </span>
            </div>

            {/* 제목 */}
            <div style={{
              fontSize: 44, fontWeight: 900, color: "#2c1810",
              fontFamily: theme.font, marginBottom: 28,
              borderBottom: "2px solid rgba(0,0,0,0.2)", paddingBottom: 16,
            }}>
              {data.title}
            </div>

            {/* 내용 */}
            {(data.contents ?? []).map((item, i) => {
              const delay = 20 + i * 8;
              const revealW = interpolate(frame, [delay, delay + 10], [0, 100], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
              return (
                <div key={i} style={{
                  display: "flex", justifyContent: "space-between",
                  marginBottom: 14, alignItems: "center",
                }}>
                  <span style={{
                    fontSize: 28, fontWeight: 700, color: "#4a3520",
                    fontFamily: theme.font,
                  }}>
                    {item.label}
                  </span>
                  <div style={{ position: "relative" }}>
                    {/* 검열 바 */}
                    <div style={{
                      position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
                      background: "#2c1810", borderRadius: 2,
                      transform: `scaleX(${1 - revealW / 100})`,
                      transformOrigin: "right",
                    }} />
                    <span style={{
                      fontSize: 28, fontWeight: 800, color: "#8b0000",
                      fontFamily: theme.font,
                    }}>
                      {item.value}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
