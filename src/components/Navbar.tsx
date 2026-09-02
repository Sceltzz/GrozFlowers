import type { MouseEvent } from 'react';
import { useMotionValue } from 'motion/react';
import { MagneticLink } from './ui/magnetic-link';
import { useGroundTone } from '../hooks/useGroundTone';

const links = [
  { label: 'Каталог', href: '#catalog' },
  { label: 'Хит продаж', href: '#featured' },
  { label: 'О нас', href: '#advantages' },
  { label: 'Доставка', href: '#delivery' },
];

const linkClass = 'whitespace-nowrap opacity-80 transition-opacity duration-300 hover:opacity-100';

export function Navbar() {
  const onLight = useGroundTone('top');

  // Shared across both desktop link lists so proximity feels continuous
  // across the whole floating pill, not reset at the wordmark in the middle.
  // Idle state is Infinity, same as the dock reference — every link's
  // distance-from-cursor comes out "far away" until the pointer actually
  // enters the nav, so nothing is magnified by default.
  const mouseX = useMotionValue(Infinity);
  const handleMouseMove = (e: MouseEvent) => mouseX.set(e.pageX);
  const handleMouseLeave = () => mouseX.set(Infinity);

  return (
    <header className="fixed inset-x-0 top-4 z-50 flex justify-center px-4 sm:top-6">
      <nav
        aria-label="Основная навигация"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={[
          'liquid-glass rounded-3xl px-6 py-3 transition-colors duration-500 sm:rounded-full sm:px-8 sm:py-3.5',
          onLight ? 'liquid-glass--ink text-[#1c2a22]' : 'text-[#faf6f0]',
        ].join(' ')}
      >
        <div className="flex flex-col items-center gap-3 sm:flex-row sm:gap-8 md:gap-10">
          <ul className="hidden items-center gap-7 text-[11px] uppercase tracking-[0.2em] sm:flex md:gap-9">
            {links.slice(0, 2).map((link) => (
              <li key={link.href}>
                <MagneticLink mouseX={mouseX} className={linkClass} href={link.href}>
                  {link.label}
                </MagneticLink>
              </li>
            ))}
          </ul>

          <a
            href="#top"
            className="flex items-center gap-2.5"
            aria-label="Groz Flowers — на главную"
          >
            <img src="/bud.svg" alt="" width={22} height={22} className="shrink-0" aria-hidden />
            <span className="font-display text-[15px] font-medium uppercase leading-none tracking-[0.34em] sm:text-base">
              Groz&nbsp;Flowers
            </span>
          </a>

          <ul className="hidden items-center gap-7 text-[11px] uppercase tracking-[0.2em] sm:flex md:gap-9">
            {links.slice(2).map((link) => (
              <li key={link.href}>
                <MagneticLink mouseX={mouseX} className={linkClass} href={link.href}>
                  {link.label}
                </MagneticLink>
              </li>
            ))}
          </ul>

          {/* mobile: the whole set folds under the wordmark. No hover physics
              here — touch has no cursor to be "near", so the magnetic effect
              would never trigger anyway; a plain static list is correct. */}
          <ul className="flex items-center gap-4 text-[10px] uppercase tracking-[0.16em] sm:hidden">
            {links.map((link) => (
              <li key={link.href}>
                <a className={linkClass} href={link.href}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
}
