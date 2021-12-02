import React, { useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import { useRecoilState } from 'recoil';

import { themeState } from 'recoil/common';

import { light, dark } from 'theme/color';

const InitTheme: React.FC = ({ children }) => {
  const [theme, setTheme] = useRecoilState(themeState);

  useEffect(() => {
    let initTheme = window.localStorage.getItem('app_theme');
    if (!initTheme) {
      const isBrowserDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      initTheme = isBrowserDarkMode ? 'dark' : 'light';
    }

    setTheme(initTheme);
  }, []);

  useEffect(() => {
    window.localStorage.setItem('app_theme', theme);
  }, [theme]);

  return <ThemeProvider theme={theme === 'light' ? light : dark}>{children}</ThemeProvider>;
};

export default InitTheme;
