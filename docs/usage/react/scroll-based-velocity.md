# Scroll Velocity

> بخشی از [کامپوننت‌های React](../README.md) · منبع: Magic UI (MIT) — در 21st.dev با نام `@magicui` · فایل: `client/src/components/motion/scroll-based-velocity.tsx`

ردیف‌های متن بزرگ که سرعت و جهتشان از سرعت اسکرول می‌آید.

## نصب در پروژهٔ دیگر

1. فایل `scroll-based-velocity.tsx` را در پوشهٔ کامپوننت‌های پروژه کپی کنید.
2. وابستگی‌ها: `pnpm add framer-motion`
3. اگر فایل `cn` را import می‌کند و پروژه آن را ندارد (پروژه‌های غیر shadcn)، این را بسازید:

```ts
// lib/utils.ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));
```

۴. یک بار در ریشهٔ برنامه `<MotionConfig reducedMotion="user">` بگذارید تا تنظیم «کاهش حرکت» سیستم رعایت شود.

با کلید API در https://21st.dev/mcp می‌توانید همین کامپوننت را مستقیم هم نصب کنید: `npx shadcn@latest add "https://21st.dev/r/<author>/scroll-based-velocity?api_key=$API_KEY_21ST"`.

## Propها

| prop | نوع | پیش‌فرض | توضیح |
|---|---|---|---|
| `ScrollVelocityContainer` | ظرف |  | سرعت اسکرول را بین ردیف‌ها به اشتراک می‌گذارد |
| `ScrollVelocityRow › baseVelocity` | number | `5` | سرعت پایه |
| `› direction` | `1 \| -1` | `1` | جهت |
| `› scrollReactivity` | boolean | `true` | واکنش به اسکرول |

## مثال

```tsx
<ScrollVelocityContainer className="overflow-hidden text-7xl font-extrabold" dir="ltr">
  <ScrollVelocityRow baseVelocity={3}>MOTION WITH A REASON ✦ </ScrollVelocityRow>
  <ScrollVelocityRow baseVelocity={3} direction={-1}>FEEL IT ✦ </ScrollVelocityRow>
</ScrollVelocityContainer>
```

## اتصال به سیستم دیزاین

- **shadcn / Tailwind:** رنگ‌ها را با کلاس‌های توکنی (`bg-primary`، `text-foreground`، `from-primary`) یا `var(--primary)` بدهید؛ کامپوننت‌ها همین کلاس‌ها را می‌پذیرند.
- **Bootstrap یا CSS اختصاصی (بدون Tailwind):** propهای رنگ را با متغیرهای سیستم بدهید (`var(--bs-primary)`) و کلاس‌های Tailwind داخل فایل را با کلاس‌های خودتان عوض کنید، یا Tailwind را فقط برای این پوشه فعال کنید.
- **MUI:** رنگ‌ها را از `theme.vars.palette` (`var(--mui-palette-primary-main)`) بدهید؛ با `sx` روی wrapper چیدمان را کنترل کنید.

## نکته‌ها

- سرعت از `window.scrollY` خوانده می‌شود و با اسکرول نرم هم درست کار می‌کند.
- مثل Infinite Slider، داخل grid به ستون `minmax(0, 1fr)` بدهید.
