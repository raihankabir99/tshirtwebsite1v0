import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { cn } from '@/lib/utils'

export function Container({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  return (
    <div className={cn('mx-auto w-full max-w-[88rem] px-5 sm:px-6 lg:px-10', className)}>
      {children}
    </div>
  )
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  cta,
  align = 'left',
  light = false,
  className,
}: {
  eyebrow?: string
  title: React.ReactNode
  description?: string
  cta?: { label: string; href: string }
  align?: 'left' | 'center'
  light?: boolean
  className?: string
}) {
  return (
    <div
      className={cn(
        'flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between',
        align === 'center' && 'sm:flex-col sm:items-center sm:text-center',
        className,
      )}
    >
      <div className={cn('max-w-2xl', align === 'center' && 'mx-auto')}>
        {eyebrow && (
          <p className={cn('eyebrow', light ? 'text-light-muted' : 'text-gold')}>
            {eyebrow}
          </p>
        )}
        <h2
          className={cn(
            'heading mt-3 text-pretty text-3xl sm:text-4xl lg:text-[2.75rem]',
            light ? 'text-light-foreground' : 'text-foreground',
          )}
        >
          {title}
        </h2>
        {description && (
          <p
            className={cn(
              'mt-3 max-w-xl text-pretty leading-relaxed',
              light ? 'text-light-muted' : 'text-muted-foreground',
              align === 'center' && 'mx-auto',
            )}
          >
            {description}
          </p>
        )}
      </div>

      {cta && (
        <Link
          href={cta.href}
          className={cn(
            'group inline-flex shrink-0 items-center gap-1.5 text-xs font-medium uppercase tracking-[0.16em] transition-colors',
            light
              ? 'text-light-foreground/70 hover:text-light-foreground'
              : 'text-foreground/70 hover:text-foreground',
          )}
        >
          <span className="relative after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-gold after:transition-transform after:duration-300 group-hover:after:scale-x-100">
            {cta.label}
          </span>
          <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      )}
    </div>
  )
}
