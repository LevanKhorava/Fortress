import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from './useReducedMotion.ts'

/**
 * Returns a ref and a -1..1 value describing where the element sits in the
 * viewport (-1 just below the fold, 0 centred, 1 just above it). Driven by a
 * scroll listener coalesced onto rAF so it never runs more than once a frame.
 */
export function useParallax<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  const [offset, setOffset] = useState(0)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced) {
      setOffset(0)
      return
    }
    const node = ref.current
    if (!node) return

    let ticking = false
    const measure = () => {
      ticking = false
      const rect = node.getBoundingClientRect()
      const vh = window.innerHeight || 1
      const centre = rect.top + rect.height / 2
      setOffset(Math.max(-1, Math.min(1, (vh / 2 - centre) / (vh / 2 + rect.height / 2))))
    }
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(measure)
    }

    measure()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [reduced])

  return [ref, offset] as const
}
