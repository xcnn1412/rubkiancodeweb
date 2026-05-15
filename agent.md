# AGENT.md — RubKianCode Website

คู่มือสำหรับ AI agent ที่จะมาแก้ / เพิ่ม / ดูแล codebase นี้
> เว็บ marketing ของ **บริษัท รับเขียนโค้ด จำกัด** — Next.js 16 App Router · React 19 · TypeScript · Tailwind v4

---

## TL;DR — รู้แค่นี้ก่อนเริ่มแก้

1. **Single source of truth สำหรับ service ทั้งหมด** อยู่ที่ [`app/services/_data/services.tsx`](app/services/_data/services.tsx) — เพิ่ม/แก้ service ทำที่เดียว, route `/services/{slug}` จะ generate อัตโนมัติ
2. **Server Component เป็น default** — ใส่ `"use client"` เฉพาะตอนต้องใช้ hooks/event handlers
3. **ทุก CTA / contact button ต้อง track** ด้วย helper จาก [`lib/analytics.ts`](lib/analytics.ts) — ห้ามเรียก `gtag` ตรงๆ
4. **Design language = retro arcade / pixel** — 3px black border, offset box-shadow, pixel corner accents, Press Start 2P font
5. **i18n รองรับ 11 ภาษา** ผ่าน `next-intl` — string ใหม่ต้องไปเพิ่มใน `messages/{lang}.json`
6. **Path alias**: `@/` → root (เช่น `@/lib/analytics`, `@/components/rubkiancode/...`)

---

## Stack

| Layer | Tool | Version |
|---|---|---|
| Framework | Next.js (App Router + Turbopack) | 16.2.0 |
| UI | React | 19.2.4 |
| Lang | TypeScript | 5.7.3 |
| Styling | Tailwind CSS v4 + PostCSS | 4.2.0 |
| i18n | next-intl | 4.8.3 |
| UI primitives | Radix UI (28 packages) | — |
| Forms | React Hook Form + Zod | 7.54 / 3.24 |
| Analytics | `@next/third-parties/google` + `@vercel/analytics` | — |
| Charts | Recharts | 2.15 |
| Icons | Lucide React | ^0.564 |
| Runtime | Node | ≥ 20.9 |

Package manager: **npm**.

---

## โครงสร้างโฟลเดอร์

```
app/
├── (rubkiancode)/        # route group ของ homepage + marketing
│   ├── page.tsx          # Server Component — หน้าแรก
│   ├── _config/          # nav-items.ts (underscored = ไม่เป็น route)
│   └── opengraph-image.tsx + twitter-image.tsx
├── services/
│   ├── page.tsx          # /services index
│   ├── _data/
│   │   └── services.tsx  # ⭐ SINGLE SOURCE OF TRUTH ของ service
│   ├── [slug]/           # dynamic detail page (auto-generated)
│   │   ├── page.tsx
│   │   ├── not-found.tsx
│   │   └── opengraph-image.tsx + twitter-image.tsx
│   └── opengraph-image.tsx + twitter-image.tsx
├── renew/                # static page (customPage: true ใน data)
├── layout.tsx            # root layout: font, providers, GA, JSON-LD
├── globals.css           # Tailwind v4 + theme tokens + retro animations
├── robots.ts             # robots.txt generation
└── sitemap.ts            # dynamic sitemap (รวม service routes)

components/
├── rubkiancode/          # ⭐ section UI ของ brand (hero, services, cta, footer ฯลฯ)
├── sections/             # section pattern แบบ reusable + photobooth-specific
├── layout/               # navbar, footer (global)
├── ui/                   # Radix UI wrapper (shadcn-style: badge, button ฯลฯ)
├── effects/              # visual effect (code-bg)
├── photobooth/           # photobooth-specific
└── widgets/              # micro-component ใช้ข้ามโปรเจ็กต์

lib/
├── analytics.ts          # ⭐ GA4 event helpers (trackContactClick ฯลฯ)
├── intl-provider.tsx     # NextIntlClientProvider wrapper
├── language-context.tsx  # Language state + LANG_OPTIONS (11 ภาษา)
├── lang-config.ts        # typography ต่อภาษา
├── og-fonts.ts           # font loading สำหรับ OG image generation
└── utils.ts

messages/                 # 11 ไฟล์ json (th, en, lo, my, vi, km, ms, id, fil, sg, bn)
data/                     # static data (e.g. contact-banner.ts)
providers/                # ExitTransitionProvider ฯลฯ
public/
├── images/{category}/    # screenshot / project asset
└── videos/{category}/    # video preview (1y cache)
```

