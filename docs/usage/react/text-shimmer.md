# Text Shimmer

> بخشی از [کامپوننت‌های React](../README.md) · منبع: Motion Primitives (Julien Thibeaut، MIT) — در 21st.dev با نام `@ibelick` · فایل: `client/src/components/motion/text-shimmer.tsx`

یک برق نور به‌طور پیوسته از روی متن رد می‌شود.

## نصب در پروژهٔ دیگر

1. فایل `text-shimmer.tsx` را در پوشهٔ کامپوننت‌های پروژه کپی کنید.
2. وابستگی‌ها: `pnpm add framer-motion`
3. اگر فایل `cn` را import می‌کند و پروژه آن را ندارد (پروژه‌های غیر shadcn)، این را بسازید:

```ts
// lib/utils.ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));
```

۴. یک بار در ریشهٔ برنامه `<MotionConfig reducedMotion="user">` بگذارید تا تنظیم «کاهش حرکت» سیستم رعایت شود.

با کلید API در https://21st.dev/mcp می‌توانید همین کامپوننت را مستقیم هم نصب کنید: `npx shadcn@latest add "https://21st.dev/r/<author>/text-shimmer?api_key=$API_KEY_21ST"`.

## Propها

| prop | نوع | پیش‌فرض | توضیح |
|---|---|---|---|
| `children` | string | — | متن |
| `as` | ElementType | `'p'` | تگ |
| `duration` | number (s) | `2` | مدت یک دور |
| `spread` | number | `2` | پهنای برق |

## مثال

```tsx
<TextShimmer as="p" duration={2.4} className="font-mono text-sm [--base-color:var(--muted-foreground)] [--base-gradient-color:var(--primary)]">
  در حال آماده‌سازی…
</TextShimmer>
```

## اتصال به سیستم دیزاین

- **shadcn / Tailwind:** رنگ‌ها را با کلاس‌های توکنی (`bg-primary`، `text-foreground`، `from-primary`) یا `var(--primary)` بدهید؛ کامپوننت‌ها همین کلاس‌ها را می‌پذیرند.
- **Bootstrap یا CSS اختصاصی (بدون Tailwind):** propهای رنگ را با متغیرهای سیستم بدهید (`var(--bs-primary)`) و کلاس‌های Tailwind داخل فایل را با کلاس‌های خودتان عوض کنید، یا Tailwind را فقط برای این پوشه فعال کنید.
- **MUI:** رنگ‌ها را از `theme.vars.palette` (`var(--mui-palette-primary-main)`) بدهید؛ با `sx` روی wrapper چیدمان را کنترل کنید.

## نکته‌ها

- رنگ پایه و رنگ برق از متغیرهای `--base-color` و `--base-gradient-color` می‌آیند؛ آن‌ها را به رنگ‌های سیستم دیزاین بدهید.
