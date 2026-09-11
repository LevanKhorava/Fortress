import { useEffect, useState } from 'react'
import arenaDuotone from '../assets/arena-duotone.jpg'
import howardFigure from '../assets/howard-figure.webp'
import EmberButton from '../components/EmberButton.tsx'
import Grain from '../components/Grain.tsx'
import { useParallax } from '../hooks/useParallax.ts'
import { useReducedMotion } from '../hooks/useReducedMotion.ts'

const tickerWords = ['Welcome to the Fortress', 'Est. 2025', 'Tbilisi Arena', 'Superliga 2025/26']

/** Half of the marquee track — rendered twice so the -50% loop meets itself
 *  exactly. Three passes keep one half wider than the widest viewport.
 *  Each half owns its gaps plus one trailing gap (`pr-*`), so the two halves
 *  are exactly equal in width and -50% lands on the seam. Putting the gap on
 *  the track instead would leave 2n-1 gaps for 2n items and the loop would
 *  hitch half a gap on every repeat. */
function TickerHalf() {
  return (
    <div className="flex shrink-0 items-center gap-6 pr-6 sm:gap-10 sm:pr-10">
      {[0, 1, 2].map((pass) =>
        tickerWords.map((word) => (
          <span key={`${pass}-${word}`} className="flex shrink-0 items-center gap-6 sm:gap-10">
            <span>{word}</span>
            <span aria-hidden="true" className="h-1 w-1 shrink-0 rounded-full bg-ember-500" />
          </span>
        )),
      )}
    </div>
  )
}

