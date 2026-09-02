import { useEffect } from 'react';

/**
 * Reveals every `.reveal` element once, as it enters view. Stagger is set
 * per element with an inline `animationDelay`.
 *
 * Deliberately does not touch `.card-reveal` (the catalog's product cards):
 * that component re-renders on every filter click and recomputes each
 * card's className from React state, which would wipe out a `revealed`
 * class added here from outside React on the next re-render. Catalog.tsx
 * manages its own cards' reveal instead, in state that survives that.
 */
export function useScrollReveal() {
  useEffect(() => {
    const targets = Array.from(document.querySelectorAll<HTMLElement>('.reveal'));

    if (typeof IntersectionObserver === 'undefined') {
      targets.forEach((el) => el.classList.add('revealed'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' },
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}
