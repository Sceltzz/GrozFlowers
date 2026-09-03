import { ArrowDown } from 'lucide-react';
import { media } from '../data/media';

export function Hero() {
  return (
    <section id="top" className="relative h-screen w-full overflow-hidden bg-[#1c1512]">
      <img
        src={media.hero}
        alt="Рабочий стол флориста: срезанные стебли, свеча, ваза"
        // The source photo is a tall portrait crop; on a wide viewport
        // object-cover's default centring pulls in a slab of bright marble
        // table from the photo's lower half. Biasing toward the top keeps
        // the frame on the darker flowers-against-the-wall part of the shot,
        // so the only place anything goes pale is the fade below, on purpose.
        className="absolute inset-0 h-full w-full object-cover object-[50%_20%]"
      />

      {/*
        Scrim: holds the type without flattening the photograph. Nothing
        here handles the seam at the bottom — sections just abut directly
        now (the Ribbon divider that used to mark it was removed; see the
        note in App.tsx history if it's worth revisiting).
      */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(72% 58% at 50% 44%, rgba(12,18,14,0.28) 0%, rgba(12,18,14,0.62) 58%, rgba(12,18,14,0.82) 100%)',
        }}
      />

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 pb-[16vh] text-center text-[#faf6f0] sm:pb-[14vh]">
        <p
          className="hero-fade-up text-[10px] uppercase tracking-[0.42em] text-[#e6d9b8] sm:text-[11px]"
          style={{ animationDelay: '0.1s' }}
        >
          Флористическая мастерская
        </p>

        <h1 className="mt-5 font-display text-[clamp(3rem,12vw,8.5rem)] font-light uppercase leading-[0.88] tracking-[0.06em]">
          <span className="hero-fade-up block" style={{ animationDelay: '0.25s' }}>
            Живые
          </span>
          <span
            className="hero-fade-up block text-[#f0dfae]"
            style={{ animationDelay: '0.4s' }}
          >
            Истории
          </span>
        </h1>

        <p
          className="hero-fade-up mt-6 max-w-[34rem] text-balance font-display text-lg font-light italic leading-snug text-[#efe6d8]/90 sm:text-xl"
          style={{ animationDelay: '0.55s' }}
        >
          Заказали — и уже едем. Живой букет у двери меньше чем через полчаса.
        </p>

        <a
          href="#catalog"
          className="liquid-glass hero-fade-up group mt-9 inline-flex items-center gap-3 rounded-full px-8 py-4 text-[11px] uppercase tracking-[0.24em] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-[1.03]"
          style={{ animationDelay: '0.7s' }}
        >
          Смотреть каталог
          <ArrowDown
            className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-y-0.5"
            strokeWidth={1.5}
            aria-hidden
          />
        </a>
      </div>
    </section>
  );
}
