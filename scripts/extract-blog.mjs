/**
 * Extrai os posts do blog do site atual (cotemig.com.br) para src/data/posts.json.
 *
 * Fica no repo de proposito: documenta de onde veio o conteudo e permite
 * regerar quando o site publicar posts novos.
 *
 *   node scripts/extract-blog.mjs
 *
 * Nao ha back-end neste projeto — o JSON gerado e o conteudo definitivo.
 */

import { writeFile, mkdir } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { decodeEntities } from './lib/entities.mjs'

const ORIGIN = 'https://cotemig.com.br'
const DATA_DIR = resolve(dirname(fileURLToPath(import.meta.url)), '../src/data')

/**
 * A saida e dividida em dois arquivos de proposito.
 *
 * O indice (metadados + resumo) e pequeno e entra no bundle principal, porque
 * a home, a busca e a listagem precisam dele de imediato. Os corpos dos 200
 * posts somam centenas de KB e so interessam a quem abre um post — ficam num
 * arquivo separado, carregado sob demanda. Num arquivo unico, todo visitante
 * baixaria o blog inteiro para ver a home.
 */
const OUT_INDEX = resolve(DATA_DIR, 'posts-index.json')
const OUT_BODIES = resolve(DATA_DIR, 'posts-bodies.json')

const MONTHS = {
  janeiro: '01',
  fevereiro: '02',
  março: '03',
  marco: '03',
  abril: '04',
  maio: '05',
  junho: '06',
  julho: '07',
  agosto: '08',
  setembro: '09',
  outubro: '10',
  novembro: '11',
  dezembro: '12',
}

function clean(input) {
  return decodeEntities(input).replace(/\s+/g, ' ').trim()
}

/** "Em 26 de Agosto de 2026" -> "2026-08-26" */
function toIsoDate(text) {
  const match = /(\d{1,2})\s+de\s+([a-zç]+)\s+de\s+(\d{4})/i.exec(text ?? '')
  if (!match) return null
  const [, day, monthName, year] = match
  const month = MONTHS[monthName.toLowerCase()]
  if (!month) return null
  return `${year}-${month}-${day.padStart(2, '0')}`
}

function absolute(url) {
  if (!url) return null
  if (url.startsWith('http')) return url
  return `${ORIGIN}${url.startsWith('/') ? '' : '/'}${url}`
}

async function get(path) {
  const response = await fetch(`${ORIGIN}${path}`, {
    headers: { 'user-agent': 'cotemig-redesign-content-extractor' },
  })
  if (!response.ok) throw new Error(`${path} respondeu ${response.status}`)
  return response.text()
}

/** Le a listagem e devolve os metadados de cada post. */
function parseIndex(html) {
  const posts = []
  const boxes = html.matchAll(/<div class="blog-box">([\s\S]*?)<span class="mask">/g)

  for (const [, box] of boxes) {
    const image = /<img\s+src="([^"]+)"/.exec(box)?.[1]
    const title = /<h3>\s*([\s\S]*?)<\/h3>/.exec(box)?.[1]
    const date = /<em>([\s\S]*?)<\/em>/.exec(box)?.[1]
    const href = /<a href="\/blog\/([^"]+)"/.exec(box)?.[1]

    if (!href || !title) continue

    posts.push({
      // O href vem com entidades HTML (ha slugs com aspas no site atual).
      slug: decodeURIComponent(decodeEntities(href)),
      title: clean(title),
      publishedAt: toIsoDate(clean(date)),
      image: absolute(image),
    })
  }

  return posts
}

/** Converte o corpo do post numa lista ordenada de blocos. */
function parseBody(html) {
  const section = /<section class="single-blog container">([\s\S]*?)<div class="single-blog__share">/.exec(
    html,
  )?.[1]
  if (!section) return []

  const withMarkers = section
    .replace(/<img[^>]*?src="([^"]+)"[^>]*?alt="([^"]*)"[^>]*>/g, '\n[[IMG:$1|$2]]\n')
    .replace(/<img[^>]*?src="([^"]+)"[^>]*>/g, '\n[[IMG:$1|]]\n')
    .replace(/<br\s*\/?>/g, '\n')
    .replace(/<\/(p|div|h\d|li)>/g, '\n')
    .replace(/<li[^>]*>/g, '• ')
    .replace(/<[^>]+>/g, '')

  const blocks = []
  for (const rawLine of decodeEntities(withMarkers).split('\n')) {
    const line = rawLine.replace(/\s+/g, ' ').trim()
    if (!line) continue

    const imageMatch = /^\[\[IMG:([^|]+)\|([^\]]*)\]\]$/.exec(line)
    if (imageMatch) {
      blocks.push({ type: 'image', src: absolute(imageMatch[1]), alt: imageMatch[2] || '' })
      continue
    }

    blocks.push({ type: 'paragraph', text: line })
  }

  return blocks
}

/** Primeiro paragrafo com corpo suficiente para servir de resumo. */
function buildExcerpt(blocks) {
  const paragraph = blocks.find((block) => block.type === 'paragraph' && block.text.length > 80)
  if (!paragraph) return ''
  const text = paragraph.text
  if (text.length <= 180) return text
  return `${text.slice(0, 177).replace(/\s+\S*$/, '')}…`
}

async function main() {
  console.log('Lendo a listagem do blog…')
  const index = parseIndex(await get('/blog'))
  console.log(`  ${index.length} posts encontrados.`)

  const summaries = []
  const bodies = {}
  let failures = 0

  for (const [position, meta] of index.entries()) {
    process.stdout.write(`  [${position + 1}/${index.length}] ${meta.slug.slice(0, 58)}… `)
    try {
      // encodeURI nao escapa aspas, e ha slugs que as contem.
      const path = `/blog/${encodeURI(meta.slug).replace(/"/g, '%22')}`
      const blocks = parseBody(await get(path))
      if (blocks.length === 0) throw new Error('corpo vazio')
      summaries.push({ ...meta, excerpt: buildExcerpt(blocks) })
      bodies[meta.slug] = blocks
      console.log(`ok (${blocks.length} blocos)`)
    } catch (error) {
      failures += 1
      console.log(`FALHOU — ${error.message}`)
    }
  }

  await mkdir(DATA_DIR, { recursive: true })
  await writeFile(OUT_INDEX, `${JSON.stringify(summaries, null, 2)}\n`, 'utf8')
  await writeFile(OUT_BODIES, `${JSON.stringify(bodies)}\n`, 'utf8')

  console.log(`\n${summaries.length} posts gravados:`)
  console.log('  src/data/posts-index.json   (metadados, entra no bundle)')
  console.log('  src/data/posts-bodies.json  (corpos, carregado sob demanda)')
  if (failures > 0) console.log(`${failures} post(s) nao puderam ser extraidos.`)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