---

## Routing patterns

### App Router rules
- **Default = Server Component.** ใส่ `"use client"` **เฉพาะ** ตอนต้องใช้ `useState` / `useEffect` / event handler / browser API
- **Route groups** `(group)/` ไม่ส่งผลกับ URL — ใช้แค่จัดกลุ่ม
- **Underscored folder** `_data/` `_config/` = ไม่เป็น route แต่ใช้ host code ภายใต้ route segment ได้
- **Static-first** — ทุก route prerender ตอน build (`generateStaticParams`) เพื่อ SEO + speed

### Dynamic route + customPage flag
[`app/services/[slug]/page.tsx`](app/services/[slug]/page.tsx) สร้าง static page ให้ทุก service:
```ts
export function generateStaticParams() {
  return SERVICES.filter((s) => !s.customPage).map((s) => ({ slug: s.slug }))
}
```
ถ้า service ตัวไหนต้องการ layout พิเศษ → set `customPage: true` ใน data + สร้างโฟลเดอร์ static เอง (เช่น [`app/renew/page.tsx`](app/renew/page.tsx))

### Below-the-fold = dynamic import
```tsx
const CtaSection = dynamic(() =>
  import("@/components/rubkiancode/cta-section").then((m) => ({ default: m.CtaSection }))
)
```
ลด initial JS bundle. ใช้กับ section ที่ user ต้อง scroll ลงไปถึงเท่านั้น

---

## Data layer — Service catalog

### ⭐ ทุกอย่างเกี่ยวกับ service อยู่ที่ [`app/services/_data/services.tsx`](app/services/_data/services.tsx)

**Service shape (สรุป):**
```ts
type Service = {
  slug: string              // URL identifier
  num: string               // "01", "02" ใช้แสดงเลขลำดับ
  title: string             // ภาษาไทย
  subtitle: string          // English
  description: string
  features: string[]        // bullet list
  duration: string          // "เริ่มต้น 4 สัปดาห์"
  startingPrice?: string
  accent: string            // hex color ของ service นี้
  featured: boolean         // true = ขึ้น homepage
  customPage?: boolean      // true = มี static page เอง อย่า auto-gen
  extraOnly?: boolean       // true = แสดงเฉพาะ Extra Services
  meta: { title: string; description: string }
  art: ReactNode            // pixel art SVG fallback
  heroImage?: Screenshot
  heroVideo?: string | string[]
  screenshots?: Screenshot[]
  keyFeatures?: KeyFeature[]       // deep-dive USP sections
  slideshowSections?: SlideshowSection[]
  realtimeDashboard?: RealtimeDashboard
  partnerCta?: { ... }
  rentalVersions?: { ... }
}
```

**Helper functions ที่มีอยู่แล้ว — ใช้ตัวที่มี อย่าเขียนใหม่:**
- `getService(slug)` → `Service | undefined`
- `getFeaturedServices()` → 4 ตัวบน homepage
- `getMainProducts()` → main grid บน `/services`
- `getExtraServices()` → Extra Services section
- `getRelatedServices(slug, limit?)` → related cards
- `getServiceHref(service)` → `/services/{slug}`

### เพิ่ม service ใหม่
1. เปิด `app/services/_data/services.tsx`
2. เพิ่ม object ใน `SERVICES` array (required: slug, title, description, features, accent, meta, art)
3. Optional: `heroImage`, `heroVideo`, `screenshots`, `keyFeatures`, `slideshowSections`
4. ตั้ง `featured: true` ถ้าอยากให้ขึ้น homepage
5. **ไม่ต้องแตะ routing** — `/services/{slug}` จะมีอัตโนมัติ

---

## Component conventions

### Naming
- ไฟล์ component: **kebab-case** (`hero-section.tsx`, `key-services-section.tsx`)
- React component: **PascalCase** (`export function HeroSection()`)
- ไฟล์ util / hook: **kebab-case** (`og-fonts.ts`, `lang-config.ts`)
- ไม่มี `index.tsx` re-export — import ตรงจากไฟล์เลย

