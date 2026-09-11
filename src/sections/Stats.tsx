import arenaDeep from '../assets/arena-deep.jpg'
import Grain from '../components/Grain.tsx'
import Reveal from '../components/Reveal.tsx'
import SectionHeading from '../components/SectionHeading.tsx'
import { seasonMetrics } from '../data/team.ts'
import type { Metric } from '../data/team.ts'
import { useCountUp } from '../hooks/useCountUp.ts'
import { useInView } from '../hooks/useInView.ts'
import { useParallax } from '../hooks/useParallax.ts'
import { useReducedMotion } from '../hooks/useReducedMotion.ts'

interface HeroFigure {
  id: string
  label: string
  /** The part that counts up; anything non-numeric rides in prefix/suffix. */
  value: number
  decimals?: number
  prefix?: string
  suffix?: string
  note: string
}

/** Season headline figures. Not in team.ts — they belong to this section only. */
const heroFigures: HeroFigure[] = [
  {
    id: 'position',
    label: 'League Position',
    value: 1,
    suffix: 'st',
    note: 'Top of the Superliga after 27 rounds',
  },
  {
    id: 'home',
    label: 'Home Record',
    value: 14,
    suffix: '–0',
    note: 'Nobody has left The Fortress with a win',
  },
  {
    id: 'differential',
    label: 'Point Differential',
    value: 11.8,
    decimals: 1,
    prefix: '+',
    note: 'The widest margin in the competition',
  },
]

function FigureCell({ figure, active }: { figure: HeroFigure; active: boolean }) {
  const decimals = figure.decimals ?? 0
  const counted = useCountUp(figure.value, active, 2000, decimals)

  return (
    <div className="flex flex-col items-center px-6 py-10 text-center sm:px-7 sm:py-14">
      <span className="text-[0.68rem] font-semibold uppercase tracking-[0.34em] text-ember-500">
        {figure.label}
      </span>
      <span className="font-display nums mt-5 text-[clamp(3rem,9vw,7rem)] font-extrabold uppercase leading-[0.82] tracking-tight text-white">
        {figure.prefix}
        {counted.toFixed(decimals)}
        {figure.suffix}
      </span>
      <span aria-hidden="true" className="mt-6 h-px w-10 rule-ember" />
      <span className="mt-4 max-w-[24ch] text-sm leading-relaxed text-white/40">{figure.note}</span>
    </div>
  )
}

function MeterRow({ metric, active, delay }: { metric: Metric; active: boolean; delay: number }) {
  const reduced = useReducedMotion()
  const decimals = metric.decimals ?? 0
  const counted = useCountUp(metric.value, active, 1700, decimals)

  // Bar and leading edge share one timing so the tip never drifts off the fill.
  const glide = {
    transitionProperty: 'transform, opacity',
    transitionDuration: reduced ? '0ms' : '1200ms',
    transitionTimingFunction: 'var(--ease-out-expo)',
    transitionDelay: reduced ? '0ms' : `${delay}ms`,
  } as const

  return (
    <li>
      <div className="flex items-end justify-between gap-4">
        <span className="text-[0.68rem] font-semibold uppercase tracking-[0.34em] text-white/50">
          {metric.label}
        </span>
        <span className="font-display nums shrink-0 text-2xl font-extrabold leading-none tracking-tight text-white sm:text-3xl">
          {counted.toFixed(decimals)}
          {metric.suffix && <span className="text-ember-500">{metric.suffix}</span>}
        </span>
      </div>

      <div className="relative mt-3.5 h-0.5 w-full bg-white/10">
        <span
          aria-hidden="true"
          className="absolute inset-0 origin-left bg-linear-to-r from-ember-700 via-ember-500 to-ember-400 shadow-[0_0_18px] shadow-ember-500/50"
          style={{ ...glide, transform: `scaleX(${active ? metric.fill / 100 : 0})` }}
        />
        {/* Full-width rail translated so its right edge lands on the fill head.
            Held at opacity 0 until active, or its glow smudges the empty track. */}
        <span
          aria-hidden="true"
          className="absolute inset-0 flex justify-end"
          style={{
            ...glide,
            opacity: active ? 1 : 0,
            transform: `translate3d(${active ? metric.fill - 100 : -100}%, 0, 0)`,
          }}
        >
          <span className="block h-full w-[3px] bg-ember-200 shadow-[0_0_14px_2px] shadow-ember-300/75" />
        </span>
      </div>

      <p className="nums mt-2.5 text-right text-[0.66rem] font-semibold uppercase tracking-[0.22em] text-white/40">
        {metric.rank}
      </p>
    </li>
  )
}

