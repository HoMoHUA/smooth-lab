# Arrow Link

> بخشی از [Smooth Lab Extensions](../README.md) · الگوی مرجع: الگوی ۰۸ Effects Kit · فایل‌ها: `extensions/effects/arrow-link.ts` و `.css`

فقط CSS: خط زیر لینک از لبهٔ شروع رشد می‌کند و آیکن ۴ پیکسل جلو می‌رود (در RTL به چپ).

## پیش‌نیاز

بستهٔ اکستنشن‌ها یک بار در سایت بارگذاری شده باشد ([راهنمای نصب](../setup/install.md)). برای استفادهٔ تکی به‌جای کل بسته، [بخش «فقط همین افکت»](#فقط-همین-افکت) را ببینید.

## نشانه‌گذاری

### HTML (مثال با کلاس‌های Bootstrap)

```html
<a class="link-body-emphasis text-decoration-none" href="#" data-sl-arrow-link>
  ادامه <svg width="16" height="16">…</svg>
</a>
```

### React + Tailwind / shadcn

```tsx
<a href="/docs" className="text-sm font-medium" data-sl-arrow-link>
  مستندات <ArrowUpLeft className="size-4" />
</a>
```

در React، زیردرخت را با هوک `useSmoothLab()` فعال کنید (بخش «React» در [راهنمای نصب](../setup/install.md)).

## تنظیمات

| تنظیم | پیش‌فرض | توضیح |
|---|---|---|
| `data-sl-arrow-link` | — | روی لینک یا دکمه‌ای که یک svg دارد |

## اتصال به سیستم دیزاین

| توکن | پیش‌فرض | shadcn / Tailwind | Bootstrap 5 | MUI | NeXTPixel |
|---|---|---|---|---|---|
| `--sl-duration-hover` | `240ms` | پیش‌فرض | پیش‌فرض | پیش‌فرض | پیش‌فرض |
| `--sl-ease-out` | `cubic-bezier(0.23, 1, 0.32, 1)` | پیش‌فرض | پیش‌فرض | پیش‌فرض | `var(--ds-ease-out)` |

ستون «پیش‌فرض» یعنی آداپتور آن سیستم این توکن را نگاشت نمی‌کند و مقدار پیش‌فرض Smooth Lab استفاده می‌شود؛ برای تغییرش همان توکن را در CSS سایت تعریف کنید.

## فقط همین افکت

```ts
import { createSmoothLab, arrowLink } from "smooth-lab-extensions";
import "smooth-lab-extensions/core/tokens.css";
import "smooth-lab-extensions/effects/arrow-link.css";
import "smooth-lab-extensions/core/reduced-motion.css";
createSmoothLab({ extensions: [arrowLink] });
```

## نکته‌ها

- اگر سیستم دیزاین روی لینک‌ها `text-decoration: underline` دارد، آن را برای این لینک بردارید تا دو خط دیده نشود (Bootstrap: `text-decoration-none`).

## کاهش حرکت

بدون تغییر؛ فقط transition کوتاه hover است.
