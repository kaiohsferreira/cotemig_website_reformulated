import type { IconName } from '~/components/ui/Icon'

/* ---------------------------------------------------------------------------
   Instituicoes e cursos
   ------------------------------------------------------------------------ */

export type InstitutionSlug = 'colegio-cotemig' | 'faculdade-cotemig'

/** Define qual rampa de cor identifica o contexto. */
export type InstitutionAccent = 'brand' | 'faculty'

export interface Institution {
  slug: InstitutionSlug
  /** "Colégio COTEMIG" */
  name: string
  /** "Colégio" — para breadcrumb e rotulos curtos. */
  shortName: string
  /** Frase de posicionamento do hero. */
  tagline: string
  /** 1 a 3 paragrafos de abertura. */
  intro: string[]
  heroImage: string
  cardImage: string
  accent: InstitutionAccent
  /** Motivos para escolher a instituicao. */
  highlights: Feature[]
  /** Formas de ingresso. Vazio quando a instituicao nao tem processo formal. */
  admissionRoutes: Feature[]
  /** Bolsas, convenios e financiamentos. */
  funding: Feature[]
  /** Chamada final da pagina. */
  callToAction: CallToAction
}

export interface Course {
  slug: string
  institution: InstitutionSlug
  /** "Sistemas de Informação" */
  name: string
  /** "Bacharelado", "Tecnólogo", "Ensino Médio integrado ao Técnico". */
  degree: string
  /** Uma frase. Aparece no card e na meta description. */
  summary: string
  heroImage: string
  cardImage: string
  /** PDF da matriz curricular. `null` quando o curso nao publica matriz. */
  curriculumPdf: string | null
  /** Os quatro fatos do topo: onde, duracao, turno, pre-requisito. */
  facts: CourseFact[]
  /** Corpo descritivo do curso. */
  description: string[]
  /** Areas de atuacao do egresso. */
  careers: string[]
  /** Motivos para escolher — herda os da instituicao quando vazio. */
  highlights: Feature[]
  /** Blocos de conteudo programatico, exibidos em accordion. */
  curriculumGroups: CurriculumGroup[]
  callToAction: CallToAction
}

export interface CourseFact {
  icon: IconName
  /** "Duração" */
  label: string
  /** "4 anos" */
  value: string
}

export interface CurriculumGroup {
  title: string
  items: string[]
}

/* ---------------------------------------------------------------------------
   Blocos reutilizaveis
   ------------------------------------------------------------------------ */

export interface Feature {
  icon: IconName
  title: string
  description: string
}

export interface CallToAction {
  title: string
  description: string
  label: string
  href: string
}

/* ---------------------------------------------------------------------------
   Unidades
   ------------------------------------------------------------------------ */

export interface Unit {
  slug: string
  name: string
  /** Diferencia unidade de ensino de escritorio administrativo. */
  kind: 'ensino' | 'administrativo'
  /** Uma frase sobre a unidade. */
  summary: string
  address: string
  district: string
  city: string
  cep: string
  phone: string
  /** Horarios de atendimento, ja separados por publico. */
  hours: LabelledValue[]
  /** Linhas de onibus que servem a unidade. */
  busLines: string[]
  /** Rotas de van, quando a unidade oferece. */
  vanRoutes: LabelledValue[]
  /** Tour virtual no YouTube. `null` quando nao existe. */
  tourUrl: string | null
  coverImage: string
  gallery: GalleryImage[]
  /** Link do Google Maps para tracar rota. */
  mapUrl: string
}

export interface LabelledValue {
  label: string
  value: string
  /** Quando presente, o valor vira link. */
  href?: string
}

export interface GalleryImage {
  src: string
  alt: string
}

/* ---------------------------------------------------------------------------
   Blog
   ------------------------------------------------------------------------ */

export type PostBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'image'; src: string; alt: string }

/**
 * Metadados do post, sem o corpo.
 *
 * E o que a home, a listagem e a busca precisam. Fica no bundle principal
 * porque e pequeno; o corpo dos 200 posts vem a parte, sob demanda.
 */
export interface PostSummary {
  slug: string
  title: string
  /** ISO 8601, "2026-08-26". */
  publishedAt: string
  image: string
  excerpt: string
}

/** Post completo — o resumo mais o corpo, carregado sob demanda. */
export interface Post extends PostSummary {
  body: PostBlock[]
}

/* ---------------------------------------------------------------------------
   Institucional
   ------------------------------------------------------------------------ */

export interface AboutContent {
  tagline: string
  intro: string[]
  /** A trajetoria do grupo, em paragrafos. */
  history: string[]
  /** Marcos com ano, para a linha do tempo. */
  milestones: Milestone[]
  /** O que diferencia o COTEMIG. */
  difference: string[]
  /** Missao, visao e valores. */
  principles: Principle[]
  stats: Stat[]
}

export interface Milestone {
  /** "1971" */
  year: string
  title: string
  description: string
}

export interface Principle {
  title: string
  body: string[]
}

export interface Stat {
  /** "55+" */
  value: string
  label: string
}

/* ---------------------------------------------------------------------------
   Juridico
   ------------------------------------------------------------------------ */

export interface LegalDocument {
  title: string
  /** Data da ultima revisao, em ISO 8601. `null` quando o site nao informa. */
  updatedAt: string | null
  intro: string[]
  sections: LegalSection[]
}

export interface LegalSection {
  /** Ancora para o sumario lateral. */
  id: string
  title: string
  blocks: LegalBlock[]
}

export type LegalBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'list'; items: string[] }
