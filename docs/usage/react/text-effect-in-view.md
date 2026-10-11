# Text Effect In View

> بخشی از [کامپوننت‌های React](../README.md) · منبع: کمکی همین پروژه (روی Text Effect) · فایل: `client/src/components/motion/text-effect-in-view.tsx`

همان Text Effect، ولی وقتی به صفحه می‌رسد شروع می‌شود؛ تا آن موقع یک کپی نامرئی جا را نگه می‌دارد تا صفحه نپرد.

## نصب در پروژهٔ دیگر

1. فایل `text-effect-in-view.tsx` و `text-effect.tsx` را در پوشهٔ کامپوننت‌های پروژه کپی کنید.
2. وابستگی‌ها: `pnpm add framer-motion`
3. اگر فایل `cn` را import می‌کند و پروژه آن را ندارد (پروژه‌های غیر shadcn)، این را بسازید:

```ts
// lib/utils.ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));
```

۴. یک بار در ریشهٔ برنامه `<MotionConfig reducedMotion="user">` بگذارید تا تنظیم «کاهش حرکت» سیستم رعایت شود.

با کلید API در https://21st.dev/mcp می‌توانید همین کامپوننت را مستقیم هم نصب کنید: `npx shadcn@latest add "https://21st.dev/r/<author>/text-effect-in-view?api_key=$API_KEY_21ST"`.

## Propها

| prop | نوع | پیش‌فرض | توضیح |
|---|---|---|---|
| `…TextEffectProps` |  |  | همهٔ propهای Text Effect |
| `dir` | `'ltr' \| 'rtl'` | — | برای تیتر لاتین در صفحهٔ RTL |

## مثال

```tsx
<TextEffectInView as="h2" per="char" preset="fade-in-blur" dir="ltr" className="text-8xl font-bold">
  Reusable Motion
</TextEffectInView>
```

## اتصال به سیستم دیزاین

- **shadcn / Tailwind:** رنگ‌ها را با کلاس‌های توکنی (`bg-primary`، `text-foreground`، `from-primary`) یا `var(--primary)` بدهید؛ کامپوننت‌ها همین کلاس‌ها را می‌پذیرند.
- **Bootstrap یا CSS اختصاصی (بدون Tailwind):** propهای رنگ را با متغیرهای سیستم بدهید (`var(--bs-primary)`) و کلاس‌های Tailwind داخل فایل را با کلاس‌های خودتان عوض کنید، یا Tailwind را فقط برای این پوشه فعال کنید.
- **MUI:** رنگ‌ها را از `theme.vars.palette` (`var(--mui-palette-primary-main)`) بدهید؛ با `sx` روی wrapper چیدمان را کنترل کنید.

## نکته‌ها

-
