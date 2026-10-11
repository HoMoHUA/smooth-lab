# Animated Group

> بخشی از [کامپوننت‌های React](../README.md) · منبع: Motion Primitives (Julien Thibeaut، MIT) — در 21st.dev با نام `@ibelick` · فایل: `client/src/components/motion/animated-group.tsx`

فرزندان را پشت سر هم با یک preset وارد می‌کند.

## نصب در پروژهٔ دیگر

1. فایل `animated-group.tsx` را در پوشهٔ کامپوننت‌های پروژه کپی کنید.
2. وابستگی‌ها: `pnpm add framer-motion`
3. اگر فایل `cn` را import می‌کند و پروژه آن را ندارد (پروژه‌های غیر shadcn)، این را بسازید:

```ts
// lib/utils.ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));
```

۴. یک بار در ریشهٔ برنامه `<MotionConfig reducedMotion="user">` بگذارید تا تنظیم «کاهش حرکت» سیستم رعایت شود.

با کلید API در https://21st.dev/mcp می‌توانید همین کامپوننت را مستقیم هم نصب کنید: `npx shadcn@latest add "https://21st.dev/r/<author>/animated-group?api_key=$API_KEY_21ST"`.

## Propها

| prop | نوع | پیش‌فرض | توضیح |
|---|---|---|---|
| `children` | ReactNode | — | فرزندان |
| `preset` | `fade \| slide \| scale \| blur \| blur-slide \| zoom \| flip \| bounce \| rotate \| swing` | — | نوع ورود |
| `variants` | { container, item } | — | انیمیشن دلخواه |
| `as / asChild` | ElementType | `'div'` | تگ ظرف / تگ فرزندان |

## مثال

```tsx
<AnimatedGroup preset="blur-slide" className="grid gap-4 md:grid-cols-3">
  {features.map((f) => <Card key={f.id}>…</Card>)}
</AnimatedGroup>
```

## اتصال به سیستم دیزاین

- **shadcn / Tailwind:** رنگ‌ها را با کلاس‌های توکنی (`bg-primary`، `text-foreground`، `from-primary`) یا `var(--primary)` بدهید؛ کامپوننت‌ها همین کلاس‌ها را می‌پذیرند.
- **Bootstrap یا CSS اختصاصی (بدون Tailwind):** propهای رنگ را با متغیرهای سیستم بدهید (`var(--bs-primary)`) و کلاس‌های Tailwind داخل فایل را با کلاس‌های خودتان عوض کنید، یا Tailwind را فقط برای این پوشه فعال کنید.
- **MUI:** رنگ‌ها را از `theme.vars.palette` (`var(--mui-palette-primary-main)`) بدهید؛ با `sx` روی wrapper چیدمان را کنترل کنید.

## نکته‌ها

- به‌محض mount اجرا می‌شود؛ برای شروع هنگام ورود آن را داخل [In View](in-view.md) بگذارید یا با `useInView` شرطی رندر کنید.
