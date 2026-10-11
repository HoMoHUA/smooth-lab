# Border Beam

> بخشی از [کامپوننت‌های React](../README.md) · منبع: Magic UI (MIT) — در 21st.dev با نام `@magicui` · فایل: `client/src/components/motion/border-beam.tsx`

پرتوی رنگی به‌طور پیوسته دور لبهٔ کارت حرکت می‌کند.

## نصب در پروژهٔ دیگر

1. فایل `border-beam.tsx` را در پوشهٔ کامپوننت‌های پروژه کپی کنید.
2. وابستگی‌ها: `pnpm add framer-motion`
3. اگر فایل `cn` را import می‌کند و پروژه آن را ندارد (پروژه‌های غیر shadcn)، این را بسازید:

```ts
// lib/utils.ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));
```

۴. یک بار در ریشهٔ برنامه `<MotionConfig reducedMotion="user">` بگذارید تا تنظیم «کاهش حرکت» سیستم رعایت شود.

با کلید API در https://21st.dev/mcp می‌توانید همین کامپوننت را مستقیم هم نصب کنید: `npx shadcn@latest add "https://21st.dev/r/<author>/border-beam?api_key=$API_KEY_21ST"`.

## Propها

| prop | نوع | پیش‌فرض | توضیح |
|---|---|---|---|
| `size` | number | `50` | طول پرتو |
| `duration` | number (s) | `6` | مدت دور |
| `colorFrom / colorTo` | string | نارنجی → بنفش | رنگ‌ها |
| `borderWidth` | number | `1` | ضخامت |
| `reverse` | boolean | `false` | برعکس |
| `delay / initialOffset` | number | `0` | شروع |

## مثال

```tsx
<Card className="relative overflow-hidden">
  …
  <BorderBeam size={120} duration={6} colorFrom="var(--primary)" colorTo="var(--accent)" />
</Card>
```

## اتصال به سیستم دیزاین

- **shadcn / Tailwind:** رنگ‌ها را با کلاس‌های توکنی (`bg-primary`، `text-foreground`، `from-primary`) یا `var(--primary)` بدهید؛ کامپوننت‌ها همین کلاس‌ها را می‌پذیرند.
- **Bootstrap یا CSS اختصاصی (بدون Tailwind):** propهای رنگ را با متغیرهای سیستم بدهید (`var(--bs-primary)`) و کلاس‌های Tailwind داخل فایل را با کلاس‌های خودتان عوض کنید، یا Tailwind را فقط برای این پوشه فعال کنید.
- **MUI:** رنگ‌ها را از `theme.vars.palette` (`var(--mui-palette-primary-main)`) بدهید؛ با `sx` روی wrapper چیدمان را کنترل کنید.

## نکته‌ها

- کارت باید `relative` و `overflow-hidden` باشد.
