import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Wind,
  Microwave,
  Flame,
  UtensilsCrossed,
  Cookie,
  WashingMachine,
  AlertTriangle,
  ChevronRight,
} from "lucide-react";

import logo from "@/assets/villa-ledu-logo.png";
import airConditionerFig from "@/assets/guide/air-conditioner.png.asset.json";
import microwaveFig from "@/assets/guide/microwave.png.asset.json";
import inductionFig from "@/assets/guide/induction-stove.png.asset.json";
import dishwasherFig from "@/assets/guide/dishwasher.png.asset.json";
import washingMachineFig from "@/assets/guide/washing-machine.png.asset.json";

export const Route = createFileRoute("/guide")({
  head: () => ({
    meta: [
      { title: "Guest Guide · Appliances — Villa Ledu" },
      {
        name: "description",
        content:
          "Quick-reference instructions for the appliances in your Villa Ledu residence — air conditioning, kitchen and laundry.",
      },
      { property: "og:title", content: "Villa Ledu — Guest Appliance Guide" },
      {
        property: "og:description",
        content: "Everyday use notes for the appliances in your villa.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Guide,
});

type Appliance = {
  id: string;
  index: string;
  name: string;
  brand: string;
  room: string;
  icon: React.ComponentType<{ className?: string }>;
  accent: "summer" | "rainy" | "winter";
};

const appliances: Appliance[] = [
  { id: "aircon", index: "01", name: "Air Conditioner", brand: "Panasonic", room: "Bedrooms · Kitchen · Living · Theater", icon: Wind, accent: "winter" },
  { id: "microwave", index: "02", name: "Microwave", brand: "Häfele", room: "Kitchen", icon: Microwave, accent: "summer" },
  { id: "induction", index: "03", name: "Induction Stove", brand: "Häfele", room: "Kitchen", icon: Flame, accent: "summer" },
  { id: "dishwasher", index: "04", name: "Dishwasher", brand: "Häfele", room: "Kitchen", icon: UtensilsCrossed, accent: "rainy" },
  { id: "oven", index: "05", name: "Oven", brand: "Häfele", room: "Kitchen", icon: Cookie, accent: "summer" },
  { id: "washer", index: "06", name: "Washing Machine", brand: "Hitachi", room: "Laundry Room", icon: WashingMachine, accent: "rainy" },
];

const accentClass = {
  summer: "text-summer",
  rainy: "text-rainy",
  winter: "text-winter",
} as const;

const accentBg = {
  summer: "bg-summer-light",
  rainy: "bg-rainy-light",
  winter: "bg-winter-light",
} as const;

function Guide() {
  const [active, setActive] = useState<string>("aircon");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 },
    );
    appliances.forEach((a) => {
      const el = document.getElementById(a.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

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
                Guest Guide
              </span>
            </span>
          </Link>
          <Link
            to="/"
            className="text-[11px] font-medium uppercase tracking-[0.25em] border border-ink/20 px-4 py-2 rounded-full hover:bg-ink hover:text-cream transition-colors"
          >
            ← Villa
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <header className="px-6 md:px-10 pt-20 md:pt-28 pb-16 md:pb-24 border-b border-ink/10">
        <div className="max-w-[1400px] mx-auto">
          <span className="text-[11px] tracking-[0.45em] uppercase text-ink/50 block mb-8">
            Guest Reference · ฤดู
          </span>
          <h1 className="font-serif text-5xl md:text-7xl leading-[1.02] tracking-tight text-balance max-w-4xl">
            A quiet guide to the <em>everyday</em> things in your villa.
          </h1>
          <p className="mt-10 max-w-2xl text-stone-500 leading-relaxed text-base md:text-lg text-pretty">
            Short, plain-language notes for the appliances you'll actually use.
            Kept close by so you can settle in, cook a meal, cool the room, and
            put on a wash without hunting through a manual.
          </p>
        </div>
      </header>

      {/* Energy note */}
      <section className="px-6 md:px-10 py-10 border-b border-ink/10 bg-summer-light/40">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row md:items-center gap-6 md:gap-10">
          <div className="flex items-center gap-3 text-summer">
            <AlertTriangle className="w-5 h-5" />
            <span className="text-[11px] tracking-[0.35em] uppercase font-medium">
              A gentle request
            </span>
          </div>
          <p className="font-serif italic text-lg md:text-xl text-ink/80 leading-snug">
            Please switch off the air conditioning when leaving a room, and
            keep doors and windows closed while it is running.
          </p>
        </div>
      </section>

      {/* Content grid */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-16 md:py-24 grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-12 lg:gap-20">
        {/* Sidebar TOC */}
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <span className="text-[10px] tracking-[0.35em] uppercase text-ink/40 block mb-6">
            Contents
          </span>
          <ol className="space-y-1">
            {appliances.map((a) => {
              const isActive = active === a.id;
              return (
                <li key={a.id}>
                  <a
                    href={`#${a.id}`}
                    className={`group flex items-baseline gap-4 py-3 border-b border-ink/5 transition-colors ${
                      isActive ? "text-ink" : "text-ink/50 hover:text-ink"
                    }`}
                  >
                    <span className={`text-[10px] tracking-[0.25em] ${isActive ? accentClass[a.accent] : ""}`}>
                      {a.index}
                    </span>
                    <span className="flex-1 font-serif text-base leading-tight">
                      {a.name}
                    </span>
                    <ChevronRight
                      className={`w-3 h-3 transition-transform ${
                        isActive ? "translate-x-0.5 opacity-100" : "opacity-0 group-hover:opacity-60"
                      }`}
                    />
                  </a>
                </li>
              );
            })}
          </ol>
        </aside>

        {/* Main */}
        <main className="space-y-32 md:space-y-40 min-w-0">
          {/* 01 Air Conditioner */}
          <ApplianceHeader appliance={appliances[0]} />
          <div id="aircon" className="-mt-24 pt-24 scroll-mt-24">
            <Figure src={airConditionerFig.url} alt="Air conditioner remote — Power, Mode, Temp Up/Down controls" caption="Remote control · Power · Mode (iAUTO-X → COOL → DRY) · Temp Up / Down" accent="winter" />
            <Subhead>Everyday use</Subhead>
            <StepList
              items={[
                ["Turn on / off", "Press the ON/OFF button on the remote."],
                ["Choose a mode", "Press MODE to cycle iAUTO-X → COOL → DRY."],
                ["Set temperature", "Use the TEMP ∧ / ∨ arrows."],
                ["Fan speed / quiet", "Press FAN SPEED / QUIET — the lowest speed is the quietest."],
                ["Airflow direction", "Press AIR SWING for up/down, left/right, or auto-swing."],
              ]}
            />
            <Subhead className="mt-16">Options</Subhead>
            <DlList
              items={[
                ["ECO", "Reduces power use while keeping reasonable comfort. Press again to cancel."],
                ["iAUTO-X", "Reaches your target temperature faster, then fine-tunes."],
                ["SLEEP", "Comfort timer 0.5–9 hours; adjusts temperature as you sleep."],
                ["nanoe™X", "Air-purifying and deodorizing. May also run briefly after switch-off."],
              ]}
              accent="winter"
            />
          </div>

          {/* 02 Microwave */}
          <ApplianceHeader appliance={appliances[1]} />
          <div id="microwave" className="-mt-24 pt-24 scroll-mt-24">
            <Callout tone="warn">
              Never use metal, foil, or items with metallic trim — this can cause
              arcing or fire. Not sure a container is safe? Microwave it empty
              with a cup of cold water for one minute; if it stays cool, it's fine.
            </Callout>

            <Subhead className="mt-14">Everyday cooking</Subhead>
            <DlList
              items={[
                ["Microwave", "Press Microwave in standby, then again (or +/−) to set power P1–P10. Set time with +/−, press Start."],
                ["Grill", "Press Function once. Set time with +/−, press Start."],
                ["Combination", "Press Function twice or three times for C-1 or C-2. Set time, press Start."],
                ["Speed cooking", "In standby, press Start/+30Sec — each press adds 30 seconds at full power (up to 95 minutes)."],
              ]}
              accent="summer"
            />

            <Subhead className="mt-16">Defrosting</Subhead>
            <DlList
              items={[
                ["By weight", "Function ×2, set weight 0.1–2.0 kg with +/−, Start."],
                ["By time", "Function ×3, set time with +/−, Start."],
              ]}
              accent="summer"
            />

            <Subhead className="mt-16">Auto menu & child lock</Subhead>
            <DlList
              items={[
                ["Auto Menu", "Press repeatedly to choose from 8 presets (meat, fish, vegetables, beverages, pasta, popcorn, pizza, potato). Enter weight if prompted, then Start."],
                ["Child Lock", "Hold Lock/Cancel for 3 seconds to lock; repeat to unlock. A long beep confirms."],
              ]}
              accent="summer"
            />
          </div>

          {/* 03 Induction */}
          <ApplianceHeader appliance={appliances[2]} />
          <div id="induction" className="-mt-24 pt-24 scroll-mt-24">
            <Subhead>Getting started</Subhead>
            <StepList
              items={[
                ["Power on", "Hold ON/OFF for 3 seconds — all displays show “–”."],
                ["Place a pan", "Only cookware with a magnetic base will work (test with a magnet)."],
                ["Select zone", "Touch the zone key, then use + / − to set power (starts at 5, range 0–9)."],
                ["Choose within a minute", "Otherwise the hob switches off automatically."],
              ]}
            />

            <Subhead className="mt-16">Boost, timer & lock</Subhead>
            <DlList
              items={[
                ["Boost (P)", "Select zone, touch P — maximum power. Reverts to 9 after 5 minutes."],
                ["Timer as minute-minder", "Touch Timer without selecting a zone. Beeps only."],
                ["Timer to switch off a zone", "Select the zone first, then Timer. That zone stops when time ends."],
                ["Cancel timer", "Touch − and + together."],
                ["Child Lock", "Hold the lock key 3 seconds — display shows “Lo”. Repeat while hob is on to unlock."],
              ]}
              accent="summer"
            />

            <Subhead className="mt-16">Good to know</Subhead>
            <BulletList
              items={[
                "Centre the pan on the zone; lift, don't slide, to protect the glass.",
                "Flashing heat setting = no pan, unsuitable pan, or off-centre.",
                "“H” means the zone is still hot.",
                "“ER03”: wipe the glass and controls dry. Other codes (F1E, F3E, E1E–E5E): switch off and contact the villa host.",
                "Pacemaker users should consult a doctor before using an induction hob.",
              ]}
              accent="summer"
            />
          </div>

          {/* 04 Dishwasher */}
          <ApplianceHeader appliance={appliances[3]} />
          <div id="dishwasher" className="-mt-24 pt-24 scroll-mt-24">
            <Callout tone="soft">
              Detergent powder and capsules are under the kitchen sink. A quick
              rinse of plates and pots before loading makes for a better wash.
            </Callout>

            <Subhead className="mt-14">Loading</Subhead>
            <DlList
              items={[
                ["Lower basket", "Pots, pans, plates, serving dishes. Bowls and pans face down."],
                ["Upper basket", "Glasses, cups, smaller and delicate items."],
                ["Cutlery basket", "Mix handle direction; sharp knives point-down."],
                ["Avoid washing", "Wood, cast iron, mother-of-pearl handles, anything not marked dishwasher-safe."],
              ]}
              accent="rainy"
            />

            <Subhead className="mt-16">Wash programs</Subhead>
            <ProgramTable
              accent="rainy"
              rows={[
                ["Intensive", "Heavily soiled pots, pans, dishes", "160 min"],
                ["Normal", "Everyday, normally soiled loads", "180 min"],
                ["ECO", "Efficient standard cycle, lightly soiled", "185 min"],
                ["Glass", "Lightly soiled crockery and glass", "120 min"],
                ["Rapid", "Lightly soiled, quick wash", "40 min"],
              ]}
            />

            <Subhead className="mt-16">Running a cycle</Subhead>
            <StepList
              items={[
                ["Fill detergent", "Powder or a capsule in the compartment (max half) before each wash."],
                ["Load & close", "Add detergent, close the door."],
                ["Start", "Press On/Off, choose a program, press Start."],
                ["Forgot a dish", "Open door slightly until spray stops, add the item, close — cycle resumes after ~10 seconds."],
                ["When it finishes", "Wait 15–20 minutes for dishes to cool and dry. Unload the lower basket first."],
              ]}
            />
          </div>

          {/* 05 Oven */}
          <ApplianceHeader appliance={appliances[4]} />
          <div id="oven" className="-mt-24 pt-24 scroll-mt-24">
            <Subhead>Heating modes</Subhead>
            <ProgramTable
              accent="summer"
              rows={[
                ["Conventional", "Traditional baking / roasting on one level. Good for cakes with moist toppings.", "30–250°C"],
                ["Convection", "Bake / roast on one or more levels; heat from the ring around the fan.", "50–250°C"],
                ["ECO", "Energy-saving cooking.", "140–240°C"],
                ["Conventional + Fan", "Fan spreads heat from the elements evenly.", "50–250°C"],
                ["Radiant Heat", "Grill small amounts / brown food. Place food centrally under the grill.", "150–250°C"],
                ["Double Grill + Fan", "Grill flat items / brown food, evenly with the fan.", "50–250°C"],
                ["Double Grill", "Grill flat items / brown food.", "150–250°C"],
                ["Pizza", "Bottom heater + ring heater — for dishes needing heat from underneath.", "50–250°C"],
                ["Bottom Heat", "Extra browning for bases of pizzas, pies, pastries.", "30–220°C"],
                ["Defrost", "Gentle defrosting of frozen food.", "—"],
                ["Fermentation", "Prove yeast doughs, culture yogurt.", "30–45°C"],
              ]}
              headers={["Mode", "Use", "Temperature"]}
            />

            <Subhead className="mt-16">Cooking</Subhead>
            <StepList
              items={[
                ["Select a mode", "Touch the oven-function symbol, then set the cooking temperature."],
                ["Quick preheat", "Touch the quick-preheat symbol — oven beeps when ready."],
                ["Finish time", "Touch the timer symbol, use slider or ⟨ / ⟩ to set when cooking should end."],
                ["Reminder timer", "Also available — it beeps but does not stop the oven."],
              ]}
            />

            <Subhead className="mt-16">Good to know</Subhead>
            <BulletList
              items={[
                "Defrost, Fermentation and ECO cannot be preheated quickly.",
                "Childproof lock: touch and hold the clock symbol for 3 seconds.",
                "The cooling fan keeps running after switch-off — don't cover the ventilation slots.",
              ]}
              accent="summer"
            />
          </div>

          {/* 06 Washing Machine */}
          <ApplianceHeader appliance={appliances[5]} />
          <div id="washer" className="-mt-24 pt-24 scroll-mt-24">
            <Subhead>Before each wash</Subhead>
            <BulletList
              items={[
                "Check garment care labels for temperature and suitability.",
                "Empty pockets, zip up or button long strips of fabric, knot drawstrings.",
                "Separate very different textures (towels vs. delicate synthetics) to avoid pilling and tangling.",
                "Use a wash net for small, delicate, or waterproof items — wash waterproofs with one or two other items to steady the drum.",
              ]}
              accent="rainy"
            />

            <Subhead className="mt-16">Detergent dispenser</Subhead>
            <DlList
              items={[
                ["Compartment I", "Prewash detergent — only if Prewash is selected."],
                ["Compartment II", "Main wash detergent."],
                ["Flower symbol", "Fabric softener."],
                ["Small loads", "Use a little less than the standard dose."],
              ]}
              accent="rainy"
            />

            <Subhead className="mt-16">Everyday use</Subhead>
            <StepList
              items={[
                ["Power on", "Press the power button."],
                ["Choose program", "Turn the dial to match your laundry."],
                ["Add options", "Prewash, Extra Rinse, Stain, Timer, Temp via the Option buttons."],
                ["Start", "Press Start/Pause to begin or pause the cycle."],
              ]}
            />

            <Subhead className="mt-16">Common programs</Subhead>
            <ProgramTable
              accent="rainy"
              rows={[
                ["Cotton", "Everyday cotton and linen — shirts, towels, bed linen"],
                ["Mix", "Mixed loads of cotton and synthetics"],
                ["Baby Care", "Baby clothing — gentler wash to protect skin"],
                ["Delicate", "Silk, satin, other delicate fabrics"],
                ["Jeans", "Denim"],
                ["Wool", "Hand or machine-washable wool"],
                ["Rapid", "Small loads (~4 shirts), quick wash"],
                ["Duvet", "Duvets and larger bedding"],
                ["Spin / Rinse & Spin", "Extra spin, or just rinse and spin"],
              ]}
              headers={["Program", "Use"]}
            />
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="border-t border-ink/10 py-16 px-6 md:px-10 mt-16">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <div>
            <span className="font-serif italic text-2xl">Villa Ledu</span>
            <p className="mt-3 text-sm text-ink/50 max-w-md leading-relaxed">
              Anything not covered here? Please ask your host — we're happy to
              walk you through it in person.
            </p>
          </div>
          <div className="text-[10px] tracking-[0.35em] uppercase text-ink/40">
            ฤดู · Guest reference · Koh Samui
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ---------- Building blocks ---------- */

function ApplianceHeader({ appliance }: { appliance: Appliance }) {
  const Icon = appliance.icon;
  return (
    <div className="flex items-start gap-6 md:gap-8 border-b border-ink/10 pb-8">
      <div
        className={`shrink-0 w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center ${accentBg[appliance.accent]}`}
      >
        <Icon className={`w-6 h-6 md:w-7 md:h-7 ${accentClass[appliance.accent]}`} />
      </div>
      <div className="min-w-0">
        <span className={`text-[10px] tracking-[0.35em] uppercase ${accentClass[appliance.accent]}`}>
          {appliance.index} · {appliance.brand}
        </span>
        <h2 className="font-serif text-3xl md:text-5xl leading-tight mt-2">
          {appliance.name}
        </h2>
        <p className="mt-2 text-sm text-ink/50 tracking-wide">{appliance.room}</p>
      </div>
    </div>
  );
}

function Subhead({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <h3
      className={`text-[10px] tracking-[0.4em] uppercase text-ink/50 mb-6 ${className}`}
    >
      {children}
    </h3>
  );
}

function StepList({ items }: { items: [string, string][] }) {
  return (
    <ol className="space-y-6">
      {items.map(([label, desc], i) => (
        <li key={label} className="grid grid-cols-[auto_1fr] gap-6 items-baseline">
          <span className="font-serif italic text-ink/40 text-lg tabular-nums w-8">
            {String(i + 1).padStart(2, "0")}
          </span>
          <div>
            <div className="font-medium text-ink">{label}</div>
            <p className="text-ink/60 leading-relaxed mt-1">{desc}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

function DlList({
  items,
  accent = "winter",
}: {
  items: [string, string][];
  accent?: "summer" | "rainy" | "winter";
}) {
  return (
    <dl className="divide-y divide-ink/10 border-y border-ink/10">
      {items.map(([term, desc]) => (
        <div key={term} className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-2 md:gap-8 py-5">
          <dt className={`font-medium ${accentClass[accent]}`}>{term}</dt>
          <dd className="text-ink/70 leading-relaxed">{desc}</dd>
        </div>
      ))}
    </dl>
  );
}

function BulletList({
  items,
  accent = "winter",
}: {
  items: string[];
  accent?: "summer" | "rainy" | "winter";
}) {
  return (
    <ul className="space-y-4">
      {items.map((it) => (
        <li key={it} className="flex gap-4">
          <span className={`mt-2 h-1.5 w-1.5 rounded-full shrink-0 ${accentBg[accent]}`} />
          <span className="text-ink/70 leading-relaxed">{it}</span>
        </li>
      ))}
    </ul>
  );
}

function Callout({
  children,
  tone = "soft",
}: {
  children: React.ReactNode;
  tone?: "soft" | "warn";
}) {
  const isWarn = tone === "warn";
  return (
    <div
      className={`border-l-2 pl-6 py-2 ${
        isWarn ? "border-summer" : "border-rainy"
      }`}
    >
      <div
        className={`text-[10px] tracking-[0.35em] uppercase mb-2 ${
          isWarn ? "text-summer" : "text-rainy"
        }`}
      >
        {isWarn ? "Please note" : "Good to know"}
      </div>
      <p className="font-serif italic text-lg leading-snug text-ink/85">
        {children}
      </p>
    </div>
  );
}

function ProgramTable({
  rows,
  headers = ["Program", "Best for", "Approx. time"],
  accent = "rainy",
}: {
  rows: string[][];
  headers?: string[];
  accent?: "summer" | "rainy" | "winter";
}) {
  return (
    <div className="overflow-x-auto -mx-6 md:mx-0">
      <table className="w-full min-w-[520px] border-collapse">
        <thead>
          <tr className="text-left">
            {headers.map((h) => (
              <th
                key={h}
                className="text-[10px] tracking-[0.3em] uppercase text-ink/50 font-medium border-b border-ink/20 pb-3 px-3 md:px-4"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row[0]} className="border-b border-ink/5">
              {row.map((cell, i) => (
                <td
                  key={i}
                  className={`py-4 px-3 md:px-4 align-top ${
                    i === 0
                      ? `font-serif text-lg ${accentClass[accent]}`
                      : "text-ink/70 leading-relaxed"
                  }`}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
