# Magnetic

> بخشی از [Smooth Lab Extensions](../README.md) · الگوی مرجع: CTAهای footer در labs.google · فایل‌ها: `extensions/effects/magnetic.ts` و `.css`

دکمه به سمت نشانگر کشیده می‌شود و با فنر برمی‌گردد. فقط روی موس/ترک‌پد (pointer: fine).

## پیش‌نیاز

بستهٔ اکستنشن‌ها یک بار در سایت بارگذاری شده باشد ([راهنمای نصب](../setup/install.md)). برای استفادهٔ تکی به‌جای کل بسته، [بخش «فقط همین افکت»](#فقط-همین-افکت) را ببینید.

## نشانه‌گذاری

### HTML (مثال با کلاس‌های Bootstrap)

```html
<a class="btn btn-dark btn-lg rounded-pill" href="#" data-sl-magnetic="0.35">
  <span data-sl-magnetic-inner>شروع کنید</span>
</a>
```

### React + Tailwind / shadcn

```tsx
<Button asChild size="lg" className="rounded-full">
  <a href="/start" data-sl-magnetic="0.35"><span data-sl-magnetic-inner>شروع کنید</span></a>
</Button>
```

در React، زیردرخت را با هوک `useSmoothLab()` فعال کنید (بخش «React» در [راهنمای نصب](../setup/install.md)).

## تنظیمات

| تنظیم | پیش‌فرض | توضیح |
|---|---|---|
| `data-sl-magnetic` | `0.3` | شدت (۰ تا ۱) |
| `data-sl-magnetic-inner` | — | روی یک فرزند؛ کمی بیشتر حرکت می‌کند و عمق می‌دهد |

## اتصال به سیستم دیزاین

این افکت هیچ توکن رنگ یا حرکتی از سیستم دیزاین نمی‌خواند؛ ظاهرش کاملاً از CSS خود سایت می‌آید.

## فقط همین افکت

```ts
import { createSmoothLab, magnetic } from "smooth-lab-extensions";
import "smooth-lab-extensions/core/tokens.css";
import "smooth-lab-extensions/core/reduced-motion.css";
// این افکت فایل CSS جداگانه ندارد؛ همه‌چیز در JavaScript است.
createSmoothLab({ extensions: [magnetic] });
```

## نکته‌ها

- از ویژگی `translate` استفاده می‌کند؛ با `transform` یا `:active { scale }` دکمه‌های سیستم دیزاین تداخل ندارد.

## کاهش حرکت

غیرفعال است.
