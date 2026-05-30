import React, { useCallback, useMemo, useState } from 'react';
import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native';

import CategoryChip from '../../components/categories/CategoryChip';
import QuoteCard from '../../components/cards/QuoteCard';
import EmptyState from '../../components/common/EmptyState';
import ScreenContainer from '../../components/common/ScreenContainer';
import ScreenHeader from '../../components/common/ScreenHeader';
import { a11y } from '../../constants/accessibility';
import { QUOTE_CATEGORIES, quotes } from '../../data/quotes';
import { layout, spacing, typography } from '../../constants/theme';
import { useAppFonts } from '../../context/FontContext';
import { useTheme } from '../../context/ThemeContext';
import { getQuotesByCategory } from '../../utils';

const QuoteListItem = React.memo(({ item }) => (
  <QuoteCard quote={item.quote} category={item.category} />
));

const categoryCounts = QUOTE_CATEGORIES.reduce((acc, cat) => {
  acc[cat] = getQuotesByCategory(quotes, cat).length;
  return acc;
}, {});

/**
 * Categories — filter quotes by topic with polished chips.
 */
export default function CategoriesScreen() {
  const { colors } = useTheme();
  const { fonts } = useAppFonts();
  const [selectedCategory, setSelectedCategory] = useState(null);

  const filteredQuotes = useMemo(
    () => getQuotesByCategory(quotes, selectedCategory),
    [selectedCategory],
  );

  const handleSelect = useCallback((category) => {
    setSelectedCategory((prev) => (prev === category ? null : category));
  }, []);

  const renderQuote = useCallback(({ item }) => <QuoteListItem item={item} />, []);

  const keyExtractor = useCallback((item) => item.id, []);

  const ListEmpty = useCallback(
    () => (
      <EmptyState
        icon="document-text-outline"
        title="No quotes found"
        message={`We could not find quotes for ${selectedCategory}. Try another category.`}
      />
    ),
    [selectedCategory],
  );

  const ListHeader = useMemo(
    () => (
      <>
        <ScreenHeader title="Categories" subtitle="Explore motivation by topic" />

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryList}
          style={styles.categoryScroll}
        >
          {QUOTE_CATEGORIES.map((item) => (
            <CategoryChip
              key={item}
              label={item}
              count={categoryCounts[item]}
              selected={item === selectedCategory}
              onPress={() => handleSelect(item)}
            />
          ))}
        </ScrollView>

        {selectedCategory ? (
          <Text
            style={[
              typography.sectionTitle,
              styles.resultsLabel,
              { color: colors.subText, fontFamily: fonts.semibold },
            ]}
          >
            {selectedCategory} · {filteredQuotes.length} quotes
          </Text>
        ) : null}
      </>
    ),
    [colors.subText, fonts.semibold, filteredQuotes.length, selectedCategory, handleSelect],
  );

  if (!selectedCategory) {
    return (
      <ScreenContainer scrollable>
        {ListHeader}
        <EmptyState
          icon="grid-outline"
          title="Choose a category"
          message="Swipe through topics above and tap one to explore curated quotes."
        />
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer style={styles.flex}>
      <FlatList
        data={filteredQuotes}
        keyExtractor={keyExtractor}
        renderItem={renderQuote}
        ListHeaderComponent={ListHeader}
        ListEmptyComponent={ListEmpty}
        contentContainerStyle={styles.quoteList}
        style={styles.listFlex}
        showsVerticalScrollIndicator={false}
        initialNumToRender={5}
        maxToRenderPerBatch={8}
        windowSize={8}
        removeClippedSubviews
        accessibilityLabel={a11y.categories.quoteList}
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  categoryScroll: {
    marginBottom: spacing.md,
    flexGrow: 0,
    marginHorizontal: -layout.screenPaddingHorizontal,
    paddingHorizontal: layout.screenPaddingHorizontal,
  },
  categoryList: {
    paddingRight: spacing.lg,
  },
  resultsLabel: {
    marginBottom: spacing.md,
  },
  listFlex: {
    flex: 1,
    marginHorizontal: -layout.screenPaddingHorizontal,
    paddingHorizontal: layout.screenPaddingHorizontal,
  },
  quoteList: {
    paddingBottom: spacing.xxl,
    flexGrow: 1,
  },
});
