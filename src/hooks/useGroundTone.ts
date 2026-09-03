import { useEffect, useState } from 'react';

/**
 * Does the floating bar at `place` currently sit over the cream ground?
 *
 * Checks every section marked `data-ground="light"` independently and
 * returns true if the sample point falls inside *any one* of them — not
 * whether it falls inside the min-top/max-bottom span across all of them
 * combined. That merged-span version worked back when there were only two
 * light zones and they were adjacent (the featured configurator and the
 * catalog grid, back to back, no gap), but broke the moment a third,
 * non-adjacent light zone showed up (the delivery/map section, with the
 * whole dark Advantages section sitting between it and the catalog): the
 * merged span happily covered that dark gap too, so the bar rendered its
 * light-ground styling — a pale scrim glow — straight over dark green.
 * Per-zone containment doesn't have that failure mode regardless of how
 * many light zones exist or how they're spaced. The navbar reads the top
 * of the viewport, the footer the bottom.
 */
export function useGroundTone(place: 'top' | 'bottom'): boolean {
  const [onLight, setOnLight] = useState(false);

  useEffect(() => {
    let frame = 0;

    const measure = () => {
      frame = 0;
      const zones = document.querySelectorAll<HTMLElement>('[data-ground="light"]');
      if (!zones.length) return;

      const y = place === 'top' ? 72 : window.innerHeight - 44;

      let isLight = false;
      zones.forEach((zone) => {
        const rect = zone.getBoundingClientRect();
        if (y > rect.top && y < rect.bottom) isLight = true;
      });

      setOnLight(isLight);
    };

    const schedule = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);

    return () => {
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [place]);

  return onLight;
}
