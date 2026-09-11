import { useState } from 'react'
import type { Player } from '../data/team.ts'
import { players } from '../data/team.ts'
import Crest from '../components/Crest.tsx'
import Grain from '../components/Grain.tsx'
import Reveal from '../components/Reveal.tsx'
import SectionHeading from '../components/SectionHeading.tsx'
import { useReducedMotion } from '../hooks/useReducedMotion.ts'
import arenaDeep from '../assets/arena-deep.jpg'

// Pointer hover, keyboard focus and the tap toggle all drive the same reveal,
// so the three variants always travel together.
const ON_RISE =
  'group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100 group-data-[open=true]:translate-y-0 group-data-[open=true]:opacity-100'
const ON_ZOOM =
  'group-hover:scale-[1.08] group-focus-within:scale-[1.08] group-data-[open=true]:scale-[1.08]'
const ON_WASH =
  'group-hover:scale-y-100 group-focus-within:scale-y-100 group-data-[open=true]:scale-y-100'
const ON_RULE =
  'group-hover:scale-x-100 group-focus-within:scale-x-100 group-data-[open=true]:scale-x-100'
const ON_EDGE =
  'group-hover:opacity-100 group-focus-within:opacity-100 group-data-[open=true]:opacity-100'
const ON_NUMERAL =
  'group-hover:-translate-y-2 group-hover:opacity-100 group-focus-within:-translate-y-2 group-focus-within:opacity-100 group-data-[open=true]:-translate-y-2 group-data-[open=true]:opacity-100'

interface PlayerCardProps {
  player: Player
  index: number
  motionOk: boolean
}

