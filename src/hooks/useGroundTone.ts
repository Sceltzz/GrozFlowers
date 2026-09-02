import { useEffect, useState } from 'react';

/**
 * Does the floating bar at `place` currently sit over the cream ground?
 *
 * The light zone is the union of every section marked `data-ground="light"`
 * (there are two, back to back: the featured configurator and the catalog
 * grid) — the seam above and below the pair is a hard-edged ribbon now, not
 * a fade, so there's no tail to compensate for. The navbar reads the top of
 * the viewport, the footer the bottom.
 */
export function useGroundTone(place: 'top' | 'bottom'): boolean {
  const [onLight, setOnLight] = useState(false);

  useEffect(() => {
    let frame = 0;

    const measure = () => {
      frame = 0;
      const zones = document.querySelectorAll<HTMLElement>('[data-ground="light"]');
      if (!zones.length) return;

      let top = Infinity;
      let bottom = -Infinity;
      zones.forEach((zone) => {
        const rect = zone.getBoundingClientRect();
        top = Math.min(top, rect.top);
        bottom = Math.max(bottom, rect.bottom);
      });

      const y = place === 'top' ? 72 : window.innerHeight - 44;

      setOnLight(y > top && y < bottom);
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
