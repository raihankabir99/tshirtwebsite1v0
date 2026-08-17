import { Container, SectionHeading } from "@/components/site/section"
import { ProductCard } from "@/components/commerce/product-card"
import type { Product } from "@/lib/data"

export function ProductRail({
  eyebrow,
  title,
  description,
  cta,
  products,
}: {
  eyebrow?: string
  title: string
  description?: string
  cta?: { label: string; href: string }
  products: Product[]
}) {
  return (
    <section className="py-16 sm:py-24">
      <Container>
        <SectionHeading eyebrow={eyebrow} title={title} description={description} cta={cta} />
        {/* Horizontal scroll on mobile, grid on larger screens */}
        <div className="mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 no-scrollbar sm:grid sm:grid-cols-2 sm:overflow-visible lg:grid-cols-4">
          {products.map((p) => (
            <div key={p.id} className="w-[72%] shrink-0 snap-start sm:w-auto">
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
