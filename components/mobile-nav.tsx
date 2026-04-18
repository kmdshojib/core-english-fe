'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu } from 'lucide-react'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/theme-toggle'

export function MobileNav() {
  const [open, setOpen] = useState(false)

  const navLinks = [
    { href: '/', label: 'Home' },
  ]

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <div className="flex items-center justify-between gap-2">
        <Link href="/" className="text-lg font-bold text-indigo-600 dark:text-indigo-400">
          core-eb-fe
        </Link>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Open menu</span>
            </Button>
          </SheetTrigger>
        </div>
      </div>

      <SheetContent side="left" className="w-[80%] max-w-xs p-0">
        <div className="flex flex-col space-y-6 p-6">
          <Link href="/" className="text-lg font-bold text-indigo-600 dark:text-indigo-400">
            core-eb-fe
          </Link>

          <nav className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-foreground hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors px-2 py-1 text-sm"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="border-t pt-4 space-y-2">
            <Button
              asChild
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
              onClick={() => setOpen(false)}
            >
              <Link href="/auth/signin">Sign In</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="w-full"
              onClick={() => setOpen(false)}
            >
              <Link href="/auth/signup">Sign Up</Link>
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
