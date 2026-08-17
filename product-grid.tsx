'use client'

import { useMemo, useState } from 'react'
import { SlidersHorizontal, X, Check } from 'lucide-react'
import { ProductCard } from '@/components/commerce/product-card'
import { Container } from '@/components/site/section'
import { PRODUCT_TYPES, type Product } from '@/lib/data'
import { cn } from '@/lib/utils'

type SortKey = 'featured' | 'price-asc' | 'price-desc' | 'rating'

const SORTS: { key: SortKey; label: string }[] = [
  { key: 'featured', label: 'Featured' },
  { key: 'price-asc', label: 'Price · Low to High' },
  { key: 'price-desc', label: 'Price · High to Low' },
  { key: 'rating', label: 'Top Rated' },
]

const GROUPS = ['Apparel', 'Accessories', 'Home & Lifestyle'] as const

export function ProductGrid({ products }: { products: Product[] }) {
  const [sort, setSort] = useState<SortKey>('featured')
  const [types, setTypes] = useState<string[]>([])
  const [filtersOpen, setFiltersOpen] = useState(false)

  const availableTypes = useMemo(() => {
    const set = new Set(products.map((p) => p.productType))
    return PRODUCT_TYPES.filter((t) => set.has(t.name))
  }, [products])

  const filtered = useMemo(() => {
    let list = products
    if (types.length) list = list.filter((p) => types.includes(p.productType))
    const sorted = [...list]
    switch (sort) {
      case 'price-asc':
        sorted.sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        sorted.sort((a, b) => b.price - a.price)
        break
      case 'rating':
        sorted.sort((a, b) => b.rating - a.rating)
        break
    }
    return sorted
  }, [products, types, sort])

  function toggleType(name: string) {
    setTypes((t) =>
      t.includes(name) ? t.filter((x) => x !== name) : [...t, name],
    )
  }

  const filterPanel = (
    <div className="flex flex-col gap-8">
      {GROUPS.map((group) => {
        const groupTypes = availableTypes.filter((t) => t.group === group)
        if (!groupTypes.length) return null
        return (
          <div key={group}>
            <h3 className="eyebrow mb-4 text-muted-foreground">{group}</h3>
            <ul className="flex flex-col gap-2.5">
              {groupTypes.map((t) => {
                const active = types.includes(t.name)
                return (
                  <li key={t.slug}>
                    <button
                      type="button"
                      onClick={() => toggleType(t.name)}
                      aria-pressed={active}
                      className="group flex w-full items-center gap-3 text-left text-sm"
                    >
                      <span
                        className={cn(
                          'flex size-4 shrink-0 items-center justify-center border transition-colors',
                          active
                            ? 'border-gold bg-gold text-gold-foreground'
                            : 'border-border group-hover:border-foreground/60',
                        )}
                      >
                        {active && <Check className="size-3" aria-hidden="true" />}
                      </span>
                      <span
                        className={cn(
                          'transition-colors',
                          active
                            ? 'text-foreground'
                            : 'text-muted-foreground group-hover:text-foreground',
                        )}
                      >
                        {t.name}
                      </span>
                    </button>
                  </li>
                )
              })}
            </ul>
          </div>
        )
      })}
    </div>
  )

  return (
    <Container className="py-12 sm:py-16">
      {/* Toolbar */}
      <div className="flex items-center justify-between gap-4 border-b border-border pb-5">
        <button
          type="button"
          onClick={() => setFiltersOpen(true)}
          className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.14em] transition-colors hover:text-gold lg:hidden"
        >
          <SlidersHorizontal className="size-4" />
          Filter
          {types.length > 0 && (
            <span className="flex size-4 items-center justify-center rounded-full bg-gold text-[0.5625rem] font-semibold text-gold-foreground">
              {types.length}
            </span>
          )}
        </button>
        <p className="hidden text-xs uppercase tracking-[0.14em] text-muted-foreground lg:block">
          {filtered.length} {filtered.length === 1 ? 'product' : 'products'}
        </p>

        <div className="flex items-center gap-2">
          <label
            htmlFor="sort"
            className="hidden text-xs uppercase tracking-[0.14em] text-muted-foreground sm:block"
          >
            Sort
          </label>
          <select
            id="sort"
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
            className="h-10 border border-border bg-background px-3 text-xs uppercase tracking-[0.1em] text-foreground focus:border-gold focus:outline-none"
          >
            {SORTS.map((s) => (
              <option key={s.key} value={s.key}>
                {s.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-10 flex gap-10">
        {/* Desktop filters */}
        <aside className="hidden w-56 shrink-0 lg:block">
          <div className="sticky top-28">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="eyebrow text-foreground">Filter</h2>
              {types.length > 0 && (
                <button
                  type="button"
                  onClick={() => setTypes([])}
                  className="text-xs text-muted-foreground underline-offset-2 hover:text-foreground hover:underline"
                >
                  Clear
                </button>
              )}
            </div>
            {filterPanel}
          </div>
        </aside>

        {/* Grid */}
        <div className="min-w-0 flex-1">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-3 border border-dashed border-border py-24 text-center">
              <p className="heading text-lg">No products match your filters</p>
              <button
                type="button"
                onClick={() => setTypes([])}
                className="text-xs uppercase tracking-[0.14em] text-gold hover:underline"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
              {filtered.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile filter drawer */}
      {filtersOpen && (
        <div className="fixed inset-0 z-[80] lg:hidden">
          <button
            type="button"
            aria-label="Close filters"
            onClick={() => setFiltersOpen(false)}
            className="absolute inset-0 bg-background/70 backdrop-blur-sm animate-in fade-in duration-200"
          />
          <div className="absolute inset-y-0 left-0 flex w-full max-w-xs flex-col bg-background animate-in slide-in-from-left duration-300">
            <div className="flex items-center justify-between border-b border-border px-6 py-5">
              <h2 className="heading text-lg">Filter</h2>
              <button
                type="button"
                onClick={() => setFiltersOpen(false)}
                aria-label="Close filters"
                className="flex size-9 items-center justify-center text-muted-foreground hover:text-foreground"
              >
                <X className="size-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-6 py-6">{filterPanel}</div>
            <div className="border-t border-border px-6 py-4">
              <div className="flex gap-3">
                {types.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setTypes([])}
                    className="h-11 flex-1 border border-border text-xs font-medium uppercase tracking-[0.14em] hover:border-foreground/60"
                  >
                    Clear
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setFiltersOpen(false)}
                  className="h-11 flex-1 bg-primary text-xs font-medium uppercase tracking-[0.14em] text-primary-foreground hover:bg-primary/85"
                >
                  Show {filtered.length}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Container>
  )
}
