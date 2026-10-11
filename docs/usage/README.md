# راهنمای استفادهٔ Smooth Lab در سیستم دیزاین فعلی

این پوشه نشان می‌دهد هر افکت و هر کامپوننت این ریپو چطور، **تک‌به‌تک**، به سیستم دیزاینی که الان در سایت‌تان کار می‌کند وصل می‌شود.

## دو لایه، دو روش

| | اکستنشن‌ها (`extensions/`) | کامپوننت‌های React (`client/src/components/motion/`) |
|---|---|---|
| فریم‌ورک | هیچ؛ HTML ساده، WordPress، Bootstrap، Vue، React… | فقط React (framer-motion) |
| فعال‌سازی | یک attribute مثل `data-sl-reveal` روی عنصر موجود | import کامپوننت و قرار دادن در JSX |
| رنگ و حرکت | از توکن‌های `--sl-*` که به توکن‌های سیستم شما نگاشت می‌شوند | از props و کلاس‌های Tailwind/توکن‌های سیستم |
| نصب | بستهٔ `smooth-lab-extensions` یا یک تگ `<script>` | کپی فایل کامپوننت + `framer-motion` |

## شروع

1. [نصب و راه‌اندازی](setup/install.md): سه روش بارگذاری، ترتیب لایه‌های CSS، هوک React، اسکرول نرم.
2. راهنمای سیستم دیزاین خودتان:
   - [shadcn/ui و Tailwind](setup/shadcn-tailwind.md)
   - [Bootstrap 5](setup/bootstrap.md)
   - [MUI](setup/mui.md)
   - [CSS اختصاصی / سیستم دیزاین داخلی](setup/custom-css.md)
   - [WordPress و سایت‌های بدون bundler](setup/wordpress.md)
3. صفحهٔ هر افکت یا کامپوننت از جدول‌های زیر.

<!-- tables:start -->
## اکستنشن‌ها (بدون وابستگی به فریم‌ورک)

| افکت | فعال‌سازی | الگوی مرجع |
|---|---|---|
| [Reveal و Stagger](extensions/reveal.md) | `data-sl-reveal` | الگوی ۰۱ Effects Kit |
| [Word Rise](extensions/rise.md) | `data-sl-rise` | ورود appearFromTop در NotebookLM |
| [Marker Wipe](extensions/marker.md) | `data-sl-marker` | الگوی ۰۳ Effects Kit |
| [Marquee](extensions/marquee.md) | `data-sl-marquee` | الگوی ۰۴ Effects Kit |
| [Count-up](extensions/count-up.md) | `data-sl-count-up` | الگوی ۱۶ Effects Kit |
| [Parallax](extensions/parallax.md) | `data-sl-parallax` | الگوهای ۱۳ و ۱۹ Effects Kit |
| [Word Scrub](extensions/word-scrub.md) | `data-sl-word-scrub` | الگوی ۰۲ Effects Kit |
| [Arrow Link](extensions/arrow-link.md) | `data-sl-arrow-link` | الگوی ۰۸ Effects Kit |
| [Floating Shapes](extensions/shape.md) | `data-sl-shapes / data-sl-shape` | شکل‌های شناور labs.google (`gl-float-*`) |
| [Shape-tinted Text](extensions/shape-text.md) | `data-sl-shape-text` | تیتر «Be the first to experiment» در labs.google |
| [Physics Pile](extensions/pile.md) | `data-sl-pile` | برچسب‌های دسته‌بندی و تودهٔ شکل‌های footer در labs.google |
| [Fanned Cards](extensions/fan.md) | `data-sl-fan` | کارت‌های کج‌شدهٔ labs.google |
| [Source Flow](extensions/flow.md) | `data-sl-flow` | بخش «How it works» در NotebookLM |
| [Text Shine](extensions/shine.md) | `data-sl-shine` | textShine روی کلمهٔ تأکیدی NotebookLM |
| [Progress Carousel](extensions/carousel.md) | `data-sl-carousel` | Hero تمام‌عرض labs.google |
| [Magnetic](extensions/magnetic.md) | `data-sl-magnetic` | CTAهای footer در labs.google |
| [3D Tilt + Glare](extensions/tilt.md) | `data-sl-tilt` | hover کارت‌های پریمیوم |

## کامپوننت‌های React

| کامپوننت | منبع | وابستگی |
|---|---|---|
| [Text Effect](react/text-effect.md) | Motion Primitives | framer-motion |
| [Text Effect In View](react/text-effect-in-view.md) | کمکی همین پروژه | framer-motion |
| [Text Shimmer](react/text-shimmer.md) | Motion Primitives | framer-motion |
| [Text Roll](react/text-roll.md) | Motion Primitives | framer-motion |
| [Text Scramble](react/text-scramble.md) | Motion Primitives | framer-motion |
| [Animated Group](react/animated-group.md) | Motion Primitives | framer-motion |
| [Animated Background](react/animated-background.md) | Motion Primitives | framer-motion |
| [Animated Number](react/animated-number.md) | Motion Primitives | framer-motion |
| [Number Ticker](react/number-ticker.md) | Magic UI | framer-motion |
| [Infinite Slider](react/infinite-slider.md) | Motion Primitives | framer-motion, react-use-measure |
| [Progressive Blur](react/progressive-blur.md) | Motion Primitives | framer-motion |
| [Border Trail](react/border-trail.md) | Motion Primitives | framer-motion |
| [Border Beam](react/border-beam.md) | Magic UI | framer-motion |
| [Spotlight](react/spotlight.md) | Motion Primitives | framer-motion |
| [Magic Card](react/magic-card.md) | Magic UI | framer-motion, next-themes |
| [Highlighter](react/highlighter.md) | Magic UI | framer-motion, rough-notation |
| [Animated Beam](react/animated-beam.md) | Magic UI | framer-motion |
| [Scroll Velocity](react/scroll-based-velocity.md) | Magic UI | framer-motion |
| [In View](react/in-view.md) | Motion Primitives | framer-motion |
<!-- tables:end -->

## بازتولید این مستندات

صفحه‌های تک‌موردی با `python3 scripts/gen-usage-docs.py` ساخته می‌شوند. جدول توکن‌ها مستقیم از `extensions/adapters/*.css` خوانده می‌شود، پس با تغییر آداپتورها به‌روز می‌ماند.
