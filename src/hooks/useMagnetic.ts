import { useCallback, useEffect, useRef, useState } from 'react'
import type { PointerEvent as ReactPointerEvent } from 'react'
import { useReducedMotion } from './useReducedMotion.ts'

/**
 * Pulls an element a few pixels toward the cursor while it is hovered.
 * Disabled for coarse pointers (touch) and when reduced motion is requested.
 */
export function useMagnetic<T extends HTMLElement>(strength = 0.28) {
  const ref = useRef<T>(null)
  const [delta, setDelta] = useState({ x: 0, y: 0 })
  const [enabled, setEnabled] = useState(false)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (typeof matchMedia !== 'function') return
    setEnabled(matchMedia('(hover: hover) and (pointer: fine)').matches)
  }, [])

  const active = enabled && !reduced

  const onPointerMove = useCallback(
    (event: ReactPointerEvent<T>) => {
      if (!active) return
      const rect = event.currentTarget.getBoundingClientRect()
      setDelta({
        x: (event.clientX - (rect.left + rect.width / 2)) * strength,
        y: (event.clientY - (rect.top + rect.height / 2)) * strength,
      })
    },
    [active, strength],
  )

  const onPointerLeave = useCallback(() => setDelta({ x: 0, y: 0 }), [])

  return {
    ref,
    magneticProps: active ? { onPointerMove, onPointerLeave } : {},
    style: { transform: `translate3d(${delta.x}px, ${delta.y}px, 0)` },
    isActive: active && (delta.x !== 0 || delta.y !== 0),
  }
}
