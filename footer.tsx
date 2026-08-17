import Link from "next/link"
import { Camera, Send, Play } from "lucide-react"
import { Container } from "@/components/site/section"
import { Logo } from "@/components/site/logo"
import { RegionSelector } from "@/components/site/region-selector"

const columns: { heading: string; links: { label: string; href: string }[] }[] = [
  {
    heading: "Shop",
    links: [
      { label: "New Drops", href: "/new-drops" },
      { label: "Best Sellers", href: "/products?sort=popular" },
      { label: "All Designs", href: "/designs" },
      { label: "T-Shirts", href: "/products?type=t-shirts" },
      { label: "Hoodies", href: "/products?type=hoodies" },
      { label: "Accessories", href: "/products?group=accessories" },
    ],
  },
  {
    heading: "Studio",
    links: [
      { label: "Our Story", href: "/about" },
      { label: "Sustainability", href: "/sustainability" },
      { label: "The Journal", href: "/journal" },
      { label: "Careers", href: "/careers" },
    ],
  },
  {
    heading: "Support",
    links: [
      { label: "Shipping & Delivery", href: "/help/shipping" },
      { label: "Returns & Exchanges", href: "/help/returns" },
      { label: "Size Guide", href: "/help/sizing" },
      { label: "Track Order", href: "/track" },
      { label: "Contact", href: "/contact" },
    ],
  },
]

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <Container className="py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="max-w-xs">
            <Logo />
            <p className="mt-5 text-pretty text-sm leading-relaxed text-muted-foreground">
              A design-led studio. Original ideas made across apparel, accessories
              and lifestyle goods — produced on demand and shipped worldwide.
            </p>
            <div className="mt-6 flex items-center gap-3">
              {[
                { icon: Camera, label: "Instagram" },
                { icon: Send, label: "X / Twitter" },
                { icon: Play, label: "YouTube" },
              ].map(({ icon: Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="flex size-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-gold/50 hover:text-foreground"
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          {columns.map((col) => (
            <nav key={col.heading} aria-label={col.heading}>
              <h3 className="eyebrow text-muted-foreground">{col.heading}</h3>
              <ul className="mt-5 flex flex-col gap-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="text-sm text-foreground/80 transition-colors hover:text-gold"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-6 border-t border-border pt-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
            <span>© {new Date().getFullYear()} Atelier Mono. All rights reserved.</span>
            <Link href="/legal/privacy" className="hover:text-foreground">
              Privacy
            </Link>
            <Link href="/legal/terms" className="hover:text-foreground">
              Terms
            </Link>
            <Link href="/legal/cookies" className="hover:text-foreground">
              Cookies
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs text-muted-foreground">Ship to</span>
            <RegionSelector variant="dark" />
          </div>
        </div>
      </Container>
    </footer>
  )
}
