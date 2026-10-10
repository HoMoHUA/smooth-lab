# سیستم دیزاین اکستنشنی Smooth Lab

هدف: افکت‌ها و الگوهای این ریپو به‌جای یک سایت مستقل، به‌صورت **اکستنشن** روی سیستم دیزاین فعلی هر سایت سوار شوند؛ بدون اینکه رنگ، فونت، reset یا رفتار اسکرول سایت میزبان را تغییر دهند.

## ۱. ممیزی وضعیت فعلی ریپو

| مشکل | جای مشکل در کد | چرا مانع اکستنشن‌شدن است |
|---|---|---|
| reset سراسری | `client/src/index.css`: `*`، `html`، `body` (`direction: rtl`، فونت Vazirmatn، پس‌زمینه)، `h1,h2,h3,p`، `button` | با واردکردن CSS، کل تایپوگرافی و جهت سایت میزبان عوض می‌شود |
| reduced-motion سراسری | `@media (prefers-reduced-motion)` روی `*` با `!important` | انیمیشن‌های خود سایت میزبان را هم خاموش می‌کند |
| چهار فضای نام برای توکن | `--ds-*`، `--rk-*`، `--fw-*` و نام‌های بدون پیشوند (`--paper`، `--ink`، `--muted`، `--line`) | هیچ قرارداد واحدی وجود ندارد که میزبان بتواند به آن نگاشت کند؛ `--muted` و `--line` با shadcn و سایر سیستم‌ها تداخل دارند |
| رنگ‌های hardcode | حدود ۲۰۰ مقدار hex در CSS (مثلاً ۴۷ بار `#fff`) و در JSX (`workCards`، `slides`) | تغییر برند میزبان روی افکت‌ها اثری ندارد |
| کلاس‌های عمومی | `.reveal`، `.is-visible`، `.hero-*`، `.micro-label` | با کلاس‌های سایت میزبان تداخل دارند |
| افکت = کامپوننت دمو | `ReferenceEffectsKit.tsx`، `ScrollReferenceModules.tsx`، `FullEffectsAtlas.tsx`: منطق افکت، متن فارسی/انگلیسی و تصاویر `/manus-storage` در یک فایل | نمی‌شود فقط «افکت» را برداشت؛ محتوا هم با آن می‌آید |
| یک observer و یک حلقهٔ rAF برای هر کامپوننت | هر کامپوننت حلقهٔ scroll خودش را دارد؛ `Home.tsx` اسکرول کل سند را در اختیار می‌گیرد | در سایت میزبان با اسکرول و حلقه‌های خودش تداخل دارد |
| فقط React | تمام افکت‌ها هوک React هستند | سایت‌های غیر React (WordPress، Bootstrap، سایت ایستا) نمی‌توانند استفاده کنند |
| کد تکراری و مرده | `clamp` چهار بار با ترتیب آرگومان متفاوت؛ `FullEffectsAtlas`، `PremiumEffectsShelf`، `Map`، `ManusDialog` در هیچ مسیری import نمی‌شوند و کلاس‌های `fx-*` در CSS وجود ندارند | هزینهٔ نگه‌داری؛ مرجع واحدی برای هر افکت نیست |

## ۲. معماری جدید

```
extensions/
  core/tokens.css          قرارداد توکن --sl-* (پیش‌فرض‌ها در layer و :where، پس میزبان همیشه برنده است)
  core/theme.ts            connectTheme(): نگاشت توکن‌های میزبان در زمان اجرا
  core/runtime.ts          کشف [data-sl-*]، mount/unmount، یک IntersectionObserver مشترک و یک حلقهٔ rAF مشترک
  core/reduced-motion.css  کاهش حرکت فقط برای عناصر Smooth Lab
  effects/*.ts|css         هر افکت یک اکستنشن مستقل
  adapters/*.css           shadcn، Bootstrap، MUI و سیستم فعلی NeXTPixel (--ds-*)
  index.ts                 API ماژولی (ESM)
  browser.ts               نسخهٔ drop-in با <script> که خودکار شروع می‌شود
  react.ts                 هوک useSmoothLab برای میزبان‌های React
  examples/host-page.html  نمونهٔ یک سایت میزبان با توکن‌های خودش
  tests/                   آزمون قرارداد توکن و runtime
```

### اصول

