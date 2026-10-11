# اتصال به سیستم دیزاین اختصاصی (CSS variables)

فرض: سیستم شما توکن‌هایی مثل `--brand-primary`، `--surface-1` و `--radius-card` دارد. یک فایل آداپتور بسازید و بعد از `smooth-lab.css` بارگذاری کنید:

```css
/* smooth-lab-adapter.css */
@layer smooth-lab.adapter {
  :root,
  [data-theme] {
    --sl-color-accent: var(--brand-primary);
    --sl-color-accent-contrast: var(--brand-on-primary);
    --sl-color-highlight: var(--brand-secondary);
    --sl-color-surface: var(--surface-1);
    --sl-color-surface-raised: var(--surface-2);
    --sl-color-surface-inverse: var(--surface-inverse);
    --sl-color-text: var(--text-1);
    --sl-color-text-inverse: var(--text-on-inverse);
    --sl-color-text-muted: var(--text-2);
    --sl-color-border: var(--border-subtle);
    --sl-radius-md: var(--radius-card);
    --sl-ease-out: var(--motion-ease-out);
    --sl-duration-enter: var(--motion-duration-slow);
  }
}
```

- هر توکنی که نگاشت نکنید، مقدار پیش‌فرض Smooth Lab را می‌گیرد.
- selector را با روش تم تیرهٔ خودتان هماهنگ کنید (`[data-theme]`، `.theme-dark`، …) تا مقادیر روی همان عنصر محاسبه شوند.
- اگر سیستم شما خودش layer دارد، `smooth-lab` را بعد از reset و قبل از utilities بگذارید: `@layer reset, tokens, components, smooth-lab, utilities;`.
- اگر توکن‌ها فقط در JS هستند (مثلاً styled-components theme)، از `connectTheme()` استفاده کنید.

نمونهٔ کامل: `extensions/examples/host-page.html` (یک سایت با توکن‌های خودش که اکستنشن‌ها را مصرف می‌کند).
