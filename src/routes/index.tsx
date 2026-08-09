import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import logo from "@/assets/villa-ledu-logo.png";
import heroAerial from "@/assets/hero-aerial.jpg";
import villaSummer from "@/assets/villa-summer.jpg";
import villaRainy from "@/assets/villa-rainy.jpg";
import villaWinter from "@/assets/villa-winter.jpg";
import experienceEvening from "@/assets/experience-evening.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Villa Ledu — Three Seasons, One Island, Endless Calm" },
      {
        name: "description",
        content:
          "Three detached villas — Summer, Rainy, Winter — on Koh Samui, Thailand. A seasonal sanctuary for short escapes and long stays.",
      },
      { property: "og:title", content: "Villa Ledu — Three Seasons, One Island, Endless Calm" },
      {
        property: "og:description",
        content: "Three detached villas — Summer, Rainy, Winter — on Koh Samui, Thailand. A seasonal sanctuary for short escapes and long stays.",
      },
      { property: "og:image", content: heroAerial },
      { name: "twitter:image", content: heroAerial },
    ],
  }),
  component: Index,
});

type Villa = {
  key: "summer" | "rainy" | "winter";
  name: string;
  thai: string;
  meaning: string;
  blurb: string;
  image: string;
  nightly: string;
  monthly: string;
  beds: string;
  accent: string; // tailwind color token name
};

const villas: Villa[] = [
  {
    key: "summer",
    name: "Summer",
    thai: "ฤดูร้อน",
    meaning: "The Radiant Season",
    blurb:
      "Drenched in golden light and open to the sea breeze. Coral-toned stone, retractable louvres, and a salt pool angled at the western sunset.",
    image: villaSummer,
    nightly: "฿14,500",
    monthly: "฿280,000",
    beds: "2 beds · sleeps 4",
    accent: "summer",
  },
  {
    key: "rainy",
    name: "Rainy",
    thai: "ฤดูฝน",
    meaning: "The Verdant Season",
    blurb:
      "A contemplative pavilion wrapped in banana palm and frangipani. Deep overhangs catch the monsoon — the rain becomes the soundtrack.",
    image: villaRainy,
    nightly: "฿12,800",
    monthly: "฿245,000",
    beds: "2 beds · sleeps 4",
    accent: "rainy",
  },
  {
    key: "winter",
    name: "Winter",
    thai: "ฤดูหนาว",
    meaning: "The Azure Season",
    blurb:
      "Cool, calm, collected. Light timber, indigo linens, and a long horizontal window framing the clearest sea of the year. Built for long stays.",
    image: villaWinter,
    nightly: "฿13,600",
    monthly: "฿260,000",
    beds: "2 beds · sleeps 4 · workspace",
    accent: "winter",
  },
];

