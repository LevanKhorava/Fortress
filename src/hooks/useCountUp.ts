import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from './useReducedMotion.ts'

const easeOutExpo = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t))

/**
 * Animates 0 → `target` once `active` flips true, on rAF so it stays on the
 * compositor's clock rather than a timer. Snaps straight to the value when the
 * visitor prefers reduced motion.
 */
export function useCountUp(target: number, active: boolean, duration = 1800, decimals = 0) {
  const [value, setValue] = useState(0)
  const frame = useRef(0)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (!active) return
    if (reduced) {
      setValue(target)
      return
    }

    let start: number | null = null
    const step = (now: number) => {
      if (start === null) start = now
      const progress = Math.min((now - start) / duration, 1)
      const eased = easeOutExpo(progress)
      const next = target * eased
      setValue(decimals > 0 ? Number(next.toFixed(decimals)) : Math.round(next))
      if (progress < 1) frame.current = requestAnimationFrame(step)
    }

    frame.current = requestAnimationFrame(step)
    return () => cancelAnimationFrame(frame.current)
  }, [active, target, duration, decimals, reduced])

  return value
}
