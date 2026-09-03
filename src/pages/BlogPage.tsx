import { useMemo, useRef, useState } from 'react'
import { posts, postYears } from '~/data/posts'
import type { PostSummary } from '~/data/types'
import { yearOf } from '~/lib/format'
import { Seo } from '~/components/Seo'
import { PageHero } from '~/components/blocks/PageHero'
import { PostCard } from '~/components/blocks/Cards'
import { Section } from '~/components/ui/Section'
import { Pagination } from '~/components/ui/Pagination'
import { Button } from '~/components/ui/Button'
import { Icon } from '~/components/ui/Icon'
import { Field, Input, Select } from '~/components/ui/Form'
import type { SelectOption } from '~/components/ui/Form'

/** Quantos posts cabem numa pagina. 200 de uma vez era o defeito do site atual. */
const PER_PAGE = 12

/** Marcas de acentuacao, isoladas pela decomposicao NFD. */
const DIACRITICS = /\p{Diacritic}/gu

/** Tira acento e caixa para "informacao" casar com "Informação". */
function normalize(value: string): string {
  return value.normalize('NFD').replace(DIACRITICS, '').toLowerCase()
}

/**
 * Indice de busca, montado uma vez na carga do modulo.
 *
 * Normalizar titulo e resumo dos 200 posts a cada tecla digitada seria
 * desperdicio: o conteudo e estatico, entao o texto normalizado tambem e.
 */
const INDEX: Array<{ post: PostSummary; haystack: string }> = posts.map((post) => ({
  post,
  haystack: normalize(`${post.title} ${post.excerpt}`),
}))

const YEAR_OPTIONS: SelectOption[] = [
  { value: '', label: 'Todos os anos' },
  ...postYears().map((year) => ({ value: year, label: year })),
]

export function BlogPage() {
  const [query, setQuery] = useState('')
  const [year, setYear] = useState('')
  const [page, setPage] = useState(1)

  // Ancora da lista: ao trocar de pagina o leitor volta para o topo dos
  // resultados, e nao para o topo do documento inteiro.
  const listRef = useRef<HTMLDivElement>(null)

  const hasFilters = query.trim() !== '' || year !== ''

  const filtered = useMemo(() => {
    const terms = normalize(query.trim()).split(/\s+/).filter(Boolean)

    return INDEX.filter(
      (entry) =>
        (year === '' || yearOf(entry.post.publishedAt) === year) &&
        terms.every((term) => entry.haystack.includes(term)),
    ).map((entry) => entry.post)
  }, [query, year])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE))
  const pageItems = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE)

  // O destaque so faz sentido na lista completa e na primeira pagina: com
  // busca ou filtro ativo o que interessa e o resultado, nao a manchete.
  const showFeatured = !hasFilters && page === 1 && pageItems.length > 0
  const featured = showFeatured ? pageItems[0] : null
  const gridItems = showFeatured ? pageItems.slice(1) : pageItems

  function goToPage(next: number) {
    setPage(next)
    listRef.current?.scrollIntoView({ block: 'start' })
  }

  function clearFilters() {
    setQuery('')
    setYear('')
    setPage(1)
  }

  const countLabel = hasFilters
    ? `${filtered.length} ${filtered.length === 1 ? 'resultado encontrado' : 'resultados encontrados'}`
    : `${posts.length} publicações, das mais recentes às mais antigas`

  return (
    <>
      <Seo
        title="Blog"
        description="Notícias, eventos e conquistas do Colégio e da Faculdade COTEMIG. Acompanhe o que acontece nas nossas unidades em Belo Horizonte."
        path="/blog"
      />

      <PageHero
        breadcrumb={[{ label: 'Início', to: '/' }, { label: 'Blog' }]}
        eyebrow="#issoacontecenocotemig"
        title="Notícias e novidades"
        description="O que acontece no COTEMIG: projetos dos estudantes, eventos, parcerias e conquistas do Colégio e da Faculdade."
      />

      <Section tone="white" spacing="md">
        <div className="flex flex-col gap-6">
          <div>
            {/* Com filtro ativo a lista deixa de ser "todas": o titulo acompanha. */}
            <h2 className="text-display-sm text-ink-900">
              {hasFilters ? 'Resultados da busca' : 'Todas as notícias'}
            </h2>
            <p className="mt-2 text-ink-600" aria-live="polite">
              {countLabel}
            </p>
          </div>

          {/* Busca e filtro rodam no cliente, sobre os dados locais. */}
          <form
            role="search"
            aria-label="Buscar notícias"
            onSubmit={(event) => event.preventDefault()}
            className="rounded-lg border border-ink-200 bg-ink-50 p-5 md:p-6"
          >
            <div className="grid gap-4 md:grid-cols-3">
              <Field label="Buscar" wide>
                {({ id }) => (
                  <Input
                    id={id}
                    type="search"
                    value={query}
                    onChange={(event) => {
                      setQuery(event.target.value)
                      setPage(1)
                    }}
                    placeholder="Buscar por título ou resumo"
                  />
                )}
              </Field>

              <Field label="Ano">
                {({ id }) => (
                  <Select
                    id={id}
                    options={YEAR_OPTIONS}
                    value={year}
                    onChange={(event) => {
                      setYear(event.target.value)
                      setPage(1)
                    }}
                  />
                )}
              </Field>
            </div>

            {hasFilters ? (
              <div className="mt-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  leadingIcon={<Icon name="close" size={16} />}
                >
                  Limpar filtros
                </Button>
              </div>
            ) : null}
          </form>
        </div>

        <div ref={listRef} id="lista-de-noticias" className="mt-10 scroll-mt-28">
          {filtered.length === 0 ? (
            <div className="rounded-lg border-2 border-dashed border-ink-300 bg-ink-50 px-6 py-14 text-center">
              <span className="mx-auto flex size-14 items-center justify-center rounded-full bg-white text-ink-500">
                <Icon name="search" size={26} />
              </span>

              <h3 className="mt-5 font-display text-xl font-bold text-ink-900">
                Nenhuma notícia encontrada
              </h3>

              <p className="mx-auto mt-3 max-w-md text-ink-600">
                Não encontramos publicações com esses critérios. Tente outro termo ou volte para a
                lista completa.
              </p>

              <div className="mt-7 flex justify-center">
                <Button variant="secondary" onClick={clearFilters}>
                  Limpar filtros
                </Button>
              </div>
            </div>
          ) : (
            <>
              {featured ? (
                <div className="mb-8">
                  <PostCard post={featured} variant="featured" />
                </div>
              ) : null}

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {gridItems.map((post) => (
                  <PostCard key={post.slug} post={post} />
                ))}
              </div>

              {/* O wrapper so entra quando ha paginacao: `Pagination` devolve
                  null com uma pagina so, e a div sozinha deixava 56px de vazio
                  abaixo do ultimo card.

                  Sao 17 paginas: a barra passa de 400px e no celular os botoes
                  encolheriam para menos de 44px. Aqui ela guarda o tamanho de
                  alvo e rola na horizontal; a partir de sm ela cabe e centra. */}
              {totalPages > 1 ? (
                <div className="mt-12 overflow-x-auto pb-2 [&>nav]:mx-auto [&>nav]:w-max">
                  <Pagination page={page} totalPages={totalPages} onChange={goToPage} />
                </div>
              ) : null}
            </>
          )}
        </div>
      </Section>
    </>
  )
}
