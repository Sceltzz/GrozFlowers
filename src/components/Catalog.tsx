import { useEffect, useRef, useState } from 'react';
import { Send } from 'lucide-react';
import { buildOrderMessage, telegramMessageLink } from '../data/contact';
import { media } from '../data/media';
import { CATEGORIES, formatPrice, products, type Category } from '../data/products';

export function Catalog() {
  const [activeCategory, setActiveCategory] = useState<Category>('Все');

  // Whether the card grid has revealed once. Tracked in React state rather
  // than toggled by classList from an IntersectionObserver callback: this
  // component re-renders on every category click (each card's className is
  // recomputed from `visible`), and React overwrites the whole className
  // string on any re-render where that string actually changed — which
  // wipes out a `revealed` class that was added from outside React. Cards
  // only ever change between rendered/hidden by filtering, so any filter
  // click touches every card's className at least once. Keeping `revealed`
  // in state instead means it's part of what JSX computes, so it survives.
  const [gridRevealed, setGridRevealed] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      setGridRevealed(true);
      return;
    }

    const grid = gridRef.current;
    if (!grid) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setGridRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' },
    );

    observer.observe(grid);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      data-ground="light"
      className="relative w-full overflow-hidden bg-[#faf6f0]"
    >
      {/* a whisper of texture, not atmosphere doing any structural work now */}
      <img
        src={media.catalogBg}
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full scale-105 object-cover opacity-20 blur-[28px]"
      />
      <div className="absolute inset-0 bg-[rgba(250,246,240,0.96)]" />

      {/*
        The doves the mist used to carry — kept, just no longer riding a
        cloud. They drift only, never flap, on staggered independent loops
        so they never move in sync. Scattered at a few points down the
        section rather than only flanking the heading, but never over the
        card grid itself: cards render above these in stacking order (the
        content wrapper below is z-10, these are z-auto), so a dove caught
        behind a photo would just look clipped. Each one below sits in
        margin the grid never reaches — the wide gutter outside its
        max-width, or the open space around the closing CTA.
      */}
      <img
        src="/dove-front.png"
        alt=""
        aria-hidden
        className="animate-dove-drift-a pointer-events-none absolute left-[6%] top-24 w-16 opacity-90 drop-shadow-[0_8px_16px_rgba(47,70,53,0.14)] sm:top-28 sm:w-20 lg:left-[10%] lg:top-32 lg:w-28"
      />
      <img
        src="/dove.png"
        alt=""
        aria-hidden
        className="animate-dove-drift-b pointer-events-none absolute right-[6%] top-24 w-14 -scale-x-100 opacity-90 drop-shadow-[0_8px_16px_rgba(47,70,53,0.12)] sm:top-28 sm:w-[4.5rem] lg:right-[10%] lg:top-32 lg:w-24"
        style={{ animationDelay: '-6s' }}
      />
      {/* a third, larger bird centered between the flanking pair — same safe
          band, clear of both the navbar above and the heading below (that
          gap is only ~40px, which is exactly where the flanking pair
          already sits) */}
      <img
        src="/dove-back.png"
        alt=""
        aria-hidden
        className="animate-dove-drift-c pointer-events-none absolute left-1/2 top-24 w-12 -translate-x-1/2 opacity-80 drop-shadow-[0_8px_16px_rgba(47,70,53,0.13)] sm:top-28 sm:w-14 lg:top-32 lg:w-16"
        style={{ animationDelay: '-8s' }}
      />
      {/* wide-screen gutter, roughly level with the second row of cards — only where that margin is actually wide enough to clear them */}
      <img
        src="/dove.png"
        alt=""
        aria-hidden
        className="animate-dove-drift-c pointer-events-none absolute left-4 top-[52%] hidden w-14 opacity-70 drop-shadow-[0_8px_16px_rgba(47,70,53,0.12)] 2xl:block"
        style={{ animationDelay: '-9s' }}
      />
      <img
        src="/dove-front.png"
        alt=""
        aria-hidden
        className="animate-dove-drift-b pointer-events-none absolute right-4 top-[68%] hidden w-16 -scale-x-100 opacity-70 drop-shadow-[0_8px_16px_rgba(47,70,53,0.12)] 2xl:block"
        style={{ animationDelay: '-3s' }}
      />

      <div className="relative z-10 mx-auto w-full max-w-[1360px] px-5 py-20 sm:px-8 sm:py-28 lg:px-12 lg:py-32">
        <div className="mx-auto max-w-2xl scroll-mt-32 text-center">
          <p className="reveal text-[10px] uppercase tracking-[0.42em] text-[#8a7220] sm:text-[11px]">
            Витрина недели
          </p>

          <h2
            className="reveal mt-5 font-display text-[clamp(2.8rem,9vw,5.5rem)] font-light leading-[0.95] text-[#1c2a22]"
            style={{ animationDelay: '0.1s' }}
          >
            Каталог
          </h2>

          <div className="rule-gold reveal mx-auto mt-7 h-px w-40" style={{ animationDelay: '0.18s' }} />
        </div>

        <div
          className="reveal mx-auto mt-9 flex max-w-2xl flex-wrap items-center justify-center gap-2.5"
          style={{ animationDelay: '0.24s' }}
          role="tablist"
          aria-label="Категории каталога"
        >
          {CATEGORIES.map((category) => {
            const active = category === activeCategory;
            return (
              <button
                key={category}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setActiveCategory(category)}
                className={[
                  'rounded-full border px-4 py-1.5 text-[10.5px] uppercase tracking-[0.16em] transition-colors duration-300 sm:text-[11px]',
                  active
                    ? 'border-[#c9a227] bg-[#c9a227] text-white'
                    : 'border-[#1c2a22]/20 text-[#1c2a22] hover:border-[#c9a227]',
                ].join(' ')}
              >
                {category}
              </button>
            );
          })}
        </div>

        <div
          id="catalog"
          ref={gridRef}
          className="mt-12 grid scroll-mt-32 grid-cols-2 items-stretch gap-x-5 gap-y-12 sm:gap-x-7 lg:mt-16 lg:grid-cols-4 lg:gap-x-9 lg:gap-y-16"
        >
          {products.map((product, index) => {
            const visible = activeCategory === 'Все' || product.category === activeCategory;
            return (
              <article
                key={product.id}
                className={[
                  'card-reveal group flex flex-col',
                  gridRevealed ? 'revealed' : '',
                  visible ? '' : 'hidden',
                ]
                  .filter(Boolean)
                  .join(' ')}
                style={{ animationDelay: `${0.08 * (index % 4) + 0.06}s` }}
              >
                <div className="relative overflow-hidden rounded-sm bg-[#ece3d5]">
                  <img
                    src={product.photo}
                    alt={`Букет «${product.name}»`}
                    loading="lazy"
                    className="aspect-[4/5] w-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#1c2a22]/25 to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />

                  {product.oldPrice && (
                    <span className="absolute left-2.5 top-2.5 rounded-full bg-[#c9a227] px-2.5 py-1 text-[9px] font-medium uppercase tracking-[0.12em] text-white shadow-sm">
                      Выгодно
                    </span>
                  )}
                </div>

                <div className="relative mt-4 flex flex-1 flex-col">
                  <div className="liquid-glass liquid-glass--ink pointer-events-none absolute -inset-x-4 -inset-y-3 rounded-xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                  <div className="relative flex flex-1 flex-col">
                    <p className="font-display text-[13px] font-light italic leading-none text-[#a08526]">
                      {product.note}
                    </p>

                    <h3 className="mt-2 font-display text-[22px] font-normal leading-tight text-[#1c2a22] sm:text-2xl">
                      {product.name}
                    </h3>

                    {/* mt-auto pins this row to the same baseline across a row
                        of cards no matter how many lines the title above ran to */}
                    <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-3">
                      <span className="flex items-baseline gap-2">
                        {product.oldPrice && (
                          <span className="text-[12px] text-[#8a7a68] line-through">
                            {formatPrice(product.oldPrice)}
                          </span>
                        )}
                        <span className="text-[13px] font-medium tracking-wide text-[#4a5750]">
                          {formatPrice(product.price)}
                        </span>
                      </span>

                      <a
                        href={telegramMessageLink(
                          buildOrderMessage(product.name, formatPrice(product.price), product.photo),
                        )}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="inline-flex items-center gap-1.5 rounded-full border border-[#1c2a22]/20 px-3.5 py-1.5 text-[10px] uppercase tracking-[0.16em] text-[#1c2a22] transition-colors duration-300 hover:border-[#c9a227] hover:bg-[#c9a227] hover:text-white"
                      >
                        <Send className="h-3 w-3" strokeWidth={1.8} aria-hidden />
                        Заказать
                        <span className="sr-only"> — «{product.name}» в Telegram</span>
                      </a>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div className="reveal relative mx-auto mt-20 max-w-xl text-center lg:mt-28" style={{ animationDelay: '0.1s' }}>
          <img
            src="/dove.png"
            alt=""
            aria-hidden
            className="animate-dove-drift-c pointer-events-none absolute -top-10 right-2 w-12 opacity-60 drop-shadow-[0_6px_12px_rgba(47,70,53,0.1)] sm:-top-12 sm:right-8 sm:w-14"
            style={{ animationDelay: '-13s' }}
          />
          <h3 className="font-display text-2xl font-normal text-[#1c2a22] sm:text-[28px]">
            Не нашли нужный букет?
          </h3>
          <p className="mx-auto mt-3 max-w-md text-[14.5px] font-light leading-relaxed text-[#3f4c45]">
            Напишите флористу в Telegram — расскажите, кому и по какому поводу
            нужен букет, подберём с нуля.
          </p>
          <a
            href={telegramMessageLink('Здравствуйте! Не нашла(-ел) подходящий букет в каталоге — подскажете вариант?')}
            target="_blank"
            rel="noreferrer noopener"
            className="liquid-glass liquid-glass--ink mt-7 inline-flex items-center gap-2.5 rounded-full px-7 py-3.5 text-[11px] uppercase tracking-[0.2em] text-[#1c2a22] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-[1.03]"
          >
            <Send className="h-3.5 w-3.5" strokeWidth={1.6} aria-hidden />
            Написать в Telegram
          </a>
        </div>
      </div>
    </section>
  );
}
