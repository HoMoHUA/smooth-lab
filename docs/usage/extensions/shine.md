# Text Shine

> بخشی از [Smooth Lab Extensions](../README.md) · الگوی مرجع: textShine روی کلمهٔ تأکیدی NotebookLM · فایل‌ها: `extensions/effects/shine.ts` و `.css`

فقط CSS: یک برق گرادیانی آهسته از روی متن رد می‌شود.

## پیش‌نیاز

بستهٔ اکستنشن‌ها یک بار در سایت بارگذاری شده باشد ([راهنمای نصب](../setup/install.md)). برای استفادهٔ تکی به‌جای کل بسته، [بخش «فقط همین افکت»](#فقط-همین-افکت) را ببینید.

## نشانه‌گذاری

### HTML (مثال با کلاس‌های Bootstrap)

```html
<h1 class="display-3">هر چیزی را <span data-sl-shine>بفهمید</span></h1>
```

### React + Tailwind / shadcn

```tsx
<h1 className="text-6xl">هر چیزی را <span data-sl-shine>بفهمید</span></h1>
```

در React، زیردرخت را با هوک `useSmoothLab()` فعال کنید (بخش «React» در [راهنمای نصب](../setup/install.md)).

## تنظیمات

| تنظیم | پیش‌فرض | توضیح |
|---|---|---|
| `data-sl-shine` | — | روی span کلمهٔ تأکیدی |

## اتصال به سیستم دیزاین

| توکن | پیش‌فرض | shadcn / Tailwind | Bootstrap 5 | MUI | NeXTPixel |
|---|---|---|---|---|---|
| `--sl-color-accent` | `#315cff` | `var(--primary)` | `var(--bs-primary)` | `var(--mui-palette-primary-main)` | `var(--ds-cobalt)` |
| `--sl-color-shape-2` | `#ffbdf7` | پیش‌فرض | پیش‌فرض | پیش‌فرض | پیش‌فرض |
| `--sl-color-shape-4` | `#fcc934` | پیش‌فرض | پیش‌فرض | پیش‌فرض | پیش‌فرض |
| `--sl-ease-in-out` | `cubic-bezier(0.77, 0, 0.175, 1)` | پیش‌فرض | پیش‌فرض | پیش‌فرض | `var(--ds-ease-in-out)` |

ستون «پیش‌فرض» یعنی آداپتور آن سیستم این توکن را نگاشت نمی‌کند و مقدار پیش‌فرض Smooth Lab استفاده می‌شود؛ برای تغییرش همان توکن را در CSS سایت تعریف کنید.

## فقط همین افکت

```ts
import { createSmoothLab, shine } from "smooth-lab-extensions";
import "smooth-lab-extensions/core/tokens.css";
import "smooth-lab-extensions/effects/shine.css";
import "smooth-lab-extensions/core/reduced-motion.css";
createSmoothLab({ extensions: [shine] });
```

## نکته‌ها

- متن شفاف می‌شود و رنگ از گرادیان می‌آید؛ برای کنتراست، `--sl-color-accent` باید روی پس‌زمینه خوانا باشد.

## کاهش حرکت

متن با رنگ ثابت گرادیان و بدون حرکت نمایش داده می‌شود.
