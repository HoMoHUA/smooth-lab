# Marker Wipe

> بخشی از [Smooth Lab Extensions](../README.md) · الگوی مرجع: الگوی ۰۳ Effects Kit · فایل‌ها: `extensions/effects/marker.ts` و `.css`

یک نوار رنگی از روی متن رد می‌شود و متن پشت آن ظاهر می‌شود؛ برای یک جملهٔ کلیدی.

## پیش‌نیاز

بستهٔ اکستنشن‌ها یک بار در سایت بارگذاری شده باشد ([راهنمای نصب](../setup/install.md)). برای استفادهٔ تکی به‌جای کل بسته، [بخش «فقط همین افکت»](#فقط-همین-افکت) را ببینید.

## نشانه‌گذاری

### HTML (مثال با کلاس‌های Bootstrap)

```html
<h2 class="display-4">
  <span data-sl-marker>طراحی که منتشر می‌شود.</span><br>
  <span data-sl-marker data-sl-marker-index="1">کدی که دوام می‌آورد.</span>
</h2>
```

### React + Tailwind / shadcn

```tsx
<h2 className="text-4xl font-bold">
  <span data-sl-marker>طراحی که منتشر می‌شود.</span>
</h2>
```

در React، زیردرخت را با هوک `useSmoothLab()` فعال کنید (بخش «React» در [راهنمای نصب](../setup/install.md)).

## تنظیمات

| تنظیم | پیش‌فرض | توضیح |
|---|---|---|
| `data-sl-marker` | — | روی span درون تیتر |
| `data-sl-marker-index` | `0` | ترتیب در یک دنباله؛ هر پله ۳۵۰ms تأخیر |

## اتصال به سیستم دیزاین

| توکن | پیش‌فرض | shadcn / Tailwind | Bootstrap 5 | MUI | NeXTPixel |
|---|---|---|---|---|---|
| `--sl-color-accent` | `#315cff` | `var(--primary)` | `var(--bs-primary)` | `var(--mui-palette-primary-main)` | `var(--ds-cobalt)` |
| `--sl-ease-standard` | `cubic-bezier(0.455, 0.03, 0.515, 0.955)` | پیش‌فرض | پیش‌فرض | پیش‌فرض | پیش‌فرض |

ستون «پیش‌فرض» یعنی آداپتور آن سیستم این توکن را نگاشت نمی‌کند و مقدار پیش‌فرض Smooth Lab استفاده می‌شود؛ برای تغییرش همان توکن را در CSS سایت تعریف کنید.

## فقط همین افکت

```ts
import { createSmoothLab, marker } from "smooth-lab-extensions";
import "smooth-lab-extensions/core/tokens.css";
import "smooth-lab-extensions/effects/marker.css";
import "smooth-lab-extensions/core/reduced-motion.css";
createSmoothLab({ extensions: [marker] });
```

## نکته‌ها

- رنگ نوار از `--sl-color-accent` می‌آید؛ در shadcn همان `--primary` و در Bootstrap همان `--bs-primary` است.
- برای رنگ متفاوت فقط روی همان عنصر بنویسید: `style="--sl-color-accent: var(--bs-warning)"`.

## کاهش حرکت

نوار نمایش داده نمی‌شود و متن از ابتدا دیده می‌شود.
