# Progressive Blur

> بخشی از [کامپوننت‌های React](../README.md) · منبع: Motion Primitives (Julien Thibeaut، MIT) — در 21st.dev با نام `@ibelick` · فایل: `client/src/components/motion/progressive-blur.tsx`

blur لایه‌لایه که به‌تدریج بیشتر می‌شود؛ برای لبه‌های اسلایدر یا پایین hero.

## نصب در پروژهٔ دیگر

1. فایل `progressive-blur.tsx` را در پوشهٔ کامپوننت‌های پروژه کپی کنید.
2. وابستگی‌ها: `pnpm add framer-motion`
3. اگر فایل `cn` را import می‌کند و پروژه آن را ندارد (پروژه‌های غیر shadcn)، این را بسازید:

```ts
// lib/utils.ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));
```

۴. یک بار در ریشهٔ برنامه `<MotionConfig reducedMotion="user">` بگذارید تا تنظیم «کاهش حرکت» سیستم رعایت شود.

با کلید API در https://21st.dev/mcp می‌توانید همین کامپوننت را مستقیم هم نصب کنید: `npx shadcn@latest add "https://21st.dev/r/<author>/progressive-blur?api_key=$API_KEY_21ST"`.

## Propها

| prop | نوع | پیش‌فرض | توضیح |
|---|---|---|---|
| `direction` | `top \| right \| bottom \| left` | `'bottom'` | جهت افزایش |
| `blurLayers` | number | `8` | تعداد لایه |
| `blurIntensity` | number | `0.25` | شدت هر لایه |

## مثال

```tsx
<ProgressiveBlur direction="bottom" blurIntensity={0.6} className="pointer-events-none absolute inset-x-0 bottom-0 h-32" />
```

## اتصال به سیستم دیزاین

- **shadcn / Tailwind:** رنگ‌ها را با کلاس‌های توکنی (`bg-primary`، `text-foreground`، `from-primary`) یا `var(--primary)` بدهید؛ کامپوننت‌ها همین کلاس‌ها را می‌پذیرند.
- **Bootstrap یا CSS اختصاصی (بدون Tailwind):** propهای رنگ را با متغیرهای سیستم بدهید (`var(--bs-primary)`) و کلاس‌های Tailwind داخل فایل را با کلاس‌های خودتان عوض کنید، یا Tailwind را فقط برای این پوشه فعال کنید.
- **MUI:** رنگ‌ها را از `theme.vars.palette` (`var(--mui-palette-primary-main)`) بدهید؛ با `sx` روی wrapper چیدمان را کنترل کنید.

## نکته‌ها

- از `backdrop-filter` استفاده می‌کند؛ پشتش باید محتوا باشد تا اثر دیده شود.
