import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Menu, X } from "lucide-react";

import logo from "@/assets/villa-ledu-logo.png";
import heroAerial from "@/assets/hero-aerial.jpg";
import villaSummer from "@/assets/villa-summer.jpg";
import villaRainy from "@/assets/villa-rainy.jpg";
import villaWinter from "@/assets/villa-winter.jpg";
import experienceEvening from "@/assets/experience-evening.jpg";
import { GalleryMasonry } from "@/components/gallery-masonry";


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

type ExploreCategory = {
  n: string;
  c: "summer" | "rainy" | "winter";
  t: string;
  d: string;
  tags: string;
};

const exploreItems: ExploreCategory[] = [
  {
    n: "01",
    c: "summer",
    t: "Scenic Samui",
    d: "Panoramic viewpoints and quiet coves away from the resort strip.",
    tags: "Lad Koh Viewpoint · Silver Beach · Coral Cove · Sunset viewpoints",
  },
  {
    n: "02",
    c: "rainy",
    t: "Island Adventures",
    d: "Boat days to the marine park and the islands just offshore.",
    tags: "Ang Thong National Marine Park · Koh Tao · Koh Nang Yuan · Koh Tan · Koh Madsum",
  },
  {
    n: "03",
    c: "winter",
    t: "Culture & Landmarks",
    d: "Temples, shrines, and Samui's most photographed sights.",
    tags: "Big Buddha · Wat Plai Laem · Secret Buddha Garden · Hin Ta & Hin Yai",
  },
  {
    n: "04",
    c: "summer",
    t: "Nature & Wellness",
    d: "Waterfalls, jungle trails, and slower afternoons.",
    tags: "Na Muang Waterfalls · Jungle walks · Ethical elephant sanctuaries · Thai massage · Quiet beaches",
  },
  {
    n: "05",
    c: "rainy",
    t: "Food & Markets",
    d: "Night markets, seafood, and tables with their feet in the sand.",
    tags: "Fisherman's Village · Lamai Night Market · Chaweng food spots · Seafood · Beachside dining",
  },
  {
    n: "06",
    c: "winter",
    t: "Evenings Out",
    d: "Where the island comes alive after dark.",
    tags: "Beach bars · Fire shows · Live music · Chaweng nightlife · Lamai's relaxed scene",
  },
];

