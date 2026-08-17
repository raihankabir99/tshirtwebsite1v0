'use client'

import Link from 'next/link'
import { ArrowUpRight, Heart, User, X } from 'lucide-react'
import { useEffect } from 'react'
import { Logo } from '@/components/site/logo'
import { RegionSelector } from '@/components/site/region-selector'

const PRIMARY = [
  { label: 'Shop', href: '/shop' },
  { label: 'Designs', href: '/designs' },
  { label: 'Collections', href: '/collections' },
  { label: 'New Drops', href: '/new-drops' },
  { label: 'Best Sellers', href: '/best-sellers' },
  { label: 'Blog', href: '/blog' },
]

const SECONDARY = [
  { label: 'About', href: '/about' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Contact', href: '/contact' },
]

export function MobileNav({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    if (open) {
      document.addEventListener('keydown', onKey)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[80] lg:hidden">
      <button
        type="button"
        aria-label="Close menu"
        onClick={onClose}
        className="absolute inset-0 bg-background/70 backdrop-blur-sm animate-in fade-in duration-200"
      />
      <div className="absolute inset-y-0 left-0 flex w-full max-w-sm flex-col bg-background animate-in slide-in-from-left duration-300">
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <Logo />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="flex size-10 items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
          >
            <X className="size-5" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-5 py-6" aria-label="Mobile">
          <ul className="flex flex-col">
            {PRIMARY.map((item, i) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={onClose}
                  className="group flex items-center justify-between border-b border-border py-4 font-display text-2xl tracking-tight transition-colors hover:text-gold"
                >
                  {item.label}
                  <ArrowUpRight className="size-5 text-muted-foreground transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-gold" />
                  <span className="sr-only">
                    {i === 0 && '(includes mega menu on desktop)'}
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <ul className="mt-6 flex flex-col gap-1">
            {SECONDARY.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={onClose}
                  className="block py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-8 grid grid-cols-2 gap-3">
            <Link
              href="/account"
              onClick={onClose}
              className="flex items-center justify-center gap-2 border border-border py-3 text-xs uppercase tracking-[0.14em] transition-colors hover:border-foreground/50"
            >
              <User className="size-4" /> Account
            </Link>
            <Link
              href="/wishlist"
              onClick={onClose}
              className="flex items-center justify-center gap-2 border border-border py-3 text-xs uppercase tracking-[0.14em] transition-colors hover:border-foreground/50"
            >
              <Heart className="size-4" /> Wishlist
            </Link>
          </div>
        </nav>

        <div className="border-t border-border px-5 py-5">
          <RegionSelector />
        </div>
      </div>
    </div>
  )
}
