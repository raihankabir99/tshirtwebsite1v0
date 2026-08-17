import Link from 'next/link'
import { cn } from '@/lib/utils'

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="ATELIER MONO — home"
      className={cn(
        'group inline-flex items-baseline gap-[0.5em] font-display text-base font-medium uppercase tracking-[0.32em] leading-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold',
        className,
      )}
    >
      <span>Atelier</span>
      <span className="text-gold transition-colors group-hover:text-foreground">
        Mono
      </span>
    </Link>
  )
}
