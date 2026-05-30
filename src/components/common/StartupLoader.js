import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

import { palette } from '../../constants/colors';
import { spacing, typography } from '../../constants/theme';

/**
 * Full-screen splash while fonts + theme hydrate (matches native splash).
 */
export default function StartupLoader() {
  return (
    <View style={styles.container}>
      <Text style={styles.brand}>Zurfte Daily</Text>
      <View style={styles.accentLine} />
      <ActivityIndicator size="large" color={palette.gold} style={styles.spinner} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.deepNavy,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
  },
  brand: {
    ...typography.screenTitle,
    color: palette.white,
    fontSize: 28,
    letterSpacing: 0.5,
  },
  accentLine: {
    width: 48,
    height: 3,
    backgroundColor: palette.gold,
    borderRadius: 2,
    marginTop: spacing.md,
    marginBottom: spacing.xl,
  },
  spinner: {
    marginTop: spacing.sm,
  },
});
