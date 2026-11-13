import Link from "next/link"
import Image from "next/image"
import { BrandButton } from "@/components/brand/brand-button"

export function EditorialBand() {
  return (
    <section className="relative overflow-hidden">
      <div className="relative min-h-[70svh] w-full">
        <Image
          src="/images/collection-minimal.png"
          alt="The Minimal collection campaign"
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-background/30 to-transparent" />
        <div className="absolute inset-0 flex items-center">
          <div className="mx-auto flex w-full max-w-[88rem] px-5 sm:px-6 lg:px-10">
            <div className="max-w-md">
              <p className="eyebrow text-gold">The Minimal Collection</p>
              <h2 className="display mt-4 text-balance text-4xl sm:text-5xl lg:text-6xl">
                Quiet by design.
              </h2>
              <p className="mt-5 text-pretty leading-relaxed text-foreground/80">
                A restrained edit for those who let the idea speak. Neutral tones,
                considered lines, nothing shouting.
              </p>
              <Link href="/collections/minimal" className="mt-8 inline-block">
                <BrandButton size="lg">Shop the collection</BrandButton>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
