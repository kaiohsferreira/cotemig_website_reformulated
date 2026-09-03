import type { ReactNode } from 'react'
import { cn } from '~/lib/cn'
import { Breadcrumb } from '~/components/ui/Breadcrumb'
import type { BreadcrumbItem } from '~/components/ui/Breadcrumb'

export interface PageHeroProps {
  breadcrumb: BreadcrumbItem[]
  /** Rotulo curto acima do titulo. */
  eyebrow?: string
  title: string
  description?: string
  /** Imagem de fundo. Sem ela o hero usa so o fundo escuro da marca. */
  image?: string
  /** Botoes de acao. */
  actions?: ReactNode
  /** Conteudo extra abaixo do texto (chips de fatos, por exemplo). */
  children?: ReactNode
  /** `faculty` tinge o hero com o acento da Faculdade. */
  accent?: 'brand' | 'faculty'
  size?: 'sm' | 'md'
}

/**
 * Topo padrao das paginas internas.
 *
 * Um bloco so para todas as paginas internas. No site atual cada template
 * montava o proprio topo, e o resultado era um banner com o texto chapado
 * dentro da imagem — que no mobile aparecia cortado. Aqui o texto e HTML de
 * verdade sobre a imagem, entao quebra, escala e e lido por leitor de tela.
 */
export function PageHero({
  breadcrumb,
  eyebrow,
  title,
  description,
  image,
  actions,
  children,
  accent = 'brand',
  size = 'md',
}: PageHeroProps) {
  return (
    <section className={cn('relative isolate overflow-hidden', !image && 'surface-ink')}>
      {image ? (
        <>
          <img
            src={image}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 -z-20 size-full object-cover"
          />
          {/* Duas camadas: uma escurece o suficiente para o texto passar em AA,
              a outra devolve a cor da marca para o fundo nao virar cinza. */}
          <div className="absolute inset-0 -z-10 bg-ink-950/78" />
          <div
            className={cn(
              'absolute inset-0 -z-10 bg-gradient-to-r',
              accent === 'faculty'
                ? 'from-faculty-900/80 via-ink-950/40 to-transparent'
                : 'from-brand-950/85 via-ink-950/40 to-transparent',
            )}
          />
        </>
      ) : null}

      <div
        className={cn(
          'container-shell relative',
          size === 'sm' ? 'py-14 md:py-20' : 'py-20 md:py-28',
        )}
      >
        <Breadcrumb items={breadcrumb} onDark className="mb-8" />

        <div className="max-w-3xl">
          {eyebrow ? (
            <p
              className={cn(
                'mb-4 text-eyebrow uppercase',
                accent === 'faculty' ? 'text-faculty-300' : 'text-brand-300',
              )}
            >
              {eyebrow}
            </p>
          ) : null}

          <h1 className={cn('text-white', size === 'sm' ? 'text-display-md' : 'text-display-lg')}>
            {title}
          </h1>

          {description ? (
            <p className="mt-6 max-w-2xl text-lg text-ink-200 md:text-xl">{description}</p>
          ) : null}

          {actions ? <div className="mt-9 flex flex-wrap gap-3">{actions}</div> : null}
        </div>

        {children}
      </div>
    </section>
  )
}
