# Text Effect

> بخشی از [کامپوننت‌های React](../README.md) · منبع: Motion Primitives (Julien Thibeaut، MIT) — در 21st.dev با نام `@ibelick` · فایل: `client/src/components/motion/text-effect.tsx`

متن را حرف‌به‌حرف، کلمه‌به‌کلمه یا خط‌به‌خط با یکی از presetها وارد می‌کند.

## نصب در پروژهٔ دیگر

1. فایل `text-effect.tsx` را در پوشهٔ کامپوننت‌های پروژه کپی کنید.
2. وابستگی‌ها: `pnpm add framer-motion`
3. اگر فایل `cn` را import می‌کند و پروژه آن را ندارد (پروژه‌های غیر shadcn)، این را بسازید:

```ts
// lib/utils.ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));
```

۴. یک بار در ریشهٔ برنامه `<MotionConfig reducedMotion="user">` بگذارید تا تنظیم «کاهش حرکت» سیستم رعایت شود.

با کلید API در https://21st.dev/mcp می‌توانید همین کامپوننت را مستقیم هم نصب کنید: `npx shadcn@latest add "https://21st.dev/r/<author>/text-effect?api_key=$API_KEY_21ST"`.

## Propها

| prop | نوع | پیش‌فرض | توضیح |
|---|---|---|---|
| `children` | string | — | متن |
| `per` | `'char' \| 'word' \| 'line'` | `'word'` | واحد تقسیم |
| `preset` | `'blur' \| 'fade-in-blur' \| 'scale' \| 'fade' \| 'slide'` | `'fade'` | نوع ورود |
| `as` | تگ HTML | `'p'` | تگ خروجی |
| `delay` | number (s) | `0` | تأخیر شروع |
| `speedReveal / speedSegment` | number | `1` | سرعت پشت‌سرهم‌آمدن / سرعت هر تکه |
| `trigger` | boolean | `true` | نمایش یا خروج |
| `variants` | Variants | — | انیمیشن دلخواه |

## مثال

```tsx
<TextEffect as="h2" per="word" preset="fade-in-blur" className="text-4xl font-bold">
  روشن‌شدن کلمه‌به‌کلمه
</TextEffect>
```

## اتصال به سیستم دیزاین

- **shadcn / Tailwind:** رنگ‌ها را با کلاس‌های توکنی (`bg-primary`، `text-foreground`، `from-primary`) یا `var(--primary)` بدهید؛ کامپوننت‌ها همین کلاس‌ها را می‌پذیرند.
- **Bootstrap یا CSS اختصاصی (بدون Tailwind):** propهای رنگ را با متغیرهای سیستم بدهید (`var(--bs-primary)`) و کلاس‌های Tailwind داخل فایل را با کلاس‌های خودتان عوض کنید، یا Tailwind را فقط برای این پوشه فعال کنید.
- **MUI:** رنگ‌ها را از `theme.vars.palette` (`var(--mui-palette-primary-main)`) بدهید؛ با `sx` روی wrapper چیدمان را کنترل کنید.

## نکته‌ها

- برای متن فارسی `per="char"` استفاده نکنید؛ حروف از هم جدا می‌شوند و اتصالشان از بین می‌رود. `word` یا `line` بدهید.
- در متن فارسی‌ای که کلمهٔ لاتین دارد، `per="word"` ترتیب کلمه‌ها را به‌هم می‌ریزد؛ `per="line"` بدهید.
- این کامپوننت به‌محض mount اجرا می‌شود. برای شروع هنگام ورود به صفحه از [Text Effect In View](text-effect-in-view.md) استفاده کنید.
