import type { ReactNode } from 'react'
import { cn } from '~/lib/cn'

export type BadgeTone = 'brand' | 'faculty' | 'neutral' | 'onDark'

export interface BadgeProps {
  children: ReactNode
  tone?: BadgeTone
  icon?: ReactNode
  className?: string
}

const TONES: Record<BadgeTone, string> = {
  brand: 'bg-brand-50 text-brand-800 border-brand-200',
  faculty: 'bg-faculty-50 text-faculty-800 border-faculty-200',
  neutral: 'bg-ink-100 text-ink-700 border-ink-200',
  onDark: 'bg-white/10 text-white border-white/20 backdrop-blur-sm',
}

export function Badge({ children, tone = 'brand', icon, className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-sm border px-3 py-1',
        'font-display text-xs font-semibold tracking-wide uppercase',
        TONES[tone],
        className,
      )}
    >
      {icon}
      {children}
    </span>
  )
}