### โฟลเดอร์ component แบ่งยังไง
| Folder | ใส่อะไร |
|---|---|
| `components/rubkiancode/` | **section UI ของแบรนด์** ที่ใช้ในเว็บ rubkiancode โดยตรง (navbar, hero, services, cta, footer, popup ฯลฯ) |
| `components/sections/` | section pattern แบบ reusable + photobooth-specific (showcase, contact-banner ฯลฯ) |
| `components/layout/` | layout primitive (navbar, footer แบบ generic) |
| `components/ui/` | Radix UI wrapper (shadcn style: `button.tsx`, `badge.tsx`, `dialog.tsx`...) |
| `components/effects/` | visual effect (`code-bg.tsx`) |
| `components/photobooth/` | photobooth feature-specific |
| `components/widgets/` | micro-component |

### Server vs Client — ตัดสินใจยังไง
```
ใส่ "use client" เมื่อ:
- ใช้ useState / useReducer / useEffect / useRef
- ใช้ event handler (onClick, onChange, onSubmit) — เว้นแต่ wrap ด้วย <TrackClick>
- ใช้ browser-only API (window, document, localStorage)
- ใช้ next/navigation hooks (usePathname, useRouter)

ไม่ต้องใส่ "use client" เมื่อ:
- render UI static อย่างเดียว
- ใช้ <Link> เปลี่ยนหน้า (Link ใช้ได้ทั้ง 2 ฝั่ง)
- ใช้ generateMetadata / generateStaticParams (เป็น server-only)
```

### Pattern พิเศษ — ทำ click tracking ใน server component
ถ้าหน้าเป็น Server Component (มี `generateMetadata`/`generateStaticParams`) แต่ต้องการ track click ของปุ่ม → wrap ด้วย [`<TrackClick>`](components/rubkiancode/track-click.tsx) ที่เป็น client wrapper บางๆ (display: contents, ไม่กระทบ layout):
```tsx
import { TrackClick } from "@/components/rubkiancode/track-click"

<TrackClick kind="cta" label={`request_quote:${service.slug}`}>
  <Link href="/#contact" className="...">ขอใบเสนอราคา</Link>
</TrackClick>

<TrackClick kind="contact" channel="line">
  <a href="https://lin.ee/ZDaqVzd">คุยผ่าน LINE</a>
</TrackClick>
```

### Shared primitives ที่ควรใช้ซ้ำ
- **`SectionHead`** ([`key-services-section.tsx`](components/rubkiancode/key-services-section.tsx)) — eyebrow badge + heading + description ที่ใช้กับทุก section
- **`VideoLoopPreview`** ([`video-loop-preview.tsx`](components/rubkiancode/video-loop-preview.tsx)) — autoplay/muted/loop video preview, รองรับหลายไฟล์
- **`ImageSlideshow`** ([`image-slideshow.tsx`](components/rubkiancode/image-slideshow.tsx)) — crossfade screenshot gallery
- **`ScreenshotsGallery`** ([`screenshots-gallery.tsx`](components/rubkiancode/screenshots-gallery.tsx)) — grid + lightbox สำหรับ service detail
- **`ContactPopup`** ([`contact-popup.tsx`](components/rubkiancode/contact-popup.tsx)) — modal ติดต่อ มี ESC-to-close + body scroll lock + auto GA tracking

---

## Styling — Retro / Arcade pixel design

### Brand palette
| Token | Hex | ใช้ตอนไหน |
|---|---|---|
| Ink (navy) | `#0A2540` | text หลัก, border ทุกอัน |
| Paper (cream) | `#F4EDE0` | background page |
| Yellow | `#F1C40F` | accent, pixel corner |
| Red | `#E63946` | primary CTA, marketing-system service |
| Green | `#2ECC71` | LINE, uptime status |
| Blue | `#3498DB` | office-erp service |
| Orange | `#F39C12` | phone, photobooth |

แต่ละ service object มี field `accent: string` ของตัวเอง — ใช้สี accent ในการ์ดและ shadow

### Typography
3 fonts โหลดจาก `next/font/google` ใน [`app/layout.tsx`](app/layout.tsx):
| Font | CSS class | ใช้ตอนไหน |
|---|---|---|
| Prompt | (default body) | text ทุกที่ — รองรับไทย+อังกฤษ |
| Press Start 2P | `font-pixel` | label / eyebrow / button arcade-style |
| VT323 | `font-pixelify` | tagline / terminal-style text |

