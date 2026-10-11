"""Generates docs/usage/: one page per extension and per React motion component.

Option tables come from the data below, which mirrors the data-sl-* attributes read in
extensions/effects/*.ts; token mappings are parsed from extensions/adapters/*.css so they
cannot drift from the adapters. Run: python3 scripts/gen-usage-docs.py
"""
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "docs" / "usage"

# ---------------------------------------------------------------- adapters -> token map
def adapter_map(name):
    css = (ROOT / "extensions" / "adapters" / f"{name}.css").read_text()
    return dict(re.findall(r"(--sl-[a-z0-9-]+):\s*([^;]+);", css))

ADAPTERS = {k: adapter_map(k) for k in ["shadcn", "bootstrap", "mui", "nextpixel"]}
TOKENS = re.findall(r"(--sl-[a-z0-9-]+):\s*([^;]+);", (ROOT / "extensions/core/tokens.css").read_text())
TOKEN_DEFAULT = dict(TOKENS)

def token_table(tokens):
    if not tokens:
        return "این افکت هیچ توکن رنگ یا حرکتی از سیستم دیزاین نمی‌خواند؛ ظاهرش کاملاً از CSS خود سایت می‌آید.\n"
    rows = ["| توکن | پیش‌فرض | shadcn / Tailwind | Bootstrap 5 | MUI | NeXTPixel |", "|---|---|---|---|---|---|"]
    for t in tokens:
        cells = [f"`{ADAPTERS[a][t]}`" if t in ADAPTERS[a] else "پیش‌فرض" for a in ["shadcn", "bootstrap", "mui", "nextpixel"]]
        rows.append(f"| `{t}` | `{TOKEN_DEFAULT.get(t, '—')}` | " + " | ".join(cells) + " |")
    return "\n".join(rows) + "\n\nستون «پیش‌فرض» یعنی آداپتور آن سیستم این توکن را نگاشت نمی‌کند و مقدار پیش‌فرض Smooth Lab استفاده می‌شود؛ برای تغییرش همان توکن را در CSS سایت تعریف کنید.\n"

def options_table(options):
    if not options:
        return "تنظیم اضافه‌ای ندارد.\n"
    rows = ["| تنظیم | پیش‌فرض | توضیح |", "|---|---|---|"]
    rows += [f"| `{a}` | {d} | {t} |" for a, d, t in options]
    return "\n".join(rows) + "\n"

