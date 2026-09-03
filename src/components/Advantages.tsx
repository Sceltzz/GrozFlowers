import { Camera, Clock, MessageCircle, Sparkles, Star } from 'lucide-react';

const YANDEX_REVIEWS_URL = 'https://yandex.ru/maps/org/grozflowers/96255677362/reviews/';

/**
 * Real reviews from GrozFlowers' own Yandex Maps listing (5.0, 83 оценки,
 * 74 отзыва at the time these were pulled) — trimmed down from the full
 * text for card length, names shortened to first name + surname initial
 * the same way Yandex already displays them.
 */
const reviews = [
  {
    name: 'Мирослав С.',
    date: 'октябрь 2025',
    text: 'Шикарный магазин, цветы в отличном состоянии, менеджер отвечает быстро. Букет доставили быстро и в идеальном состоянии.',
  },
  {
    name: 'Елизавета К.',
    date: 'август 2025',
    text: 'Цветы супер, букет отличный! Ребята молодцы, помогают с выбором, консультируют 24/7. Теперь буду заказывать только тут.',
  },
  {
    name: 'Марина Х.',
    date: 'август 2025',
    text: 'Цветы очень красивые и свежие, оформление аккуратное, доставка вовремя. Обязательно обращусь снова.',
  },
  {
    name: 'София Л.',
    date: 'октябрь 2025',
    text: 'Всё было супер: хорошее обслуживание, свежие цветы, красивая упаковка. Сделали быстро и качественно.',
  },
];

const advantages = [
  {
    icon: Clock,
    metric: 'от 30 минут',
    title: 'Экспресс-доставка',
    text: 'По Москве и Московской области — до двери. Возим сами, в термобоксе.',
  },
  {
    icon: MessageCircle,
    metric: 'с 8:00 до 22:00',
    title: 'Флорист на связи',
    text: 'Пишите в Telegram. Подскажем по составу и переделаем букет, если что-то не так.',
  },
  {
    icon: Sparkles,
    metric: 'по запросу',
    title: 'Индивидуальный подбор',
    text: 'Не нашли нужный букет в каталоге — расскажите про повод и человека, соберём с нуля.',
  },
  {
    icon: Camera,
    metric: 'каждый заказ',
    title: 'Фото и видео до отправки',
    text: 'Покажем готовый букет до выезда курьера — вы всегда видите, что получите.',
  },
];

export function Advantages() {
  return (
    <section
      id="advantages"
      className="relative overflow-hidden bg-[#2f4635] px-5 pb-32 pt-24 sm:px-8 sm:pb-40 sm:pt-36 lg:px-12 lg:pt-44"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 18% 12%, #a8b7a0 0%, transparent 42%), radial-gradient(circle at 82% 78%, #c9a227 0%, transparent 48%)',
        }}
      />

      {/* outer gutter, level with the eyebrow — outside the 1180px content box, so it's clear at every width where the section itself has margin to spare */}
      <img
        src="/dove.png"
        alt=""
        aria-hidden
        className="animate-dove-drift-a pointer-events-none absolute left-2 top-28 hidden w-14 -scale-x-100 opacity-55 drop-shadow-[0_6px_14px_rgba(8,16,11,0.28)] sm:w-16 xl:block xl:left-6 xl:top-32"
        style={{ animationDelay: '-4s' }}
      />
      {/*
        The bigger one of this pair. The internal gap between the rule and
        the grid measures out to a flat 64px at every breakpoint — nowhere
        near enough room for this one without it landing on "Флорист на
        связи". Right outer gutter instead, mirroring the left one but
        lower, so the two don't read as a mirrored pair.
      */}
      <img
        src="/dove.png"
        alt=""
        aria-hidden
        className="animate-dove-drift-c pointer-events-none absolute right-2 top-64 hidden w-20 opacity-55 drop-shadow-[0_8px_16px_rgba(8,16,11,0.28)] sm:w-24 xl:block xl:right-6 xl:top-72 xl:w-28"
        style={{ animationDelay: '-1s' }}
      />

      <div className="relative z-10 mx-auto w-full max-w-[1180px]">
        <div className="text-center">
          <p className="reveal text-[10px] uppercase tracking-[0.42em] text-[#c9a227] sm:text-[11px]">
            Мастерская
          </p>

          <h2
            className="reveal mt-5 font-display text-[clamp(2.6rem,8vw,4.8rem)] font-light leading-[0.98] text-[#faf6f0]"
            style={{ animationDelay: '0.1s' }}
          >
            Почему мы
          </h2>

          <div className="rule-gold reveal mx-auto mt-7 h-px w-40" style={{ animationDelay: '0.18s' }} />
        </div>

        <div className="mt-16 grid gap-10 md:grid-cols-2 md:gap-x-16 md:gap-y-14 lg:mt-24 lg:gap-x-20">
          {advantages.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="reveal flex gap-5 sm:gap-6"
                style={{ animationDelay: `${0.09 * index + 0.05}s` }}
              >
                <span className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#c9a227]/45 text-[#c9a227]">
                  <Icon className="h-[18px] w-[18px]" strokeWidth={1.4} aria-hidden />
                </span>

                <div>
                  <p className="text-[10px] uppercase tracking-[0.28em] text-[#c9a227]">
                    {item.metric}
                  </p>
                  <h3 className="mt-2.5 font-display text-[26px] font-normal leading-tight text-[#faf6f0] sm:text-[28px]">
                    {item.title}
                  </h3>
                  <p className="mt-2.5 max-w-md text-[14.5px] font-light leading-relaxed text-[#a8b7a0]">
                    {item.text}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="reveal mt-20 text-center lg:mt-28" style={{ animationDelay: '0.4s' }}>
          <p className="text-[10px] uppercase tracking-[0.28em] text-[#c9a227]">Отзывы клиентов</p>

          <div className="mt-4 flex items-center justify-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-[#c9a227] text-[#c9a227]" strokeWidth={1} aria-hidden />
            ))}
          </div>

          <p className="mt-4 font-display text-[44px] font-light leading-none text-[#faf6f0] sm:text-[52px]">
            5.0
          </p>

          <a
            href={YANDEX_REVIEWS_URL}
            target="_blank"
            rel="noreferrer noopener"
            className="mt-3 inline-block text-[11px] uppercase tracking-[0.16em] text-[#a8b7a0] underline decoration-[#c9a227]/40 underline-offset-4 transition-colors duration-300 hover:text-[#faf6f0]"
          >
            83 оценки · 74 отзыва на Яндекс Картах
          </a>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4 lg:gap-6">
          {reviews.map((review, index) => (
            <div
              key={review.name}
              className="reveal rounded-2xl border border-[#c9a227]/20 bg-[#faf6f0]/[0.06] p-6"
              style={{ animationDelay: `${0.08 * index + 0.45}s` }}
            >
              <p className="text-[14px] font-light italic leading-relaxed text-[#e7ede3]">
                «{review.text}»
              </p>
              <p className="mt-4 text-[10.5px] uppercase tracking-[0.16em] text-[#c9a227]">
                {review.name} · {review.date}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
