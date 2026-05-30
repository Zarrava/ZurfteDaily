# Android Production Release — Zurfte Daily

Complete guide for EAS Build and Google Play publishing.

---

## What is EAS Build?

**Expo Application Services (EAS) Build** compiles your JavaScript + Expo project into a **real Android app** (APK or AAB) in the cloud. It handles signing keys, native code, and Metro bundling — without installing Android Studio locally.

- **Free tier** includes limited monthly builds (enough for indie releases)  
- Account required at [expo.dev](https://expo.dev)  

---

## APK vs AAB

| Format | What it is | When to use |
|--------|------------|-------------|
| **APK** | Single install file you can sideload on any Android phone | **Internal QA**, sharing with testers, quick device checks |
| **AAB** (Android App Bundle) | Upload format for Google Play — Google generates optimized APKs per device | **Required** for Play Store production |

**Google Play prefers AAB** because:

- Smaller downloads for users (split by screen density, CPU)  
- Required for new apps on Play since 2021  
- Better security and signing workflow  

Use **preview** profile → APK. Use **production** profile → AAB.

---

## Step-by-step: First-time setup

### 1. Install EAS CLI

```bash
npm install -g eas-cli
```

### 2. Log in to Expo

```bash
eas login
```

Create a free account if prompted.

### 3. Go to project folder

```bash
cd c:\Users\info\Downloads\ZurfteDaily\ZurfteDaily
```

### 4. Link EAS project (once)

```bash
eas init
```

Choose **Create a new project** or link existing. This adds `projectId` to `app.json` under `extra.eas`.

### 5. Install dependencies

```bash
npm install
```

### 6. Verify locally

```bash
npx expo-doctor
npx expo start
```

---

## Step-by-step: Internal test build (APK)

```bash
npm run build:preview
```

Or:

```bash
eas build --profile preview --platform android
```

1. Wait for build on [expo.dev](https://expo.dev) → your project → Builds  
2. Download **APK** when finished  
3. On Android phone: enable “Install unknown apps” for your browser/files app  
4. Install APK and run through `docs/TESTING_CHECKLIST.md`  

---

## Step-by-step: Play Store build (AAB)

```bash
npm run build:production
```

Or:

```bash
eas build --profile production --platform android
```

1. First build: EAS asks to generate **Android keystore** → choose **Let EAS handle it** (beginner-friendly)  
2. Download **AAB** from dashboard  
3. Upload to Play Console → **Release** → **Internal testing** → Create release → Upload AAB  

### Optional: Submit via CLI (after Play app exists)

```bash
eas submit --platform android --profile production
```

Requires Google Play service account JSON — optional for beginners; manual upload is fine.

---

## What happens during a build?

1. Project files upload to Expo (`.easignore` skips junk folders)  
2. Native Android project generated from Expo config  
3. JavaScript bundled for production (minified)  
4. App signed with your keystore  
5. APK or AAB artifact produced for download  

---

## Production vs Expo Go

| | Expo Go | EAS production build |
|--|---------|----------------------|
| Purpose | Development | Store release |
| Includes | Expo Go shell | **Your** app name & icon |
| Package | `host.exp.exponent` | `com.zurfte.daily` |
| Offline | Limited | Full standalone |
| Play Store | Cannot upload | Upload AAB |

Always do final QA on an **APK/AAB**, not only Expo Go.

---

## Why package naming matters

`com.zurfte.daily` is your app’s unique ID on Google Play.

- **Cannot change** after first release without a new listing  
- Must match `app.json` → `android.package`  
- Use reverse-domain style: `com.yourbrand.appname`  

---

## Why internal testing matters

- Catch device-specific bugs before public reviews  
- Avoid bad first ratings from a rushed launch  
- Play Console lets you promote the same AAB: Internal → Closed → Production  

---

## Why branding consistency matters

Icon, splash, screenshots, and feature graphic that share navy + gold build **trust** and improve conversion. Mismatched assets look unfinished and slow approval.

---

## Lightweight app size tips (already applied)

- Removed unused Expo packages (`expo-image`, `@expo/ui`, etc.)  
- `.easignore` excludes local build folders  
- No heavy animation or analytics SDKs  
- Quotes ship as local JS data (no network images)  

---

## Quick command reference

```bash
eas login
eas init
eas build --profile preview --platform android
eas build --profile production --platform android
eas submit --platform android --profile production
npx expo start
```

---

## Related docs

- `RELEASE_CHECKLIST.md` — full pre-upload checklist  
- `PLAY_STORE_LISTING.md` — descriptions  
- `PLAY_STORE_ASSETS.md` — graphics specs  
- `PRIVACY_POLICY.md` — host before upload  
- `TESTING_CHECKLIST.md` — QA on device  
- `BRANDING.md` — icon & splash specs  