# ---------------------------------------------------------------- extensions
EXT = [
    dict(slug="reveal", title="Reveal و Stagger", source="الگوی ۰۱ Effects Kit",
         what="عنصر تا ورود به صفحه پنهان می‌ماند و سپس با محوشدن و جابه‌جایی کوتاه ظاهر می‌شود. با `data-sl-stagger` فرزندان یکی‌یکی وارد می‌شوند.",
         tokens=["--sl-duration-enter", "--sl-ease-standard", "--sl-reveal-distance"],
         options=[("data-sl-reveal", "—", "فعال‌سازی روی هر عنصر"), ("data-sl-reveal-delay", "`0` (ms)", "تأخیر ورود خود عنصر"), ("data-sl-stagger", "خاموش", "فاصلهٔ ورود فرزندان مستقیم (ms)؛ با آن، فرزندان به‌جای خود عنصر انیمیت می‌شوند")],
         html='<section class="container py-5">\n  <h2 class="display-5" data-sl-reveal>عنوان بخش</h2>\n  <div class="row g-3" data-sl-reveal data-sl-stagger="110">\n    <div class="col-md-4"><div class="card card-body">کارت ۱</div></div>\n    <div class="col-md-4"><div class="card card-body">کارت ۲</div></div>\n    <div class="col-md-4"><div class="card card-body">کارت ۳</div></div>\n  </div>\n</section>',
         jsx='<div className="grid gap-4 md:grid-cols-3" data-sl-reveal data-sl-stagger="110">\n  <Card>…</Card>\n  <Card>…</Card>\n  <Card>…</Card>\n</div>',
         notes=["فاصلهٔ حرکت را با `--sl-reveal-distance` و مدت را با `--sl-duration-enter` در CSS سایت تنظیم کنید.", "روی عنصری که خودش `transform` یا `transition` دارد (مثلاً hover کارت در Bootstrap) آن را روی wrapper بگذارید تا transition ها با هم تداخل نکنند."],
         reduced="عنصر بی‌درنگ با حالت نهایی نمایش داده می‌شود."),
    dict(slug="rise", title="Word Rise", source="ورود appearFromTop در NotebookLM",
         what="کلمه‌های تیتر از زیر یک ماسک بالا می‌آیند و با کمی blur، پشت سر هم ظاهر می‌شوند. تگ‌های درون‌خطی مثل `<em>` حفظ می‌شوند.",
         tokens=["--sl-ease-out"], options=[("data-sl-rise", "—", "روی تیتر یا پاراگراف")],
         html='<h1 class="display-3 fw-bold" data-sl-rise>هر چیزی را <em>بفهمید</em></h1>',
         jsx='<h1 className="text-5xl font-semibold tracking-tight" data-sl-rise>\n  هر چیزی را <em className="text-primary not-italic">بفهمید</em>\n</h1>',
         notes=["متن اصلی در `aria-label` نگه داشته می‌شود و صفحه‌خوان آن را یکجا می‌خواند.", "برای متن‌های فارسی که کلمهٔ لاتین دارند مشکلی ندارد، چون تقسیم بر اساس فاصله است و حروف هر کلمه به هم چسبیده می‌مانند.", "اگر React همان متن را دوباره رندر کند، کلمه‌ها را بازنویسی می‌کند؛ تیتر را ثابت نگه دارید یا کامپوننت را `memo` کنید."],
         reduced="متن دست‌نخورده می‌ماند و تقسیم نمی‌شود."),
    dict(slug="marker", title="Marker Wipe", source="الگوی ۰۳ Effects Kit",
         what="یک نوار رنگی از روی متن رد می‌شود و متن پشت آن ظاهر می‌شود؛ برای یک جملهٔ کلیدی.",
         tokens=["--sl-color-accent", "--sl-ease-standard"], options=[("data-sl-marker", "—", "روی span درون تیتر"), ("data-sl-marker-index", "`0`", "ترتیب در یک دنباله؛ هر پله ۳۵۰ms تأخیر")],
         html='<h2 class="display-4">\n  <span data-sl-marker>طراحی که منتشر می‌شود.</span><br>\n  <span data-sl-marker data-sl-marker-index="1">کدی که دوام می‌آورد.</span>\n</h2>',
         jsx='<h2 className="text-4xl font-bold">\n  <span data-sl-marker>طراحی که منتشر می‌شود.</span>\n</h2>',
         notes=["رنگ نوار از `--sl-color-accent` می‌آید؛ در shadcn همان `--primary` و در Bootstrap همان `--bs-primary` است.", "برای رنگ متفاوت فقط روی همان عنصر بنویسید: `style=\"--sl-color-accent: var(--bs-warning)\"`."],
         reduced="نوار نمایش داده نمی‌شود و متن از ابتدا دیده می‌شود."),
    dict(slug="marquee", title="Marquee", source="الگوی ۰۴ Effects Kit",
         what="محتوا یک بار کپی (با `aria-hidden`) و بی‌پایان چرخانده می‌شود. روی hover می‌ایستد و در صفحه‌های RTL جهتش برعکس می‌شود.",
         tokens=[], options=[("data-sl-marquee", "—", "روی ظرف ردیف"), ("data-sl-marquee-duration", "`22` (ثانیه)", "مدت یک دور کامل")],
         cssvars=[("--sl-marquee-gap", "`2rem`", "فاصلهٔ بین آیتم‌ها")],
         html='<div class="bg-warning py-3 fs-1 fw-bold" data-sl-marquee data-sl-marquee-duration="18">\n  <span>REVEAL</span><span>✦</span><span>HOVER</span><span>✦</span><span>SCROLL</span><span>✦</span>\n</div>',
         jsx='<div className="bg-accent py-4 text-4xl font-bold [--sl-marquee-gap:3rem]" data-sl-marquee>\n  {items.map((item) => <span key={item}>{item}</span>)}\n</div>',
         notes=["آیتم‌ها باید آن‌قدر باشند که حداقل عرض صفحه را پر کنند.", "data-sl-* درون نسخهٔ کپی حذف می‌شود تا افکت‌های دیگر دوبار اجرا نشوند."],
         reduced="محتوا ثابت و بدون کپی نمایش داده می‌شود."),
    dict(slug="count-up", title="Count-up", source="الگوی ۱۶ Effects Kit",
         what="عدد هنگام ورود به صفحه از صفر تا مقدار هدف با ease-out شمرده می‌شود و با `Intl.NumberFormat` قالب می‌گیرد؛ برای صفحهٔ فارسی، ارقام فارسی می‌شوند.",
         tokens=[], options=[("data-sl-count-up", "`0`", "مقدار نهایی"), ("data-sl-count-decimals", "`0`", "تعداد رقم اعشار"), ("data-sl-count-duration", "`2800` (ms)", "مدت شمارش"), ("data-sl-count-locale", "زبان `<html lang>`", "مثلاً `fa-IR` یا `en-US`")],
         html='<div class="row text-center">\n  <div class="col"><strong class="display-4" data-sl-count-up="98">0</strong>٪<br><small class="text-secondary">رضایت</small></div>\n  <div class="col"><strong class="display-4" data-sl-count-up="8.2" data-sl-count-decimals="1">0</strong></div>\n</div>',
         jsx='<strong className="text-5xl font-bold tabular-nums" data-sl-count-up="72" data-sl-count-locale="fa-IR">0</strong>',
         notes=["برای جلوگیری از پرش عرض هنگام شمارش، `font-variant-numeric: tabular-nums` بدهید (در Tailwind: `tabular-nums`).", "مقدار واقعی را در متن اولیه نگذارید؛ با غیرفعال‌بودن JS، صفر دیده می‌شود. اگر SEO مهم است، مقدار نهایی را بنویسید؛ اکستنشن آن را با صفر جایگزین و دوباره می‌شمارد."],
         reduced="مستقیماً عدد نهایی نوشته می‌شود."),
    dict(slug="parallax", title="Parallax", source="الگوهای ۱۳ و ۱۹ Effects Kit",
         what="تصویر درون یک قاب ثابت با اسکرول، آهسته‌تر از صفحه بالا و پایین می‌رود.",
         tokens=[], options=[("data-sl-parallax", "`20`", "دامنهٔ حرکت به درصد ارتفاع خود عنصر")],
         cssvars=[("--sl-parallax-scale", "`1.2`", "بزرگ‌نمایی تا لبه‌ها هنگام حرکت خالی نشوند")],
         html='<figure class="ratio ratio-16x9 overflow-hidden rounded-4">\n  <img src="hero.jpg" class="object-fit-cover" alt="…" data-sl-parallax="24">\n</figure>',
         jsx='<figure className="aspect-video overflow-hidden rounded-xl">\n  <img src="/hero.jpg" alt="…" className="size-full object-cover" data-sl-parallax="20" />\n</figure>',
         notes=["قاب (عنصر والد) باید `overflow: hidden` داشته باشد؛ پیشرفت روی والد اندازه‌گیری می‌شود.", "transform تصویر را اکستنشن می‌نویسد؛ transform دیگری روی همان img نگذارید."],
         reduced="تصویر ثابت می‌ماند."),
    dict(slug="word-scrub", title="Word Scrub", source="الگوی ۰۲ Effects Kit",
         what="کلمه‌های یک پاراگراف بزرگ با پیشرفت اسکرول یکی‌یکی روشن می‌شوند.",
         tokens=[], options=[("data-sl-word-scrub", "—", "روی پاراگراف متنی ساده (بدون تگ داخلی)")],
         html='<p class="display-5 fw-semibold" data-sl-word-scrub>حرکت خوب، پیام ثابت را به تجربه‌ای هدایت‌شده تبدیل می‌کند.</p>',
         jsx='<p className="text-5xl font-semibold" data-sl-word-scrub>{statement}</p>',
         notes=["فقط متن ساده را تقسیم می‌کند؛ تگ‌های درون پاراگراف حذف می‌شوند. برای متن با markup از [Word Rise](rise.md) استفاده کنید.", "با اسکرول نرم مبتنی بر transform (مثل Lenis) رویداد `sl:scroll` را بفرستید؛ بخش «اسکرول نرم» در [راهنمای نصب](../setup/install.md)."],
         reduced="متن عادی و کامل نمایش داده می‌شود."),
    dict(slug="arrow-link", title="Arrow Link", source="الگوی ۰۸ Effects Kit",
         what="فقط CSS: خط زیر لینک از لبهٔ شروع رشد می‌کند و آیکن ۴ پیکسل جلو می‌رود (در RTL به چپ).",
         tokens=["--sl-duration-hover", "--sl-ease-out"], options=[("data-sl-arrow-link", "—", "روی لینک یا دکمه‌ای که یک svg دارد")],
         html='<a class="link-body-emphasis text-decoration-none" href="#" data-sl-arrow-link>\n  ادامه <svg width="16" height="16">…</svg>\n</a>',
         jsx='<a href="/docs" className="text-sm font-medium" data-sl-arrow-link>\n  مستندات <ArrowUpLeft className="size-4" />\n</a>',
         notes=["اگر سیستم دیزاین روی لینک‌ها `text-decoration: underline` دارد، آن را برای این لینک بردارید تا دو خط دیده نشود (Bootstrap: `text-decoration-none`)."],
         reduced="بدون تغییر؛ فقط transition کوتاه hover است."),
    dict(slug="shape", title="Floating Shapes", source="شکل‌های شناور labs.google (`gl-float-*`)",
         what="شکل‌های تزئینی (شش‌ضلعی، دایره، مربع گرد، شبدری، کپسول) با حرکت شناور و پارالاکس عمقی در اسکرول.",
         tokens=["--sl-color-shape-1", "--sl-color-shape-2", "--sl-color-shape-3", "--sl-color-shape-4", "--sl-color-shape-5"],
         options=[("data-sl-shapes", "—", "روی ظرف؛ شکل‌های مستقیم آن absolute و شناور می‌شوند"), ("data-sl-shape", "—", "`circle` / `square` / `hexagon` / `clover` / `pill`"), ("data-sl-shape-color", "`1`", "۱ تا ۵ از پالت `--sl-color-shape-*`"), ("data-sl-depth", "`0`", "پارالاکس اسکرول؛ مثبت = سریع‌تر بالا می‌رود، منفی = برعکس"), ("data-sl-float", "روشن", "`drift` = بدون چرخش، `off` = بدون حرکت")],
         cssvars=[("--sl-x", "`0`", "فاصله از لبهٔ شروع (در RTL از راست)"), ("--sl-y", "`0`", "فاصله از بالا"), ("--sl-size", "`8rem`", "اندازه"), ("--sl-rotate", "`0deg`", "زاویهٔ پایه")],
         html='<header class="position-relative overflow-hidden py-5 text-center" data-sl-shapes>\n  <i data-sl-shape="hexagon" data-sl-shape-color="1" data-sl-depth="0.5"\n     style="--sl-x: 6%; --sl-y: 10%; --sl-size: 18rem"></i>\n  <i data-sl-shape="circle" data-sl-shape-color="2"\n     style="--sl-x: 70%; --sl-y: 55%; --sl-size: 10rem"></i>\n  <h1 class="display-2">آزمایش‌های تازه</h1>\n</header>',
         jsx='<header className="relative overflow-hidden py-24 text-center" data-sl-shapes>\n  <i data-sl-shape="clover" data-sl-shape-color="3" data-sl-depth="1.2"\n     style={{ "--sl-x": "80%", "--sl-y": "8%", "--sl-size": "6rem" } as React.CSSProperties} />\n  <h1 className="text-6xl font-semibold">…</h1>\n</header>',
         notes=["پالت را با سیستم دیزاین هماهنگ کنید: `--sl-color-shape-1: var(--chart-1)` در shadcn یا `var(--bs-success)` در Bootstrap.", "شکل‌ها `z-index: -1` دارند؛ ظرف `isolation: isolate` می‌گیرد تا زیر پس‌زمینهٔ بخش‌های دیگر نروند.", "بیرون از `data-sl-shapes` شکل استاتیک است و می‌توان آن را در [Pile](pile.md) یا هر چیدمانی گذاشت."],
         reduced="شکل‌ها ثابت می‌مانند."),
    dict(slug="shape-text", title="Shape-tinted Text", source="تیتر «Be the first to experiment» در labs.google",
         what="هر جای تیتر که یک شکل از پشتش رد شود، حروف همان‌جا رنگ عوض می‌کنند.",
         tokens=[], options=[("data-sl-shape-text", "—", "روی تیتری داخل همان ظرف `data-sl-shapes`"), ("data-sl-tint", "—", "روی شکل؛ رنگ حروف هنگام هم‌پوشانی")],
         html='<header class="position-relative py-5 text-center" data-sl-shapes>\n  <i data-sl-shape="hexagon" data-sl-shape-color="1" data-sl-tint="#c2187a"\n     data-sl-float="drift" style="--sl-x: 8%; --sl-y: 5%; --sl-size: 22rem"></i>\n  <h1 class="display-2" data-sl-shape-text>اولین کسی باشید که امتحان می‌کند</h1>\n</header>',
         jsx='<h1 className="text-7xl font-semibold" data-sl-rise data-sl-shape-text>…</h1>',
         notes=["پیش‌نیاز: [Floating Shapes](shape.md). برای شکل‌هایی که روی متن می‌آیند `data-sl-float=\"drift\"` بدهید؛ برش شش‌ضلعی با شکل چرخیده هم‌خوان نیست.", "به‌ازای هر شکل `data-sl-tint` یک کپی از متن ساخته می‌شود؛ بیش از ۲–۳ شکل رنگی برای یک تیتر نگذارید.", "با [Word Rise](rise.md) ترکیب می‌شود؛ ترتیب ثبت اکستنشن‌ها این را تضمین می‌کند."],
         reduced="کار می‌کند ولی شکل‌ها حرکت نمی‌کنند، پس رنگ حروف ثابت است."),
    dict(slug="pile", title="Physics Pile", source="برچسب‌های دسته‌بندی و تودهٔ شکل‌های footer در labs.google",
         what="فرزندان با گرانش می‌افتند، کمی برمی‌جهند و روی زاویهٔ خودشان (`--sl-rotate`) آرام می‌گیرند.",
         tokens=[], options=[("data-sl-pile", "—", "روی ظرف"), ("data-sl-pile-stagger", "`90` (ms)", "فاصلهٔ افتادن هر فرزند"), ("data-sl-pile-bounce", "`0.38`", "میزان برگشت (۰ تا ۱)")],
         cssvars=[("--sl-rotate", "`0deg`", "زاویهٔ نهایی هر فرزند")],
         html='<div class="d-flex flex-wrap gap-2 justify-content-center border-bottom pb-1" data-sl-pile>\n  <button class="btn btn-light rounded-pill btn-lg" style="--sl-rotate:-6deg">همه</button>\n  <button class="btn btn-light rounded-pill btn-lg" style="--sl-rotate:8deg">ساختن</button>\n  <button class="btn btn-light rounded-pill btn-lg" style="--sl-rotate:-12deg">کاوش</button>\n</div>',
         jsx='<div className="flex flex-wrap-reverse justify-center gap-2 border-b" data-sl-pile>\n  {tags.map(([label, angle]) => (\n    <Badge key={label} style={{ "--sl-rotate": angle } as React.CSSProperties}>{label}</Badge>\n  ))}\n</div>',
         notes=["`flex-wrap: wrap-reverse` حس «روی هم افتادن» را بهتر می‌دهد.", "اکستنشن `translate` و `rotate` را می‌نویسد، نه `transform`؛ استایل transform خود دکمه‌ها (مثل Bootstrap) دست نمی‌خورد."],
         reduced="فرزندان بی‌درنگ در جای نهایی نمایش داده می‌شوند."),
    dict(slug="fan", title="Fanned Cards", source="کارت‌های کج‌شدهٔ labs.google",
         what="کارت‌ها اول روی هم در وسط جمع‌اند و با اسکرول روی یک قوس باز می‌شوند؛ hover کارت را بالا می‌آورد.",
         tokens=["--sl-duration-hover", "--sl-ease-out"], options=[("data-sl-fan", "—", "روی ظرف ردیف کارت‌ها")],
         cssvars=[("--sl-fan-angle", "`6deg`", "زاویهٔ هر کارت در حالت باز"), ("--sl-fan-lift", "`1.25rem`", "پایین‌آمدن کارت‌های کناری روی قوس"), ("--sl-fan-gap", "`1rem`", "فاصلهٔ کارت‌ها")],
         html='<div class="py-5" data-sl-fan style="--sl-fan-angle: 7deg">\n  <article class="card shadow" style="width: 16rem"><div class="card-body">…</div></article>\n  <article class="card shadow" style="width: 16rem"><div class="card-body">…</div></article>\n  <article class="card shadow" style="width: 16rem"><div class="card-body">…</div></article>\n</div>',
         jsx='<div data-sl-fan className="[--sl-fan-angle:7deg]">\n  {items.map((item) => (\n    <Card key={item.id} className="w-64 shrink">\n      <div data-sl-tilt>{/* محتوا */}</div>\n    </Card>\n  ))}\n</div>',
         notes=["transform کارت‌ها را اکستنشن می‌نویسد؛ افکت hover سیستم دیزاین (مثلاً `transform: translateY`) را روی یک عنصر داخلی بگذارید.", "[Tilt](tilt.md) را روی عنصر داخلی کارت بگذارید، نه خود کارت.", "در موبایل کارت‌ها را `flex: 0 1 16rem; min-width: 0` بدهید تا در یک ردیف جا شوند."],
         reduced="کارت‌ها از ابتدا در حالت باز هستند."),
    dict(slug="flow", title="Source Flow", source="بخش «How it works» در NotebookLM",
         what="منبع‌ها با منحنی‌هایی که کشیده می‌شوند به یک مرکز وصل می‌شوند و نقطه‌هایی روی خطوط جریان دارند؛ مرکز پالس می‌زند.",
         tokens=["--sl-color-accent", "--sl-duration-enter", "--sl-ease-in-out", "--sl-ease-out"],
         options=[("data-sl-flow", "—", "روی ظرف"), ("data-sl-flow-source", "—", "روی هر منبع (هر تعداد)"), ("data-sl-flow-hub", "—", "روی یک مرکز")],
         html='<div class="d-grid gap-5 align-items-center" style="grid-template-columns: 1fr auto" data-sl-flow>\n  <div class="d-grid gap-3">\n    <div class="card card-body" data-sl-flow-source>گزارش PDF</div>\n    <div class="card card-body" data-sl-flow-source>ویدیو</div>\n  </div>\n  <div class="badge rounded-pill text-bg-primary p-3" data-sl-flow-hub>پاسخ مستند</div>\n</div>',
         jsx='<div className="grid grid-cols-[1fr_auto] items-center gap-24" data-sl-flow>\n  <div className="grid gap-4">{sources.map((s) => <Card key={s} data-sl-flow-source>{s}</Card>)}</div>\n  <div className="rounded-full bg-primary px-5 py-3 text-primary-foreground" data-sl-flow-hub>پاسخ مستند</div>\n</div>',
         notes=["چیدمان کاملاً دست سایت است؛ منحنی‌ها از جای واقعی جعبه‌ها اندازه‌گیری و با تغییر اندازه دوباره کشیده می‌شوند.", "پالس مرکز `box-shadow` است؛ اگر سیستم دیزاین روی آن عنصر سایه دارد، سایه را روی wrapper بگذارید."],
         reduced="خطوط کامل و بدون نقطهٔ متحرک نمایش داده می‌شوند."),
    dict(slug="shine", title="Text Shine", source="textShine روی کلمهٔ تأکیدی NotebookLM",
         what="فقط CSS: یک برق گرادیانی آهسته از روی متن رد می‌شود.",
         tokens=["--sl-color-accent", "--sl-color-shape-2", "--sl-color-shape-4", "--sl-ease-in-out"], options=[("data-sl-shine", "—", "روی span کلمهٔ تأکیدی")],
         html='<h1 class="display-3">هر چیزی را <span data-sl-shine>بفهمید</span></h1>',
         jsx='<h1 className="text-6xl">هر چیزی را <span data-sl-shine>بفهمید</span></h1>',
         notes=["متن شفاف می‌شود و رنگ از گرادیان می‌آید؛ برای کنتراست، `--sl-color-accent` باید روی پس‌زمینه خوانا باشد."],
         reduced="متن با رنگ ثابت گرادیان و بدون حرکت نمایش داده می‌شود."),
    dict(slug="carousel", title="Progress Carousel", source="Hero تمام‌عرض labs.google",
         what="اسلایدر خودکار با دکمهٔ قبل/بعد و نوار پیشرفت. زمان‌بندی با انیمیشن CSS است، پس روی hover و focus و وقتی از دید خارج شود خودبه‌خود می‌ایستد.",
         tokens=["--sl-color-surface-inverse", "--sl-color-text-inverse", "--sl-duration-hover", "--sl-ease-out"],
         options=[("data-sl-carousel", "—", "روی ظرف؛ هر فرزند یک اسلاید"), ("data-sl-carousel-interval", "`5500` (ms)", "مدت هر اسلاید"), ("data-sl-carousel-previous", "`Previous slide`", "برچسب دسترسی دکمهٔ قبل"), ("data-sl-carousel-next", "`Next slide`", "برچسب دسترسی دکمهٔ بعد")],
         html='<div class="rounded-5 overflow-hidden" style="min-height: 70vh" data-sl-carousel\n     data-sl-carousel-previous="اسلاید قبلی" data-sl-carousel-next="اسلاید بعدی" aria-label="آزمایش‌های شاخص">\n  <article class="d-flex align-items-center justify-content-center text-bg-primary">…</article>\n  <article class="d-flex align-items-center justify-content-center text-bg-dark">…</article>\n</div>',
         jsx='<div data-sl-carousel aria-label="ویژه‌ها" className="min-h-[70vh] rounded-3xl">\n  {slides.map((slide) => <article key={slide.id} className="grid place-items-center">…</article>)}\n</div>',
         notes=["دکمه‌ها را خود اکستنشن می‌سازد. اگر reset سیستم دیزاین (Tailwind preflight، Bootstrap reboot) استایل آن‌ها را پاک کرد، ترتیب لایه‌ها را درست کنید ([راهنمای نصب](../setup/install.md)).", "برای انیمیشن محتوای اسلاید فعال از selector `[data-sl-carousel-slide=\"active\"]` استفاده کنید.", "اسلایدهای غیرفعال `inert` و `aria-hidden` می‌گیرند."],
         reduced="پخش خودکار خاموش است؛ دکمه‌ها کار می‌کنند."),
    dict(slug="magnetic", title="Magnetic", source="CTAهای footer در labs.google",
         what="دکمه به سمت نشانگر کشیده می‌شود و با فنر برمی‌گردد. فقط روی موس/ترک‌پد (pointer: fine).",
         tokens=[], options=[("data-sl-magnetic", "`0.3`", "شدت (۰ تا ۱)"), ("data-sl-magnetic-inner", "—", "روی یک فرزند؛ کمی بیشتر حرکت می‌کند و عمق می‌دهد")],
         html='<a class="btn btn-dark btn-lg rounded-pill" href="#" data-sl-magnetic="0.35">\n  <span data-sl-magnetic-inner>شروع کنید</span>\n</a>',
         jsx='<Button asChild size="lg" className="rounded-full">\n  <a href="/start" data-sl-magnetic="0.35"><span data-sl-magnetic-inner>شروع کنید</span></a>\n</Button>',
         notes=["از ویژگی `translate` استفاده می‌کند؛ با `transform` یا `:active { scale }` دکمه‌های سیستم دیزاین تداخل ندارد."],
         reduced="غیرفعال است."),
    dict(slug="tilt", title="3D Tilt + Glare", source="hover کارت‌های پریمیوم",
         what="کارت به سمت نشانگر کج می‌شود و یک برق نور دنبال موس می‌آید.",
         tokens=["--sl-duration-hover", "--sl-ease-out"], options=[("data-sl-tilt", "`8`", "حداکثر زاویه به درجه")],
         html='<div class="card shadow-sm" data-sl-tilt="7">\n  <div class="card-body">…</div>\n</div>',
         jsx='<Card data-sl-tilt="6" className="overflow-hidden">…</Card>',
         notes=["`transform` و `::after` عنصر را می‌گیرد؛ اگر کامپوننت سیستم دیزاین از `::after` استفاده می‌کند، tilt را روی wrapper بگذارید.", "داخل [Fan](fan.md) روی عنصر درونی کارت بگذارید."],
         reduced="غیرفعال است."),
]

