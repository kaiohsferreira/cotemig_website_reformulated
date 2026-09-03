import { courses } from '~/data/courses'
import { institutions } from '~/data/institutions'
import { units } from '~/data/units'
import { posts } from '~/data/posts'

export interface SearchResult {
  kind: 'curso' | 'unidade' | 'post' | 'pagina'
  title: string
  description?: string
  /** Data ISO, so para posts. */
  date?: string
  to: string
  /** Quanto maior, mais relevante. */
  score: number
}

/** Marcas de acentuacao, isoladas pela decomposicao NFD. */
const DIACRITICS = /\p{Diacritic}/gu

/** Tira acento e caixa para a busca casar "informacao" com "Informação". */
function normalize(value: string): string {
  return value.normalize('NFD').replace(DIACRITICS, '').toLowerCase()
}

interface Indexed {
  kind: SearchResult['kind']
  title: string
  description?: string
  date?: string
  to: string
  /** Peso base do tipo de conteudo. Curso vale mais que post. */
  weight: number
  haystack: string
}

interface StaticPage {
  title: string
  description: string
  to: string
}

const STATIC_PAGES: StaticPage[] = [
  {
    title: 'Quem somos',
    description: 'A história e os princípios do Grupo COTEMIG.',
    to: '/quem-somos',
  },
  {
    title: 'Unidades',
    description: 'Onde ficam as unidades do COTEMIG em Belo Horizonte.',
    to: '/unidades',
  },
  {
    title: 'Contato e ouvidoria',
    description: 'Fale com a equipe do COTEMIG.',
    to: '/contato',
  },
  {
    title: 'Trabalhe conosco',
    description: 'Cadastre seu currículo para os processos seletivos do COTEMIG.',
    to: '/carreiras',
  },
  {
    title: 'Divulgue vagas de estágio',
    description: 'Empresas podem cadastrar vagas para os estudantes do COTEMIG.',
    to: '/cadastro-de-vagas',
  },
  {
    title: 'Newsletter',
    description: 'Receba as novidades do COTEMIG por e-mail.',
    to: '/newsletter',
  },
  {
    title: 'Aviso de Proteção de Dados',
    description: 'Como o COTEMIG trata os seus dados pessoais.',
    to: '/aviso-protecao-dados',
  },
  {
    title: 'Blog',
    description: 'Notícias e novidades do COTEMIG.',
    to: '/blog',
  },
]

/**
 * Indice em memoria, montado uma vez na carga do modulo.
 *
 * Sao poucas centenas de itens, entao busca linear com pontuacao simples da
 * conta e evita trazer uma biblioteca de busca so para isso.
 */
const index: Indexed[] = [
  ...institutions.map((institution) => ({
    kind: 'pagina' as const,
    title: institution.name,
    description: institution.tagline,
    to: `/ensino/${institution.slug}`,
    weight: 5,
    haystack: normalize(`${institution.name} ${institution.tagline} ${institution.intro.join(' ')}`),
  })),
  ...courses.map((course) => ({
    kind: 'curso' as const,
    title: course.name,
    // Varios resumos ja comecam pelo grau ("Bacharelado para quem…"), entao
    // prefixar sem checar produzia "Bacharelado · Bacharelado para quem…".
    description: course.summary.startsWith(course.degree)
      ? course.summary
      : `${course.degree} · ${course.summary}`,
    to: `/ensino/${course.institution}/curso/${course.slug}`,
    weight: 6,
    haystack: normalize(
      `${course.name} ${course.degree} ${course.summary} ${course.careers.join(' ')}`,
    ),
  })),
  ...units.map((unit) => ({
    kind: 'unidade' as const,
    title: unit.name,
    description: `${unit.address} — ${unit.district}`,
    to: `/unidades/${unit.slug}`,
    weight: 4,
    haystack: normalize(`${unit.name} ${unit.address} ${unit.district} ${unit.summary}`),
  })),
  ...STATIC_PAGES.map((page) => ({
    kind: 'pagina' as const,
    title: page.title,
    description: page.description,
    to: page.to,
    weight: 3,
    haystack: normalize(`${page.title} ${page.description}`),
  })),
  ...posts.map((post) => ({
    kind: 'post' as const,
    title: post.title,
    description: post.excerpt,
    date: post.publishedAt,
    to: `/blog/${post.slug}`,
    weight: 1,
    haystack: normalize(`${post.title} ${post.excerpt}`),
  })),
]

/** Busca por todos os termos informados. Devolve os `limit` melhores. */
export function searchSite(query: string, limit = 10): SearchResult[] {
  const trimmed = query.trim()
  if (trimmed.length < 2) return []

  const terms = normalize(trimmed).split(/\s+/).filter(Boolean)
  if (terms.length === 0) return []

  const matches: SearchResult[] = []

  for (const entry of index) {
    let score = 0
    let matchedAll = true

    for (const term of terms) {
      const position = entry.haystack.indexOf(term)
      if (position === -1) {
        matchedAll = false
        break
      }
      // Casar no comeco vale mais que casar no fim do texto.
      score += position === 0 ? 3 : position < 40 ? 2 : 1
    }

    if (!matchedAll) continue

    matches.push({
      kind: entry.kind,
      title: entry.title,
      description: entry.description,
      date: entry.date,
      to: entry.to,
      score: score * entry.weight,
    })
  }

  return matches.sort((a, b) => b.score - a.score).slice(0, limit)
}
