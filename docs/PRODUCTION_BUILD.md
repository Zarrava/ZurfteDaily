# Production Build (Quick Reference)

Full guide: **`ANDROID_RELEASE_GUIDE.md`**

## Commands

```bash
# Internal test APK
npm run build:preview

# Play Store AAB
npm run build:production
```

## Package

`com.zurfte.daily` — do not change after first Play upload.

## Version bumps

Update `app.json` before each release:

- `version` → e.g. `1.0.1`
- `android.versionCode` → increment by 1
