# 3D Tilt + Glare

> بخشی از [Smooth Lab Extensions](../README.md) · الگوی مرجع: hover کارت‌های پریمیوم · فایل‌ها: `extensions/effects/tilt.ts` و `.css`

کارت به سمت نشانگر کج می‌شود و یک برق نور دنبال موس می‌آید.

## پیش‌نیاز

بستهٔ اکستنشن‌ها یک بار در سایت بارگذاری شده باشد ([راهنمای نصب](../setup/install.md)). برای استفادهٔ تکی به‌جای کل بسته، [بخش «فقط همین افکت»](#فقط-همین-افکت) را ببینید.

## نشانه‌گذاری

### HTML (مثال با کلاس‌های Bootstrap)

```html
<div class="card shadow-sm" data-sl-tilt="7">
  <div class="card-body">…</div>
</div>
```

### React + Tailwind / shadcn

```tsx
<Card data-sl-tilt="6" className="overflow-hidden">…</Card>
```

در React، زیردرخت را با هوک `useSmoothLab()` فعال کنید (بخش «React» در [راهنمای نصب](../setup/install.md)).

## تنظیمات

| تنظیم | پیش‌فرض | توضیح |
|---|---|---|
| `data-sl-tilt` | `8` | حداکثر زاویه به درجه |

## اتصال به سیستم دیزاین

| توکن | پیش‌فرض | shadcn / Tailwind | Bootstrap 5 | MUI | NeXTPixel |
|---|---|---|---|---|---|
| `--sl-duration-hover` | `240ms` | پیش‌فرض | پیش‌فرض | پیش‌فرض | پیش‌فرض |
| `--sl-ease-out` | `cubic-bezier(0.23, 1, 0.32, 1)` | پیش‌فرض | پیش‌فرض | پیش‌فرض | `var(--ds-ease-out)` |

ستون «پیش‌فرض» یعنی آداپتور آن سیستم این توکن را نگاشت نمی‌کند و مقدار پیش‌فرض Smooth Lab استفاده می‌شود؛ برای تغییرش همان توکن را در CSS سایت تعریف کنید.

## فقط همین افکت

```ts
import { createSmoothLab, tilt } from "smooth-lab-extensions";
import "smooth-lab-extensions/core/tokens.css";
import "smooth-lab-extensions/effects/tilt.css";
import "smooth-lab-extensions/core/reduced-motion.css";
createSmoothLab({ extensions: [tilt] });
```

## نکته‌ها

- `transform` و `::after` عنصر را می‌گیرد؛ اگر کامپوننت سیستم دیزاین از `::after` استفاده می‌کند، tilt را روی wrapper بگذارید.
- داخل [Fan](fan.md) روی عنصر درونی کارت بگذارید.

## کاهش حرکت

غیرفعال است.
