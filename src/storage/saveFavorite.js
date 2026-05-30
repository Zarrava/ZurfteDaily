import AsyncStorage from '@react-native-async-storage/async-storage';

import { isValidQuote } from '../utils/safe';
import { getFavorites } from './getFavorites';
import { STORAGE_KEYS } from './keys';

/**
 * Save a quote to favorites. Prevents duplicates by quote id.
 */
export async function saveFavorite(quote) {
  if (!isValidQuote(quote)) {
    return { success: false, message: 'Invalid quote' };
  }

  try {
    const favorites = await getFavorites();
    const alreadySaved = favorites.some((item) => item.id === quote.id);

    if (alreadySaved) {
      return { success: false, message: 'Already in favorites' };
    }

    const updated = [...favorites, quote];
    await AsyncStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(updated));
    return { success: true, message: 'Saved to favorites' };
  } catch {
    return { success: false, message: 'Could not save favorite. Please try again.' };
  }
}
