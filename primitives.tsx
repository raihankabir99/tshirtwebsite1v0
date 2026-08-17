'use client'

import { Heart, Star } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import type { Badge } from '@/lib/data'

// ---- Product badge -----------------------------------------------------------

const badgeStyles: Record<Badge, string> = {
  New: 'bg-foreground text-background',
  Bestseller: 'bg-gold text-gold-foreground',
  Limited: 'border border-foreground/40 text-foreground',
  Sale: 'bg-destructive text-white',
}

export function ProductBadge({
  label,
  className,
}: {
  label: Badge
  className?: string
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-1 text-[0.625rem] font-medium uppercase tracking-[0.16em]',
        badgeStyles[label],
        className,
      )}
    >
      {label}
    </span>
  )
}

// ---- Price -------------------------------------------------------------------

export function Price({
  amount,
  compareAt,
  symbol = '€',
  className,
}: {
  amount: number
  compareAt?: number
  symbol?: string
  className?: string
}) {
  return (
    <span className={cn('inline-flex items-baseline gap-2', className)}>
      <span className="font-display text-sm tracking-tight tabular-nums">
        {symbol}
        {amount.toFixed(2)}
      </span>
      {compareAt && (
        <>
          <span className="text-xs text-muted-foreground line-through tabular-nums">
            {symbol}
            {compareAt.toFixed(2)}
          </span>
          <span className="sr-only">on sale</span>
        </>
      )}
    </span>
  )
}

// ---- Rating ------------------------------------------------------------------

export function Rating({
  value,
  count,
  showCount = true,
  className,
}: {
  value: number
  count?: number
  showCount?: boolean
  className?: string
}) {
  return (
    <div
      className={cn('flex items-center gap-1.5', className)}
      aria-label={`Rated ${value} out of 5${count ? ` from ${count} reviews` : ''}`}
    >
      <span className="flex" aria-hidden="true">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={cn(
              'size-3',
              i < Math.round(value)
                ? 'fill-gold text-gold'
                : 'fill-transparent text-muted-foreground/50',
            )}
          />
        ))}
      </span>
      {showCount && count != null && (
        <span className="text-xs text-muted-foreground tabular-nums">
          {value.toFixed(1)} ({count})
        </span>
      )}
    </div>
  )
}

// ---- Wishlist button ---------------------------------------------------------

export function WishlistButton({
  className,
  label = 'Add to wishlist',
}: {
  className?: string
  label?: string
}) {
  const [active, setActive] = useState(false)
  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault()
        setActive((v) => !v)
      }}
      aria-pressed={active}
      aria-label={active ? 'Remove from wishlist' : label}
      className={cn(
        'flex size-9 items-center justify-center rounded-full bg-background/70 text-foreground backdrop-blur-sm transition-colors hover:bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold',
        className,
      )}
    >
      <Heart
        className={cn(
          'size-4 transition-all duration-300',
          active ? 'scale-110 fill-gold text-gold' : 'fill-transparent',
        )}
      />
    </button>
  )
}

// ---- Color swatches ----------------------------------------------------------

export function ColorSwatches({
  colors,
  className,
}: {
  colors: string[]
  className?: string
}) {
  return (
    <div className={cn('flex items-center gap-1.5', className)}>
      {colors.slice(0, 4).map((c, i) => (
        <span
          key={i}
          className="size-3 rounded-full ring-1 ring-inset ring-white/25"
          style={{ backgroundColor: c }}
          aria-hidden="true"
        />
      ))}
      {colors.length > 4 && (
        <span className="text-[0.625rem] text-muted-foreground">
          +{colors.length - 4}
        </span>
      )}
      <span className="sr-only">
        {colors.length} colour{colors.length > 1 ? 's' : ''} available
      </span>
    </div>
  )
}
