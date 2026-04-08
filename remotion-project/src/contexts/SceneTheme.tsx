import React, { createContext, useContext } from "react";
import { theme } from "../styles/theme";

// 라이트 모드 테마 — 밝은 배경 씬에서 사용
const lightTheme = {
  bg: "#f5f5f0",
  tiffany: "#0d9488",
  tiffanyDark: "#115e56",
  tiffanyLight: "#5eead4",
  white: "#1a1a1a",
  offWhite: "#2d2d2d",
  gray: "#999999",
  grayLight: "#555555",
  red: "#dc2626",
  green: "#16a34a",
  yellow: "#a16207",
  blue: "#2563eb",
  orange: "#c2410c",
  purple: "#7c3aed",
  card: "rgba(0,0,0,0.04)",
  cardBorder: "rgba(0,0,0,0.10)",

  font: theme.font,
  fontNum: theme.fontNum,
  fontQuote: theme.fontQuote,

  textShadow: {
    strong: "none",
    medium: "none",
    light: "none",
  },

  get gold() { return this.yellow; },
  get goldDim() { return this.tiffanyDark; },
  get goldLight() { return this.tiffanyLight; },
  get cyan() { return this.tiffany; },
} as typeof theme;

const SceneThemeContext = createContext<typeof theme>(theme);

export const SceneThemeProvider: React.FC<{
  bright: boolean;
  children: React.ReactNode;
}> = ({ bright, children }) => (
  <SceneThemeContext.Provider value={bright ? lightTheme : theme}>
    {children}
  </SceneThemeContext.Provider>
);

export const useSceneTheme = (): typeof theme => useContext(SceneThemeContext);
