/**
 * The seam between two sections, marked rather than blended — wrapped in
 * the cloud/mist "portal" glow from the site's very first draft, brought
 * back purely as ambient decoration.
 *
 * The ribbon strip still does the actual seam-marking: an opaque velvet
 * band, immune to the banding that sank every earlier gradient-blend
 * attempt, because it never blends two section backgrounds into each
 * other. The mist sits around it doing nothing but glow — it doesn't need
 * to reach full opacity or land on a precise line, so it can't reintroduce
 * that old failure mode. Both layers live inside this component's own box,
 * so there's no cross-section overflow to fight at odd viewport heights.
 *
 * The velvet itself (`ribbon-velvet.jpg`) is a real generated photo
 * texture, not a hand-coded CSS gradient — every earlier attempt to fake
 * fabric depth with gradients read as flat or plasticky. `background-size:
 * 100% 100%` stretches it to exactly the strip's box regardless of the
 * source photo's own aspect ratio (same fix as the mist's `object-fill`
 * below), so there's no cropping to fight across viewport widths either.
 * The photo already has the gold stitching baked in, so there's no
 * separate CSS overlay for it any more.
 *
 * The mist image fills the wrapper with a plain `inset-0`, not the
 * `top-1/2 -translate-y-1/2` centering trick it briefly had — a CSS
 * `animation` (`.animate-mist`) sets the whole `transform` property at
 * every keyframe, so it doesn't merge with a *separate* static transform
 * like `-translate-y-1/2`, it replaces it outright. With that combo the
 * image kept losing its −50% offset to the animation and rendering
 * shifted down by half its own height — a blank gap above the ribbon,
 * the actual cloud glow dumped low enough to spill into the section
 * below it. `inset-0` already fills the box with no transform needed, so
 * there's nothing left for the animation to clobber.
 */
export function Ribbon() {
  return (
    <div
      aria-hidden
      className="relative z-20 flex h-28 w-full items-center justify-center overflow-hidden sm:h-36 lg:h-44"
    >
      <img
        src="/portal-mist.svg"
        alt=""
        className="animate-mist pointer-events-none absolute inset-0 h-full w-full object-fill opacity-80"
      />

      <div
        className="relative h-7 w-full sm:h-8 lg:h-9"
        style={{
          backgroundImage: 'url(/ribbon-velvet.jpg)',
          backgroundSize: '100% 100%',
          backgroundPosition: 'center',
          boxShadow: '0 3px 14px rgba(4, 9, 6, 0.55), 0 -2px 10px rgba(4, 9, 6, 0.3)',
        }}
      />
    </div>
  );
}
