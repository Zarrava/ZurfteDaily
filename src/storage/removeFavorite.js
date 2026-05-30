import AsyncStorage from '@react-native-async-storage/async-storage';

import { getFavorites } from './getFavorites';
import { STORAGE_KEYS } from './keys';

/**
 * Remove a quote from favorites by id.
 */
export async function removeFavorite(quoteId) {
  if (!quoteId) {
    return { success: false, message: 'Invalid quote' };
  }

  try {
    const favorites = await getFavorites();
    const updated = favorites.filter((item) => item.id !== quoteId);
    await AsyncStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(updated));
    return { success: true };
  } catch {
    return { success: false, message: 'Could not remove favorite. Please try again.' };
  }
}
