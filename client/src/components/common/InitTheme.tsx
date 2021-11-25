import React, { useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import { useRecoilState } from 'recoil';

import { themeState } from 'recoil/store';
import { light, dark } from 'theme/color';

const InitTheme: React.FC = ({ children }) => {
  const [theme, setTheme] = useRecoilState(themeState);

  useEffect(() => {
    const isBrowserDarkMode =
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches;
    let initTheme = isBrowserDarkMode ? 'dark' : 'light';
    setTheme(initTheme);
  }, []);

  return (
    <ThemeProvider theme={theme === 'light' ? light : dark}>
      {children}
    </ThemeProvider>
  );
};

export default InitTheme;
