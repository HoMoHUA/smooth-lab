# نصب و راه‌اندازی

## ۱. ساخت بسته

```bash
pnpm install
pnpm build:ext        # خروجی: dist/extensions (بستهٔ smooth-lab-extensions)
```

در فایل zip تحویلی، `dist/extensions` از قبل ساخته شده است.

`dist/extensions` شامل این‌هاست:

| فایل | کاربرد |
|---|---|
| `index.js` + `index.d.ts` | ESM با همهٔ اکستنشن‌ها (tree-shakeable) |
| `react.js` | هوک `useSmoothLab` |
| `smooth-lab.iife.js` | نسخهٔ drop-in برای `<script>` |
| `smooth-lab.css` | همهٔ CSSها در یک فایل |
| `core/*.css`، `effects/*.css`، `adapters/*.css` | CSS تکی برای استفادهٔ موردی |

## ۲. سه روش بارگذاری

### الف) با bundler (Vite، Next.js، Webpack)

```bash
# پوشه را در پروژه کپی کنید یا مستقیم از مسیر نصب کنید
pnpm add ./vendor/smooth-lab-extensions      # یا: npm i file:../smooth-lab/dist/extensions
```

```ts
import { startSmoothLab } from "smooth-lab-extensions";
import "smooth-lab-extensions/smooth-lab.css";
import "smooth-lab-extensions/adapters/shadcn.css"; // آداپتور سیستم شما

startSmoothLab(); // همهٔ اکستنشن‌ها روی کل document
```

فقط چند افکت؟

```ts
import { createSmoothLab, reveal, marker } from "smooth-lab-extensions";
import "smooth-lab-extensions/core/tokens.css";
import "smooth-lab-extensions/effects/reveal.css";
import "smooth-lab-extensions/effects/marker.css";
import "smooth-lab-extensions/core/reduced-motion.css";

createSmoothLab({ extensions: [reveal, marker] });
```

### ب) بدون bundler

```html
<link rel="stylesheet" href="/vendor/smooth-lab/smooth-lab.css">
<link rel="stylesheet" href="/vendor/smooth-lab/adapters/bootstrap.css">
<script src="/vendor/smooth-lab/smooth-lab.iife.js" defer></script>
```

خودکار شروع می‌شود. برای شروع دستی به تگ script بدهید `data-sl-manual` و بعد `window.SmoothLab.startSmoothLab()` را صدا بزنید.

### ج) React

```tsx
import { useSmoothLab } from "smooth-lab-extensions/react";
import "smooth-lab-extensions/smooth-lab.css";

export function Features() {
  const ref = useSmoothLab<HTMLElement>();          // فقط همین زیردرخت
  return <section ref={ref}><h2 data-sl-rise>…</h2></section>;
}
```

هوک با unmount همه‌چیز را پاک می‌کند. عنصرهایی که بعداً اضافه شوند (SPA) خودکار فعال می‌شوند.

## ۳. ترتیب لایه‌های CSS (مهم)

همهٔ CSS اکستنشن‌ها در `@layer smooth-lab.*` است تا CSS بدون layer سایت همیشه برنده باشد. اگر سیستم دیزاین شما reset در layer دارد (مثل Tailwind v4)، ترتیب را **قبل از همهٔ importها** اعلام کنید، وگرنه reset دکمه‌های ساخته‌شده توسط اکستنشن (مثلاً کنترل‌های Carousel) را پاک می‌کند:

```css
/* اولین خط CSS اصلی سایت */
@layer theme, base, components, smooth-lab, utilities;
```

آداپتور را **بعد از** `smooth-lab.css` یا `core/tokens.css` بارگذاری کنید.

## ۴. اتصال توکن‌ها

سه راه، از ساده به سفارشی:

1. آداپتور آماده: `adapters/shadcn.css`، `bootstrap.css`، `mui.css`، `nextpixel.css`
2. آداپتور چندخطی خودتان ([CSS اختصاصی](custom-css.md))
3. در زمان اجرا:

```ts
import { connectTheme } from "smooth-lab-extensions";
const disconnect = connectTheme({ "color-accent": "var(--brand-500)", "radius-md": "12px" });
```

فهرست کامل توکن‌ها: `extensions/core/tokens.css`.

## ۵. اسکرول نرم (Lenis، Locomotive، اسکرول نرم اختصاصی)

افکت‌های وابسته به اسکرول (Parallax، Word Scrub، Fan، Floating Shapes با depth) با رویداد `scroll` پنجره به‌روز می‌شوند. کتابخانه‌ای که محتوا را با transform جابه‌جا می‌کند باید در هر فریم این رویداد را بفرستد:

```ts
lenis.on("scroll", () => window.dispatchEvent(new Event("sl:scroll")));
```

برای کامپوننت‌های React با framer-motion، الگوی `client/src/motion/visualScroll.ts` را ببینید.

## ۶. کاهش حرکت

- اکستنشن‌ها خودشان `prefers-reduced-motion` را رعایت می‌کنند.
- برای کامپوننت‌های framer-motion یک بار در ریشه بگذارید: `<MotionConfig reducedMotion="user">`.
