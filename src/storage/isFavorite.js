import { getFavorites } from './getFavorites';

/** Check whether a quote id is already saved as a favorite */
export async function isFavorite(quoteId) {
  try {
    if (!quoteId) return false;
    const favorites = await getFavorites();
    return favorites.some((item) => item.id === quoteId);
  } catch {
    return false;
  }
}