1. **Opt-in:** هیچ selector عنصری، کلاسی یا سراسری وجود ندارد؛ فقط `[data-sl-*]`. آزمون `contract.test.ts` این قاعده را برای هر فایل CSS بررسی می‌کند.
2. **توکن‌های معنایی:** افکت‌ها فقط `--sl-color-accent`، `--sl-color-surface` و … را می‌خوانند، نه `--ds-cobalt` یا hex.
3. **ترتیب لایه‌ها:** `@layer smooth-lab.tokens, smooth-lab.adapter, smooth-lab.effects`. CSS بدون layer میزبان همیشه برنده است؛ میزبان می‌تواند کل بسته را در لایهٔ دلخواه خودش قرار دهد.
4. **بدون فونت و reset:** فونت پیش‌فرض `inherit` است و جهت از `:dir()` خوانده می‌شود، پس RTL و LTR هر دو کار می‌کنند.
5. **runtime مشترک:** همهٔ افکت‌ها یک observer pool و یک حلقهٔ scroll دارند، و عناصری که بعداً اضافه می‌شوند (SPA) با MutationObserver خودکار mount می‌شوند.
6. **Reduced motion:** هر اکستنشن در این حالت مستقیماً به حالت نهایی می‌رود.

## ۳. اتصال به سایت میزبان

### سایت بدون bundler (WordPress، Bootstrap، HTML ایستا)

```html
<link rel="stylesheet" href="smooth-lab.css">
<link rel="stylesheet" href="adapters/bootstrap.css"> <!-- یا shadcn.css / mui.css -->
<script src="smooth-lab.iife.js" defer></script>

<h2><span data-sl-marker>جملهٔ کلیدی</span></h2>
<ul data-sl-reveal data-sl-stagger="120">…</ul>
```

adapter باید بعد از `smooth-lab.css` بارگذاری شود.

### سیستم دیزاین اختصاصی

یک adapter چندخطی بنویسید:

```css
@layer smooth-lab.adapter {
  :root {
    --sl-color-accent: var(--brand-primary);
    --sl-color-surface: var(--brand-bg);
    --sl-radius-md: var(--brand-radius);
  }
}
```

یا در زمان اجرا: `connectTheme({ "color-accent": "var(--brand-primary)" })`.

### میزبان React

```tsx
import "smooth-lab/smooth-lab.css";
import { useSmoothLab } from "smooth-lab/react";

const ref = useSmoothLab<HTMLElement>();
return <section ref={ref}><p data-sl-word-scrub>…</p></section>;
```

### ساخت

`pnpm build:ext` خروجی را در `dist/extensions/` می‌سازد: `smooth-lab.js` (ESM)، `smooth-lab.iife.js` (drop-in)، `react.js`، `smooth-lab.css` و `adapters/`.

## ۴. قرارداد توکن

| گروه | توکن‌ها |
|---|---|
| رنگ | `color-accent`، `color-accent-contrast`، `color-highlight`، `color-highlight-contrast`، `color-surface`، `color-surface-raised`، `color-surface-inverse`، `color-text`، `color-text-inverse`، `color-text-muted`، `color-border`، `gradient-accent` |
| تایپ | `font-body`، `font-mono` |
| شکل و فاصله | `radius-sm/md/lg`، `space-1` تا `space-4` |
| حرکت | `ease-out`، `ease-in-out`، `ease-standard`، `duration-enter`، `duration-hover`، `reveal-distance` |

همه با پیشوند `--sl-`. فهرست مرجع: `extensions/core/tokens.css`.

## ۵. اکستنشن‌های منتقل‌شده (فاز ۱)

| اکستنشن | attribute | منبع در ریپو |
|---|---|---|
| Reveal + Stagger | `data-sl-reveal`، `data-sl-stagger` | `rk-reveal-*`، الگوی ۰۱ |
| Marker wipe | `data-sl-marker` | `rk-marker-*`، الگوی ۰۳ |
| Marquee (با RTL) | `data-sl-marquee` | `rk-flat-marquee`، الگوی ۰۴ |
| Count-up | `data-sl-count-up` | `data-rk-counts`، الگوی ۱۶ |
| Parallax | `data-sl-parallax` | `data-rk-parallax`، الگوی ۱۳/۱۹ |
| Word scrub | `data-sl-word-scrub` | `data-rk-word`، الگوی ۰۲ |
| Arrow link | `data-sl-arrow-link` | `rk-arrow-link`، الگوی ۰۸ |

## ۶. فاز ۲ — جایگزینی افکت‌های ضعیف با الگوهای Google Labs

بخش‌هایی از Effects Kit که فقط placeholder یا افکت ساده بودند حذف و با اکستنشن‌های جدید جایگزین شدند. الگوها از مشاهدهٔ مستقیم labs.google، notebooklm.google و labs.google/fx استخراج شده‌اند. متن، تصویر، لوگو و کد آن سایت‌ها کپی نشده؛ همهٔ متن‌ها فارسی و تازه و همهٔ تصویرسازی‌ها CSS هستند.

