'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Eye } from 'lucide-react'
import type { Product } from '@/lib/data'
import {
  ColorSwatches,
  Price,
  ProductBadge,
  WishlistButton,
} from '@/components/brand/primitives'

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="group relative flex flex-col">
      <div className="relative aspect-[4/5] overflow-hidden bg-surface">
        <Link
          href={`/product/${product.id}`}
          className="block h-full w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
          aria-label={`${product.title}, ${product.designName} design`}
        >
          <Image
            src={product.image || '/placeholder.svg'}
            alt={`${product.title} — ${product.designName} design`}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover transition-opacity duration-500 group-hover:opacity-0"
          />
          <Image
            src={product.hoverImage || product.image || '/placeholder.svg'}
            alt=""
            aria-hidden="true"
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="scale-105 object-cover opacity-0 transition-all duration-500 group-hover:scale-100 group-hover:opacity-100"
          />
        </Link>

        {product.badge && (
          <div className="absolute left-3 top-3">
            <ProductBadge label={product.badge} />
          </div>
        )}

        <div className="absolute right-3 top-3">
          <WishlistButton />
        </div>

        {/* Quick view — desktop hover, always tappable on touch via focus */}
        <div className="pointer-events-none absolute inset-x-3 bottom-3 translate-y-2 opacity-0 transition-all duration-300 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100 max-sm:pointer-events-auto max-sm:translate-y-0 max-sm:opacity-100">
          <button
            type="button"
            className="flex w-full items-center justify-center gap-2 bg-background/85 py-2.5 text-[0.6875rem] font-medium uppercase tracking-[0.16em] text-foreground backdrop-blur-sm transition-colors hover:bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
          >
            <Eye className="size-3.5" />
            Quick view
          </button>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-1.5 pt-3">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="truncate text-sm font-medium">
              <Link
                href={`/product/${product.id}`}
                className="transition-colors hover:text-gold focus-visible:outline-none focus-visible:text-gold"
              >
                {product.title}
              </Link>
            </h3>
            <p className="mt-0.5 text-xs text-muted-foreground">
              {product.designName} · {product.productType}
            </p>
          </div>
          <Price amount={product.price} compareAt={product.compareAt} />
        </div>
        <div className="mt-1">
          <ColorSwatches colors={product.colors} />
        </div>
      </div>
    </article>
  )
}
