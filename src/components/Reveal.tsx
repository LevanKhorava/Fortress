import type { ReactNode } from 'react'
import { useInView } from '../hooks/useInView.ts'

type Direction = 'up' | 'down' | 'left' | 'right' | 'none'

interface RevealProps {
  children: ReactNode
  /** Direction the content travels *from*. */
  from?: Direction
  delay?: number
  duration?: number
  distance?: number
  threshold?: number
  className?: string
  as?: 'div' | 'li' | 'span' | 'article' | 'section'
}

const hidden: Record<Direction, (d: number) => string> = {
  up: (d) => `translate3d(0, ${d}px, 0)`,
  down: (d) => `translate3d(0, -${d}px, 0)`,
  left: (d) => `translate3d(${d}px, 0, 0)`,
  right: (d) => `translate3d(-${d}px, 0, 0)`,
  none: () => 'translate3d(0, 0, 0)',
}

/**
 * Scroll-triggered entrance. Transforms and opacity only, so every reveal stays
 * on the compositor and nothing reflows as sections come into view.
 */
function Reveal({
  children,
  from = 'up',
  delay = 0,
  duration = 900,
  distance = 28,
  threshold = 0.15,
  className = '',
  as = 'div',
}: RevealProps) {
  const [ref, isVisible] = useInView<HTMLDivElement>(threshold)
  // Rendering a <div> inside a <ul> is invalid markup, so the tag stays
  // configurable; the cast keeps a single concrete ref type for all of them.
  const Tag = as as 'div'

  return (
    <Tag
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translate3d(0, 0, 0)' : hidden[from](distance),
        transition: `opacity ${duration}ms var(--ease-out-expo) ${delay}ms, transform ${duration}ms var(--ease-out-expo) ${delay}ms`,
        willChange: isVisible ? 'auto' : 'opacity, transform',
      }}
    >
      {children}
    </Tag>
  )
}

export default Reveal
