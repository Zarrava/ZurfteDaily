import React, { createContext, useContext, useMemo } from 'react';
import { Platform } from 'react-native';
import {
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
  useFonts,
} from '@expo-google-fonts/poppins';

const FontContext = createContext(null);

const SYSTEM_FALLBACK = Platform.select({
  ios: 'System',
  android: 'sans-serif',
  default: 'sans-serif',
});

/**
 * Loads Poppins via Expo Google Fonts; falls back to system font on failure.
 */
export function FontProvider({ children }) {
  const [loaded, error] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  const useSystemFonts = Boolean(error);

  const fonts = useMemo(() => {
    if (useSystemFonts) {
      return {
        regular: SYSTEM_FALLBACK,
        medium: SYSTEM_FALLBACK,
        semibold: SYSTEM_FALLBACK,
        bold: SYSTEM_FALLBACK,
      };
    }

    return {
      regular: 'Poppins_400Regular',
      medium: 'Poppins_500Medium',
      semibold: 'Poppins_600SemiBold',
      bold: 'Poppins_700Bold',
    };
  }, [useSystemFonts]);

  const value = useMemo(
    () => ({
      fonts,
      fontsLoaded: loaded && !error,
      fontError: error,
    }),
    [fonts, loaded, error],
  );

  return <FontContext.Provider value={value}>{children}</FontContext.Provider>;
}

export function useAppFonts() {
  const context = useContext(FontContext);
  if (!context) {
    throw new Error('useAppFonts must be used inside FontProvider');
  }
  return context;
}
