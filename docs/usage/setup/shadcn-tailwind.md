# اتصال به shadcn/ui و Tailwind v4

## اکستنشن‌ها

```css
/* app/globals.css یا src/index.css — خط اول */
@layer theme, base, components, smooth-lab, utilities;
@import "tailwindcss";
```

```ts
// main.tsx / layout.tsx
import "smooth-lab-extensions/smooth-lab.css";
import "smooth-lab-extensions/adapters/shadcn.css";
```

آداپتور این نگاشت را انجام می‌دهد (و با `.dark` تم تیره را هم دنبال می‌کند):

| Smooth Lab | shadcn |
|---|---|
| `--sl-color-accent` / `-contrast` | `--primary` / `--primary-foreground` |
| `--sl-color-highlight` / `-contrast` | `--accent` / `--accent-foreground` |
| `--sl-color-surface` / `-raised` | `--background` / `--card` |
| `--sl-color-text` / `-muted` | `--foreground` / `--muted-foreground` |
| `--sl-color-border` | `--border` |
| `--sl-radius-*` | از `--radius` |

پالت شکل‌ها را به رنگ‌های نمودار shadcn وصل کنید (اختیاری):

```css
:root {
  --sl-color-shape-1: var(--chart-1);
  --sl-color-shape-2: var(--chart-2);
  --sl-color-shape-3: var(--chart-3);
  --sl-color-shape-4: var(--chart-4);
  --sl-color-shape-5: var(--chart-5);
}
```

استفاده روی کامپوننت‌های shadcn: attribute را مستقیم روی همان کامپوننت بگذارید؛ shadcn propهای اضافه را به DOM می‌دهد.

```tsx
<Card data-sl-tilt="6">…</Card>
<Button asChild><a href="/start" data-sl-magnetic>شروع</a></Button>
```

متغیرهای هر افکت را با کلاس دلخواه Tailwind بدهید: `className="[--sl-fan-angle:7deg]"`.

## کامپوننت‌های React

همهٔ فایل‌های `client/src/components/motion/` برای shadcn نوشته شده‌اند (`cn` از `@/lib/utils`، کلاس‌های `bg-background`، `text-foreground`). فقط کپی کنید و `pnpm add framer-motion` بزنید. رنگ‌ها را با `var(--primary)` یا کلاس‌های توکنی بدهید.
