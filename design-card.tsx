import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import type { Design } from '@/lib/data'

export function DesignCard({ design }: { design: Design }) {
  return (
    <Link
      href={`/designs/${design.slug}`}
      className="group relative flex flex-col focus-visible:outline-none"
      aria-label={`Explore the ${design.name} design, available on ${design.productCount} products`}
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-surface ring-1 ring-inset ring-border transition-shadow duration-500 group-focus-visible:ring-2 group-focus-visible:ring-gold">
        <Image
          src={design.image || '/placeholder.svg'}
          alt={`${design.name} design`}
          fill
          sizes="(max-width: 640px) 80vw, (max-width: 1024px) 40vw, 25vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/85 via-background/10 to-transparent" />

        {/* Design meta overlaid at base */}
        <div className="absolute inset-x-0 bottom-0 p-5">
          <p className="eyebrow text-gold">Design</p>
          <h3 className="heading mt-1.5 text-xl">{design.name}</h3>

          <div className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-foreground/70">
            {design.availableOn.slice(0, 4).map((p) => (
              <span key={p} className="after:ml-2 after:text-foreground/30 after:content-['·'] last:after:content-none">
                {p}
              </span>
            ))}
            <span className="text-gold">
              +{design.productCount - design.availableOn.slice(0, 4).length} more
            </span>
          </div>

          <div className="mt-4 flex items-center gap-1.5 text-[0.6875rem] font-medium uppercase tracking-[0.16em]">
            <span className="relative after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-gold after:transition-transform after:duration-300 group-hover:after:scale-x-100">
              Explore Design
            </span>
            <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
        </div>
      </div>
    </Link>
  )
}