### Pixel design pattern (จำเอาไว้)
ใช้ซ้ำเกือบทุก card / button:
```tsx
style={{
  border: "3px solid #0A2540",
  boxShadow: "8px 8px 0 " + accent,   // ⭐ offset shadow ไม่มี blur
}}
className="hover:-translate-x-0.5 hover:-translate-y-0.5"  // hover ให้ shadow โผล่
```

**Pixel corner accents** (มุม 4 มุม):
```tsx
<span aria-hidden className="absolute left-0 top-0 h-3 w-3 bg-[#F1C40F]" />
<span aria-hidden className="absolute right-0 top-0 h-3 w-3 bg-[#F1C40F]" />
<span aria-hidden className="absolute bottom-0 left-0 h-3 w-3 bg-[#F1C40F]" />
<span aria-hidden className="absolute bottom-0 right-0 h-3 w-3 bg-[#F1C40F]" />
```

### CSS animations ที่มีอยู่แล้ว
อยู่ใน [`app/globals.css`](app/globals.css) — เรียกผ่าน class ได้เลย ไม่ต้องเขียนใหม่:
- `rk-marquee-scroll` — ticker text 45s linear infinite
- `rk-petal-fall-a/b/c` — sakura petals ตก
- `rk-twinkle`, `rk-float`, `rk-bounce`
- `rk-led-blink`, `rk-led-pulse`, `rk-led-flicker` — server status indicator
- `rk-firework-launch-a/b/c` — explosion effect
- `rk-bar-fill-in` — progress bar 0% → target

CRT/retro effect: `.retro-scanlines`, `.retro-vignette`, `.crt-flicker`
Shimmer hover: `.btn-shimmer` + `.shimmer-light` (light sweep 0.55s)

---

## Internationalization

### Setup
- `next-intl` v4.8 + `NextIntlClientProvider` wrap ใน [`lib/intl-provider.tsx`](lib/intl-provider.tsx)
- Language state อยู่ใน React Context: [`lib/language-context.tsx`](lib/language-context.tsx)
- 11 ภาษา: **th, en, lo, my, vi, km, ms, id, fil, sg, bn**

### ใช้ string จาก message file
```tsx
"use client"
import { useTranslations } from "next-intl"

export function MyComponent() {
  const t = useTranslations("namespace")
  return <h1>{t("hero.title")}</h1>
}
```

### เพิ่มภาษาใหม่ / string ใหม่
1. เพิ่ม key ใน `messages/th.json` (default) + ทุกภาษาอื่น
2. หรือเพิ่ม language code ใน `LANG_OPTIONS` ของ `lib/language-context.tsx`

### หลีกเลี่ยง
- ❌ อย่า hard-code string ลงใน component — ใช้ `t("...")` ทุกครั้ง
- ❌ อย่าแก้แค่ `th.json` แล้วลืมภาษาอื่น

---

## Analytics — GA4 event tracking

### Architecture
- **`<GoogleAnalytics gaId="G-Q788F5FJKH">`** จาก `@next/third-parties/google` mount ใน root layout (ดู [`app/layout.tsx`](app/layout.tsx)) — รองรับ SPA pageview อัตโนมัติ
- **`<ScrollDepthTracker />`** mount ใน root layout — ส่ง event 25/50/75/90% scroll, reset ต่อ pathname
- **`<Analytics />`** จาก `@vercel/analytics` — track Core Web Vitals

### ทุก event ต้องใช้ helper จาก [`lib/analytics.ts`](lib/analytics.ts)
```ts
trackContactClick(channel: 'line'|'phone'|'email'|'facebook', source: ContactSource)
trackServiceCardClick(slug: string, source: 'key_services'|'extra_services'|'services_list')
trackCTAClick(label: string, source: ContactSource)
trackContactPopupOpen(source: string)
trackContactFormSubmit({ service?: string; status: 'success'|'error' })
trackScrollDepth(percent: 25|50|75|90)
```

### ใน Client Component
```tsx
"use client"
import { trackContactClick } from "@/lib/analytics"

<a href="tel:0635944429" onClick={() => trackContactClick("phone", "footer")}>
  063-594-4429
</a>
```

