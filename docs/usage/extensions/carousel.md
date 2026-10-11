# Progress Carousel

> بخشی از [Smooth Lab Extensions](../README.md) · الگوی مرجع: Hero تمام‌عرض labs.google · فایل‌ها: `extensions/effects/carousel.ts` و `.css`

اسلایدر خودکار با دکمهٔ قبل/بعد و نوار پیشرفت. زمان‌بندی با انیمیشن CSS است، پس روی hover و focus و وقتی از دید خارج شود خودبه‌خود می‌ایستد.

## پیش‌نیاز

بستهٔ اکستنشن‌ها یک بار در سایت بارگذاری شده باشد ([راهنمای نصب](../setup/install.md)). برای استفادهٔ تکی به‌جای کل بسته، [بخش «فقط همین افکت»](#فقط-همین-افکت) را ببینید.

## نشانه‌گذاری

### HTML (مثال با کلاس‌های Bootstrap)

```html
<div class="rounded-5 overflow-hidden" style="min-height: 70vh" data-sl-carousel
     data-sl-carousel-previous="اسلاید قبلی" data-sl-carousel-next="اسلاید بعدی" aria-label="آزمایش‌های شاخص">
  <article class="d-flex align-items-center justify-content-center text-bg-primary">…</article>
  <article class="d-flex align-items-center justify-content-center text-bg-dark">…</article>
</div>
```

### React + Tailwind / shadcn

```tsx
<div data-sl-carousel aria-label="ویژه‌ها" className="min-h-[70vh] rounded-3xl">
  {slides.map((slide) => <article key={slide.id} className="grid place-items-center">…</article>)}
</div>
```

در React، زیردرخت را با هوک `useSmoothLab()` فعال کنید (بخش «React» در [راهنمای نصب](../setup/install.md)).

## تنظیمات

| تنظیم | پیش‌فرض | توضیح |
|---|---|---|
| `data-sl-carousel` | — | روی ظرف؛ هر فرزند یک اسلاید |
| `data-sl-carousel-interval` | `5500` (ms) | مدت هر اسلاید |
| `data-sl-carousel-previous` | `Previous slide` | برچسب دسترسی دکمهٔ قبل |
| `data-sl-carousel-next` | `Next slide` | برچسب دسترسی دکمهٔ بعد |

## اتصال به سیستم دیزاین

| توکن | پیش‌فرض | shadcn / Tailwind | Bootstrap 5 | MUI | NeXTPixel |
|---|---|---|---|---|---|
| `--sl-color-surface-inverse` | `#111521` | `var(--foreground)` | `var(--bs-emphasis-color)` | `var(--mui-palette-text-primary)` | `var(--ds-ink)` |
| `--sl-color-text-inverse` | `#ffffff` | `var(--background)` | `var(--bs-body-bg)` | `var(--mui-palette-background-default)` | پیش‌فرض |
| `--sl-duration-hover` | `240ms` | پیش‌فرض | پیش‌فرض | پیش‌فرض | پیش‌فرض |
| `--sl-ease-out` | `cubic-bezier(0.23, 1, 0.32, 1)` | پیش‌فرض | پیش‌فرض | پیش‌فرض | `var(--ds-ease-out)` |

ستون «پیش‌فرض» یعنی آداپتور آن سیستم این توکن را نگاشت نمی‌کند و مقدار پیش‌فرض Smooth Lab استفاده می‌شود؛ برای تغییرش همان توکن را در CSS سایت تعریف کنید.

## فقط همین افکت

```ts
import { createSmoothLab, carousel } from "smooth-lab-extensions";
import "smooth-lab-extensions/core/tokens.css";
import "smooth-lab-extensions/effects/carousel.css";
import "smooth-lab-extensions/core/reduced-motion.css";
createSmoothLab({ extensions: [carousel] });
```

## نکته‌ها

- دکمه‌ها را خود اکستنشن می‌سازد. اگر reset سیستم دیزاین (Tailwind preflight، Bootstrap reboot) استایل آن‌ها را پاک کرد، ترتیب لایه‌ها را درست کنید ([راهنمای نصب](../setup/install.md)).
- برای انیمیشن محتوای اسلاید فعال از selector `[data-sl-carousel-slide="active"]` استفاده کنید.
- اسلایدهای غیرفعال `inert` و `aria-hidden` می‌گیرند.

## کاهش حرکت

پخش خودکار خاموش است؛ دکمه‌ها کار می‌کنند.
