// Gesture handler must be imported first (React Navigation requirement)
import 'react-native-gesture-handler';

import React, { useCallback, useEffect } from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';

import BottomTabs from './src/navigation/BottomTabs';
import ErrorBoundary from './src/components/common/ErrorBoundary';
import StartupLoader from './src/components/common/StartupLoader';
import { palette } from './src/constants/colors';
import { FontProvider, useAppFonts } from './src/context/FontContext';
import { ThemeProvider, useTheme } from './src/context/ThemeContext';

SplashScreen.preventAutoHideAsync().catch(() => {});

function AppNavigation() {
  const { colors, isDark, isReady } = useTheme();
  const { fontsLoaded, fontError } = useAppFonts();

  const appReady = isReady && (fontsLoaded || Boolean(fontError));

  const onLayoutRootView = useCallback(async () => {
    if (appReady) {
      await SplashScreen.hideAsync();
    }
  }, [appReady]);

  useEffect(() => {
    if (appReady) {
      SplashScreen.hideAsync().catch(() => {});
    }
  }, [appReady]);

  const navigationTheme = {
    ...(isDark ? DarkTheme : DefaultTheme),
    colors: {
      ...(isDark ? DarkTheme.colors : DefaultTheme.colors),
      primary: palette.gold,
      background: colors.background,
      card: colors.card,
      text: colors.text,
      border: colors.border,
    },
  };

  if (!appReady) {
    return <StartupLoader />;
  }

  return (
    <>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <NavigationContainer theme={navigationTheme} onReady={onLayoutRootView}>
        <BottomTabs />
      </NavigationContainer>
    </>
  );
}

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <ErrorBoundary>
          <FontProvider>
            <ThemeProvider>
              <AppNavigation />
            </ThemeProvider>
          </FontProvider>
        </ErrorBoundary>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
