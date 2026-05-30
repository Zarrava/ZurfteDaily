import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { spacing, typography } from '../../constants/theme';
import { useAppFonts } from '../../context/FontContext';
import { useTheme } from '../../context/ThemeContext';

/**
 * Consistent screen title + optional subtitle for all main tabs.
 */
export default function ScreenHeader({ title, subtitle }) {
  const { colors } = useTheme();
  const { fonts } = useAppFonts();

  return (
    <View style={styles.wrapper}>
      <Text
        style={[
          typography.screenTitle,
          styles.title,
          { color: colors.text, fontFamily: fonts.bold },
        ]}
      >
        {title}
      </Text>
      {subtitle ? (
        <Text
          style={[
            typography.screenSubtitle,
            styles.subtitle,
            { color: colors.subText, fontFamily: fonts.regular },
          ]}
        >
          {subtitle}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: spacing.lg,
  },
  title: {
    marginBottom: spacing.xs,
  },
  subtitle: {
    marginTop: spacing.xs,
  },
});
