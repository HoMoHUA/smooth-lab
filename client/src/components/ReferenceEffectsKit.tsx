/* Style reminder: Motion Kit — کتابخانهٔ حرکت بازسازی‌شده با Framer Motion و کامپوننت‌های Motion Primitives و Magic UI (در دسترس در 21st.dev). */
import { forwardRef, useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useTransform } from "framer-motion";
import { ArrowDown, ArrowUpLeft, Box, Gauge, Layers3, MousePointerClick, Orbit, Sparkles, Type, Wand2, Waves, Zap } from "lucide-react";
import { TextEffectInView as TextEffect } from "@/components/motion/text-effect-in-view";
import { TextShimmer } from "@/components/motion/text-shimmer";
import { TextRoll } from "@/components/motion/text-roll";
import { TextScramble } from "@/components/motion/text-scramble";
import { AnimatedGroup } from "@/components/motion/animated-group";
import { AnimatedBackground } from "@/components/motion/animated-background";
import { AnimatedNumber } from "@/components/motion/animated-number";
import { InfiniteSlider } from "@/components/motion/infinite-slider";
import { ProgressiveBlur } from "@/components/motion/progressive-blur";
import { BorderTrail } from "@/components/motion/border-trail";
import { Spotlight } from "@/components/motion/spotlight";
import { InView } from "@/components/motion/in-view";
import { Highlighter } from "@/components/motion/highlighter";
import { NumberTicker } from "@/components/motion/number-ticker";
import { MagicCard } from "@/components/motion/magic-card";
import { BorderBeam } from "@/components/motion/border-beam";
import { AnimatedBeam } from "@/components/motion/animated-beam";
import { ScrollVelocityContainer, ScrollVelocityRow } from "@/components/motion/scroll-based-velocity";
import { useViewportProgress } from "@/motion/visualScroll";
import "@/styles/motion-kit.css";

type ReferenceEffectsKitProps = {
  onNavigate: (id: string) => void;
};

const patterns: [string, string][] = [
  ["Text effect", "rk-hero"], ["Text shimmer", "rk-hero"], ["Border trail", "rk-hero"], ["Spotlight", "rk-hero"],
  ["Animated group", "rk-entrance"], ["Scroll word reveal", "rk-word"], ["Hand-drawn highlighter", "rk-marker"],
  ["Infinite slider", "rk-marquee"], ["Velocity scroll", "rk-marquee"], ["Magic card", "rk-hover"], ["Border beam", "rk-hover"],
  ["Text roll", "rk-hover"], ["Text scramble", "rk-hover"], ["Animated background", "rk-awards"],
  ["Number ticker", "rk-numbers"], ["Animated number", "rk-numbers"], ["Animated beam", "rk-beam"],
  ["Floating shapes", "lm-hero"], ["Fanned cards", "lm-fan"], ["Physics chips", "lm-chips"], ["Source flow", "lm-flow"], ["Progress carousel", "lm-carousel"],
];

const entranceCards = [
  { icon: Sparkles, title: "ورود با blur", body: "هر کارت با محوشدگی و جابه‌جایی کوتاه وارد می‌شود." },
  { icon: Layers3, title: "تأخیر زنجیره‌ای", body: "فرزندان پشت سر هم، با فاصلهٔ ثابت ظاهر می‌شوند." },
  { icon: Gauge, title: "فنر فیزیکی", body: "حرکت با spring تمام می‌شود، نه با زمان ثابت." },
  { icon: Type, title: "متن تکه‌تکه", body: "کلمه یا حرف، هر کدام انیمیشن خودش را دارد." },
  { icon: MousePointerClick, title: "پاسخ به اشاره‌گر", body: "نور و قاب، دنبال موس حرکت می‌کنند." },
  { icon: Waves, title: "وابسته به اسکرول", body: "سرعت و پیشرفت اسکرول مستقیماً حرکت را می‌سازد." },
];

const tools = ["Framer Motion", "Motion Primitives", "Magic UI", "21st.dev", "Tailwind CSS", "Radix UI", "Smooth Lab", "Vite", "React 19"];

const awards = [
  { id: "a1", title: "سایت روز", source: "Awwwards", year: "۱۴۰۴" },
  { id: "a2", title: "بهترین تعامل", source: "CSS Design Awards", year: "۱۴۰۴" },
  { id: "a3", title: "نوآوری در حرکت", source: "FWA", year: "۱۴۰۳" },
  { id: "a4", title: "تجربهٔ کاربری برتر", source: "Webby", year: "۱۴۰۳" },
];

