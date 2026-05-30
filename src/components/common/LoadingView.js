import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

import { palette } from '../../constants/colors';
import { spacing, typography } from '../../constants/theme';
import { useAppFonts } from '../../context/FontContext';
import { useTheme } from '../../context/ThemeContext';

/**
 * Branded loading state — prevents layout jump with minHeight.
 */
export default function LoadingView({ message = 'Loading...', minHeight = 200 }) {
  const { colors } = useTheme();
  const { fonts } = useAppFonts();

  return (
    <View style={[styles.container, { minHeight, backgroundColor: colors.background }]}>
      <ActivityIndicator size="large" color={palette.gold} />
      {message ? (
        <Text
          style={[
            styles.message,
            typography.caption,
            { color: colors.subText, fontFamily: fonts.medium },
          ]}
        >
          {message}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
  },
  message: {
    marginTop: spacing.md,
  },
});
