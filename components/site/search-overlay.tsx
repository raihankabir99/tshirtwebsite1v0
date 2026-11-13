'use client'

import Image from 'next/image'
import { Loader2, Search, TrendingUp, X } from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'
import {
  BEST_SELLERS,
  DESIGNS,
  NEW_DROPS,
  POPULAR_SEARCHES,
} from '@/lib/data'
import { Price } from '@/components/brand/primitives'
import { cn } from '@/lib/utils'

const ALL_PRODUCTS = [...NEW_DROPS, ...BEST_SELLERS]
const RECENT = ['Midnight Lion', 'Hoodie', 'Tote bag']

export function SearchOverlay({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (open) {
      setQuery('')
      const t = setTimeout(() => inputRef.current?.focus(), 60)
      return () => clearTimeout(t)
    }
  }, [open])

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

  // Simulated async search
  useEffect(() => {
    if (!query.trim()) {
      setLoading(false)
      return
    }
    setLoading(true)
    const t = setTimeout(() => setLoading(false), 450)
    return () => clearTimeout(t)
  }, [query])

  const q = query.trim().toLowerCase()

  const productResults = useMemo(
    () =>
      q
        ? ALL_PRODUCTS.filter(
            (p) =>
              p.title.toLowerCase().includes(q) ||
              p.designName.toLowerCase().includes(q) ||
              p.productType.toLowerCase().includes(q),
          )
        : [],
    [q],
  )
  const designResults = useMemo(
    () => (q ? DESIGNS.filter((d) => d.name.toLowerCase().includes(q)) : []),
    [q],
  )

  const hasResults = productResults.length > 0 || designResults.length > 0

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[70]">
      <button
        type="button"
        aria-label="Close search"
        onClick={onClose}
        className="absolute inset-0 bg-background/80 backdrop-blur-md animate-in fade-in duration-200"
      />
      <div className="relative mx-auto w-full max-w-3xl px-4 pt-[12vh] animate-in fade-in slide-in-from-top-4 duration-300">
        {/* Input */}
        <div className="flex items-center gap-3 border-b border-border pb-4">
          <Search className="size-5 text-muted-foreground" />
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products, designs and collections…"
            aria-label="Search"
            className="w-full bg-transparent font-display text-xl tracking-tight text-foreground placeholder:text-muted-foreground/70 focus:outline-none sm:text-2xl"
          />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close search"
            className="flex size-9 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          >
            <X className="size-5" />
          </button>
        </div>

        <div className="max-h-[62vh] overflow-y-auto py-6">
          {/* Empty state — no query */}
          {!q && (
            <div className="grid gap-8">
              <SearchBlock title="Popular searches">
                <div className="flex flex-wrap gap-2">
                  {POPULAR_SEARCHES.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setQuery(s)}
                      className="border border-border px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:border-foreground/50 hover:text-foreground"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </SearchBlock>

              <SearchBlock title="Recent searches">
                <ul className="flex flex-col">
                  {RECENT.map((s) => (
                    <li key={s}>
                      <button
                        type="button"
                        onClick={() => setQuery(s)}
                        className="flex w-full items-center gap-3 py-2 text-left text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        <Search className="size-3.5" />
                        {s}
                      </button>
                    </li>
                  ))}
                </ul>
              </SearchBlock>

              <SearchBlock
                title={
                  <span className="inline-flex items-center gap-2">
                    <TrendingUp className="size-3.5 text-gold" /> Trending designs
                  </span>
                }
              >
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {DESIGNS.map((d) => (
                    <button
                      key={d.slug}
                      type="button"
                      onClick={() => setQuery(d.name)}
                      className="group text-left"
                    >
                      <div className="relative aspect-square overflow-hidden bg-surface">
                        <Image
                          src={d.image || '/placeholder.svg'}
                          alt={d.name}
                          fill
                          sizes="150px"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                      <p className="mt-2 truncate text-xs">{d.name}</p>
                    </button>
                  ))}
                </div>
              </SearchBlock>
            </div>
          )}

          {/* Loading */}
          {q && loading && (
            <div className="flex items-center justify-center gap-3 py-16 text-sm text-muted-foreground">
              <Loader2 className="size-4 animate-spin" />
              Searching…
            </div>
          )}

          {/* No results */}
          {q && !loading && !hasResults && (
            <div className="py-16 text-center">
              <p className="heading text-lg">No results for “{query}”</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Try a design name, product type or collection.
              </p>
              <div className="mt-5 flex flex-wrap justify-center gap-2">
                {POPULAR_SEARCHES.slice(0, 4).map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setQuery(s)}
                    className="border border-border px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:border-foreground/50 hover:text-foreground"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Results */}
          {q && !loading && hasResults && (
            <div className="grid gap-8">
              {designResults.length > 0 && (
                <SearchBlock title={`Designs (${designResults.length})`}>
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                    {designResults.map((d) => (
                      <div key={d.slug} className="group">
                        <div className="relative aspect-square overflow-hidden bg-surface">
                          <Image
                            src={d.image || '/placeholder.svg'}
                            alt={d.name}
                            fill
                            sizes="150px"
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>
                        <p className="mt-2 truncate text-xs">{d.name}</p>
                        <p className="text-[0.6875rem] text-muted-foreground">
                          {d.productCount} products
                        </p>
                      </div>
                    ))}
                  </div>
                </SearchBlock>
              )}

              {productResults.length > 0 && (
                <SearchBlock title={`Products (${productResults.length})`}>
                  <ul className="grid gap-1">
                    {productResults.map((p) => (
                      <li key={p.id}>
                        <button
                          type="button"
                          className="flex w-full items-center gap-4 p-2 text-left transition-colors hover:bg-secondary"
                        >
                          <span className="relative size-14 shrink-0 overflow-hidden bg-surface">
                            <Image
                              src={p.image || '/placeholder.svg'}
                              alt={p.title}
                              fill
                              sizes="56px"
                              className="object-cover"
                            />
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="block truncate text-sm">
                              {p.title}
                            </span>
                            <span className="block text-xs text-muted-foreground">
                              {p.designName} · {p.productType}
                            </span>
                          </span>
                          <Price amount={p.price} compareAt={p.compareAt} />
                        </button>
                      </li>
                    ))}
                  </ul>
                </SearchBlock>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function SearchBlock({
  title,
  children,
}: {
  title: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <section>
      <h2 className="eyebrow mb-3 text-muted-foreground">{title}</h2>
      {children}
    </section>
  )
}
