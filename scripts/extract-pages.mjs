/**
 * Despeja o conteudo estruturado das paginas institucionais do site atual.
 *
 *   node scripts/extract-pages.mjs [caminho-de-saida]
 *
 * Diferente de extract-blog.mjs, este script NAO gera dado final: ele produz um
 * despejo legivel que serve de fonte para escrever os arquivos de
 * src/data/*.ts a mao. As paginas institucionais precisam de curadoria
 * (reagrupar secoes, corrigir os erros de digitacao do site atual), entao
 * copiar automatico produziria um resultado pior.
 */

import { writeFile } from 'node:fs/promises'
import { decodeEntities } from './lib/entities.mjs'

const ORIGIN = 'https://cotemig.com.br'

const PAGES = [
  '/ensino/colegio-cotemig',
  '/ensino/colegio-cotemig/curso/ensino-medio-+-tecnico',
  '/ensino/colegio-cotemig/curso/escola-de-referencia-google',
  '/ensino/faculdade-cotemig',
  '/ensino/faculdade-cotemig/curso/sistemas-de-informacao',
  '/ensino/faculdade-cotemig/curso/analise-e-desenvolvimento-de-sistemas',
  '/ensino/faculdade-cotemig/curso/ciencia-da-computacao',
  '/unidades/colegio-barroca-faculdade-cotemig',
  '/unidades/colegio-floresta',
  '/unidades/escritorio-central',
  '/quem-somos',
  '/aviso-protecao-dados',
]

/** Remove header, menu, rodape e widgets — sobra so o miolo da pagina. */
function trimChrome(html) {
  const start = html.indexOf('</section>', html.indexOf('swipe-menu-responsivo'))
  const end = html.indexOf('<footer')
  return html.slice(start === -1 ? 0 : start, end === -1 ? html.length : end)
}

/** Converte o HTML do miolo numa lista de linhas anotadas. */
function toOutline(html) {
  const marked = html
    .replace(/<section[^>]*class="([^"]*)"[^>]*>/g, '\n@@SECTION $1\n')
    .replace(/<div[^>]*class="([^"]*)"[^>]*>/g, '\n@@BLOCK $1\n')
    .replace(/<img[^>]*?src="([^"]+)"[^>]*?alt="([^"]*)"[^>]*>/g, '\n@@IMG $1 :: $2\n')
    .replace(/<img[^>]*?src="([^"]+)"[^>]*>/g, '\n@@IMG $1\n')
    .replace(/<a[^>]*?href="([^"]+)"[^>]*>/g, '\n@@LINK $1 :: ')
    .replace(/<(h[1-6])[^>]*>/g, '\n@@$1 ')
    .replace(/<li[^>]*>/g, '\n@@ITEM ')
    .replace(/<br\s*\/?>/g, '\n')
    .replace(/<\/(p|h[1-6]|li|a|div|section|figcaption|strong|em)>/g, '\n')
    .replace(/<[^>]+>/g, '')

  const lines = []
  for (const raw of decodeEntities(marked).split('\n')) {
    const line = raw.replace(/[ \t]+/g, ' ').trim()
    if (!line) continue
    // Descarta ruido: blocos de layout sem semantica.
    if (/^@@BLOCK (container|row|col|clearfix)$/.test(line)) continue
    if (lines[lines.length - 1] === line) continue
    lines.push(line)
  }
  return lines
}

async function main() {
  const out = process.argv[2] ?? 'paginas-extraidas.txt'
  const parts = []

  for (const page of PAGES) {
    process.stdout.write(`${page} … `)
    const response = await fetch(`${ORIGIN}${encodeURI(page)}`)
    const html = await response.text()
    const outline = toOutline(trimChrome(html))
    parts.push(`\n${'='.repeat(78)}\n${page}\n${'='.repeat(78)}\n${outline.join('\n')}`)
    console.log(`${outline.length} linhas`)
  }

  await writeFile(out, parts.join('\n'), 'utf8')
  console.log(`\nGravado em ${out}`)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
