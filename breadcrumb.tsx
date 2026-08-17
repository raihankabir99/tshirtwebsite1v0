import Link from 'next/link'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

export type Crumb = { label: string; href?: string }

export function Breadcrumb({
  items,
  className,
}: {
  items: Crumb[]
  className?: string
}) {
  return (
    <nav aria-label="Breadcrumb" className={cn('text-xs', className)}>
      <ol className="flex flex-wrap items-center gap-1.5 text-muted-foreground">
        {items.map((item, i) => {
          const last = i === items.length - 1
          return (
            <li key={`${item.label}-${i}`} className="flex items-center gap-1.5">
              {item.href && !last ? (
                <Link
                  href={item.href}
                  className="uppercase tracking-[0.12em] transition-colors hover:text-foreground"
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  aria-current={last ? 'page' : undefined}
                  className={cn(
                    'uppercase tracking-[0.12em]',
                    last && 'text-foreground',
                  )}
                >
                  {item.label}
                </span>
              )}
              {!last && (
                <ChevronDown
                  className="size-3 -rotate-90 text-muted-foreground/50"
                  aria-hidden="true"
                />
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
