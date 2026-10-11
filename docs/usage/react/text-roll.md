# Text Roll

> بخشی از [کامپوننت‌های React](../README.md) · منبع: Motion Primitives (Julien Thibeaut، MIT) — در 21st.dev با نام `@ibelick` · فایل: `client/src/components/motion/text-roll.tsx`

حروف یکی‌یکی به بالا می‌چرخند و نسخهٔ جدید از پایین می‌آید؛ مناسب hover دکمه.

## نصب در پروژهٔ دیگر

1. فایل `text-roll.tsx` را در پوشهٔ کامپوننت‌های پروژه کپی کنید.
2. وابستگی‌ها: `pnpm add framer-motion`
3. اگر فایل `cn` را import می‌کند و پروژه آن را ندارد (پروژه‌های غیر shadcn)، این را بسازید:

```ts
// lib/utils.ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));
```

۴. یک بار در ریشهٔ برنامه `<MotionConfig reducedMotion="user">` بگذارید تا تنظیم «کاهش حرکت» سیستم رعایت شود.

با کلید API در https://21st.dev/mcp می‌توانید همین کامپوننت را مستقیم هم نصب کنید: `npx shadcn@latest add "https://21st.dev/r/<author>/text-roll?api_key=$API_KEY_21ST"`.

## Propها

| prop | نوع | پیش‌فرض | توضیح |
|---|---|---|---|
| `children` | string | — | متن |
| `duration` | number (s) | `0.5` | مدت هر حرف |
| `getEnterDelay / getExitDelay` | (i) => number | `i*0.1` / `i*0.1+0.2` | تأخیر هر حرف |
| `transition / variants` |  | — | تنظیم حرکت |

## مثال

```tsx
const [round, setRound] = useState(0);
<Button onMouseEnter={() => setRound((r) => r + 1)}>
  <TextRoll key={round} duration={0.35} getEnterDelay={(i) => i * 0.03}>Start a project</TextRoll>
</Button>
```

## اتصال به سیستم دیزاین

- **shadcn / Tailwind:** رنگ‌ها را با کلاس‌های توکنی (`bg-primary`، `text-foreground`، `from-primary`) یا `var(--primary)` بدهید؛ کامپوننت‌ها همین کلاس‌ها را می‌پذیرند.
- **Bootstrap یا CSS اختصاصی (بدون Tailwind):** propهای رنگ را با متغیرهای سیستم بدهید (`var(--bs-primary)`) و کلاس‌های Tailwind داخل فایل را با کلاس‌های خودتان عوض کنید، یا Tailwind را فقط برای این پوشه فعال کنید.
- **MUI:** رنگ‌ها را از `theme.vars.palette` (`var(--mui-palette-primary-main)`) بدهید؛ با `sx` روی wrapper چیدمان را کنترل کنید.

## نکته‌ها

- هر بار که `key` عوض شود دوباره اجرا می‌شود؛ الگوی بالا آن را به hover وصل می‌کند.
- حرف‌به‌حرف است؛ برای متن لاتین استفاده کنید.
