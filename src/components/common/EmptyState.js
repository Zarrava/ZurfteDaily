import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { borderRadius, getCardShadow, spacing, typography } from '../../constants/theme';
import { useAppFonts } from '../../context/FontContext';
import { useTheme } from '../../context/ThemeContext';

/**
 * Reusable empty state — favorites, search, etc.
 */
export default function EmptyState({ icon = 'heart-outline', title, message }) {
  const { colors, isDark } = useTheme();
  const { fonts } = useAppFonts();

  return (
    <View
      style={[
        styles.card,
        getCardShadow(isDark),
        {
          backgroundColor: colors.card,
          borderColor: colors.border,
        },
      ]}
    >
      <View style={[styles.iconWrap, { backgroundColor: `${colors.accent}18` }]}>
        <Ionicons name={icon} size={28} color={colors.accent} />
      </View>
      <Text style={[styles.title, typography.screenSubtitle, { color: colors.text, fontFamily: fonts.semibold }]}>
        {title}
      </Text>
      <Text style={[styles.message, typography.body, { color: colors.subText, fontFamily: fonts.regular }]}>
        {message}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: borderRadius.xl,
    borderWidth: 1,
    padding: spacing.xl,
    alignItems: 'center',
    marginTop: spacing.md,
  },
  iconWrap: {
    width: 56,
    height: 56,
    borderRadius: borderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  title: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  message: {
    textAlign: 'center',
    maxWidth: 280,
  },
});
