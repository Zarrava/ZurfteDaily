import { Share } from 'react-native';

/**
 * Safe helpers — prevent crashes from storage, quotes, or share failures.
 */

/** Validate a quote object shape from storage or data */
export function isValidQuote(item) {
  return Boolean(
    item &&
      typeof item.id === 'string' &&
      typeof item.quote === 'string' &&
      item.quote.trim().length > 0 &&
      typeof item.category === 'string',
  );
}

/** Share a quote via the device share sheet */
export async function shareQuote(quoteItem) {
  if (!isValidQuote(quoteItem)) {
    return { success: false, message: 'No quote available to share.' };
  }

  try {
    const result = await Share.share({
      message: `"${quoteItem.quote.trim()}"\n\n— Zurfte Daily (${quoteItem.category})`,
    });

    if (result.action === Share.dismissedAction) {
      return { success: true, dismissed: true };
    }

    return { success: true, dismissed: false };
  } catch {
    return { success: false, message: 'Unable to share this quote right now.' };
  }
}
