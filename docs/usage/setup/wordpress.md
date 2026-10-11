# WordPress و سایت‌های بدون bundler

1. پوشهٔ `dist/extensions` را در قالب کپی کنید، مثلاً `wp-content/themes/your-theme/smooth-lab/`.
2. در `functions.php`:

```php
add_action('wp_enqueue_scripts', function () {
  $base = get_template_directory_uri() . '/smooth-lab';
  wp_enqueue_style('smooth-lab', "$base/smooth-lab.css", [], '1.0.0');
  // آداپتور مناسب قالب، یا آداپتور اختصاصی خودتان
  wp_enqueue_style('smooth-lab-adapter', "$base/adapters/bootstrap.css", ['smooth-lab'], '1.0.0');
  wp_enqueue_script('smooth-lab', "$base/smooth-lab.iife.js", [], '1.0.0', ['strategy' => 'defer']);
});
```

3. در ویرایشگر بلوک (Gutenberg)، attribute را از تب «پیشرفته» نمی‌شود اضافه کرد؛ از بلوک «HTML سفارشی» استفاده کنید یا با یک فیلتر کوچک کلاس را به attribute تبدیل کنید:

```js
// smooth-lab-classes.js — کلاس‌های sl-reveal و sl-rise را به attribute تبدیل می‌کند
document.querySelectorAll('[class*="sl-"]').forEach((el) => {
  el.classList.forEach((c) => c.startsWith("sl-") && el.setAttribute(`data-${c}`, ""));
});
```

این اسکریپت را قبل از `smooth-lab.iife.js` بارگذاری کنید. با آن، کافی است در تب «پیشرفته» کلاس `sl-reveal` بدهید.

4. Elementor و صفحه‌سازها: در بخش «Attributes» ویجت (Elementor Pro) بنویسید `data-sl-reveal|` یا از روش کلاس بالا استفاده کنید.