# ---------------------------------------------------------------- react components
MP = "Motion Primitives (Julien Thibeaut، MIT) — در 21st.dev با نام `@ibelick`"
MU = "Magic UI (MIT) — در 21st.dev با نام `@magicui`"
REACT = [
    dict(slug="text-effect", title="Text Effect", lib=MP, deps=[],
         what="متن را حرف‌به‌حرف، کلمه‌به‌کلمه یا خط‌به‌خط با یکی از presetها وارد می‌کند.",
         props=[("children", "string", "—", "متن"), ("per", "`'char' \\| 'word' \\| 'line'`", "`'word'`", "واحد تقسیم"), ("preset", "`'blur' \\| 'fade-in-blur' \\| 'scale' \\| 'fade' \\| 'slide'`", "`'fade'`", "نوع ورود"), ("as", "تگ HTML", "`'p'`", "تگ خروجی"), ("delay", "number (s)", "`0`", "تأخیر شروع"), ("speedReveal / speedSegment", "number", "`1`", "سرعت پشت‌سرهم‌آمدن / سرعت هر تکه"), ("trigger", "boolean", "`true`", "نمایش یا خروج"), ("variants", "Variants", "—", "انیمیشن دلخواه")],
         example='<TextEffect as="h2" per="word" preset="fade-in-blur" className="text-4xl font-bold">\n  روشن‌شدن کلمه‌به‌کلمه\n</TextEffect>',
         notes=["برای متن فارسی `per=\"char\"` استفاده نکنید؛ حروف از هم جدا می‌شوند و اتصالشان از بین می‌رود. `word` یا `line` بدهید.", "در متن فارسی‌ای که کلمهٔ لاتین دارد، `per=\"word\"` ترتیب کلمه‌ها را به‌هم می‌ریزد؛ `per=\"line\"` بدهید.", "این کامپوننت به‌محض mount اجرا می‌شود. برای شروع هنگام ورود به صفحه از [Text Effect In View](text-effect-in-view.md) استفاده کنید."]),
    dict(slug="text-effect-in-view", title="Text Effect In View", lib="کمکی همین پروژه (روی Text Effect)", deps=["text-effect"],
         what="همان Text Effect، ولی وقتی به صفحه می‌رسد شروع می‌شود؛ تا آن موقع یک کپی نامرئی جا را نگه می‌دارد تا صفحه نپرد.",
         props=[("…TextEffectProps", "", "", "همهٔ propهای Text Effect"), ("dir", "`'ltr' \\| 'rtl'`", "—", "برای تیتر لاتین در صفحهٔ RTL")],
         example='<TextEffectInView as="h2" per="char" preset="fade-in-blur" dir="ltr" className="text-8xl font-bold">\n  Reusable Motion\n</TextEffectInView>', notes=[]),
    dict(slug="text-shimmer", title="Text Shimmer", lib=MP, deps=[],
         what="یک برق نور به‌طور پیوسته از روی متن رد می‌شود.",
         props=[("children", "string", "—", "متن"), ("as", "ElementType", "`'p'`", "تگ"), ("duration", "number (s)", "`2`", "مدت یک دور"), ("spread", "number", "`2`", "پهنای برق")],
         example='<TextShimmer as="p" duration={2.4} className="font-mono text-sm [--base-color:var(--muted-foreground)] [--base-gradient-color:var(--primary)]">\n  در حال آماده‌سازی…\n</TextShimmer>',
         notes=["رنگ پایه و رنگ برق از متغیرهای `--base-color` و `--base-gradient-color` می‌آیند؛ آن‌ها را به رنگ‌های سیستم دیزاین بدهید."]),
    dict(slug="text-roll", title="Text Roll", lib=MP, deps=[],
         what="حروف یکی‌یکی به بالا می‌چرخند و نسخهٔ جدید از پایین می‌آید؛ مناسب hover دکمه.",
         props=[("children", "string", "—", "متن"), ("duration", "number (s)", "`0.5`", "مدت هر حرف"), ("getEnterDelay / getExitDelay", "(i) => number", "`i*0.1` / `i*0.1+0.2`", "تأخیر هر حرف"), ("transition / variants", "", "—", "تنظیم حرکت")],
         example='const [round, setRound] = useState(0);\n<Button onMouseEnter={() => setRound((r) => r + 1)}>\n  <TextRoll key={round} duration={0.35} getEnterDelay={(i) => i * 0.03}>Start a project</TextRoll>\n</Button>',
         notes=["هر بار که `key` عوض شود دوباره اجرا می‌شود؛ الگوی بالا آن را به hover وصل می‌کند.", "حرف‌به‌حرف است؛ برای متن لاتین استفاده کنید."]),
    dict(slug="text-scramble", title="Text Scramble", lib=MP, deps=[],
         what="حروف تصادفی می‌چرخند تا متن نهایی شکل بگیرد.",
         props=[("children", "string", "—", "متن"), ("duration", "number (s)", "`0.8`", "مدت"), ("speed", "number (s)", "`0.04`", "فاصلهٔ هر تغییر"), ("characterSet", "string", "حروف و ارقام لاتین", "حروف تصادفی"), ("trigger", "boolean", "`true`", "اجرا"), ("onScrambleComplete", "() => void", "—", "پایان")],
         example='const [run, setRun] = useState(false);\n<a onMouseEnter={() => setRun(true)}>\n  <TextScramble as="span" trigger={run} onScrambleComplete={() => setRun(false)}>VIEW WORK</TextScramble>\n</a>',
         notes=["برای متن فارسی `characterSet` را با حروف فارسی بدهید، ولی حروف جداشده از هم شکل نمی‌گیرند؛ بیشتر برای لاتین مناسب است."]),
    dict(slug="animated-group", title="Animated Group", lib=MP, deps=[],
         what="فرزندان را پشت سر هم با یک preset وارد می‌کند.",
         props=[("children", "ReactNode", "—", "فرزندان"), ("preset", "`fade \\| slide \\| scale \\| blur \\| blur-slide \\| zoom \\| flip \\| bounce \\| rotate \\| swing`", "—", "نوع ورود"), ("variants", "{ container, item }", "—", "انیمیشن دلخواه"), ("as / asChild", "ElementType", "`'div'`", "تگ ظرف / تگ فرزندان")],
         example='<AnimatedGroup preset="blur-slide" className="grid gap-4 md:grid-cols-3">\n  {features.map((f) => <Card key={f.id}>…</Card>)}\n</AnimatedGroup>',
         notes=["به‌محض mount اجرا می‌شود؛ برای شروع هنگام ورود آن را داخل [In View](in-view.md) بگذارید یا با `useInView` شرطی رندر کنید."]),
    dict(slug="animated-background", title="Animated Background", lib=MP, deps=[],
         what="یک لایهٔ پس‌زمینهٔ مشترک با layout animation بین گزینه‌ها می‌لغزد؛ برای tabها، منو، فهرست.",
         props=[("children", "ReactElement با `data-id`", "—", "گزینه‌ها"), ("enableHover", "boolean", "`false`", "دنبال‌کردن hover به‌جای کلیک"), ("defaultValue", "string", "—", "گزینهٔ فعال اولیه"), ("onValueChange", "(id) => void", "—", "تغییر"), ("className", "string", "—", "استایل لایهٔ متحرک"), ("transition", "Transition", "—", "حرکت")],
         example='<AnimatedBackground enableHover className="rounded-md bg-primary" transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}>\n  {items.map((item) => (\n    <button key={item} data-id={item} className="px-3 py-2 data-[checked=true]:text-primary-foreground">{item}</button>\n  ))}\n</AnimatedBackground>',
         notes=["گزینهٔ فعال `data-checked=\"true\"` می‌گیرد؛ رنگ متن را با آن عوض کنید.", "محتوای هر گزینه داخل یک `div.z-10` قرار می‌گیرد که position ندارد؛ برای اینکه متن روی لایهٔ متحرک بماند بدهید: `[data-checked] > .z-10 { position: relative }`.", "خود گزینه `inline-flex` می‌شود؛ اگر grid لازم دارید، grid را روی همان `div.z-10` بدهید."]),
    dict(slug="animated-number", title="Animated Number", lib=MP, deps=[],
         what="هر تغییر مقدار را با فنر دنبال می‌کند؛ برای عدد زنده.",
         props=[("value", "number", "—", "مقدار"), ("springOptions", "SpringOptions", "—", "تنظیم فنر"), ("as", "ElementType", "`'span'`", "تگ")],
         example='<AnimatedNumber value={visitors} springOptions={{ bounce: 0, duration: 1400 }} className="text-5xl font-bold tabular-nums" />', notes=["قالب‌بندی عدد `toLocaleString()` پیش‌فرض مرورگر است."]),
    dict(slug="number-ticker", title="Number Ticker", lib=MU + " — با prop اضافهٔ `locale`", deps=[],
         what="هنگام ورود به صفحه از عدد شروع تا مقدار هدف با فنر می‌شمارد.",
         props=[("value", "number", "—", "مقدار نهایی"), ("startValue", "number", "`0`", "شروع"), ("direction", "`'up' \\| 'down'`", "`'up'`", "جهت"), ("delay", "number (s)", "`0`", "تأخیر"), ("decimalPlaces", "number", "`0`", "اعشار"), ("locale", "string", "`'en-US'`", "قالب عدد؛ `fa-IR` برای ارقام فارسی")],
         example='<NumberTicker value={98} locale="fa-IR" className="text-5xl font-bold text-foreground" />',
         notes=["کلاس پیش‌فرض `text-black dark:text-white` دارد؛ رنگ سیستم دیزاین را با className بدهید."]),
    dict(slug="infinite-slider", title="Infinite Slider", lib=MP, deps=["react-use-measure"],
         what="ردیف بی‌پایان با framer-motion؛ سرعت روی hover کم می‌شود. افقی یا عمودی.",
         props=[("children", "ReactNode", "—", "آیتم‌ها"), ("gap", "number (px)", "`16`", "فاصله"), ("speed", "number (px/s)", "`100`", "سرعت"), ("speedOnHover", "number", "—", "سرعت روی hover"), ("direction", "`'horizontal' \\| 'vertical'`", "`'horizontal'`", "جهت"), ("reverse", "boolean", "`false`", "برعکس")],
         example='<div className="relative overflow-hidden" dir="ltr">\n  <InfiniteSlider gap={48} speed={60} speedOnHover={18}>\n    {logos.map((logo) => <img key={logo.alt} src={logo.src} alt={logo.alt} className="h-8" />)}\n  </InfiniteSlider>\n  <ProgressiveBlur direction="left" className="absolute inset-y-0 left-0 w-24" />\n</div>',
         notes=["در صفحهٔ RTL ظرف را `dir=\"ltr\"` بدهید.", "عرض ذاتی ردیف خیلی بزرگ است؛ داخل grid به ستون `minmax(0, 1fr)` و `overflow: hidden` بدهید، وگرنه ستون‌ها کش می‌آیند."]),
    dict(slug="progressive-blur", title="Progressive Blur", lib=MP, deps=[],
         what="blur لایه‌لایه که به‌تدریج بیشتر می‌شود؛ برای لبه‌های اسلایدر یا پایین hero.",
         props=[("direction", "`top \\| right \\| bottom \\| left`", "`'bottom'`", "جهت افزایش"), ("blurLayers", "number", "`8`", "تعداد لایه"), ("blurIntensity", "number", "`0.25`", "شدت هر لایه")],
         example='<ProgressiveBlur direction="bottom" blurIntensity={0.6} className="pointer-events-none absolute inset-x-0 bottom-0 h-32" />',
         notes=["از `backdrop-filter` استفاده می‌کند؛ پشتش باید محتوا باشد تا اثر دیده شود."]),
    dict(slug="border-trail", title="Border Trail", lib=MP, deps=[],
         what="یک نور کوچک دور لبهٔ یک قاب می‌چرخد.",
         props=[("size", "number (px)", "`60`", "اندازهٔ نور"), ("className", "string", "—", "رنگ نور (background)"), ("transition", "Transition", "۵ ثانیه، بی‌پایان", "حرکت")],
         example='<button className="relative overflow-hidden rounded-full border px-6 py-3">\n  <BorderTrail size={70} className="bg-gradient-to-l from-primary to-accent" />\n  شروع\n</button>',
         notes=["والد باید `position: relative` و `border-radius` داشته باشد."]),
    dict(slug="border-beam", title="Border Beam", lib=MU, deps=[],
         what="پرتوی رنگی به‌طور پیوسته دور لبهٔ کارت حرکت می‌کند.",
         props=[("size", "number", "`50`", "طول پرتو"), ("duration", "number (s)", "`6`", "مدت دور"), ("colorFrom / colorTo", "string", "نارنجی → بنفش", "رنگ‌ها"), ("borderWidth", "number", "`1`", "ضخامت"), ("reverse", "boolean", "`false`", "برعکس"), ("delay / initialOffset", "number", "`0`", "شروع")],
         example='<Card className="relative overflow-hidden">\n  …\n  <BorderBeam size={120} duration={6} colorFrom="var(--primary)" colorTo="var(--accent)" />\n</Card>', notes=["کارت باید `relative` و `overflow-hidden` باشد."]),
    dict(slug="spotlight", title="Spotlight", lib=MP, deps=[],
         what="یک هالهٔ نور با فنر دنبال نشانگر روی والدش می‌آید.",
         props=[("size", "number (px)", "`200`", "قطر"), ("className", "string", "—", "رنگ هاله"), ("springOptions", "SpringOptions", "`{ bounce: 0 }`", "فنر")],
         example='<section className="relative overflow-hidden">\n  <Spotlight size={360} className="bg-[radial-gradient(circle,var(--primary)_0%,transparent_70%)] blur-xl" />\n  …\n</section>',
         notes=["به والد `position: relative` و `overflow: hidden` می‌دهد."]),
    dict(slug="magic-card", title="Magic Card", lib=MU, deps=["next-themes"],
         what="لبه و سطح کارت با یک گرادیان که دنبال موس می‌آید روشن می‌شوند. حالت `orb` یک گوی نور شناور دارد.",
         props=[("gradientSize", "number", "`200`", "قطر نور"), ("gradientFrom / gradientTo", "string", "بنفش → صورتی", "رنگ لبه"), ("gradientColor / gradientOpacity", "string / number", "—", "رنگ سطح (حالت gradient)"), ("mode", "`'gradient' \\| 'orb'`", "`'gradient'`", "حالت"), ("glowFrom / glowTo / glowSize / glowBlur", "", "—", "تنظیم گوی (حالت orb)")],
         example='<MagicCard className="rounded-xl" gradientFrom="var(--primary)" gradientTo="var(--accent)" gradientColor="color-mix(in srgb, var(--primary) 12%, transparent)">\n  <div className="p-6">…</div>\n</MagicCard>',
         notes=["از توکن‌های Tailwind `--color-background` و `--color-border` و کلاس `bg-background` استفاده می‌کند؛ در shadcn وجود دارند. در سیستم‌های دیگر روی همان کارت تعریفشان کنید.", "برای تشخیص تم تیره به `next-themes` نیاز دارد (فقط در حالت orb)."]),
    dict(slug="highlighter", title="Highlighter", lib=MU, deps=["rough-notation"],
         what="هایلایت، خط زیر، دایره، کادر، خط‌خوردگی و براکت دست‌کشیده که هنگام ورود به صفحه کشیده می‌شوند.",
         props=[("action", "`highlight \\| underline \\| box \\| circle \\| strike-through \\| crossed-off \\| bracket`", "`'highlight'`", "نوع"), ("color", "string", "`#ffd1dc`", "رنگ"), ("strokeWidth", "number", "`1.5`", "ضخامت"), ("animationDuration", "number (ms)", "`600`", "مدت کشیدن"), ("iterations", "number", "`2`", "تعداد دور"), ("padding", "number", "`2`", "فاصله"), ("multiline", "boolean", "`true`", "چندخطی"), ("isView", "boolean", "`false`", "فقط هنگام ورود به صفحه")],
         example='<p className="text-3xl font-bold leading-loose">\n  طراحی که <Highlighter action="highlight" color="var(--accent)" isView>منتشر می‌شود</Highlighter>\n</p>',
         notes=["رنگ به SVG داده می‌شود؛ `var(--…)` کار می‌کند چون در DOM resolve می‌شود.", "خط‌ها با `position: absolute` روی صفحه کشیده می‌شوند؛ اگر چیدمان بعداً جابه‌جا شود (مثلاً با باز شدن آکاردئون)، کامپوننت را دوباره mount کنید."]),
    dict(slug="animated-beam", title="Animated Beam", lib=MU, deps=[],
         what="پرتوی متحرک بین دو عنصر روی یک منحنی؛ برای نمودار اتصال و یکپارچه‌سازی.",
         props=[("containerRef / fromRef / toRef", "RefObject", "—", "ظرف و دو سر"), ("curvature", "number", "`0`", "انحنا"), ("reverse", "boolean", "`false`", "جهت"), ("pathColor / pathWidth / pathOpacity", "", "خاکستری / 2 / 0.2", "خط پایه"), ("gradientStartColor / gradientStopColor", "string", "`#ffaa40` / `#9c40ff`", "رنگ پرتو"), ("duration / delay / repeat", "number", "`5` / `0` / بی‌پایان", "زمان‌بندی (ثانیه)")],
         example='const box = useRef(null), a = useRef(null), b = useRef(null);\n<div ref={box} className="relative flex justify-between">\n  <div ref={a} className="z-10 size-12 rounded-full bg-card" />\n  <div ref={b} className="z-10 size-16 rounded-full bg-primary" />\n  <AnimatedBeam containerRef={box} fromRef={a} toRef={b} gradientStartColor="var(--primary)" gradientStopColor="var(--accent)" />\n</div>',
         notes=["گره‌ها باید `z-index` بالاتر از SVG داشته باشند.", "در RTL ظرف را `dir=\"ltr\"` بدهید یا جهت را با `reverse` تنظیم کنید."]),
    dict(slug="scroll-based-velocity", title="Scroll Velocity", lib=MU, deps=[],
         what="ردیف‌های متن بزرگ که سرعت و جهتشان از سرعت اسکرول می‌آید.",
         props=[("ScrollVelocityContainer", "ظرف", "", "سرعت اسکرول را بین ردیف‌ها به اشتراک می‌گذارد"), ("ScrollVelocityRow › baseVelocity", "number", "`5`", "سرعت پایه"), ("› direction", "`1 \\| -1`", "`1`", "جهت"), ("› scrollReactivity", "boolean", "`true`", "واکنش به اسکرول")],
         example='<ScrollVelocityContainer className="overflow-hidden text-7xl font-extrabold" dir="ltr">\n  <ScrollVelocityRow baseVelocity={3}>MOTION WITH A REASON ✦ </ScrollVelocityRow>\n  <ScrollVelocityRow baseVelocity={3} direction={-1}>FEEL IT ✦ </ScrollVelocityRow>\n</ScrollVelocityContainer>',
         notes=["سرعت از `window.scrollY` خوانده می‌شود و با اسکرول نرم هم درست کار می‌کند.", "مثل Infinite Slider، داخل grid به ستون `minmax(0, 1fr)` بدهید."]),
    dict(slug="in-view", title="In View", lib=MP, deps=[],
         what="فرزندان را هنگام ورود به صفحه با variants دلخواه نمایش می‌دهد.",
         props=[("variants", "{ hidden, visible }", "محوشدن", "انیمیشن"), ("transition", "Transition", "—", "حرکت"), ("viewOptions", "UseInViewOptions", "—", "مثلاً `{ margin: '0px 0px -20% 0px' }`"), ("once", "boolean", "`false`", "فقط یک بار"), ("as", "ElementType", "`'div'`", "تگ")],
         example='<InView once viewOptions={{ margin: "0px 0px -20% 0px" }}\n  variants={{ hidden: { opacity: 0, y: 24, filter: "blur(6px)" }, visible: { opacity: 1, y: 0, filter: "blur(0px)" } }}>\n  <AnimatedGroup preset="blur-slide">…</AnimatedGroup>\n</InView>', notes=[]),
]