function Hero() {
  const [backdropRef, offset] = useParallax<HTMLDivElement>()
  const reduced = useReducedMotion()
  const [mounted, setMounted] = useState(false)

  // Page-load choreography runs one frame after paint so the first frame is the
  // "before" state rather than a flash of the finished lockup.
  useEffect(() => {
    const frame = requestAnimationFrame(() => setMounted(true))
    return () => cancelAnimationFrame(frame)
  }, [])

  const shown = mounted || reduced

  // 112%, not 104%: `leading-[0.82]` makes the line box shorter than the glyphs,
  // so the caps plus the 2px text stroke sit slightly proud of it. The extra
  // travel keeps the "before" state fully behind the mask on any fallback font.
  const lift = (delay: number) => ({
    transform: shown ? 'translate3d(0, 0, 0)' : 'translate3d(0, 112%, 0)',
    transition: reduced ? undefined : `transform 1150ms var(--ease-out-expo) ${delay}ms`,
  })

  const fade = (delay: number, y = 18) => ({
    opacity: shown ? 1 : 0,
    transform: shown ? 'translate3d(0, 0, 0)' : `translate3d(0, ${y}px, 0)`,
    transition: reduced
      ? undefined
      : `opacity 800ms var(--ease-out-expo) ${delay}ms, transform 800ms var(--ease-out-expo) ${delay}ms`,
  })

  return (
    <section
      id="home"
      className="relative isolate flex min-h-[max(640px,100svh)] w-full flex-col justify-end overflow-hidden bg-ink-950"
    >
      {/* 1 — arena plate, drifting a couple of dozen pixels against the scroll. */}
      <div ref={backdropRef} aria-hidden="true" className="absolute inset-0 -z-30 overflow-hidden">
        <img
          src={arenaDuotone}
          alt=""
          width={2200}
          height={1228}
          decoding="async"
          className="h-full w-full object-cover opacity-40"
          style={{ transform: `translate3d(0, ${offset * -26}px, 0) scale(1.08)` }}
        />
        <div className="absolute inset-0 bg-linear-to-r from-ink-950 via-ink-950/70 to-transparent lg:via-ink-950/45" />
        <div className="absolute inset-0 bg-linear-to-t from-ink-950 via-ink-950/55 to-ink-950/25" />
        <div className="absolute inset-x-0 top-0 h-44 bg-linear-to-b from-ink-950/90 to-transparent" />
      </div>

      {/* 2 — ember bloom behind the figure. The drift keyframe owns the inner
          transform, so the centring translate lives on the wrapper. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[-14%] left-1/2 -z-20 h-[min(80vh,780px)] w-[min(80vh,780px)] -translate-x-1/2 lg:left-[70%]"
      >
        <div className="h-full w-full rounded-full bg-ember-600/25 blur-[110px] animate-ember-drift" />
      </div>

      {/* 3 — oversized clipped wordmark, pure texture. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-[14%] -z-20 select-none"
        style={{
          opacity: shown ? 1 : 0,
          transition: reduced ? undefined : 'opacity 1600ms var(--ease-out-expo) 500ms',
        }}
      >
        <span className="font-display block whitespace-nowrap text-center text-[27vw] font-black uppercase leading-[0.8] tracking-[-0.045em] text-outline-thick opacity-[0.09]">
          Fortress
        </span>
      </div>

      {/* 4 — the subject. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 flex origin-bottom justify-center lg:justify-end lg:pr-[5vw]"
        style={{
          opacity: shown ? 1 : 0,
          transform: shown ? 'scale(1)' : 'scale(1.06)',
          transition: reduced
            ? undefined
            : 'opacity 1400ms var(--ease-out-expo) 100ms, transform 1600ms var(--ease-out-expo) 100ms',
        }}
      >
        <img
          src={howardFigure}
          alt=""
          width={604}
          height={1360}
          decoding="async"
          className="h-[66vh] max-h-[560px] w-auto max-w-[86vw] object-contain object-bottom opacity-30 sm:h-[74vh] sm:max-h-[780px] sm:opacity-40 lg:h-[86vh] lg:max-h-[1100px] lg:max-w-[46vw] lg:opacity-100"
          style={{
            maskImage: 'radial-gradient(at 50% 42%, black 52%, transparent 92%)',
            WebkitMaskImage: 'radial-gradient(at 50% 42%, black 52%, transparent 92%)',
            maskRepeat: 'no-repeat',
            WebkitMaskRepeat: 'no-repeat',
          }}
        />
      </div>

      {/* 5 — dissolve into the next section, then grain over everything below the type. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-56 bg-linear-to-t from-ink-950 via-ink-950/65 to-transparent"
      />
      <Grain />

      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-5 pt-36 pb-28 sm:px-8 sm:pt-40 lg:px-14 lg:pb-40">
        <div className="flex items-center gap-3" style={fade(60, 14)}>
          <span className="relative flex h-2.5 w-2.5 items-center justify-center">
            <span aria-hidden="true" className="absolute inset-0 rounded-full bg-ember-500/35 animate-pulse-ring" />
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-ember-500 animate-blink" />
          </span>
          <span aria-hidden="true" className="h-px w-8 rule-ember" />
          <span className="nums text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-white/50 sm:tracking-[0.34em]">
            Tbilisi · Superliga 2025/26
          </span>
        </div>

        <h1 className="font-display mt-6 text-[clamp(3.2rem,13vw,11rem)] font-black uppercase leading-[0.82] tracking-[-0.02em] sm:mt-8">
          {/* Each line is masked by its own overflow box; the padding gives the
              text stroke room so the mask never shaves it. */}
          <span className="-mx-[3px] block overflow-hidden px-[3px] pb-[0.06em]">
            <span className="block text-white" style={lift(140)}>
              Black
            </span>
          </span>
          <span className="-mx-[3px] block overflow-hidden px-[3px] pb-[0.06em]">
            <span className="block text-outline-thick" style={lift(270)}>
              Fortress
            </span>
          </span>
        </h1>

        <p className="mt-7 max-w-md text-base leading-relaxed text-white/60 sm:text-lg" style={fade(560)}>
          New era, one arena. Nobody leaves Tbilisi with a win they did not bleed for.
        </p>

        <div className="mt-9 flex flex-wrap items-center gap-4 sm:mt-11" style={fade(680)}>
          <EmberButton href="#about" variant="solid">
            Meet the Team
          </EmberButton>
          <EmberButton href="#games" variant="ghost">
            Next Game
          </EmberButton>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="absolute right-8 bottom-24 z-10 hidden flex-col items-center gap-4 lg:flex xl:right-14"
        style={fade(900)}
      >
        <span className="font-display text-[0.6rem] font-semibold uppercase tracking-[0.34em] text-white/40 [writing-mode:vertical-rl]">
          Scroll
        </span>
        <span className="relative block h-16 w-px overflow-hidden bg-white/15">
          <span className="absolute inset-x-0 top-0 h-5 bg-ember-500 animate-scan" />
        </span>
      </div>

      <div className="relative z-10 w-full border-t border-white/[0.07] bg-ink-950/55 backdrop-blur-sm">
        <div className="group flex overflow-hidden py-3.5">
          <div
            aria-hidden="true"
            className="font-display flex w-max shrink-0 items-center text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-white/45 animate-ticker group-hover:[animation-play-state:paused] sm:text-xs"
          >
            <TickerHalf />
            <TickerHalf />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
