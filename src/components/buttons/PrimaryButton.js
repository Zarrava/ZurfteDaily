import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

import { a11y } from '../../constants/accessibility';
import { borderRadius, buttonSize, minTouchTarget, typography } from '../../constants/theme';
import { palette } from '../../constants/colors';
import { useAppFonts } from '../../context/FontContext';
import { useTheme } from '../../context/ThemeContext';

/**
 * Primary action button — gold accent with press feedback.
 */
export default function PrimaryButton({
  title,
  label,
  onPress,
  style,
  disabled = false,
  accessibilityLabel,
}) {
  const { colors } = useTheme();
  const { fonts } = useAppFonts();
  const buttonTitle = title || label;
  const size = buttonSize.md;

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.78}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel || buttonTitle}
      accessibilityState={{ disabled }}
      style={[
        styles.button,
        {
          backgroundColor: colors.accent,
          minHeight: minTouchTarget,
          height: size.height,
          opacity: disabled ? 0.5 : 1,
        },
        style,
      ]}
    >
      <Text style={[typography.button, styles.title, { fontFamily: fonts.semibold }]}>
        {buttonTitle}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: borderRadius.md,
    paddingHorizontal: buttonSize.md.paddingHorizontal,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: palette.deepNavy,
  },
});
