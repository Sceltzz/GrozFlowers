import { useEffect, useState, type CSSProperties } from 'react';
import { Send } from 'lucide-react';
import { buildOrderMessage, telegramMessageLink } from '../data/contact';
import {
  FEATURED_COLORS,
  FEATURED_COUNTS,
  FEATURED_PACKAGES,
  FEATURED_PRICING,
  FEATURED_VIEWS,
  featuredImage,
  formatFeaturedPrice,
  type FeaturedColorKey,
  type FeaturedCount,
  type FeaturedPackageKey,
  type FeaturedView,
} from '../data/featured';

const swatchStyle = (swatch: string): CSSProperties =>
  swatch.startsWith('#') ? { background: swatch } : { backgroundImage: swatch };

export function FeaturedConfigurator() {
  const [count, setCount] = useState<FeaturedCount>(101);
  const [colorKey, setColorKey] = useState<FeaturedColorKey>('white');
  const [packageKey, setPackageKey] = useState<FeaturedPackageKey>('blue');
  const [view, setView] = useState<FeaturedView>('profile');

  const color = FEATURED_COLORS[colorKey];
  const pkg = FEATURED_PACKAGES[packageKey];
  const { price, oldPrice } = FEATURED_PRICING[count];
  const savings = oldPrice - price;

  // A package can be off the menu for a color that doesn't offer it (e.g.
  // "голубая упаковка" only exists for white roses) — fall back to that
  // color's own default rather than showing a wrap it doesn't have.
  useEffect(() => {
    if (!color.packages.includes(packageKey)) {
      setPackageKey(color.defaultPackage);
    }
  }, [color, packageKey]);

  const title = color.title(count);
  const photo = featuredImage(count, colorKey, packageKey, view);

  const orderMessage = buildOrderMessage(
    `${title} (${pkg.name.toLowerCase()})`,
    formatFeaturedPrice(price),
    photo,
  );

  return (
    <section
      id="featured"
      data-ground="light"
      className="relative w-full scroll-mt-28 bg-[#faf6f0] px-5 pb-4 pt-16 sm:px-8 sm:pt-20 lg:px-12 lg:pt-24"
    >
      <div className="reveal mx-auto max-w-2xl text-center">
        <p className="text-[10px] uppercase tracking-[0.42em] text-[#8a7220] sm:text-[11px]">
          Хит продаж
        </p>
      </div>

      <div className="reveal mx-auto mt-12 grid w-full max-w-[1180px] gap-10 rounded-[28px] border border-[#1c2a22]/10 bg-white/40 p-5 shadow-[0_20px_60px_-30px_rgba(28,42,34,0.35)] sm:p-7 lg:grid-cols-[1fr_1.05fr] lg:gap-14 lg:p-10">
        {/* photo */}
        <div>
          <div className="relative overflow-hidden rounded-2xl bg-[#ece3d5]">
            <img
              key={photo}
              src={photo}
              alt={title}
              className="aspect-[4/5] w-full object-cover"
            />
          </div>

          <div className="mt-4 flex gap-3">
            {FEATURED_VIEWS.map((v) => (
              <button
                key={v.key}
                type="button"
                onClick={() => setView(v.key)}
                className={[
                  'flex-1 overflow-hidden rounded-xl border transition-colors duration-300',
                  view === v.key ? 'border-[#c9a227]' : 'border-[#1c2a22]/10 hover:border-[#1c2a22]/25',
                ].join(' ')}
              >
                <img
                  src={featuredImage(count, colorKey, packageKey, v.key)}
                  alt=""
                  aria-hidden
                  className="aspect-square w-full object-cover"
                />
                <span className="block py-1.5 text-center text-[10px] uppercase tracking-[0.14em] text-[#4a5750]">
                  {v.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* details */}
        <div className="flex flex-col">
          <h2 className="font-display text-[clamp(1.9rem,4vw,2.7rem)] font-normal leading-[1.05] text-[#1c2a22]">
            {title}
          </h2>
          <p className="mt-1.5 text-[13px] text-[#6b756d]">Высота 60 см</p>

          <div className="mt-5 flex flex-wrap items-baseline gap-3">
            <span className="text-[13px] text-[#8a7a68] line-through">
              {formatFeaturedPrice(oldPrice)}
            </span>
            <span className="font-display text-[32px] font-normal text-[#1c2a22]">
              {formatFeaturedPrice(price)}
            </span>
            {savings > 0 && (
              <span className="rounded-full border border-[#c9a227]/50 px-2.5 py-1 text-[10px] uppercase tracking-[0.1em] text-[#8a7220]">
                Выгода {formatFeaturedPrice(savings)}
              </span>
            )}
          </div>

          {/* size */}
          <div className="mt-7">
            <p className="text-[10px] uppercase tracking-[0.22em] text-[#6b756d]">Размер</p>
            <div className="mt-2.5 flex gap-2.5">
              {FEATURED_COUNTS.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCount(c)}
                  className={[
                    'rounded-full border px-4 py-1.5 text-[13px] transition-colors duration-300',
                    count === c
                      ? 'border-[#c9a227] bg-[#c9a227] text-white'
                      : 'border-[#1c2a22]/20 text-[#1c2a22] hover:border-[#c9a227]',
                  ].join(' ')}
                >
                  {c} шт
                </button>
              ))}
            </div>
          </div>

          {/* color */}
          <div className="mt-6">
            <div className="flex items-baseline justify-between">
              <p className="text-[10px] uppercase tracking-[0.22em] text-[#6b756d]">Цвет</p>
              <p className="font-display text-[13px] italic text-[#a08526]">{color.note}</p>
            </div>
            <div className="mt-2.5 flex flex-wrap gap-3.5">
              {(Object.keys(FEATURED_COLORS) as FeaturedColorKey[]).map((key) => {
                const c = FEATURED_COLORS[key];
                const active = key === colorKey;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setColorKey(key)}
                    className="flex flex-col items-center gap-1.5"
                    aria-pressed={active}
                  >
                    <span
                      className={[
                        'flex h-9 w-9 items-center justify-center rounded-full border-2 transition-colors duration-300',
                        active ? 'border-[#c9a227]' : 'border-transparent',
                      ].join(' ')}
                    >
                      <span
                        className="h-6 w-6 rounded-full border border-black/10"
                        style={swatchStyle(c.swatch)}
                      />
                    </span>
                    <span className="text-[10.5px] text-[#4a5750]">{c.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* package */}
          <div className="mt-6">
            <p className="text-[10px] uppercase tracking-[0.22em] text-[#6b756d]">Упаковка</p>
            <div className="mt-2.5 flex flex-wrap gap-3.5">
              {color.packages.map((key) => {
                const p = FEATURED_PACKAGES[key];
                const active = key === packageKey;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setPackageKey(key)}
                    className="flex flex-col items-center gap-1.5"
                    aria-pressed={active}
                  >
                    <span
                      className={[
                        'flex h-9 w-9 items-center justify-center rounded-full border-2 transition-colors duration-300',
                        active ? 'border-[#c9a227]' : 'border-transparent',
                      ].join(' ')}
                    >
                      <span
                        className="h-6 w-6 rounded-full border border-black/10"
                        style={swatchStyle(p.swatch)}
                      />
                    </span>
                    <span className="max-w-[4.5rem] text-center text-[10.5px] leading-tight text-[#4a5750]">
                      {p.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <a
            href={telegramMessageLink(orderMessage)}
            target="_blank"
            rel="noreferrer noopener"
            className="mt-9 flex items-center justify-center gap-2.5 rounded-full bg-[#1c2a22] py-4 text-[12px] uppercase tracking-[0.2em] text-[#faf6f0] transition-colors duration-300 hover:bg-[#c9a227]"
          >
            <Send className="h-3.5 w-3.5" strokeWidth={1.8} aria-hidden />
            Заказать за {formatFeaturedPrice(price)}
          </a>
        </div>
      </div>
    </section>
  );
}
