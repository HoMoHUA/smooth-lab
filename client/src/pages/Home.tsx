/* Style reminder: میدان آرام — ساختار سرمقاله‌ای روشن با رنگ Pulse Cobalt و حرکت کنترل‌شده. */
import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowUpRight, Play, RotateCcw, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import HeroField from "@/components/HeroField";
import ReferenceEffectsKit from "@/components/ReferenceEffectsKit";
import ScrollReferenceModules from "@/components/ScrollReferenceModules";

const HERO_FIELD = "/manus-storage/smooth-hero-field_d446afec.png";
const SCROLL_FLOW = "/manus-storage/smooth-scroll-flow_bf4d4b9e.png";
const MOTION_ORBIT = "/manus-storage/smooth-motion-orbit_8316edb1.png";
const MARK = "/manus-storage/smooth-hero-mark_fccd07e6.png";

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);
const formatFa = (value: number, fractionDigits = 0) => new Intl.NumberFormat("fa-IR", { minimumFractionDigits: fractionDigits, maximumFractionDigits: fractionDigits }).format(value);

export default function Home() {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const easingRef = useRef(0.085);
  const visualScrollRef = useRef(0);
  const [easing, setEasing] = useState(0.085);
  const [smoothEnabled, setSmoothEnabled] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    easingRef.current = easing;
  }, [easing]);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const content = contentRef.current;
    const track = trackRef.current;
    if (!wrapper || !content || !track) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const touchDevice = window.matchMedia("(pointer: coarse)").matches;
    const shouldSmooth = smoothEnabled && !reducedMotion && !touchDevice;
    let frame = 0;
    let current = window.scrollY;
    let target = window.scrollY;
    let lastReported = -1;

    const refreshHeight = () => {
      track.style.height = shouldSmooth ? `${content.scrollHeight}px` : "0px";
    };

    const revealAndParallax = () => {
      document.querySelectorAll<HTMLElement>(".reveal").forEach((section) => {
        const bounds = section.getBoundingClientRect();
        if (bounds.top < window.innerHeight * 0.84) section.classList.add("is-visible");
      });

      document.querySelectorAll<HTMLElement>(".parallax-card").forEach((card) => {
        const bounds = card.getBoundingClientRect();
        const centerOffset = bounds.top + bounds.height / 2 - window.innerHeight / 2;
        card.style.setProperty("--parallax-y", `${clamp(centerOffset * -0.042, -26, 26)}px`);
      });
    };

    const reportProgress = (value: number) => {
      const max = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
      const next = Math.round((value / max) * 100);
      if (Math.abs(next - lastReported) > 1) {
        lastReported = next;
        setScrollProgress(next);
      }
    };

    const onScroll = () => {
      target = window.scrollY;
      visualScrollRef.current = target;
      if (!shouldSmooth) {
        revealAndParallax();
        reportProgress(target);
      }
    };

    const observer = new ResizeObserver(refreshHeight);
    observer.observe(content);
    const mutationObserver = new MutationObserver(() => requestAnimationFrame(refreshHeight));
    mutationObserver.observe(content, { childList: true, subtree: true });
    refreshHeight();
    const settleHeight = window.setTimeout(refreshHeight, 180);
    revealAndParallax();
    reportProgress(target);
    window.addEventListener("resize", refreshHeight);
    window.addEventListener("scroll", onScroll, { passive: true });

    if (shouldSmooth) {
      wrapper.dataset.smooth = "true";
      const tick = () => {
        current += (target - current) * easingRef.current;
        if (Math.abs(target - current) < 0.1) current = target;
        visualScrollRef.current = current;
        content.style.transform = `translate3d(0, ${-current}px, 0)`;
        revealAndParallax();
        reportProgress(current);
        frame = requestAnimationFrame(tick);
      };
      tick();
    } else {
      wrapper.dataset.smooth = "false";
      content.style.transform = "translate3d(0, 0, 0)";
    }

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      mutationObserver.disconnect();
      window.clearTimeout(settleHeight);
      window.removeEventListener("resize", refreshHeight);
      window.removeEventListener("scroll", onScroll);
      wrapper.dataset.smooth = "false";
      content.style.transform = "translate3d(0, 0, 0)";
    };
  }, [smoothEnabled]);

  const goTo = (id: string) => {
    const target = document.getElementById(id);
    if (!target) return;
    const destination = target.getBoundingClientRect().top + visualScrollRef.current - 28;
    window.scrollTo({ top: destination, behavior: smoothEnabled ? "auto" : "smooth" });
  };

  const resetLab = () => {
    setEasing(0.085);
    setSmoothEnabled(true);
    requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: "auto" }));
  };

  return (
    <div className="lab-shell">
      <div className="scroll-track" ref={trackRef} aria-hidden="true" />
      <div className="smooth-wrapper" ref={wrapperRef}>
        <div className="smooth-content" ref={contentRef}>
          <section className="hero-section" id="top">
            <HeroField />
            <img className="hero-art" src={HERO_FIELD} alt="" aria-hidden="true" />
            <header className="hero-header">
              <button className="mark-button" onClick={() => goTo("top")} aria-label="بازگشت به ابتدای صفحه">
                <img src={MARK} alt="" />
                <span>Smooth Hero Lab</span>
              </button>
              <nav aria-label="ناوبری آزمایشگاه">
                <button onClick={() => goTo("scroll")}>اسکرول</button>
                <button onClick={() => goTo("field")}>میدان</button>
                <button onClick={() => goTo("controls")}>کنترل‌ها</button>
                <button onClick={() => goTo("reference-kit")}>۲۳ افکت</button>
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
    </div>
  );
}
