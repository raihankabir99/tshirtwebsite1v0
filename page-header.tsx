import { Container } from '@/components/site/section'
import { Breadcrumb, type Crumb } from '@/components/site/breadcrumb'
import { cn } from '@/lib/utils'

export function PageHeader({
  eyebrow,
  title,
  description,
  crumbs,
  align = 'left',
  className,
  children,
}: {
  eyebrow?: string
  title: React.ReactNode
  description?: string
  crumbs?: Crumb[]
  align?: 'left' | 'center'
  className?: string
  children?: React.ReactNode
}) {
  return (
    <header
      className={cn(
        'border-b border-border pt-28 pb-12 sm:pt-32 sm:pb-16',
        className,
      )}
    >
      <Container>
        {crumbs && <Breadcrumb items={crumbs} className="mb-8" />}
        <div
          className={cn(
            'max-w-2xl',
            align === 'center' && 'mx-auto text-center',
          )}
        >
          {eyebrow && <p className="eyebrow text-gold">{eyebrow}</p>}
          <h1 className="display mt-3 text-balance text-4xl sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          {description && (
            <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
              {description}
            </p>
          )}
        </div>
        {children}
      </Container>
    </header>
  )
}
