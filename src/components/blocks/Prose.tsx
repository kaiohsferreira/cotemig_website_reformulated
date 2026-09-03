import type { ReactNode } from 'react'
import { cn } from '~/lib/cn'

export interface ProseProps {
  children: ReactNode
  /** Limita a largura para a linha ficar em torno de 70 caracteres. */
  narrow?: boolean
  className?: string
}

/**
 * Texto corrido longo.
 *
 * Concentra a tipografia de leitura num lugar so, para nao repetir
 * `space-y-4 text-lg leading-relaxed` em cada pagina de texto.
 */
export function Prose({ children, narrow = false, className }: ProseProps) {
  return (
    <div
      className={cn(
        // `wrap-anywhere` e nao `break-words`: o aviso de LGPD tem URLs de ate
        // 122 caracteres, e so `overflow-wrap: anywhere` entra no calculo de
        // min-content — sem ele a coluna do grid cresce para caber a URL
        // inteira e a pagina passa a rolar de lado no celular.
        'space-y-5 text-lg leading-relaxed wrap-anywhere text-ink-600',
        '[&_strong]:font-bold [&_strong]:text-ink-800',
        '[&_a]:rounded-sm [&_a]:text-brand-700 [&_a]:underline [&_a]:underline-offset-4',
        narrow && 'max-w-[var(--container-prose)]',
        className,
      )}
    >
      {children}
    </div>
  )
}

export interface ParagraphsProps {
  items: string[]
  narrow?: boolean
  className?: string
}

/** Renderiza uma lista de paragrafos vinda dos dados. */
export function Paragraphs({ items, narrow, className }: ParagraphsProps) {
  return (
    <Prose narrow={narrow} className={className}>
      {items.map((text, index) => (
        <p key={index}>{text}</p>
      ))}
    </Prose>
  )
}
