import type { MouseEvent } from 'react';
import { Send } from 'lucide-react';
import { useMotionValue } from 'motion/react';
import { TELEGRAM_URL, telegramMessageLink } from '../data/contact';
import { useGroundTone } from '../hooks/useGroundTone';
import { MagneticLink } from './ui/magnetic-link';

const DARK_SCRIM =
  'linear-gradient(to top, rgba(22,33,26,0.8) 0%, rgba(22,33,26,0.42) 45%, rgba(22,33,26,0.14) 74%, rgba(22,33,26,0) 100%)';

const LIGHT_SCRIM =
  'linear-gradient(to top, rgba(250,246,240,0.92) 0%, rgba(250,246,240,0.6) 45%, rgba(250,246,240,0.22) 74%, rgba(250,246,240,0) 100%)';

export function Footer() {
  const onLight = useGroundTone('bottom');

  // Same proximity engine as the navbar's MagneticLink row — a shared
  // mouseX scoped to this pill, so the Telegram icon and the two text
  // links magnify together as one continuous strip.
  const mouseX = useMotionValue(Infinity);
  const handleMouseMove = (e: MouseEvent) => mouseX.set(e.pageX);
  const handleMouseLeave = () => mouseX.set(Infinity);

  return (
    <footer className="pointer-events-none fixed inset-x-0 bottom-0 z-40 px-4 pb-3 pt-12 sm:px-6 sm:pb-4">
      {/*
        Two scrims cross-fade instead of one swapping its gradient: over the
        cream stretch a dark bar cut a hard band across the mist.
      */}
      <div
        className="absolute inset-0 transition-opacity duration-700"
        style={{ backgroundImage: DARK_SCRIM, opacity: onLight ? 0 : 1 }}
      />
      <div
        className="absolute inset-0 transition-opacity duration-700"
        style={{ backgroundImage: LIGHT_SCRIM, opacity: onLight ? 1 : 0 }}
      />

      <div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={[
          'liquid-glass pointer-events-auto relative mx-auto flex w-full max-w-[1360px] items-center justify-between gap-4 rounded-full px-5 py-2.5 transition-colors duration-500 sm:px-7 sm:py-3',
          onLight ? 'liquid-glass--ink text-[#1c2a22]' : 'text-[#faf6f0]',
        ].join(' ')}
      >
        {/*
          Groz Flowers takes every order and every question through Telegram —
          the source site has no phone number anywhere, only t.me links. This
          icon and the "Контакты" link below point at the same real chat.
        */}
        <MagneticLink
          mouseX={mouseX}
          href={TELEGRAM_URL}
          target="_blank"
          rel="noreferrer noopener"
          aria-label="Telegram"
          className="opacity-75 transition-opacity duration-300 hover:opacity-100"
        >
          <Send className="h-[17px] w-[17px]" strokeWidth={1.4} aria-hidden />
        </MagneticLink>

        <ul className="flex items-center gap-4 text-[9.5px] uppercase tracking-[0.18em] sm:gap-7 sm:text-[10.5px] sm:tracking-[0.2em]">
          <li>
            <MagneticLink
              mouseX={mouseX}
              href="#delivery"
              className="opacity-75 transition-opacity duration-300 hover:opacity-100"
            >
              Условия доставки
            </MagneticLink>
          </li>
          <li>
            <MagneticLink
              mouseX={mouseX}
              href={telegramMessageLink('Здравствуйте! Есть вопрос.')}
              target="_blank"
              rel="noreferrer noopener"
              className="opacity-75 transition-opacity duration-300 hover:opacity-100"
            >
              Контакты
            </MagneticLink>
          </li>
        </ul>
      </div>
    </footer>
  );
}