function PlayerCard({ player, index, motionOk }: PlayerCardProps) {
  // Hover cannot reach a touch screen, so the card is also a disclosure.
  const [open, setOpen] = useState(false)

  const featured = Boolean(player.featured)
  const portrait = player.photo
  const name = `${player.first} ${player.last}`
  const statsId = `roster-stats-${player.id}`

  return (
    <Reveal
      as="article"
      from="up"
      delay={index * 90}
      duration={700}
      distance={26}
      threshold={0.1}
      className={
        featured
          ? 'relative aspect-[3/4] sm:col-span-2 sm:aspect-[16/10] lg:col-span-2 lg:row-span-2 lg:aspect-auto'
          : 'relative aspect-[3/4]'
      }
    >
      <div
        data-open={open ? 'true' : 'false'}
        className="group relative h-full w-full clip-bastion bg-white/10 p-px"
      >
        {/* Only the 1px gutter around the card below is ever visible, so this
            full-bleed fill reads as a hairline frame lighting up. */}
        <span
          aria-hidden="true"
          className={`absolute inset-0 bg-ember-500/80 opacity-0 transition-opacity duration-500 ease-[var(--ease-out-expo)] ${ON_EDGE}`}
        />

        <div className="@container relative h-full w-full overflow-hidden clip-bastion bg-ink-900">
          {portrait ? (
            <img
              src={portrait}
              alt={`${name}, number ${player.number}, ${player.position}`}
              loading="lazy"
              decoding="async"
              className={`absolute inset-0 h-full w-full object-cover object-top transition-transform duration-700 ease-[var(--ease-out-expo)] ${ON_ZOOM}`}
            />
          ) : (
            <img
              src={player.backdrop}
              alt=""
              aria-hidden="true"
              loading="lazy"
              decoding="async"
              className={`absolute inset-0 h-full w-full object-cover opacity-40 transition-transform duration-700 ease-[var(--ease-out-expo)] ${ON_ZOOM}`}
            />
          )}

          <div
            aria-hidden="true"
            className={`absolute inset-0 bg-linear-to-t ${
              portrait ? 'from-ink-950 via-ink-950/40 to-transparent' : 'from-ink-950 via-ink-950/65 to-ink-950/30'
            }`}
          />

          {/* Ember wash sweeps up out of the footer. */}
          <div
            aria-hidden="true"
            className={`absolute inset-x-0 bottom-0 h-2/3 origin-bottom scale-y-0 bg-linear-to-t from-ember-500/25 via-ember-500/10 to-transparent transition-transform duration-700 ease-[var(--ease-out-expo)] ${ON_WASH}`}
          />

          <Grain />

          {motionOk && featured && (
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 z-10 h-[10%] animate-scan bg-linear-to-b from-transparent via-ember-500/15 to-transparent"
            />
          )}

          {portrait ? (
            <span
              aria-hidden="true"
              className={`font-display nums text-outline-white absolute right-4 top-4 z-10 block text-[20cqw] font-black leading-[0.75] tracking-tight opacity-40 transition-[translate,scale,opacity] duration-700 ease-[var(--ease-out-expo)] sm:right-6 sm:top-6 ${ON_NUMERAL}`}
            >
              {player.number}
            </span>
          ) : (
            /* No portrait yet: the jersey numeral becomes the subject. */
            <div
              aria-hidden="true"
              className="absolute inset-x-0 bottom-[38%] top-0 z-10 flex items-center justify-center"
            >
              <Crest outline className="absolute h-[84%] w-auto text-white/[0.055]" />
              <span
                className={`font-display nums text-outline-thick block text-[100cqw] font-black leading-none tracking-tight opacity-60 transition-[translate,scale,opacity] duration-700 ease-[var(--ease-out-expo)] ${ON_NUMERAL}`}
              >
                {player.number}
              </span>
            </div>
          )}

          <div className="absolute inset-x-0 bottom-0 z-20 p-4 sm:p-5 lg:p-6">
            <div className="flex items-end justify-between gap-3">
              <div className="min-w-0">
                <span className="font-display nums block text-[0.7rem] font-bold tracking-[0.22em] text-ember-500">
                  <span className="sr-only">Jersey number </span>#{player.number}
                </span>
                <span className="mt-2 block truncate text-[0.68rem] font-semibold uppercase tracking-[0.34em] text-white/55">
                  {player.first}
                </span>
                <h3
                  className={`font-display mt-0.5 uppercase leading-[0.86] tracking-tight text-white ${
                    featured
                      ? 'text-[clamp(2rem,9cqw,4.6rem)] font-extrabold'
                      : 'text-[clamp(1.55rem,11cqw,2.6rem)] font-bold'
                  }`}
                >
                  {player.last}
                </h3>
                {featured && (
                  <p className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.66rem] font-semibold uppercase tracking-[0.24em] text-white/45">
                    <span className="nums">{player.height}</span>
                    <span aria-hidden="true" className="h-1 w-1 rounded-full bg-ember-500/70" />
                    <span>{player.from}</span>
                  </p>
                )}
              </div>

              <span className="font-display shrink-0 clip-bastion-sm border border-white/15 bg-ink-950/60 px-2.5 py-1.5 text-[0.6rem] font-bold uppercase tracking-[0.22em] text-white/70 transition-colors duration-500 ease-[var(--ease-out-expo)] group-hover:border-ember-500/50 group-hover:text-white group-focus-within:border-ember-500/50 group-focus-within:text-white">
                {featured ? (
                  player.position
                ) : (
                  <>
                    <span aria-hidden="true">{player.positionShort}</span>
                    <span className="sr-only">{player.position}</span>
                  </>
                )}
              </span>
            </div>

            <div
              aria-hidden="true"
              className={`mt-4 h-px origin-left scale-x-0 rule-ember transition-transform duration-700 ease-[var(--ease-out-expo)] ${ON_RULE}`}
            />

            {/* Space is reserved at rest so revealing the line never reflows the card. */}
            <ul id={statsId} className="mt-3 flex flex-wrap items-end gap-x-6 gap-y-2">
              {player.line.map((stat, statIndex) => (
                <li
                  key={stat.label}
                  className={`translate-y-3 opacity-0 transition-[translate,scale,opacity] duration-500 ease-[var(--ease-out-expo)] ${ON_RISE}`}
                  style={{ transitionDelay: `${120 + statIndex * 70}ms` }}
                >
                  <span className="block text-[0.58rem] font-semibold uppercase tracking-[0.26em] text-white/45">
                    {stat.label}
                  </span>
                  <span
                    className={`font-display nums mt-1 block font-bold leading-none text-white ${
                      featured ? 'text-2xl sm:text-3xl' : 'text-xl'
                    }`}
                  >
                    {stat.value}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Card-sized hit area: keyboard focus and touch taps both open the line.
            The outline sits inside the frame so the bastion cut cannot clip it. */}
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls={statsId}
          className="absolute inset-0 z-30 h-full w-full cursor-pointer focus-visible:[outline-offset:-6px]"
        >
          <span className="sr-only">Season averages for {name}</span>
        </button>
      </div>
    </Reveal>
  )
}

function Roster() {
  const reduced = useReducedMotion()

  return (
    <section
      id="roster"
      aria-label="Roster"
      className="relative overflow-hidden border-t border-white/[0.07] py-24 scroll-mt-20 sm:py-32 lg:py-40"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <img
          src={arenaDeep}
          alt=""
          loading="lazy"
          decoding="async"
          className="mask-fade-y h-full w-full object-cover opacity-[0.13]"
        />
        <div className="absolute -right-32 top-10 h-[34rem] w-[34rem] animate-ember-drift bg-radial from-ember-500/10 via-ember-500/[0.03] to-transparent" />
      </div>
      <Grain />

      <div className="relative mx-auto w-full max-w-[1400px] px-5 sm:px-8 lg:px-14">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
          <SectionHeading
            index="02"
            eyebrow="The Roster"
            title={
              <>
                The Men Inside <span className="text-outline">The Walls</span>
              </>
            }
            lead="One man, one job: hold the line. The first signing of a roster built to become the hardest floor in the league to walk onto."
          />
        </div>

        <div className="mt-14 grid grid-cols-1 gap-4 sm:mt-16 sm:grid-cols-2 sm:gap-5 lg:mt-20 lg:grid-cols-3">
          {players.map((player, index) => (
            <PlayerCard key={player.id} player={player} index={index} motionOk={!reduced} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Roster
