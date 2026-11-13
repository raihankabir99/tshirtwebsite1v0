import { Container, SectionHeading } from "@/components/site/section"
import { DesignCard } from "@/components/commerce/design-card"
import { DESIGNS } from "@/lib/data"

export function TrendingDesigns() {
  return (
    <section className="py-16 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="Trending now"
          title="Designs people are living in"
          description="Original artwork from the studio — each available across a full range of products."
          cta={{ label: "All designs", href: "/designs" }}
        />
        <div className="mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 no-scrollbar sm:grid sm:grid-cols-2 sm:overflow-visible lg:grid-cols-4">
          {DESIGNS.map((d) => (
            <div key={d.slug} className="w-[78%] shrink-0 snap-start sm:w-auto">
              <DesignCard design={d} />
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
