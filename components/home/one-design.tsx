import Link from "next/link"
import Image from "next/image"
import { ArrowUpRight } from "lucide-react"
import { Container } from "@/components/site/section"
import { BrandButton } from "@/components/brand/brand-button"
import { LION_EXPRESSIONS } from "@/lib/data"

export function OneDesign() {
  return (
    <section className="border-y border-border bg-surface py-16 sm:py-24">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-center lg:gap-16">
          {/* Narrative */}
          <div className="max-w-md">
            <p className="eyebrow text-gold">One design · Many objects</p>
            <h2 className="display mt-4 text-balance text-4xl sm:text-5xl">
              Midnight Lion,
              <br />
              across everything.
            </h2>
            <p className="mt-5 text-pretty leading-relaxed text-muted-foreground">
              We start with the idea, not the garment. Every design lives as a
              standalone artwork — then travels across a tee, a hoodie, a mug or a
              wall print, printed to the same exacting standard.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/designs/midnight-lion">
                <BrandButton variant="gold" className="w-full sm:w-auto">
                  Explore this design
                  <ArrowUpRight className="size-4" />
                </BrandButton>
              </Link>
              <Link href="/designs">
                <BrandButton variant="tertiary" className="justify-start">
                  All designs
                </BrandButton>
              </Link>
            </div>
          </div>

          {/* Expression grid */}
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 sm:gap-4">
            {LION_EXPRESSIONS.map((item) => (
              <Link
                key={item.type}
                href="/designs/midnight-lion"
                className="group relative flex flex-col overflow-hidden bg-background ring-1 ring-inset ring-border transition-colors hover:ring-gold/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
              >
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={`Midnight Lion on a ${item.type}`}
                    fill
                    sizes="(max-width: 640px) 33vw, 20vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>
                <div className="flex items-center justify-between gap-1 px-2.5 py-2.5">
                  <span className="truncate text-xs font-medium">{item.type}</span>
                  <span className="text-[0.6875rem] tabular-nums text-muted-foreground">
                    €{item.price.toFixed(0)}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
