import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

import { borderRadius, buttonSize, minTouchTarget, typography } from '../../constants/theme';
import { useAppFonts } from '../../context/FontContext';
import { useTheme } from '../../context/ThemeContext';

/**
 * Outlined secondary button — pairs with PrimaryButton.
 */
export default function SecondaryButton({
  title,
  onPress,
  style,
  disabled = false,
  accessibilityLabel,
}) {
  const { colors } = useTheme();
  const { fonts } = useAppFonts();
  const size = buttonSize.md;

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel || title}
      accessibilityState={{ disabled }}
      style={[
        styles.button,
        {
          borderColor: colors.accent,
          minHeight: minTouchTarget,
          height: size.height,
          backgroundColor: `${colors.accent}10`,
          opacity: disabled ? 0.45 : 1,
        },
        style,
      ]}
    >
      <Text style={[typography.button, styles.title, { color: colors.accent, fontFamily: fonts.semibold }]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: borderRadius.md,
    borderWidth: 1.5,
    paddingHorizontal: buttonSize.md.paddingHorizontal,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 15,
  },
});
