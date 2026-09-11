import { useEffect, useState } from 'react'
import { games } from '../data/team.ts'
import type { Game, GameStatus } from '../data/team.ts'
import Reveal from '../components/Reveal.tsx'
import SectionHeading from '../components/SectionHeading.tsx'
import EmberButton from '../components/EmberButton.tsx'
import Grain from '../components/Grain.tsx'
import { useReducedMotion } from '../hooks/useReducedMotion.ts'
import crowdDuotone from '../assets/crowd-duotone.jpg'

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

/** A Record over the union makes the three statuses exhaustive at compile time. */
const STATUS: Record<GameStatus, { label: string; chip: string }> = {
  tickets: { label: 'Tickets', chip: 'bg-ember-500 text-ink-950' },
  'sold-out': { label: 'Sold Out', chip: 'border border-white/15 text-white/40' },
  broadcast: { label: 'Live on TV', chip: 'border border-ember-500/60 text-ember-400' },
}

interface Remaining {
  days: number
  hours: number
  minutes: number
  seconds: number
  done: boolean
}

/** The fixture list carries no year, so anchor it to `from` and roll forward
 *  rather than ever counting down to a date that has already passed. */
function tipOffAt(game: Game, from: Date): number {
  const month = Math.max(0, MONTHS.indexOf(game.month))
  const [hours, minutes] = game.time.split(':').map(Number)
  const target = new Date(from.getFullYear(), month, Number(game.date), hours || 0, minutes || 0, 0, 0)
  if (target.getTime() <= from.getTime()) target.setFullYear(target.getFullYear() + 1)
  return target.getTime()
}

function remainingUntil(target: number, now: number): Remaining {
  const diff = Math.max(0, target - now)
  const total = Math.floor(diff / 1000)
  return {
    days: Math.floor(total / 86400),
    hours: Math.floor((total % 86400) / 3600),
    minutes: Math.floor((total % 3600) / 60),
    seconds: total % 60,
    done: diff === 0,
  }
}

const pad = (value: number) => String(value).padStart(2, '0')

function Arrow({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true" focusable="false">
      <path d="M4 12h15M13 6l6 6-6 6" strokeLinecap="square" />
    </svg>
  )
}

function StatusChip({ status }: { status: GameStatus }) {
  const { label, chip } = STATUS[status]
  return (
    <span className={`font-display clip-bastion-sm inline-block px-3 py-1.5 text-[0.62rem] font-bold uppercase tracking-[0.2em] sm:text-[0.68rem] ${chip}`}>
      {label}
    </span>
  )
}

const nextGame = games.find((game) => game.next) ?? games[0]
const fixtures = games.filter((game) => game.id !== nextGame.id)

