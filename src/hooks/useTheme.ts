import { useEffect, useState } from "react";
import themes from "../components/styles/themes";
import { getFromLS } from "../utils/storage";
import { DefaultTheme } from "styled-components";

export const useTheme = () => {
  const [theme, setTheme] = useState<DefaultTheme>(themes.light);
  const [themeLoaded, setThemeLoaded] = useState(false);

  useEffect(() => {
    const localThemeName = getFromLS("portfolio-theme");
    localThemeName ? setTheme(themes[localThemeName]) : setTheme(themes.light);
    setThemeLoaded(true);
  }, []);

  return { theme, themeLoaded };
};
