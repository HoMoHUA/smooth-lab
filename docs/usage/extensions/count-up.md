# Count-up

> بخشی از [Smooth Lab Extensions](../README.md) · الگوی مرجع: الگوی ۱۶ Effects Kit · فایل‌ها: `extensions/effects/count-up.ts` و `.css`

عدد هنگام ورود به صفحه از صفر تا مقدار هدف با ease-out شمرده می‌شود و با `Intl.NumberFormat` قالب می‌گیرد؛ برای صفحهٔ فارسی، ارقام فارسی می‌شوند.

## پیش‌نیاز

بستهٔ اکستنشن‌ها یک بار در سایت بارگذاری شده باشد ([راهنمای نصب](../setup/install.md)). برای استفادهٔ تکی به‌جای کل بسته، [بخش «فقط همین افکت»](#فقط-همین-افکت) را ببینید.

## نشانه‌گذاری

### HTML (مثال با کلاس‌های Bootstrap)

```html
<div class="row text-center">
  <div class="col"><strong class="display-4" data-sl-count-up="98">0</strong>٪<br><small class="text-secondary">رضایت</small></div>
  <div class="col"><strong class="display-4" data-sl-count-up="8.2" data-sl-count-decimals="1">0</strong></div>
</div>
```

### React + Tailwind / shadcn

```tsx
<strong className="text-5xl font-bold tabular-nums" data-sl-count-up="72" data-sl-count-locale="fa-IR">0</strong>
```

در React، زیردرخت را با هوک `useSmoothLab()` فعال کنید (بخش «React» در [راهنمای نصب](../setup/install.md)).

## تنظیمات

| تنظیم | پیش‌فرض | توضیح |
|---|---|---|
| `data-sl-count-up` | `0` | مقدار نهایی |
| `data-sl-count-decimals` | `0` | تعداد رقم اعشار |
| `data-sl-count-duration` | `2800` (ms) | مدت شمارش |
| `data-sl-count-locale` | زبان `<html lang>` | مثلاً `fa-IR` یا `en-US` |

## اتصال به سیستم دیزاین

این افکت هیچ توکن رنگ یا حرکتی از سیستم دیزاین نمی‌خواند؛ ظاهرش کاملاً از CSS خود سایت می‌آید.

## فقط همین افکت

```ts
import { createSmoothLab, countUp } from "smooth-lab-extensions";
import "smooth-lab-extensions/core/tokens.css";
import "smooth-lab-extensions/core/reduced-motion.css";
// این افکت فایل CSS جداگانه ندارد؛ همه‌چیز در JavaScript است.
createSmoothLab({ extensions: [countUp] });
```

## نکته‌ها

- برای جلوگیری از پرش عرض هنگام شمارش، `font-variant-numeric: tabular-nums` بدهید (در Tailwind: `tabular-nums`).
- مقدار واقعی را در متن اولیه نگذارید؛ با غیرفعال‌بودن JS، صفر دیده می‌شود. اگر SEO مهم است، مقدار نهایی را بنویسید؛ اکستنشن آن را با صفر جایگزین و دوباره می‌شمارد.

## کاهش حرکت

مستقیماً عدد نهایی نوشته می‌شود.
