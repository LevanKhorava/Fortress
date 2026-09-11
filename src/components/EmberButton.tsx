import type { ReactNode } from 'react'
import { useMagnetic } from '../hooks/useMagnetic.ts'

interface EmberButtonProps {
  href: string
  children: ReactNode
  variant?: 'solid' | 'ghost'
  className?: string
  onClick?: () => void
}

/**
 * Primary call to action. Solid is the ember fill; ghost is a hairline that
 * floods with ember on hover. Both drift a few pixels toward the cursor on
 * fine pointers — the movement is what makes them feel physical.
 */
function EmberButton({ href, children, variant = 'solid', className = '', onClick }: EmberButtonProps) {
  const { ref, magneticProps, style } = useMagnetic<HTMLAnchorElement>(0.22)

  const base =
    'group relative inline-flex items-center justify-center gap-3 overflow-hidden clip-bastion-sm px-7 py-3.5 ' +
    'font-display text-sm font-bold uppercase tracking-[0.2em] transition-[color,box-shadow,border-color] duration-500 sm:px-9 sm:text-base'

  const skin =
    variant === 'solid'
      ? 'bg-ember-500 text-ink-950 shadow-[0_0_0_0_rgba(242,107,18,0.45)] hover:shadow-[0_14px_46px_-8px_rgba(242,107,18,0.65)]'
      : 'border border-white/20 text-white hover:border-ember-500/70 hover:text-ink-950'

  return (
    <a
      ref={ref}
      href={href}
      onClick={onClick}
      {...magneticProps}
      style={{ ...style, transition: 'transform 420ms var(--ease-out-expo)' }}
      className={`${base} ${skin} ${className}`}
    >
      {/* Ghost variant floods from the bottom on hover. */}
      {variant === 'ghost' && (
        <span
          aria-hidden="true"
          className="absolute inset-0 origin-bottom scale-y-0 bg-ember-500 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:scale-y-100"
        />
      )}
      {/* Solid variant gets a light sweep. */}
      {variant === 'solid' && (
        <span
          aria-hidden="true"
          className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/45 to-transparent transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:translate-x-full"
        />
      )}
      <span className="relative z-10">{children}</span>
      <span
        aria-hidden="true"
        className="relative z-10 block h-px w-5 bg-current transition-all duration-500 ease-[var(--ease-out-expo)] group-hover:w-8"
      />
    </a>
  )
}

export default EmberButton
