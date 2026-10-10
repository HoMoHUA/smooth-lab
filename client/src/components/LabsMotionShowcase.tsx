/* Style reminder: Labs Motion — بازسازی مستقل الگوهای حرکتی زیرمجموعه‌های Google Labs، ساخته‌شده فقط با اکستنشن‌های Smooth Lab. */
import { memo, useState, type CSSProperties } from "react";
import { ArrowUpLeft, AudioLines, FileText, Globe, PlayCircle, Sparkles } from "lucide-react";
import { useSmoothLab } from "@ext/react";
import "@ext/smooth-lab.css";
import "@/styles/labs-motion.css";

type Vars = CSSProperties & Record<`--${string}`, string>;

const experiments = [
  { title: "صدای ایده", body: "یک جمله بگویید و یک قطعهٔ صوتی کامل تحویل بگیرید.", visual: "wave" },
  { title: "زمین بازی", body: "بازی کوچک را توصیف کنید و همان لحظه داخلش بازی کنید.", visual: "iso" },
  { title: "دستیار نوشتن", body: "یادداشت خام را به متنی روشن، دقیق و آمادهٔ انتشار تبدیل کنید.", visual: "chat" },
  { title: "دفترچهٔ زنده", body: "منابع، خلاصه‌ها و پاسخ‌های مستند را کنار هم نگه دارید.", visual: "notes" },
] as const;

const chips: [string, string][] = [
  ["همه", "-6deg"], ["ساختن", "8deg"], ["توسعه", "-14deg"], ["کاوش", "4deg"], ["یادگیری", "-3deg"],
  ["شنیدن", "12deg"], ["دیدن", "-9deg"], ["نوشتن", "6deg"], ["بازی", "-18deg"],
];

const sources = [
  { label: "گزارش PDF", meta: "۴۲ صفحه", icon: FileText },
  { label: "ویدیوی سخنرانی", meta: "۱۸ دقیقه", icon: PlayCircle },
  { label: "فایل صوتی", meta: "مصاحبه", icon: AudioLines },
  { label: "صفحهٔ وب", meta: "۳ پیوند", icon: Globe },
];

const slides = [
  { title: "زمین بازی", body: "دنیای بازی را با چند جمله بسازید، منتشر کنید و با دیگران بازی کنید.", tone: "sky" },
  { title: "صحنه‌ساز", body: "استوری‌بورد خام را به صحنه‌های متحرک و پیوسته تبدیل کنید.", tone: "dusk" },
  { title: "استودیوی صدا", body: "از چند کلمه و یک حس، فضای صوتی کامل بسازید.", tone: "night" },
  { title: "دفترچهٔ پژوهش", body: "منابع را بخوانید، بپرسید و خلاصهٔ شنیداری بگیرید.", tone: "meadow" },
] as const;

const pileShapes: [string, string, string, string][] = [
  // shape, palette index, size, resting angle
  ["hexagon", "1", "11rem", "-6deg"], ["square", "1", "10rem", "4deg"], ["square", "2", "10.5rem", "-3deg"], ["circle", "3", "11.5rem", "0deg"], ["clover", "4", "9rem", "12deg"],
  ["hexagon", "5", "8.5rem", "18deg"], ["circle", "4", "7.5rem", "0deg"], ["pill", "2", "9rem", "-24deg"], ["circle", "3", "8rem", "0deg"],
];

function ExperimentVisual({ kind }: { kind: (typeof experiments)[number]["visual"] }) {
  if (kind === "wave")
    return (
      <div className="lm-visual lm-visual--wave">
        <div className="lm-wave">{Array.from({ length: 18 }, (_, index) => <i key={index} style={{ "--i": String(index) } as Vars} />)}</div>
        <p className="lm-bubble">زمان‌بندی بخش دوم را <b>کمی</b> آرام‌تر کن.</p>
      </div>
    );
  if (kind === "iso")
    return (
      <div className="lm-visual lm-visual--iso">
        <div className="lm-iso">{Array.from({ length: 16 }, (_, index) => <i key={index} style={{ "--h": String([0, 1, 0, 2, 1, 0, 3, 0, 0, 2, 0, 1, 1, 0, 0, 2][index]) } as Vars} />)}</div>
        <span className="lm-iso__ball" />
      </div>
    );
  if (kind === "chat")
    return (
      <div className="lm-visual lm-visual--chat">
        <p className="lm-bubble lm-bubble--muted">جلسه خوب بود ولی خیلی طول کشید و…</p>
        <p className="lm-bubble lm-bubble--accent">جلسه <mark>نتیجه‌بخش</mark> بود؛ دفعهٔ بعد آن را <mark>کوتاه‌تر</mark> برگزار می‌کنیم.<span className="lm-caret" /></p>
      </div>
    );
  return (
    <div className="lm-visual lm-visual--notes">
      <div className="lm-window">
        <div className="lm-window__bar"><i /><i /><i /></div>
        <span /><span /><span className="is-short" />
        <div className="lm-audio"><b /><em>خلاصهٔ شنیداری</em></div>
      </div>
    </div>
  );
}

