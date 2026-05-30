import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

import { darkColors, lightColors } from '../constants/colors';
import { loadDarkModePreference, saveDarkModePreference } from '../storage/themeStorage';

/**
 * Theme context — global colors + persisted dark mode.
 */
const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(false);
  const [isReady, setIsReady] = useState(false);

  // Restore theme from AsyncStorage on launch
  useEffect(() => {
    let mounted = true;

    async function hydrateTheme() {
      const saved = await loadDarkModePreference();
      if (mounted && saved !== null) {
        setDarkMode(saved);
      }
      if (mounted) {
        setIsReady(true);
      }
    }

    hydrateTheme();

    return () => {
      mounted = false;
    };
  }, []);

  const toggleTheme = useCallback(() => {
    setDarkMode((prev) => {
      const next = !prev;
      saveDarkModePreference(next);
      return next;
    });
  }, []);

  const setDarkModeValue = useCallback((value) => {
    setDarkMode(value);
    saveDarkModePreference(value);
  }, []);

  const colors = darkMode ? darkColors : lightColors;

  const value = useMemo(
    () => ({
      darkMode,
      isDark: darkMode,
      colors,
      toggleTheme,
      setDarkMode: setDarkModeValue,
      isReady,
    }),
    [darkMode, colors, toggleTheme, setDarkModeValue, isReady],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used inside ThemeProvider');
  }
  return context;
}
