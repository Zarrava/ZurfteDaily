import React from 'react';
import { StyleSheet, Switch, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import ScreenContainer from '../../components/common/ScreenContainer';
import ScreenHeader from '../../components/common/ScreenHeader';
import { a11y } from '../../constants/accessibility';
import { borderRadius, getCardShadow, layout, spacing, typography } from '../../constants/theme';
import { palette } from '../../constants/colors';
import { useAppFonts } from '../../context/FontContext';
import { useTheme } from '../../context/ThemeContext';

/**
 * Settings — appearance and branding.
 */
export default function SettingsScreen() {
  const { colors, darkMode, toggleTheme, isDark } = useTheme();
  const { fonts } = useAppFonts();

  return (
    <ScreenContainer scrollable>
      <ScreenHeader title="Settings" subtitle="Customize your experience" />

      <Text
        style={[
          typography.sectionTitle,
          styles.sectionTitle,
          { color: colors.subText, fontFamily: fonts.semibold },
        ]}
      >
        Appearance
      </Text>

      <View
        style={[
          styles.settingCard,
          getCardShadow(isDark),
          { backgroundColor: colors.card, borderColor: colors.border },
        ]}
      >
        <View style={[styles.iconWrap, { backgroundColor: `${colors.accent}18` }]}>
          <Ionicons name={darkMode ? 'moon' : 'sunny'} size={22} color={colors.accent} />
        </View>
        <View style={styles.settingText}>
          <Text style={[styles.settingTitle, { color: colors.text, fontFamily: fonts.semibold }]}>
            Dark mode
          </Text>
          <Text style={[styles.settingHint, { color: colors.subText, fontFamily: fonts.regular }]}>
            Premium deep navy with gold accents
          </Text>
        </View>
        <Switch
          value={darkMode}
          onValueChange={toggleTheme}
          trackColor={{ false: colors.border, true: colors.accent }}
          thumbColor={palette.white}
          ios_backgroundColor={colors.border}
          accessibilityLabel={a11y.settings.darkMode}
          accessibilityRole="switch"
        />
      </View>

      <Text
        style={[
          typography.sectionTitle,
          styles.sectionTitle,
          { color: colors.subText, fontFamily: fonts.semibold },
        ]}
      >
        About
      </Text>

      <View
        style={[
          styles.brandCard,
          getCardShadow(isDark),
          { backgroundColor: colors.card, borderColor: colors.border },
        ]}
      >
        <View style={[styles.brandBadge, { backgroundColor: colors.accent }]}>
          <Text style={[styles.brandInitial, { fontFamily: fonts.bold }]}>Z</Text>
        </View>
        <Text style={[styles.appName, { color: colors.text, fontFamily: fonts.bold }]}>
          Zurfte Daily v1.0
        </Text>
        <Text
          style={[styles.brandLine, { color: colors.subText, fontFamily: fonts.regular }]}
          accessibilityRole="text"
        >
          Built for entrepreneurs and growth-minded people.
        </Text>
        <Text style={[styles.brandSub, { color: colors.subText, fontFamily: fonts.regular }]}>
          Motivation for builders, founders, and dreamers.
        </Text>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  sectionTitle: {
    marginBottom: spacing.sm,
    marginTop: spacing.xs,
  },
  settingCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: borderRadius.xl,
    borderWidth: 1,
    padding: spacing.lg,
    marginBottom: layout.sectionGap,
  },
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  settingText: {
    flex: 1,
    marginRight: spacing.sm,
  },
  settingTitle: {
    fontSize: 17,
  },
  settingHint: {
    ...typography.bodySmall,
    marginTop: spacing.xs,
  },
  brandCard: {
    borderRadius: borderRadius.xl,
    borderWidth: 1,
    padding: spacing.xl,
    alignItems: 'center',
    marginBottom: spacing.xxl,
  },
  brandBadge: {
    width: 52,
    height: 52,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  brandInitial: {
    fontSize: 26,
    color: palette.deepNavy,
  },
  appName: {
    fontSize: 20,
    marginBottom: spacing.sm,
  },
  brandLine: {
    ...typography.body,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  brandSub: {
    ...typography.bodySmall,
    textAlign: 'center',
  },
});
