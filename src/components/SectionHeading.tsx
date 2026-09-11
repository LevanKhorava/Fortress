import type { ReactNode } from 'react'
import Reveal from './Reveal.tsx'

interface SectionHeadingProps {
  /** Two-digit section marker, e.g. "02". */
  index?: string
  eyebrow: string
  title: ReactNode
  lead?: ReactNode
  align?: 'left' | 'center'
  className?: string
}

/**
 * Shared section masthead: numbered eyebrow over an oversized condensed title.
 * Keeping it in one place is what makes six very different sections read as one
 * brand.
 */
function SectionHeading({
  index,
  eyebrow,
  title,
  lead,
  align = 'left',
  className = '',
}: SectionHeadingProps) {
  const centred = align === 'center'

  return (
    <div className={`${centred ? 'mx-auto text-center' : ''} max-w-3xl ${className}`}>
      <Reveal from="up" distance={18}>
        <div
          className={`flex items-center gap-3 ${centred ? 'justify-center' : ''}`}
        >
          {index && (
            <span className="font-display nums text-xs font-bold tracking-[0.32em] text-ember-500">
              {index}
            </span>
          )}
          <span className="h-px w-8 rule-ember" />
          <span className="text-[0.68rem] font-semibold uppercase tracking-[0.34em] text-white/55 sm:text-xs">
            {eyebrow}
          </span>
        </div>
      </Reveal>

      <Reveal from="up" delay={90} distance={26}>
        <h2 className="font-display mt-4 text-[clamp(2.4rem,7.5vw,5rem)] font-extrabold uppercase leading-[0.92] tracking-tight text-white">
          {title}
        </h2>
      </Reveal>

      {lead && (
        <Reveal from="up" delay={180} distance={22}>
          <p
            className={`mt-5 max-w-xl text-base leading-relaxed text-white/60 sm:text-lg ${
              centred ? 'mx-auto' : ''
            }`}
          >
            {lead}
          </p>
        </Reveal>
      )}
    </div>
  )
}

export default SectionHeading
