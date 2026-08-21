/* Style reminder: Fieldworks — تیره، سرزنده، آزمایشگاهی و متکی بر carouselهای تمام‌صفحه و کارت‌های اکتشافی. */
import { useEffect, useState } from "react";
import { ArrowDown, ArrowUpRight, ChevronLeft, ChevronRight, FlaskConical, Sparkles } from "lucide-react";

const heroExperiments = [
  { name: "Signal Room", description: "Compose audio worlds from a few words and a feeling.", accent: "#f4ab4c", visual: "sound" },
  { name: "Scene Forge", description: "Turn loose storyboards into vivid moving scenes.", accent: "#7b93ff", visual: "scene" },
  { name: "Brand Field", description: "Build a coherent visual language for every release.", accent: "#59e692", visual: "brand" },
  { name: "Interface Bloom", description: "Sketch a product flow and make it feel tangible.", accent: "#e77bd7", visual: "interface" },
] as const;

const experiments = [
  { name: "Dayline", description: "A private daily briefing tuned to your questions and signals.", color: "#628cff", shape: "circle" },
  { name: "Paper Trail", description: "Structure dense research into evidence, patterns and useful next steps.", color: "#f6d66b", shape: "stack" },
  { name: "Spark Gap", description: "Ask what is missing, then produce the first useful hypothesis.", color: "#ff8e83", shape: "spark" },
  { name: "Model Garden", description: "Explore code variations and compare them in a visual workspace.", color: "#78e6bd", shape: "garden" },
  { name: "Soft Stitch", description: "Go from a sentence to an editable interface with real structure.", color: "#d8a8ff", shape: "mesh" },
] as const;

const milestones = [
  ["Project Atlas", "Atlas", "Your research companion"],
  ["Frames", "Scene Forge", "A visual story studio"],
  ["Signal Draft", "Signal Room", "An audio composition space"],
  ["Palette Kit", "Brand Field", "A coherent marketing workspace"],
] as const;

const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

