import { isValidQuote } from '../utils/safe';

/** Keep only well-formed favorites after loading from storage */
export function sanitizeFavorites(list) {
  if (!Array.isArray(list)) return [];
  return list.filter(isValidQuote);
}
