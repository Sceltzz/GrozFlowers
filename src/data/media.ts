/**
 * Every photographic asset the page uses, in one place.
 *
 * Source: Unsplash (free to use, hotlinked through their image CDN).
 * When generated or shot photography is ready, swap the values here —
 * nothing else in the codebase references an image URL.
 */

const unsplash = (id: string, w: number, extra = '') =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&q=80&w=${w}${extra}`;

export const media = {
  /** Hero — full-bleed, dark and warm so the display type reads over it. */
  hero: unsplash('1612526031467-2b6bf1f49961', 2000),
  /** Catalog backdrop — a wall of stems, veiled in cream behind the grid. */
  catalogBg: unsplash('1771856558087-80f35365c3bb', 2000),
};
