# Magic Card

> بخشی از [کامپوننت‌های React](../README.md) · منبع: Magic UI (MIT) — در 21st.dev با نام `@magicui` · فایل: `client/src/components/motion/magic-card.tsx`

لبه و سطح کارت با یک گرادیان که دنبال موس می‌آید روشن می‌شوند. حالت `orb` یک گوی نور شناور دارد.

## نصب در پروژهٔ دیگر

1. فایل `magic-card.tsx` را در پوشهٔ کامپوننت‌های پروژه کپی کنید.
2. وابستگی‌ها: `pnpm add framer-motion next-themes`
3. اگر فایل `cn` را import می‌کند و پروژه آن را ندارد (پروژه‌های غیر shadcn)، این را بسازید:

```ts
// lib/utils.ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));
```

۴. یک بار در ریشهٔ برنامه `<MotionConfig reducedMotion="user">` بگذارید تا تنظیم «کاهش حرکت» سیستم رعایت شود.

با کلید API در https://21st.dev/mcp می‌توانید همین کامپوننت را مستقیم هم نصب کنید: `npx shadcn@latest add "https://21st.dev/r/<author>/magic-card?api_key=$API_KEY_21ST"`.

## Propها

| prop | نوع | پیش‌فرض | توضیح |
|---|---|---|---|
| `gradientSize` | number | `200` | قطر نور |
| `gradientFrom / gradientTo` | string | بنفش → صورتی | رنگ لبه |
| `gradientColor / gradientOpacity` | string / number | — | رنگ سطح (حالت gradient) |
| `mode` | `'gradient' \| 'orb'` | `'gradient'` | حالت |
| `glowFrom / glowTo / glowSize / glowBlur` |  | — | تنظیم گوی (حالت orb) |

## مثال

```tsx
<MagicCard className="rounded-xl" gradientFrom="var(--primary)" gradientTo="var(--accent)" gradientColor="color-mix(in srgb, var(--primary) 12%, transparent)">
  <div className="p-6">…</div>
</MagicCard>
```

## اتصال به سیستم دیزاین

- **shadcn / Tailwind:** رنگ‌ها را با کلاس‌های توکنی (`bg-primary`، `text-foreground`، `from-primary`) یا `var(--primary)` بدهید؛ کامپوننت‌ها همین کلاس‌ها را می‌پذیرند.
- **Bootstrap یا CSS اختصاصی (بدون Tailwind):** propهای رنگ را با متغیرهای سیستم بدهید (`var(--bs-primary)`) و کلاس‌های Tailwind داخل فایل را با کلاس‌های خودتان عوض کنید، یا Tailwind را فقط برای این پوشه فعال کنید.
- **MUI:** رنگ‌ها را از `theme.vars.palette` (`var(--mui-palette-primary-main)`) بدهید؛ با `sx` روی wrapper چیدمان را کنترل کنید.

## نکته‌ها

- از توکن‌های Tailwind `--color-background` و `--color-border` و کلاس `bg-background` استفاده می‌کند؛ در shadcn وجود دارند. در سیستم‌های دیگر روی همان کارت تعریفشان کنید.
- برای تشخیص تم تیره به `next-themes` نیاز دارد (فقط در حالت orb).