function Index() {
  const main = useRef<HTMLDivElement>(null);
  const heroVideo = useRef<HTMLVideoElement>(null);
  const heroTitle = useRef<HTMLHeadingElement>(null);
  const [navSolid, setNavSolid] = useState(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Hero entrance
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
      tl.from(".hero-eyebrow", { y: 20, opacity: 0, duration: 1.1 })
        .from(
          ".hero-word",
          { y: 80, opacity: 0, duration: 1.3, stagger: 0.08 },
          "-=0.8",
        )
        .from(".hero-sub", { y: 20, opacity: 0, duration: 1 }, "-=0.7")
        .from(".hero-scroll", { opacity: 0, duration: 1 }, "-=0.4");

      // Hero parallax
      if (heroVideo.current) {
        gsap.to(heroVideo.current, {
          yPercent: 18,
          ease: "none",
          scrollTrigger: {
            trigger: ".hero",
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      // Generic reveal
      gsap.utils.toArray<HTMLElement>(".reveal").forEach((el) => {
        gsap.fromTo(
          el,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.1,
            ease: "expo.out",
            scrollTrigger: { trigger: el, start: "top 85%" },
          },
        );
      });

      // Villa cards parallax image
      gsap.utils.toArray<HTMLElement>(".villa-card").forEach((card) => {
        const img = card.querySelector<HTMLElement>(".villa-img");
        if (!img) return;
        gsap.fromTo(
          img,
          { yPercent: -8 },
          {
            yPercent: 8,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        );
      });

      // Season color wash on body as user scrolls villas
      const seasonColors: Record<string, string> = {
        summer: "#FDE7C0",
        rainy: "#DCF2C5",
        winter: "#D6E2F2",
      };
      villas.forEach((v) => {
        ScrollTrigger.create({
          trigger: `#villa-${v.key}`,
          start: "top 40%",
          end: "bottom 40%",
          onEnter: () => gsap.to(".season-wash", { backgroundColor: seasonColors[v.key], duration: 1.2 }),
          onEnterBack: () => gsap.to(".season-wash", { backgroundColor: seasonColors[v.key], duration: 1.2 }),
          onLeave: () => gsap.to(".season-wash", { backgroundColor: "#F8F6F0", duration: 1.2 }),
          onLeaveBack: () => gsap.to(".season-wash", { backgroundColor: "#F8F6F0", duration: 1.2 }),
        });
      });

    }, main);

    const onScroll = () => setNavSolid(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => {
      ctx.revert();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div ref={main} className="relative bg-cream text-ink font-sans overflow-x-clip">
      {/* Season color wash backdrop */}
      <div
        className="season-wash pointer-events-none fixed inset-0 -z-10 transition-colors"
        style={{ backgroundColor: "#F8F6F0" }}
      />

      {/* Nav */}
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          navSolid
            ? "bg-cream/85 backdrop-blur-md border-b border-ink/5 py-4"
            : "py-6"
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 flex items-center justify-between">
          <a href="#top" className="flex items-center gap-3">
            <img src={logo} alt="Villa Ledu" className="h-8 w-auto" />
            <span className="hidden sm:flex flex-col leading-none">
              <span className="font-serif italic text-lg">Villa Ledu</span>
              <span className="text-[10px] tracking-[0.3em] uppercase text-ink/50 mt-1">
                Samui
              </span>
            </span>
          </a>
          <div className="hidden md:flex gap-10 text-[11px] font-medium uppercase tracking-[0.25em]">
            <a href="#philosophy" className="hover:text-summer transition-colors">Philosophy</a>
            <a href="#villas" className="hover:text-rainy transition-colors">Villas</a>
            <a href="#experience" className="hover:text-winter transition-colors">Stay</a>
            <a href="#contact" className="hover:opacity-60 transition-opacity">Contact</a>
          </div>
          <a
            href="#contact"
            className="text-[11px] font-medium uppercase tracking-[0.25em] border border-ink/20 px-4 py-2 rounded-full hover:bg-ink hover:text-cream transition-colors"
          >
            Inquire
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section id="top" className="hero relative h-screen min-h-[640px] w-full overflow-hidden">
        <div className="absolute inset-0">
          <video
            ref={heroVideo}
            src="/interior-villa-ledu-hero.mp4"
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-[115%] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ink/30 via-ink/10 to-ink/60" />
        </div>

        <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 text-center text-cream">
          <span className="hero-eyebrow text-[10px] sm:text-xs tracking-[0.45em] uppercase font-light mb-8 opacity-90">
            KOH SAMUI · THAILAND
          </span>
          <h1 className="font-serif italic text-[15vw] md:text-[8.5rem] leading-[0.95] tracking-tight">
            <span className="hero-word inline-block">Villa</span>{" "}
            <span className="hero-word inline-block">Ledu</span>
          </h1>
          <p className="hero-sub mt-8 max-w-md text-sm md:text-base font-light tracking-[0.18em] uppercase opacity-90">
            Three seasons · One island · Endless calm
          </p>
        </div>

        <div className="hero-scroll absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-cream/70">
          <span className="text-[10px] tracking-[0.3em] uppercase">Scroll</span>
          <div className="w-px h-14 bg-cream/40" />
        </div>
      </section>


      {/* Philosophy */}
      <section id="philosophy" className="py-32 md:py-44 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <span className="reveal text-summer font-medium tracking-[0.35em] uppercase text-[11px] mb-10 block">
            OUR PHILOSOPHY
          </span>
          <h2 className="reveal font-serif text-4xl md:text-6xl leading-[1.1] mb-12 text-balance">
            <em>Ledu</em> is the Thai word for season. We built three villas to honour the
            way Samui breathes through the year.
          </h2>
          <p className="reveal text-stone-500 leading-relaxed text-base md:text-lg max-w-2xl mx-auto text-pretty">
            On a quiet hillside above the Gulf of Thailand, three detached
            residences sit among coconut palms — each tuned to the light,
            atmosphere, and spirit of one season. Summer for the sunseekers.
            Rainy for the dreamers. Winter for those who want to stay a while.
          </p>
        </div>
      </section>

      {/* Villas */}
      <section id="villas" className="pb-32">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 mb-16 flex items-end justify-between reveal">
          <div>
            <span className="text-[11px] tracking-[0.35em] uppercase text-ink/50 block mb-4">
              The Three Villas
            </span>
            <h3 className="font-serif text-4xl md:text-5xl leading-tight">
              Gallery
            </h3>
          </div>
          <span className="hidden md:block font-serif italic text-lg text-ink/40">
            Scroll sideways →
          </span>
        </div>

        <div className="reveal">
          <div
            className="overflow-x-auto overflow-y-hidden pb-6 px-6 md:px-10 [scrollbar-width:thin]"
            aria-label="Villa Ledu photo gallery"
          >
            <div className="grid grid-rows-2 grid-flow-col auto-cols-[70vw] sm:auto-cols-[42vw] lg:auto-cols-[26vw] gap-4 md:gap-6 w-max">
              {galleryItems.map((item, i) => (
                <figure
                  key={item.src}
                  className={`group relative overflow-hidden bg-white border border-ink/5 ${
                    item.span === "tall" ? "row-span-2" : "row-span-1"
                  } ${item.span === "wide" ? "col-span-2" : ""}`}
                >
                  <img
                    src={item.src}
                    alt={item.caption || `Villa Ledu gallery image ${i + 1}`}
                    loading={i < 3 ? "eager" : "lazy"}
                    className={`w-full object-cover transition-transform duration-1000 group-hover:scale-105 ${
                      item.span === "tall" ? "h-[62vh]" : "h-[30vh]"
                    }`}
                  />
                  {item.caption ? (
                    <figcaption className="absolute bottom-0 left-0 right-0 p-4 text-[10px] uppercase tracking-[0.25em] text-cream bg-gradient-to-t from-ink/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      {item.caption}
                    </figcaption>
                  ) : null}
                </figure>
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* Experience / Long stay */}
      <section id="experience" className="bg-ink text-cream py-32 md:py-44 px-6 overflow-hidden">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 md:gap-24 items-center">
          <div>
            <span className="reveal text-summer font-medium tracking-[0.35em] uppercase text-[11px] mb-8 block">
              The Stay
            </span>
            <h2 className="reveal font-serif text-4xl md:text-6xl leading-[1.05] mb-10">
              Your seasonal home in Samui — for a night, a month, a chapter.
            </h2>
            <ul className="space-y-8">
              {[
                {
                  n: "01",
                  c: "summer",
                  t: "Private Infinity Pool",
                  d: "Each villa opens onto its own salt-water pool angled at the Gulf of Thailand.",
                },
                {
                  n: "02",
                  c: "rainy",
                  t: "Chef on Demand",
                  d: "A resident Thai chef can be booked nightly — market produce, sea to table.",
                },
                {
                  n: "03",
                  c: "winter",
                  t: "Long-stay Residency",
                  d: "Fiber uplink, weekly housekeeping, and concierge for stays of 30+ nights.",
                },
              ].map((it) => (
                <li key={it.n} className="reveal flex gap-6">
                  <span
                    className="font-serif text-2xl mt-1"
                    style={{ color: `var(--${it.c})` }}
                  >
                    {it.n}
                  </span>
                  <div>
                    <p className="text-cream font-medium mb-2 uppercase tracking-[0.18em] text-sm">
                      {it.t}
                    </p>
                    <p className="text-cream/60 text-sm leading-relaxed max-w-md">
                      {it.d}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative reveal">
            <img
              src={experienceEvening}
              alt="Villa Ledu — evening pool deck"
              width={1200}
              height={1600}
              loading="lazy"
              className="w-full aspect-[4/5] object-cover"
            />
            <div className="absolute -bottom-8 -left-6 md:-left-12 w-44 md:w-56 aspect-square bg-summer text-cream p-6 md:p-8 flex flex-col justify-between">
              <span className="text-[10px] uppercase tracking-[0.3em] opacity-80">
                Now booking
              </span>
              <p className="font-serif italic text-xl md:text-2xl leading-tight">
                Rainy season<br />residencies open
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="py-32 md:py-40 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-12 gap-12 items-end">
          <div className="md:col-span-5 reveal">
            <span className="text-[11px] tracking-[0.35em] uppercase text-ink/50 block mb-6">
              The Island
            </span>
            <h3 className="font-serif text-4xl md:text-5xl leading-tight mb-8">
              Taling Ngam,<br />Koh Samui.
            </h3>
            <p className="text-stone-500 leading-relaxed text-base max-w-md">
              A quiet western hillside, fifteen minutes from the airport and a
              world away from the crowd. Sunset side of the island, with views
              across to the Five Islands.
            </p>
          </div>
          <div className="md:col-span-7 reveal">
            <div className="aspect-[16/10] bg-rainy-light relative overflow-hidden border border-ink/10">
              <svg
                viewBox="0 0 800 500"
                className="absolute inset-0 w-full h-full"
                aria-hidden
              >
                <defs>
                  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M40 0H0v40" fill="none" stroke="rgba(26,26,26,0.06)" strokeWidth="1" />
                  </pattern>
                </defs>
                <rect width="800" height="500" fill="url(#grid)" />
                {/* Stylised Samui blob */}
                <path
                  d="M260,120 C360,80 520,100 600,180 C680,250 640,360 540,400 C420,450 260,430 200,340 C150,260 180,160 260,120 Z"
                  fill="rgba(87,169,180,0.25)"
                  stroke="var(--rainy)"
                  strokeWidth="1.5"
                />
                <circle cx="420" cy="270" r="6" fill="var(--summer)" />
                <circle cx="420" cy="270" r="14" fill="none" stroke="var(--summer)" strokeWidth="1" opacity="0.5" />
                <text x="440" y="275" fontFamily="Plus Jakarta Sans" fontSize="11" fill="#1a1a1a" letterSpacing="2">
                  VILLA LEDU
                </text>
                <text x="60" y="470" fontFamily="Plus Jakarta Sans" fontSize="10" fill="rgba(26,26,26,0.5)" letterSpacing="2">
                  9.4294° N · 100.0048° E
                </text>
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Contact / Inquiry */}
      <section id="contact" className="py-32 md:py-44 px-6 bg-winter-light/40">
        <div className="max-w-3xl mx-auto text-center">
          <span className="reveal text-winter font-medium tracking-[0.35em] uppercase text-[11px] mb-8 block">
            Inquiries
          </span>
          <h2 className="reveal font-serif text-4xl md:text-6xl leading-[1.05] mb-10 text-balance">
            Tell us your season.
          </h2>
          <p className="reveal text-stone-600 leading-relaxed text-lg mb-14 max-w-xl mx-auto">
            Share your dates and the rhythm of stay you're after. We'll reply
            within one working day with availability and a tailored quote.
          </p>

          <form
            className="reveal grid grid-cols-1 md:grid-cols-2 gap-4 text-left"
            onSubmit={(e) => {
              e.preventDefault();
              const form = e.currentTarget as HTMLFormElement;
              form.reset();
              alert("Thank you — we'll be in touch shortly.");
            }}
          >
            <input
              required
              name="name"
              placeholder="Full name"
              className="bg-transparent border-b border-ink/20 py-4 px-1 text-sm placeholder:text-ink/40 focus:outline-none focus:border-ink"
            />
            <input
              required
              type="email"
              name="email"
              placeholder="Email"
              className="bg-transparent border-b border-ink/20 py-4 px-1 text-sm placeholder:text-ink/40 focus:outline-none focus:border-ink"
            />
            <select
              name="villa"
              className="bg-transparent border-b border-ink/20 py-4 px-1 text-sm text-ink/70 focus:outline-none focus:border-ink"
            >
              <option>Any villa</option>
              <option>Summer · ฤดูร้อน</option>
              <option>Rainy · ฤดูฝน</option>
              <option>Winter · ฤดูหนาว</option>
            </select>
            <select
              name="stay"
              className="bg-transparent border-b border-ink/20 py-4 px-1 text-sm text-ink/70 focus:outline-none focus:border-ink"
            >
              <option>Short stay (1–14 nights)</option>
              <option>Long stay (15–29 nights)</option>
              <option>Residency (30+ nights)</option>
            </select>
            <textarea
              name="message"
              rows={3}
              placeholder="Anything we should know?"
              className="md:col-span-2 bg-transparent border-b border-ink/20 py-4 px-1 text-sm placeholder:text-ink/40 focus:outline-none focus:border-ink resize-none"
            />
            <button
              type="submit"
              className="md:col-span-2 mt-8 mx-auto bg-ink text-cream px-12 py-4 text-[11px] uppercase tracking-[0.3em] font-medium hover:bg-winter transition-colors duration-500"
            >
              Send Inquiry
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-6 border-t border-ink/10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
          <div className="flex items-start gap-4">
            <img src={logo} alt="Villa Ledu" className="h-14 w-auto" />
            <div>
              <div className="font-serif italic text-2xl mb-1">Villa Ledu</div>
              <p className="text-ink/50 text-sm max-w-xs">
                A tribute to the island's natural cycles.<br />
                Taling Ngam · Koh Samui · Thailand
              </p>
            </div>
          </div>
          <div className="flex gap-16 md:gap-24">
            <div className="flex flex-col gap-3">
              <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-ink/40">
                Reach us
              </span>
              <a href="mailto:stay@villaledu.com" className="text-sm hover:text-summer transition-colors">
                stay@villaledu.com
              </a>
              <a href="tel:+66824440000" className="text-sm hover:text-summer transition-colors">
                +66 82 444 0000
              </a>
            </div>
            <div className="flex flex-col gap-3">
              <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-ink/40">
                Follow
              </span>
              <a href="#" className="text-sm hover:text-rainy transition-colors">Instagram</a>
              <a href="#" className="text-sm hover:text-rainy transition-colors">Journal</a>
            </div>
          </div>
        </div>
        <div className="max-w-6xl mx-auto mt-16 pt-6 border-t border-ink/5 flex justify-between text-[10px] uppercase tracking-[0.3em] text-ink/40">
          <span>© {new Date().getFullYear()} Villa Ledu</span>
          <span>Made in Samui</span>
        </div>
      </footer>
    </div>
  );
}
