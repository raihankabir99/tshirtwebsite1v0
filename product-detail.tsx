'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useMemo, useState } from 'react'
import { ArrowUpRight, Check, Minus, Plus, ShieldCheck, Truck, RotateCcw } from 'lucide-react'
import { BrandButton } from '@/components/brand/brand-button'
import { Container } from '@/components/site/section'
import { Breadcrumb } from '@/components/site/breadcrumb'
import {
  Price,
  ProductBadge,
  Rating,
  WishlistButton,
} from '@/components/brand/primitives'
import {
  expressionsForDesign,
  sizesForType,
  type Product,
} from '@/lib/data'
import { cn } from '@/lib/utils'

const COLOR_NAMES: Record<string, string> = {
  '#0a0a0a': 'Black',
  '#e8e4dc': 'Bone',
  '#3a3a3a': 'Charcoal',
  '#d8c7a2': 'Sand',
  '#c7a24c': 'Gold',
  '#9a9488': 'Stone',
}

export function ProductDetail({ product }: { product: Product }) {
  const expressions = useMemo(
    () => expressionsForDesign(product.designSlug),
    [product.designSlug],
  )

  // The active product "expression" (type + image). Defaults to this product.
  const initialIdx = Math.max(
    0,
    expressions.findIndex((e) => e.type === product.productType),
  )
  const [activeIdx, setActiveIdx] = useState(initialIdx)
  const active = expressions[activeIdx] ?? {
    type: product.productType,
    slug: '',
    image: product.image,
    price: product.price,
  }

  const sizes = sizesForType(active.type)
  const [size, setSize] = useState(sizes[Math.min(2, sizes.length - 1)])
  const [color, setColor] = useState(product.colors[0])
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)

  const gallery = useMemo(() => {
    const imgs = [active.image, product.hoverImage, product.image].filter(
      Boolean,
    ) as string[]
    return Array.from(new Set(imgs))
  }, [active.image, product.hoverImage, product.image])
  const [galleryIdx, setGalleryIdx] = useState(0)

  function selectExpression(i: number) {
    setActiveIdx(i)
    setGalleryIdx(0)
    setSize(sizesForType(expressions[i].type)[0])
    setAdded(false)
  }

  function addToCart() {
    setAdded(true)
    window.setTimeout(() => setAdded(false), 2200)
  }

  return (
    <section className="pt-24 sm:pt-28">
      <Container>
        <Breadcrumb
          className="mb-8"
          items={[
            { label: 'Home', href: '/' },
            { label: 'Shop', href: '/shop' },
            { label: product.designName, href: `/designs/${product.designSlug}` },
            { label: active.type },
          ]}
        />

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Gallery */}
          <div className="flex flex-col-reverse gap-4 sm:flex-row">
            <div className="flex gap-3 sm:flex-col">
              {gallery.map((img, i) => (
                <button
                  key={img + i}
                  type="button"
                  onClick={() => setGalleryIdx(i)}
                  aria-label={`View image ${i + 1}`}
                  aria-current={galleryIdx === i}
                  className={cn(
                    'relative size-16 shrink-0 overflow-hidden bg-surface ring-1 ring-inset transition-colors sm:size-20',
                    galleryIdx === i
                      ? 'ring-2 ring-gold'
                      : 'ring-border hover:ring-foreground/40',
                  )}
                >
                  <Image
                    src={img || '/placeholder.svg'}
                    alt=""
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
            <div className="relative aspect-[4/5] flex-1 overflow-hidden bg-surface">
              <Image
                key={gallery[galleryIdx]}
                src={gallery[galleryIdx] || '/placeholder.svg'}
                alt={`${product.designName} on ${active.type}`}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover animate-in fade-in duration-500"
              />
              {product.badge && (
                <div className="absolute left-4 top-4">
                  <ProductBadge label={product.badge} />
                </div>
              )}
              <div className="absolute right-4 top-4">
                <WishlistButton />
              </div>
            </div>
          </div>

          {/* Info */}
          <div className="lg:py-2">
            <p className="eyebrow text-gold">
              <Link href={`/designs/${product.designSlug}`} className="hover:underline">
                {product.designName}
              </Link>
              {' · Design'}
            </p>
            <h1 className="heading mt-3 text-3xl sm:text-4xl">
              {product.designName} {active.type}
            </h1>

            <div className="mt-4 flex items-center gap-4">
              <Price
                amount={active.price}
                compareAt={product.compareAt}
                className="[&>span:first-child]:text-lg"
              />
              <span className="h-4 w-px bg-border" />
              <Rating value={product.rating} count={product.reviews} />
            </div>

            {/* Product switcher — signature "one design, many products" UX */}
            <div className="mt-8">
              <div className="flex items-center justify-between">
                <h2 className="eyebrow text-foreground">Choose your product</h2>
                <Link
                  href={`/designs/${product.designSlug}`}
                  className="inline-flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
                >
                  View design
                  <ArrowUpRight className="size-3.5" />
                </Link>
              </div>
              <div className="mt-4 grid grid-cols-4 gap-2 sm:grid-cols-6 lg:grid-cols-4 xl:grid-cols-6">
                {expressions.map((e, i) => (
                  <button
                    key={e.type}
                    type="button"
                    onClick={() => selectExpression(i)}
                    aria-pressed={i === activeIdx}
                    className={cn(
                      'group relative flex flex-col items-center overflow-hidden bg-surface ring-1 ring-inset transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold',
                      i === activeIdx
                        ? 'ring-2 ring-gold'
                        : 'ring-border hover:ring-foreground/40',
                    )}
                    title={e.type}
                  >
                    <span className="relative aspect-square w-full overflow-hidden">
                      <Image
                        src={e.image || '/placeholder.svg'}
                        alt={`${product.designName} on ${e.type}`}
                        fill
                        sizes="80px"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </span>
                    <span className="w-full truncate px-1 py-1.5 text-center text-[0.625rem] leading-tight text-muted-foreground">
                      {e.type}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Color */}
            <div className="mt-8">
              <div className="flex items-center justify-between">
                <h2 className="eyebrow text-foreground">Colour</h2>
                <span className="text-xs text-muted-foreground">
                  {COLOR_NAMES[color] ?? 'Selected'}
                </span>
              </div>
              <div className="mt-3 flex items-center gap-2.5">
                {product.colors.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setColor(c)}
                    aria-label={COLOR_NAMES[c] ?? c}
                    aria-pressed={color === c}
                    className={cn(
                      'flex size-9 items-center justify-center rounded-full ring-1 ring-inset ring-white/20 transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold',
                      color === c && 'ring-2 ring-gold ring-offset-2 ring-offset-background',
                    )}
                    style={{ backgroundColor: c }}
                  >
                    {color === c && (
                      <Check
                        className="size-4"
                        style={{ color: c === '#e8e4dc' || c === '#d8c7a2' ? '#0a0a0a' : '#fff' }}
                        aria-hidden="true"
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Size */}
            <div className="mt-8">
              <div className="flex items-center justify-between">
                <h2 className="eyebrow text-foreground">Size</h2>
                <Link
                  href="/help/sizing"
                  className="text-xs text-muted-foreground underline-offset-2 hover:text-foreground hover:underline"
                >
                  Size guide
                </Link>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {sizes.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSize(s)}
                    aria-pressed={size === s}
                    className={cn(
                      'flex h-11 min-w-11 items-center justify-center px-3 text-xs font-medium uppercase tracking-[0.1em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold',
                      size === s
                        ? 'bg-primary text-primary-foreground'
                        : 'border border-border text-foreground hover:border-foreground/60',
                    )}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity + add to cart */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <div className="flex h-13 items-center border border-border">
                <button
                  type="button"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  aria-label="Decrease quantity"
                  className="flex size-12 items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Minus className="size-4" />
                </button>
                <span className="w-10 text-center text-sm tabular-nums">{qty}</span>
                <button
                  type="button"
                  onClick={() => setQty((q) => Math.min(10, q + 1))}
                  aria-label="Increase quantity"
                  className="flex size-12 items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Plus className="size-4" />
                </button>
              </div>
              <BrandButton
                size="lg"
                className="h-13 flex-1"
                onClick={addToCart}
                aria-live="polite"
              >
                {added ? (
                  <>
                    <Check className="size-4" />
                    Added to cart
                  </>
                ) : (
                  <>Add to cart · {(active.price * qty).toFixed(2)}</>
                )}
              </BrandButton>
            </div>

            <p className="mt-4 text-xs text-muted-foreground">
              Made on demand · Ships in 2–4 business days · Taxes shown at checkout
            </p>

            {/* Trust row */}
            <ul className="mt-8 grid grid-cols-1 gap-4 border-t border-border pt-8 sm:grid-cols-3">
              {[
                { icon: Truck, label: 'Worldwide shipping', sub: '40+ countries' },
                { icon: RotateCcw, label: '30-day returns', sub: 'Easy exchanges' },
                { icon: ShieldCheck, label: 'Museum-grade print', sub: 'Made to last' },
              ].map((f) => (
                <li key={f.label} className="flex items-start gap-3">
                  <f.icon className="mt-0.5 size-5 shrink-0 text-gold" />
                  <div>
                    <p className="text-sm">{f.label}</p>
                    <p className="text-xs text-muted-foreground">{f.sub}</p>
                  </div>
                </li>
              ))}
            </ul>

            {/* Description */}
            <div className="mt-8 border-t border-border pt-8">
              <h2 className="heading text-lg">About this design</h2>
              <p className="mt-3 text-pretty text-sm leading-relaxed text-muted-foreground">
                {product.designName} is an original design from the studio, printed
                to order on premium blanks. The same artwork lives across our full
                range — choose a tee, a hoodie, a mug or a wall print, each produced
                to the same exacting standard with no overstock and no waste.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
