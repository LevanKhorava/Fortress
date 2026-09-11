import crowdDuotone from '../assets/crowd-duotone.jpg'
import Grain from '../components/Grain.tsx'
import Reveal from '../components/Reveal.tsx'
import { useParallax } from '../hooks/useParallax.ts'

interface HeadlineLine {
  text: string
  /** Drawn as an ember outline instead of solid white. */
  outlined?: boolean
}

const headline: HeadlineLine[] = [{ text: 'Defend' }, { text: 'The Fortress', outlined: true }]

interface Social {
  label: string
  href: string
  /** Single-path mark on a 24×24 grid, filled with evenodd so counters knock out. */
  path: string
}

const socials: Social[] = [
  {
    label: 'Black Fortress on Instagram',
    href: 'https://www.instagram.com/black_fortress_tbilisi/',
    path:
      'M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9a5.5 5.5 0 0 1-5.5 5.5h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2Z' +
      'm0 2A3.5 3.5 0 0 0 4 7.5v9A3.5 3.5 0 0 0 7.5 20h9a3.5 3.5 0 0 0 3.5-3.5v-9A3.5 3.5 0 0 0 16.5 4h-9Z' +
      'm4.5 3.6a4.4 4.4 0 1 1 0 8.8 4.4 4.4 0 0 1 0-8.8Zm0 2a2.4 2.4 0 1 0 0 4.8 2.4 2.4 0 0 0 0-4.8Z' +
      'm5.05-2.9a1.15 1.15 0 1 1 0 2.3 1.15 1.15 0 0 1 0-2.3Z',
  },
]

/**
 * Closing call to action — the loudest moment after the hero. Full-bleed crowd
 * plate under a heavy scrim, then everything centred on one axis.
 */
function CallToAction() {
  const [sectionRef, offset] = useParallax<HTMLElement>()

  return (
    <section
      ref={sectionRef}
      id="contact"
      aria-labelledby="contact-title"
      className="relative isolate flex min-h-[80svh] items-center overflow-hidden scroll-mt-20 border-y border-white/10 bg-ink-950 py-24 sm:py-32 lg:py-40"
    >
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <img
          src={crowdDuotone}
          alt=""
          width={2200}
          height={1228}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover opacity-55"
          style={{
            transform: `translate3d(0, ${(offset * -4).toFixed(2)}%, 0) scale(1.1)`,
            willChange: 'transform',
          }}
        />
        <div className="absolute inset-0 bg-linear-to-t from-ink-950 via-ink-950/75 to-ink-950" />
        {/* The drift animation owns `transform`, so the centring lives on the parent. */}
        <div className="absolute left-1/2 top-1/2 h-[95vw] w-[95vw] max-w-[1180px] -translate-x-1/2 -translate-y-1/2">
          <div className="h-full w-full bg-radial from-ember-500/25 via-ember-900/12 to-transparent animate-ember-drift" />
        </div>
        <Grain />
      </div>

      <div className="relative mx-auto w-full max-w-[1400px] px-5 text-center sm:px-8 lg:px-14">
        <Reveal from="up" distance={18}>
          <p className="flex items-center justify-center gap-3">
            <span aria-hidden="true" className="h-px w-8 bg-linear-to-r from-transparent to-ember-500" />
            <span className="font-display nums text-xs font-bold tracking-[0.32em] text-ember-500">03</span>
            <span className="text-[0.68rem] font-semibold uppercase tracking-[0.34em] text-white/55 sm:text-xs">
              Join the siege
            </span>
            <span aria-hidden="true" className="h-px w-8 rule-ember" />
          </p>
        </Reveal>

        <h2
          id="contact-title"
          className="font-display mt-7 text-[clamp(2.8rem,11vw,9rem)] font-black uppercase leading-[0.85] tracking-tight text-white"
        >
          {headline.map((line, i) => (
            // Masked wrapper: each line rises out of its own clipped band.
            <span key={line.text} className="block overflow-hidden pb-[0.06em]">
              <Reveal
                as="span"
                from="up"
                delay={90 + i * 110}
                duration={900}
                distance={110}
                className={`block ${line.outlined ? 'text-outline-thick' : ''}`}
              >
                {line.text}
              </Reveal>
            </span>
          ))}
        </h2>

        <Reveal from="up" delay={520} distance={20}>
          <a
            href="mailto:blackfortresstbilsi@gmail.com"
            className="group nums mt-10 inline-flex items-center gap-2.5 text-sm font-semibold uppercase tracking-[0.18em] text-white/55 transition-colors duration-500 ease-[var(--ease-out-expo)] hover:text-ember-400"
          >
            <svg
              viewBox="0 0 24 24"
              width="18"
              height="18"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.6}
              aria-hidden="true"
              focusable="false"
            >
              <rect x="2.5" y="4.5" width="19" height="15" rx="2" />
              <path d="m3 6 9 6.5L21 6" />
            </svg>
            blackfortresstbilsi@gmail.com
          </a>
        </Reveal>

        <Reveal from="up" delay={620} distance={20}>
          <ul className="mt-6 flex items-center justify-center gap-3">
            {socials.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.label}
                  className="flex h-11 w-11 items-center justify-center border border-white/10 clip-bastion-sm text-white/45 transition-[color,background-color,border-color] duration-500 ease-[var(--ease-out-expo)] hover:border-ember-500/60 hover:bg-ember-500/10 hover:text-ember-500"
                >
                  <svg
                    viewBox="0 0 24 24"
                    width="20"
                    height="20"
                    fill="currentColor"
                    fillRule="evenodd"
                    aria-hidden="true"
                    focusable="false"
                  >
                    <path d={social.path} />
                  </svg>
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}

export default CallToAction
