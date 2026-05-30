import AsyncStorage from '@react-native-async-storage/async-storage';

import { STORAGE_KEYS } from './keys';

/**
 * Persist and restore the user's dark mode preference.
 */
export async function loadDarkModePreference() {
  try {
    const stored = await AsyncStorage.getItem(STORAGE_KEYS.DARK_MODE);
    if (stored === null) return null;
    return stored === 'true';
  } catch {
    return null;
  }
}

export async function saveDarkModePreference(isDark) {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.DARK_MODE, String(isDark));
  } catch {
    // Fail silently — app still works without persistence
  }
}
