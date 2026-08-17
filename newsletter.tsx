"use client"

import { useState } from "react"
import { ArrowRight, Check } from "lucide-react"
import { Container } from "@/components/site/section"
import { BrandButton } from "@/components/brand/brand-button"

export function Newsletter() {
  const [email, setEmail] = useState("")
  const [done, setDone] = useState(false)

  return (
    <section className="bg-light py-16 text-light-foreground sm:py-24">
      <Container>
        <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
          <p className="eyebrow text-light-muted">Join the studio list</p>
          <h2 className="display mt-4 text-balance text-3xl text-light-foreground sm:text-5xl">
            First looks. New designs. €10 off.
          </h2>
          <p className="mt-4 max-w-md text-pretty leading-relaxed text-light-muted">
            Subscribe for early access to drops and a welcome code for your first order.
          </p>

          {done ? (
            <p className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-light-foreground">
              <Check className="size-4 text-gold" />
              You&apos;re on the list — check your inbox.
            </p>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault()
                if (email.includes("@")) setDone(true)
              }}
              className="mt-8 flex w-full max-w-md flex-col gap-3 sm:flex-row"
            >
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>
              <input
                id="newsletter-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@email.com"
                className="h-12 w-full flex-1 border border-light-border bg-transparent px-4 text-sm text-light-foreground placeholder:text-light-muted focus:border-light-foreground focus:outline-none"
              />
              <BrandButton type="submit" variant="onLight" size="lg" className="h-12">
                Subscribe
                <ArrowRight className="size-4" />
              </BrandButton>
            </form>
          )}
          <p className="mt-4 text-xs text-light-muted">No spam. Unsubscribe anytime.</p>
        </div>
      </Container>
    </section>
  )
}
