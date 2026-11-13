'use client'

import { X } from 'lucide-react'
import { useState } from 'react'

const MESSAGES = [
  'New drop — explore the latest collection',
  'Complimentary international shipping over €75',
  'Made on demand · Designed in Europe · Shipped worldwide',
]

export function AnnouncementBar() {
  const [dismissed, setDismissed] = useState(false)
  if (dismissed) return null

  return (
    <div className="relative border-b border-border bg-background">
      <div className="mx-auto flex max-w-[88rem] items-center justify-center gap-8 px-10 py-2.5">
        <div className="flex items-center gap-8 overflow-hidden">
          {MESSAGES.map((m, i) => (
            <p
              key={m}
              className={`whitespace-nowrap text-[0.6875rem] uppercase tracking-[0.16em] text-muted-foreground ${
                i === 0 ? '' : 'hidden md:block'
              }`}
            >
              {i > 0 && <span className="mr-8 text-border">/</span>}
              {m}
            </p>
          ))}
        </div>
        <button
          type="button"
          onClick={() => setDismissed(true)}
          aria-label="Dismiss announcement"
          className="absolute right-3 top-1/2 flex size-6 -translate-y-1/2 items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
        >
          <X className="size-3.5" />
        </button>
      </div>
    </div>
  )
}
