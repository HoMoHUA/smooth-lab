# Animated Background

> بخشی از [کامپوننت‌های React](../README.md) · منبع: Motion Primitives (Julien Thibeaut، MIT) — در 21st.dev با نام `@ibelick` · فایل: `client/src/components/motion/animated-background.tsx`

یک لایهٔ پس‌زمینهٔ مشترک با layout animation بین گزینه‌ها می‌لغزد؛ برای tabها، منو، فهرست.

## نصب در پروژهٔ دیگر

1. فایل `animated-background.tsx` را در پوشهٔ کامپوننت‌های پروژه کپی کنید.
2. وابستگی‌ها: `pnpm add framer-motion`
3. اگر فایل `cn` را import می‌کند و پروژه آن را ندارد (پروژه‌های غیر shadcn)، این را بسازید:

```ts
// lib/utils.ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));
```

۴. یک بار در ریشهٔ برنامه `<MotionConfig reducedMotion="user">` بگذارید تا تنظیم «کاهش حرکت» سیستم رعایت شود.

با کلید API در https://21st.dev/mcp می‌توانید همین کامپوننت را مستقیم هم نصب کنید: `npx shadcn@latest add "https://21st.dev/r/<author>/animated-background?api_key=$API_KEY_21ST"`.

## Propها

| prop | نوع | پیش‌فرض | توضیح |
|---|---|---|---|
| `children` | ReactElement با `data-id` | — | گزینه‌ها |
| `enableHover` | boolean | `false` | دنبال‌کردن hover به‌جای کلیک |
| `defaultValue` | string | — | گزینهٔ فعال اولیه |
| `onValueChange` | (id) => void | — | تغییر |
| `className` | string | — | استایل لایهٔ متحرک |
| `transition` | Transition | — | حرکت |

## مثال

```tsx
<AnimatedBackground enableHover className="rounded-md bg-primary" transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}>
  {items.map((item) => (
    <button key={item} data-id={item} className="px-3 py-2 data-[checked=true]:text-primary-foreground">{item}</button>
  ))}
</AnimatedBackground>
```

## اتصال به سیستم دیزاین

- **shadcn / Tailwind:** رنگ‌ها را با کلاس‌های توکنی (`bg-primary`، `text-foreground`، `from-primary`) یا `var(--primary)` بدهید؛ کامپوننت‌ها همین کلاس‌ها را می‌پذیرند.
- **Bootstrap یا CSS اختصاصی (بدون Tailwind):** propهای رنگ را با متغیرهای سیستم بدهید (`var(--bs-primary)`) و کلاس‌های Tailwind داخل فایل را با کلاس‌های خودتان عوض کنید، یا Tailwind را فقط برای این پوشه فعال کنید.
- **MUI:** رنگ‌ها را از `theme.vars.palette` (`var(--mui-palette-primary-main)`) بدهید؛ با `sx` روی wrapper چیدمان را کنترل کنید.

## نکته‌ها

- گزینهٔ فعال `data-checked="true"` می‌گیرد؛ رنگ متن را با آن عوض کنید.
- محتوای هر گزینه داخل یک `div.z-10` قرار می‌گیرد که position ندارد؛ برای اینکه متن روی لایهٔ متحرک بماند بدهید: `[data-checked] > .z-10 { position: relative }`.
- خود گزینه `inline-flex` می‌شود؛ اگر grid لازم دارید، grid را روی همان `div.z-10` بدهید.
