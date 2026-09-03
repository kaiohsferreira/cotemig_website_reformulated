const SITE_NAME = 'COTEMIG'
const SITE_URL = 'https://cotemig.com.br'
const DEFAULT_IMAGE = '/img/logo-white.svg'

export interface SeoProps {
  /** Titulo da pagina, SEM o sufixo da marca — o sufixo e adicionado aqui. */
  title: string
  /** Resumo de 120 a 160 caracteres. Aparece no resultado de busca. */
  description: string
  /** Caminho canonico, comecando com "/". */
  path: string
  /** URL absoluta da imagem de compartilhamento. */
  image?: string
  /** `article` para posts do blog; `website` para o resto. */
  type?: 'website' | 'article'
  /** ISO 8601. So faz sentido quando `type` e `article`. */
  publishedAt?: string
}

/**
 * Metadados por rota.
 *
 * O React 19 iça <title>, <meta> e <link> renderizados aqui para dentro do
 * <head> do documento, entao cada pagina declara os seus proprios metadados
 * como parte da arvore.
 *
 * LIMITE CONHECIDO: isto roda no cliente. Crawlers que executam JavaScript
 * (Google, Bing) leem normalmente; crawlers que nao executam veem apenas o
 * <head> estatico do index.html. Se SEO virar prioridade, o caminho e
 * pre-renderizar as rotas na build — a estrutura de dados do site ja e
 * estatica, entao a migracao e viavel sem reescrever paginas.
 */
export function Seo({
  title,
  description,
  path,
  image = DEFAULT_IMAGE,
  type = 'website',
  publishedAt,
}: SeoProps) {
  const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`
  const canonical = `${SITE_URL}${path}`

  return (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />

      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={image} />
      <meta property="og:locale" content="pt_BR" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {publishedAt ? <meta property="article:published_time" content={publishedAt} /> : null}
    </>
  )
}
