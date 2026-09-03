import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { cn } from '~/lib/cn'

export interface CardProps {
  children: ReactNode
  /** Torna o card inteiro clicavel (rota interna). */
  to?: string
  /** Torna o card inteiro clicavel (URL externa). */
  href?: string
  tone?: 'white' | 'ink'
  /** Remove o padding interno — para cards que comecam com imagem sangrada. */
  flush?: boolean
  className?: string
}

export function Card({ children, to, href, tone = 'white', flush = false, className }: CardProps) {
  const interactive = Boolean(to || href)

  const classes = cn(
    'group relative flex flex-col overflow-hidden rounded-lg border',
    tone === 'white' ? 'border-ink-200 bg-white' : 'border-white/10 bg-ink-900',
    !flush && 'p-6 md:p-8',
    'shadow-card transition-[box-shadow,transform,border-color] duration-300 ease-[var(--ease-out-soft)]',
    interactive && 'hover:-translate-y-1 hover:shadow-lift hover:border-brand-300',
    className,
  )

  if (to) {
    return (
      <Link to={to} className={classes}>
        {children}
      </Link>
    )
  }

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {children}
      </a>
    )
  }

  return <div className={classes}>{children}</div>
}

export interface CardMediaProps {
  src: string
  alt: string
  /** Proporcao da imagem. `video` = 16:9, `photo` = 4:3, `wide` = 21:9. */
  ratio?: 'video' | 'photo' | 'wide' | 'square'
  className?: string
}

const RATIOS: Record<NonNullable<CardMediaProps['ratio']>, string> = {
  video: 'aspect-video',
  photo: 'aspect-4/3',
  wide: 'aspect-21/9',
  square: 'aspect-square',
}

/**
 * Midia de card com proporcao travada.
 *
 * `object-cover` + proporcao fixa e o que impede o defeito do site atual, onde
 * a foto das unidades esmagava no mobile porque a altura era livre.
 */
export function CardMedia({ src, alt, ratio = 'video', className }: CardMediaProps) {
  return (
    <div className={cn('relative overflow-hidden bg-ink-100', RATIOS[ratio], className)}>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        className="h-full w-full object-cover transition-transform duration-500 ease-[var(--ease-out-soft)] group-hover:scale-105"
      />
    </div>
  )
}
