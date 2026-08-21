import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";

import logo from "@/assets/villa-ledu-logo.png";
import { houseRules } from "@/data/house-rules";

export const Route = createFileRoute("/house-rules")({
  head: () => ({
    meta: [
      { title: "House Guidelines — Villa Ledu Samui" },
      {
        name: "description",
        content:
          "House guidelines for guests of Villa Ledu, Koh Samui — quiet hours, pool safety, energy care and more, in English, German, Spanish, French and Japanese.",
      },
      { property: "og:title", content: "Villa Ledu — House Guidelines" },
      {
        property: "og:description",
        content:
          "A few gentle guidelines to help every guest enjoy a peaceful stay at Villa Ledu.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: HouseRules,
});

const languages = [
  { code: "en", label: "English" },
  { code: "de", label: "Deutsch" },
  { code: "es", label: "Español" },
  { code: "fr", label: "Français" },
  { code: "ru", label: "Русский" },
  { code: "ja", label: "日本語" },
] as const;

const eyebrow: Record<string, string> = {
  en: "GUEST REFERENCE",
  de: "Gästeinformation",
  es: "Información para huéspedes",
  fr: "Informations invités",
  ru: "Правила проживания",
  ja: "ゲスト案内",
};

const intro: Record<string, string> = {
  en: "A few gentle guidelines so that every guest — and the villa itself — can rest easy. Please take a moment to read through before settling in.",
  de: "Einige freundliche Hinweise, damit sich jeder Gast — und die Villa selbst — wohlfühlen kann. Bitte nehmen Sie sich einen Moment Zeit zum Lesen.",
  es: "Unas pocas indicaciones amables para que cada huésped — y la villa misma — descansen tranquilos. Le rogamos que las lea antes de instalarse.",
  fr: "Quelques recommandations bienveillantes pour que chaque invité — et la villa elle-même — puissent se reposer sereinement. Merci de les lire avant de vous installer.",
  ru: "",
  ja: "すべてのお客様、そしてヴィラ自体が心地よく過ごせるよう、いくつかのお願いがございます。ご滞在前にお目通しください。",
};

const accents = ["summer", "rainy", "winter"] as const;
const accentClass = {
  summer: "text-summer",
  rainy: "text-rainy",
  winter: "text-winter",
} as const;

function HouseRules() {
  const [lang, setLang] = useState<string>("en");
  const content = houseRules[lang] ?? houseRules.en;

  return (
    <div className="min-h-screen bg-cream text-ink font-sans">
      {/* Nav */}
      <nav className="sticky top-0 z-40 bg-cream/85 backdrop-blur-md border-b border-ink/5">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="Villa Ledu" className="h-8 w-auto" />
            <span className="hidden sm:flex flex-col leading-none">
              <span className="font-serif italic text-lg">Villa Ledu</span>
              <span className="text-[10px] tracking-[0.3em] uppercase text-ink/50 mt-1">
                SAMUI
              </span>
            </span>
          </Link>
          <div className="flex items-center gap-2">
            <Link
              to="/appliance-guide"
              className="hidden sm:inline-flex text-[11px] font-medium uppercase tracking-[0.25em] border border-ink/20 px-4 py-2 rounded-full hover:bg-ink hover:text-cream transition-colors"
            >
              Appliances
            </Link>
            <Link
              to="/"
              className="text-[11px] font-medium uppercase tracking-[0.25em] border border-ink/20 px-4 py-2 rounded-full hover:bg-ink hover:text-cream transition-colors"
            >
              ← Villa
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <header className="px-6 md:px-10 pt-20 md:pt-28 pb-12 md:pb-16 border-b border-ink/10">
        <div className="max-w-[1400px] mx-auto">
          <span className="text-[11px] tracking-[0.45em] uppercase text-ink/50 block mb-8">
            {eyebrow[lang]}
          </span>
          <h1 className="font-serif text-5xl md:text-7xl leading-[1.02] tracking-tight text-balance max-w-4xl">
            {content.title.split("–")[1]?.trim() || content.title}
          </h1>
          <p className="mt-10 max-w-2xl text-stone-500 leading-relaxed text-base md:text-lg text-pretty">
            {intro[lang]}
          </p>

          {/* Language switcher */}
          <div className="mt-12 flex flex-wrap items-center gap-2">
            <span className="text-[10px] tracking-[0.35em] uppercase text-ink/40 mr-2">
              Language
            </span>
            {languages.map((l) => (
              <button
                key={l.code}
                type="button"
                onClick={() => setLang(l.code)}
                aria-pressed={lang === l.code}
                className={`px-4 py-2 rounded-full text-[12px] tracking-wide border transition-colors ${
                  lang === l.code
                    ? "bg-ink text-cream border-ink"
                    : "border-ink/20 text-ink/60 hover:text-ink hover:border-ink/40"
                }`}
              >
                {l.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Rules */}
      <main className="max-w-[1400px] mx-auto px-6 md:px-10 py-16 md:py-24">
        <ol className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
          {content.items.map((item, i) => {
            const accent = accents[i % accents.length];
            return (
              <li key={`${lang}-${i}`} className="min-w-0">
                <div className="flex items-baseline gap-3">
                  <span
                    className={`text-[10px] tracking-[0.25em] ${accentClass[accent]}`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h2 className="font-serif text-xl md:text-2xl leading-tight">
                    {item.title || item.text}
                  </h2>
                </div>
                {item.title && (
                  <p className="mt-3 text-stone-500 leading-relaxed text-[15px] text-pretty">
                    {item.text}
                  </p>
                )}
              </li>
            );
          })}
        </ol>
      </main>

      {/* Closing */}
      <section className="border-t border-ink/10 bg-winter-light/30 px-6 md:px-10 py-16 md:py-24">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-12 lg:gap-20">
          <p className="font-serif italic text-xl md:text-2xl leading-snug text-ink/85 text-pretty">
            {content.thanks}
          </p>
          <div className="border-t lg:border-t-0 lg:border-l border-ink/10 pt-8 lg:pt-0 lg:pl-12">
            <span className="text-[11px] tracking-[0.35em] uppercase font-medium text-rainy">
              {content.helpTitle}
            </span>
            <p className="mt-4 text-stone-500 leading-relaxed text-[15px] text-pretty">
              {content.helpText}
            </p>
          </div>
        </div>
      </section>

      <footer className="px-6 md:px-10 py-10 border-t border-ink/10">
        <div className="max-w-[1400px] mx-auto flex flex-wrap items-center justify-between gap-4 text-[11px] tracking-[0.25em] uppercase text-ink/40">
          <span>Villa Ledu · Koh Samui</span>
          <Link to="/appliance-guide" className="hover:text-ink transition-colors">
            Appliance Guide →
          </Link>
        </div>
      </footer>
    </div>
  );
}
