import Link from "next/link"
import Image from "next/image"
import { ArrowUpRight } from "lucide-react"
import { Container, SectionHeading } from "@/components/site/section"
import { ARTICLES } from "@/lib/data"

export function Journal() {
  return (
    <section className="py-16 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="The Journal"
          title="Notes on design & wear"
          description="Style guides, design stories and studio dispatches."
          cta={{ label: "Read the journal", href: "/journal" }}
        />
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {ARTICLES.map((a) => (
            <Link
              key={a.slug}
              href={`/journal/${a.slug}`}
              className="group flex flex-col focus-visible:outline-none"
            >
              <div className="relative aspect-[3/2] overflow-hidden bg-surface ring-1 ring-inset ring-border transition-shadow group-focus-visible:ring-2 group-focus-visible:ring-gold">
                <Image
                  src={a.image || "/placeholder.svg"}
                  alt={a.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
              <div className="mt-4 flex items-center gap-3 text-xs text-muted-foreground">
                <span className="eyebrow text-gold">{a.category}</span>
                <span aria-hidden="true">·</span>
                <span>{a.date}</span>
              </div>
              <h3 className="heading mt-2 text-lg text-balance transition-colors group-hover:text-gold">
                {a.title}
              </h3>
              <p className="mt-2 text-pretty text-sm leading-relaxed text-muted-foreground">
                {a.excerpt}
              </p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-[0.16em] text-foreground/70">
                Read more
                <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  )
}
