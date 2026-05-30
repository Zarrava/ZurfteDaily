/**
 * Central design system — spacing, type scale, radii, shadows, buttons.
 * Pair with FontContext for fontFamily on text styles.
 */

import { Platform } from 'react-native';

import { palette } from './colors';

/** 4pt-based spacing scale */
export const spacing = {
  xxs: 2,
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  xxxl: 64,
};

export const borderRadius = {
  xs: 6,
  sm: 10,
  md: 14,
  lg: 18,
  xl: 24,
  full: 999,
};

export const layout = {
  screenPaddingHorizontal: spacing.lg,
  screenPaddingTop: spacing.md,
  screenPaddingBottom: spacing.xl,
  cardGap: spacing.md,
  sectionGap: spacing.lg,
  maxContentWidth: 560,
};

export const buttonSize = {
  sm: {
    height: 40,
    paddingHorizontal: spacing.md,
    fontSize: 14,
  },
  md: {
    height: 48,
    paddingHorizontal: spacing.lg,
    fontSize: 15,
  },
  lg: {
    height: 52,
    paddingHorizontal: spacing.xl,
    fontSize: 16,
  },
};

/** Elevation-friendly shadows (use with shadowColor from palette) */
export const shadows = {
  cardLight: {
    shadowColor: palette.deepNavy,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 4,
  },
  cardDark: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 20,
    elevation: 6,
  },
  soft: {
    shadowColor: palette.deepNavy,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  tabBar: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 12,
  },
};

export function getCardShadow(isDark) {
  return isDark ? shadows.cardDark : shadows.cardLight;
}

/**
 * Typography tokens — apply fontFamily from useFonts() hook.
 * Example: [typography.quote, { fontFamily: fonts.medium }]
 */
export const typography = {
  brand: {
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  screenTitle: {
    fontSize: 30,
    lineHeight: 36,
    fontWeight: '700',
    letterSpacing: -0.5,
  },
  screenSubtitle: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '400',
    letterSpacing: 0.1,
  },
  sectionTitle: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '600',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  quote: {
    fontSize: 20,
    lineHeight: 32,
    fontWeight: '500',
    letterSpacing: 0.15,
  },
  body: {
    fontSize: 15,
    lineHeight: 23,
    fontWeight: '400',
  },
  bodySmall: {
    fontSize: 14,
    lineHeight: 21,
    fontWeight: '400',
  },
  label: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '600',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
  button: {
    fontSize: 15,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  caption: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '500',
  },
};

export const animation = {
  fast: 150,
  normal: 250,
  slow: 350,
};

export const hitSlop = {
  default: { top: 8, bottom: 8, left: 8, right: 8 },
};

/** Google Material minimum touch target (48dp) */
export const minTouchTarget = 48;

export const platformSelect = (ios, android) =>
  Platform.select({ ios, android, default: android });
