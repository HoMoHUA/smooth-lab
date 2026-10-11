# Animated Beam

> بخشی از [کامپوننت‌های React](../README.md) · منبع: Magic UI (MIT) — در 21st.dev با نام `@magicui` · فایل: `client/src/components/motion/animated-beam.tsx`

پرتوی متحرک بین دو عنصر روی یک منحنی؛ برای نمودار اتصال و یکپارچه‌سازی.

## نصب در پروژهٔ دیگر

1. فایل `animated-beam.tsx` را در پوشهٔ کامپوننت‌های پروژه کپی کنید.
2. وابستگی‌ها: `pnpm add framer-motion`
3. اگر فایل `cn` را import می‌کند و پروژه آن را ندارد (پروژه‌های غیر shadcn)، این را بسازید:

```ts
// lib/utils.ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));
```

۴. یک بار در ریشهٔ برنامه `<MotionConfig reducedMotion="user">` بگذارید تا تنظیم «کاهش حرکت» سیستم رعایت شود.

با کلید API در https://21st.dev/mcp می‌توانید همین کامپوننت را مستقیم هم نصب کنید: `npx shadcn@latest add "https://21st.dev/r/<author>/animated-beam?api_key=$API_KEY_21ST"`.

## Propها

| prop | نوع | پیش‌فرض | توضیح |
|---|---|---|---|
| `containerRef / fromRef / toRef` | RefObject | — | ظرف و دو سر |
| `curvature` | number | `0` | انحنا |
| `reverse` | boolean | `false` | جهت |
| `pathColor / pathWidth / pathOpacity` |  | خاکستری / 2 / 0.2 | خط پایه |
| `gradientStartColor / gradientStopColor` | string | `#ffaa40` / `#9c40ff` | رنگ پرتو |
| `duration / delay / repeat` | number | `5` / `0` / بی‌پایان | زمان‌بندی (ثانیه) |

## مثال

```tsx
const box = useRef(null), a = useRef(null), b = useRef(null);
<div ref={box} className="relative flex justify-between">
  <div ref={a} className="z-10 size-12 rounded-full bg-card" />
  <div ref={b} className="z-10 size-16 rounded-full bg-primary" />
  <AnimatedBeam containerRef={box} fromRef={a} toRef={b} gradientStartColor="var(--primary)" gradientStopColor="var(--accent)" />
</div>
```

## اتصال به سیستم دیزاین

- **shadcn / Tailwind:** رنگ‌ها را با کلاس‌های توکنی (`bg-primary`، `text-foreground`، `from-primary`) یا `var(--primary)` بدهید؛ کامپوننت‌ها همین کلاس‌ها را می‌پذیرند.
- **Bootstrap یا CSS اختصاصی (بدون Tailwind):** propهای رنگ را با متغیرهای سیستم بدهید (`var(--bs-primary)`) و کلاس‌های Tailwind داخل فایل را با کلاس‌های خودتان عوض کنید، یا Tailwind را فقط برای این پوشه فعال کنید.
- **MUI:** رنگ‌ها را از `theme.vars.palette` (`var(--mui-palette-primary-main)`) بدهید؛ با `sx` روی wrapper چیدمان را کنترل کنید.

## نکته‌ها

- گره‌ها باید `z-index` بالاتر از SVG داشته باشند.
- در RTL ظرف را `dir="ltr"` بدهید یا جهت را با `reverse` تنظیم کنید.
