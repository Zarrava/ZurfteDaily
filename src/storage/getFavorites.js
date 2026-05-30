import AsyncStorage from '@react-native-async-storage/async-storage';

import { STORAGE_KEYS } from './keys';
import { sanitizeFavorites } from './validateFavorites';

/**
 * Load all saved favorite quotes from device storage.
 */
export async function getFavorites() {
  try {
    const stored = await AsyncStorage.getItem(STORAGE_KEYS.FAVORITES);
    if (!stored) return [];

    const parsed = JSON.parse(stored);
    const cleaned = sanitizeFavorites(parsed);

    // Repair storage if corrupted entries were removed
    if (Array.isArray(parsed) && cleaned.length !== parsed.length) {
      await AsyncStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(cleaned));
    }

    return cleaned;
  } catch {
    return [];
  }
}