| بخش حذف‌شده | مشکل | جایگزین |
|---|---|---|
| Team cards | آدمک‌های دایره‌ای placeholder | کارت‌های بادبزنی + tilt سه‌بعدی با تصویرسازی زنده |
| Work stack | کارت آبی تخت | Fan cards (باز شدن روی قوس با اسکرول) |
| Custom cursor | قاب سیاه خالی با یک برچسب | Magnetic buttons + tilt/glare |
| Utilities (slider، counter، FAQ) | اسلایدر رنگی ساده | Progress carousel تمام‌عرض |
| Media + page | دو دایرهٔ رنگی روی گرادیان | شکل‌های شناور Labs با parallax عمقی |

| اکستنشن | attribute | الگوی مرجع |
|---|---|---|
| Floating shapes | `data-sl-shapes`، `data-sl-shape="hexagon\|circle\|square\|clover\|pill"` | شکل‌های شناور labs.google (`gl-float-*`) |
| Shape-tinted text | `data-sl-shape-text` + `data-sl-tint` روی شکل | تیتر «Be the first to experiment» که حروف روی شکل رنگ عوض می‌کنند |
| Word rise | `data-sl-rise` | ورود `appearFromTop` در NotebookLM |
| Text shine | `data-sl-shine` | `textShine` روی کلمهٔ تأکیدی NotebookLM |
| Fanned cards | `data-sl-fan` | کارت‌های کج‌شدهٔ labs.google |
| 3D tilt + glare | `data-sl-tilt` | hover کارت‌های پریمیوم |
| Physics pile | `data-sl-pile` | برچسب‌های دسته‌بندی و تودهٔ شکل‌های footer در labs.google |
| Source flow | `data-sl-flow`، `data-sl-flow-source`، `data-sl-flow-hub` | بخش «How it works» در NotebookLM |
| Progress carousel | `data-sl-carousel` | Hero تمام‌عرض labs.google با نوار پیشرفت |
| Magnetic | `data-sl-magnetic` | CTAهای footer |

نمایش زنده: بخش `#labs-motion` در صفحهٔ اصلی (`client/src/components/LabsMotionShowcase.tsx`) که فقط با همین اکستنشن‌ها ساخته شده است.

### نکته‌های اتصال

- **ترتیب لایه‌ها:** اگر CSS اکستنشن قبل از reset سایت بارگذاری شود، reset (مثل preflight در Tailwind) دکمه‌های تولیدی اکستنشن را می‌پوشاند. در سایت میزبان ترتیب را صریح اعلام کنید: `@layer theme, base, components, smooth-lab, utilities;` (نمونه در `client/src/index.css`).
- **اسکرول نرم:** کتابخانه‌هایی که محتوا را با transform جابه‌جا می‌کنند (Lenis یا اسکرول نرم همین سایت) باید در هر فریم `window.dispatchEvent(new Event("sl:scroll"))` بفرستند تا افکت‌های وابسته به اسکرول هم‌گام بمانند.

## ۷. نقشهٔ ادامهٔ مهاجرت

| فاز | کار |
|---|---|
| ۳ — افکت‌های باقی‌ماندهٔ Effects Kit | Split button / text swap، Awards hover، Arc marquee، Hero parallax، Progressive blur، Statement pill |
| ۴ — صحنه‌های اسکرول | Sticky Bento، Pop-out Image (تصویر به‌جای مسیر `/manus-storage` از attribute گرفته شود)، Mind-map branching از NotebookLM |
| ۵ — ماژول‌های بزرگ | HeroField (canvas ذرات، رنگ از `--sl-color-accent`)، Smooth scroll به‌صورت اکستنشن اختیاری روی کل سند، carousel نمونهٔ Fieldworks |
| ۶ — پاک‌سازی سایت دمو | سایت فعلی خودش با `adapters/nextpixel.css` مصرف‌کنندهٔ اکستنشن‌ها شود؛ حذف کامپوننت‌های مرده، `clamp`‌های تکراری و `rk-*`/`--rk-*` پس از انتقال هر افکت |
| ۷ — انتشار | تبدیل `extensions/` به بستهٔ npm مستقل با `exports` برای `.`، `./react`، `./smooth-lab.css` و `./adapters/*` |

برای هر افکت جدید: یک `effects/<name>.ts` با `mount()` و یک `effects/<name>.css` که فقط `[data-sl-<name>]` و توکن‌های `--sl-*` را استفاده کند، ثبت در `index.ts` و `smooth-lab.css`، و یک آزمون در `tests/`.