# ---------------------------------------------------------------- writers
def write(path, text):
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(text.rstrip() + "\n", encoding="utf-8")

def ext_page(e):
    vars_md = ""
    if e.get("cssvars"):
        vars_md = "\n### متغیرهای CSS مخصوص این افکت\n\n| متغیر | پیش‌فرض | توضیح |\n|---|---|---|\n" + "\n".join(f"| `{v}` | {d} | {t} |" for v, d, t in e["cssvars"]) + "\n"
    notes = "\n".join(f"- {n}" for n in e["notes"])
    return f"""# {e['title']}

> بخشی از [Smooth Lab Extensions](../README.md) · الگوی مرجع: {e['source']} · فایل‌ها: `extensions/effects/{e['slug']}.ts` و `.css`

{e['what']}

## پیش‌نیاز

بستهٔ اکستنشن‌ها یک بار در سایت بارگذاری شده باشد ([راهنمای نصب](../setup/install.md)). برای استفادهٔ تکی به‌جای کل بسته، [بخش «فقط همین افکت»](#فقط-همین-افکت) را ببینید.

## نشانه‌گذاری

### HTML (مثال با کلاس‌های Bootstrap)

```html
{e['html']}
```

### React + Tailwind / shadcn

```tsx
{e['jsx']}
```

در React، زیردرخت را با هوک `useSmoothLab()` فعال کنید (بخش «React» در [راهنمای نصب](../setup/install.md)).

## تنظیمات

{options_table(e['options'])}{vars_md}
## اتصال به سیستم دیزاین

{token_table(e['tokens'])}
## فقط همین افکت

```ts
import {{ createSmoothLab, {camel(e['slug'])}{", shape" if e['slug']=="shape-text" else ""} }} from "smooth-lab-extensions";
{single_css(e['slug'])}
createSmoothLab({{ extensions: [{camel(e['slug'])}{", shape" if e['slug']=="shape-text" else ""}] }});
```

## نکته‌ها

{notes}

## کاهش حرکت

{e['reduced']}
"""

