# Word Rise

> بخشی از [Smooth Lab Extensions](../README.md) · الگوی مرجع: ورود appearFromTop در NotebookLM · فایل‌ها: `extensions/effects/rise.ts` و `.css`

کلمه‌های تیتر از زیر یک ماسک بالا می‌آیند و با کمی blur، پشت سر هم ظاهر می‌شوند. تگ‌های درون‌خطی مثل `<em>` حفظ می‌شوند.

## پیش‌نیاز

بستهٔ اکستنشن‌ها یک بار در سایت بارگذاری شده باشد ([راهنمای نصب](../setup/install.md)). برای استفادهٔ تکی به‌جای کل بسته، [بخش «فقط همین افکت»](#فقط-همین-افکت) را ببینید.

## نشانه‌گذاری

### HTML (مثال با کلاس‌های Bootstrap)

```html
<h1 class="display-3 fw-bold" data-sl-rise>هر چیزی را <em>بفهمید</em></h1>
```

### React + Tailwind / shadcn

```tsx
<h1 className="text-5xl font-semibold tracking-tight" data-sl-rise>
  هر چیزی را <em className="text-primary not-italic">بفهمید</em>
</h1>
```

در React، زیردرخت را با هوک `useSmoothLab()` فعال کنید (بخش «React» در [راهنمای نصب](../setup/install.md)).

## تنظیمات

| تنظیم | پیش‌فرض | توضیح |
|---|---|---|
| `data-sl-rise` | — | روی تیتر یا پاراگراف |

## اتصال به سیستم دیزاین

| توکن | پیش‌فرض | shadcn / Tailwind | Bootstrap 5 | MUI | NeXTPixel |
|---|---|---|---|---|---|
| `--sl-ease-out` | `cubic-bezier(0.23, 1, 0.32, 1)` | پیش‌فرض | پیش‌فرض | پیش‌فرض | `var(--ds-ease-out)` |

ستون «پیش‌فرض» یعنی آداپتور آن سیستم این توکن را نگاشت نمی‌کند و مقدار پیش‌فرض Smooth Lab استفاده می‌شود؛ برای تغییرش همان توکن را در CSS سایت تعریف کنید.

## فقط همین افکت

```ts
import { createSmoothLab, rise } from "smooth-lab-extensions";
import "smooth-lab-extensions/core/tokens.css";
import "smooth-lab-extensions/effects/rise.css";
import "smooth-lab-extensions/core/reduced-motion.css";
createSmoothLab({ extensions: [rise] });
```

## نکته‌ها

- متن اصلی در `aria-label` نگه داشته می‌شود و صفحه‌خوان آن را یکجا می‌خواند.
- برای متن‌های فارسی که کلمهٔ لاتین دارند مشکلی ندارد، چون تقسیم بر اساس فاصله است و حروف هر کلمه به هم چسبیده می‌مانند.
- اگر React همان متن را دوباره رندر کند، کلمه‌ها را بازنویسی می‌کند؛ تیتر را ثابت نگه دارید یا کامپوننت را `memo` کنید.

## کاهش حرکت

متن دست‌نخورده می‌ماند و تقسیم نمی‌شود.
