import { cn } from '~/lib/cn'
import { Icon } from './Icon'

export interface PaginationProps {
  page: number
  totalPages: number
  onChange: (page: number) => void
}

/** Devolve os numeros a exibir, com `null` marcando reticencias. */
function buildRange(page: number, totalPages: number): Array<number | null> {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1)
  }

  const pages = new Set<number>([1, totalPages, page, page - 1, page + 1])
  const sorted = [...pages].filter((p) => p >= 1 && p <= totalPages).sort((a, b) => a - b)

  const withGaps: Array<number | null> = []
  sorted.forEach((current, index) => {
    if (index > 0 && current - sorted[index - 1] > 1) withGaps.push(null)
    withGaps.push(current)
  })

  return withGaps
}

export function Pagination({ page, totalPages, onChange }: PaginationProps) {
  if (totalPages <= 1) return null

  const range = buildRange(page, totalPages)

  const stepClasses =
    'inline-flex size-11 items-center justify-center rounded-sm border-2 border-ink-200 ' +
    'text-ink-700 transition-colors hover:border-brand-500 hover:text-brand-700 ' +
    'disabled:pointer-events-none disabled:opacity-40'

  return (
    <nav aria-label="Paginacao" className="flex items-center justify-center gap-2">
      <button
        type="button"
        onClick={() => onChange(page - 1)}
        disabled={page === 1}
        className={stepClasses}
        aria-label="Pagina anterior"
      >
        <Icon name="chevron-right" size={18} className="rotate-180" />
      </button>

      {range.map((item, index) =>
        item === null ? (
          <span key={`gap-${index}`} className="px-1 text-ink-400" aria-hidden="true">
            &hellip;
          </span>
        ) : (
          <button
            key={item}
            type="button"
            onClick={() => onChange(item)}
            aria-current={item === page ? 'page' : undefined}
            className={cn(
              'inline-flex size-11 items-center justify-center rounded-sm border-2 font-display font-semibold transition-colors',
              item === page
                ? 'border-brand-600 bg-brand-600 text-white'
                : 'border-ink-200 text-ink-700 hover:border-brand-500 hover:text-brand-700',
            )}
          >
            {item}
          </button>
        ),
      )}

      <button
        type="button"
        onClick={() => onChange(page + 1)}
        disabled={page === totalPages}
        className={stepClasses}
        aria-label="Proxima pagina"
      >
        <Icon name="chevron-right" size={18} />
      </button>
    </nav>
  )
}
