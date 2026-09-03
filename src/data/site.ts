import type { IconName } from '~/components/ui/Icon'

/* ---------------------------------------------------------------------------
   Identidade e contato
   ------------------------------------------------------------------------ */

export const site = {
  name: 'COTEMIG',
  legalName: 'COTEMIG EMPRESARIAL S/A',
  cnpj: '17.229.881/0001-10',
  tagline: 'Sua revolução começa aqui',
  description:
    'Há mais de 55 anos formando profissionais de tecnologia em Belo Horizonte, do Ensino Médio Técnico à graduação.',
  foundedIn: 1971,
  phone: {
    label: '(31) 3213-8666',
    href: 'tel:+553132138666',
  },
  whatsapp: {
    label: 'Falar no WhatsApp',
    href: 'https://wa.me/553132138666',
  },
  email: {
    careers: 'carreiras@cotemig.com.br',
    dpo: 'dpo@cotemig.com.br',
  },
  /** Horario da central de atendimento telefonico. */
  serviceHours: 'Segunda a sexta, das 8h às 17h30',
} as const

/* ---------------------------------------------------------------------------
   Sistemas externos
   ------------------------------------------------------------------------
   Sao dominios de terceiros, fora do escopo deste front-end. Ficam num objeto
   unico para que a troca de qualquer URL seja um ponto so.                    */

export const externalLinks = {
  restrictedArea: 'https://restrito.cotemig.com.br/login/',
  forgotPassword: 'https://restrito.cotemig.com.br/portal/v2/esqueceusenha.php',
  admission: 'https://matricula.cotemig.com.br/',
  entranceExam: 'https://vestibular.cotemig.com.br/',
  diploma: 'https://diploma.faculdadecotemig.br/',
  diplomaGuide:
    'https://cotemig.com.br/assets/pdf/Orienta%C3%A7%C3%B5es%20Diploma%20Digital%20-%20Faculdade%20COTEMIG.pdf',
  virtualTourBarroca: 'https://www.youtube.com/watch?v=wdSx2I8kNzs',
  virtualTourFloresta: 'https://www.youtube.com/watch?v=JdTivb2RJmk',
} as const

/* ---------------------------------------------------------------------------
   Redes sociais
   ------------------------------------------------------------------------
   O grupo mantem dois conjuntos de perfis, um por instituicao. O site atual
   mostra os dois lado a lado no rodape, e mantemos essa separacao.            */

export interface SocialLink {
  network: Extract<IconName, 'facebook' | 'instagram' | 'linkedin' | 'twitter'>
  label: string
  handle: string
  href: string
}

export const socialProfiles: Record<'colegio' | 'faculdade', SocialLink[]> = {
  colegio: [
    {
      network: 'instagram',
      label: 'Instagram',
      handle: '@cotemig',
      href: 'https://www.instagram.com/cotemig/',
    },
    {
      network: 'facebook',
      label: 'Facebook',
      handle: '/cotemig',
      href: 'https://pt-br.facebook.com/cotemig/',
    },
    {
      network: 'linkedin',
      label: 'LinkedIn',
      handle: '/colegio-cotemig',
      href: 'https://br.linkedin.com/school/colegio-cotemig/',
    },
    {
      network: 'twitter',
      label: 'X',
      handle: '@colcotemig',
      href: 'https://twitter.com/colcotemig',
    },
  ],
  faculdade: [
    {
      network: 'instagram',
      label: 'Instagram',
      handle: '@faculdadecotemig',
      href: 'https://www.instagram.com/faculdadecotemig/',
    },
    {
      network: 'facebook',
      label: 'Facebook',
      handle: '/FacCotemig',
      href: 'https://www.facebook.com/FacCotemig/',
    },
    {
      network: 'linkedin',
      label: 'LinkedIn',
      handle: '/faculdade-cotemig',
      href: 'https://pt.linkedin.com/school/faculdade-cotemig/',
    },
    {
      network: 'twitter',
      label: 'X',
      handle: '@FacCotemig',
      href: 'https://twitter.com/FacCotemig',
    },
  ],
}

/* ---------------------------------------------------------------------------
   Navegacao
   ------------------------------------------------------------------------ */

export interface NavLink {
  label: string
  /** Rota interna. */
  to?: string
  /** URL externa. */
  href?: string
}

/** Itens principais do header. "Cursos" abre o mega-menu. */
export const primaryNav: NavLink[] = [
  { label: 'Cursos', to: '/ensino/faculdade-cotemig' },
  { label: 'Unidades', to: '/unidades' },
  { label: 'Blog', to: '/blog' },
  { label: 'Sobre nós', to: '/quem-somos' },
  { label: 'Contato', to: '/contato' },
]

/**
 * Servicos.
 *
 * No site atual estes itens ficam num submenu "Mais" e repetidos no rodape.
 * "Consulta Pública de Diploma" e "Consultar Históricos" apontavam para a
 * MESMA URL — mantemos um item so, com o rotulo que cobre os dois usos.
 */
export const serviceNav: NavLink[] = [
  { label: 'Área Restrita', href: externalLinks.restrictedArea },
  { label: 'Diplomas e históricos', href: externalLinks.diploma },
  { label: 'Diploma digital — orientações', href: externalLinks.diplomaGuide },
  { label: 'Trabalhe conosco', to: '/carreiras' },
  { label: 'Divulgue vagas de estágio', to: '/cadastro-de-vagas' },
  { label: 'Newsletter', to: '/newsletter' },
]

export interface FooterColumn {
  title: string
  links: NavLink[]
}

export const footerNav: FooterColumn[] = [
  {
    title: 'Institucional',
    links: [
      { label: 'Quem somos', to: '/quem-somos' },
      { label: 'Unidades', to: '/unidades' },
      { label: 'Blog', to: '/blog' },
      { label: 'Contato e ouvidoria', to: '/contato' },
    ],
  },
  {
    title: 'Ensino',
    links: [
      { label: 'Colégio COTEMIG', to: '/ensino/colegio-cotemig' },
      { label: 'Faculdade COTEMIG', to: '/ensino/faculdade-cotemig' },
      { label: 'Matricule-se', href: externalLinks.admission },
      { label: 'Vestibular', href: externalLinks.entranceExam },
    ],
  },
  {
    title: 'Serviços',
    links: [
      { label: 'Área Restrita', href: externalLinks.restrictedArea },
      { label: 'Diplomas e históricos', href: externalLinks.diploma },
      { label: 'Trabalhe conosco', to: '/carreiras' },
      { label: 'Divulgue vagas de estágio', to: '/cadastro-de-vagas' },
    ],
  },
  {
    title: 'Conheça',
    links: [
      { label: 'Tour virtual — Barroca', href: externalLinks.virtualTourBarroca },
      { label: 'Tour virtual — Floresta', href: externalLinks.virtualTourFloresta },
      { label: 'Newsletter', to: '/newsletter' },
      { label: 'Aviso de Proteção de Dados', to: '/aviso-protecao-dados' },
    ],
  },
]
