import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { COLLECTIONS, DESIGNS, PRODUCT_TYPES } from '@/lib/data'

export type MenuKey = 'shop' | 'designs' | 'collections'

function MenuColumn({
  title,
  links,
}: {
  title: string
  links: { label: string; href: string }[]
}) {
  return (
    <div>
      <h3 className="eyebrow mb-4 text-gold">{title}</h3>
      <ul className="flex flex-col gap-2.5">
        {links.map((l) => (
          <li key={l.label}>
            <Link
              href={l.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

function group(name: string) {
  return PRODUCT_TYPES.filter((p) => p.group === name).map((p) => ({
    label: p.name,
    href: `/shop/${p.slug}`,
  }))
}

export function MegaMenu({ menu }: { menu: MenuKey }) {
  if (menu === 'shop') {
    return (
      <Panel>
        <div className="grid flex-1 grid-cols-3 gap-8">
          <MenuColumn title="Apparel" links={group('Apparel')} />
          <MenuColumn title="Accessories" links={group('Accessories')} />
          <MenuColumn title="Home & Lifestyle" links={group('Home & Lifestyle')} />
        </div>
        <div className="w-px shrink-0 bg-border" />
        <div className="flex w-64 shrink-0 flex-col gap-4">
          <MenuColumn
            title="Featured"
            links={[
              { label: 'New Drops', href: '/new-drops' },
              { label: 'Best Sellers', href: '/best-sellers' },
              { label: 'Trending', href: '/shop?sort=trending' },
            ]}
          />
          <FeatureCard
            href="/designs/midnight-lion"
            image="/images/lion-hoodie.png"
            label="Featured design"
            title="Midnight Lion"
          />
        </div>
      </Panel>
    )
  }

  if (menu === 'designs') {
    return (
      <Panel>
        <div className="w-56 shrink-0">
          <MenuColumn
            title="Browse"
            links={[
              { label: 'All Designs', href: '/designs' },
              { label: 'New Designs', href: '/designs?filter=new' },
              { label: 'Trending Designs', href: '/designs?filter=trending' },
              { label: 'Best Sellers', href: '/designs?filter=best' },
              { label: 'Featured Collections', href: '/collections' },
            ]}
          />
          <p className="mt-6 max-w-[14rem] text-xs leading-relaxed text-muted-foreground">
            One design, many expressions. Choose an idea — then decide how you
            want to wear or live with it.
          </p>
        </div>
        <div className="w-px shrink-0 bg-border" />
        <div className="grid flex-1 grid-cols-4 gap-4">
          {DESIGNS.map((d) => (
            <Link key={d.slug} href={`/designs/${d.slug}`} className="group">
              <div className="relative aspect-[4/5] overflow-hidden bg-surface">
                <Image
                  src={d.image || '/placeholder.svg'}
                  alt={d.name}
                  fill
                  sizes="200px"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <p className="mt-2.5 text-sm">{d.name}</p>
              <p className="text-xs text-gold">{d.productCount} products</p>
            </Link>
          ))}
        </div>
      </Panel>
    )
  }

  // collections
  return (
    <Panel>
      <div className="grid flex-1 grid-cols-2 gap-x-10 gap-y-3 sm:grid-cols-4">
        {COLLECTIONS.map((c) => (
          <Link
            key={c}
            href={`/collections/${c.toLowerCase().replace(/\s+/g, '-')}`}
            className="group flex items-center justify-between border-b border-border py-3 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            {c}
            <ArrowUpRight className="size-4 opacity-0 transition-opacity group-hover:opacity-100" />
          </Link>
        ))}
      </div>
      <div className="w-px shrink-0 bg-border" />
      <FeatureCard
        href="/collections/minimal"
        image="/images/collection-minimal.png"
        label="Editorial"
        title="The Minimal Collection"
        className="w-72 shrink-0"
      />
    </Panel>
  )
}

function Panel({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto flex w-full max-w-[88rem] gap-8 px-6 py-10 lg:px-10">
      {children}
    </div>
  )
}

function FeatureCard({
  href,
  image,
  label,
  title,
  className,
}: {
  href: string
  image: string
  label: string
  title: string
  className?: string
}) {
  return (
    <Link href={href} className={`group relative block ${className ?? ''}`}>
      <div className="relative aspect-[16/10] overflow-hidden bg-surface">
        <Image
          src={image || '/placeholder.svg'}
          alt={title}
          fill
          sizes="320px"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-4">
          <p className="eyebrow text-gold">{label}</p>
          <p className="heading mt-1 flex items-center gap-1.5 text-base">
            {title}
            <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </p>
        </div>
      </div>
    </Link>
  )
}
