# ماتریس تطبیق فایل مرجع

این سند از روی `fullstack-effects-kit.html` تهیه شده است. شماره‌گذاری از فهرست خود فایل مرجع پیروی می‌کند؛ در نتیجه هر ردیف باید در نسخهٔ بازسازی‌شده یک نمونه و یک تریگر مستقل داشته باشد.

| شماره | الگوی مرجع | رفتار دقیق مرجع | وضعیت نسخهٔ فعلی | اقدام بازسازی |
|---:|---|---|---|---|
| ۰۱ | Scroll reveal | ورود با `opacity` و جابه‌جایی ۲۴px | ناقص | observer مستقل و یک‌بار اجرا |
| ۰۲ | Stagger reveal | تأخیر مستقیم فرزندان، ۷۰ms | ناقص | تأخیر child-based دقیق |
| ۰۳ | Word fade scrub | شفافیت هر کلمه تابع پیشرفت viewport | ناقص | RAF و تابع پیشرفت مرجع |
| ۰۴ | Marker wipe | پوشش clip-path، نمایش متن و خروج پوشش | ناقص | همان توالی ۱٫۳۵s و ۳۵۰ms |
| ۰۵ | Flat marquee | دو set تکراری، ۲۲s و توقف hover | نزدیک | ساختار دو-set مرجع |
| ۰۶ | Arc marquee | سهمی responsive و افزایش سرعت با velocity اسکرول | ناقص | RAF با محاسبهٔ x/y/slope مرجع |
| ۰۷ | Split button | دو خط کاراکتری، پس‌زمینه scale .98 | نزدیک | قرارداد split-line دقیق |
| ۰۸ | Footer text swap | جابه‌جایی کاراکتر دو خط | نزدیک | قرارداد split-line دقیق |
| ۰۹ | Arrow link | underline از راست و حرکت آیکن | نزدیک | کلاس و فاصلهٔ مرجع |
| ۱۰ | Awards hover | رشد ارتفاع پس‌زمینه ۰ تا ۱۰۰٪ | نزدیک | رنگ و timing مرجع |
| ۱۱ | Team reveal | پنل شیشه‌ای و stagger کاراکتری روی hover | ناقص | panel و split نام مستقل |
| ۱۲ | 3D work cards | rotateX/translateY در ورودی کارت | ناقص | متغیرهای `--in` مرجع |
| ۱۳ | Sticky stack | چسبندگی، scale-recede و image parallax | ناقص | scene اسکرول مستقل یا native sticky |
| ۱۴ | Cursor follower | opacity/scale و مختصات محلی نشانگر | نزدیک | تریگر دقیق ورود/خروج |
| ۱۵ | Text scramble | ۱۲ فریم scramble پس از ورود pointer | نزدیک | چرخه و متن مرجع |
| ۱۶ | Count-up | observer با آستانه .45 و ease cubic | نزدیک | observer و duration جداگانه |
| ۱۷ | Auto slider | ۴ ثانیه، transition ۸۰۰ms و dotها | ناقص | لایه‌های slide واقعی |
| ۱۸ | FAQ accordion | grid row و چرخش ۱۳۵ درجه | نزدیک | aria و timing مرجع |
| ۱۹ | Image parallax | بازهٔ -۱۰٪ تا +۱۰٪ | نزدیک | به‌روزرسانی یک RAF مشترک |
| ۲۰ | Hero parallax | translateY تا ۱۰vh و scale تا .98 | ناقص | transform مبتنی بر پیشرفت صحنه |
| ۲۱ | Inline image reveal | width از صفر تا ۲٫۲em هنگام ورود | ناقص | observer مستقل، بدون loop تزئینی |
| ۲۲ | Rotating icons | slow-spin مستقل و تکرارشونده | نزدیک | چیدمان و duration مرجع |
| ۲۳ | Progressive blur | ده لایه blur با maskهای مرحله‌ای | ناقص | مقادیر blur و mask مرجع |

## دو مؤلفهٔ جدید کاربر

| فایل | الگوی استخراج‌شده | پیاده‌سازی مقصد |
|---|---|---|
| `scroll-effect.txt` | Sticky Bento با لایهٔ چسبان، جعبه‌های توضیح و جای‌گیری progressive enhancement | بخش مستقل Bento Scene |
| `scroll-image.txt` | Pop-out Image با دو لایهٔ تصویر، view-timeline و حالت explode | بخش مستقل Pop-out Gallery |

پیش از تحویل، هر ردیف باید با مرجع از نظر ساختار، تریگر و حرکت کنترل شود؛ شباهت سطحی یا صرفاً قرارگرفتن یک عنوان، معیار تکمیل نیست.
