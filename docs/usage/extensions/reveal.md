# Reveal و Stagger

> بخشی از [Smooth Lab Extensions](../README.md) · الگوی مرجع: الگوی ۰۱ Effects Kit · فایل‌ها: `extensions/effects/reveal.ts` و `.css`

عنصر تا ورود به صفحه پنهان می‌ماند و سپس با محوشدن و جابه‌جایی کوتاه ظاهر می‌شود. با `data-sl-stagger` فرزندان یکی‌یکی وارد می‌شوند.

## پیش‌نیاز

بستهٔ اکستنشن‌ها یک بار در سایت بارگذاری شده باشد ([راهنمای نصب](../setup/install.md)). برای استفادهٔ تکی به‌جای کل بسته، [بخش «فقط همین افکت»](#فقط-همین-افکت) را ببینید.

## نشانه‌گذاری

### HTML (مثال با کلاس‌های Bootstrap)

```html
<section class="container py-5">
  <h2 class="display-5" data-sl-reveal>عنوان بخش</h2>
  <div class="row g-3" data-sl-reveal data-sl-stagger="110">
    <div class="col-md-4"><div class="card card-body">کارت ۱</div></div>
    <div class="col-md-4"><div class="card card-body">کارت ۲</div></div>
    <div class="col-md-4"><div class="card card-body">کارت ۳</div></div>
  </div>
</section>
```

### React + Tailwind / shadcn

```tsx
<div className="grid gap-4 md:grid-cols-3" data-sl-reveal data-sl-stagger="110">
  <Card>…</Card>
  <Card>…</Card>
  <Card>…</Card>
</div>
```

در React، زیردرخت را با هوک `useSmoothLab()` فعال کنید (بخش «React» در [راهنمای نصب](../setup/install.md)).

## تنظیمات

| تنظیم | پیش‌فرض | توضیح |
|---|---|---|
| `data-sl-reveal` | — | فعال‌سازی روی هر عنصر |
| `data-sl-reveal-delay` | `0` (ms) | تأخیر ورود خود عنصر |
| `data-sl-stagger` | خاموش | فاصلهٔ ورود فرزندان مستقیم (ms)؛ با آن، فرزندان به‌جای خود عنصر انیمیت می‌شوند |

## اتصال به سیستم دیزاین

| توکن | پیش‌فرض | shadcn / Tailwind | Bootstrap 5 | MUI | NeXTPixel |
|---|---|---|---|---|---|
| `--sl-duration-enter` | `800ms` | پیش‌فرض | پیش‌فرض | پیش‌فرض | پیش‌فرض |
| `--sl-ease-standard` | `cubic-bezier(0.455, 0.03, 0.515, 0.955)` | پیش‌فرض | پیش‌فرض | پیش‌فرض | پیش‌فرض |
| `--sl-reveal-distance` | `24px` | پیش‌فرض | پیش‌فرض | پیش‌فرض | پیش‌فرض |

ستون «پیش‌فرض» یعنی آداپتور آن سیستم این توکن را نگاشت نمی‌کند و مقدار پیش‌فرض Smooth Lab استفاده می‌شود؛ برای تغییرش همان توکن را در CSS سایت تعریف کنید.

## فقط همین افکت

```ts
import { createSmoothLab, reveal } from "smooth-lab-extensions";
import "smooth-lab-extensions/core/tokens.css";
import "smooth-lab-extensions/effects/reveal.css";
import "smooth-lab-extensions/core/reduced-motion.css";
createSmoothLab({ extensions: [reveal] });
```

## نکته‌ها

- فاصلهٔ حرکت را با `--sl-reveal-distance` و مدت را با `--sl-duration-enter` در CSS سایت تنظیم کنید.
- روی عنصری که خودش `transform` یا `transition` دارد (مثلاً hover کارت در Bootstrap) آن را روی wrapper بگذارید تا transition ها با هم تداخل نکنند.

## کاهش حرکت

عنصر بی‌درنگ با حالت نهایی نمایش داده می‌شود.
