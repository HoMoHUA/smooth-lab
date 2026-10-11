# Infinite Slider

> بخشی از [کامپوننت‌های React](../README.md) · منبع: Motion Primitives (Julien Thibeaut، MIT) — در 21st.dev با نام `@ibelick` · فایل: `client/src/components/motion/infinite-slider.tsx`

ردیف بی‌پایان با framer-motion؛ سرعت روی hover کم می‌شود. افقی یا عمودی.

## نصب در پروژهٔ دیگر

1. فایل `infinite-slider.tsx` را در پوشهٔ کامپوننت‌های پروژه کپی کنید.
2. وابستگی‌ها: `pnpm add framer-motion react-use-measure`
3. اگر فایل `cn` را import می‌کند و پروژه آن را ندارد (پروژه‌های غیر shadcn)، این را بسازید:

```ts
// lib/utils.ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));
```

۴. یک بار در ریشهٔ برنامه `<MotionConfig reducedMotion="user">` بگذارید تا تنظیم «کاهش حرکت» سیستم رعایت شود.

با کلید API در https://21st.dev/mcp می‌توانید همین کامپوننت را مستقیم هم نصب کنید: `npx shadcn@latest add "https://21st.dev/r/<author>/infinite-slider?api_key=$API_KEY_21ST"`.

## Propها

| prop | نوع | پیش‌فرض | توضیح |
|---|---|---|---|
| `children` | ReactNode | — | آیتم‌ها |
| `gap` | number (px) | `16` | فاصله |
| `speed` | number (px/s) | `100` | سرعت |
| `speedOnHover` | number | — | سرعت روی hover |
| `direction` | `'horizontal' \| 'vertical'` | `'horizontal'` | جهت |
| `reverse` | boolean | `false` | برعکس |

## مثال

```tsx
<div className="relative overflow-hidden" dir="ltr">
  <InfiniteSlider gap={48} speed={60} speedOnHover={18}>
    {logos.map((logo) => <img key={logo.alt} src={logo.src} alt={logo.alt} className="h-8" />)}
  </InfiniteSlider>
  <ProgressiveBlur direction="left" className="absolute inset-y-0 left-0 w-24" />
</div>
```

## اتصال به سیستم دیزاین

- **shadcn / Tailwind:** رنگ‌ها را با کلاس‌های توکنی (`bg-primary`، `text-foreground`، `from-primary`) یا `var(--primary)` بدهید؛ کامپوننت‌ها همین کلاس‌ها را می‌پذیرند.
- **Bootstrap یا CSS اختصاصی (بدون Tailwind):** propهای رنگ را با متغیرهای سیستم بدهید (`var(--bs-primary)`) و کلاس‌های Tailwind داخل فایل را با کلاس‌های خودتان عوض کنید، یا Tailwind را فقط برای این پوشه فعال کنید.
- **MUI:** رنگ‌ها را از `theme.vars.palette` (`var(--mui-palette-primary-main)`) بدهید؛ با `sx` روی wrapper چیدمان را کنترل کنید.

## نکته‌ها

- در صفحهٔ RTL ظرف را `dir="ltr"` بدهید.
- عرض ذاتی ردیف خیلی بزرگ است؛ داخل grid به ستون `minmax(0, 1fr)` و `overflow: hidden` بدهید، وگرنه ستون‌ها کش می‌آیند.
