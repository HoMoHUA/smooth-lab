# Shape-tinted Text

> بخشی از [Smooth Lab Extensions](../README.md) · الگوی مرجع: تیتر «Be the first to experiment» در labs.google · فایل‌ها: `extensions/effects/shape-text.ts` و `.css`

هر جای تیتر که یک شکل از پشتش رد شود، حروف همان‌جا رنگ عوض می‌کنند.

## پیش‌نیاز

بستهٔ اکستنشن‌ها یک بار در سایت بارگذاری شده باشد ([راهنمای نصب](../setup/install.md)). برای استفادهٔ تکی به‌جای کل بسته، [بخش «فقط همین افکت»](#فقط-همین-افکت) را ببینید.

## نشانه‌گذاری

### HTML (مثال با کلاس‌های Bootstrap)

```html
<header class="position-relative py-5 text-center" data-sl-shapes>
  <i data-sl-shape="hexagon" data-sl-shape-color="1" data-sl-tint="#c2187a"
     data-sl-float="drift" style="--sl-x: 8%; --sl-y: 5%; --sl-size: 22rem"></i>
  <h1 class="display-2" data-sl-shape-text>اولین کسی باشید که امتحان می‌کند</h1>
</header>
```

### React + Tailwind / shadcn

```tsx
<h1 className="text-7xl font-semibold" data-sl-rise data-sl-shape-text>…</h1>
```

در React، زیردرخت را با هوک `useSmoothLab()` فعال کنید (بخش «React» در [راهنمای نصب](../setup/install.md)).

## تنظیمات

| تنظیم | پیش‌فرض | توضیح |
|---|---|---|
| `data-sl-shape-text` | — | روی تیتری داخل همان ظرف `data-sl-shapes` |
| `data-sl-tint` | — | روی شکل؛ رنگ حروف هنگام هم‌پوشانی |

## اتصال به سیستم دیزاین

این افکت هیچ توکن رنگ یا حرکتی از سیستم دیزاین نمی‌خواند؛ ظاهرش کاملاً از CSS خود سایت می‌آید.

## فقط همین افکت

```ts
import { createSmoothLab, shapeText, shape } from "smooth-lab-extensions";
import "smooth-lab-extensions/core/tokens.css";
import "smooth-lab-extensions/effects/shape.css";
import "smooth-lab-extensions/effects/shape-text.css";
import "smooth-lab-extensions/core/reduced-motion.css";
createSmoothLab({ extensions: [shapeText, shape] });
```

## نکته‌ها

- پیش‌نیاز: [Floating Shapes](shape.md). برای شکل‌هایی که روی متن می‌آیند `data-sl-float="drift"` بدهید؛ برش شش‌ضلعی با شکل چرخیده هم‌خوان نیست.
- به‌ازای هر شکل `data-sl-tint` یک کپی از متن ساخته می‌شود؛ بیش از ۲–۳ شکل رنگی برای یک تیتر نگذارید.
- با [Word Rise](rise.md) ترکیب می‌شود؛ ترتیب ثبت اکستنشن‌ها این را تضمین می‌کند.

## کاهش حرکت

کار می‌کند ولی شکل‌ها حرکت نمی‌کنند، پس رنگ حروف ثابت است.
