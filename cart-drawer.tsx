'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { BrandButton } from '@/components/brand/brand-button'
import { Price } from '@/components/brand/primitives'

type Line = {
  id: string
  title: string
  meta: string
  price: number
  image: string
  qty: number
  size: string
}

const INITIAL: Line[] = [
  {
    id: 'ml-tee',
    title: 'Midnight Lion Tee',
    meta: 'Black · Midnight Lion',
    price: 29.99,
    image: '/images/lion-tee.png',
    qty: 1,
    size: 'M',
  },
  {
    id: 'ml-mug',
    title: 'Midnight Lion Mug',
    meta: 'Black · Midnight Lion',
    price: 18.99,
    image: '/images/lion-mug.png',
    qty: 2,
    size: 'One size',
  },
]

const FREE_SHIP_THRESHOLD = 75

export function CartDrawer({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  const [lines, setLines] = useState<Line[]>(INITIAL)

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

  const subtotal = lines.reduce((s, l) => s + l.price * l.qty, 0)
  const remaining = Math.max(0, FREE_SHIP_THRESHOLD - subtotal)
  const progress = Math.min(100, (subtotal / FREE_SHIP_THRESHOLD) * 100)

  function setQty(id: string, delta: number) {
    setLines((ls) =>
      ls.map((l) =>
        l.id === id ? { ...l, qty: Math.max(1, l.qty + delta) } : l,
      ),
    )
  }
  function remove(id: string) {
    setLines((ls) => ls.filter((l) => l.id !== id))
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[80]">
      <button
        type="button"
        aria-label="Close cart"
        onClick={onClose}
        className="absolute inset-0 bg-background/70 backdrop-blur-sm animate-in fade-in duration-200"
      />
      <div className="absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-background animate-in slide-in-from-right duration-300">
        <div className="flex items-center justify-between border-b border-border px-6 py-5">
          <h2 className="heading flex items-center gap-2 text-lg">
            Cart
            <span className="text-sm text-muted-foreground">
              ({lines.reduce((s, l) => s + l.qty, 0)})
            </span>
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close cart"
            className="flex size-9 items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
          >
            <X className="size-5" />
          </button>
        </div>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <div className="flex size-16 items-center justify-center rounded-full bg-secondary">
              <ShoppingBag className="size-6 text-muted-foreground" />
            </div>
            <div>
              <p className="heading text-lg">Your cart is empty</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Discover a design you love, then choose how to wear it.
              </p>
            </div>
            <BrandButton onClick={onClose}>Explore Designs</BrandButton>
          </div>
        ) : (
          <>
            {/* Free shipping progress */}
            <div className="border-b border-border px-6 py-4">
              <p className="text-xs text-muted-foreground">
                {remaining > 0 ? (
                  <>
                    You&apos;re{' '}
                    <span className="text-foreground">€{remaining.toFixed(2)}</span>{' '}
                    away from free international shipping.
                  </>
                ) : (
                  <span className="text-gold">
                    You&apos;ve unlocked free international shipping.
                  </span>
                )}
              </p>
              <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-secondary">
                <div
                  className="h-full bg-gold transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            <ul className="flex-1 divide-y divide-border overflow-y-auto px-6">
              {lines.map((l) => (
                <li key={l.id} className="flex gap-4 py-5">
                  <div className="relative size-20 shrink-0 overflow-hidden bg-surface">
                    <Image
                      src={l.image || '/placeholder.svg'}
                      alt={l.title}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="truncate text-sm">{l.title}</p>
                        <p className="text-xs text-muted-foreground">{l.meta}</p>
                        <p className="text-xs text-muted-foreground">
                          Size: {l.size}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => remove(l.id)}
                        aria-label={`Remove ${l.title}`}
                        className="text-muted-foreground transition-colors hover:text-destructive"
                      >
                        <Trash2 className="size-4" />
                      </button>
                    </div>
                    <div className="mt-auto flex items-center justify-between pt-2">
                      <div className="flex items-center border border-border">
                        <button
                          type="button"
                          onClick={() => setQty(l.id, -1)}
                          aria-label="Decrease quantity"
                          className="flex size-8 items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
                        >
                          <Minus className="size-3.5" />
                        </button>
                        <span className="w-8 text-center text-sm tabular-nums">
                          {l.qty}
                        </span>
                        <button
                          type="button"
                          onClick={() => setQty(l.id, 1)}
                          aria-label="Increase quantity"
                          className="flex size-8 items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
                        >
                          <Plus className="size-3.5" />
                        </button>
                      </div>
                      <Price amount={l.price * l.qty} />
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="border-t border-border px-6 py-5">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-display tabular-nums">
                  €{subtotal.toFixed(2)}
                </span>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                Taxes and duties calculated at checkout. Made on demand.
              </p>
              <BrandButton className="mt-4 w-full" size="lg">
                Checkout
              </BrandButton>
              <Link
                href="/cart"
                onClick={onClose}
                className="mt-3 block text-center text-xs uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:text-foreground"
              >
                View full cart
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
