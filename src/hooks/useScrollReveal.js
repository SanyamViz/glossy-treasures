// src/hooks/useScrollReveal.js
import { useEffect, useRef } from 'react'

export default function useScrollReveal(threshold = 0.15) {
    const ref = useRef()

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed')
                    observer.unobserve(entry.target)
                }
            },
            { threshold }
        )
        if (ref.current) observer.observe(ref.current)
        return () => observer.disconnect()
    }, [])

    return ref
}