const groz = (path: string) => `https://grozflowers.ru/${path}`;

/**
 * The one interactive product — a real configurator (size / color / wrap),
 * ported from the "хит продаж" widget on grozflowers.ru. Pricing, colors,
 * packages and every image below are the real, live values on that site
 * (checked directly against its own pricing function, not guessed from the
 * catalog display, which uses separate flat numbers for the same product).
 */

export const FEATURED_COUNTS = [51, 101, 151] as const;
export type FeaturedCount = (typeof FEATURED_COUNTS)[number];

export const FEATURED_PRICING: Record<FeaturedCount, { price: number; oldPrice: number }> = {
  51: { price: 7900, oldPrice: 11300 },
  101: { price: 12900, oldPrice: 18400 },
  151: { price: 16900, oldPrice: 24100 },
};

export type FeaturedPackageKey = 'white' | 'red' | 'kraft' | 'clear' | 'blue' | 'pink';

export const FEATURED_PACKAGES: Record<
  FeaturedPackageKey,
  { name: string; swatch: string; fileKey: string }
> = {
  white: { name: 'Белая упаковка', swatch: '#f7f3ea', fileKey: 'white' },
  red: { name: 'Красная упаковка', swatch: '#8c2430', fileKey: 'red' },
  kraft: { name: 'Крафтовая бумага', swatch: '#b6905a', fileKey: 'kraft' },
  clear: { name: 'Целлофан', swatch: '#e9e4d8', fileKey: 'cellophane' },
  blue: { name: 'Голубая упаковка', swatch: '#a7c2d1', fileKey: 'blue' },
  pink: { name: 'Розовая упаковка', swatch: '#e3bcc3', fileKey: 'pink' },
};

export type FeaturedColorKey = 'red' | 'pink' | 'white' | 'raspberry' | 'jumilia';

export const FEATURED_COLORS: Record<
  FeaturedColorKey,
  {
    name: string;
    /** Builds the full display title for a given stem count. */
    title: (count: FeaturedCount) => string;
    note: string;
    swatch: string;
    packages: FeaturedPackageKey[];
    defaultPackage: FeaturedPackageKey;
  }
> = {
  red: {
    name: 'Красный',
    title: (count) => `${count} красная роза`,
    note: 'Классический вариант',
    swatch: '#9c2b3a',
    packages: ['white', 'red', 'kraft', 'clear'],
    defaultPackage: 'white',
  },
  pink: {
    name: 'Розовый',
    title: (count) => `${count} розовая роза`,
    note: 'Нежный классический оттенок',
    swatch: '#d98aa0',
    packages: ['white', 'red', 'kraft', 'clear', 'pink'],
    defaultPackage: 'white',
  },
  white: {
    name: 'Белый',
    title: (count) => `${count} белая роза`,
    note: 'Со светлой упаковкой',
    swatch: '#f6f2e8',
    packages: ['white', 'red', 'kraft', 'clear', 'blue'],
    defaultPackage: 'blue',
  },
  raspberry: {
    name: 'Малиновый',
    title: (count) => `${count} малиновая роза`,
    note: 'Насыщенный глубокий оттенок',
    swatch: '#7d1f3c',
    packages: ['white', 'red', 'kraft', 'clear'],
    defaultPackage: 'white',
  },
  jumilia: {
    name: 'Джумилия',
    title: (count) => `${count} роза Джумилия`,
    note: 'Двухцветный бутон',
    swatch: 'linear-gradient(135deg, #f3d9c8 0%, #e39a86 100%)',
    packages: ['white', 'red', 'kraft', 'clear', 'pink'],
    defaultPackage: 'pink',
  },
};

export type FeaturedView = 'profile' | 'top' | 'macro';

export const FEATURED_VIEWS: { key: FeaturedView; label: string }[] = [
  { key: 'profile', label: 'Профиль' },
  { key: 'top', label: 'Сверху' },
  { key: 'macro', label: 'Бутоны' },
];

/** The macro/"Бутоны" view ignores size and wrap — only color changes it. */
export function featuredImage(
  count: FeaturedCount,
  colorKey: FeaturedColorKey,
  packageKey: FeaturedPackageKey,
  view: FeaturedView,
): string {
  if (view === 'macro') {
    return groz(`assets/buds/bud_${colorKey}.png`);
  }
  const fileKey = FEATURED_PACKAGES[packageKey].fileKey;
  return groz(`assets/bouquets/${count}/${count}_${colorKey}_${fileKey}_${view}.png`);
}

const rubles = new Intl.NumberFormat('ru-RU');
export const formatFeaturedPrice = (value: number) => `${rubles.format(value)} ₽`;
