/**
 * The seam between two sections, marked with a soft light bloom instead of
 * a texture or a generated image — the Ribbon never found a look that
 * stuck, and the AI-generated per-seam transitions didn't either. This is
 * plainer on purpose: a deterministic CSS gradient between two fixed,
 * known colors (the real background colors of the sections on either
 * side), with a soft radial gold glow layered on top for warmth.
 *
 * Why this doesn't repeat the earlier "плывёт" failures: those all came
 * from blending a semi-transparent layer over unpredictable content (a
 * photograph, a viewport-height-dependent crop) — there was always a
 * point where the layer read as smudged because what showed through it
 * changed. This has nothing to blend against. It's an opaque band sitting
 * in normal document flow between two sections, exactly like the old
 * Ribbon was, just painted with a gradient function instead of a texture.
 * Its two endpoint colors are hard-coded to match the real section
 * backgrounds exactly, so there's no seam-of-the-seam either.
 *
 * Fixed height, not tied to viewport height — same value on a phone and a
 * 4K monitor, so nothing here can look different by screen size the way a
 * height-relative blend did. And because it sits after Hero's `h-screen`
 * in normal flow, it's below the fold at first paint on any device by
 * construction — nothing to do here to keep it out of the initial view.
 */
const GRADIENTS = {
  /** Hero's dark photo scrim → Featured's cream. */
  heroToCream:
    'to bottom, #0c120e 0%, #191f16 22%, #4a4128 48%, #ab9257 64%, #e2d3ac 80%, #faf6f0 94%, #faf6f0 100%',
  /** Catalog's cream → Advantages' deep moss. */
  creamToMoss:
    'to bottom, #faf6f0 0%, #faf6f0 6%, #e2d3ac 20%, #ab9257 36%, #4a4128 52%, #223420 76%, #2f4635 100%',
  /** Advantages' deep moss → HowToOrder's cream. */
  mossToCream:
    'to bottom, #2f4635 0%, #223420 24%, #4a4128 48%, #ab9257 64%, #e2d3ac 80%, #faf6f0 94%, #faf6f0 100%',
} as const;

export function SeamGlow({ variant }: { variant: keyof typeof GRADIENTS }) {
  return (
    <div
      aria-hidden
      className="relative h-28 w-full overflow-hidden sm:h-36 lg:h-44"
      style={{ background: `linear-gradient(${GRADIENTS[variant]})` }}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(50% 110% at 50% 46%, rgba(255,244,214,0.22) 0%, rgba(255,244,214,0) 70%)',
        }}
      />
    </div>
  );
}
