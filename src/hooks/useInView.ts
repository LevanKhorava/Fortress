import { useEffect, useRef, useState } from 'react'

interface InViewOptions {
  threshold?: number
  rootMargin?: string
  /** Keep observing and toggle back off when the element leaves. Default: reveal once. */
  repeat?: boolean
}

/**
 * Reveal-on-scroll primitive. Returns a ref to attach and whether it has entered
 * the viewport. Defaults to firing once so reveals never re-run while scrolling back.
 */
export function useInView<T extends HTMLElement>(
  threshold = 0.2,
  { rootMargin = '0px 0px -10% 0px', repeat = false }: InViewOptions = {},
) {
  const ref = useRef<T>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    // No IntersectionObserver (or a test env): show content rather than hide it.
    if (typeof IntersectionObserver === 'undefined') {
      setIsVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          if (!repeat) observer.disconnect()
        } else if (repeat) {
          setIsVisible(false)
        }
      },
      { threshold, rootMargin },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [threshold, rootMargin, repeat])

  return [ref, isVisible] as const
}
