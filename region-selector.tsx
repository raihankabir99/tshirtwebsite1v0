'use client'

import { Check, ChevronDown, Globe } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { LANGUAGES, REGIONS } from '@/lib/data'
import { cn } from '@/lib/utils'

export function RegionSelector({
  variant = 'dark',
}: {
  variant?: 'dark' | 'light'
}) {
  const [open, setOpen] = useState(false)
  const [region, setRegion] = useState(REGIONS[0])
  const [language, setLanguage] = useState(LANGUAGES[0])
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [])

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="dialog"
        className={cn(
          'inline-flex items-center gap-2 text-xs transition-colors',
          variant === 'dark'
            ? 'text-muted-foreground hover:text-foreground'
            : 'text-light-muted hover:text-light-foreground',
        )}
      >
        <Globe className="size-4" />
        <span>{region.flag}</span>
        <span>{region.label}</span>
        <span className="text-current/60">·</span>
        <span>
          {region.currency} {region.symbol}
        </span>
        <ChevronDown
          className={cn('size-3.5 transition-transform', open && 'rotate-180')}
        />
      </button>

      {open && (
        <div
          role="dialog"
          aria-label="Region, currency and language"
          className="absolute bottom-full left-0 z-50 mb-3 w-72 border border-border bg-popover p-4 text-popover-foreground shadow-2xl"
        >
          <p className="eyebrow mb-3 text-muted-foreground">Country / Region</p>
          <div className="grid max-h-56 grid-cols-1 gap-0.5 overflow-y-auto">
            {REGIONS.map((r) => (
              <button
                key={r.currency}
                type="button"
                onClick={() => setRegion(r)}
                className="flex items-center justify-between gap-2 px-2 py-2 text-left text-sm transition-colors hover:bg-secondary"
              >
                <span className="flex items-center gap-2.5">
                  <span>{r.flag}</span>
                  <span>{r.label}</span>
                </span>
                <span className="flex items-center gap-2 text-xs text-muted-foreground tabular-nums">
                  {r.currency} {r.symbol}
                  {region.currency === r.currency && (
                    <Check className="size-3.5 text-gold" />
                  )}
                </span>
              </button>
            ))}
          </div>

          <div className="mt-4 border-t border-border pt-4">
            <p className="eyebrow mb-2 text-muted-foreground">Language</p>
            <div className="flex flex-wrap gap-1.5">
              {LANGUAGES.map((l) => (
                <button
                  key={l}
                  type="button"
                  onClick={() => setLanguage(l)}
                  className={cn(
                    'px-2.5 py-1.5 text-xs transition-colors',
                    language === l
                      ? 'bg-foreground text-background'
                      : 'border border-border text-muted-foreground hover:text-foreground',
                  )}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