const statement = "حرکت خوب، پیام ثابت را به تجربه‌ای هدایت‌شده تبدیل می‌کند؛ هر کلمه درست وقتی روشن می‌شود که چشم به آن می‌رسد.";

function Section({ id, title, lead, children, dark = false }: { id: string; title: string; lead: string; children: ReactNode; dark?: boolean }) {
  return (
    <section className={`mk-section ${dark ? "mk-section--dark" : ""}`} id={id}>
      <header className="mk-section__head">
        <TextEffect as="h2" per="word" preset="fade-in-blur" className="mk-section__title">{title}</TextEffect>
        <p>{lead}</p>
      </header>
      {children}
    </section>
  );
}

/** Words light up as the paragraph scrolls past (Magic UI Text Reveal, rewired to the page's visual scroll so it works under smooth scrolling without position: sticky). */
function ScrollWordReveal({ text }: { text: string }) {
  const ref = useRef<HTMLParagraphElement | null>(null);
  const progress = useViewportProgress(ref);
  const words = text.split(" ");
  return (
    <p ref={ref} className="mk-reveal">
      {words.map((word, index) => (
        <Word key={index} progress={progress} range={[0.18 + (index / words.length) * 0.45, 0.18 + ((index + 1) / words.length) * 0.45]}>{word}</Word>
      ))}
    </p>
  );
}

