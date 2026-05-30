import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Alert, Animated, StyleSheet, Text, View } from 'react-native';

import PrimaryButton from '../../components/buttons/PrimaryButton';
import SecondaryButton from '../../components/buttons/SecondaryButton';
import QuoteCard from '../../components/cards/QuoteCard';
import EmptyState from '../../components/common/EmptyState';
import LoadingView from '../../components/common/LoadingView';
import ScreenContainer from '../../components/common/ScreenContainer';
import ScreenHeader from '../../components/common/ScreenHeader';
import { a11y } from '../../constants/accessibility';
import { quotes } from '../../data/quotes';
import { animation, borderRadius, spacing, typography } from '../../constants/theme';
import { useAppFonts } from '../../context/FontContext';
import { useTheme } from '../../context/ThemeContext';
import { isFavorite } from '../../storage/isFavorite';
import { saveFavorite } from '../../storage/saveFavorite';
import { shareQuote } from '../../utils/safe';
import { getRandomQuote } from '../../utils';

/**
 * Home — daily motivation with save, share, and new quote actions.
 */
export default function HomeScreen() {
  const { colors } = useTheme();
  const { fonts } = useAppFonts();
  const [currentQuote, setCurrentQuote] = useState(null);
  const [saved, setSaved] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [quoteLoading, setQuoteLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [loadError, setLoadError] = useState(null);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const animateQuoteIn = useCallback(() => {
    fadeAnim.setValue(0);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: animation.normal,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const loadQuote = useCallback(
    async (excludeId = null, isRefresh = false) => {
      try {
        setLoadError(null);
        if (isRefresh) setQuoteLoading(true);
        else setInitialLoading(true);

        const next = getRandomQuote(quotes, excludeId);

        if (!next) {
          setLoadError('Quotes are unavailable right now. Please restart the app.');
          setCurrentQuote(null);
          return;
        }

        setCurrentQuote(next);

        try {
          const favorite = await isFavorite(next.id);
          setSaved(favorite);
        } catch {
          setSaved(false);
        }

        animateQuoteIn();
      } catch {
        setLoadError('Something went wrong loading a quote. Please try again.');
      } finally {
        if (isRefresh) setQuoteLoading(false);
        else setInitialLoading(false);
      }
    },
    [animateQuoteIn],
  );

  useEffect(() => {
    loadQuote();
  }, [loadQuote]);

  const handleNewQuote = () => {
    if (!currentQuote || quoteLoading) return;
    loadQuote(currentQuote.id, true);
  };

  const handleSaveFavorite = async () => {
    if (!currentQuote || saved) return;

    try {
      setActionLoading(true);
      const result = await saveFavorite(currentQuote);

      if (result.success) {
        setSaved(true);
        Alert.alert('Saved', result.message);
      } else {
        Alert.alert('Favorites', result.message);
      }
    } catch {
      Alert.alert('Favorites', 'Could not save favorite. Please try again.');
    } finally {
      setActionLoading(false);
    }
  };

  const handleShare = async () => {
    if (!currentQuote) return;

    const result = await shareQuote(currentQuote);
    if (!result.success && result.message) {
      Alert.alert('Share', result.message);
    }
  };

  if (initialLoading) {
    return (
      <ScreenContainer>
        <LoadingView message="Preparing your motivation..." minHeight={320} />
      </ScreenContainer>
    );
  }

  if (loadError && !currentQuote) {
    return (
      <ScreenContainer scrollable>
        <ScreenHeader title="Zurfte Daily" subtitle="Your daily dose of motivation" />
        <EmptyState icon="alert-circle-outline" title="Unable to load quotes" message={loadError} />
        <PrimaryButton
          title="Try Again"
          onPress={() => loadQuote()}
          style={styles.retryButton}
          accessibilityLabel="Try loading quotes again"
        />
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer scrollable>
      <ScreenHeader
        title="Zurfte Daily"
        subtitle="Your daily dose of motivation"
      />

      <View style={styles.motivationHeader}>
        <View style={[styles.goldDot, { backgroundColor: colors.accent }]} />
        <Text
          style={[
            typography.sectionTitle,
            styles.motivationTitle,
            { color: colors.accent, fontFamily: fonts.semibold },
          ]}
        >
          Today's Motivation
        </Text>
      </View>

      {quoteLoading ? (
        <LoadingView message="Finding your next quote..." minHeight={220} />
      ) : currentQuote ? (
        <Animated.View style={{ opacity: fadeAnim }}>
          <QuoteCard quote={currentQuote.quote} category={currentQuote.category} />
        </Animated.View>
      ) : null}

      <View style={[styles.actionGroup, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <PrimaryButton
          title="New Quote"
          onPress={handleNewQuote}
          disabled={quoteLoading}
          style={styles.actionButton}
          accessibilityLabel={a11y.home.newQuote}
        />
        <SecondaryButton
          title={saved ? 'Saved ✓' : 'Save to Favorites'}
          onPress={handleSaveFavorite}
          disabled={quoteLoading || saved || actionLoading}
          style={styles.actionButton}
          accessibilityLabel={a11y.home.saveFavorite}
        />
        <SecondaryButton
          title="Share Quote"
          onPress={handleShare}
          disabled={quoteLoading || !currentQuote}
          style={[styles.actionButton, styles.lastButton]}
          accessibilityLabel={a11y.home.shareQuote}
        />
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  motivationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  goldDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: spacing.sm,
  },
  motivationTitle: {
    marginBottom: 0,
  },
  actionGroup: {
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    padding: spacing.md,
    marginTop: spacing.lg,
  },
  actionButton: {
    width: '100%',
    marginBottom: spacing.sm,
  },
  lastButton: {
    marginBottom: 0,
  },
  retryButton: {
    marginTop: spacing.lg,
  },
});
