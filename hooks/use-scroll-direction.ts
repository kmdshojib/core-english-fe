'use client'

import { useEffect, useState } from 'react'

export function useScrollDirection() {
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY

          // Show nav when scrolling up or at the top
          if (currentScrollY < lastScrollY || currentScrollY < 50) {
            setIsVisible(true)
          } 
          // Hide nav when scrolling down (but not at the very top)
          else if (currentScrollY > lastScrollY && currentScrollY > 50) {
            setIsVisible(false)
          }

          setLastScrollY(currentScrollY)
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  return isVisible
}
