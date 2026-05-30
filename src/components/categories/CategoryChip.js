import React, { memo } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

import { a11y } from '../../constants/accessibility';
import { borderRadius, getCardShadow, minTouchTarget, spacing, typography } from '../../constants/theme';
import { useAppFonts } from '../../context/FontContext';
import { useTheme } from '../../context/ThemeContext';

/**
 * Horizontal category pill with active state.
 */
function CategoryChip({ label, count, selected, onPress }) {
  const { colors, isDark } = useTheme();
  const { fonts } = useAppFonts();

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      accessibilityRole="button"
      accessibilityLabel={a11y.categories.chip(label, selected)}
      accessibilityState={{ selected }}
      style={[
        styles.chip,
        selected ? getCardShadow(isDark) : null,
        {
          backgroundColor: selected ? colors.accent : colors.card,
          borderColor: selected ? colors.accent : colors.border,
          minHeight: minTouchTarget,
        },
      ]}
    >
      <Text
        style={[
          styles.name,
          { color: selected ? colors.primary : colors.text, fontFamily: fonts.semibold },
        ]}
      >
        {label}
      </Text>
      <Text
        style={[
          typography.caption,
          { color: selected ? colors.primary : colors.subText, fontFamily: fonts.regular },
        ]}
      >
        {count} quotes
      </Text>
    </TouchableOpacity>
  );
}

export default memo(CategoryChip);

const styles = StyleSheet.create({
  chip: {
    borderRadius: borderRadius.lg,
    borderWidth: 1.5,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    minWidth: 128,
    marginRight: spacing.sm,
    justifyContent: 'center',
  },
  name: {
    fontSize: 15,
    marginBottom: spacing.xs,
  },
});
