import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { BrandButton } from '@/components/brand/brand-button'
import { Container } from '@/components/site/section'

export function Hero() {
  return (
    <section className="relative flex min-h-[92svh] items-end overflow-hidden bg-background">
      <Image
        src="/images/hero.png"
        alt="Model wearing the Midnight Lion design on a premium black t-shirt"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
      {/* Legibility gradients */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-background/30" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/70 via-transparent to-transparent" />

      <Container className="relative z-10 pb-16 pt-32 sm:pb-20 lg:pb-28">
        <div className="max-w-2xl">
          <p className="eyebrow text-gold">New Collection</p>
          <h1 className="display mt-5 text-balance text-5xl font-medium sm:text-7xl lg:text-8xl">
            Wear the design.
            <br />
            <span className="text-foreground/60">Live the idea.</span>
          </h1>
          <p className="mt-6 max-w-md text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
            Original designs, made on demand — expressed across apparel,
            accessories and lifestyle goods, and shipped worldwide.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link href="/new-drops">
              <BrandButton size="lg" className="w-full sm:w-auto">
                Shop New Drops
                <ArrowRight className="size-4" />
              </BrandButton>
            </Link>
            <Link href="/designs">
              <BrandButton
                variant="secondary"
                size="lg"
                className="w-full border-white/25 text-foreground hover:bg-white/10 sm:w-auto"
              >
                Explore Designs
              </BrandButton>
            </Link>
          </div>

          <p className="mt-8 text-xs uppercase tracking-[0.16em] text-muted-foreground">
            Free EU shipping over €75 · Ships to 40+ countries
          </p>
        </div>
      </Container>
    </section>
  )
}
