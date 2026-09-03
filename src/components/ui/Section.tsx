import type { ReactNode } from 'react'
import { cn } from '~/lib/cn'

export type SectionTone = 'white' | 'muted' | 'ink' | 'brand'
export type SectionSpacing = 'sm' | 'md' | 'lg'

export interface SectionProps {
  children: ReactNode
  /** Fundo da faixa. Alterne `white` e `muted` para separar blocos. */
  tone?: SectionTone
  spacing?: SectionSpacing
  id?: string
  /** Rotula a secao para leitores de tela quando nao ha titulo visivel. */
  ariaLabel?: string
  className?: string
}

const TONES: Record<SectionTone, string> = {
  white: 'bg-white text-ink-700',
  muted: 'bg-ink-50 text-ink-700',
  ink: 'surface-ink text-ink-200',
  brand: 'bg-brand-500 text-white',
}

const SPACINGS: Record<SectionSpacing, string> = {
  sm: 'py-12 md:py-16',
  md: 'py-16 md:py-24',
  lg: 'py-20 md:py-32',
}

export function Section({
  children,
  tone = 'white',
  spacing = 'md',
  id,
  ariaLabel,
  className,
}: SectionProps) {
  return (
    <section
      id={id}
      aria-label={ariaLabel}
      className={cn(TONES[tone], SPACINGS[spacing], className)}
    >
      <div className="container-shell">{children}</div>
    </section>
  )
}

export interface SectionHeaderProps {
  /** Rotulo curto em caixa alta acima do titulo. */
  eyebrow?: string
  title: ReactNode
  description?: ReactNode
  /** `center` para blocos de abertura; `start` para listas e grids. */
  align?: 'start' | 'center'
  /** Claro quando a secao esta sobre fundo escuro. */
  onDark?: boolean
  /** Acao opcional a direita do titulo (ex.: "Ver todas"). */
  action?: ReactNode
  as?: 'h1' | 'h2' | 'h3'
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = 'center',
  onDark = false,
  action,
  as: Heading = 'h2',
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        'mb-12 flex flex-col gap-6 md:mb-16',
        action && 'md:flex-row md:items-end md:justify-between',
      )}
    >
      <div className={cn('max-w-3xl', align === 'center' && !action && 'mx-auto text-center')}>
        {eyebrow ? (
          <p
            className={cn(
              'mb-3 text-eyebrow uppercase',
              onDark ? 'text-brand-300' : 'text-brand-700',
            )}
          >
            {eyebrow}
          </p>
        ) : null}
        <Heading
          className={cn('text-display-md', onDark ? 'text-white' : 'text-ink-900')}
        >
          {title}
        </Heading>
        {description ? (
          <p className={cn('mt-5 text-lg', onDark ? 'text-ink-300' : 'text-ink-600')}>
            {description}
          </p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  )
}
