import { useEffect, useState } from 'react'

/**
 * Tracks how far the page has scrolled (0..1) and which of `sectionIds` is
 * currently in view. Both are read from one rAF-coalesced scroll listener so
 * the navigation costs a single measurement per frame.
 */
export function useScrollSpy(sectionIds: readonly string[]) {
  const [progress, setProgress] = useState(0)
  const [active, setActive] = useState(sectionIds[0] ?? '')
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    let ticking = false

    const measure = () => {
      ticking = false
      const doc = document.documentElement
      const max = doc.scrollHeight - doc.clientHeight
      const y = window.scrollY
      setProgress(max > 0 ? Math.min(1, Math.max(0, y / max)) : 0)
      setScrolled(y > 24)

      // The section whose top has most recently passed the 40% line wins.
      const line = window.innerHeight * 0.4
      let current = sectionIds[0] ?? ''
      for (const id of sectionIds) {
        const node = document.getElementById(id)
        if (node && node.getBoundingClientRect().top <= line) current = id
      }
      setActive(current)
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
  }, [sectionIds])

  return { progress, active, scrolled }
}
