/* Style reminder: میدان آرام — ساختار سرمقاله‌ای روشن با رنگ Pulse Cobalt و حرکت کنترل‌شده. */
import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowUpRight, Play, RotateCcw, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import HeroField from "@/components/HeroField";
import ReferenceEffectsKit from "@/components/ReferenceEffectsKit";
import ScrollReferenceModules from "@/components/ScrollReferenceModules";
import DesignSystemLanding from "@/components/DesignSystemLanding";

const HERO_FIELD = "/images/hero-field.svg";
const SCROLL_FLOW = "/images/scroll-flow.svg";
const MOTION_ORBIT = "/images/motion-orbit.svg";
const MARK = "/images/hero-mark.svg";

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);
const formatFa = (value: number, fractionDigits = 0) => new Intl.NumberFormat("fa-IR", { minimumFractionDigits: fractionDigits, maximumFractionDigits: fractionDigits }).format(value);

const DEFAULT_EASING = 0.085;

/** Position of an element in the document, ignoring transforms (reveal offsets, parallax). */
const documentTop = (element: HTMLElement) => {
  let top = 0;
  let node: HTMLElement | null = element;
  while (node) {
    top += node.offsetTop;
    node = node.offsetParent as HTMLElement | null;
  }
  return top;
};

const maxScroll = () => Math.max(document.documentElement.scrollHeight - window.innerHeight, 0);

