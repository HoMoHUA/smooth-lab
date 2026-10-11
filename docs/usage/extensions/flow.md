# Source Flow

> بخشی از [Smooth Lab Extensions](../README.md) · الگوی مرجع: بخش «How it works» در NotebookLM · فایل‌ها: `extensions/effects/flow.ts` و `.css`

منبع‌ها با منحنی‌هایی که کشیده می‌شوند به یک مرکز وصل می‌شوند و نقطه‌هایی روی خطوط جریان دارند؛ مرکز پالس می‌زند.

## پیش‌نیاز

بستهٔ اکستنشن‌ها یک بار در سایت بارگذاری شده باشد ([راهنمای نصب](../setup/install.md)). برای استفادهٔ تکی به‌جای کل بسته، [بخش «فقط همین افکت»](#فقط-همین-افکت) را ببینید.

## نشانه‌گذاری

### HTML (مثال با کلاس‌های Bootstrap)

```html
<div class="d-grid gap-5 align-items-center" style="grid-template-columns: 1fr auto" data-sl-flow>
  <div class="d-grid gap-3">
    <div class="card card-body" data-sl-flow-source>گزارش PDF</div>
    <div class="card card-body" data-sl-flow-source>ویدیو</div>
  </div>
  <div class="badge rounded-pill text-bg-primary p-3" data-sl-flow-hub>پاسخ مستند</div>
</div>
```

### React + Tailwind / shadcn

```tsx
<div className="grid grid-cols-[1fr_auto] items-center gap-24" data-sl-flow>
  <div className="grid gap-4">{sources.map((s) => <Card key={s} data-sl-flow-source>{s}</Card>)}</div>
  <div className="rounded-full bg-primary px-5 py-3 text-primary-foreground" data-sl-flow-hub>پاسخ مستند</div>
</div>
```

در React، زیردرخت را با هوک `useSmoothLab()` فعال کنید (بخش «React» در [راهنمای نصب](../setup/install.md)).

## تنظیمات

| تنظیم | پیش‌فرض | توضیح |
|---|---|---|
| `data-sl-flow` | — | روی ظرف |
| `data-sl-flow-source` | — | روی هر منبع (هر تعداد) |
| `data-sl-flow-hub` | — | روی یک مرکز |

## اتصال به سیستم دیزاین

| توکن | پیش‌فرض | shadcn / Tailwind | Bootstrap 5 | MUI | NeXTPixel |
|---|---|---|---|---|---|
| `--sl-color-accent` | `#315cff` | `var(--primary)` | `var(--bs-primary)` | `var(--mui-palette-primary-main)` | `var(--ds-cobalt)` |
| `--sl-duration-enter` | `800ms` | پیش‌فرض | پیش‌فرض | پیش‌فرض | پیش‌فرض |
| `--sl-ease-in-out` | `cubic-bezier(0.77, 0, 0.175, 1)` | پیش‌فرض | پیش‌فرض | پیش‌فرض | `var(--ds-ease-in-out)` |
| `--sl-ease-out` | `cubic-bezier(0.23, 1, 0.32, 1)` | پیش‌فرض | پیش‌فرض | پیش‌فرض | `var(--ds-ease-out)` |

ستون «پیش‌فرض» یعنی آداپتور آن سیستم این توکن را نگاشت نمی‌کند و مقدار پیش‌فرض Smooth Lab استفاده می‌شود؛ برای تغییرش همان توکن را در CSS سایت تعریف کنید.

## فقط همین افکت

```ts
import { createSmoothLab, flow } from "smooth-lab-extensions";
import "smooth-lab-extensions/core/tokens.css";
import "smooth-lab-extensions/effects/flow.css";
import "smooth-lab-extensions/core/reduced-motion.css";
createSmoothLab({ extensions: [flow] });
```

## نکته‌ها

- چیدمان کاملاً دست سایت است؛ منحنی‌ها از جای واقعی جعبه‌ها اندازه‌گیری و با تغییر اندازه دوباره کشیده می‌شوند.
- پالس مرکز `box-shadow` است؛ اگر سیستم دیزاین روی آن عنصر سایه دارد، سایه را روی wrapper بگذارید.

## کاهش حرکت

خطوط کامل و بدون نقطهٔ متحرک نمایش داده می‌شوند.
