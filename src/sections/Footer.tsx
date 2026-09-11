import Crest from '../components/Crest.tsx'
import Grain from '../components/Grain.tsx'
import Reveal from '../components/Reveal.tsx'

interface FooterLink {
  label: string
  href: string
}

interface FooterColumn {
  title: string
  links: FooterLink[]
}

/** Only the four anchors that exist on this page are real; everything else is
 *  parked on "#" rather than pretending to lead somewhere. */
const columns: FooterColumn[] = [
  {
    title: 'Club',
    links: [
      { label: 'Team', href: '#team' },
      { label: 'Roster', href: '#team' },
      { label: 'History', href: '#stats' },
      { label: 'Academy', href: '#' },
    ],
  },
  {
    title: 'Matchday',
    links: [
      { label: 'Fixtures', href: '#games' },
      { label: 'Tickets', href: '#games' },
      { label: 'The Arena', href: '#' },
      { label: 'Travel', href: '#' },
    ],
  },
  {
    title: 'More',
    links: [
      { label: 'Shop', href: '#' },
      { label: 'Partners', href: '#' },
      { label: 'Press', href: '#' },
      { label: 'Contact', href: '#contact' },
    ],
  },
]

const legal: FooterLink[] = [
  { label: 'Privacy', href: '#' },
  { label: 'Terms', href: '#' },
]

const wordmark = 'FORTRESS'.split('')

function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-ink-900 py-16 sm:py-20">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-56 left-1/2 h-[34rem] w-[62rem] -translate-x-1/2 bg-radial from-ember-900/30 via-transparent to-transparent"
      />
      {/* Grain sits at roughly half its usual strength — this surface is quiet. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-55">
        <Grain />
      </div>

      <div className="relative mx-auto w-full max-w-[1400px] px-5 sm:px-8 lg:px-14">
        {/* Closing flourish: the wordmark tracked out edge to edge. */}
        <Reveal from="up" distance={34} duration={900} threshold={0.05}>
          <div aria-hidden="true" className="flex w-full select-none justify-between overflow-hidden">
            {wordmark.map((letter, i) => (
              <span
                key={`${letter}-${i}`}
                className="font-display text-outline-white block text-[clamp(3rem,16vw,13rem)] font-extrabold uppercase leading-[0.8] tracking-tight"
              >
                {letter}
              </span>
            ))}
          </div>
        </Reveal>

        <div className="mt-14 grid gap-10 sm:mt-16 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr] lg:gap-12">
          <Reveal from="up" distance={22} duration={700}>
            <div className="max-w-sm">
              <div className="flex items-center gap-3">
                <Crest className="h-9 w-9 shrink-0 text-ember-500" title="Black Fortress crest" />
                <span className="font-display text-xl font-extrabold uppercase leading-none tracking-tight text-white">
                  Black Fortress
                </span>
              </div>

              <p className="nums mt-5 text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-white/50">
                Tbilisi · Founded 2009 · Superliga
              </p>

              <p className="mt-4 text-sm leading-relaxed text-white/45 sm:text-base">
                Home games are played at The Fortress — Tbilisi Arena, 11,400 seats deep and never once
                quiet in the fourth.
              </p>
            </div>
          </Reveal>

          {columns.map((column, index) => (
            <Reveal key={column.title} from="up" distance={22} duration={700} delay={90 + index * 90}>
              <nav aria-label={column.title}>
                <h3 className="text-[0.68rem] font-semibold uppercase tracking-[0.34em] text-ember-500">
                  {column.title}
                </h3>
                <span aria-hidden="true" className="mt-4 block h-px w-10 rule-ember" />

                <ul className="mt-2 sm:mt-3">
                  {column.links.map((link) => (
                    <li key={`${column.title}-${link.label}`}>
                      <a
                        href={link.href}
                        className="group flex min-h-11 items-center gap-2.5 text-sm text-white/55 transition-colors duration-500 ease-[var(--ease-out-expo)] hover:text-ember-400 sm:min-h-0 sm:py-2"
                      >
                        <span
                          aria-hidden="true"
                          className="block h-px w-2.5 origin-left scale-x-0 bg-ember-500 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:scale-x-100"
                        />
                        <span className="transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-1">
                          {link.label}
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </Reveal>
          ))}
        </div>

        <Reveal from="up" distance={16} duration={700} delay={120}>
          <div className="mt-14 flex flex-col items-center gap-6 border-t border-white/10 pt-8 text-center sm:mt-16 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-5 sm:text-left">
            <p className="nums text-xs text-white/35">
              © {year} Black Fortress Basketball Club. All rights reserved.
            </p>

            <p className="order-first text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-white/55 sm:order-none">
              <span className="text-white/35">Partners</span>{' '}
              <span className="text-white/70">Axion</span>{' '}
              <span aria-hidden="true" className="text-ember-500">
                ·
              </span>{' '}
              <span className="text-white/70">Altitude</span>
            </p>

            <ul className="flex items-center gap-6">
              {legal.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="flex min-h-11 items-center text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-white/45 transition-colors duration-500 ease-[var(--ease-out-expo)] hover:text-ember-400 sm:min-h-0"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </footer>
  )
}

export default Footer