def single_css(slug):
    files = ["core/tokens.css"]
    if slug == "shape-text":
        files.append("effects/shape.css")
    if (ROOT / "extensions" / "effects" / f"{slug}.css").exists():
        files.append(f"effects/{slug}.css")
    files.append("core/reduced-motion.css")
    lines = [f'import "smooth-lab-extensions/{f}";' for f in files]
    if not (ROOT / "extensions" / "effects" / f"{slug}.css").exists():
        lines.append("// این افکت فایل CSS جداگانه ندارد؛ همه‌چیز در JavaScript است.")
    return "\n".join(lines)

def camel(slug):
    head, *rest = slug.split("-")
    name = head + "".join(p.title() for p in rest)
    return {"countUp": "countUp", "wordScrub": "wordScrub", "arrowLink": "arrowLink", "shapeText": "shapeText"}.get(name, name)

def react_page(c):
    props = "\n".join(f"| `{p}` | {t} | {d} | {x} |" for p, t, d, x in c["props"])
    deps = " ".join(["framer-motion"] + [d for d in c["deps"] if d not in ("text-effect",)])
    extra = "\n".join(f"- {n}" for n in c["notes"]) or "-"
    copy_extra = " و `text-effect.tsx`" if "text-effect" in c["deps"] else ""
    return f"""# {c['title']}

> بخشی از [کامپوننت‌های React](../README.md) · منبع: {c['lib']} · فایل: `client/src/components/motion/{c['slug']}.tsx`

{c['what']}

## نصب در پروژهٔ دیگر

1. فایل `{c['slug']}.tsx`{copy_extra} را در پوشهٔ کامپوننت‌های پروژه کپی کنید.
2. وابستگی‌ها: `pnpm add {deps}`
3. اگر فایل `cn` را import می‌کند و پروژه آن را ندارد (پروژه‌های غیر shadcn)، این را بسازید:

```ts
// lib/utils.ts
import {{ clsx, type ClassValue }} from "clsx";
import {{ twMerge }} from "tailwind-merge";
export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));
```

۴. یک بار در ریشهٔ برنامه `<MotionConfig reducedMotion="user">` بگذارید تا تنظیم «کاهش حرکت» سیستم رعایت شود.

با کلید API در https://21st.dev/mcp می‌توانید همین کامپوننت را مستقیم هم نصب کنید: `npx shadcn@latest add "https://21st.dev/r/<author>/{c['slug']}?api_key=$API_KEY_21ST"`.

## Propها

| prop | نوع | پیش‌فرض | توضیح |
|---|---|---|---|
{props}

## مثال

```tsx
{c['example']}
```

## اتصال به سیستم دیزاین

- **shadcn / Tailwind:** رنگ‌ها را با کلاس‌های توکنی (`bg-primary`، `text-foreground`، `from-primary`) یا `var(--primary)` بدهید؛ کامپوننت‌ها همین کلاس‌ها را می‌پذیرند.
- **Bootstrap یا CSS اختصاصی (بدون Tailwind):** propهای رنگ را با متغیرهای سیستم بدهید (`var(--bs-primary)`) و کلاس‌های Tailwind داخل فایل را با کلاس‌های خودتان عوض کنید، یا Tailwind را فقط برای این پوشه فعال کنید.
- **MUI:** رنگ‌ها را از `theme.vars.palette` (`var(--mui-palette-primary-main)`) بدهید؛ با `sx` روی wrapper چیدمان را کنترل کنید.

## نکته‌ها

{extra}
"""

