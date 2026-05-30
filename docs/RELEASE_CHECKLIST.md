# Zurfte Daily — Production Release Checklist

Use this before every Play Store upload.

---

## A. Assets

- [ ] App icon 1024×1024 (`assets/images/icon.png`)
- [ ] Android adaptive icon foreground/background (`assets/images/android-icon-*.png`)
- [ ] Splash image (`assets/images/splash-icon.png`)
- [ ] Feature graphic 1024×500 (Play Console upload)
- [ ] 5+ phone screenshots (see `PLAY_STORE_ASSETS.md`)
- [ ] Privacy policy hosted at public HTTPS URL

---

## B. Configuration

- [ ] `app.json` — `version` and `android.versionCode` incremented for updates
- [ ] Package name `com.zurfte.daily` unchanged (first release) or intentional change documented
- [ ] `eas.json` profiles: `preview` (APK), `production` (AAB)
- [ ] EAS project linked: `eas init` completed
- [ ] No `console.log` debug spam in `src/`

---

## C. Builds

- [ ] `npm install` succeeds
- [ ] `npx expo-doctor` passes
- [ ] `npx expo start` — app runs in Expo Go
- [ ] `npm run build:preview` — APK installs on test device
- [ ] All items in `TESTING_CHECKLIST.md` pass on APK
- [ ] `npm run build:production` — AAB builds successfully
- [ ] Download AAB from Expo dashboard

---

## D. Google Play Console

- [ ] Developer account created ($25 one-time fee)
- [ ] New app created with package `com.zurfte.daily`
- [ ] Store listing: short + long description (`PLAY_STORE_LISTING.md`)
- [ ] Graphics uploaded (icon, feature graphic, screenshots)
- [ ] Content rating questionnaire completed
- [ ] Data safety form completed (local storage only, no collection)
- [ ] Privacy policy URL added
- [ ] Target countries selected
- [ ] Pricing: Free

---

## E. Testing tracks

- [ ] Upload AAB to **Internal testing** first
- [ ] Invite testers (email list or link)
- [ ] Fix bugs from internal test
- [ ] Promote to **Closed testing** (optional)
- [ ] Promote to **Production** when stable

---

## F. Policy safety

- [ ] No misleading claims in description
- [ ] No placeholder / “lorem ipsum” in app UI
- [ ] Share uses system sheet only — no hidden data collection
- [ ] Permissions minimal (`blockedPermissions` in `app.json`)
- [ ] App works offline for quotes (no fake “requires internet”)

---

## G. Versioning reference

| Field | Location | Example |
|-------|----------|---------|
| User-visible version | `app.json` → `version` | `1.0.0` |
| Android build number | `app.json` → `android.versionCode` | `1` (increment: 2, 3…) |
| iOS build | `ios.buildNumber` | `1` |

**Rule:** Every new Play upload must increase `versionCode` by at least 1.

---

## H. Post-release

- [ ] Monitor Play Console vitals (crashes, ANRs)
- [ ] Respond to user reviews
- [ ] Plan `1.0.1` fixes with updated `version` + `versionCode`

**Release sign-off**

| Role | Name | Date |
|------|------|------|
| Tester | | |
| Developer | | |
