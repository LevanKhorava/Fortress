import Crest from '../components/Crest.tsx'
import Grain from '../components/Grain.tsx'
import Reveal from '../components/Reveal.tsx'
import SectionHeading from '../components/SectionHeading.tsx'
import { useCountUp } from '../hooks/useCountUp.ts'
import { useInView } from '../hooks/useInView.ts'
import { useParallax } from '../hooks/useParallax.ts'
import type { Counter } from '../data/team.ts'
import { clubCounters } from '../data/team.ts'
import arenaDuotone from '../assets/arena-duotone.jpg'
import arenaDeep from '../assets/arena-deep.jpg'

const manifesto = ['Defend the house', 'Earn every possession', 'No easy nights']

interface CounterCellProps {
  counter: Counter
  active: boolean
  index: number
}

function CounterCell({ counter, active, index }: CounterCellProps) {
  const decimals = counter.decimals ?? 0
  const value = useCountUp(counter.value, active, 1600 + index * 140, decimals)

  // Dividers are drawn per cell rather than with `divide-x`: in a wrapping grid
  // `divide-x` would put a rule down the left edge of every new row.
  const rules = [
    index % 2 === 1 ? 'border-l border-white/10' : '',
    index >= 2 ? 'border-t border-white/10 lg:border-t-0' : '',
    index > 0 ? 'lg:border-l lg:border-white/10' : '',
  ].join(' ')

  return (
    <div className={`flex flex-col px-4 py-9 sm:px-7 sm:py-12 lg:px-8 lg:py-16 ${rules}`}>
      {/* `dt` leads in the DOM so the list reads term-then-value to assistive
          tech; `order-*` puts the numeral on top visually. */}
      <dt className="order-2 mt-4 text-[0.6rem] font-semibold uppercase tracking-[0.22em] text-ember-500 sm:text-[0.68rem] sm:tracking-[0.34em]">
        {counter.label}
      </dt>
      <dd className="font-display nums order-1 flex items-baseline gap-0.5 text-[clamp(2.8rem,7vw,5.5rem)] font-extrabold leading-none tracking-tight text-white">
        {counter.prefix && <span className="text-[0.4em] text-ember-500">{counter.prefix}</span>}
        <span>{value.toFixed(decimals)}</span>
        {counter.suffix && <span className="text-[0.4em] text-ember-500">{counter.suffix}</span>}
      </dd>
      <dd className="order-3 mt-2 text-xs leading-relaxed text-white/40 sm:text-sm">{counter.note}</dd>
    </div>
  )
}

function About() {
  const [imageRef, offset] = useParallax<HTMLImageElement>()
  const [bandRef, bandInView] = useInView<HTMLDivElement>(0.3)

  return (
    <section
      id="team"
      aria-labelledby="team-title"
      className="relative overflow-hidden scroll-mt-20 border-t border-white/[0.07] py-24 sm:py-32 lg:py-40"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 -right-40 h-[42rem] w-[42rem] bg-radial from-ember-900/30 via-transparent to-transparent"
      />

      <div className="relative mx-auto w-full max-w-[1400px] px-5 sm:px-8 lg:px-14">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:items-start lg:gap-x-12">
          {/* Copy column */}
          <div className="lg:col-span-5">
            <SectionHeading
              index="01"
              eyebrow="The Club"
              title={
                <span id="team-title" className="block">
                  Built to
                  <br />
                  <span className="text-outline">withstand</span>
                  <br />
                  everything
                </span>
              }
              lead="Founded in Tbilisi in 2009, Black Fortress was built on one idea: the game is decided at the defensive end. Fourteen seasons later, this is still the hardest floor in the league to walk into."
            />

            <Reveal from="up" delay={260} distance={22}>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-white/60 sm:text-lg">
                We recruit temperament before talent — rebounders, switch defenders, players who are
                still standing in the fourth quarter. The roster looks the same in November as it does
                in May, and the building has swallowed far better teams than ours.
              </p>
            </Reveal>

            <Reveal from="up" delay={340} distance={20}>
              <div className="mt-12 flex items-center gap-3">
                <Crest className="h-5 w-5 shrink-0 text-ember-500" outline />
                <h3 className="text-[0.68rem] font-semibold uppercase tracking-[0.34em] text-white/50">
                  The Manifesto
                </h3>
              </div>
            </Reveal>

            <ol className="mt-6 border-t border-white/[0.07]">
              {manifesto.map((line, i) => (
                <Reveal
                  key={line}
                  as="li"
                  from="left"
                  delay={400 + i * 100}
                  distance={20}
                  className="group grid grid-cols-[auto_1fr] items-baseline gap-5 border-b border-white/[0.07] py-5"
                >
                  <span className="font-display nums text-xs font-bold tracking-[0.3em] text-ember-500">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="font-display text-xl font-bold uppercase tracking-tight text-white/85 transition-[color,transform] duration-500 ease-out-expo group-hover:translate-x-1 group-hover:text-white sm:text-2xl">
                    {line}
                  </span>
                </Reveal>
              ))}
            </ol>
          </div>

          {/* Image column — deliberately breaks the grid on lg. */}
          <Reveal
            from="right"
            delay={140}
            duration={1000}
            distance={40}
            className="lg:col-span-6 lg:col-start-7 lg:-mt-20"
          >
            <figure className="relative h-[420px] overflow-hidden clip-bastion bg-ink-900 ring-1 ring-white/10 sm:h-[560px] lg:h-[780px]">
              {/* Oversized so the parallax drift never exposes an edge. */}
              <img
                ref={imageRef}
                src={arenaDuotone}
                alt="The empty bowl of Tbilisi Arena lit in ember before a Black Fortress home game."
                width={2200}
                height={1228}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover"
                style={{
                  transform: `translate3d(0, ${(offset * -4).toFixed(2)}%, 0) scale(1.1)`,
                  willChange: 'transform',
                }}
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-linear-to-t from-ink-950 via-ink-950/25 to-ink-950/40"
              />
              <Grain />
              <span aria-hidden="true" className="absolute top-0 left-0 h-px w-2/3 rule-ember" />
              <span
                aria-hidden="true"
                className="absolute bottom-0 left-0 h-28 w-px bg-linear-to-t from-ember-500 to-transparent"
              />
              <figcaption className="absolute bottom-0 left-0 right-0 flex flex-col gap-1 p-6 sm:p-8">
                <span className="text-[0.6rem] font-semibold uppercase tracking-[0.24em] text-ember-500 sm:text-[0.68rem] sm:tracking-[0.34em]">
                  The Fortress
                </span>
                <span className="font-display nums text-xs uppercase tracking-[0.12em] text-white/50 sm:text-sm sm:tracking-[0.18em]">
                  Tbilisi Arena · Est. 2009
                </span>
              </figcaption>
            </figure>
          </Reveal>
        </div>

        {/* Counter band — one observer so all four numerals start together. */}
        <div
          ref={bandRef}
          className="relative mt-20 overflow-hidden clip-bastion ring-1 ring-white/10 lg:mt-28"
        >
          <img
            src={arenaDeep}
            alt=""
            aria-hidden="true"
            width={2000}
            height={1116}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover opacity-20"
          />
          <div aria-hidden="true" className="absolute inset-0 bg-linear-to-b from-ink-950/80 to-ink-950" />
          <Grain />
          <dl className="relative grid grid-cols-2 lg:grid-cols-4">
            {clubCounters.map((counter, i) => (
              <CounterCell key={counter.label} counter={counter} active={bandInView} index={i} />
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}

export default About
