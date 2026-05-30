import React, { useCallback, useState } from 'react';
import { Alert, FlatList, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import QuoteCard from '../../components/cards/QuoteCard';
import EmptyState from '../../components/common/EmptyState';
import LoadingView from '../../components/common/LoadingView';
import ScreenContainer from '../../components/common/ScreenContainer';
import ScreenHeader from '../../components/common/ScreenHeader';
import { a11y } from '../../constants/accessibility';
import { borderRadius, hitSlop, minTouchTarget, spacing, typography } from '../../constants/theme';
import { useAppFonts } from '../../context/FontContext';
import { useTheme } from '../../context/ThemeContext';
import { getFavorites } from '../../storage/getFavorites';
import { removeFavorite } from '../../storage/removeFavorite';

const FavoriteItem = React.memo(function FavoriteItem({ item, onRemove, colors, fonts }) {
  return (
    <QuoteCard
      quote={item.quote}
      category={item.category}
      footer={
        <TouchableOpacity
          onPress={() => onRemove(item.id)}
          activeOpacity={0.7}
          hitSlop={hitSlop.default}
          accessibilityRole="button"
          accessibilityLabel={`${a11y.favorites.remove}: ${item.quote}`}
          style={[styles.removeButton, { borderColor: colors.border, minHeight: minTouchTarget - 16 }]}
        >
          <Text style={[styles.removeText, { color: colors.accent, fontFamily: fonts.semibold }]}>
            Remove
          </Text>
        </TouchableOpacity>
      }
    />
  );
});

/**
 * Favorites — persisted quotes with optimized list rendering.
 */
export default function FavoritesScreen() {
  const { colors } = useTheme();
  const { fonts } = useAppFonts();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);

  const loadFavorites = useCallback(async () => {
    try {
      setLoading(true);
      setLoadError(null);
      const saved = await getFavorites();
      setFavorites(saved);
    } catch {
      setLoadError('Could not load favorites. Please try again.');
      setFavorites([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadFavorites();
    }, [loadFavorites]),
  );

  const handleRemove = useCallback(
    (quoteId) => {
      Alert.alert('Remove favorite', 'Remove this quote from your favorites?', [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: async () => {
            const result = await removeFavorite(quoteId);
            if (!result.success) {
              Alert.alert('Favorites', result.message || 'Could not remove favorite.');
              return;
            }
            loadFavorites();
          },
        },
      ]);
    },
    [loadFavorites],
  );

  const renderItem = useCallback(
    ({ item }) => (
      <FavoriteItem item={item} onRemove={handleRemove} colors={colors} fonts={fonts} />
    ),
    [handleRemove, colors, fonts],
  );

  const keyExtractor = useCallback((item) => item.id, []);

  return (
    <ScreenContainer style={styles.flex}>
      <ScreenHeader
        title="Favorites"
        subtitle="Quotes you love, saved for quick inspiration"
      />

      {loading ? (
        <LoadingView message="Loading your favorites..." />
      ) : loadError ? (
        <EmptyState icon="alert-circle-outline" title="Could not load favorites" message={loadError} />
      ) : favorites.length === 0 ? (
        <EmptyState
          icon="heart-outline"
          title="No favorites saved yet"
          message="Tap Save to Favorites on the Home screen to build your personal collection."
        />
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
          style={styles.listFlex}
          showsVerticalScrollIndicator={false}
          initialNumToRender={6}
          maxToRenderPerBatch={8}
          windowSize={7}
          removeClippedSubviews
          accessibilityLabel={a11y.favorites.list}
        />
      )}
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  list: {
    paddingBottom: spacing.xxl,
  },
  listFlex: {
    flex: 1,
  },
  removeButton: {
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderRadius: borderRadius.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    justifyContent: 'center',
  },
  removeText: {
    ...typography.caption,
    fontSize: 13,
  },
});
