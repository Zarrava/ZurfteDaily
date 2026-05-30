/**
 * Brand palette and theme color tokens for Zurfte Daily.
 * Use lightColors / darkColors via ThemeContext — not raw hex in screens.
 */

export const palette = {
  deepNavy: '#0B1F33',
  gold: '#D4A017',
  white: '#FFFFFF',
  lightGray: '#F5F5F5',
};

/** Light mode — clean, bright entrepreneurial feel */
export const lightColors = {
  background: palette.lightGray,
  card: palette.white,
  text: palette.deepNavy,
  subText: '#5A6B7D',
  primary: palette.deepNavy,
  accent: palette.gold,
  border: '#E0E0E0',
};

/** Dark mode — premium deep navy with gold accents */
export const darkColors = {
  background: palette.deepNavy,
  card: '#132A45',
  text: palette.white,
  subText: '#A8B8C8',
  primary: palette.white,
  accent: palette.gold,
  border: '#1E3A5F',
};
