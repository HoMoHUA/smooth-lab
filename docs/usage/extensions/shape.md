# Floating Shapes

> بخشی از [Smooth Lab Extensions](../README.md) · الگوی مرجع: شکل‌های شناور labs.google (`gl-float-*`) · فایل‌ها: `extensions/effects/shape.ts` و `.css`

شکل‌های تزئینی (شش‌ضلعی، دایره، مربع گرد، شبدری، کپسول) با حرکت شناور و پارالاکس عمقی در اسکرول.

## پیش‌نیاز

بستهٔ اکستنشن‌ها یک بار در سایت بارگذاری شده باشد ([راهنمای نصب](../setup/install.md)). برای استفادهٔ تکی به‌جای کل بسته، [بخش «فقط همین افکت»](#فقط-همین-افکت) را ببینید.

## نشانه‌گذاری

### HTML (مثال با کلاس‌های Bootstrap)

```html
<header class="position-relative overflow-hidden py-5 text-center" data-sl-shapes>
  <i data-sl-shape="hexagon" data-sl-shape-color="1" data-sl-depth="0.5"
     style="--sl-x: 6%; --sl-y: 10%; --sl-size: 18rem"></i>
  <i data-sl-shape="circle" data-sl-shape-color="2"
     style="--sl-x: 70%; --sl-y: 55%; --sl-size: 10rem"></i>
  <h1 class="display-2">آزمایش‌های تازه</h1>
</header>
```

### React + Tailwind / shadcn

```tsx
<header className="relative overflow-hidden py-24 text-center" data-sl-shapes>
  <i data-sl-shape="clover" data-sl-shape-color="3" data-sl-depth="1.2"
     style={{ "--sl-x": "80%", "--sl-y": "8%", "--sl-size": "6rem" } as React.CSSProperties} />
  <h1 className="text-6xl font-semibold">…</h1>
</header>
```

در React، زیردرخت را با هوک `useSmoothLab()` فعال کنید (بخش «React» در [راهنمای نصب](../setup/install.md)).

## تنظیمات

| تنظیم | پیش‌فرض | توضیح |
|---|---|---|
| `data-sl-shapes` | — | روی ظرف؛ شکل‌های مستقیم آن absolute و شناور می‌شوند |
| `data-sl-shape` | — | `circle` / `square` / `hexagon` / `clover` / `pill` |
| `data-sl-shape-color` | `1` | ۱ تا ۵ از پالت `--sl-color-shape-*` |
| `data-sl-depth` | `0` | پارالاکس اسکرول؛ مثبت = سریع‌تر بالا می‌رود، منفی = برعکس |
| `data-sl-float` | روشن | `drift` = بدون چرخش، `off` = بدون حرکت |

### متغیرهای CSS مخصوص این افکت

| متغیر | پیش‌فرض | توضیح |
|---|---|---|
| `--sl-x` | `0` | فاصله از لبهٔ شروع (در RTL از راست) |
| `--sl-y` | `0` | فاصله از بالا |
| `--sl-size` | `8rem` | اندازه |
| `--sl-rotate` | `0deg` | زاویهٔ پایه |

## اتصال به سیستم دیزاین

| توکن | پیش‌فرض | shadcn / Tailwind | Bootstrap 5 | MUI | NeXTPixel |
|---|---|---|---|---|---|
| `--sl-color-shape-1` | `#4af08a` | پیش‌فرض | پیش‌فرض | پیش‌فرض | پیش‌فرض |
| `--sl-color-shape-2` | `#ffbdf7` | پیش‌فرض | پیش‌فرض | پیش‌فرض | پیش‌فرض |
| `--sl-color-shape-3` | `#5b9cff` | پیش‌فرض | پیش‌فرض | پیش‌فرض | پیش‌فرض |
| `--sl-color-shape-4` | `#fcc934` | پیش‌فرض | پیش‌فرض | پیش‌فرض | پیش‌فرض |
| `--sl-color-shape-5` | `#ff8a3d` | پیش‌فرض | پیش‌فرض | پیش‌فرض | پیش‌فرض |

ستون «پیش‌فرض» یعنی آداپتور آن سیستم این توکن را نگاشت نمی‌کند و مقدار پیش‌فرض Smooth Lab استفاده می‌شود؛ برای تغییرش همان توکن را در CSS سایت تعریف کنید.

## فقط همین افکت

```ts
import { createSmoothLab, shape } from "smooth-lab-extensions";
import "smooth-lab-extensions/core/tokens.css";
import "smooth-lab-extensions/effects/shape.css";
import "smooth-lab-extensions/core/reduced-motion.css";
createSmoothLab({ extensions: [shape] });
```

## نکته‌ها

- پالت را با سیستم دیزاین هماهنگ کنید: `--sl-color-shape-1: var(--chart-1)` در shadcn یا `var(--bs-success)` در Bootstrap.
- شکل‌ها `z-index: -1` دارند؛ ظرف `isolation: isolate` می‌گیرد تا زیر پس‌زمینهٔ بخش‌های دیگر نروند.
- بیرون از `data-sl-shapes` شکل استاتیک است و می‌توان آن را در [Pile](pile.md) یا هر چیدمانی گذاشت.

## کاهش حرکت

شکل‌ها ثابت می‌مانند.
