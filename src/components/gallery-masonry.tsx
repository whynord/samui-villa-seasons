import { useCallback, useEffect, useState } from "react";
import { galleryItems } from "@/lib/gallery";

/**
 * Editorial masonry gallery.
 * Every image in src/assets/gallery/ is rendered — no fixed slots.
 * Click a photo to open the full-screen viewer (arrow keys / swipe to move).
 */
export function GalleryMasonry() {
  const [open, setOpen] = useState<number | null>(null);
  const total = galleryItems.length;

  const close = useCallback(() => setOpen(null), []);
  const step = useCallback(
    (dir: number) =>
      setOpen((i) => (i === null ? i : (i + dir + total) % total)),
    [total],
  );

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, close, step]);

  const active = open === null ? null : galleryItems[open];

  return (
    <>
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 md:gap-6 [column-fill:_balance]">
        {galleryItems.map((item, i) => (
          <figure
            key={item.src}
            className="group mb-4 md:mb-6 break-inside-avoid bg-white border border-ink5 overflow-hidden cursor-zoom-in"
            onClick={() => setOpen(i)}
          >
            <div className="overflow-hidden">
              <img
                src={item.src}
                alt={item.caption || `Villa Ledu photograph ${i + 1}`}
                loading={i < 3 ? "eager" : "lazy"}
                className="w-full h-auto object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
              />
            </div>
            {item.caption ? (
              <figcaption className="px-4 py-3 flex items-baseline justify-between gap-4">
                <span className="text-sm text-ink70">{item.caption}</span>
                <span className="text-[10px] tracking-[0.25em] uppercase text-ink40 opacity-0 group-hover:opacity-100 transition-opacity">
                  View
                </span>
              </figcaption>
            ) : null}
          </figure>
        ))}
      </div>

      {active ? (
        <div
          className="fixed inset-0 z-[100] bg-ink/95 backdrop-blur-sm flex items-center justify-center p-4 md:p-10"
          onClick={close}
        >
          <button
            type="button"
            aria-label="Close"
            onClick={close}
            className="absolute top-5 right-6 text-cream/70 hover:text-cream text-[11px] tracking-[0.3em] uppercase"
          >
            Close
          </button>

          <button
            type="button"
            aria-label="Previous photo"
            onClick={(e) => {
              e.stopPropagation();
              step(-1);
            }}
            className="absolute left-3 md:left-8 text-cream/60 hover:text-cream text-3xl font-serif px-3 py-2"
          >
            ‹
          </button>

          <figure
            className="max-w-6xl w-full flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={active.src}
              alt={active.caption || "Villa Ledu photograph"}
              className="max-h-[78vh] w-auto max-w-full object-contain"
            />
            <figcaption className="mt-5 text-center text-cream/70">
              <span className="text-sm">{active.caption}</span>
              <span className="ml-4 text-[10px] tracking-[0.3em] uppercase text-cream/40">
                {(open ?? 0) + 1} / {total}
              </span>
            </figcaption>
          </figure>

          <button
            type="button"
            aria-label="Next photo"
            onClick={(e) => {
              e.stopPropagation();
              step(1);
            }}
            className="absolute right-3 md:right-8 text-cream/60 hover:text-cream text-3xl font-serif px-3 py-2"
          >
            ›
          </button>
        </div>
      ) : null}
    </>
  );
}
