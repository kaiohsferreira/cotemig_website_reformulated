/**
 * Origem das imagens.
 *
 * Vazio: as imagens vivem em `public/img/` e sao servidas pelo proprio site.
 * Foram trazidas do servidor do COTEMIG por `scripts/download-assets.mjs`, que
 * converteu tudo para WebP no caminho — 200,5 MB na origem viraram 25,4 MB.
 *
 * Apontar esta constante para um CDN (`https://cdn.exemplo.com`) move todas as
 * imagens de uma vez, sem tocar em componente nenhum.
 */
const ASSET_ORIGIN = ''

/** Resolve um caminho de imagem para a URL final. */
export function asset(path: string): string {
  if (path.startsWith('http')) return path
  const normalized = path.startsWith('/') ? path : `/${path}`
  return `${ASSET_ORIGIN}${normalized}`
}
