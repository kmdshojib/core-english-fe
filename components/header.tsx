'use client'

import { useScrollDirection } from '@/hooks/use-scroll-direction'
import { MobileNav } from './mobile-nav'

export function Header() {
  const isVisible = useScrollDirection()

  return (
    <header 
      className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-transform duration-300 ease-in-out"
      style={{
        transform: isVisible ? 'translateY(0)' : 'translateY(-100%)',
      }}
    >
      <div className="px-4 py-3">
        <MobileNav />
      </div>
    </header>
  )
}