export default function LabsStudy() {
  const [heroIndex, setHeroIndex] = useState(0);
  const [cardIndex, setCardIndex] = useState(0);
  const hero = heroExperiments[heroIndex];

  useEffect(() => {
    const timer = window.setInterval(() => setHeroIndex((index) => (index + 1) % heroExperiments.length), 5200);
    return () => window.clearInterval(timer);
  }, []);

  const changeHero = (direction: number) => setHeroIndex((index) => (index + direction + heroExperiments.length) % heroExperiments.length);
  const changeCard = (direction: number) => setCardIndex((index) => (index + direction + experiments.length) % experiments.length);

  return (
    <main className="fieldworks" dir="ltr">
      <section className={`fw-hero fw-hero--${hero.visual}`} style={{ "--fw-accent": hero.accent } as React.CSSProperties} id="top">
        <nav className="fw-nav">
          <button className="fw-brand" type="button" onClick={() => scrollTo("top")}><FlaskConical size={23} /><span>Fieldworks</span></button>
          <div className="fw-nav__links"><button type="button" onClick={() => scrollTo("about")}>About</button><button type="button" onClick={() => scrollTo("experiments")}>Experiments</button><button type="button" onClick={() => scrollTo("connect")}>Stay connected</button></div>
          <div className="fw-nav__dots"><i /><i /><i /></div>
        </nav>

        <div className="fw-collage" aria-hidden="true"><div className="fw-collage__card fw-collage__card--one"><span>01</span><b /></div><div className="fw-collage__card fw-collage__card--two"><span>AI</span><b /></div><div className="fw-collage__card fw-collage__card--three"><span>∞</span><b /></div><div className="fw-collage__card fw-collage__card--four"><span>04</span><b /></div><div className="fw-collage__orb" /></div>

        <div className="fw-hero__content"><p>Independent experiment / 2026</p><h1>{hero.name}</h1><span>{hero.description}</span><button type="button" onClick={() => scrollTo("experiments")}>Explore experiment <ArrowUpRight size={18} /></button></div>
        <div className="fw-hero__controls"><button type="button" onClick={() => changeHero(-1)} aria-label="Previous experiment"><ChevronLeft /></button><div className="fw-progress">{heroExperiments.map((item, index) => <button type="button" key={item.name} className={index === heroIndex ? "is-active" : ""} onClick={() => setHeroIndex(index)} aria-label={`Show ${item.name}`} />)}</div><button type="button" onClick={() => changeHero(1)} aria-label="Next experiment"><ChevronRight /></button></div>
        <button className="fw-skip" type="button" onClick={() => scrollTo("experiments")}>Skip to next section <ArrowDown size={17} /></button>
      </section>

      <section className="fw-experiments" id="experiments">
        <div className="fw-shape fw-shape--blue" /><div className="fw-shape fw-shape--green" />
        <header className="fw-section-head"><p>FIELDWORKS / EXPERIMENTS</p><h2>Be first<br />to <em>explore.</em></h2><span>New tools are more useful when people can touch them early, question them, and help shape the next iteration.</span></header>
        <div className="fw-card-stage">{experiments.map((item, index) => {
          const position = (index - cardIndex + experiments.length) % experiments.length;
          const isActive = position === 0;
          const visible = position <= 2 || position === experiments.length - 1;
          return <article key={item.name} className={`fw-experiment-card ${isActive ? "is-active" : ""} ${visible ? "is-visible" : ""}`} style={{ "--card-color": item.color, "--card-position": position } as React.CSSProperties}><div className={`fw-card-art fw-card-art--${item.shape}`}><i /><i /><i /></div><h3>{item.name}</h3><p>{item.description}</p><button type="button">Learn more <ArrowUpRight size={16} /></button></article>;
        })}</div>
        <div className="fw-card-controls"><button type="button" onClick={() => changeCard(-1)} aria-label="Previous card"><ChevronLeft /></button><span>{String(cardIndex + 1).padStart(2, "0")} / {String(experiments.length).padStart(2, "0")}</span><button type="button" onClick={() => changeCard(1)} aria-label="Next card"><ChevronRight /></button></div>
      </section>

      <section className="fw-about" id="about"><div className="fw-about__badge"><Sparkles size={23} /></div><p>ABOUT FIELDWORKS</p><h2>Small experiments.<br />Real possibilities.</h2><div><p>Fieldworks is an independent place to try early AI ideas before they become ordinary tools. Each experiment begins with a practical question and improves through honest feedback.</p><button type="button" onClick={() => scrollTo("beyond")}>See how experiments evolve <ArrowDown size={17} /></button></div></section>

      <section className="fw-beyond" id="beyond"><header><p>LIFE BEYOND THE FIELD</p><h2>Good experiments<br />keep growing.</h2><span>Some sketches become durable products. This is what happens when an early idea finds the right people and a clearer reason to exist.</span></header><div className="fw-timeline">{milestones.map(([before, after, description], index) => <article key={before}><span>{String(index + 1).padStart(2, "0")}</span><div><small>{before}</small><i>→</i><h3>{after}</h3><p>{description}</p></div><button type="button">Open <ArrowUpRight size={17} /></button></article>)}</div></section>

      <section className="fw-connect" id="connect"><div><p>STAY CONNECTED</p><h2>Be close to<br />what comes next.</h2><span>Choose a path: receive early notes, or become part of the testing circle.</span></div><div className="fw-connect__choices"><button type="button"><small>01</small><strong>Notes from the field</strong><span>Occasional updates on new studies and releases.</span><ArrowUpRight size={20} /></button><button type="button"><small>02</small><strong>Join the testing circle</strong><span>Get invited to try a new experiment before launch.</span><ArrowUpRight size={20} /></button></div></section>

      <footer className="fw-footer"><button className="fw-brand" type="button" onClick={() => scrollTo("top")}><FlaskConical size={22} /><span>Fieldworks</span></button><div><a href="#about">About</a><a href="#experiments">Experiments</a><a href="#connect">Stay connected</a></div><p>Built as an independent interaction study.</p></footer>
    </main>
  );
}