function Index() {
  const main = useRef<HTMLDivElement>(null);
  const heroVideo = useRef<HTMLVideoElement>(null);
  const heroTitle = useRef<HTMLHeadingElement>(null);
  const [navSolid, setNavSolid] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

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
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 bg-cream/90 backdrop-blur-md border-b border-ink/5 md:bg-transparent md:backdrop-blur-0 md:border-transparent md:transition-all md:duration-500 ${
          navSolid
            ? "md:bg-cream/85 md:backdrop-blur-md md:border-b md:border-ink/5"
            : ""
        }`}
      >
        <div className={`max-w-[1400px] mx-auto px-6 md:px-10 flex items-center justify-between py-4 md:${navSolid ? "py-4" : "py-6"}`}>
          <a href="#top" className="flex items-center gap-3" onClick={() => setMenuOpen(false)}>
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
            <a href="#explore" className="hover:text-winter transition-colors">Explore</a>
            <a href="#contact" className="hover:opacity-60 transition-colors">Contact</a>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="#contact"
              className="hidden md:inline-block text-[11px] font-medium uppercase tracking-[0.25em] border border-ink/20 px-4 py-2 rounded-full hover:bg-ink hover:text-cream transition-colors"
            >
              Inquire
            </a>
            <button
              type="button"
              aria-label="Open menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
              className="md:hidden text-ink p-1"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {menuOpen ? (
          <div className="md:hidden border-t border-ink/10 bg-cream px-6 py-2 flex flex-col">
            <a href="#philosophy" onClick={() => setMenuOpen(false)} className="py-3 text-[11px] font-medium uppercase tracking-[0.25em] border-b border-ink/5 hover:text-summer transition-colors">Philosophy</a>
            <a href="#villas" onClick={() => setMenuOpen(false)} className="py-3 text-[11px] font-medium uppercase tracking-[0.25em] border-b border-ink/5 hover:text-rainy transition-colors">Villas</a>
            <a href="#explore" onClick={() => setMenuOpen(false)} className="py-3 text-[11px] font-medium uppercase tracking-[0.25em] border-b border-ink/5 hover:text-winter transition-colors">Explore</a>
            <a href="#contact" onClick={() => setMenuOpen(false)} className="py-3 text-[11px] font-medium uppercase tracking-[0.25em] border-b border-ink/5 hover:opacity-60 transition-colors">Contact</a>
            <a href="#contact" onClick={() => setMenuOpen(false)} className="my-3 text-center text-[11px] font-medium uppercase tracking-[0.25em] border border-ink/20 px-4 py-3 rounded-full hover:bg-ink hover:text-cream transition-colors">Inquire</a>
          </div>
        ) : null}
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
  <div className="max-w-1400px mx-auto px-6 md:px-10 mb-16 flex flex-col sm:flex-row sm:items-end justify-between gap-4 reveal">
    <div>
            <span className="text-[11px] tracking-[0.35em] uppercase text-ink/50 block mb-4">
              The Villa
            </span>
            <h3 className="font-serif text-4xl md:text-5xl leading-tight">
              Three seasonal residences, one private stay.
            </h3>
          </div>
    <span className="font-serif italic text-base sm:text-lg text-ink40">
      Explore the architecture, spaces, and atmosphere
    </span>
  </div>

  <div className="max-w-1400px mx-auto px-6 md:px-10 reveal">
    <GalleryMasonry />
  </div>

</section>



      {/* Explore / Things to do on Samui */}
      <section id="explore" className="bg-ink text-cream py-32 md:py-44 px-6 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-center mb-20 md:mb-24">
            <div>
              <span className="reveal text-summer font-medium tracking-[0.35em] uppercase text-[11px] mb-8 block">
                Beyond the Villa
              </span>
              <h2 className="reveal font-serif text-4xl md:text-6xl leading-[1.05] mb-8">
                Samui, at your own pace.
              </h2>
              <p className="reveal text-cream/60 text-base md:text-lg leading-relaxed max-w-md">
                A short list of what's worth the drive — quiet viewpoints, island
                boat days, temples, waterfalls, and where to eat once the sun
                goes down. Ask your host for tide times, opening hours, or a
                driver recommendation.
              </p>
            </div>

            <div className="relative reveal">
              <img
                src={experienceEvening}
                alt="Villa Ledu — master bedroom detail"
                width={1200}
                height={1600}
                loading="lazy"
                className="w-full aspect-[4/5] object-cover"
              />
            </div>
          </div>

          <div className="reveal grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-cream/10 border border-cream/10">
            {exploreItems.map((it) => (
              <div key={it.n} className="bg-ink p-8 md:p-10 flex flex-col gap-4">
                <span
                  className="font-serif text-2xl"
                  style={{ color: `var(--${it.c})` }}
                >
                  {it.n}
                </span>
                <h3 className="text-cream font-medium uppercase tracking-[0.14em] text-sm">
                  {it.t}
                </h3>
                <p className="text-cream/60 text-sm leading-relaxed">{it.d}</p>
                <p className="text-cream/40 text-xs leading-relaxed mt-auto pt-4 border-t border-cream/10">
                  {it.tags}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="py-32 md:py-40 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-12 gap-12 items-end">
          <div className="md:col-span-5 reveal">
            <span className="text-[11px] tracking-[0.35em] uppercase text-ink/50 block mb-6">
              Location
            </span>
            <h3 className="font-serif text-4xl md:text-5xl leading-tight mb-8">
              Bo Put,<br />Koh Samui.
            </h3>
            <p className="text-stone-500 leading-relaxed text-base max-w-md mb-8">
              Bo Put sits on the island's calmer north coast — close enough to
              reach in minutes, quiet enough to feel apart. Fisherman's Village
              is a short walk for dinner and its Friday night market, the
              airport is under fifteen minutes away, and the Big Buddha Pier
              puts Koh Phangan and Koh Tao within easy reach for a day trip.
              It's Samui without the sprawl of Chaweng or Lamai — mornings
              looking out over calm water, evenings among some of the island's
              best restaurants, and everything else no more than a short drive.
            </p>
            <a
              href="https://www.google.com/maps/search/?api=1&query=Villa+Ledu+177+30+Soi+Kalkin+Tambon+Bo+Put+Koh+Samui+District+Surat+Thani+84320"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-sm text-ink/70 hover:text-summer transition-colors leading-relaxed border-t border-ink/10 pt-6 max-w-md"
            >
              Villa Ledu 177, 30 Soi Kalkin,<br />
              Tambon Bo Put, Koh Samui District,<br />
              Surat Thani 84320
            </a>
          </div>
          <div className="md:col-span-7 reveal">
            <div className="aspect-[16/10] bg-rainy-light relative overflow-hidden border border-ink/10 grayscale-[15%] contrast-[1.05]">
              <iframe
                title="Villa Ledu location"
                src="https://www.google.com/maps?q=Villa+Ledu+177+30+Soi+Kalkin+Tambon+Bo+Put+Koh+Samui+District+Surat+Thani+84320&output=embed"
                className="absolute inset-0 w-full h-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
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

          <div className="reveal flex flex-col items-center gap-6">
            <a
              href="mailto:villaledusamui@gmail.com?subject=Villa%20Ledu%20inquiry"
              className="group w-full max-w-md text-center border border-ink/15 rounded-2xl px-8 py-7 bg-white/40 hover:bg-ink hover:text-cream transition-colors duration-500"
            >
              <span className="block text-[10px] tracking-[0.3em] uppercase text-ink/40 mb-3 group-hover:text-cream/60">
                Email us
              </span>
              <span className="font-serif text-xl md:text-2xl">
                villaledusamui@gmail.com
              </span>
            </a>

            <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
              <a
                href="tel:+66843431144"
                className="flex-1 text-center border border-ink/15 rounded-2xl px-6 py-5 hover:bg-ink hover:text-cream transition-colors duration-500"
              >
                <span className="block text-[10px] tracking-[0.3em] uppercase text-ink/40 mb-2">
                  Call
                </span>
                <span className="font-serif text-lg">+66 8 4343 1144</span>
              </a>
              <a
                href="https://www.instagram.com/villaledu_samui"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 text-center border border-ink/15 rounded-2xl px-6 py-5 hover:bg-ink hover:text-cream transition-colors duration-500"
              >
                <span className="block text-[10px] tracking-[0.3em] uppercase text-ink/40 mb-2">
                  Message
                </span>
                <span className="font-serif text-lg">Instagram</span>
              </a>
            </div>
          </div>
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
              <a href="mailto:villaledusamui@gmail.com" className="text-sm hover:text-summer transition-colors">
                villaledusamui@gmail.com
              </a>
              <a href="tel:+66843431144" className="text-sm hover:text-summer transition-colors">
                +66 8 4343 1144
              </a>
              <a
                href="https://www.google.com/maps/search/?api=1&query=Villa+Ledu+177+30+Soi+Kalkin+Tambon+Bo+Put+Koh+Samui+District+Surat+Thani+84320"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-ink/50 hover:text-summer transition-colors leading-relaxed max-w-[220px]"
              >
                Villa Ledu 177, 30 Soi Kalkin,<br />
                Tambon Bo Put, Koh Samui District,<br />
                Surat Thani 84320
              </a>
            </div>
            <div className="flex flex-col gap-3">
              <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-ink/40">
                Follow
              </span>
              <a href="https://www.instagram.com/villaledu_samui" className="text-sm hover:text-rainy transition-colors">Instagram</a>
              <a href="https://samuibeachfrontvilla.com/" className="text-sm hover:text-rainy transition-colors">Our Agent</a>
              <a href="https://www.airbnb.com/rooms/1713826312803401784?unique_share_id=9a11ff99-d3d3-49ef-b6c5-5d5e9b9f8450&viralityEntryPoint=1&s=76" className="text-sm hover:text-rainy transition-colors">Make a booking on Airbnb</a>
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

