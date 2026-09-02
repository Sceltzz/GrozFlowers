/**
 * Единственный реальный канал заказа и связи у Groz Flowers — Telegram,
 * как и на исходном сайте (там нет ни одного видимого номера телефона).
 */
export const TELEGRAM_HANDLE = 'GrozFlowers';
export const TELEGRAM_URL = `https://t.me/${TELEGRAM_HANDLE}`;

/** Ссылка на чат с предзаполненным текстом (Telegram поддерживает ?text=). */
export const telegramMessageLink = (message: string) =>
  `${TELEGRAM_URL}?text=${encodeURIComponent(message)}`;

/**
 * Тот же формат заказа, что был на исходном сайте: строка товара, строка
 * доставки и ссылка на фото — флорист открывает её прямо в чате, не
 * переспрашивая, что именно выбрали. `item` — название с уже дописанным
 * вариантом упаковки/цвета, если он есть (у карточек каталога его нет, у
 * конструктора «Хит продаж» — есть).
 */
export const buildOrderMessage = (item: string, price: string, photo: string) =>
  `Здравствуйте! Хочу заказать:\n• ${item} — ${price}\n• Доставка (рассчитать по адресу)\n\n📸 Фото букета:\n${photo}`;
