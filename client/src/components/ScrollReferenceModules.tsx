/* Style reminder: صحنه‌های اسکرول — Sticky Bento و Pop-out Image با Framer Motion، هم‌گام با اسکرول نرم صفحه. */
import { useRef, useState } from "react";
import { motion, useSpring, useTransform, type MotionValue } from "framer-motion";
import { BatteryFull, Layers3, MessageCircle, MousePointer2, Signal, Sparkles } from "lucide-react";
import { TextEffectInView as TextEffect } from "@/components/motion/text-effect-in-view";
import { usePinnedTrack, useViewportProgress } from "@/motion/visualScroll";
import "@/styles/scroll-modules.css";

const SCENE = "/images/popout-scene.webp";
const SUBJECT = "/images/popout-subject.webp";

/** Maps a slice of the track's progress onto values, e.g. range(p, [0.2, 0.5], [40, 0]). */
const useRange = (progress: MotionValue<number>, input: number[], output: number[]) => useTransform(progress, input, output, { clamp: true });

function StickyBento() {
  const track = useRef<HTMLElement | null>(null);
  const { progress: raw, offset } = usePinnedTrack(track);
  const progress = useSpring(raw, { stiffness: 140, damping: 26, mass: 0.4 });

  const phoneScale = useRange(progress, [0, 0.35, 1], [1.12, 1, 0.92]);
  const phoneRotate = useRange(progress, [0, 0.35], [-8, 0]);
  const noteOneX = useRange(progress, [0.05, 0.3], [-120, 0]);
  const noteOneOpacity = useRange(progress, [0.05, 0.25, 0.7, 0.85], [0, 1, 1, 0]);
  const noteTwoX = useRange(progress, [0.3, 0.55], [120, 0]);
  const noteTwoOpacity = useRange(progress, [0.3, 0.5, 0.75, 0.9], [0, 1, 1, 0]);
  const tilesOpacity = useRange(progress, [0.55, 0.8], [0, 1]);
  const tilesSpread = useRange(progress, [0.55, 0.95], [0, 1]);
  const bubbles = [useRange(progress, [0.12, 0.22], [0, 1]), useRange(progress, [0.22, 0.32], [0, 1]), useRange(progress, [0.32, 0.42], [0, 1])];
  const barWidth = useTransform(raw, (value) => `${value * 100}%`);

  return (
    <section ref={track} className="sm-bento" id="sticky-bento">
      <motion.div className="sm-bento__stage" style={{ y: offset }}>
        <div className="sm-bento__head">
          <p>صحنهٔ اسکرول ۰۱ / Sticky Bento</p>
          <TextEffect as="h2" per="word" preset="fade-in-blur">صحنه‌ای ثابت که با اسکرول، لایه‌هایش را باز می‌کند.</TextEffect>
        </div>
        <div className="sm-bento__scene">
          {[0, 1, 2, 3].map((index) => (
            <BentoTile key={index} index={index} opacity={tilesOpacity} spread={tilesSpread} />
          ))}
          <motion.div className="sm-phone" style={{ scale: phoneScale, rotate: phoneRotate }}>
            <div className="sm-phone__status"><span>۹:۴۱</span><span><Signal size={12} /> <BatteryFull size={14} /></span></div>
            <div className="sm-phone__chat">
              <motion.p style={{ opacity: bubbles[0], y: useTransform(bubbles[0], [0, 1], [12, 0]) }}>سلام! صحنه آماده است؟</motion.p>
              <motion.p className="is-me" style={{ opacity: bubbles[1], y: useTransform(bubbles[1], [0, 1], [12, 0]) }}>بله، لایه‌ها را باز می‌کنیم.</motion.p>
              <motion.p style={{ opacity: bubbles[2], y: useTransform(bubbles[2], [0, 1], [12, 0]) }}>عالی، اسکرول کن ✨</motion.p>
            </div>
            <div className="sm-phone__input"><MessageCircle size={14} /> پیام…</div>
          </motion.div>
          <motion.article className="sm-note sm-note--one" style={{ x: noteOneX, opacity: noteOneOpacity }}>
            <span><Sparkles size={18} /></span>
            <p>صحنه با یک <b>پیشرفت اسکرول</b> کنترل می‌شود؛ بدون position: sticky و هم‌گام با اسکرول نرم.</p>
          </motion.article>
          <motion.article className="sm-note sm-note--two" style={{ x: noteTwoX, opacity: noteTwoOpacity }}>
            <span><Layers3 size={18} /></span>
            <p>هر لایه بازهٔ خودش را از همان پیشرفت می‌گیرد و با <b>spring</b> نرم می‌شود.</p>
          </motion.article>
        </div>
        <div className="sm-bento__bar"><motion.i style={{ width: barWidth }} /></div>
      </motion.div>
    </section>
  );
}

