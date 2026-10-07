# گزارش بررسی میدانی و اصلاح افکت‌ها

این سند نتیجهٔ اجرای واقعی پروژه در مرورگر (Chromium، دسکتاپ ۱۳۶۶×۹۰۰ و موبایل ۳۹۰×۸۰۰، حالت عادی و `prefers-reduced-motion`) و اصلاح باگ‌هاست. مرجع افکت‌های پیاده‌شده، `ReferenceEffectsKit.tsx` و `ScrollReferenceModules.tsx` است.

## باگ‌های پیدا و اصلاح‌شده

| # | مشکل (با شواهد) | ریشه | اصلاح |
|---|---|---|---|
| 1 | شش تصویر شکسته (`/manus-storage/*`) در Hero، بخش‌های اسکرول/میدان و Pop-out | فایل‌ها هرگز در ریپو نبودند و فقط از پراکسی Manus سرو می‌شدند | تصاویر SVG محلی در `client/public/images/` ساخته شد (لایهٔ پس‌زمینه و cutout اسکیت‌باز هم‌مختصات‌اند) |
| 2 | **Sticky در حالت اسکرول نرم کار نمی‌کرد**: کارت‌های Work stack و Sticky Bento همراه صفحه می‌رفتند (top: 172 → ‑692) | کل محتوا با `transform` جابه‌جا می‌شد و یک wrapper با `overflow:hidden` والد sticky بود | موتور اسکرول نرم بازنویسی شد: اسکرول native حفظ می‌شود و فقط wheel با lerp وابسته‌به‌زمان نرم می‌شود. sticky، fixed، کیبورد، اسکرول‌بار و anchor دوباره سالم‌اند |
| 3 | sticky حتی در حالت native هم شکسته بود | والدهای `.rk-demo` و `.bento-reference` با `overflow:hidden` scroll container می‌شدند | `overflow:clip` |
| 4 | بلور پایین صفحه (افکت ۲۳) به انتهای کل صفحه (y≈9852) چسبیده بود نه viewport | `position:fixed` داخل عنصر ترنسفرم‌شده | رفع با اصلاح ۲؛ اکنون فقط وقتی Effects Kit در دید است ظاهر می‌شود |
| 5 | نشانگر حلقه‌ای Hero جای موس نبود (موس ۵۰۰ ← حلقه ۱۷۲۷) و با اسکرول می‌لغزید | نبودن `top/left` در RTL و fixed داخل transform | `top:0;left:0` + اصلاح ۲ |
| 6 | Flat marquee در یک‌سوم چرخه نوار خالی داشت | جهت RTL و فقط ۲ کپی محتوا | `direction:ltr`، ۴ کپی، درز دقیق حلقه (`padding-right`) |
| 7 | Arc marquee تقریباً خالی بود، کارت‌ها ~۹۰۰px به راست رانده می‌شدند | آیتم‌های absolute بدون `left/top` در RTL | `top:0;left:0` |
| 8 | Team cards: fade ترتیبی کاراکترها اصلاً وجود نداشت | `opacity` کاراکترها هرگز صفر نمی‌شد | stagger با `--i`، ورود با تأخیر و خروج سریع |
| 9 | Parallax تصویر در نیمهٔ بالای viewport لبهٔ خالی نشان می‌داد | بازهٔ حرکت بیشتر از حاشیهٔ ۲۰٪ | `top:-10%` و بازهٔ ±۸٪ |
| 10 | شمارنده‌ها پس‌زمینهٔ خاکستری و cleanup نادرست داشتند؛ reduced-motion را نادیده می‌گرفتند | cleanup داخل callback ناظر و پس‌زمینهٔ gap | cleanup درست، مقدار نهایی فوری در reduced motion |
| 11 | اسلایدر خودکار بعد از انتخاب دستی تایمر را ریست نمی‌کرد | `setInterval` ثابت | `setTimeout` وابسته به slide؛ در reduced motion خاموش |
| 12 | Text scramble با ورود پشت‌سرهم چند حلقهٔ هم‌زمان می‌ساخت | rAF بدون cancel | حلقهٔ یکتا + cleanup |
| 13 | حلقهٔ رندر Effects Kit و ذرات Hero همیشه (حتی خارج از دید/تب پنهان) اجرا می‌شد و هر فریم DOM را query می‌کرد | نبودن observer | IntersectionObserver + `visibilitychange`، لیست‌های کش‌شده؛ ذرات هنگام resize بازتولید نمی‌شوند |
| 14 | ناوبری داخلی ۴۸px زودتر از عنوان می‌ایستاد | محاسبه با `getBoundingClientRect` روی عنصر هنوز-ترنسفرم‌شدهٔ reveal | محاسبهٔ مستقل از transform (`offsetTop`)؛ هر چهار لینک دقیقاً روی ۲۸px |
| 15 | کاروسل Fieldworks: کارت «قبلی» به‌جای چپ، سه اسلات آن‌طرف‌تر در راست بود | `--card-position` بدون علامت | `--card-offset` علامت‌دار (۲−…۲+) |
| 16 | `.hero-rail`: خط عمودی تبدیل به مستطیل آبی ۱۵۱×۱۰۰ شده بود | `flex:1` در `writing-mode:vertical` | فقط متن عمودی شد |
| 17 | رنگ‌های نامعتبر `#fffcc` و `#fffdf` (پس‌زمینهٔ پنل کنترل و جدول توکن‌ها اعمال نمی‌شد) | ۵ رقم هگز | `#ffffffcc` و `#fffd` |
| 18 | اسکریپت analytics با آدرس خالی (۴۰۴ در هر بارگذاری) و `maximum-scale=1` (مانع zoom) | باقی‌ماندهٔ قالب | حذف؛ favicon افزوده شد |
| 19 | bidi: «۱۸۰–۳۵۰ms» وارونه و «?» پرسش‌های FAQ در ابتدای خط | متن لاتین در زمینهٔ RTL | `unicode-bidi:plaintext` |
| 20 | تیتر Hero با «کنید،» تنها در خط دوم؛ توکن Display/Section با CSS نمی‌خواند | مقادیر دستی دوتایی | `--ds-text-display/-section` منبع واحد، `text-wrap:balance`، `designTokens.ts` هم‌گام شد |
| 21 | سه مؤلفه و دو سند توصیفی مرده (`fx-*`، Atlas) که CSS آن‌ها وجود نداشت | بازماندهٔ نسخه‌های قبل | حذف (تاریخچهٔ git باقی است) |

