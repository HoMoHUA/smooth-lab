# Marquee

> بخشی از [Smooth Lab Extensions](../README.md) · الگوی مرجع: الگوی ۰۴ Effects Kit · فایل‌ها: `extensions/effects/marquee.ts` و `.css`

محتوا یک بار کپی (با `aria-hidden`) و بی‌پایان چرخانده می‌شود. روی hover می‌ایستد و در صفحه‌های RTL جهتش برعکس می‌شود.

## پیش‌نیاز

بستهٔ اکستنشن‌ها یک بار در سایت بارگذاری شده باشد ([راهنمای نصب](../setup/install.md)). برای استفادهٔ تکی به‌جای کل بسته، [بخش «فقط همین افکت»](#فقط-همین-افکت) را ببینید.

## نشانه‌گذاری

### HTML (مثال با کلاس‌های Bootstrap)

```html
<div class="bg-warning py-3 fs-1 fw-bold" data-sl-marquee data-sl-marquee-duration="18">
  <span>REVEAL</span><span>✦</span><span>HOVER</span><span>✦</span><span>SCROLL</span><span>✦</span>
</div>
```

### React + Tailwind / shadcn

```tsx
<div className="bg-accent py-4 text-4xl font-bold [--sl-marquee-gap:3rem]" data-sl-marquee>
  {items.map((item) => <span key={item}>{item}</span>)}
</div>
```

در React، زیردرخت را با هوک `useSmoothLab()` فعال کنید (بخش «React» در [راهنمای نصب](../setup/install.md)).

## تنظیمات

| تنظیم | پیش‌فرض | توضیح |
|---|---|---|
| `data-sl-marquee` | — | روی ظرف ردیف |
| `data-sl-marquee-duration` | `22` (ثانیه) | مدت یک دور کامل |

### متغیرهای CSS مخصوص این افکت

| متغیر | پیش‌فرض | توضیح |
|---|---|---|
| `--sl-marquee-gap` | `2rem` | فاصلهٔ بین آیتم‌ها |

## اتصال به سیستم دیزاین

این افکت هیچ توکن رنگ یا حرکتی از سیستم دیزاین نمی‌خواند؛ ظاهرش کاملاً از CSS خود سایت می‌آید.

## فقط همین افکت

```ts
import { createSmoothLab, marquee } from "smooth-lab-extensions";
import "smooth-lab-extensions/core/tokens.css";
import "smooth-lab-extensions/effects/marquee.css";
import "smooth-lab-extensions/core/reduced-motion.css";
createSmoothLab({ extensions: [marquee] });
```

## نکته‌ها

- آیتم‌ها باید آن‌قدر باشند که حداقل عرض صفحه را پر کنند.
- data-sl-* درون نسخهٔ کپی حذف می‌شود تا افکت‌های دیگر دوبار اجرا نشوند.

## کاهش حرکت

محتوا ثابت و بدون کپی نمایش داده می‌شود.
