/* Style reminder: میدان آرام — همهٔ الگوها باید در یک روایت سرمقاله‌ای روشن، فنی و قابل استفاده کنار هم قرار بگیرند. */
import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowUpLeft, ChevronLeft, ChevronRight, Plus, Sparkles } from "lucide-react";
import { splitCharacters } from "@/lib/premiumEffects";

const wordFade = ["هر", "حرکت", "یک", "نشانه", "است؛", "اگر", "کاربر", "بداند", "چرا", "اتفاق", "می‌افتد."];
const slides = [
  ["روایت پیش از تزئین.", "#d7ff4f", "#171b2a"],
  ["سیستم‌هایی که زنده می‌مانند.", "#315cff", "#ffffff"],
  ["حرکت، بخشی از محتواست.", "#fd9272", "#171b2a"],
];

export default function FullEffectsAtlas() {
  const atlasRef = useRef<HTMLElement | null>(null);
  const [inView, setInView] = useState(false);
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
    if (!inView) return;
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
  }, [inView]);

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
  const footerText = splitCharacters("پایین‌تر برو");
  const faqs = [
    ["این صفحه چه نقشی دارد؟", "یک نقشهٔ زنده برای انتخاب افکت مناسب در هر بخش سایت است؛ هر الگو نام، رفتار و نمونهٔ قابل لمس دارد."],
    ["آیا همهٔ افکت‌ها باید هم‌زمان استفاده شوند؟", "خیر. برای هر بخش فقط یک حرکت اصلی انتخاب کنید و باقی حرکت‌ها را در سطح بازخورد یا ساختار نگه دارید."],
    ["پس‌زمینهٔ Hero چه تفاوتی دارد؟", "زمینه از ذرات، حلقهٔ نیرو، پارالاکس آرام، آیکن‌های چرخان و progressive blur تشکیل می‌شود تا بدون شلوغی، عمق ایجاد کند."],
  ];

  const scramble = () => {
    const finalText = "مشاهدهٔ حرکت";
    const glyphs = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
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
    <section ref={atlasRef} className={`atlas ${inView ? "atlas--ready" : ""}`} id="all-effects">
      <section className="atlas-hero" aria-labelledby="atlas-title">
        <div className="atlas-hero__noise" aria-hidden="true" />
        <div className="atlas-hero__orb atlas-hero__orb--one" aria-hidden="true" />
        <div className="atlas-hero__orb atlas-hero__orb--two" aria-hidden="true" />
        <div className="atlas-hero__stars" aria-hidden="true"><i /><i /><i /><i /><i /><i /><i /><i /></div>
        <div className="atlas-hero__plus atlas-hero__plus--one" aria-hidden="true">＋</div>
        <div className="atlas-hero__plus atlas-hero__plus--two" aria-hidden="true">＋</div>
        <div className="atlas-hero__plus atlas-hero__plus--three" aria-hidden="true">＋</div>
        <header className="atlas-hero__nav"><span>ATLAS / 23 EFFECTS</span><a href="#atlas-enter">شروع کاوش <ArrowDown size={15} /></a></header>
        <div className="atlas-hero__content">
          <p className="micro-label">پس‌زمینهٔ کامل Hero / افکت‌های ۲۱، ۲۲ و ۲۳</p>
          <h2 id="atlas-title">حرکت، یک <em>کتابخانه</em> است؛<br />نه یک تزئین اتفاقی.</h2>
          <p>همهٔ ۲۳ الگوی حرکتی در این صفحه با ترتیب واقعی کاربردشان چیده شده‌اند؛ از نخستین پیکسل Header تا لایهٔ blur پایین صفحه.</p>
          <div className="atlas-hero__readout"><span>FIELD</span><b>ACTIVE</b><span>DEPTH</span><b>23/23</b><span>MODE</span><b>PREMIUM</b></div>
        </div>
        <div className="atlas-hero__bottom"><span className="atlas-pulse" /> اسکرول کنید تا هر اثر را در زمینهٔ خودش ببینید</div>
      </section>

      <section className="atlas-section atlas-enter" id="atlas-enter">
        <div className="atlas-section__label">01–03 / ENTRANCE + TEXT</div>
        <div className="atlas-enter__intro fx-atlas-reveal"><h3>ورود، خواندن و تأکید.</h3><p>سه لایهٔ ابتدایی برای ساخت ریتم محتوای صفحه: ورود بلوک، خوانش کلمه‌به‌کلمه و highlight یک جملهٔ کلیدی.</p></div>
        <div className="atlas-reveal-grid">
          <article className="atlas-reveal-card fx-atlas-reveal"><small>01</small><strong>Scroll reveal</strong><span>Opacity + 24px</span></article>
          <article className="atlas-reveal-card fx-atlas-reveal"><small>02</small><strong>Stagger</strong><span>70ms sequence</span></article>
          <article className="atlas-reveal-card fx-atlas-reveal"><small>03</small><strong>Fade only</strong><span>Quiet hierarchy</span></article>
        </div>
        <p className="atlas-word-fade">{wordFade.map((word, index) => <span key={word} style={{ transitionDelay: `${index * 70}ms` }}>{word}</span>)}</p>
        <p className="atlas-marker"><span>یک خط باید</span><span>لحظه‌ای کامل دیده شود،</span><span>بعد راه را باز کند.</span></p>
      </section>

      <section className="atlas-section atlas-motion">
        <div className="atlas-section__label">04–05 / MARQUEE MOTION</div>
        <div className="atlas-flat-marquee"><div><span>DESIGN</span><b>✦</b><span>CODE</span><b>✦</b><span>MOTION</span><b>✦</b><span>STORY</span><b>✦</b><span>DESIGN</span><b>✦</b><span>CODE</span><b>✦</b><span>MOTION</span><b>✦</b><span>STORY</span><b>✦</b></div></div>
        <div className="atlas-arc"><div className="atlas-arc__title"><p className="micro-label">05 / ARC MARQUEE</p><h3>مسیرِ حرکت، خودش یک قاب است.</h3></div><div className="atlas-arc__rail"><i>01</i><i>02</i><i>03</i><i>04</i><i>05</i><i>06</i><i>07</i><i>08</i></div></div>
      </section>

      <section className="atlas-section atlas-hover">
        <div className="atlas-section__label">06–09 / HOVER SYSTEM</div>
        <div className="atlas-hover__lead"><p className="micro-label">تعامل‌های کوتاه و هدفمند</p><h3>Hover نباید فقط رنگ را عوض کند؛ باید یک پاسخِ قابل لمس بسازد.</h3></div>
        <div className="atlas-hover__actions">
          <button className="atlas-split-button" type="button"><span className="atlas-split-button__surface" /><span className="atlas-split-button__text" aria-label="جزئیات حرکت"><span>{swapText.map((character, index) => <i key={`x-${index}`} style={{ transitionDelay: `${index * 13}ms` }}>{character}</i>)}</span><span aria-hidden="true">{swapText.map((character, index) => <i key={`y-${index}`} style={{ transitionDelay: `${index * 13}ms` }}>{character}</i>)}</span></span></button>
          <button className="atlas-footer-swap" type="button"><span>{footerText.map((character, index) => <i key={`m-${index}`} style={{ transitionDelay: `${index * 14}ms` }}>{character}</i>)}</span><span aria-hidden="true">{footerText.map((character, index) => <i key={`n-${index}`} style={{ transitionDelay: `${index * 14}ms` }}>{character}</i>)}</span></button>
          <a className="atlas-arrow-link" href="#atlas-work">نمونهٔ کارت‌های کار <ArrowUpLeft size={19} /></a>
        </div>
        <div className="atlas-awards">{["جهت‌گیری محصول", "زبان برند", "رابط تعاملی"].map((item, index) => <button type="button" key={item}><span>0{index + 1}</span><strong>{item}</strong><ArrowUpLeft size={18} /></button>)}</div>
      </section>

      <section className="atlas-section atlas-work" id="atlas-work">
        <div className="atlas-section__label">10–13 / PEOPLE + WORK STACK</div>
        <div className="atlas-team"><article><div className="atlas-person atlas-person--one" /><div><span>10 / TEAM REVEAL</span><h3>مارینا کاستا</h3><p>کارگردان خلاق و طراح تجربه.</p></div></article><article><div className="atlas-person atlas-person--two" /><div><span>10 / TEAM REVEAL</span><h3>مارکوس یان</h3><p>مهندس طراحی و حرکت.</p></div></article></div>
        <div className="atlas-stack"><article className="atlas-work-card atlas-work-card--one"><div className="atlas-work-card__media" /><p>11 / 3D REVEAL</p><h3>Horizon</h3><span>12 / STICKY STACK · 13 / IMAGE PARALLAX</span></article><article className="atlas-work-card atlas-work-card--two"><div className="atlas-work-card__media" /><p>11 / 3D REVEAL</p><h3>Vertex</h3><span>12 / STICKY STACK · 13 / IMAGE PARALLAX</span></article><article className="atlas-work-card atlas-work-card--three"><div className="atlas-work-card__media" /><p>11 / 3D REVEAL</p><h3>Aurelius</h3><span>12 / STICKY STACK · 13 / IMAGE PARALLAX</span></article></div>
      </section>

      <section className="atlas-section atlas-cursor-section">
        <div className="atlas-section__label">14–15 / CURSOR + SCRAMBLE</div>
        <div className="atlas-cursor-zone" onPointerEnter={() => { setCursor((value) => ({ ...value, active: true })); scramble(); }} onPointerLeave={() => setCursor((value) => ({ ...value, active: false }))} onPointerMove={(event) => { const bounds = event.currentTarget.getBoundingClientRect(); setCursor({ x: event.clientX - bounds.left, y: event.clientY - bounds.top, active: true }); }}>
          <p>موس را در این ناحیه حرکت دهید</p><h3>اشاره‌گر، خودش یک پیام است.</h3><div className={`atlas-follow-cursor ${cursor.active ? "is-visible" : ""}`} style={{ transform: `translate(${cursor.x}px, ${cursor.y}px)` }}>{cursorLabel}</div>
        </div>
      </section>

      <section className="atlas-section atlas-utility">
        <div className="atlas-section__label">16–18 / UTILITIES</div>
        <div className="atlas-counters"><article><strong>{Math.round(count[0])}</strong><span>پروژهٔ فعال</span></article><article><strong>{Math.round(count[1])}%</strong><span>بازگشت کاربران</span></article><article><strong>{count[2].toFixed(1)}</strong><span>سال تجربه</span></article></div>
        <div className="atlas-slider" style={{ background: slides[activeSlide][1], color: slides[activeSlide][2] }}><span>17 / AUTO SLIDER</span><h3>{slides[activeSlide][0]}</h3><div>{slides.map((_, index) => <button key={index} className={index === activeSlide ? "is-active" : ""} onClick={() => setActiveSlide(index)} aria-label={`اسلاید ${index + 1}`} />)}</div><ChevronLeft className="atlas-slider__arrow" size={54} /></div>
        <div className="atlas-faq">{faqs.map(([question, answer], index) => <article className={openFaq === index ? "is-open" : ""} key={question}><button type="button" onClick={() => setOpenFaq(openFaq === index ? null : index)} aria-expanded={openFaq === index}><span>{question}</span><Plus size={19} /></button><div><p>{answer}</p></div></article>)}</div>
      </section>

      <section className="atlas-section atlas-media">
        <div className="atlas-section__label">19–20 / MEDIA EFFECTS</div>
        <div className="atlas-parallax-window"><div className="atlas-parallax-media"><i /><i /><i /></div><span>19 / IMAGE PARALLAX</span></div>
        <div className="atlas-statement"><p>گفت‌وگو را به <span className="atlas-inline-media"><i /><i /><i /></span> اجرا تبدیل می‌کنیم.</p><span>20 / INLINE MEDIA REVEAL</span></div>
      </section>

      <footer className="atlas-footer"><Sparkles size={24} /><p>همهٔ ۲۳ اثر آمادهٔ ترکیب در صفحات آینده هستند.</p><a href="#top">بازگشت به Hero <ArrowDown size={17} /></a></footer>
      <div className="atlas-progressive-blur" aria-hidden="true">{Array.from({ length: 10 }, (_, index) => <i key={index} />)}</div>
    </section>
  );
}
