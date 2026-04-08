import { bundle } from "@remotion/bundler";
import { renderMedia, selectComposition } from "@remotion/renderer";
import { createRequire } from "module";
import { readFileSync, copyFileSync, mkdirSync, existsSync, rmSync } from "fs";
import { join, resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const workspacePath = process.argv[2];
if (!workspacePath) {
  console.error("사용법: node render.mjs <workspace_path>");
  process.exit(1);
}

const propsPath = join(workspacePath, "remotion_props.json");
const props = JSON.parse(readFileSync(propsPath, "utf-8"));
const outputPath = join(workspacePath, "output.mp4");

// 오디오 및 이미지 파일을 remotion-project/public/ 으로 복사
const publicDir = join(__dirname, "public");
mkdirSync(publicDir, { recursive: true });

// 오디오 복사
const audioSrc = join(workspacePath, props.audioFile);
const audioDest = join(publicDir, props.audioFile);
if (existsSync(audioSrc)) {
  copyFileSync(audioSrc, audioDest);
  console.log(`[Render] 오디오 복사: ${props.audioFile}`);
}

// 배경 영상 클립 복사 (이전 워크스페이스 잔여 파일 제거 후 복사)
const videosDir = join(publicDir, "videos");
rmSync(videosDir, { recursive: true, force: true });
mkdirSync(videosDir, { recursive: true });
for (const scene of props.scenes) {
  if (scene.backgroundVideo) {
    const src = join(workspacePath, scene.backgroundVideo);
    const dest = join(publicDir, scene.backgroundVideo);
    mkdirSync(dirname(dest), { recursive: true });
    if (existsSync(src)) {
      copyFileSync(src, dest);
      console.log(`[Render] 배경 영상 복사: ${scene.backgroundVideo}`);
    }
  }
}

console.log("[Render] 번들링 시작...");
const bundleLocation = await bundle({
  entryPoint: resolve(__dirname, "src/index.ts"),
  webpackOverride: (config) => config,
});

console.log("[Render] 컴포지션 선택 중...");
const composition = await selectComposition({
  serveUrl: bundleLocation,
  id: "FinanceVideo",
  inputProps: props,
});

console.log(`[Render] 렌더링 시작... (${Math.round(props.totalDurationSeconds)}초 영상)`);
await renderMedia({
  composition,
  serveUrl: bundleLocation,
  codec: "h264",
  outputLocation: outputPath,
  inputProps: props,
  timeoutInMilliseconds: 120000,
  onProgress: ({ progress }) => {
    process.stdout.write(`\r[Render] 진행률: ${Math.round(progress * 100)}%`);
  },
});

console.log(`\n[Render] 완료 → ${outputPath}`);
