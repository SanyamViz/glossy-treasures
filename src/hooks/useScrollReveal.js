import { useEffect, useRef, useState } from 'react'

export default function useScrollReveal(options = {}) {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const fallback = setTimeout(() => setIsVisible(true), 800)

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          clearTimeout(fallback)
          observer.disconnect()
        }
      },
      { threshold: options.threshold || 0.15 }
    )

    if (ref.current) observer.observe(ref.current)

    return () => {
      clearTimeout(fallback)
      observer.disconnect()
    }
  }, [])
  return [ref, isVisible]
}