/* Style reminder: میدان آرام — این قفسه، منبع عناصر حرکتی پریمیوم با فضای سفید و رنگ Pulse Cobalt است. */
import { useEffect, useRef, useState } from "react";
import { ArrowUpLeft, ChevronDown, Plus } from "lucide-react";
import { splitCharacters } from "@/lib/premiumEffects";

export default function PremiumEffectsShelf() {
  const shelfRef = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    const shelf = shelfRef.current;
    if (!shelf) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setVisible(true);
        observer.disconnect();
      },
      { threshold: 0.18 },
    );
    observer.observe(shelf);
    return () => observer.disconnect();
  }, []);

  const label = splitCharacters("جزئیات را ببینید");
  const faqs = [
    ["Reveal چه‌طور فعال می‌شود؟", "کلاس fx-reveal تا ورود به viewport پنهان می‌ماند و سپس با opacity و translate ظاهر می‌شود."],
    ["آیا روی موبایل امن است؟", "تمام حرکت‌های پیوسته در prefers-reduced-motion کاهش می‌یابند و الگوها در صفحه‌های کوچک به یک ستون تبدیل می‌شوند."],
    ["چطور در بخش جدید استفاده کنم؟", "کلاس‌های نام‌دار fx را روی عنصر اضافه کنید یا از همین نمونه به‌عنوان الگوی JSX استفاده کنید."],
  ];

  return (
    <section ref={shelfRef} className={`premium-shelf ${visible ? "is-visible" : ""}`} id="effects-library">
      <header className="premium-shelf__head">
        <div>
          <p className="micro-label">05 / PREMIUM EFFECTS BASE</p>
          <h2>المنت‌های حرکت، مرتب و آمادهٔ استفاده.</h2>
        </div>
        <p>افکت‌های فایل مرجع به نام‌های کوتاه و مستقل تبدیل شدند تا هر زمان لازم بود، بدون آوردن CSS و runtime سنگین Webflow، در یک بخش جدید استفاده شوند.</p>
      </header>

      <div className="premium-shelf__grid">
        <article className="fx-card fx-reveal" style={{ "--fx-delay": "0ms" } as React.CSSProperties}>
          <span className="fx-card__index">FX-01</span>
          <h3>Reveal + Stagger</h3>
          <p>ورود آرام عناصر با جابه‌جایی کوتاه، برای معرفی‌ها و کارت‌های دارای اولویت.</p>
          <div className="fx-mini-stagger"><i /><i /><i /></div>
        </article>
        <article className="fx-card fx-reveal fx-card--cobalt" style={{ "--fx-delay": "110ms" } as React.CSSProperties}>
          <span className="fx-card__index">FX-02</span>
          <h3 className="fx-marker"><span>Marker wipe</span></h3>
          <p>برای یک خط کلیدی که نیاز به مکث دیداری و تأکید دارد.</p>
          <span className="fx-card__hint">ENTER ONCE</span>
        </article>
        <article className="fx-card fx-reveal" style={{ "--fx-delay": "220ms" } as React.CSSProperties}>
          <span className="fx-card__index">FX-03</span>
          <h3>Text swap</h3>
          <button className="fx-swap-button" type="button">
            <span className="fx-swap-button__surface" />
            <span className="fx-swap-button__lines" aria-label="جزئیات را ببینید">
              <span>{label.map((character, index) => <i key={`a-${index}`} style={{ "--i": index } as React.CSSProperties}>{character}</i>)}</span>
              <span aria-hidden="true">{label.map((character, index) => <i key={`b-${index}`} style={{ "--i": index } as React.CSSProperties}>{character}</i>)}</span>
            </span>
          </button>
        </article>
      </div>

      <div className="fx-marquee" aria-label="نمونهٔ marquee">
        <div className="fx-marquee__track">
          <span>REVEAL</span><b>✦</b><span>HOVER</span><b>✦</b><span>SCROLL</span><b>✦</b><span>PARALLAX</span><b>✦</b>
          <span aria-hidden="true">REVEAL</span><b aria-hidden="true">✦</b><span aria-hidden="true">HOVER</span><b aria-hidden="true">✦</b><span aria-hidden="true">SCROLL</span><b aria-hidden="true">✦</b><span aria-hidden="true">PARALLAX</span><b aria-hidden="true">✦</b>
        </div>
      </div>

      <div className="premium-shelf__bottom">
        <div className="fx-awards" aria-label="نمونهٔ hover row">
          {["پروژه‌های شاخص", "الگوی تعامل", "سیستم محتوا"].map((item, index) => (
            <button className="fx-award-row" key={item} type="button"><span>0{index + 1}</span><strong>{item}</strong><ArrowUpLeft size={18} /></button>
          ))}
        </div>
        <div className="fx-faq">
          {faqs.map(([question, answer], index) => {
            const isOpen = openFaq === index;
            return (
              <article className={`fx-faq__item ${isOpen ? "is-open" : ""}`} key={question}>
                <button type="button" onClick={() => setOpenFaq(isOpen ? null : index)} aria-expanded={isOpen}><span>{question}</span><Plus size={18} /></button>
                <div><p>{answer}</p></div>
              </article>
            );
          })}
        </div>
      </div>
      <a className="fx-arrow-link" href="#top"><span>بازگشت به میدان اصلی</span><ChevronDown size={18} /></a>
    </section>
  );
}
