import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="border-t border-ink/10 px-6 md:px-10 py-10">
      <div className="max-w-[1400px] mx-auto flex flex-wrap items-center justify-between gap-4 text-[11px] tracking-[0.25em] uppercase text-ink/40">
        <span>Villa Ledu · Koh Samui</span>
        <div className="flex items-center gap-6">
          <Link to="/guide" className="hover:text-ink transition-colors">
            Appliance Guide
          </Link>
          <Link to="/house-rules" className="hover:text-ink transition-colors">
            House Rules
          </Link>
        </div>
      </div>
    </footer>
  );
}
