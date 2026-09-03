import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { cn } from '~/lib/cn'
import { formatShortDate } from '~/lib/format'
import { searchSite } from '~/lib/search'
import type { SearchResult } from '~/lib/search'
import { Icon } from '~/components/ui/Icon'
import { useEscapeKey, useLockBodyScroll } from '~/hooks/useDismissable'

export interface SearchOverlayProps {
  onClose: () => void
}

const KIND_LABEL: Record<SearchResult['kind'], string> = {
  curso: 'Curso',
  unidade: 'Unidade',
  post: 'Blog',
  pagina: 'Página',
}

/**
 * Busca do site.
 *
 * Roda inteiramente no cliente sobre os dados locais — nao ha back-end. Cobre
 * cursos, unidades, paginas institucionais e os 200 posts do blog.
 *
 * Quem chama monta e desmonta este componente em vez de passar `open`. Assim o
 * termo digitado se perde naturalmente ao fechar, sem precisar de um efeito que
 * chama setState — que e render em cascata e o eslint reprova, com razao.
 */
export function SearchOverlay({ onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  useLockBodyScroll(true)
  useEscapeKey(true, onClose)

  // Sincronizar foco com o DOM e exatamente o que um efeito deve fazer.
  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const results = useMemo(() => searchSite(query, 12), [query])
  const trimmed = query.trim()

  return (
    <div className="fixed inset-0 z-60">
      <button
        type="button"
        onClick={onClose}
        aria-label="Fechar busca"
        className="absolute inset-0 bg-ink-950/80 backdrop-blur-sm"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label="Buscar no site"
        className="relative mx-auto mt-24 w-[min(42rem,calc(100%-2rem))] overflow-hidden rounded-lg bg-white shadow-overlay"
      >
        <div className="flex items-center gap-3 border-b border-ink-200 px-5">
          <span className="text-ink-400">
            <Icon name="search" size={20} />
          </span>
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Buscar cursos, unidades e notícias…"
            aria-label="Termo de busca"
            className="h-16 flex-1 bg-transparent text-lg text-ink-900 placeholder:text-ink-400"
          />
          <button
            type="button"
            onClick={onClose}
            className="rounded-sm p-2 text-ink-500 transition-colors hover:text-ink-900"
            aria-label="Fechar busca"
          >
            <Icon name="close" size={20} />
          </button>
        </div>

        <div className="max-h-[min(28rem,60vh)] overflow-y-auto overscroll-contain">
          {trimmed.length < 2 ? (
            <p className="px-5 py-8 text-center text-sm text-ink-500">
              Digite ao menos 2 caracteres para buscar.
            </p>
          ) : results.length === 0 ? (
            <p className="px-5 py-8 text-center text-sm text-ink-500">
              Nada encontrado para <strong className="text-ink-800">“{trimmed}”</strong>.
            </p>
          ) : (
            <ul className="divide-y divide-ink-100" aria-live="polite">
              {results.map((result) => (
                <li key={`${result.kind}-${result.to}`}>
                  <Link
                    to={result.to}
                    onClick={onClose}
                    className="flex items-start gap-4 px-5 py-4 transition-colors hover:bg-brand-50"
                  >
                    <span
                      className={cn(
                        'mt-0.5 shrink-0 rounded-sm px-2 py-1 font-display text-[0.6875rem] font-bold uppercase',
                        result.kind === 'post'
                          ? 'bg-ink-100 text-ink-600'
                          : 'bg-brand-50 text-brand-800',
                      )}
                    >
                      {KIND_LABEL[result.kind]}
                    </span>
                    <span className="min-w-0">
                      <span className="block font-display font-semibold text-ink-900">
                        {result.title}
                      </span>
                      {result.description ? (
                        <span className="mt-0.5 block line-clamp-2 text-sm text-ink-500">
                          {result.description}
                        </span>
                      ) : null}
                      {result.date ? (
                        <span className="mt-1 block text-xs text-ink-400">
                          {formatShortDate(result.date)}
                        </span>
                      ) : null}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}