### ใน Server Component
ใช้ [`<TrackClick>`](components/rubkiancode/track-click.tsx) wrap:
```tsx
import { TrackClick } from "@/components/rubkiancode/track-click"

<TrackClick kind="cta" label="request_quote">
  <Link href="/#contact">ขอใบเสนอราคา</Link>
</TrackClick>
```

### ❌ DON'T
- ห้ามเรียก `gtag(...)` หรือ `window.dataLayer.push(...)` ตรงๆ
- ห้าม `sendGAEvent(...)` ตรงๆ จาก component — ผ่าน wrapper ใน `lib/analytics.ts` เสมอ (เพื่อ type safety + naming consistency)
- ถ้าเพิ่ม event ใหม่ ให้เพิ่มฟังก์ชันใน `lib/analytics.ts` ก่อน แล้วค่อยเรียกใช้

---

## SEO / Metadata

### Per-route metadata
```tsx
// app/some-page/page.tsx
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "...",
  description: "...",
  alternates: { canonical: "/some-page" },
  openGraph: { ... },
  twitter: { ... },
}
```

### Dynamic metadata (จาก data)
[`app/services/[slug]/page.tsx`](app/services/[slug]/page.tsx) ใช้ `generateMetadata`:
```tsx
export async function generateMetadata({ params }): Promise<Metadata> {
  const { slug } = await params
  const service = getService(slug)
  if (!service) return {}
  return { title: service.meta.title, description: service.meta.description }
}
```

### OG / Twitter image
สร้างไฟล์ `opengraph-image.tsx` + `twitter-image.tsx` ในโฟลเดอร์ route segment — Next.js inject `<meta og:image>` ให้อัตโนมัติ ไม่ต้องเขียน meta tag เอง
- Convention: 1200x630 สำหรับ OG, ใช้ฟอนต์จาก [`lib/og-fonts.ts`](lib/og-fonts.ts)

### JSON-LD
Organization schema ฝังใน [`app/layout.tsx`](app/layout.tsx) (`ORG_JSON_LD`). หน้า homepage มี ItemList schema เพิ่มอีก. ถ้าเพิ่มหน้าใหม่ที่ต้องการ rich result → เพิ่ม JSON-LD เฉพาะหน้า

### robots + sitemap
- [`app/robots.ts`](app/robots.ts) — block `/api`, `/_next`, `/admin`
- [`app/sitemap.ts`](app/sitemap.ts) — auto-include service routes ทุกตัว

---

## Build / Dev

```bash
npm run dev        # localhost:3000 (Turbopack)
npm run build      # production build
npm run start      # run production locally
npm run lint       # ESLint .
```

### TypeScript path alias
```json
"paths": { "@/*": ["./*"] }
```
ใช้ `@/components/...`, `@/lib/...`, `@/app/...` ทุกครั้ง — อย่า relative path ยาวๆ (`../../../`)

### next.config.mjs สำคัญ
- `typescript.ignoreBuildErrors: true` — build ผ่านแม้มี TS error (ระวัง! ตรวจ `tsc --noEmit` ก่อน commit)
- `images.formats: ['avif', 'webp']` — Next/Image แปลงให้อัตโนมัติ
- `/images/*` และ `/videos/*` ได้ `Cache-Control: public, max-age=31536000, immutable` (1 ปี — เปลี่ยน file ต้อง rename!)
- Redirect: `/photoboothsoftware` → `/services/photoboothsoftware` (permanent)

### Vercel deployment
- Auto deploy เมื่อ push `main` ขึ้น `RubKianCode/rubkiancodeweb` (upstream)
- Production URL: `https://rubkiancode.com`
- Vercel Analytics + Speed Insights เปิดใช้แล้ว

---

## Git workflow

```
upstream = RubKianCode/rubkiancodeweb  (repo หลัก)
origin   = xcnn1412/rubkiancodeweb     (fork)

pull   :  git pull upstream main
push   :  git push origin main → เปิด PR ไป upstream
```

ดู [`agent.md`](agent.md) section นี้ + commit log style:
- prefix `feat:`, `fix:`, `chore:`, `refactor:` แบบ conventional commit
- เขียนภาษาไทยหรืออังกฤษก็ได้ — ไม่บังคับ

---

## Image / Video conventions

