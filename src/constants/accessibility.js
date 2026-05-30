/**
 * Central accessibility labels — keeps copy consistent for screen readers.
 */
export const a11y = {
  home: {
    newQuote: 'Get a new motivational quote',
    saveFavorite: 'Save this quote to favorites',
    shareQuote: 'Share this quote',
    quoteCard: 'Motivational quote card',
  },
  favorites: {
    list: 'Saved favorite quotes',
    remove: 'Remove quote from favorites',
  },
  categories: {
    chip: (name, selected) =>
      `${name} category, ${selected ? 'selected' : 'not selected'}`,
    quoteList: 'Quotes in selected category',
  },
  settings: {
    darkMode: 'Toggle dark mode',
    about: 'About Zurfte Daily',
  },
  tabs: {
    home: 'Home tab',
    favorites: 'Favorites tab',
    categories: 'Categories tab',
    settings: 'Settings tab',
  },
};