export default function Home() {
  const shellRef = useRef<HTMLDivElement | null>(null);
  const easingRef = useRef(DEFAULT_EASING);
  const scrollToRef = useRef<(top: number) => void>((top) => window.scrollTo({ top, behavior: "auto" }));
  const [easing, setEasing] = useState(DEFAULT_EASING);
  const [smoothEnabled, setSmoothEnabled] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    easingRef.current = easing;
  }, [easing]);

  useEffect(() => {
    const shell = shellRef.current;
    if (!shell) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const touchDevice = window.matchMedia("(pointer: coarse)").matches;
    const shouldSmooth = smoothEnabled && !reducedMotion && !touchDevice;

    // The page keeps its real native scroll position (so sticky, fixed, anchors, keyboard and the
    // scrollbar all keep working); only the wheel is intercepted and eased towards its target.
    let current = window.scrollY;
    let target = window.scrollY;
    let animating = false;
    let frame = 0;
    let lastTime = 0;
    let lastReported = -1;
    let updateFrame = 0;

    const revealAndParallax = () => {
      document.querySelectorAll<HTMLElement>(".reveal:not(.is-visible)").forEach((section) => {
        const bounds = section.getBoundingClientRect();
        if (bounds.top < window.innerHeight * 0.84) section.classList.add("is-visible");
      });

      document.querySelectorAll<HTMLElement>(".parallax-card").forEach((card) => {
        const bounds = card.getBoundingClientRect();
        const centerOffset = bounds.top + bounds.height / 2 - window.innerHeight / 2;
        card.style.setProperty("--parallax-y", `${clamp(centerOffset * -0.042, -26, 26)}px`);
      });
    };

    const reportProgress = () => {
      const next = Math.round((window.scrollY / Math.max(maxScroll(), 1)) * 100);
      if (next !== lastReported) {
        lastReported = next;
        setScrollProgress(next);
      }
    };

    const update = () => {
      updateFrame = 0;
      revealAndParallax();
      reportProgress();
    };

    const requestUpdate = () => {
      if (!updateFrame) updateFrame = requestAnimationFrame(update);
    };

    const step = (time: number) => {
      const delta = lastTime ? Math.min(time - lastTime, 64) : 16.7;
      lastTime = time;
      const diff = target - current;
      if (Math.abs(diff) < 0.4) {
        current = target;
        window.scrollTo(0, current);
        animating = false;
        lastTime = 0;
        return;
      }
      // Frame-rate independent exponential easing; `easing` is the per-frame factor at 60fps.
      current += diff * (1 - Math.pow(1 - easingRef.current, delta / 16.7));
      window.scrollTo(0, current);
      frame = requestAnimationFrame(step);
    };

    const startLoop = () => {
      if (animating) return;
      animating = true;
      lastTime = 0;
      frame = requestAnimationFrame(step);
    };

    const onWheel = (event: WheelEvent) => {
      if (event.ctrlKey || event.metaKey || event.defaultPrevented) return;
      if (Math.abs(event.deltaX) > Math.abs(event.deltaY)) return;
      const unit = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? window.innerHeight : 1;
      event.preventDefault();
      target = clamp(target + event.deltaY * unit, 0, maxScroll());
      startLoop();
    };

    const onScroll = () => {
      // A scroll position that we did not write (scrollbar drag, keyboard, anchor) wins over the eased target.
      if (!animating || Math.abs(window.scrollY - current) > 2) {
        cancelAnimationFrame(frame);
        animating = false;
        current = target = window.scrollY;
      }
      requestUpdate();
    };

    const onResize = () => {
      target = clamp(target, 0, maxScroll());
      requestUpdate();
    };

    scrollToRef.current = (top) => {
      const destination = clamp(top, 0, maxScroll());
      if (shouldSmooth) {
        target = destination;
        startLoop();
      } else {
        window.scrollTo({ top: destination, behavior: reducedMotion ? "auto" : "smooth" });
      }
    };

    shell.dataset.smooth = shouldSmooth ? "true" : "false";
    const resizeObserver = new ResizeObserver(onResize);
    resizeObserver.observe(document.body);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    if (shouldSmooth) window.addEventListener("wheel", onWheel, { passive: false });
    update();

    return () => {
      cancelAnimationFrame(frame);
      cancelAnimationFrame(updateFrame);
      resizeObserver.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("wheel", onWheel);
      scrollToRef.current = (top) => window.scrollTo({ top, behavior: "auto" });
      shell.dataset.smooth = "false";
    };
  }, [smoothEnabled]);

  const goTo = (id: string) => {
    const element = document.getElementById(id);
    if (!element) return;
    scrollToRef.current(documentTop(element) - 28);
  };

  const resetLab = () => {
    setEasing(DEFAULT_EASING);
    setSmoothEnabled(true);
    window.scrollTo({ top: 0, behavior: "auto" });
  };

  return (
    <div className="lab-shell" ref={shellRef} data-smooth="true">
      <div className="smooth-content">
          <section className="hero-section" id="top">
            <HeroField />
            <img className="hero-art" src={HERO_FIELD} alt="" aria-hidden="true" />
            <header className="hero-header">
              <button className="mark-button" onClick={() => goTo("top")} aria-label="بازگشت به ابتدای صفحه">
                <img src={MARK} alt="" />
                <span>NeXTPixel Motion System</span>
              </button>
              <nav aria-label="ناوبری آزمایشگاه">
                <button onClick={() => goTo("ds-overview")}>سیستم</button>
                <button onClick={() => goTo("scroll")}>فناوری</button>
                <button onClick={() => goTo("controls")}>تنظیمات</button>
                <button onClick={() => goTo("reference-kit")}>کتابخانه</button>
              </nav>
              <div className="status-pill"><i /> میدان فعال</div>
            </header>

            <div className="hero-layout">
              <div className="hero-rail" aria-hidden="true">
                <span>۰۱</span>
                <div />
                <span>پیمایش / نشانگر</span>
              </div>
              <div className="hero-copy">
                <p className="micro-label">رابط‌های دیجیتال با حرکت هدفمند</p>
                <h1>حرکت را لمس کنید،<br /><em>نه این‌که فقط تماشا کنید.</em></h1>
                <p className="hero-description">این صحنه هم‌زمان اسکرول نرم، میدان ذرات واکنشی و نشانگر دارای اینرسی را آزمایش می‌کند. نشانگر را در بخش نخست حرکت دهید و سپس صفحه را اسکرول کنید.</p>
                <div className="hero-actions">
                  <Button className="lab-primary" onClick={() => goTo("scroll")}>
                    شروع آزمایش <ArrowDown size={16} />
                  </Button>
                  <button className="text-action" onClick={() => goTo("controls")}>
                    تنظیم حرکت <ArrowUpRight size={16} />
                  </button>
                </div>
              </div>
              <aside className="hero-readout" aria-label="داده‌های زندهٔ آزمایش">
                <span>اینرسی</span><strong>{formatFa(easing, 3)}</strong>
                <span>پیمایش</span><strong>{formatFa(scrollProgress)}٪</strong>
                <span>حالت</span><strong>{smoothEnabled ? "نرم" : "بومی"}</strong>
              </aside>
            </div>
            <div className="hero-footnote"><span /> حرکت موس برای میدان نیرو، پیمایش برای اینرسی</div>
          </section>

          <DesignSystemLanding onNavigate={goTo} />

          <section className="chapter chapter-scroll reveal" id="scroll">
            <div className="chapter-index">۰۲ <span>فیزیک پیمایش</span></div>
            <div className="chapter-copy">
              <p className="micro-label">رفتار اسکرول</p>
              <h2>محتوا به موقعیت واقعی صفحه نمی‌پرد؛ <em>با آن هم‌جهت می‌شود.</em></h2>
              <p>موقعیت native مرورگر به‌عنوان هدف نگه داشته می‌شود. یک حلقهٔ انیمیشن، محتوای صفحه را با درون‌یابی نمایی به آن هدف نزدیک می‌کند؛ در نتیجه حرکت، تأخیر ظریف اما قابل کنترل دارد.</p>
              <div className="formula" dir="ltr"><span>نمایش</span><i>→</i><b>lerp(جاری، بومی، نرمی)</b></div>
            </div>
            <figure className="scroll-figure parallax-card">
              <img src={SCROLL_FLOW} alt="لایه‌های انتزاعی جریان اسکرول" />
              <figcaption>دنبالهٔ لایه‌ها در مسیر اسکرول</figcaption>
            </figure>
          </section>

          <section className="specimen-band" id="field">
            <div className="band-heading reveal">
              <p className="micro-label">03 / میدان تعاملی</p>
              <h2>موس، یک حلقهٔ نیرو می‌سازد و ذرات را در مسیرش پراکنده می‌کند.</h2>
            </div>
            <div className="specimen-grid">
              <article className="specimen reveal parallax-card">
                <span className="specimen-number">A</span>
                <h3>ورودی</h3>
                <p>موقعیت نشانگر از فضای صفحه به مختصات محلی Hero تبدیل می‌شود.</p>
                <div className="specimen-line"><i /> موقعیت نشانگر</div>
              </article>
              <article className="specimen visual-specimen reveal parallax-card">
                <img src={MOTION_ORBIT} alt="مدار انتزاعی ذرات حول میدان نیرو" />
                <span className="image-caption">میدان نیروی محلی</span>
              </article>
              <article className="specimen reveal parallax-card">
                <span className="specimen-number">B</span>
                <h3>واکنش</h3>
                <p>شدت دافعه با فاصله کاهش می‌یابد و سرعت ذرات با damping کنترل می‌شود.</p>
                <div className="specimen-line"><i /> میرایی ۰٫۹۶۶</div>
              </article>
            </div>
          </section>

          <section className="controls-section reveal" id="controls">
            <div className="controls-title">
              <p className="micro-label">04 / کنترل زنده</p>
              <h2>حس حرکت را تغییر دهید.</h2>
              <p>این کنترل فقط برای تست است. مقدار کمتر، پیگیری سنگین‌تر و مقدار بالاتر، واکنش سریع‌تر ایجاد می‌کند.</p>
            </div>
            <div className="control-panel">
              <div className="control-top"><span>میزان اینرسی</span><strong>{easing.toFixed(3)}</strong></div>
              <input aria-label="میزان اینرسی اسکرول" type="range" min="0.035" max="0.18" step="0.005" value={easing} onChange={(event) => setEasing(Number(event.target.value))} />
              <div className="range-labels"><span>سنگین</span><span>مستقیم</span></div>
              <div className="toggle-row">
                <div><span>پیمایش نرم</span><small>{smoothEnabled ? "فعال روی دسکتاپ" : "پیمایش بومی"}</small></div>
                <button className={`lab-toggle ${smoothEnabled ? "is-on" : ""}`} onClick={() => setSmoothEnabled((value) => !value)} aria-pressed={smoothEnabled}><i /></button>
              </div>
              <Button variant="outline" className="reset-button" onClick={resetLab}><RotateCcw size={15} /> بازنشانی آزمایش</Button>
            </div>
          </section>

          <ReferenceEffectsKit onNavigate={goTo} />
          <ScrollReferenceModules />

          <section className="closing-section reveal">
            <div className="closing-mark"><Sparkles size={25} /></div>
            <p className="micro-label">READY FOR INTEGRATION</p>
            <h2>نسخهٔ تستی آمادهٔ مشاهده است.</h2>
            <Button className="lab-primary" onClick={() => goTo("top")}><Play size={15} fill="currentColor" /> اجرای دوباره</Button>
          </section>

          <footer>SMOOTH HERO LAB <span>•</span> آزمایش مستقل حرکت وب <span>•</span> 2026</footer>
      </div>
    </div>
  );
}
