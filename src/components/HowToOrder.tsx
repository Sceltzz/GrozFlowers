/**
 * The three-step "how ordering works" strip from the source site — the
 * navbar's "Доставка" link used to just repeat the destination that "О нас"
 * already covers (`#advantages`, née "Доставка"), so instead of a fifth nav
 * item it gets a real destination of its own: this section, describing the
 * actual order flow, placed after Advantages.
 */
const steps = [
  {
    title: 'Выберите букет',
    text: 'Настройте цвет и упаковку в каталоге.',
  },
  {
    title: 'Оформите в 1 клик',
    text: 'Согласуем адрес и точное время в Telegram.',
  },
  {
    title: 'Оплата после согласования',
    text: 'Менеджер выставит счёт / ссылку на оплату прямо в чате.',
  },
];

export function HowToOrder() {
  return (
    <section
      id="delivery"
      data-ground="light"
      className="relative w-full scroll-mt-28 bg-[#faf6f0] px-5 pb-28 pt-20 sm:px-8 sm:pb-36 sm:pt-24 lg:px-12 lg:pt-28"
    >
      <div className="reveal mx-auto max-w-2xl text-center">
        <p className="text-[10px] uppercase tracking-[0.42em] text-[#8a7220] sm:text-[11px]">
          Доставка
        </p>
        <h2
          className="mt-5 font-display text-[clamp(2.2rem,6vw,3.6rem)] font-light leading-[0.98] text-[#1c2a22]"
        >
          Три шага до букета
        </h2>
        <div className="rule-gold mx-auto mt-7 h-px w-40" />
      </div>

      <div
        className="reveal mx-auto mt-14 grid w-full max-w-[1180px] divide-y divide-[#1c2a22]/10 overflow-hidden rounded-[28px] border border-[#1c2a22]/10 bg-white/40 sm:grid-cols-3 sm:divide-x sm:divide-y-0 lg:mt-16"
        style={{ animationDelay: '0.12s' }}
      >
        {steps.map((step, index) => (
          <div key={step.title} className="flex flex-col gap-3 px-7 py-8 sm:px-6 sm:py-9 lg:px-9 lg:py-10">
            <span className="font-display text-[13px] font-light italic leading-none text-[#a08526]">
              Шаг {index + 1}
            </span>
            <h3 className="font-display text-[21px] font-normal leading-tight text-[#1c2a22] sm:text-[22px]">
              {step.title}
            </h3>
            <p className="text-[14px] font-light leading-relaxed text-[#3f4c45]">{step.text}</p>
          </div>
        ))}
      </div>

      {/*
        The real shop's location — a plain Yandex map-widget iframe, no API
        key needed for this kind of read-only embed (only their JS API
        requires one). Coordinates and the org id are straight from
        GrozFlowers' own Yandex Maps listing.
      */}
      <div className="reveal mx-auto mt-14 w-full max-w-[1180px] lg:mt-16" style={{ animationDelay: '0.2s' }}>
        <p className="text-center font-display text-[13px] font-light italic leading-none text-[#a08526]">
          Наш адрес
        </p>

        <div className="mt-5 overflow-hidden rounded-[28px] border border-[#1c2a22]/10 shadow-[0_20px_60px_-30px_rgba(28,42,34,0.35)]">
          <iframe
            src="https://yandex.ru/map-widget/v1/?ll=37.636940,55.793227&z=17&pt=37.636940,55.793227,pm2rdm"
            loading="lazy"
            title="GrozFlowers на карте — Москва, проспект Мира, 88, стр. 1"
            className="block h-72 w-full border-0 sm:h-96 lg:h-[420px]"
          />
        </div>

        <p className="mt-4 text-center text-[14px] font-light text-[#3f4c45]">
          Москва, проспект Мира, 88, стр. 1 · рядом с м. Рижская —{' '}
          <a
            href="https://yandex.ru/maps/org/grozflowers/96255677362/"
            target="_blank"
            rel="noreferrer noopener"
            className="underline decoration-[#c9a227]/50 underline-offset-4 transition-colors duration-300 hover:text-[#1c2a22]"
          >
            открыть в Яндекс Картах
          </a>
        </p>
      </div>
    </section>
  );
}
