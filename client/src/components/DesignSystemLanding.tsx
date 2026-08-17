import { ArrowUpRight, Blocks, BookOpen, Check, Grid3X3, Layers3, Sparkles, Zap } from "lucide-react";
import { componentContracts, designTokens } from "@/lib/designTokens";

type DesignSystemLandingProps = {
  onNavigate: (id: string) => void;
};

const principles = [
  { number: "01", title: "حرکت باید دلیل داشته باشد", text: "هر حرکت برای معرفی، بازخورد یا هدایت ساخته می‌شود؛ هیچ افکتی فقط برای پرکردن فضا نیست." },
  { number: "02", title: "یک سیستم، نه چند ویجت", text: "توکن‌ها و قواعد مشترک باعث می‌شوند هر صفحه ادامهٔ طبیعی صفحهٔ قبل باشد." },
  { number: "03", title: "شدت قابل کنترل است", text: "همهٔ حرکت‌ها با reduced motion سازگارند و به یک تریگر مشخص وابسته‌اند." },
];

const useCases = [
  ["لندینگ محصول", "Hero، روایت ارزش و CTAهای هدفمند بدون بار حرکتی اضافی.", "#315cff"],
  ["سایت برند", "حرکت‌های سرمقاله‌ای، لینک‌های زنده و تصویرهایی که داستان را حمل می‌کنند.", "#111521"],
  ["رابط محصول", "بازخورد کوتاه، حالت‌های شفاف و الگوهای دسترس‌پذیر برای جریان‌های پرتکرار.", "#d7ff4f"],
] as const;

export default function DesignSystemLanding({ onNavigate }: DesignSystemLandingProps) {
  return (
    <section className="design-system" id="ds-overview" dir="rtl">
      <section className="ds-manifesto">
        <div className="ds-section-label"><span>۰۱</span> سیستم طراحی و حرکت</div>
        <div className="ds-manifesto__main"><p className="micro-label">NeXTPixel Motion System</p><h2>یک زبان مشترک برای<br /><em>تصمیم، طراحی و اجرا.</em></h2></div>
        <div className="ds-manifesto__aside"><p>این فقط یک مجموعه انیمیشن نیست؛ یک سیستم زنده است که به تیم کمک می‌کند از اولین wireframe تا آخرین تعامل، یک زبان بصری ثابت داشته باشد.</p><button type="button" onClick={() => onNavigate("ds-foundations")}>مشاهدهٔ توکن‌ها <ArrowUpRight size={18} /></button></div>
        <div className="ds-manifesto__stats"><div><strong>۲۳</strong><span>الگوی حرکت</span></div><div><strong>۰</strong><span>وابستگی اجباری</span></div><div><strong>۱</strong><span>قرارداد مشترک</span></div></div>
      </section>

      <section className="ds-principles" id="ds-principles">
        <div className="ds-section-label"><span>۰۲</span> اصول</div>
        <div className="ds-principles__heading"><h2>قواعدی که قبل از هر افکت<br />تصمیم می‌گیرند.</h2><p>سیستم خوب دست طراح را نمی‌بندد؛ تصمیم‌های تکراری را از دوش او برمی‌دارد تا برای بخش‌های مهم‌تر، انرژی بیشتری باقی بماند.</p></div>
        <div className="ds-principles__list">{principles.map((item) => <article key={item.number}><span>{item.number}</span><h3>{item.title}</h3><p>{item.text}</p></article>)}</div>
      </section>

      <section className="ds-foundations" id="ds-foundations">
        <div className="ds-foundations__heading"><div className="ds-section-label"><span>۰۳</span> Foundations</div><h2>توکن‌های پایه؛<br />خارج از سلیقهٔ لحظه‌ای.</h2></div>
        <div className="ds-token-board">
          <article className="ds-token-board__lead"><Blocks size={22} /><h3>توکن‌ها منبع حقیقت‌اند.</h3><p>این مقادیر در CSS و لندینگ مشترک‌اند؛ هیچ بخش جداگانه‌ای رنگ یا easing شخصی ندارد.</p></article>
          <div className="ds-color-row">{designTokens.color.map((token) => <article key={token.name}><i style={{ background: token.value }} /><strong>{token.name}</strong><code>{token.value}</code><span>{token.usage}</span></article>)}</div>
          <div className="ds-type-row">{designTokens.type.map((token) => <article key={token.name}><span>{token.name}</span><strong>{token.value}</strong><p>{token.usage}</p></article>)}</div>
          <div className="ds-motion-row">{designTokens.motion.map((token) => <article key={token.name}><small>{token.name}</small><strong>{token.value}</strong><span>{token.usage}</span></article>)}</div>
        </div>
      </section>

      <section className="ds-components" id="ds-components">
        <div className="ds-components__heading"><div className="ds-section-label"><span>۰۴</span> Components</div><h2>کوچک، روشن و<br />قابل ترکیب.</h2></div>
        <div className="ds-component-grid">
          <article className="ds-component-card ds-component-card--button"><span className="ds-chip">Action</span><h3>دکمهٔ اصلی</h3><p>یک هدف روشن و بازخورد فوری.</p><button className="ds-button-demo" type="button">شروع یک پروژه <ArrowUpRight size={17} /></button></article>
          <article className="ds-component-card ds-component-card--card"><span className="ds-chip">Surface</span><h3>کارت اطلاعات</h3><p>سطحی با مرز روشن و hover مختصر.</p><div className="ds-mini-card"><span>ACTIVE</span><strong>نقطهٔ تماس</strong><i /></div></article>
          <article className="ds-component-card ds-component-card--link"><span className="ds-chip">Navigation</span><h3>لینک جهت‌دار</h3><p>معنا را منتقل می‌کند، نه فقط مسیر را.</p><button className="ds-link-demo" type="button" onClick={() => onNavigate("reference-kit")}>ورود به Effects Kit <ArrowUpRight size={17} /></button></article>
        </div>
        <div className="ds-contracts">{componentContracts.map((contract, index) => <article key={contract.name}><span>۰{index + 1}</span><strong>{contract.name}</strong><p>{contract.rule}</p><Check size={17} /></article>)}</div>
      </section>

      <section className="ds-use-cases">
        <div className="ds-section-label"><span>۰۵</span> کاربردها</div>
        <div className="ds-use-cases__intro"><h2>یک سیستم برای صفحات متفاوت؛<br />نه یک ظاهر تکراری.</h2><p>هر الگو در جای درست خودش کار می‌کند. ساختار ثابت است، اما میزان حرکت، روایت و تأکید با مسئله تغییر می‌کند.</p></div>
        <div className="ds-use-cases__grid">{useCases.map(([title, text, color], index) => <article style={{ "--case-color": color } as React.CSSProperties} key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{text}</p><i /></article>)}</div>
      </section>

      <section className="ds-cta">
        <div><Sparkles size={26} /><p className="micro-label">Ready for the build</p><h2>از سند به صحنهٔ واقعی بروید.</h2><p>Effects Kit تمام الگوهای اجرایی را با کد، رفتار و تریگرهای جداگانه نشان می‌دهد.</p></div>
        <button type="button" onClick={() => onNavigate("reference-kit")}><Grid3X3 size={19} /> باز کردن کتابخانهٔ حرکت</button>
      </section>

      <section className="ds-runtime"><div><Zap size={19} /><span>حرکت هدفمند</span></div><div><Layers3 size={19} /><span>اجزای قابل استفادهٔ مجدد</span></div><div><BookOpen size={19} /><span>سند قابل ارجاع</span></div></section>
    </section>
  );
}
