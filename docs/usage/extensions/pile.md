# Physics Pile

> بخشی از [Smooth Lab Extensions](../README.md) · الگوی مرجع: برچسب‌های دسته‌بندی و تودهٔ شکل‌های footer در labs.google · فایل‌ها: `extensions/effects/pile.ts` و `.css`

فرزندان با گرانش می‌افتند، کمی برمی‌جهند و روی زاویهٔ خودشان (`--sl-rotate`) آرام می‌گیرند.

## پیش‌نیاز

بستهٔ اکستنشن‌ها یک بار در سایت بارگذاری شده باشد ([راهنمای نصب](../setup/install.md)). برای استفادهٔ تکی به‌جای کل بسته، [بخش «فقط همین افکت»](#فقط-همین-افکت) را ببینید.

## نشانه‌گذاری

### HTML (مثال با کلاس‌های Bootstrap)

```html
<div class="d-flex flex-wrap gap-2 justify-content-center border-bottom pb-1" data-sl-pile>
  <button class="btn btn-light rounded-pill btn-lg" style="--sl-rotate:-6deg">همه</button>
  <button class="btn btn-light rounded-pill btn-lg" style="--sl-rotate:8deg">ساختن</button>
  <button class="btn btn-light rounded-pill btn-lg" style="--sl-rotate:-12deg">کاوش</button>
</div>
```

### React + Tailwind / shadcn

```tsx
<div className="flex flex-wrap-reverse justify-center gap-2 border-b" data-sl-pile>
  {tags.map(([label, angle]) => (
    <Badge key={label} style={{ "--sl-rotate": angle } as React.CSSProperties}>{label}</Badge>
  ))}
</div>
```

در React، زیردرخت را با هوک `useSmoothLab()` فعال کنید (بخش «React» در [راهنمای نصب](../setup/install.md)).

## تنظیمات

| تنظیم | پیش‌فرض | توضیح |
|---|---|---|
| `data-sl-pile` | — | روی ظرف |
| `data-sl-pile-stagger` | `90` (ms) | فاصلهٔ افتادن هر فرزند |
| `data-sl-pile-bounce` | `0.38` | میزان برگشت (۰ تا ۱) |

### متغیرهای CSS مخصوص این افکت

| متغیر | پیش‌فرض | توضیح |
|---|---|---|
| `--sl-rotate` | `0deg` | زاویهٔ نهایی هر فرزند |

## اتصال به سیستم دیزاین

این افکت هیچ توکن رنگ یا حرکتی از سیستم دیزاین نمی‌خواند؛ ظاهرش کاملاً از CSS خود سایت می‌آید.

## فقط همین افکت

```ts
import { createSmoothLab, pile } from "smooth-lab-extensions";
import "smooth-lab-extensions/core/tokens.css";
import "smooth-lab-extensions/effects/pile.css";
import "smooth-lab-extensions/core/reduced-motion.css";
createSmoothLab({ extensions: [pile] });
```

## نکته‌ها

- `flex-wrap: wrap-reverse` حس «روی هم افتادن» را بهتر می‌دهد.
- اکستنشن `translate` و `rotate` را می‌نویسد، نه `transform`؛ استایل transform خود دکمه‌ها (مثل Bootstrap) دست نمی‌خورد.

## کاهش حرکت

فرزندان بی‌درنگ در جای نهایی نمایش داده می‌شوند.
