# اتصال به Bootstrap 5.3

```html
<link rel="stylesheet" href="bootstrap.min.css">
<link rel="stylesheet" href="smooth-lab/smooth-lab.css">
<link rel="stylesheet" href="smooth-lab/adapters/bootstrap.css">
<script src="smooth-lab/smooth-lab.iife.js" defer></script>
```

Bootstrap layer ندارد، پس CSS آن به‌طور طبیعی بر اکستنشن‌ها مقدم است و چیزی لازم نیست. فقط اگر reboot آن ظاهر دکمه‌های Carousel را تغییر داد، اکستنشن‌ها را بعد از Bootstrap بارگذاری کنید (همان ترتیب بالا).

آداپتور با `[data-bs-theme="dark"]` تم تیره را دنبال می‌کند:

| Smooth Lab | Bootstrap |
|---|---|
| `--sl-color-accent` | `--bs-primary` |
| `--sl-color-highlight` | `--bs-warning` |
| `--sl-color-surface` / `-raised` | `--bs-body-bg` / `--bs-tertiary-bg` |
| `--sl-color-text` / `-muted` | `--bs-body-color` / `--bs-secondary-color` |
| `--sl-color-border` | `--bs-border-color` |
| `--sl-radius-sm/md/lg` | `--bs-border-radius-sm` / `--bs-border-radius` / `--bs-border-radius-lg` |
| `--sl-font-body` / `-mono` | `--bs-body-font-family` / `--bs-font-monospace` |

مثال روی کامپوننت‌های Bootstrap:

```html
<div class="row g-3" data-sl-reveal data-sl-stagger="100">
  <div class="col-md-4"><div class="card" data-sl-tilt>…</div></div>
</div>
<a class="btn btn-primary btn-lg rounded-pill" data-sl-magnetic>شروع</a>
```

نکته: کارت‌هایی که در Bootstrap `transform` در hover دارند، اگر `data-sl-tilt` یا `data-sl-fan` روی خودشان باشد تداخل می‌کنند؛ افکت را روی wrapper یا عنصر داخلی بگذارید.

کامپوننت‌های React در پروژهٔ React+Bootstrap: propهای رنگ را با `var(--bs-primary)` بدهید و کلاس‌های Tailwind داخل فایل‌ها را با کلاس‌های Bootstrap عوض کنید (صفحهٔ هر کامپوننت).
