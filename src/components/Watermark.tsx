import { useEffect, useState } from 'react'
import { useReducedMotion } from '../hooks/useReducedMotion.ts'
import watermark from '../assets/watermark.png'

/**
 * Site-wide crest watermark. Pinned to the viewport so it sits behind every
 * section, with the mark itself drifting a few px against `scrollY` — clamped
 * so a very long page can never drag it far enough to expose an edge.
 */
function Watermark() {
  const reduced = useReducedMotion()
  const [drift, setDrift] = useState(0)

  useEffect(() => {
    if (reduced) return
    let ticking = false
    const measure = () => {
      ticking = false
      setDrift(Math.max(-60, Math.min(60, -window.scrollY * 0.05)))
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

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 overflow-hidden">
      <img
        src={watermark}
        alt=""
        className="absolute left-1/2 top-1/2 h-[95vmin] w-[95vmin] max-w-none opacity-[0.22]"
        style={{ transform: `translate3d(-50%, calc(-50% + ${drift}px), 0)` }}
      />
    </div>
  )
}

export default Watermark
