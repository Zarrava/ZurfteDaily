/**
 * Shared helpers used across screens and components.
 */

import { isValidQuote } from './safe';

/**
 * Pick a random quote, optionally excluding the current one.
 * Returns null safely if the list is empty or invalid.
 */
export function getRandomQuote(quotesList, excludeId = null) {
  try {
    if (!Array.isArray(quotesList) || quotesList.length === 0) {
      return null;
    }

    const validQuotes = quotesList.filter(isValidQuote);
    if (validQuotes.length === 0) return null;

    let pool = validQuotes;
    if (excludeId) {
      const filtered = validQuotes.filter((item) => item.id !== excludeId);
      pool = filtered.length > 0 ? filtered : validQuotes;
    }

    const index = Math.floor(Math.random() * pool.length);
    return pool[index] ?? null;
  } catch {
    return null;
  }
}

/** Filter quotes by category name */
export function getQuotesByCategory(quotesList, category) {
  try {
    if (!category || !Array.isArray(quotesList)) return [];
    return quotesList.filter((item) => isValidQuote(item) && item.category === category);
  } catch {
    return [];
  }
}
