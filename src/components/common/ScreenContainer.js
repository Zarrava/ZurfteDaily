import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { layout, spacing } from '../../constants/theme';
import { useTheme } from '../../context/ThemeContext';

/**
 * Reusable screen wrapper — safe areas, theme background, tablet-friendly max width.
 */
export default function ScreenContainer({
  children,
  scrollable = false,
  style,
  contentContainerStyle,
}) {
  const { colors } = useTheme();

  const containerStyle = [
    styles.container,
    { backgroundColor: colors.background },
    style,
  ];

  const inner = (
    <View style={styles.inner}>{children}</View>
  );

  if (scrollable) {
    return (
      <SafeAreaView style={containerStyle} edges={['top', 'left', 'right']}>
        <ScrollView
          contentContainerStyle={[styles.scrollContent, contentContainerStyle]}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          bounces
        >
          {inner}
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={containerStyle} edges={['top', 'left', 'right']}>
      <View style={[styles.content, contentContainerStyle]}>{inner}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    width: '100%',
    maxWidth: layout.maxContentWidth,
    alignSelf: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: layout.screenPaddingHorizontal,
    paddingTop: layout.screenPaddingTop,
    paddingBottom: layout.screenPaddingBottom,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: layout.screenPaddingHorizontal,
    paddingTop: layout.screenPaddingTop,
    paddingBottom: spacing.xxl,
  },
});
