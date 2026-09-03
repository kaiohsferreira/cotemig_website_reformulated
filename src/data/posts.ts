import index from './posts-index.json'
import type { PostBlock, PostSummary } from './types'

/**
 * Posts do blog.
 *
 * Gerado por `node scripts/extract-blog.mjs` a partir do site atual — 200
 * posts, de 2018 a 2026.
 *
 * O indice (metadados + resumo) entra no bundle principal porque a home, a
 * listagem e a busca precisam dele de imediato. Os corpos somam centenas de KB
 * e so interessam a quem abre um post — por isso vivem em `posts-bodies.json`
 * e chegam por `import()` dinamico, que o Vite emite como chunk separado.
 */
export const posts: PostSummary[] = (index as PostSummary[])
  .slice()
  .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))

export function findPost(slug: string): PostSummary | undefined {
  return posts.find((post) => post.slug === slug)
}

/** Os `count` posts mais recentes. */
export function latestPosts(count: number): PostSummary[] {
  return posts.slice(0, count)
}

/** Posts vizinhos na linha do tempo, excluindo o atual. */
export function relatedPosts(slug: string, count: number): PostSummary[] {
  const index = posts.findIndex((post) => post.slug === slug)
  if (index === -1) return latestPosts(count)

  const neighbours = [...posts.slice(index + 1), ...posts.slice(0, index)]
  return neighbours.slice(0, count)
}

/** Anos com publicacoes, do mais recente para o mais antigo. */
export function postYears(): string[] {
  return [...new Set(posts.map((post) => post.publishedAt.slice(0, 4)))].sort((a, b) =>
    b.localeCompare(a),
  )
}

/* ---------------------------------------------------------------------------
   Corpo do post, sob demanda
   ------------------------------------------------------------------------ */

type BodyMap = Record<string, PostBlock[]>

let bodiesPromise: Promise<BodyMap> | null = null

/** Carrega o arquivo de corpos uma unica vez e reaproveita. */
function loadBodies(): Promise<BodyMap> {
  bodiesPromise ??= import('./posts-bodies.json').then(
    (module) => (module.default ?? module) as BodyMap,
  )
  return bodiesPromise
}

/** Corpo do post. `null` quando o slug nao existe. */
export async function loadPostBody(slug: string): Promise<PostBlock[] | null> {
  const bodies = await loadBodies()
  return bodies[slug] ?? null
}
