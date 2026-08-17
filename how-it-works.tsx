import { Container } from "@/components/site/section"
import { PenTool, Package, Truck } from "lucide-react"

const steps = [
  {
    icon: PenTool,
    title: "Choose a design",
    body: "Browse original artwork from the studio, or start from a design you love.",
  },
  {
    icon: Package,
    title: "Made on demand",
    body: "We print your piece to order on premium blanks — no waste, no overstock.",
  },
  {
    icon: Truck,
    title: "Shipped worldwide",
    body: "Carbon-considered delivery to 40+ countries, with tracking from studio to door.",
  },
]

export function HowItWorks() {
  return (
    <section className="border-y border-border py-16 sm:py-24">
      <Container>
        <div className="grid gap-10 md:grid-cols-3 md:gap-6">
          {steps.map((s, i) => (
            <div key={s.title} className="flex flex-col">
              <div className="flex items-center gap-4">
                <span className="flex size-12 items-center justify-center rounded-full border border-border text-gold">
                  <s.icon className="size-5" />
                </span>
                <span className="font-display text-sm tabular-nums text-muted-foreground">
                  0{i + 1}
                </span>
              </div>
              <h3 className="heading mt-5 text-xl">{s.title}</h3>
              <p className="mt-2 text-pretty leading-relaxed text-muted-foreground">
                {s.body}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
