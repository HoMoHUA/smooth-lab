# Fanned Cards

> بخشی از [Smooth Lab Extensions](../README.md) · الگوی مرجع: کارت‌های کج‌شدهٔ labs.google · فایل‌ها: `extensions/effects/fan.ts` و `.css`

کارت‌ها اول روی هم در وسط جمع‌اند و با اسکرول روی یک قوس باز می‌شوند؛ hover کارت را بالا می‌آورد.

## پیش‌نیاز

بستهٔ اکستنشن‌ها یک بار در سایت بارگذاری شده باشد ([راهنمای نصب](../setup/install.md)). برای استفادهٔ تکی به‌جای کل بسته، [بخش «فقط همین افکت»](#فقط-همین-افکت) را ببینید.

## نشانه‌گذاری

### HTML (مثال با کلاس‌های Bootstrap)

```html
<div class="py-5" data-sl-fan style="--sl-fan-angle: 7deg">
  <article class="card shadow" style="width: 16rem"><div class="card-body">…</div></article>
  <article class="card shadow" style="width: 16rem"><div class="card-body">…</div></article>
  <article class="card shadow" style="width: 16rem"><div class="card-body">…</div></article>
</div>
```

### React + Tailwind / shadcn

```tsx
<div data-sl-fan className="[--sl-fan-angle:7deg]">
  {items.map((item) => (
    <Card key={item.id} className="w-64 shrink">
      <div data-sl-tilt>{/* محتوا */}</div>
    </Card>
  ))}
</div>
```

در React، زیردرخت را با هوک `useSmoothLab()` فعال کنید (بخش «React» در [راهنمای نصب](../setup/install.md)).

## تنظیمات

| تنظیم | پیش‌فرض | توضیح |
|---|---|---|
| `data-sl-fan` | — | روی ظرف ردیف کارت‌ها |

### متغیرهای CSS مخصوص این افکت

| متغیر | پیش‌فرض | توضیح |
|---|---|---|
| `--sl-fan-angle` | `6deg` | زاویهٔ هر کارت در حالت باز |
| `--sl-fan-lift` | `1.25rem` | پایین‌آمدن کارت‌های کناری روی قوس |
| `--sl-fan-gap` | `1rem` | فاصلهٔ کارت‌ها |

## اتصال به سیستم دیزاین

| توکن | پیش‌فرض | shadcn / Tailwind | Bootstrap 5 | MUI | NeXTPixel |
|---|---|---|---|---|---|
| `--sl-duration-hover` | `240ms` | پیش‌فرض | پیش‌فرض | پیش‌فرض | پیش‌فرض |
| `--sl-ease-out` | `cubic-bezier(0.23, 1, 0.32, 1)` | پیش‌فرض | پیش‌فرض | پیش‌فرض | `var(--ds-ease-out)` |

ستون «پیش‌فرض» یعنی آداپتور آن سیستم این توکن را نگاشت نمی‌کند و مقدار پیش‌فرض Smooth Lab استفاده می‌شود؛ برای تغییرش همان توکن را در CSS سایت تعریف کنید.

## فقط همین افکت

```ts
import { createSmoothLab, fan } from "smooth-lab-extensions";
import "smooth-lab-extensions/core/tokens.css";
import "smooth-lab-extensions/effects/fan.css";
import "smooth-lab-extensions/core/reduced-motion.css";
createSmoothLab({ extensions: [fan] });
```

## نکته‌ها

- transform کارت‌ها را اکستنشن می‌نویسد؛ افکت hover سیستم دیزاین (مثلاً `transform: translateY`) را روی یک عنصر داخلی بگذارید.
- [Tilt](tilt.md) را روی عنصر داخلی کارت بگذارید، نه خود کارت.
- در موبایل کارت‌ها را `flex: 0 1 16rem; min-width: 0` بدهید تا در یک ردیف جا شوند.

## کاهش حرکت

کارت‌ها از ابتدا در حالت باز هستند.
