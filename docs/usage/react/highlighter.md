# Highlighter

> بخشی از [کامپوننت‌های React](../README.md) · منبع: Magic UI (MIT) — در 21st.dev با نام `@magicui` · فایل: `client/src/components/motion/highlighter.tsx`

هایلایت، خط زیر، دایره، کادر، خط‌خوردگی و براکت دست‌کشیده که هنگام ورود به صفحه کشیده می‌شوند.

## نصب در پروژهٔ دیگر

1. فایل `highlighter.tsx` را در پوشهٔ کامپوننت‌های پروژه کپی کنید.
2. وابستگی‌ها: `pnpm add framer-motion rough-notation`
3. اگر فایل `cn` را import می‌کند و پروژه آن را ندارد (پروژه‌های غیر shadcn)، این را بسازید:

```ts
// lib/utils.ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));
```

۴. یک بار در ریشهٔ برنامه `<MotionConfig reducedMotion="user">` بگذارید تا تنظیم «کاهش حرکت» سیستم رعایت شود.

با کلید API در https://21st.dev/mcp می‌توانید همین کامپوننت را مستقیم هم نصب کنید: `npx shadcn@latest add "https://21st.dev/r/<author>/highlighter?api_key=$API_KEY_21ST"`.

## Propها

| prop | نوع | پیش‌فرض | توضیح |
|---|---|---|---|
| `action` | `highlight \| underline \| box \| circle \| strike-through \| crossed-off \| bracket` | `'highlight'` | نوع |
| `color` | string | `#ffd1dc` | رنگ |
| `strokeWidth` | number | `1.5` | ضخامت |
| `animationDuration` | number (ms) | `600` | مدت کشیدن |
| `iterations` | number | `2` | تعداد دور |
| `padding` | number | `2` | فاصله |
| `multiline` | boolean | `true` | چندخطی |
| `isView` | boolean | `false` | فقط هنگام ورود به صفحه |

## مثال

```tsx
<p className="text-3xl font-bold leading-loose">
  طراحی که <Highlighter action="highlight" color="var(--accent)" isView>منتشر می‌شود</Highlighter>
</p>
```

## اتصال به سیستم دیزاین

- **shadcn / Tailwind:** رنگ‌ها را با کلاس‌های توکنی (`bg-primary`، `text-foreground`، `from-primary`) یا `var(--primary)` بدهید؛ کامپوننت‌ها همین کلاس‌ها را می‌پذیرند.
- **Bootstrap یا CSS اختصاصی (بدون Tailwind):** propهای رنگ را با متغیرهای سیستم بدهید (`var(--bs-primary)`) و کلاس‌های Tailwind داخل فایل را با کلاس‌های خودتان عوض کنید، یا Tailwind را فقط برای این پوشه فعال کنید.
- **MUI:** رنگ‌ها را از `theme.vars.palette` (`var(--mui-palette-primary-main)`) بدهید؛ با `sx` روی wrapper چیدمان را کنترل کنید.

## نکته‌ها

- رنگ به SVG داده می‌شود؛ `var(--…)` کار می‌کند چون در DOM resolve می‌شود.
- خط‌ها با `position: absolute` روی صفحه کشیده می‌شوند؛ اگر چیدمان بعداً جابه‌جا شود (مثلاً با باز شدن آکاردئون)، کامپوننت را دوباره mount کنید.