function BentoTile({ index, opacity, spread }: { index: number; opacity: MotionValue<number>; spread: MotionValue<number> }) {
  const vectors = [[-1, -1], [1, -1], [-1, 1], [1, 1]][index];
  const x = useTransform(spread, (value) => `${vectors[0] * value * 150}%`);
  const y = useTransform(spread, (value) => `${vectors[1] * value * 70}%`);
  const rotate = useTransform(spread, (value) => vectors[0] * vectors[1] * value * 6);
  const labels = ["حرکت", "تایپ", "رنگ", "لایه"];
  return (
    <motion.div className={`sm-tile sm-tile--${index}`} style={{ x, y, rotate, opacity }}>
      <b>{labels[index]}</b>
    </motion.div>
  );
}

function PopOutImage() {
  const section = useRef<HTMLElement | null>(null);
  const raw = useViewportProgress(section);
  const progress = useSpring(raw, { stiffness: 120, damping: 24, mass: 0.5 });
  const [exploded, setExploded] = useState(false);

  const sceneScale = useRange(progress, [0.15, 0.6], [1.18, 1]);
  const subjectScale = useRange(progress, [0.15, 0.6], [1, 1.16]);
  const subjectY = useRange(progress, [0.15, 0.6], [6, -9]);
  const captionY = useRange(progress, [0.1, 0.7], [60, -10]);
  const captionOpacity = useRange(progress, [0.15, 0.4], [0, 1]);
  const frameRotate = useRange(progress, [0, 0.5], [6, 0]);

  const layer = { type: "spring", stiffness: 140, damping: 18 } as const;

  return (
    <section ref={section} className="sm-pop" id="pop-out-image" data-exploded={exploded || undefined}>
      <div className="sm-pop__head">
        <p>صحنهٔ اسکرول ۰۲ / Pop-out Image</p>
        <TextEffect as="h2" per="word" preset="fade-in-blur">تصویر درون قاب می‌ماند؛ سوژه از قاب بیرون می‌پرد.</TextEffect>
        <button type="button" onClick={() => setExploded((value) => !value)} aria-pressed={exploded}>
          <MousePointer2 size={17} /> {exploded ? "بازگشت لایه‌ها" : "نمایش لایه‌ها"}
        </button>
      </div>
      <motion.div className="sm-pop__stage" style={{ rotateX: frameRotate }}>
        <motion.figure className="sm-pop__frame" animate={exploded ? { rotateY: -24, rotateX: 10, x: "-6%", z: -120 } : { rotateY: 0, rotateX: 0, x: "0%", z: 0 }} transition={layer}>
          <motion.img src={SCENE} alt="کرکسی با بال‌های باز در حال فرود" style={{ scale: sceneScale }} />
        </motion.figure>
        <motion.p className="sm-pop__caption" dir="ltr" style={{ y: captionY, opacity: captionOpacity }} animate={exploded ? { rotateY: -24, x: "2%", z: 40 } : { rotateY: 0, x: "0%", z: 0 }} transition={layer} aria-hidden="true">
          SOAR
        </motion.p>
        <motion.figure className="sm-pop__subject" aria-hidden="true" animate={exploded ? { rotateY: -24, rotateX: 10, x: "10%", z: 180 } : { rotateY: 0, rotateX: 0, x: "0%", z: 0 }} transition={layer}>
          <motion.img src={SUBJECT} alt="" style={{ scale: subjectScale, y: useTransform(subjectY, (value) => `${value}%`) }} />
        </motion.figure>
      </motion.div>
      <p className="sm-pop__credit">عکس: Niko Virtanen / Unsplash — پس‌زمینهٔ سوژه با rembg جدا شده است.</p>
    </section>
  );
}

export default function ScrollReferenceModules() {
  return (
    <section className="sm" dir="rtl">
      <StickyBento />
      <PopOutImage />
    </section>
  );
}
