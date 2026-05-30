# Play Store Visual Assets — Zurfte Daily

## Brand palette

| Color | Hex | Use |
|-------|-----|-----|
| Deep Navy | `#0B1F33` | Backgrounds, splash, icon base |
| Gold | `#D4A017` | Accents, highlights, CTAs |
| White | `#FFFFFF` | Text on dark backgrounds |

---

## 1. App icon & adaptive icon

See `docs/BRANDING.md` for file paths and safe zones.

| Asset | Dimensions | Format |
|-------|------------|--------|
| Store / Expo icon | **1024 × 1024** | PNG, no transparency (Play store icon) |
| Adaptive foreground | **1024 × 1024** | PNG with transparency |
| Adaptive background | **1024 × 1024** | Solid navy or subtle texture |
| Monochrome (Android 13+) | **1024 × 1024** | Single-color silhouette |

**Design ideas (minimal, premium):**

- Stylized **“Z”** or quotation mark on navy circle  
- Thin gold ring or underline accent  
- No long text — illegible at small sizes  

**Safe zone:** Keep logo inside center **66%** circle — corners are masked on devices.

---

## 2. Splash screen

| Setting | Value |
|---------|--------|
| Background | `#0B1F33` |
| Logo width | 200–280 px (configured in `app.json`) |
| Style | Centered mark + optional “Zurfte Daily” wordmark below |

---

## 3. Feature graphic (required for featuring, recommended)

| Spec | Value |
|------|--------|
| Size | **1024 × 500** px |
| Format | PNG or JPEG (24-bit, no alpha required) |
| Max file size | 15 MB |

**Layout idea:**

```
┌────────────────────────────────────────────────────┐
│  [navy background #0B1F33]                         │
│                                                    │
│     Zurfte Daily          [phone mockup optional]  │
│     ───────────                                    │
│     Motivation for builders                        │
│                                                    │
│     [gold accent line or quote icon]               │
└────────────────────────────────────────────────────┘
```

- Left: app name + tagline in white/gold  
- Right: device frame showing Home screen (optional)  
- Avoid cluttered stock photos — keep entrepreneurial and clean  

---

## 4. Phone screenshots

### Required sizes (Play Console)

Provide **2–8** screenshots. Minimum dimension **320 px**; maximum **3840 px**. Aspect ratio between **16:9** and **9:16**.

**Recommended capture size:** 1080 × 2400 (portrait) on a modern phone.

### Screenshot plan & order

| Order | Screen | What to highlight |
|-------|--------|-------------------|
| 1 | **Home** (light mode) | Hero quote card + “Today’s Motivation” + action buttons |
| 2 | **Home** (dark mode) | Premium navy/gold theme |
| 3 | **Categories** | Horizontal category chips + quote list |
| 4 | **Favorites** | Saved quotes (or elegant empty state if pre-launch) |
| 5 | **Settings** | Dark mode toggle + branding line |

**Tips:**

- Use real in-app UI — no mockups with fake features  
- Status bar clean (full battery, reasonable time)  
- Same device frame optional in Canva/Figma for consistency  
- Light screenshots first, then dark — shows versatility  

### Tablet (optional)

If targeting tablets (`supportsTablet: true`), add 7" and 10" screenshots later.

---

## 5. Promotional assets (optional)

| Asset | Size | Notes |
|-------|------|-------|
| Promo video | YouTube link | 30 sec max recommended — walkthrough Home → Save → Share |
| TV banner | 1280 × 720 | Only if running Android TV ads (not needed for phones) |

---

## Tools (free)

- **Figma / Canva** — feature graphic + screenshot frames  
- **Android Emulator** or physical device — capture screenshots  
- **Expo splash/icon** — replace files in `assets/images/`  

---

## Before upload checklist

- [ ] Icon is custom (not default Expo template)  
- [ ] Feature graphic matches navy + gold brand  
- [ ] Screenshots match current app version  
- [ ] No “beta”, “test”, or “coming soon” text in images  
