# Number Ticker

> بخشی از [کامپوننت‌های React](../README.md) · منبع: Magic UI (MIT) — در 21st.dev با نام `@magicui` — با prop اضافهٔ `locale` · فایل: `client/src/components/motion/number-ticker.tsx`

هنگام ورود به صفحه از عدد شروع تا مقدار هدف با فنر می‌شمارد.

## نصب در پروژهٔ دیگر

1. فایل `number-ticker.tsx` را در پوشهٔ کامپوننت‌های پروژه کپی کنید.
2. وابستگی‌ها: `pnpm add framer-motion`
3. اگر فایل `cn` را import می‌کند و پروژه آن را ندارد (پروژه‌های غیر shadcn)، این را بسازید:

```ts
// lib/utils.ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));
```

۴. یک بار در ریشهٔ برنامه `<MotionConfig reducedMotion="user">` بگذارید تا تنظیم «کاهش حرکت» سیستم رعایت شود.

با کلید API در https://21st.dev/mcp می‌توانید همین کامپوننت را مستقیم هم نصب کنید: `npx shadcn@latest add "https://21st.dev/r/<author>/number-ticker?api_key=$API_KEY_21ST"`.

## Propها

| prop | نوع | پیش‌فرض | توضیح |
|---|---|---|---|
| `value` | number | — | مقدار نهایی |
| `startValue` | number | `0` | شروع |
| `direction` | `'up' \| 'down'` | `'up'` | جهت |
| `delay` | number (s) | `0` | تأخیر |
| `decimalPlaces` | number | `0` | اعشار |
| `locale` | string | `'en-US'` | قالب عدد؛ `fa-IR` برای ارقام فارسی |

## مثال

```tsx
<NumberTicker value={98} locale="fa-IR" className="text-5xl font-bold text-foreground" />
```

## اتصال به سیستم دیزاین

- **shadcn / Tailwind:** رنگ‌ها را با کلاس‌های توکنی (`bg-primary`، `text-foreground`، `from-primary`) یا `var(--primary)` بدهید؛ کامپوننت‌ها همین کلاس‌ها را می‌پذیرند.
- **Bootstrap یا CSS اختصاصی (بدون Tailwind):** propهای رنگ را با متغیرهای سیستم بدهید (`var(--bs-primary)`) و کلاس‌های Tailwind داخل فایل را با کلاس‌های خودتان عوض کنید، یا Tailwind را فقط برای این پوشه فعال کنید.
- **MUI:** رنگ‌ها را از `theme.vars.palette` (`var(--mui-palette-primary-main)`) بدهید؛ با `sx` روی wrapper چیدمان را کنترل کنید.

## نکته‌ها

- کلاس پیش‌فرض `text-black dark:text-white` دارد؛ رنگ سیستم دیزاین را با className بدهید.
