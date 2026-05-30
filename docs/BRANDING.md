# Zurfte Daily — Branding & Store Assets Guide

## Design direction

- **Minimal** — clean layouts, generous whitespace, no clutter
- **Modern** — Poppins typography, soft shadows, rounded cards
- **Memorable** — deep navy `#0B1F33` + gold `#D4A017`
- **Motivational / business** — professional, entrepreneurial tone

## Color palette

| Token      | Hex       | Usage                    |
|------------|-----------|--------------------------|
| Deep Navy  | `#0B1F33` | Background (dark), text    |
| Gold       | `#D4A017` | Accent, CTAs, highlights |
| White      | `#FFFFFF` | Cards (light), text dark |
| Light Gray | `#F5F5F5` | Background (light)       |

## App icon (Google Play & iOS)

| Asset              | Size        | Notes                                      |
|--------------------|-------------|--------------------------------------------|
| Master icon        | **1024×1024** | PNG, no transparency for store icon       |
| Expo `icon`        | 1024×1024   | Set in `app.json` → `expo.icon`            |

**Style:** Simple monogram or rising sun / quote mark on navy circle with gold accent. Avoid tiny text.

## Android adaptive icon

Configured in `app.json` under `android.adaptiveIcon`:

| Layer        | Size (design) | File                                      |
|--------------|---------------|-------------------------------------------|
| Foreground   | 1024×1024     | `assets/images/android-icon-foreground.png` |
| Background   | 1024×1024     | `assets/images/android-icon-background.png` |
| Monochrome   | 1024×1024     | Optional for themed icons                 |

- **Safe zone:** Keep logo within center **66%** circle (Android masks edges).
- **Background color:** `#0B1F33` (update from default blue if needed).

## Splash screen

Configured via `expo-splash-screen` plugin:

- **Background:** `#0B1F33`
- **Image:** Centered logo/wordmark (`assets/images/splash-icon.png`)
- **Recommended image width:** 200–280px wide for phones

## Play Store feature graphic (optional)

- **1024×500** JPG/PNG — navy background, app name, tagline

## Screenshots

- Use **light and dark** mode shots
- Show Home quote, Categories, Favorites, Settings
- Minimum 2 screenshots per device class for Play Console

## Typography in app

- **Poppins** via `@expo-google-fonts/poppins` (free, Expo-compatible)

Replace default icons in `assets/images/` before store submission for a cohesive brand.

## Android package name (production)

Configured in `app.json`:

```text
com.zurfte.daily
```

This must match your Google Play app ID. Do not change after first release without creating a new store listing.