function Schedule() {
  const reduced = useReducedMotion()
  const [remaining, setRemaining] = useState<Remaining | null>(null)

  // Target is resolved once on mount (never at module scope, so first paint is
  // deterministic); the interval only re-reads the clock.
  useEffect(() => {
    const target = tipOffAt(nextGame, new Date())
    const tick = () => setRemaining(remainingUntil(target, Date.now()))
    tick()
    if (reduced) return
    const id = window.setInterval(tick, 1000)
    return () => window.clearInterval(id)
  }, [reduced])

  const cells = [
    { label: 'Days', value: remaining ? pad(remaining.days) : '--' },
    { label: 'Hours', value: remaining ? pad(remaining.hours) : '--' },
    { label: 'Minutes', value: remaining ? pad(remaining.minutes) : '--' },
    { label: 'Seconds', value: remaining ? pad(remaining.seconds) : '--' },
  ]

  const countdownLabel = !remaining
    ? 'Counting down to tip-off'
    : remaining.done
      ? 'Tip-off now'
      : `${remaining.days} days, ${remaining.hours} hours and ${remaining.minutes} minutes until tip-off`

  return (
    <section id="games" className="relative overflow-hidden scroll-mt-20 border-t border-white/[0.07] py-24 sm:py-32 lg:py-40">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 right-[-20%] h-[34rem] w-[34rem] bg-radial from-ember-900/35 via-ember-900/10 to-transparent blur-3xl animate-ember-drift"
      />

      <div className="relative mx-auto w-full max-w-[1400px] px-5 sm:px-8 lg:px-14">
        <SectionHeading
          index="03"
          eyebrow="Fixtures"
          title={
            <>
              Next on
              <br />
              the floor
            </>
          }
          lead="Five nights that decide the autumn. The Fortress opens its gates for three of them — and the road takes us through Kutaisi and Batumi."
        />

        {/* (A) Next game */}
        <Reveal from="up" delay={120} distance={34} className="mt-14 sm:mt-16 lg:mt-20">
          <article className="clip-bastion relative bg-ink-900 ring-1 ring-ember-500/25">
            <img
              src={crowdDuotone}
              alt=""
              aria-hidden="true"
              loading="lazy"
              width={2200}
              height={1228}
              className="absolute inset-0 h-full w-full object-cover object-center opacity-20"
            />
            <div aria-hidden="true" className="absolute inset-0 bg-linear-to-r from-ink-950 via-ink-950/90 to-ink-950/60" />
            <Grain />

            <div className="relative p-6 sm:p-10 lg:p-14">
              <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
                <span className="inline-flex items-center gap-3">
                  <span className="relative inline-flex h-2 w-2">
                    <span aria-hidden="true" className="absolute inset-0 rounded-full bg-ember-500/70 animate-pulse-ring" />
                    <span className="relative block h-2 w-2 rounded-full bg-ember-500" />
                  </span>
                  <span className="font-display text-[0.68rem] font-bold uppercase tracking-[0.34em] text-ember-400">Next Game</span>
                </span>
                <span
                  className={`font-display clip-bastion-sm px-3 py-1 text-[0.62rem] font-bold uppercase tracking-[0.24em] ${
                    nextGame.home ? 'bg-ember-500/15 text-ember-300 ring-1 ring-ember-500/40' : 'text-white/50 ring-1 ring-white/15'
                  }`}
                >
                  {nextGame.home ? 'Home' : 'Away'}
                </span>
                <span className="font-display nums ml-auto text-sm font-bold uppercase tracking-[0.2em] text-white/60 sm:text-base">
                  {nextGame.day} {nextGame.date} {nextGame.month} · {nextGame.time}
                </span>
              </div>

              <h3 className="mt-8 grid grid-cols-1 items-center gap-4 text-center sm:mt-10 sm:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] sm:gap-6 sm:text-left lg:gap-10">
                <span className="block">
                  <span className="block text-[0.6rem] font-semibold uppercase tracking-[0.34em] text-white/40">
                    {nextGame.home ? 'Home side' : 'On the road'}
                  </span>
                  <span className="font-display mt-2 block text-[clamp(1.85rem,6.5vw,3.9rem)] font-extrabold uppercase leading-[0.9] tracking-tight text-white">
                    Black Fortress
                  </span>
                </span>

                <span className="font-display relative block text-[clamp(1.6rem,5vw,2.75rem)] font-extrabold uppercase leading-none tracking-tight text-ember-500">
                  <span aria-hidden="true" className="mx-auto mb-3 block h-px w-16 rule-ember sm:hidden" />
                  VS
                  <span aria-hidden="true" className="mx-auto mt-3 block h-px w-16 rule-ember sm:hidden" />
                </span>

                <span className="block sm:text-right">
                  <span className="font-display nums block text-[0.6rem] font-semibold uppercase tracking-[0.34em] text-white/40">
                    {nextGame.abbr}
                  </span>
                  <span className="font-display mt-2 block text-[clamp(1.85rem,6.5vw,3.9rem)] font-extrabold uppercase leading-[0.9] tracking-tight text-white/85">
                    {nextGame.opponent}
                  </span>
                </span>
              </h3>

              <dl className="mt-9 grid grid-cols-1 divide-y divide-white/[0.08] border-t border-white/[0.08] sm:mt-12 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
                {[
                  { term: 'Competition', value: nextGame.competition },
                  { term: 'Venue', value: nextGame.venue },
                  { term: 'Tip-off', value: `${nextGame.time} local` },
                ].map((item) => (
                  <div key={item.term} className="py-4 sm:px-6 sm:py-5 sm:first:pl-0">
                    <dt className="text-[0.62rem] font-semibold uppercase tracking-[0.34em] text-white/40">{item.term}</dt>
                    <dd className="font-display nums mt-2 text-base font-bold uppercase tracking-[0.05em] text-white/80 sm:text-lg">{item.value}</dd>
                  </div>
                ))}
              </dl>

              <div className="mt-9 grid gap-8 sm:mt-12 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:gap-12">
                <div role="timer" aria-live="off" aria-label={countdownLabel}>
                  <span className="text-[0.62rem] font-semibold uppercase tracking-[0.34em] text-white/40">Countdown to tip-off</span>
                  {remaining?.done ? (
                    <p
                      aria-hidden="true"
                      className="font-display clip-bastion-sm mt-3 bg-ember-500/12 px-6 py-6 text-center text-[clamp(1.6rem,6vw,2.5rem)] font-extrabold uppercase tracking-[0.22em] text-ember-400 ring-1 ring-ember-500/40"
                    >
                      Tip-off
                    </p>
                  ) : (
                    <div aria-hidden="true" className="mt-3 grid grid-cols-4 gap-2 sm:gap-3 lg:max-w-[36rem]">
                      {cells.map((cell) => (
                        <div key={cell.label} className="clip-bastion-sm border border-white/10 bg-white/[0.03] px-1 py-4 text-center sm:py-5">
                          <span className="font-display nums block text-[clamp(1.5rem,6vw,3rem)] font-extrabold leading-none tracking-tight text-white">
                            {cell.value}
                          </span>
                          <span className="mt-2 block text-[0.55rem] font-semibold uppercase tracking-[0.28em] text-white/45 sm:text-[0.62rem]">
                            {cell.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <EmberButton href="#contact" className="w-full sm:w-auto">
                  Get Tickets
                </EmberButton>
              </div>
            </div>
          </article>
        </Reveal>

        {/* (B) The rest of the run */}
        <Reveal from="up" delay={80} distance={18} className="mt-16 flex items-end justify-between gap-6 sm:mt-20">
          <h3 className="font-display text-sm font-bold uppercase tracking-[0.3em] text-white/70 sm:text-base">The run after</h3>
          <span className="font-display nums text-sm font-bold uppercase tracking-[0.24em] text-ember-500">{pad(fixtures.length)}</span>
        </Reveal>

        <ul className="mt-6 divide-y divide-white/[0.08] border-y border-white/[0.08]">
          {fixtures.map((game, index) => (
            <Reveal as="li" key={game.id} from="up" delay={index * 90} distance={22} threshold={0.1}>
              <a
                href="#contact"
                className="group relative grid grid-cols-[auto_minmax(0,1fr)] items-center gap-x-4 gap-y-3 px-3 py-5 sm:gap-x-6 sm:px-4 lg:grid-cols-[6.5rem_minmax(0,1fr)_minmax(0,14rem)_auto_auto] lg:gap-x-8 lg:py-7"
                aria-label={`${game.day} ${game.date} ${game.month} — Black Fortress versus ${game.opponent}, ${game.venue}. ${STATUS[game.status].label}.`}
              >
                <span aria-hidden="true" className="absolute inset-0 bg-white/[0.03] opacity-0 transition-opacity duration-500 ease-[var(--ease-out-expo)] group-hover:opacity-100 group-focus-visible:opacity-100" />
                <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 rule-ember transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-x-100 group-focus-visible:scale-x-100" />
                {game.home && (
                  <span aria-hidden="true" className="absolute inset-y-0 left-0 w-[2px] bg-linear-to-b from-transparent via-ember-500/55 to-transparent" />
                )}

                <span className="relative block">
                  <span className="block text-[0.58rem] font-semibold uppercase tracking-[0.3em] text-white/40">{game.day}</span>
                  <span className="font-display nums mt-1 flex items-baseline gap-1.5 text-2xl font-extrabold uppercase leading-none tracking-tight text-white sm:text-3xl">
                    {game.date}
                    <span className="text-sm font-bold tracking-[0.1em] text-ember-500 sm:text-base">{game.month}</span>
                  </span>
                </span>

                <span className="relative block min-w-0 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-1.5 group-focus-visible:translate-x-1.5">
                  <span className="font-display flex items-center gap-2 text-lg font-extrabold uppercase leading-tight tracking-tight text-white sm:text-2xl">
                    <span className="truncate">{game.opponent}</span>
                    <Arrow className="hidden h-4 w-4 shrink-0 -translate-x-2 text-ember-500 opacity-0 transition-[transform,opacity] duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100 sm:block" />
                  </span>
                  <span className="nums mt-1 block truncate text-xs text-white/45 sm:text-sm">
                    {game.competition} · {game.time}
                  </span>
                </span>

                <span className="relative col-span-2 flex items-center justify-between gap-3 lg:contents">
                  <span className="min-w-0 truncate text-xs text-white/45 sm:text-sm lg:text-white/50">{game.venue}</span>
                  <span
                    className={`font-display shrink-0 px-2 py-1 text-[0.58rem] font-bold uppercase tracking-[0.22em] lg:justify-self-center ${
                      game.home ? 'text-ember-400 ring-1 ring-ember-500/35' : 'text-white/35 ring-1 ring-white/10'
                    }`}
                  >
                    {game.home ? 'H' : 'A'}
                  </span>
                  <span className="shrink-0 lg:justify-self-end">
                    <StatusChip status={game.status} />
                  </span>
                </span>
              </a>
            </Reveal>
          ))}
        </ul>

        <Reveal from="up" delay={120} distance={16} className="mt-10">
          <a
            href="#contact"
            className="group font-display inline-flex min-h-11 items-center gap-3 text-xs font-bold uppercase tracking-[0.28em] text-white/50 transition-colors duration-500 ease-[var(--ease-out-expo)] hover:text-ember-400 sm:text-sm"
          >
            Full season schedule
            <Arrow className="h-4 w-4 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-1.5" />
          </a>
        </Reveal>
      </div>
    </section>
  )
}

export default Schedule
