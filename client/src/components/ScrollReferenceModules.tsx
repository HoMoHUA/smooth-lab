import { useEffect, useRef, useState } from "react";
import { Layers3, MousePointer2, Sparkles } from "lucide-react";

const clamp = (min: number, value: number, max: number) => Math.min(max, Math.max(min, value));

export default function ScrollReferenceModules() {
  const bentoRef = useRef<HTMLElement | null>(null);
  const popRef = useRef<HTMLElement | null>(null);
  const [exploded, setExploded] = useState(false);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      const bento = bentoRef.current;
      const pop = popRef.current;
      if (bento) {
        const rect = bento.getBoundingClientRect();
        const progress = clamp(0, (window.innerHeight - rect.top) / (window.innerHeight + rect.height), 1);
        bento.style.setProperty("--bento-progress", String(progress));
      }
      if (pop) {
        const rect = pop.getBoundingClientRect();
        const progress = clamp(0, (window.innerHeight - rect.top) / (window.innerHeight + rect.height), 1);
        pop.style.setProperty("--pop-progress", String(progress));
      }
      frame = 0;
    };
    const request = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", request, { passive: true });
    window.addEventListener("resize", request);
    return () => {
      window.removeEventListener("scroll", request);
      window.removeEventListener("resize", request);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section className="scroll-reference" dir="rtl">
      <section ref={bentoRef} className="bento-reference" id="sticky-bento">
        <div className="bento-reference__heading"><p>افکت افزودهٔ ۰۱ / Sticky Bento</p><h2>یک صحنهٔ چسبان که با اسکرول، لایه‌های خودش را باز می‌کند.</h2></div>
        <div className="bento-reference__stage">
          <div className="bento-reference__spacer" />
          <article className="bento-reference__note"><div><span><Sparkles size={19} /></span><p>تقریباً تمام رفتار با <b>sticky positioning</b> ساخته شده است؛ انیمیشن فقط عمق و خروج مرحله‌ای را اضافه می‌کند.</p></div></article>
          <div className="bento-reference__sticky"><div className="bento-reference__phone"><span className="bento-reference__notch" /><div className="bento-reference__chat"><i /><i /><i /><b>اهلاً، آماده‌ایم.</b></div></div></div>
          <article className="bento-reference__note bento-reference__note--second"><div><span><Layers3 size={19} /></span><p>با پیشرفت صحنه، پنل، تصویر و اشیای اطراف روی محور مستقل حرکت می‌کنند.</p></div></article>
          <div className="bento-reference__bento" aria-hidden="true"><i /><i /><i /><i /></div>
          <div className="bento-reference__sticks" aria-hidden="true"><i /><i /></div>
        </div>
      </section>

      <section ref={popRef} className="pop-reference" id="pop-out-image" data-exploded={exploded ? "true" : undefined}>
        <div className="pop-reference__heading"><p>افکت افزودهٔ ۰۲ / Pop-out Image</p><h2>تصویر درون قاب می‌ماند؛ سوژه از قاب خارج می‌شود.</h2><button type="button" onClick={() => setExploded((value) => !value)}><MousePointer2 size={17} /> {exploded ? "بازگشت لایه‌ها" : "حالت Explode"}</button></div>
        <div className="pop-reference__scene">
          <div className="pop-reference__image">
            <figure><img src="/manus-storage/skate-action_4a036faa.jpg" alt="اسکیت‌بردباز در حال پرش" /></figure>
            <figure aria-hidden="true"><img src="/manus-storage/skate-cutout_4b9fa6c1.png" alt="" /></figure>
          </div>
          <div className="pop-reference__caption"><span>Scroll-linked layers</span><strong>EXTREME</strong></div>
        </div>
      </section>
    </section>
  );
}
