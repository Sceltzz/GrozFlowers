const groz = (path: string) => `https://grozflowers.ru/${path}`;

/**
 * Ровно вкладки фильтра исходного сайта — «Все» плюс пять категорий его
 * каталога. У «Дофаминового букета XL» там своя категория «Авторские», но
 * отдельной вкладки под неё не было (только один товар) — здесь так же,
 * он остаётся виден лишь на «Все».
 */
export const CATEGORIES = ['Все', 'Розы', 'Кустовые', 'Гортензии', 'Корзины', 'Пионы'] as const;

export type Category = (typeof CATEGORIES)[number];

export type Product = {
  id: string;
  /** Название букета в витрине. */
  name: string;
  /** Короткое описание — та же формулировка, что в исходном каталоге. */
  note: string;
  /** Цена в рублях, целое число. */
  price: number;
  /** Прежняя цена — показывается зачёркнутой, если задана. */
  oldPrice?: number;
  photo: string;
  /** Категория из исходного каталога. 'Авторские' не имеет своей вкладки. */
  category: Category | 'Авторские';
};

/**
 * Реальный ассортимент grozflowers.ru — вытащен из живого каталога
 * (карточки на странице, порядок и цены на 2026-09-02). Фото хотлинкаются
 * с того же домена: это фотобиблиотека того же бизнеса, площадка та же.
 *
 * Четыре последние позиции (корзины «с буквой» / «сердце» / Full и гортензии
 * XL) на исходном сайте скрыты из вкладки «Все» и показываются только по
 * фильтру категории — здесь фильтров нет, поэтому они просто идут отдельным
 * хвостом списка.
 *
 * Интерактивный конструктор цвета/упаковки с исходного сайта не портировался
 * — это отдельная задача, если понадобится.
 */
export const products: Product[] = [
  {
    id: 'dopamine-xl',
    name: 'Дофаминовый букет XL',
    note: 'Импортный микс · Диаметр до 60 см',
    price: 12900,
    oldPrice: 16000,
    photo: groz('assets/dopaminexl/dopamine_xl_profile.png'),
    category: 'Авторские',
  },
  {
    id: 'roses-51',
    name: '51 роза',
    note: 'Высота 60 см · Премиум сорта',
    price: 7900,
    photo: groz('assets/bouquets/51/51_jumilia_pink_profile.png'),
    category: 'Розы',
  },
  {
    id: 'hydrangea-spray-classic',
    name: 'Гортензии и кустовые розы Classic',
    note: 'Авторский микс · Диаметр до 55 см',
    price: 9900,
    photo: groz('assets/hydrangea-spray/small/hydrangea_spray_small_pink_profile.png'),
    category: 'Гортензии',
  },
  {
    id: 'spray-roses-101',
    name: '101 кустовая роза',
    note: 'Premium-букет · Более 400 бутонов',
    price: 17900,
    photo: groz('assets/spray/101/101_spray_pink_pink_profile.png'),
    category: 'Кустовые',
  },
  {
    id: 'spray-roses-21',
    name: '21 кустовая роза',
    note: 'Пышные веточки · Нежная классика',
    price: 4900,
    photo: groz('assets/spray/21/21_spray_redwhite_white_profile.png'),
    category: 'Кустовые',
  },
  {
    id: 'roses-101',
    name: '101 роза',
    note: 'Высота 60 см · Пышный букет',
    price: 12900,
    photo: groz('assets/bouquets/101/101_pink_pink_profile.png'),
    category: 'Розы',
  },
  {
    id: 'spray-roses-51',
    name: '51 кустовая роза',
    note: 'Объёмный букет · Премиум стойкость',
    price: 11900,
    photo: groz('assets/spray/51/51_spray_mix_pink_profile.png'),
    category: 'Кустовые',
  },
  {
    id: 'hydrangeas-19',
    name: '19 гортензий',
    note: 'Объёмные шапки · Диаметр до 45 см',
    price: 7900,
    photo: groz('assets/hydrangeas/19/19_hydrangea_pinkwhite_profile.png'),
    category: 'Гортензии',
  },
  {
    id: 'roses-151',
    name: '151 роза',
    note: 'Высота 60 см · Гигантский букет',
    price: 15900,
    photo: groz('assets/bouquets/151/151_red_white_profile.png'),
    category: 'Розы',
  },
  {
    id: 'basket-classic',
    name: '101 роза в корзине',
    note: 'Высота 60 см · Собрана на оазисе с водой',
    price: 12900,
    photo: groz('assets/baskets/classic/basket_classic_red.png'),
    category: 'Корзины',
  },
  {
    id: 'basket-classic-201',
    name: '201 роза в корзине',
    note: 'Премиум корзина · Максимальный масштаб',
    price: 24900,
    photo: groz('assets/baskets/classic-201/basket_classic_201_redwhite.png'),
    category: 'Корзины',
  },
  {
    id: 'peonies-25',
    name: '25 голландских пионов',
    note: 'Коралловые пионы',
    price: 12900,
    photo: groz('assets/peonies/25/25_peony_coral_white_profile.png'),
    category: 'Пионы',
  },
  {
    id: 'peonies-51',
    name: '51 голландский пион',
    note: 'Премиум объём · Ароматные бутоны',
    price: 24900,
    photo: groz('assets/peonies/51/51_peony_pink_white_profile.png'),
    category: 'Пионы',
  },
  {
    id: 'hydrangea-spray-xl',
    name: 'Гортензии и кустовые розы XL',
    note: 'Гигантский объём · Диаметр до 75 см',
    price: 14900,
    photo: groz('assets/hydrangea-spray/medium/hydrangea_spray_medium_bluewhite_profile.png'),
    category: 'Гортензии',
  },
  {
    id: 'basket-letter',
    name: '101 роза с буквой',
    note: 'Красные розы · белая буква',
    price: 12900,
    photo: groz('assets/baskets/letter/basket_letter_red.png'),
    category: 'Корзины',
  },
  {
    id: 'basket-heart',
    name: '101 роза · сердце',
    note: 'Розовые розы',
    price: 12900,
    photo: groz('assets/baskets/heart/basket_heart_pink.png'),
    category: 'Корзины',
  },
  {
    id: 'basket-full',
    name: '101 роза Full',
    note: 'Красные розы',
    price: 12900,
    photo: groz('assets/baskets/full/basket_full_red.png'),
    category: 'Корзины',
  },
];

const rubles = new Intl.NumberFormat('ru-RU');

export const formatPrice = (value: number) => `${rubles.format(value)} ₽`;