### โฟลเดอร์
| Path | ใส่อะไร |
|---|---|
| `public/images/example-products/` | screenshot ของ service (marketing1.jpg ฯลฯ) |
| `public/images/project{N}/` | portfolio project images |
| `public/images/photoboothscreenshot/` | photobooth dashboard preview |
| `public/images/productlivew/` | live view product video/image |
| `public/videos/{category}/` | video preview (loop, muted) |

### Rules
- ใช้ `next/image` ทุกครั้ง — ห้าม `<img>` plain
- ใส่ `alt` ที่มีความหมาย (ไม่ใช่ "image1")
- ใช้ `priority` เฉพาะ above-the-fold (เช่น hero)
- ใช้ `loading="lazy"` (default) สำหรับที่เหลือ
- ใช้ `sizes` ที่ตรงกับ layout จริง (เพื่อ responsive image)
- ไฟล์ใหม่ → file name unique (เพราะ cache 1 ปี immutable)

---

## Conventions ที่ต้องตามเสมอ

### ✅ DO
- ใช้ Server Component เป็น default — `"use client"` เฉพาะที่จำเป็น
- เพิ่ม service ที่ `_data/services.tsx` ที่เดียว
- ใช้ helper จาก `lib/analytics.ts` สำหรับทุก event
- ใช้ `next/image`, `next/link`, `next/font`
- Path alias `@/` ทุกครั้ง
- ใช้ `<SectionHead>`, `<VideoLoopPreview>`, `<ImageSlideshow>` ที่มีอยู่แล้ว ก่อนเขียนใหม่
- ใส่ pixel design pattern (3px border + offset shadow + corner accents) ในการ์ดใหม่

### ❌ DON'T
- ห้าม hard-code string → ใช้ next-intl `t("...")`
- ห้ามเรียก `gtag` / `dataLayer` ตรงๆ → ผ่าน `lib/analytics.ts`
- ห้ามใช้ `<img>` plain → `next/image`
- ห้าม relative path ยาว (`../../../`) → ใช้ `@/`
- ห้ามสร้าง routing file สำหรับ service ใหม่ — แก้ที่ `_data/services.tsx` ก็พอ
- ห้ามใส่ `"use client"` ในไฟล์ที่ render static — เพิ่ม JS bundle เปล่าๆ
- ห้ามเปลี่ยน font / สี brand โดยไม่คุย — มี design system ชัดอยู่แล้ว
- ห้าม push ตรงไป upstream/main — ผ่าน PR เสมอ

---

## Cheat sheet — งานที่เจอบ่อย

### เพิ่ม service ใหม่ → 1 ไฟล์
แก้แค่ `app/services/_data/services.tsx`

### เพิ่ม section ใหม่บน homepage
1. สร้าง component ใน `components/rubkiancode/{kebab-name}.tsx`
2. Import ใน `app/(rubkiancode)/page.tsx`
3. ถ้าเป็น below-the-fold → ใช้ `dynamic()`

### เพิ่ม CTA button ใหม่
1. เขียน `<Link>` / `<a>` ตามปกติ
2. Server component → wrap ด้วย `<TrackClick kind="cta" label="...">`
3. Client component → ใส่ `onClick={() => trackCTAClick("label", "source")}`

### เพิ่มภาษาใหม่
1. เพิ่ม locale code ใน `LANG_OPTIONS` ของ `lib/language-context.tsx`
2. สร้าง `messages/{code}.json` แล้ว copy key จาก `messages/th.json` มาแปล
3. เพิ่ม import ใน `lib/intl-provider.tsx`

### เพิ่ม event tracking ใหม่
1. เพิ่มฟังก์ชันใน `lib/analytics.ts`
2. เรียกจาก component (client) หรือ wrap ด้วย `<TrackClick>` (server)

### Debug GA event
- เปิด GA4 → DebugView (มี extension Google Tag Assistant)
- หรือเปิด DevTools → Network filter `collect` → ดู query param `en` (event name) + custom params

---

## ติดต่อ / Resources

- **Production**: https://rubkiancode.com
- **Repo**: https://github.com/RubKianCode/rubkiancodeweb (upstream)
- **GA4 Measurement ID**: `G-Q788F5FJKH`
- **Business info**: บริษัท รับเขียนโค้ด จำกัด, taxID `0105569041779`

---

_Last updated: 2026-05-15_