## نتیجهٔ آزمون‌های میدانی (پس از اصلاح)

- Hero: ذرات، حلقهٔ نشانگر، آمار زنده؛ موس و اسکرول هم‌زمان درست‌اند.
- اسکرول نرم: wheel ۶۰۰px به‌صورت نمایی همگرا می‌شود (۲۴۸، ۳۹۳، ۴۷۸ … ۶۰۰)؛ PageDown و wheel بعد از آن از موقعیت واقعی ادامه می‌دهند؛ حالت native، کنترل اینرسی و بازنشانی کار می‌کنند.
- افکت‌های ۰۱ تا ۲۳: reveal، stagger، word fade، marker، هر دو marquee، split/swap/arrow hover، awards، team، sticky work stack، cursor + scramble، count-up (۷۲ / ۹۸٪ / ۸٫۲)، اسلایدر (۰،۱،۲،۰)، FAQ، parallax، inline reveal و blur تأیید شدند.
- Sticky Bento و Pop-out (شامل Explode) با اسکرول و کلیک درست‌اند.
- موبایل: بدون اسکرول افقی، اسکرول native، بدون خطای کنسول. reduced motion: اسکرول native، شمارنده فوری، Arc ثابت.
- `pnpm check` و `pnpm build` موفق؛ هیچ درخواست شکسته‌ای در `/` و `/labs-study` نیست.

## محدودیت‌های شناخته‌شده

- تصاویر جایگزین (اسکیت‌باز و پس‌زمینه‌ها) تصویرسازی برداری‌اند؛ در صورت داشتن عکس واقعی، با همان نام‌ها جایگزین کنید.
- `vite-plugin-manus-runtime` اسکریپت inline حدود ۳۶۰KB به `index.html` اضافه می‌کند؛ اگر پروژه خارج از Manus میزبانی می‌شود، حذف آن از `vite.config.ts` بررسی شود.
- مسیر ناشناخته به Home می‌رود و `NotFound` عملاً استفاده نمی‌شود.
