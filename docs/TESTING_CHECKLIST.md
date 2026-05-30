# Zurfte Daily — Production Testing Checklist

Test on a **real Android device** before submitting to Google Play. Use latest **Expo Go** for development builds, or an **APK/AAB** from EAS for final QA.

## Environment

- [ ] Node.js 22 LTS (avoid Node 23)
- [ ] `npm install` completes without errors
- [ ] `npx expo start -c` loads without red errors
- [ ] Expo Go updated to SDK 56–compatible version

---

## Home screen

- [ ] App shows splash then Home without white flash
- [ ] Random quote appears on first load
- [ ] **New Quote** shows a different quote (not same twice in a row)
- [ ] **Save to Favorites** works; button shows saved state
- [ ] Duplicate save shows friendly message (not crash)
- [ ] **Share Quote** opens system share sheet
- [ ] Share cancel does not crash app
- [ ] Loading indicator on first load and on new quote
- [ ] Poppins font renders correctly

---

## Favorites

- [ ] Saved quotes appear in Favorites tab
- [ ] Empty state when no favorites
- [ ] **Remove** shows confirmation dialog
- [ ] Remove updates list immediately
- [ ] Pull/navigate away and back — list still correct

---

## Categories

- [ ] All 5 categories visible (horizontal scroll on small phone)
- [ ] Tap category shows filtered quotes
- [ ] Tap again deselects category
- [ ] Empty selection shows “Choose a category” message
- [ ] Scrolling long quote list is smooth

---

## Dark mode & persistence

- [ ] Toggle dark mode in Settings
- [ ] All screens readable (text contrast OK)
- [ ] Force-close app and reopen — dark mode remembered
- [ ] Tab bar and cards match theme

---

## Navigation

- [ ] All 4 tabs work (Home, Favorites, Categories, Settings)
- [ ] No header duplicates
- [ ] Android back button behaves predictably
- [ ] No crash switching tabs rapidly

---

## Responsiveness

- [ ] Small phone (e.g. 5.5"): no text cut off, buttons tappable
- [ ] Large phone: layout not overly stretched
- [ ] Tablet (if available): content centered, readable

---

## Accessibility (spot check)

- [ ] TalkBack: buttons announce labels
- [ ] Touch targets feel large enough (48dp height buttons)

---

## Performance

- [ ] No visible lag on tab switch
- [ ] Favorites list scrolls smoothly with 10+ items
- [ ] No memory warnings during 5-minute session

---

## Play Store readiness

- [ ] App name displays as **Zurfte Daily**
- [ ] No “test”, “demo”, or “placeholder” text in UI
- [ ] Privacy policy URL ready for Play Console
- [ ] Custom icon/splash assets replaced (if not using defaults)
- [ ] Version in Settings matches `app.json` (v1.0)

---

## Production build (EAS)

- [ ] `eas build --profile preview --platform android` (APK) installs
- [ ] `eas build --profile production --platform android` (AAB) succeeds
- [ ] Installed APK/AAB: all checklist items pass again

**Tester name / date / device:** _______________