def main():
    for e in EXT:
        write(OUT / "extensions" / f"{e['slug']}.md", ext_page(e))
    for c in REACT:
        write(OUT / "react" / f"{c['slug']}.md", react_page(c))
    ext_rows = "\n".join(f"| [{e['title']}](extensions/{e['slug']}.md) | `data-sl-{e['slug'] if e['slug'] not in ('shape',) else 'shapes / data-sl-shape'}` | {e['source']} |" for e in EXT)
    react_rows = "\n".join(f"| [{c['title']}](react/{c['slug']}.md) | {c['lib'].split(' (')[0].split(' —')[0]} | {', '.join(['framer-motion'] + [d for d in c['deps'] if d != 'text-effect'])} |" for c in REACT)
    tables = (f"## اکستنشن‌ها (بدون وابستگی به فریم‌ورک)\n\n| افکت | فعال‌سازی | الگوی مرجع |\n|---|---|---|\n{ext_rows}\n\n## کامپوننت‌های React\n\n| کامپوننت | منبع | وابستگی |\n|---|---|---|\n{react_rows}\n")
    readme = OUT / "README.md"
    text = readme.read_text(encoding="utf-8")
    text = re.sub(r"<!-- tables:start -->.*<!-- tables:end -->", lambda _: "<!-- tables:start -->\n" + tables + "<!-- tables:end -->", text, flags=re.S)
    readme.write_text(text, encoding="utf-8")
    print(f"{len(EXT)} extension pages, {len(REACT)} react pages")

if __name__ == "__main__":
    main()
