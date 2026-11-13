'use client'

import Link from 'next/link'
import { Heart, Menu, Search, ShoppingBag, User } from 'lucide-react'
import { useEffect, useState } from 'react'
import { AnnouncementBar } from '@/components/site/announcement-bar'
import { CartDrawer } from '@/components/site/cart-drawer'
import { Logo } from '@/components/site/logo'
import { MegaMenu, type MenuKey } from '@/components/site/mega-menu'
import { MobileNav } from '@/components/site/mobile-nav'
import { SearchOverlay } from '@/components/site/search-overlay'
import { cn } from '@/lib/utils'

const NAV: { label: string; href: string; menu?: MenuKey }[] = [
  { label: 'Shop', href: '/shop', menu: 'shop' },
  { label: 'Designs', href: '/designs', menu: 'designs' },
  { label: 'Collections', href: '/collections', menu: 'collections' },
  { label: 'New Drops', href: '/new-drops' },
  { label: 'Best Sellers', href: '/best-sellers' },
  { label: 'Blog', href: '/blog' },
]

export function Header({ overlay = false }: { overlay?: boolean }) {
  const [scrolled, setScrolled] = useState(false)
  const [activeMenu, setActiveMenu] = useState<MenuKey | null>(null)
  const [searchOpen, setSearchOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 24)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Transparent only when overlaying a hero, at top, and no menu open
  const transparent = overlay && !scrolled && !activeMenu

  return (
    <>
      <div className="fixed inset-x-0 top-0 z-50">
        <div
          className={cn(
            'transition-[background-color,border-color] duration-300',
            transparent
              ? 'border-b border-transparent bg-transparent'
              : 'border-b border-border bg-background/85 backdrop-blur-xl',
          )}
        >
          {!scrolled && <AnnouncementBar />}

          <div
            onMouseLeave={() => setActiveMenu(null)}
            className="mx-auto max-w-[88rem] px-5 lg:px-10"
          >
            <div className="flex h-16 items-center justify-between gap-4 lg:h-[4.5rem]">
              {/* Left: mobile menu + logo */}
              <div className="flex items-center gap-3 lg:w-56">
                <button
                  type="button"
                  onClick={() => setMobileOpen(true)}
                  aria-label="Open menu"
                  className="flex size-10 items-center justify-center -ml-2 lg:hidden"
                >
                  <Menu className="size-5" />
                </button>
                <Logo className="hidden sm:inline-flex" />
              </div>

              {/* Center: logo on mobile, nav on desktop */}
              <Logo className="sm:hidden" />
              <nav
                aria-label="Primary"
                className="hidden items-center gap-8 lg:flex"
              >
                {NAV.map((item) => (
                  <div
                    key={item.href}
                    onMouseEnter={() =>
                      setActiveMenu(item.menu ?? null)
                    }
                    className="flex h-[4.5rem] items-center"
                  >
                    <Link
                      href={item.href}
                      aria-expanded={item.menu ? activeMenu === item.menu : undefined}
                      className={cn(
                        'relative text-xs font-medium uppercase tracking-[0.14em] transition-colors after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-gold after:transition-transform after:duration-300 hover:after:scale-x-100',
                        activeMenu === item.menu && item.menu
                          ? 'text-foreground after:scale-x-100'
                          : 'text-foreground/80 hover:text-foreground',
                      )}
                    >
                      {item.label}
                    </Link>
                  </div>
                ))}
              </nav>

              {/* Right: actions */}
              <div className="flex items-center justify-end gap-1 lg:w-56">
                <button
                  type="button"
                  onClick={() => setSearchOpen(true)}
                  aria-label="Search"
                  className="flex size-10 items-center justify-center transition-colors hover:text-gold"
                >
                  <Search className="size-[1.15rem]" />
                </button>
                <Link
                  href="/wishlist"
                  aria-label="Wishlist"
                  className="hidden size-10 items-center justify-center transition-colors hover:text-gold sm:flex"
                >
                  <Heart className="size-[1.15rem]" />
                </Link>
                <Link
                  href="/account"
                  aria-label="Account"
                  className="hidden size-10 items-center justify-center transition-colors hover:text-gold sm:flex"
                >
                  <User className="size-[1.15rem]" />
                </Link>
                <button
                  type="button"
                  onClick={() => setCartOpen(true)}
                  aria-label="Cart, 3 items"
                  className="relative flex size-10 items-center justify-center transition-colors hover:text-gold"
                >
                  <ShoppingBag className="size-[1.15rem]" />
                  <span className="absolute right-1 top-1 flex size-4 items-center justify-center rounded-full bg-gold text-[0.5625rem] font-semibold text-gold-foreground">
                    3
                  </span>
                </button>
              </div>
            </div>

            {/* Mega menu */}
            <div
              className={cn(
                'absolute inset-x-0 top-full origin-top overflow-hidden border-b border-border bg-background/95 backdrop-blur-xl transition-all duration-300',
                activeMenu
                  ? 'pointer-events-auto visible opacity-100'
                  : 'pointer-events-none invisible opacity-0',
              )}
            >
              {activeMenu && <MegaMenu menu={activeMenu} />}
            </div>
          </div>
        </div>
      </div>

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} />
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  )
}
