/**
 * Villa Ledu gallery.
 *
 * HOW TO ADD PHOTOS:
 *   Drop any image file into  src/assets/gallery/
 *   Supported: .jpg .jpeg .png .webp .avif
 *
 * That's it — the image appears in the "Gallery" section automatically.
 *
 * Tips:
 *  - Files are shown in alphabetical order, so prefix with numbers
 *    (01-…, 02-…) to control the sequence.
 *  - The filename becomes the caption: "04-evening-terrace.jpg" -> "Evening terrace".
 *  - Add "-tall" or "-wide" to a filename to make it span more space in the
 *    masonry layout, e.g. "07-pool-wide.jpg" or "08-stair-tall.jpg".
 */

const modules = import.meta.glob("../assets/gallery/*.{jpg,jpeg,png,webp,avif,JPG,JPEG,PNG,WEBP,AVIF}", {
  eager: true,
  query: "?url",
  import: "default",
}) as Record<string, string>;

export type GalleryItem = {
  src: string;
  caption: string;
  span: "normal" | "tall" | "wide";
};

function toCaption(path: string) {
  const file = path.split("/").pop() ?? "";
  const base = file.replace(/\.[^.]+$/, "");
  const words = base
    .replace(/^[0-9]+[-_\s]*/, "")
    .replace(/[-_]+(tall|wide)$/i, "")
    .replace(/[-_]+/g, " ")
    .trim();
  return words.charAt(0).toUpperCase() + words.slice(1);
}

export const galleryItems: GalleryItem[] = Object.keys(modules)
  .sort((a, b) => a.localeCompare(b))
  .map((path) => ({
    src: modules[path],
    caption: toCaption(path),
    span: /[-_]tall\.[^.]+$/i.test(path)
      ? ("tall" as const)
      : /[-_]wide\.[^.]+$/i.test(path)
        ? ("wide" as const)
        : ("normal" as const),
  }));
