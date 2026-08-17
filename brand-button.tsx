import { cva, type VariantProps } from 'class-variance-authority'
import { Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

const brandButton = cva(
  'group relative inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap font-medium uppercase tracking-[0.14em] transition-colors duration-200 outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-45 [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        // Primary — solid, high contrast
        primary:
          'bg-primary text-primary-foreground hover:bg-primary/85 active:translate-y-px',
        // Secondary — outlined
        secondary:
          'border border-border bg-transparent text-foreground hover:border-foreground/60 hover:bg-foreground/5 active:translate-y-px',
        // Gold — reserved premium accent
        gold: 'bg-gold text-gold-foreground hover:bg-gold/85 active:translate-y-px',
        // Tertiary — underline link
        tertiary:
          'h-auto px-0 py-0 text-foreground/80 tracking-[0.12em] after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-300 hover:text-foreground hover:after:scale-x-100',
        // On light editorial surfaces
        onLight:
          'bg-light-foreground text-light hover:bg-light-foreground/85 active:translate-y-px',
      },
      size: {
        sm: 'h-9 px-4 text-[0.6875rem]',
        md: 'h-11 px-6 text-xs',
        lg: 'h-13 px-8 text-xs',
      },
    },
    compoundVariants: [
      { variant: 'tertiary', size: 'sm', class: 'h-auto px-0' },
      { variant: 'tertiary', size: 'md', class: 'h-auto px-0' },
      { variant: 'tertiary', size: 'lg', class: 'h-auto px-0' },
    ],
    defaultVariants: { variant: 'primary', size: 'md' },
  },
)

type BrandButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof brandButton> & {
    loading?: boolean
  }

export function BrandButton({
  className,
  variant,
  size,
  loading = false,
  disabled,
  children,
  ...props
}: BrandButtonProps) {
  return (
    <button
      className={cn(brandButton({ variant, size }), className)}
      disabled={disabled || loading}
      aria-busy={loading}
      {...props}
    >
      {loading && <Loader2 className="animate-spin" aria-hidden="true" />}
      {children}
    </button>
  )
}

export { brandButton }
