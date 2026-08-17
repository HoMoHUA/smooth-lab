# گزارش بازسازی Effects Kit

این نسخه، فایل `fullstack-effects-kit.html` را به یک Effects Kit مستقل در React تبدیل می‌کند. نام‌ها، ترتیب نمایشی و منطق هر الگو از فایل مرجع استخراج شدند، اما اجرا وابسته به Webflow، GSAP یا runtime خارجی نیست. دو فایل افزودهٔ کاربر نیز به دو ماژول مستقل تبدیل شده‌اند.

| دامنه | الگوها | پیاده‌سازی و تریگر |
|---|---|---|
| ورود و متن | ۰۱ تا ۰۳ | IntersectionObserver مستقل برای Reveal/Stagger و Marker؛ RAF برای Word Fade Scrub |
| نوارهای متحرک | ۰۴ تا ۰۵ | Marquee دو-set با توقف hover و Arc سهمی محاسبه‌شده با velocity اسکرول |
| تعامل hover | ۰۶ تا ۱۰ | split-lines، underline، background rise و Team panel با انتقال کاراکتری |
| کارت‌های کار | ۱۱ تا ۱۳ | rotateX، پشتهٔ sticky، scale-recede و پارالاکس تصویر |
| اشاره‌گر و ابزار | ۱۴ تا ۱۸ | Cursor follower، scramble دوازده‌فریمی، count-up، slider چهارثانیه‌ای و FAQ grid-row |
| رسانه و سطح صفحه | ۱۹ تا ۲۳ | image parallax، inline reveal، pulse/slow-spin، hero parallax و progressive blur ده‌لایه |
| ماژول‌های افزوده | Bento و Pop-out | Sticky Bento با پیشرفت اسکرول و Pop-out Image با دو لایه، حالت Explode و دارایی پایدار |

## کنترل‌های انجام‌شده

بازبینی مرورگر، Marker Wipe، شمارنده، اسلایدر خودکار، Sticky Bento، Pop-out Image و حالت Explode را تأیید کرد. build و TypeScript بدون خطا گذشتند. نتایج جزئی هر آزمون در `test-results.md` ثبت شده‌اند.

> برای استفاده در صفحه‌ای دیگر، مؤلفه‌های `ReferenceEffectsKit.tsx` و `ScrollReferenceModules.tsx` را منتقل کنید و متغیرهای کلاس‌های `rk-*` و `bento-reference`/`pop-reference` را در CSS همراه آن نگه دارید.
