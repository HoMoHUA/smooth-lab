# Smooth Lab

سیستم حرکت اکستنشنی: افکت‌ها و کامپوننت‌هایی که روی سیستم دیزاین فعلی هر سایت سوار می‌شوند.

| مسیر | محتوا |
|---|---|
| [`docs/usage/`](docs/usage/README.md) | **راهنمای استفادهٔ تک‌به‌تک** برای هر افکت و کامپوننت، و اتصال به shadcn/Tailwind، Bootstrap، MUI، CSS اختصاصی و WordPress |
| `extensions/` | اکستنشن‌های بدون فریم‌ورک (`data-sl-*`) با قرارداد توکن `--sl-*` و آداپتورها |
| `dist/extensions/` | بستهٔ ساخته‌شدهٔ `smooth-lab-extensions` (در zip تحویلی موجود است؛ در غیر این صورت `pnpm build:ext`) |
| `client/src/components/motion/` | کامپوننت‌های React با framer-motion (Motion Primitives و Magic UI، در دسترس در 21st.dev) |
| `client/` | سایت نمایشی که همهٔ موارد را زنده نشان می‌دهد |
| [`EXTENSION_SYSTEM.md`](EXTENSION_SYSTEM.md) | معماری، ممیزی و تاریخچهٔ تغییرات |

## اجرا

```bash
pnpm install
pnpm dev          # سایت نمایشی روی http://localhost:3000
pnpm build:ext    # ساخت بستهٔ اکستنشن‌ها در dist/extensions
pnpm test         # آزمون قرارداد توکن و runtime
pnpm check        # TypeScript
```
