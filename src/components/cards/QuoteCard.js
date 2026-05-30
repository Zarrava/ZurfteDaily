import React, { memo } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { borderRadius, getCardShadow, layout, spacing, typography } from '../../constants/theme';
import { useAppFonts } from '../../context/FontContext';
import { useTheme } from '../../context/ThemeContext';

/**
 * Premium quote card — Home, Favorites, and Categories.
 */
function QuoteCard({ quote, category, style, footer }) {
  const { colors, isDark } = useTheme();
  const { fonts } = useAppFonts();

  return (
    <View
      accessible
      accessibilityRole="text"
      accessibilityLabel={`${category} quote: ${quote}`}
      style={[
        styles.card,
        getCardShadow(isDark),
        {
          backgroundColor: colors.card,
          borderColor: colors.border,
        },
        style,
      ]}
    >
      <View style={[styles.accentBar, { backgroundColor: colors.accent }]} />

      <View style={styles.content}>
        {category ? (
          <View style={[styles.categoryPill, { backgroundColor: `${colors.accent}20`, borderColor: `${colors.accent}40` }]}>
            <View style={[styles.categoryDot, { backgroundColor: colors.accent }]} />
            <Text style={[typography.label, styles.category, { color: colors.accent, fontFamily: fonts.semibold }]}>
              {category}
            </Text>
          </View>
        ) : null}

        <Text style={[styles.quoteMark, { color: colors.accent, fontFamily: fonts.bold }]} accessibilityElementsHidden>
          "
        </Text>
        <Text style={[typography.quote, styles.quote, { color: colors.text, fontFamily: fonts.medium }]}>
          {quote}
        </Text>

        {footer ? (
          <View style={[styles.footer, { borderTopColor: colors.border }]}>{footer}</View>
        ) : null}
      </View>
    </View>
  );
}

export default memo(QuoteCard);

const styles = StyleSheet.create({
  card: {
    borderRadius: borderRadius.xl,
    borderWidth: 1,
    overflow: 'hidden',
    marginBottom: layout.cardGap,
  },
  accentBar: {
    height: 5,
    width: '100%',
  },
  content: {
    padding: spacing.lg,
    paddingTop: spacing.md,
  },
  categoryPill: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    borderRadius: borderRadius.full,
    borderWidth: 1,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs + 2,
    marginBottom: spacing.md,
  },
  categoryDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: spacing.sm,
  },
  category: {
    fontSize: 11,
  },
  quoteMark: {
    fontSize: 40,
    lineHeight: 40,
    marginBottom: -spacing.xs,
    opacity: 0.85,
  },
  quote: {
    paddingRight: spacing.xs,
  },
  footer: {
    marginTop: spacing.md,
    paddingTop: spacing.md,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
});
