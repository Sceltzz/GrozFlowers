/**
 * A generated color-palette transition between two sections — the
 * replacement for the Ribbon divider, which never landed visually no
 * matter how many textures it went through.
 *
 * Each image is bespoke per seam, not a reusable asset: generated from a
 * screenshot of that exact seam (top color/content → bottom color),
 * painterly ink-diffusion style, in the site's palette. `object-fit: fill`
 * stretches it to exactly this band's height regardless of the source
 * photo's own aspect ratio — same fix used for the ribbon and the mist
 * before it — so there's no cropping to fight across viewport widths, and
 * the image's own top/bottom rows always land exactly on this band's own
 * top/bottom edges, which is what makes the color match the real section
 * above and below actually meet.
 */
export function SeamTransition({ src, alt = '' }: { src: string; alt?: string }) {
  return (
    <div aria-hidden className="relative h-32 w-full overflow-hidden sm:h-44 lg:h-56">
      <img src={src} alt={alt} className="h-full w-full object-fill" />
    </div>
  );
}
