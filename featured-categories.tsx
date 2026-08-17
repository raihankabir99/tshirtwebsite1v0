import Link from "next/link"
import Image from "next/image"
import { Container, SectionHeading } from "@/components/site/section"
import { SHOP_BY_PRODUCT } from "@/lib/data"

export function FeaturedCategories() {
  return (
    <section className="py-16 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="Shop by product"
          title="Everyday objects, elevated"
          description="Museum-grade printing across a considered range of apparel and lifestyle goods."
          cta={{ label: "All products", href: "/products" }}
        />
        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5 lg:gap-4">
          {SHOP_BY_PRODUCT.slice(0, 10).map((cat) => (
            <Link
              key={cat.slug}
              href={`/products?type=${cat.slug}`}
              className="group relative flex flex-col overflow-hidden bg-surface ring-1 ring-inset ring-border transition-colors hover:ring-gold/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
            >
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src={cat.image || "/placeholder.svg"}
                  alt={cat.name}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
              <div className="flex items-center justify-between gap-2 px-3 py-3">
                <span className="text-sm font-medium text-foreground">{cat.name}</span>
                <span className="text-gold opacity-0 transition-opacity group-hover:opacity-100">→</span>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  )
}
