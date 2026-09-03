import { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { cn } from '~/lib/cn'
import { Icon } from './Icon'

export interface BreadcrumbItem {
  label: string
  /** Ausente no ultimo item (a pagina atual). */
  to?: string
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[]
  /** Claro quando o breadcrumb esta sobre o hero escuro. */
  onDark?: boolean
  className?: string
}

export function Breadcrumb({ items, onDark = false, className }: BreadcrumbProps) {
  return (
    <nav aria-label="Trilha de navegacao" className={className}>
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
        {items.map((item, index) => {
          const isLast = index === items.length - 1
          return (
            <Fragment key={`${item.label}-${index}`}>
              <li>
                {item.to && !isLast ? (
                  <Link
                    to={item.to}
                    className={cn(
                      'rounded-sm underline-offset-4 hover:underline',
                      onDark ? 'text-ink-300 hover:text-white' : 'text-ink-500 hover:text-brand-700',
                    )}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span
                    aria-current={isLast ? 'page' : undefined}
                    className={cn('font-semibold', onDark ? 'text-white' : 'text-ink-800')}
                  >
                    {item.label}
                  </span>
                )}
              </li>
              {!isLast ? (
                <li aria-hidden="true" className={onDark ? 'text-ink-500' : 'text-ink-400'}>
                  <Icon name="chevron-right" size={14} />
                </li>
              ) : null}
            </Fragment>
          )
        })}
      </ol>
    </nav>
  )
}
