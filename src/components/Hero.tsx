import { useEffect, useRef } from 'react';
import { ArrowDown } from 'lucide-react';

// The file itself loops cleanly — 194 frames, an even 1/24s apart, no
// duplicated or held frame at the seam (verified with ffprobe). The stutter
// is the browser's own `loop` restart: it's a seek-to-0 that isn't
// decode-continuous, so it visibly hitches on a slow ambient scene where
// any hiccup stands out.
//
// First attempt drove the seek-back off `timeupdate` alone and dropped the
// `loop` attribute — worse: `timeupdate` only fires a few times a second,
// nowhere near precise enough to land inside a 2-frame margin, so it
// routinely overshot past the video's real end. With `loop` gone, that
// meant the video hit EOF, paused itself, and just sat there — a dead
// frozen frame instead of an occasional stutter.
//
// `requestVideoFrameCallback` fires once per displayed frame with exact
// timing, so it can land the early seek precisely — that's the primary
// mechanism now. `loop` is back as a safety net for the (rare) browser
// without rVFC: worst case that path still hitches on restart the way it
// always did, which beats a frozen video.
const LOOP_MARGIN_SECONDS = 0.084;

export function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const maybeLoop = () => {
      if (video.duration && video.currentTime >= video.duration - LOOP_MARGIN_SECONDS) {
        video.currentTime = 0;
      }
    };

    if (typeof video.requestVideoFrameCallback === 'function') {
      let cancelled = false;
      const tick: VideoFrameRequestCallback = () => {
        if (cancelled) return;
        maybeLoop();
        video.requestVideoFrameCallback(tick);
      };
      video.requestVideoFrameCallback(tick);
      return () => {
        cancelled = true;
      };
    }

    video.addEventListener('timeupdate', maybeLoop);
    return () => video.removeEventListener('timeupdate', maybeLoop);
  }, []);

  return (
    <section id="top" className="relative h-screen w-full overflow-hidden bg-[#1c1512]">
      {/*
        Generated loop (Higgsfield Seedance 2.5, image-to-video from a Nano
        Banana reference) replaces the old Unsplash stock photo — golden
        clouds and a dove, the "Golden Portal" reference brought in for
        real this time, not the SVG/CSS approximation. `motion-reduce:hidden`
        / `motion-reduce:block` is the same CSS-only reduced-motion split
        used everywhere else on the site, so a user with that preference
        never even requests the video — they get the poster frame as a
        plain static image instead.
      */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        poster="/hero-portal.jpg"
        aria-hidden
        className="absolute inset-0 hidden h-full w-full object-cover object-[50%_38%] motion-safe:block"
      >
        <source src="/hero-portal.mp4" type="video/mp4" />
      </video>
      <img
        src="/hero-portal.jpg"
        alt="Голубь пролетает сквозь золотые облака"
        className="absolute inset-0 hidden h-full w-full object-cover object-[50%_38%] motion-reduce:block"
      />

      {/*
        Scrim: holds the type without flattening the photograph. The seam at
        the bottom is the Ribbon's job now, not a fade built into this
        section — nothing here needs to resolve to any other section's color.
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
