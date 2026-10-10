import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowUpLeft } from "lucide-react";

type ReferenceEffectsKitProps = {
  onNavigate: (id: string) => void;
};

const words = "Good motion turns a static message into a guided visual experience.".split(" ");

const clamp = (min: number, value: number, max: number) => Math.min(max, Math.max(min, value));

export default function ReferenceEffectsKit({ onNavigate }: ReferenceEffectsKitProps) {
  const rootRef = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      setVisible(true);
      observer.disconnect();
    }, { threshold: 0, rootMargin: "0px 0px -12% 0px" });
    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    root.querySelectorAll<HTMLElement>("[data-rk-enter],[data-rk-marker],[data-rk-arc-trigger],[data-rk-statement]").forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    let frame = 0;
    let offset = 0;
    let lastTime = performance.now();
    let lastScroll = window.scrollY;
    let speedFactor = 1;
    const arc = root.querySelector<HTMLElement>("[data-rk-arc]");

    const render = (now: number) => {
      const delta = Math.min(34, now - lastTime);
      lastTime = now;
      const scrollDelta = window.scrollY - lastScroll;
      lastScroll = window.scrollY;
      root.querySelectorAll<HTMLElement>("[data-rk-word]").forEach((word) => {
        const parent = word.parentElement;
        if (!parent) return;
        const rect = parent.getBoundingClientRect();
        const progress = clamp(0, (window.innerHeight * 0.82 - rect.top) / (window.innerHeight * 0.62 + rect.height), 1);
        const index = Number(word.dataset.rkWord || 0);
        const local = clamp(0, progress * 1.65 - (index / Math.max(words.length - 1, 1)) * 0.65, 1);
        word.style.opacity = String(0.15 + local * 0.85);
      });
      root.querySelectorAll<HTMLElement>("[data-rk-parallax]").forEach((media) => {
        const parent = media.parentElement;
        if (!parent) return;
        const rect = parent.getBoundingClientRect();
        const progress = clamp(0, (window.innerHeight - rect.top) / (window.innerHeight + rect.height), 1);
        media.style.setProperty("--rk-parallax-y", `${-10 + progress * 20}%`);
      });
      const hero = root.querySelector<HTMLElement>("[data-rk-hero]");
      if (hero) {
        const rect = hero.getBoundingClientRect();
        const progress = clamp(0, -rect.top / Math.max(window.innerHeight, 1), 1);
        hero.style.transform = `translateY(${progress * 10}vh) scale(${1 - progress * 0.02})`;
      }
      if (arc) {
        const width = arc.clientWidth;
        const height = arc.clientHeight;
        const items = Array.from(arc.querySelectorAll<HTMLElement>("[data-rk-arc-item]"));
        const spacing = clamp(150, window.innerHeight * 0.355, 310);
        const total = spacing * items.length;
        const pxPerMs = total / 60000;
        const target = 1 + clamp(-8, scrollDelta / Math.max(delta, 1), 8) * 2.2;
        speedFactor += (target - speedFactor) * 0.06;
        speedFactor += (1 - speedFactor) * 0.025;
        offset += pxPerMs * delta * speedFactor;
        items.forEach((item, index) => {
          let xArc = ((index * spacing - offset) % total + total) % total;
          if (xArc >= total / 2) xArc -= total;
          const half = width / 2;
          const norm = xArc / Math.max(half, 1);
          const depth = height * 0.24;
          const y = height * 0.23 + depth * norm * norm;
          const slope = (2 * depth * norm) / Math.max(half, 1);
          const rotation = Math.atan(slope) * 180 / Math.PI;
          item.style.transform = `translate(${half + xArc}px, ${y}px) translate(-50%, -50%) rotate(${rotation}deg)`;
          item.style.visibility = Math.abs(xArc) < half + spacing ? "visible" : "hidden";
        });
      }
      frame = requestAnimationFrame(render);
    };
    frame = requestAnimationFrame(render);
    return () => cancelAnimationFrame(frame);
  }, []);

  const getChars = (text: string) => Array.from(text).map((character, index) => <i key={`${text}-${index}`} style={{ transitionDelay: `${index * 14}ms` }}>{character === " " ? "\u00a0" : character}</i>);

  return (
    <section ref={rootRef} className={`reference-kit ${visible ? "is-visible" : ""}`} id="reference-kit" dir="rtl">
      <header className="rk-hero" id="rk-hero" data-rk-hero>
        <nav className="rk-nav"><strong>Effects Kit</strong><button type="button" onClick={() => onNavigate("rk-index")}>مشاهده همهٔ افکت‌ها</button></nav>
        <span className="rk-plus rk-plus--one">＋</span><span className="rk-plus rk-plus--two">＋</span><span className="rk-plus rk-plus--three">＋</span>
        <div><p className="rk-kicker">Vanilla CSS + JavaScript</p><h2>Reusable Motion</h2></div>
        <div><p className="rk-lead">بازسازی مستقل افکت‌های قابل‌استفادهٔ سایت Fullstack Studio؛ بدون وابستگی به Webflow، GSAP یا کتابخانهٔ خارجی.</p><button className="rk-scroll-cue" type="button" onClick={() => onNavigate("rk-index")}><span /><span>Scroll to explore</span></button></div>
      </header>

      <main className="rk-shell">
        <section className="rk-index" id="rk-index"><h2>۲۲ الگوی قابل استفاده</h2><div className="rk-index-grid">{[["Scroll reveal", "rk-entrance"], ["Stagger reveal", "rk-entrance"], ["Word fade scrub", "rk-word"], ["Marker wipe", "rk-marker"], ["Flat marquee", "rk-marquee"], ["Arc marquee", "rk-marquee"], ["Split button", "rk-hover"], ["Footer text swap", "rk-hover"], ["Arrow link", "rk-hover"], ["Awards hover", "rk-awards"], ["Hero parallax", "rk-hero"], ["Floating shapes", "lm-hero"], ["Shape-tinted text", "lm-hero"], ["Word rise", "lm-hero"], ["Text shine", "lm-hero"], ["Fanned cards", "lm-fan"], ["3D tilt + glare", "lm-fan"], ["Physics chips", "lm-chips"], ["Source flow", "lm-flow"], ["Progress carousel", "lm-carousel"], ["Shape pile", "lm-footer"], ["Magnetic buttons", "lm-footer"]].map(([item, target]) => <button type="button" key={item} onClick={() => onNavigate(target)}>{item}</button>)}</div></section>

        <section className="rk-section" id="rk-entrance"><header><h2>Entrance</h2><p>ورود ساده از پایین با جابه‌جایی ۲۴px، stagger مستقیم فرزندان و حالت fade-only.</p></header><div className="rk-demo rk-reveal-grid" data-rk-enter><span className="rk-label">01 / Reveal + stagger</span>{["Fade + translate", "Per-item delay", "One-time enter"].map((label, index) => <article className="rk-reveal-card rk-enter" style={{ transitionDelay: `${index * 90}ms` }} key={label}><small>0{index + 1}</small><strong>{label}</strong></article>)}</div></section>

        <section className="rk-section" id="rk-word"><header><h2>Text motion</h2><p>شفافیت کلمه‌به‌کلمه با اسکرول و همان حس cascade متن‌های بزرگ.</p></header><div className="rk-demo rk-word-demo"><span className="rk-label">02 / Word fade</span><p>{words.map((word, index) => <span data-rk-word={index} key={`${word}-${index}`}>{word}{index === words.length - 1 ? "" : " "}</span>)}</p></div></section>

        <section className="rk-section" id="rk-marker"><header><h2>Marker wipe</h2><p>هر خط با currentColor پوشانده می‌شود، متن ظاهر می‌شود و پوشش از سمت دیگر خارج می‌شود.</p></header><div className="rk-demo rk-marker-demo"><span className="rk-label">03 / Line highlight</span><div className="rk-marker-copy" data-rk-marker><span style={{ "--rk-i": 0 } as React.CSSProperties}><b>Design that ships.</b></span><span style={{ "--rk-i": 1 } as React.CSSProperties}><b>Code that scales.</b></span><span style={{ "--rk-i": 2 } as React.CSSProperties}><b>Motion with purpose.</b></span></div></div></section>

        <section className="rk-section" id="rk-marquee"><header><h2>Marquees</h2><p>یک marquee مستقیم با توقف روی hover و یک مسیر سهمی responsive که با سرعت اسکرول واکنش نشان می‌دهد.</p></header><div className="rk-demo rk-marquee-demo"><span className="rk-label">04 / Flat marquee</span><div className="rk-flat-marquee"><div><span>DESIGN</span><span>✦</span><span>CODE</span><span>✦</span><span>MOTION</span><span>✦</span><span>DESIGN</span><span>✦</span><span>CODE</span><span>✦</span><span>MOTION</span><span>✦</span></div></div></div><div className="rk-demo rk-arc-demo"><span className="rk-label">05 / Arc marquee</span><div className="rk-arc" data-rk-arc data-rk-arc-trigger>{["ONE", "TWO", "THREE", "FOUR", "FIVE", "SIX", "SEVEN", "EIGHT"].map((label, index) => <i data-rk-arc-item key={label} className={`rk-arc-item rk-arc-item--${index + 1}`}>{label}</i>)}</div></div></section>

        <section className="rk-section" id="rk-hover"><header><h2>Hover</h2><p>تعویض کاراکتری دو خط، فشردگی ۰٫۹۸ پس‌زمینه و لینک فلش‌دار با underline.</p></header><div className="rk-demo rk-hover-demo"><span className="rk-label">06–08 / Hover family</span><button className="rk-split-button" type="button"><span className="rk-split-button__bg" /><span className="rk-split-lines"><span>{getChars("Start a project")}</span><span aria-hidden="true">{getChars("Start a project")}</span></span></button><button className="rk-text-swap" type="button"><span>{getChars("Let's work together")}</span><span aria-hidden="true">{getChars("Let's work together")}</span></button><button className="rk-arrow-link" type="button" onClick={() => onNavigate("rk-works")}>View selected work <ArrowUpLeft size={20} /></button></div></section>

        <section className="rk-section" id="rk-awards"><header><h2>Awards hover</h2><p>پس‌زمینه از پایین ۰ تا ۱۰۰٪ رشد می‌کند و رنگ محتوا هم‌زمان به رنگ مقابل می‌رسد.</p></header><div className="rk-demo rk-awards-demo"><span className="rk-label">09 / Background rise</span>{[["Awards", "Site of the Day, Honorable Mention", "x03"], ["CSS Pick", "Developer Award, Special Mention", "x12"], ["Site Inspire", "Featured UX/UI and Product Design", "x26"]].map(([title, detail, value]) => <button className="rk-award-row" type="button" key={title}><strong>{title}</strong><small>{detail}</small><span>{value}</span></button>)}</div></section>





      </main>
      <footer className="rk-footer"><p>Copy the classes.<br />Keep the motion.</p><button type="button" onClick={() => onNavigate("top")}><ArrowDown size={18} /> بازگشت</button></footer>
      <div className="rk-bottom-blur" aria-hidden="true">{Array.from({ length: 10 }, (_, index) => <i key={index} />)}</div>
    </section>
  );
}
