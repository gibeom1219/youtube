import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { useSceneTheme } from "../contexts/SceneTheme";

interface Props {
  data: {
    title?: string;
    targets: Array<{ name: string; value?: string }>;
  };
}

export const RadarScan: React.FC<Props> = ({ data }) => {
  const theme = useSceneTheme();
  const frame = useCurrentFrame();
  if (!data) return null;

  const cx = 960, cy = 520, r = 420;
  const sweepAngle = (frame * 3) % 360;
  const titleOp = interpolate(frame, [0, 14], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // 타겟 위치 (원 내부 분산)
  const targetPositions = [
    { angle: 30, dist: 0.6 }, { angle: 110, dist: 0.75 },
    { angle: 200, dist: 0.5 }, { angle: 280, dist: 0.7 },
    { angle: 340, dist: 0.85 }, { angle: 160, dist: 0.45 },
  ];

  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      <div style={{
        position: "absolute", top: 0, bottom: 0, left: 0, right: 0, zIndex: 3,
      }}>
        {/* 제목 */}
        {data.title && (
          <div style={{
            position: "absolute", top: 40, left: 0, right: 0,
            textAlign: "center", opacity: titleOp,
          }}>
            <span style={{
              fontSize: 44, fontWeight: 900, color: "#00ff41",
              fontFamily: theme.font, letterSpacing: 2,
              textShadow: "0 0 20px rgba(0,255,65,0.4)",
            }}>
              {data.title}
            </span>
          </div>
        )}

        <svg width="1920" height="1080" style={{ position: "absolute", top: 0, left: 0 }}>
          {/* 동심원 */}
          {[0.33, 0.66, 1].map((s, i) => (
            <circle key={i} cx={cx} cy={cy} r={r * s}
              fill="none" stroke="rgba(0,255,65,0.15)" strokeWidth={1} />
          ))}
          {/* 십자선 */}
          <line x1={cx - r} y1={cy} x2={cx + r} y2={cy} stroke="rgba(0,255,65,0.1)" strokeWidth={1} />
          <line x1={cx} y1={cy - r} x2={cx} y2={cy + r} stroke="rgba(0,255,65,0.1)" strokeWidth={1} />

          {/* 스윕 라인 */}
          <line
            x1={cx} y1={cy}
            x2={cx + r * Math.cos((sweepAngle - 90) * Math.PI / 180)}
            y2={cy + r * Math.sin((sweepAngle - 90) * Math.PI / 180)}
            stroke="#00ff41" strokeWidth={2} opacity={0.8}
          />
          {/* 스윕 그라데이션 부채꼴 */}
          <path
            d={`M${cx},${cy} L${cx + r * Math.cos((sweepAngle - 120) * Math.PI / 180)},${cy + r * Math.sin((sweepAngle - 120) * Math.PI / 180)} A${r},${r} 0 0,1 ${cx + r * Math.cos((sweepAngle - 90) * Math.PI / 180)},${cy + r * Math.sin((sweepAngle - 90) * Math.PI / 180)} Z`}
            fill="rgba(0,255,65,0.08)"
          />
        </svg>

        {/* 타겟 블립 */}
        {(data.targets ?? []).slice(0, 6).map((target, i) => {
          const pos = targetPositions[i % targetPositions.length];
          const tx = cx + r * pos.dist * Math.cos((pos.angle - 90) * Math.PI / 180);
          const ty = cy + r * pos.dist * Math.sin((pos.angle - 90) * Math.PI / 180);
          const detectFrame = 14 + i * 10;
          const blipOp = interpolate(frame, [detectFrame, detectFrame + 6], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
          const pulse = Math.sin(frame * 0.1 + i) * 0.3 + 0.7;

          return (
            <div key={i} style={{
              position: "absolute",
              left: tx - 80, top: ty - 20,
              opacity: blipOp, zIndex: 4,
              display: "flex", alignItems: "center", gap: 8,
            }}>
              <div style={{
                width: 12, height: 12, borderRadius: "50%",
                background: "#00ff41",
                boxShadow: `0 0 ${12 * pulse}px rgba(0,255,65,0.8)`,
              }} />
              <div>
                <div style={{
                  fontSize: 30, fontWeight: 700, color: "#00ff41",
                  fontFamily: theme.font, whiteSpace: "nowrap" as const,
                }}>
                  {target.name}
                </div>
                {target.value && (
                  <div style={{
                    fontSize: 24, fontWeight: 600, color: "rgba(0,255,65,0.6)",
                    fontFamily: theme.font,
                  }}>
                    {target.value}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
