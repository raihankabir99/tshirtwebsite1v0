import { Container, SectionHeading } from "@/components/site/section"
import { Rating } from "@/components/brand/primitives"
import { REVIEWS } from "@/lib/data"

export function Reviews() {
  return (
    <section className="py-16 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="From the community"
          title="Worn and loved worldwide"
          description="Over 24,000 pieces shipped across 40+ countries — rated 4.9 out of 5."
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {REVIEWS.map((r) => (
            <figure
              key={r.name}
              className="flex flex-col justify-between bg-surface p-6 ring-1 ring-inset ring-border"
            >
              <Rating value={5} showCount={false} className="mb-4" />
              <blockquote className="text-pretty text-sm leading-relaxed text-foreground/90">
                {"\u201C"}
                {r.text}
                {"\u201D"}
              </blockquote>
              <figcaption className="mt-6 border-t border-border pt-4">
                <p className="text-sm font-medium">{r.name}</p>
                <p className="text-xs text-muted-foreground">{r.region}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </Container>
    </section>
  )
}
