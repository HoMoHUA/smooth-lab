/* Style reminder: میدان آرام — همهٔ الگوها باید در یک روایت سرمقاله‌ای روشن، فنی و قابل استفاده کنار هم قرار بگیرند. */
import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowUpLeft, ChevronRight, Plus, Sparkles } from "lucide-react";
import { splitCharacters } from "@/lib/premiumEffects";

const wordFade = ["هر", "حرکت", "یک", "نشانه", "است؛", "اگر", "کاربر", "بداند", "چرا", "اتفاق", "می‌افتد."];
const slides = [
  ["روایت پیش از تزئین.", "#d7ff4f", "#171b2a"],
  ["سیستم‌هایی که زنده می‌مانند.", "#315cff", "#ffffff"],
  ["حرکت، بخشی از محتواست.", "#fd9272", "#171b2a"],
];

const formatNumber = (value: number, fractionDigits = 0) => new Intl.NumberFormat("fa-IR", { maximumFractionDigits: fractionDigits, minimumFractionDigits: fractionDigits }).format(value);

type FullEffectsAtlasProps = {
  onNavigate: (id: string) => void;
};

export default function FullEffectsAtlas({ onNavigate }: FullEffectsAtlasProps) {
  const atlasRef = useRef<HTMLElement | null>(null);
  const counterRef = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);
  const [countersStarted, setCountersStarted] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [cursor, setCursor] = useState({ x: 0, y: 0, active: false });
  const [cursorLabel, setCursorLabel] = useState("مشاهدهٔ حرکت");
  const [count, setCount] = useState([0, 0, 0]);

  useEffect(() => {
    const element = atlasRef.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      setInView(true);
      observer.disconnect();
    }, { threshold: 0, rootMargin: "0px 0px -20% 0px" });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => setActiveSlide((index) => (index + 1) % slides.length), 4000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!countersStarted) return;
    const targets = [72, 98, 8.2];
    const start = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const progress = Math.min((now - start) / 2100, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setCount(targets.map((target) => target * ease));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [countersStarted]);

  useEffect(() => {
    const counters = counterRef.current;
    if (!counters) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      setCountersStarted(true);
      observer.disconnect();
    }, { threshold: 0.35 });
    observer.observe(counters);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let frame = 0;
    const updateParallax = () => {
      const atlas = atlasRef.current;
      if (!atlas) return;
      const hero = atlas.querySelector<HTMLElement>(".atlas-hero");
      const media = atlas.querySelector<HTMLElement>(".atlas-parallax-media");
      if (hero) {
        const bounds = hero.getBoundingClientRect();
        const progress = Math.min(Math.max(-bounds.top / Math.max(bounds.height, 1), 0), 1);
        hero.style.setProperty("--atlas-scroll-shift", String(progress));
      }
      if (media) {
        const bounds = media.parentElement?.getBoundingClientRect();
        if (bounds) {
          const progress = Math.min(Math.max((window.innerHeight - bounds.top) / (window.innerHeight + bounds.height), 0), 1);
          media.style.setProperty("--atlas-media-shift", `${-10 + progress * 20}%`);
        }
      }
      frame = 0;
    };
    const requestUpdate = () => {
      if (!frame) frame = requestAnimationFrame(updateParallax);
    };
    updateParallax();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  const swapText = splitCharacters("جزئیات حرکت");
  const footerText = splitCharacters("حرکت را ادامه بده");
  const faqs = [
    ["این صفحه چه نقشی دارد؟", "یک نقشهٔ زنده برای انتخاب افکت مناسب در هر بخش سایت است؛ هر الگو نام، رفتار و نمونهٔ قابل لمس دارد."],
    ["آیا همهٔ افکت‌ها باید هم‌زمان استفاده شوند؟", "خیر. برای هر بخش فقط یک حرکت اصلی انتخاب کنید و باقی حرکت‌ها را در سطح بازخورد یا ساختار نگه دارید."],
    ["پس‌زمینهٔ سربرگ چه تفاوتی دارد؟", "زمینه از ذرات، حلقهٔ نیرو، پارالاکس آرام، آیکن‌های چرخان و لایهٔ محوشدگی تدریجی تشکیل می‌شود تا بدون شلوغی، عمق ایجاد کند."],
  ];

  const scramble = () => {
    const finalText = "مشاهدهٔ حرکت";
    const glyphs = "ابتثجچحخدذرزسشصضطظعغفقکگلمنوهی";
    let step = 0;
    const animate = () => {
      const text = Array.from(finalText).map((character, index) => character === " " ? " " : index / finalText.length < step / 12 ? character : glyphs[Math.floor(Math.random() * glyphs.length)]).join("");
      setCursorLabel(text);
      step += 1;
      if (step <= 12) requestAnimationFrame(animate);
      else setCursorLabel(finalText);
    };
    animate();
  };

  return (
    <section ref={atlasRef} className={`atlas ${inView ? "atlas--ready" : ""}`} id="all-effects" dir="rtl">
      <section className="atlas-hero" aria-labelledby="atlas-title">
        <div className="atlas-hero__noise" aria-hidden="true" />
        <div className="atlas-hero__orb atlas-hero__orb--one" aria-hidden="true" />
        <div className="atlas-hero__orb atlas-hero__orb--two" aria-hidden="true" />
        <div className="atlas-hero__stars" aria-hidden="true"><i /><i /><i /><i /><i /><i /><i /><i /></div>
        <div className="atlas-hero__plus atlas-hero__plus--one" aria-hidden="true">＋</div>
        <div className="atlas-hero__plus atlas-hero__plus--two" aria-hidden="true">＋</div>
        <div className="atlas-hero__plus atlas-hero__plus--three" aria-hidden="true">＋</div>
        <header className="atlas-hero__nav"><span>اطلس / ۲۳ افکت</span><button type="button" onClick={() => onNavigate("atlas-enter")}>شروع کاوش <ArrowDown size={15} /></button></header>
        <div className="atlas-hero__content">
          <p className="micro-label">پس‌زمینهٔ کامل سربرگ / افکت‌های ۲۱، ۲۲ و ۲۳</p>
          <h2 id="atlas-title">حرکت، یک <em>کتابخانه</em> است؛<br />نه یک تزئین اتفاقی.</h2>
          <p>همهٔ ۲۳ الگوی حرکتی در این صفحه با ترتیب واقعی کاربردشان چیده شده‌اند؛ از نخستین پیکسل سربرگ تا لایهٔ محوشدگی پایین صفحه.</p>
          <div className="atlas-hero__readout"><span>میدان</span><b>فعال</b><span>عمق</span><b>۲۳/۲۳</b><span>حالت</span><b>پریمیوم</b></div>
        </div>
        <div className="atlas-hero__bottom"><span className="atlas-pulse" /> اسکرول کنید تا هر اثر را در زمینهٔ خودش ببینید</div>
      </section>

      <section className="atlas-section atlas-enter" id="atlas-enter">
        <div className="atlas-section__label">۰۱ تا ۰۳ / ورود و متن</div>
        <div className="atlas-enter__intro fx-atlas-reveal"><h3>ورود، خواندن و تأکید.</h3><p>سه لایهٔ ابتدایی برای ساخت ریتم محتوای صفحه: ورود بلوک، خوانش کلمه‌به‌کلمه و برجسته‌سازی یک جملهٔ کلیدی.</p></div>
        <div className="atlas-reveal-grid">
          <article className="atlas-reveal-card fx-atlas-reveal"><small>۰۱</small><strong>ظاهرشدن در پیمایش</strong><span>شفافیت و جابه‌جایی کوتاه</span></article>
          <article className="atlas-reveal-card fx-atlas-reveal"><small>۰۲</small><strong>ورود پله‌ای</strong><span>ترتیب زمانی ۷۰ میلی‌ثانیه</span></article>
          <article className="atlas-reveal-card fx-atlas-reveal"><small>۰۳</small><strong>محو‌شدن آرام</strong><span>سلسله‌مراتب کم‌صدا</span></article>
        </div>
        <p className="atlas-word-fade">{wordFade.map((word, index) => <span key={word} style={{ transitionDelay: `${index * 70}ms` }}>{word}</span>)}</p>
        <p className="atlas-marker"><span>یک خط باید</span><span>لحظه‌ای کامل دیده شود،</span><span>بعد راه را باز کند.</span></p>
      </section>

      <section className="atlas-section atlas-motion">
        <div className="atlas-section__label">۰۴ و ۰۵ / نوارهای متحرک</div>
        <div className="atlas-flat-marquee"><div><span>طراحی</span><b>✦</b><span>کدنویسی</span><b>✦</b><span>حرکت</span><b>✦</b><span>روایت</span><b>✦</b><span>طراحی</span><b>✦</b><span>کدنویسی</span><b>✦</b><span>حرکت</span><b>✦</b><span>روایت</span><b>✦</b></div></div>
        <div className="atlas-arc"><div className="atlas-arc__title"><p className="micro-label">۰۵ / نوار مداری</p><h3>مسیرِ حرکت، خودش یک قاب است.</h3></div><div className="atlas-arc__rail"><i>۰۱</i><i>۰۲</i><i>۰۳</i><i>۰۴</i><i>۰۵</i><i>۰۶</i><i>۰۷</i><i>۰۸</i></div></div>
      </section>

      <section className="atlas-section atlas-hover">
        <div className="atlas-section__label">۰۶ تا ۰۹ / پاسخِ نشانگر</div>
        <div className="atlas-hover__lead"><p className="micro-label">تعامل‌های کوتاه و هدفمند</p><h3>واکنش نشانگر نباید فقط رنگ را عوض کند؛ باید یک پاسخِ قابل لمس بسازد.</h3></div>
        <div className="atlas-hover__actions">
          <button className="atlas-split-button" type="button"><span className="atlas-split-button__surface" /><span className="atlas-split-button__text" aria-label="جزئیات حرکت"><span>{swapText.map((character, index) => <i key={`x-${index}`} style={{ transitionDelay: `${index * 13}ms` }}>{character}</i>)}</span><span aria-hidden="true">{swapText.map((character, index) => <i key={`y-${index}`} style={{ transitionDelay: `${index * 13}ms` }}>{character}</i>)}</span></span></button>
          <button className="atlas-footer-swap" type="button"><span>{footerText.map((character, index) => <i key={`m-${index}`} style={{ transitionDelay: `${index * 14}ms` }}>{character}</i>)}</span><span aria-hidden="true">{footerText.map((character, index) => <i key={`n-${index}`} style={{ transitionDelay: `${index * 14}ms` }}>{character}</i>)}</span></button>
          <button className="atlas-arrow-link" type="button" onClick={() => onNavigate("atlas-work")}>نمونهٔ کارت‌های کار <ArrowUpLeft size={19} /></button>
        </div>
        <div className="atlas-awards">{["جهت‌گیری محصول", "زبان برند", "رابط تعاملی"].map((item, index) => <button type="button" key={item}><span>0{index + 1}</span><strong>{item}</strong><ArrowUpLeft size={18} /></button>)}</div>
      </section>

      <section className="atlas-section atlas-work" id="atlas-work">
        <div className="atlas-section__label">۱۰ تا ۱۳ / کارت‌ها و پروژه‌ها</div>
        <div className="atlas-team"><article><div className="atlas-person atlas-person--one" /><div><span>۱۰ / کارت معرفی</span><h3>مارینا کاستا</h3><p>کارگردان خلاق و طراح تجربه.</p></div></article><article><div className="atlas-person atlas-person--two" /><div><span>۱۰ / کارت معرفی</span><h3>مارکوس یان</h3><p>مهندس طراحی و حرکت.</p></div></article></div>
        <div className="atlas-stack"><article className="atlas-work-card atlas-work-card--one"><div className="atlas-work-card__media" /><p>۱۱ / ورود سه‌بعدی</p><h3>افق</h3><span>۱۲ / پشتهٔ چسبان · ۱۳ / پارالاکس تصویر</span></article><article className="atlas-work-card atlas-work-card--two"><div className="atlas-work-card__media" /><p>۱۱ / ورود سه‌بعدی</p><h3>راس</h3><span>۱۲ / پشتهٔ چسبان · ۱۳ / پارالاکس تصویر</span></article><article className="atlas-work-card atlas-work-card--three"><div className="atlas-work-card__media" /><p>۱۱ / ورود سه‌بعدی</p><h3>طلایی</h3><span>۱۲ / پشتهٔ چسبان · ۱۳ / پارالاکس تصویر</span></article></div>
      </section>

      <section className="atlas-section atlas-cursor-section">
        <div className="atlas-section__label">۱۴ و ۱۵ / نشانگر و برچسب پویا</div>
        <div className="atlas-cursor-zone" onPointerEnter={() => { setCursor((value) => ({ ...value, active: true })); scramble(); }} onPointerLeave={() => setCursor((value) => ({ ...value, active: false }))} onPointerMove={(event) => { const bounds = event.currentTarget.getBoundingClientRect(); setCursor({ x: event.clientX - bounds.left, y: event.clientY - bounds.top, active: true }); }}>
          <p>موس را در این ناحیه حرکت دهید</p><h3>اشاره‌گر، خودش یک پیام است.</h3><div className={`atlas-follow-cursor ${cursor.active ? "is-visible" : ""}`} style={{ transform: `translate(${cursor.x}px, ${cursor.y}px)` }}>{cursorLabel}</div>
        </div>
      </section>

      <section className="atlas-section atlas-utility">
        <div className="atlas-section__label">۱۶ تا ۱۸ / ابزارهای تعاملی</div>
        <div className="atlas-counters" ref={counterRef}><article><strong>{formatNumber(count[0])}</strong><span>پروژهٔ فعال</span></article><article><strong>{formatNumber(count[1])}٪</strong><span>بازگشت کاربران</span></article><article><strong>{formatNumber(count[2], 1)}</strong><span>سال تجربه</span></article></div>
        <div className="atlas-slider" style={{ background: slides[activeSlide][1], color: slides[activeSlide][2] }}><span>۱۷ / اسلایدر خودکار</span><h3>{slides[activeSlide][0]}</h3><div>{slides.map((_, index) => <button key={index} className={index === activeSlide ? "is-active" : ""} onClick={() => setActiveSlide(index)} aria-label={`اسلاید ${index + 1}`} />)}</div><ChevronRight className="atlas-slider__arrow" size={54} /></div>
        <div className="atlas-faq">{faqs.map(([question, answer], index) => <article className={openFaq === index ? "is-open" : ""} key={question}><button type="button" onClick={() => setOpenFaq(openFaq === index ? null : index)} aria-expanded={openFaq === index}><span>{question}</span><Plus size={19} /></button><div><p>{answer}</p></div></article>)}</div>
      </section>

      <section className="atlas-section atlas-media">
        <div className="atlas-section__label">۱۹ و ۲۰ / رسانهٔ پویا</div>
        <div className="atlas-parallax-window"><div className="atlas-parallax-media"><i /><i /><i /></div><span>۱۹ / پارالاکس تصویر</span></div>
        <div className="atlas-statement"><p>گفت‌وگو را به <span className="atlas-inline-media"><i /><i /><i /></span> اجرا تبدیل می‌کنیم.</p><span>۲۰ / نمایان‌شدن رسانه در متن</span></div>
      </section>

      <footer className="atlas-footer"><Sparkles size={24} /><p>همهٔ ۲۳ اثر آمادهٔ ترکیب در صفحات آینده هستند.</p><button type="button" onClick={() => onNavigate("top")}>بازگشت به سربرگ <ArrowDown size={17} /></button></footer>
      <div className="atlas-progressive-blur" aria-hidden="true">{Array.from({ length: 10 }, (_, index) => <i key={index} />)}</div>
    </section>
  );
}