/**
 * Season statistics — the broadcast graphics beat. Darker and full-bleed so the
 * numbers read as an overlay on the arena rather than another black panel.
 */
function Stats() {
  const [sectionRef, offset] = useParallax<HTMLElement>()
  const [heroRef, heroIn] = useInView<HTMLDivElement>(0.3)
  const [metersRef, metersIn] = useInView<HTMLDivElement>(0.25)

  return (
    <section
      ref={sectionRef}
      id="stats"
      aria-label="Season statistics"
      className="relative overflow-hidden scroll-mt-20 border-t border-white/[0.07] bg-ink-950 py-28 sm:py-36 lg:py-48"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <img
          src={arenaDeep}
          alt=""
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover opacity-30 mask-fade-y"
          style={{ transform: `translate3d(0, ${offset * -36}px, 0) scale(1.12)` }}
        />
      </div>
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-ink-950/85" />
      {/* The drift animation owns `transform`, so the centring lives on the parent. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[38%] h-[85vw] w-[85vw] max-w-[980px] -translate-x-1/2 -translate-y-1/2"
      >
        <div className="h-full w-full bg-radial from-ember-500/20 via-ember-900/10 to-transparent animate-ember-drift" />
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-linear-to-b from-ember-400/10 to-transparent animate-scan"
      />
      <Grain />

      <div className="relative mx-auto w-full max-w-[1400px] px-5 sm:px-8 lg:px-14">
        <SectionHeading
          index="04"
          eyebrow="By the Numbers"
          title="The margins we win by"
          lead="Championships are decided in the gaps nobody photographs — the extra rebound, the shot that never gets taken, the fourth quarter at home. Here is the season, measured."
          align="center"
        />

        {/* (A) Headline trio */}
        <Reveal from="up" delay={120} distance={30}>
          <div
            ref={heroRef}
            className="mt-14 grid grid-cols-1 divide-y divide-white/[0.09] border border-white/[0.09] bg-ink-950/50 clip-bastion sm:mt-20 sm:grid-cols-3 sm:divide-x sm:divide-y-0"
          >
            {heroFigures.map((figure) => (
              <FigureCell key={figure.id} figure={figure} active={heroIn} />
            ))}
          </div>
        </Reveal>

        {/* (B) Performance meters */}
        <div className="mt-20 sm:mt-28">
          <Reveal from="up" distance={20}>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-2.5 text-[0.68rem] font-semibold uppercase tracking-[0.34em] text-white/50">
                <span aria-hidden="true" className="block h-1.5 w-1.5 rounded-full bg-ember-500 animate-blink" />
                Performance Index
              </span>
              <span aria-hidden="true" className="h-px flex-1 rule-ember" />
              <span className="font-display nums hidden text-[0.68rem] font-bold uppercase tracking-[0.28em] text-ember-500 sm:block">
                Superliga 25/26
              </span>
            </div>
          </Reveal>

          <div ref={metersRef}>
            <ul className="mt-10 grid grid-cols-1 gap-x-14 gap-y-10 sm:mt-12 lg:grid-cols-2 lg:gap-x-20">
              {seasonMetrics.map((metric, i) => (
                <MeterRow key={metric.label} metric={metric} active={metersIn} delay={i * 95} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Stats