function Word({ children, progress, range }: { children: string; progress: ReturnType<typeof useViewportProgress>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  const y = useTransform(progress, range, [6, 0]);
  return <motion.span style={{ opacity, y }} className="mk-reveal__word">{children} </motion.span>;
}

function RollButton() {
  const [round, setRound] = useState(0);
  return (
    <button type="button" className="mk-roll" onMouseEnter={() => setRound((value) => value + 1)} onFocus={() => setRound((value) => value + 1)} dir="ltr">
      <TextRoll key={round} duration={0.35} getEnterDelay={(i) => i * 0.03} getExitDelay={(i) => i * 0.03 + 0.12}>Start a project</TextRoll>
    </button>
  );
}

function ScrambleLink() {
  const [trigger, setTrigger] = useState(false);
  return (
    <a href="#rk-index" className="mk-scramble" dir="ltr" onMouseEnter={() => setTrigger(true)} onFocus={() => setTrigger(true)}>
      <TextScramble as="span" duration={0.8} speed={0.03} trigger={trigger} onScrambleComplete={() => setTrigger(false)}>VIEW SELECTED WORK</TextScramble>
      <ArrowUpLeft size={16} />
    </a>
  );
}

const BeamNode = forwardRef<HTMLDivElement, { children: ReactNode; label: string; hub?: boolean }>(({ children, label, hub }, ref) => (
  <div ref={ref} className={`mk-node ${hub ? "mk-node--hub" : ""}`} aria-label={label} title={label}>{children}</div>
));
BeamNode.displayName = "BeamNode";

function BeamDiagram() {
  const container = useRef<HTMLDivElement | null>(null);
  const hub = useRef<HTMLDivElement | null>(null);
  const a = useRef<HTMLDivElement | null>(null);
  const b = useRef<HTMLDivElement | null>(null);
  const c = useRef<HTMLDivElement | null>(null);
  const d = useRef<HTMLDivElement | null>(null);
  const e = useRef<HTMLDivElement | null>(null);
  const f = useRef<HTMLDivElement | null>(null);
  return (
    <div ref={container} className="mk-beam" dir="ltr">
      <div className="mk-beam__col"><BeamNode ref={a} label="Text"><Type size={20} /></BeamNode><BeamNode ref={b} label="Scroll"><Waves size={20} /></BeamNode><BeamNode ref={c} label="Hover"><MousePointerClick size={20} /></BeamNode></div>
      <BeamNode ref={hub} label="Motion Kit" hub><Orbit size={28} /></BeamNode>
      <div className="mk-beam__col"><BeamNode ref={d} label="Spring"><Zap size={20} /></BeamNode><BeamNode ref={e} label="Layout"><Box size={20} /></BeamNode><BeamNode ref={f} label="Effects"><Wand2 size={20} /></BeamNode></div>
      {[a, b, c].map((from, index) => <AnimatedBeam key={`l${index}`} containerRef={container} fromRef={from} toRef={hub} curvature={(index - 1) * -60} gradientStartColor="#315cff" gradientStopColor="#d7ff4f" />)}
      {[d, e, f].map((from, index) => <AnimatedBeam key={`r${index}`} containerRef={container} fromRef={from} toRef={hub} curvature={(index - 1) * -60} reverse gradientStartColor="#315cff" gradientStopColor="#d7ff4f" />)}
    </div>
  );
}

function LiveNumber() {
  const [value, setValue] = useState(1280);
  useEffect(() => {
    const timer = window.setInterval(() => setValue((current) => current + Math.round(40 + Math.random() * 220)), 2200);
    return () => window.clearInterval(timer);
  }, []);
  return <AnimatedNumber className="mk-number__value" springOptions={{ bounce: 0, duration: 1400 }} value={value} />;
}

export default function ReferenceEffectsKit({ onNavigate }: ReferenceEffectsKitProps) {
  return (
    <section className="mk" id="reference-kit" dir="rtl">
      <header className="mk-hero" id="rk-hero">
        <Spotlight className="mk-spotlight" size={360} />
        <nav className="mk-hero__nav"><strong>Motion Kit</strong><button type="button" onClick={() => onNavigate("rk-index")}>همهٔ الگوها</button></nav>
        <div className="mk-hero__copy">
          <TextShimmer as="p" className="mk-hero__kicker" duration={2.4}>Framer Motion · Motion Primitives · Magic UI · 21st.dev</TextShimmer>
          <TextEffect as="h2" per="char" preset="fade-in-blur" speedReveal={1.4} className="mk-hero__title" dir="ltr">Reusable Motion</TextEffect>
          <TextEffect as="p" per="line" preset="fade-in-blur" delay={0.6} className="mk-hero__lead">کتابخانهٔ حرکت این صفحه با Framer Motion و کامپوننت‌های متن‌باز Motion Primitives و Magic UI بازسازی شده است؛ همان کامپوننت‌هایی که در 21st.dev منتشر شده‌اند.</TextEffect>
          <button type="button" className="mk-trail-button" onClick={() => onNavigate("rk-entrance")}>
            <BorderTrail className="mk-trail" size={70} />
            شروع مرور <ArrowDown size={16} />
          </button>
        </div>
        <ProgressiveBlur className="mk-hero__blur" direction="bottom" blurIntensity={0.6} />
      </header>

      <main className="mk-shell">
        <section className="mk-index" id="rk-index">
          <TextEffect as="h2" per="word" preset="slide" className="mk-section__title">۲۲ الگوی قابل استفاده</TextEffect>
          <div className="mk-index__grid">
            <AnimatedBackground className="mk-index__highlight" enableHover transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}>
              {patterns.map(([label, target]) => (
                <button key={label} data-id={label} type="button" className="mk-index__item" onClick={() => onNavigate(target)}>{label}</button>
              ))}
            </AnimatedBackground>
          </div>
        </section>

        <Section id="rk-entrance" title="ورود گروهی" lead="Animated Group از Motion Primitives: فرزندان با blur و slide پشت سر هم وارد می‌شوند.">
          <AnimatedGroup preset="blur-slide" className="mk-entrance" as="div">
            {entranceCards.map(({ icon: Icon, title, body }) => (
              <article className="mk-tile" key={title}><span><Icon size={20} /></span><h3>{title}</h3><p>{body}</p></article>
            ))}
          </AnimatedGroup>
        </Section>

        <Section id="rk-word" title="روشن‌شدن کلمه‌به‌کلمه" lead="هر کلمه با پیشرفت اسکرول روشن می‌شود و کمی بالا می‌آید؛ هم‌گام با اسکرول نرم صفحه." dark>
          <ScrollWordReveal text={statement} />
        </Section>

        <Section id="rk-marker" title="هایلایتر دست‌کشیده" lead="Highlighter از Magic UI با rough-notation: نشانه‌گذاری‌هایی که هنگام ورود به صفحه با دست کشیده می‌شوند.">
          <InView viewOptions={{ once: true, margin: "0px 0px -20% 0px" }}>
            <p className="mk-marker">
              طراحی که <Highlighter action="highlight" color="#d7ff4f">منتشر می‌شود</Highlighter>، کدی که{" "}
              <Highlighter action="underline" color="#315cff" strokeWidth={2}>دوام می‌آورد</Highlighter> و حرکتی که{" "}
              <Highlighter action="circle" color="#ff6f71" padding={6}>دلیل دارد</Highlighter>؛ نه تزئینی که{" "}
              <Highlighter action="strike-through" color="#111521">حواس را پرت می‌کند</Highlighter>.{" "}
              <Highlighter action="box" color="#7b5cff" padding={4}>هر نشانه یک معنا</Highlighter>.
            </p>
          </InView>
        </Section>

        <Section id="rk-marquee" title="نوارهای متحرک" lead="Infinite Slider با لبه‌های Progressive Blur، و ردیف‌هایی که سرعتشان از سرعت اسکرول می‌آید.">
          <div className="mk-slider" dir="ltr">
            <InfiniteSlider gap={56} speed={60} speedOnHover={18}>
              {tools.map((tool) => <span className="mk-slider__item" key={tool}>{tool}</span>)}
            </InfiniteSlider>
            <ProgressiveBlur className="mk-slider__edge mk-slider__edge--left" direction="left" blurIntensity={1} />
            <ProgressiveBlur className="mk-slider__edge mk-slider__edge--right" direction="right" blurIntensity={1} />
          </div>
          <ScrollVelocityContainer className="mk-velocity" dir="ltr">
            <ScrollVelocityRow baseVelocity={3} direction={1}>MOTION WITH A REASON ✦ </ScrollVelocityRow>
            <ScrollVelocityRow baseVelocity={3} direction={-1} className="mk-velocity__outline">SCROLL FASTER ✦ FEEL IT ✦ </ScrollVelocityRow>
          </ScrollVelocityContainer>
        </Section>

        <Section id="rk-hover" title="پاسخ به اشاره‌گر" lead="Magic Card نور را دنبال موس می‌برد، Border Beam دور قاب می‌چرخد، Text Roll و Text Scramble روی hover اجرا می‌شوند.">
          <div className="mk-hover">
            <MagicCard className="mk-magic" gradientColor="#315cff22" gradientFrom="#315cff" gradientTo="#d7ff4f">
              <div className="mk-magic__body"><Sparkles size={22} /><h3>کارت جادویی</h3><p>نشانگر را روی کارت حرکت دهید؛ لبه و سطح با گرادیان روشن می‌شوند.</p></div>
            </MagicCard>
            <div className="mk-beam-card">
              <h3>قاب با پرتو</h3>
              <p>پرتو نور به‌طور پیوسته دور لبهٔ کارت حرکت می‌کند.</p>
              <BorderBeam size={120} duration={6} colorFrom="#315cff" colorTo="#d7ff4f" />
            </div>
            <div className="mk-hover__actions">
              <RollButton />
              <ScrambleLink />
            </div>
          </div>
        </Section>

        <Section id="rk-awards" title="فهرست با پس‌زمینهٔ لغزان" lead="Animated Background: یک لایهٔ مشترک با layout animation بین ردیف‌ها جابه‌جا می‌شود.">
          <div className="mk-awards">
            <AnimatedBackground className="mk-awards__bg" enableHover transition={{ type: "spring", bounce: 0.15, duration: 0.45 }}>
              {awards.map((award) => (
                <div key={award.id} data-id={award.id} className="mk-awards__row" tabIndex={0}>
                  <span>{award.year}</span><strong>{award.title}</strong><small>{award.source}</small><ArrowUpLeft size={18} />
                </div>
              ))}
            </AnimatedBackground>
          </div>
        </Section>

        <Section id="rk-numbers" title="عددهای زنده" lead="Number Ticker با فنر هنگام ورود به صفحه می‌شمارد؛ Animated Number هر تغییر مقدار را نرم دنبال می‌کند.">
          <div className="mk-numbers">
            <div className="mk-number"><NumberTicker value={72} locale="fa-IR" className="mk-number__value" /><span>پروژهٔ تحویل‌شده</span></div>
            <div className="mk-number"><NumberTicker value={98} locale="fa-IR" delay={0.15} className="mk-number__value" /><span>درصد رضایت</span></div>
            <div className="mk-number"><NumberTicker value={8.2} decimalPlaces={1} locale="fa-IR" delay={0.3} className="mk-number__value" /><span>سال تجربه</span></div>
            <div className="mk-number mk-number--live"><LiveNumber /><span>بازدید زنده</span></div>
          </div>
        </Section>

        <Section id="rk-beam" title="پرتوهای اتصال" lead="Animated Beam از Magic UI: هر ورودی با پرتوی متحرک به مرکز سیستم وصل می‌شود." dark>
          <BeamDiagram />
        </Section>
      </main>
      <footer className="mk-footer">
        <TextEffect as="p" per="word" preset="blur" className="mk-footer__title">کامپوننت را بردارید، حرکت را نگه دارید.</TextEffect>
        <button type="button" onClick={() => onNavigate("top")}><ArrowDown size={18} /> بازگشت</button>
      </footer>
    </section>
  );
}
