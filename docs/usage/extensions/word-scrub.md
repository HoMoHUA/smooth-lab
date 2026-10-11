# Word Scrub

> بخشی از [Smooth Lab Extensions](../README.md) · الگوی مرجع: الگوی ۰۲ Effects Kit · فایل‌ها: `extensions/effects/word-scrub.ts` و `.css`

کلمه‌های یک پاراگراف بزرگ با پیشرفت اسکرول یکی‌یکی روشن می‌شوند.

## پیش‌نیاز

بستهٔ اکستنشن‌ها یک بار در سایت بارگذاری شده باشد ([راهنمای نصب](../setup/install.md)). برای استفادهٔ تکی به‌جای کل بسته، [بخش «فقط همین افکت»](#فقط-همین-افکت) را ببینید.

## نشانه‌گذاری

### HTML (مثال با کلاس‌های Bootstrap)

```html
<p class="display-5 fw-semibold" data-sl-word-scrub>حرکت خوب، پیام ثابت را به تجربه‌ای هدایت‌شده تبدیل می‌کند.</p>
```

### React + Tailwind / shadcn

```tsx
<p className="text-5xl font-semibold" data-sl-word-scrub>{statement}</p>
```

در React، زیردرخت را با هوک `useSmoothLab()` فعال کنید (بخش «React» در [راهنمای نصب](../setup/install.md)).

## تنظیمات

| تنظیم | پیش‌فرض | توضیح |
|---|---|---|
| `data-sl-word-scrub` | — | روی پاراگراف متنی ساده (بدون تگ داخلی) |

## اتصال به سیستم دیزاین

این افکت هیچ توکن رنگ یا حرکتی از سیستم دیزاین نمی‌خواند؛ ظاهرش کاملاً از CSS خود سایت می‌آید.

## فقط همین افکت

```ts
import { createSmoothLab, wordScrub } from "smooth-lab-extensions";
import "smooth-lab-extensions/core/tokens.css";
import "smooth-lab-extensions/effects/word-scrub.css";
import "smooth-lab-extensions/core/reduced-motion.css";
createSmoothLab({ extensions: [wordScrub] });
```

## نکته‌ها

- فقط متن ساده را تقسیم می‌کند؛ تگ‌های درون پاراگراف حذف می‌شوند. برای متن با markup از [Word Rise](rise.md) استفاده کنید.
- با اسکرول نرم مبتنی بر transform (مثل Lenis) رویداد `sl:scroll` را بفرستید؛ بخش «اسکرول نرم» در [راهنمای نصب](../setup/install.md).

## کاهش حرکت

متن عادی و کامل نمایش داده می‌شود.
