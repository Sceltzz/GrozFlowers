/**
 * The seam between two sections, marked rather than blended: an opaque
 * velvet strip, immune to the banding that sank every earlier
 * gradient/mist-blend attempt, because it never blends two section
 * backgrounds into each other — it just sits on the seam.
 *
 * The mist/glow layer that used to surround it is gone. It technically
 * got fixed (a `transform`-animation bug was pushing it out of position),
 * but once it rendered where it was actually supposed to, the warm haze
 * around the ribbon itself read as a mistake, not atmosphere — so instead
 * of tuning it further, it's cut. The strip alone does the job.
 *
 * The velvet is a real generated photo texture (`ribbon-velvet.jpg`), not
 * a hand-coded CSS gradient — every earlier attempt to fake fabric depth
 * with gradients read as flat or plasticky. `background-size: 100% 100%`
 * stretches it to exactly the strip's box regardless of the source
 * photo's own aspect ratio, so there's no cropping to fight across
 * viewport widths. The photo already has the gold stitching baked in.
 */
export function Ribbon() {
  return (
    <div
      aria-hidden
      className="relative z-20 h-7 w-full sm:h-8 lg:h-9"
      style={{
        backgroundImage: 'url(/ribbon-velvet.jpg)',
        backgroundSize: '100% 100%',
        backgroundPosition: 'center',
        boxShadow: '0 3px 14px rgba(4, 9, 6, 0.55), 0 -2px 10px rgba(4, 9, 6, 0.3)',
      }}
    />
  );
}
