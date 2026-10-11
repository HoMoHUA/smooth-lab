# Parallax

> بخشی از [Smooth Lab Extensions](../README.md) · الگوی مرجع: الگوهای ۱۳ و ۱۹ Effects Kit · فایل‌ها: `extensions/effects/parallax.ts` و `.css`

تصویر درون یک قاب ثابت با اسکرول، آهسته‌تر از صفحه بالا و پایین می‌رود.

## پیش‌نیاز

بستهٔ اکستنشن‌ها یک بار در سایت بارگذاری شده باشد ([راهنمای نصب](../setup/install.md)). برای استفادهٔ تکی به‌جای کل بسته، [بخش «فقط همین افکت»](#فقط-همین-افکت) را ببینید.

## نشانه‌گذاری

### HTML (مثال با کلاس‌های Bootstrap)

```html
<figure class="ratio ratio-16x9 overflow-hidden rounded-4">
  <img src="hero.jpg" class="object-fit-cover" alt="…" data-sl-parallax="24">
</figure>
```

### React + Tailwind / shadcn

```tsx
<figure className="aspect-video overflow-hidden rounded-xl">
  <img src="/hero.jpg" alt="…" className="size-full object-cover" data-sl-parallax="20" />
</figure>
```

در React، زیردرخت را با هوک `useSmoothLab()` فعال کنید (بخش «React» در [راهنمای نصب](../setup/install.md)).

## تنظیمات

| تنظیم | پیش‌فرض | توضیح |
|---|---|---|
| `data-sl-parallax` | `20` | دامنهٔ حرکت به درصد ارتفاع خود عنصر |

### متغیرهای CSS مخصوص این افکت

| متغیر | پیش‌فرض | توضیح |
|---|---|---|
| `--sl-parallax-scale` | `1.2` | بزرگ‌نمایی تا لبه‌ها هنگام حرکت خالی نشوند |

## اتصال به سیستم دیزاین

این افکت هیچ توکن رنگ یا حرکتی از سیستم دیزاین نمی‌خواند؛ ظاهرش کاملاً از CSS خود سایت می‌آید.

## فقط همین افکت

```ts
import { createSmoothLab, parallax } from "smooth-lab-extensions";
import "smooth-lab-extensions/core/tokens.css";
import "smooth-lab-extensions/effects/parallax.css";
import "smooth-lab-extensions/core/reduced-motion.css";
createSmoothLab({ extensions: [parallax] });
```

## نکته‌ها

- قاب (عنصر والد) باید `overflow: hidden` داشته باشد؛ پیشرفت روی والد اندازه‌گیری می‌شود.
- transform تصویر را اکستنشن می‌نویسد؛ transform دیگری روی همان img نگذارید.

## کاهش حرکت

تصویر ثابت می‌ماند.
