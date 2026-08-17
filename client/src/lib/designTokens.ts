export const designTokens = {
  color: [
    { name: "Ink", value: "#111521", usage: "متن اصلی و سطوح تیره" },
    { name: "Cobalt", value: "#315CFF", usage: "اقدام اصلی، دادهٔ فعال و حرکت" },
    { name: "Lime", value: "#D7FF4F", usage: "تأیید، pulse و تأکید کوتاه" },
    { name: "Paper", value: "#F7F7F3", usage: "پس‌زمینهٔ پایه و فضای تنفس" },
  ],
  type: [
    { name: "Display", value: "clamp(3.45rem, 8.3vw, 8.5rem)", usage: "Hero و پیام‌های کلیدی" },
    { name: "Section", value: "clamp(2.55rem, 5.1vw, 5.5rem)", usage: "تیتر بخش‌ها" },
    { name: "Body", value: "1rem / 2", usage: "بدنه و توضیحات" },
    { name: "Meta", value: "0.68rem", usage: "برچسب‌ها و دادهٔ فنی" },
  ],
  motion: [
    { name: "Enter", value: "800ms", usage: "ورود بخش‌های اصلی" },
    { name: "Hover", value: "180–350ms", usage: "پاسخ مستقیم به اشاره‌گر" },
    { name: "Scroll", value: "یک observer برای هر صحنه", usage: "افکت‌های viewport" },
    { name: "Reduced", value: "0.01ms", usage: "حالت کاهش حرکت" },
  ],
} as const;

export const componentContracts = [
  { name: "Button", rule: "فقط یک CTA اصلی در هر قاب؛ active با scale(0.97)." },
  { name: "Card", rule: "لایهٔ محتوا، یک لبهٔ واضح و یک حرکت اصلی در hover." },
  { name: "Label", rule: "متن متا کوتاه، کوچک و قابل اسکن؛ نه عنوان دوم." },
  { name: "Motion", rule: "هر صحنه فقط یک دلیل حرکتی دارد و در reduced motion متوقف می‌شود." },
] as const;