// Memoised: Home re-renders on every scroll tick, and this subtree never needs to.
export default memo(function LabsMotionShowcase() {
  const ref = useSmoothLab<HTMLElement>();
  const [chip, setChip] = useState("همه");

  return (
    <section ref={ref} className="lm" id="labs-motion" dir="rtl">
      {/* 1 — floating shapes + tinted headline + word rise (labs.google, NotebookLM) */}
      <header className="lm-hero" id="lm-hero" data-sl-shapes>
        <i data-sl-shape="hexagon" data-sl-shape-color="1" data-sl-tint="#c2187a" data-sl-depth="0.5" data-sl-float="drift" style={{ "--sl-x": "6%", "--sl-y": "4%", "--sl-size": "clamp(13rem, 30vw, 26rem)" } as Vars} />
        <i data-sl-shape="circle" data-sl-shape-color="2" data-sl-tint="#1d4fd8" data-sl-depth="0.9" data-sl-float="drift" style={{ "--sl-x": "68%", "--sl-y": "46%", "--sl-size": "clamp(9rem, 19vw, 16rem)" } as Vars} />
        <i data-sl-shape="clover" data-sl-shape-color="3" data-sl-depth="1.4" style={{ "--sl-x": "84%", "--sl-y": "6%", "--sl-size": "clamp(4rem, 8vw, 7rem)" } as Vars} />
        <i data-sl-shape="square" data-sl-shape-color="4" data-sl-depth="-0.6" style={{ "--sl-x": "12%", "--sl-y": "76%", "--sl-size": "clamp(4.5rem, 9vw, 8rem)", "--sl-rotate": "14deg" } as Vars} />
        <i data-sl-shape="pill" data-sl-shape-color="5" data-sl-depth="1.1" style={{ "--sl-x": "44%", "--sl-y": "88%", "--sl-size": "clamp(6rem, 11vw, 10rem)", "--sl-rotate": "-18deg" } as Vars} />
        <p className="lm-kicker" data-sl-reveal>الگوهای حرکتی Labs / بازسازی مستقل</p>
        <h2 className="lm-hero__title" data-sl-rise data-sl-shape-text>ایده‌ها را زودتر از همه امتحان کنید</h2>
        <p className="lm-hero__lead" data-sl-reveal data-sl-reveal-delay="350">شکل‌های شناور، حروفی که با عبور هر شکل رنگ عوض می‌کنند و کلماتی که از زیر خط بالا می‌آیند؛ همه به‌صورت اکستنشن و قابل اتصال به هر سیستم دیزاین.</p>
        <div className="lm-actions" data-sl-reveal data-sl-reveal-delay="500">
          <a className="lm-button" href="#lm-fan" data-sl-magnetic="0.35"><span data-sl-magnetic-inner>شروع کاوش</span></a>
          <a className="lm-button lm-button--ghost" href="#rk-index" data-sl-magnetic="0.35"><span data-sl-magnetic-inner>فهرست الگوها</span></a>
        </div>
      </header>

      {/* 2 — fanned experiment cards with 3D tilt (labs.google "Be the first to experiment") */}
      <section className="lm-fan-section" id="lm-fan">
        <div className="lm-heading">
          <p className="lm-kicker">آزمایش‌های تازه</p>
          <h2 data-sl-rise>هر ایده، یک کارت. با اسکرول باز می‌شوند.</h2>
        </div>
        <div className="lm-fan" data-sl-fan>
          {experiments.map((item) => (
            <article className="lm-card" key={item.title}>
              <div className="lm-card__inner" data-sl-tilt="7">
                <ExperimentVisual kind={item.visual} />
                <h3>{item.title}</h3>
                <p>{item.body}</p>
                <a href="#lm-carousel" data-sl-arrow-link>امتحان کنید <ArrowUpLeft size={15} /></a>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 3 — category chips that fall and settle (labs.google experiment filters) */}
      <section className="lm-chips-section" id="lm-chips">
        <div className="lm-heading lm-heading--start">
          <p className="lm-kicker">دسته‌بندی</p>
          <h2>دنبال چه می‌گردید؟</h2>
          <p>برچسب‌ها با گرانش واقعی می‌افتند، کمی برمی‌گردند و روی زاویهٔ خودشان آرام می‌گیرند.</p>
        </div>
        <div className="lm-chips" data-sl-pile data-sl-pile-stagger="70">
          {chips.map(([label, angle]) => (
            <button key={label} type="button" className="lm-chip" aria-pressed={chip === label} onClick={() => setChip(label)} style={{ "--sl-rotate": angle } as Vars}>{label}</button>
          ))}
        </div>
      </section>

      {/* 4 — sources flowing into a grounded answer (NotebookLM "How it works") */}
      <section className="lm-flow-section" id="lm-flow">
        <div className="lm-heading lm-heading--start">
          <p className="lm-kicker">چطور کار می‌کند</p>
          <h2>هر چیزی را <span data-sl-shine>بفهمید</span></h2>
          <p>منابع خودتان را بیاورید؛ پاسخ‌ها فقط از همان‌ها ساخته می‌شوند و هر جمله به منبعش ارجاع دارد. خطوط با ورود به صفحه کشیده می‌شوند و سیگنال‌ها در طول آن‌ها جریان دارند.</p>
        </div>
        <div className="lm-flow" data-sl-flow>
          <div className="lm-flow__sources">
            {sources.map(({ label, meta, icon: Icon }) => (
              <div className="lm-source" data-sl-flow-source key={label}><Icon size={18} /><span>{label}</span><small>{meta}</small></div>
            ))}
          </div>
          <div className="lm-hub" data-sl-flow-hub><Sparkles size={18} /><span>پاسخ مستند<small>با ارجاع به ۴ منبع</small></span></div>
        </div>
      </section>

      {/* 5 — full-bleed autoplay carousel with progress pills (labs.google hero) */}
      <section className="lm-carousel-section" id="lm-carousel">
        <div className="lm-carousel" data-sl-carousel data-sl-carousel-interval="5500" data-sl-carousel-previous="اسلاید قبلی" data-sl-carousel-next="اسلاید بعدی" aria-label="آزمایش‌های شاخص">
          {slides.map((slide, index) => (
            <article className={`lm-slide lm-slide--${slide.tone}`} key={slide.title} data-sl-shapes>
              <i data-sl-shape={["hexagon", "circle", "clover", "square"][index]} data-sl-shape-color={String(index + 1)} style={{ "--sl-x": "8%", "--sl-y": "18%", "--sl-size": "clamp(8rem, 18vw, 16rem)" } as Vars} />
              <i data-sl-shape={["circle", "pill", "hexagon", "circle"][index]} data-sl-shape-color={String(((index + 2) % 5) + 1)} style={{ "--sl-x": "76%", "--sl-y": "58%", "--sl-size": "clamp(6rem, 13vw, 11rem)", "--sl-rotate": "-20deg" } as Vars} />
              <div className="lm-slide__copy">
                <small>آزمایش ۰{index + 1}</small>
                <h3>{slide.title}</h3>
                <p>{slide.body}</p>
                <a className="lm-button lm-button--light" href="#lm-footer">همین حالا امتحان کنید</a>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 6 — tinted call to action, falling shape pile and giant wordmark (labs.google footer) */}
      <footer className="lm-footer" id="lm-footer">
        <div className="lm-footer__cta" data-sl-shapes>
          <i data-sl-shape="circle" data-sl-shape-color="3" data-sl-tint="#ffffff" data-sl-float="drift" style={{ "--sl-x": "10%", "--sl-y": "-10%", "--sl-size": "clamp(8rem, 16vw, 14rem)" } as Vars} />
          <i data-sl-shape="hexagon" data-sl-shape-color="5" data-sl-tint="#2a1b0f" data-sl-float="drift" style={{ "--sl-x": "72%", "--sl-y": "30%", "--sl-size": "clamp(7rem, 13vw, 11rem)" } as Vars} />
          <h2 data-sl-shape-text>برای دسترسی زودهنگام به آزمایش‌های تازه در جریان بمانید</h2>
          <div className="lm-actions">
            <a className="lm-button lm-button--soft" href="#lm-hero" data-sl-magnetic="0.4"><span data-sl-magnetic-inner>عضویت در خبرنامه</span></a>
            <a className="lm-button lm-button--soft" href="#lm-hero" data-sl-magnetic="0.4"><span data-sl-magnetic-inner>آزمایشگر داوطلب شوید</span></a>
          </div>
        </div>
        <div className="lm-pile" data-sl-pile aria-hidden="true">
          {pileShapes.map(([kind, color, size, angle], index) => (
            <i key={index} data-sl-shape={kind} data-sl-shape-color={color} style={{ "--sl-size": size, "--sl-rotate": angle } as Vars} />
          ))}
        </div>
        <p className="lm-wordmark" dir="ltr" data-sl-rise>NeXTPixel Labs</p>
        <nav className="lm-footer__links" aria-label="الهام‌گرفته از">
          <span>الگوها برگرفته از:</span>
          <a href="https://labs.google/" target="_blank" rel="noreferrer">labs.google</a>
          <a href="https://notebooklm.google/" target="_blank" rel="noreferrer">notebooklm.google</a>
          <a href="https://labs.google/fx" target="_blank" rel="noreferrer">labs.google/fx</a>
        </nav>
      </footer>
    </section>
  );
});
