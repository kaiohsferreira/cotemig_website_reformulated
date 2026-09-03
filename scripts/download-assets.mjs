/**
 * Traz para o repositorio todas as imagens que o site referencia no servidor
 * do COTEMIG, otimiza, e reescreve os caminhos para apontarem local.
 *
 *   node scripts/download-assets.mjs --dry-run   # so mede, nao baixa
 *   node scripts/download-assets.mjs             # baixa, converte e reescreve
 *
 * POR QUE CONVERTER
 * As 416 imagens somam 200 MB na origem. Nao e volume de imagem: sao fotos
 * salvas como PNG em dimensao pequena — ha arquivos de 620x503 pesando 499 KB,
 * que em WebP cabem em ~40 KB. Copiar isso cru para o git significaria um
 * repositorio de 200 MB e um site lento no celular. Entao o download converte
 * para WebP e limita a largura.
 *
 * ONDE CAI
 * Tudo em `public/img/`. NAO em `public/assets/`, porque `dist/assets/` e onde
 * o Vite grava os bundles com hash no nome — esses podem ter cache imutavel,
 * imagem sem hash nao pode. Pastas separadas, politicas de cache separadas.
 *
 * O script e idempotente: rodar de novo so baixa o que falta.
 */

import { mkdir, readFile, readdir, stat, writeFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const DRY_RUN = process.argv.includes('--dry-run')
const CONCURRENCY = 6

/** Largura maxima. Acima disso nenhuma tela do site usa a resolucao extra. */
const MAX_WIDTH = 1600
const WEBP_QUALITY = 80

/** De onde as imagens vem hoje. */
const HOSTS = ['https://cotemig.com.br', 'https://restrito.cotemig.com.br']

/** Formatos que ficam como estao — converter nao ajuda ou quebra. */
const KEEP_AS_IS = /\.(svg|ico)$/i

/**
 * Converte a URL remota no caminho local.
 *
 * `/assets/img/units/x.jpg`  -> `/img/units/x.webp`
 * `/static/course/x.png`     -> `/img/course/x.webp`
 * `restrito.../mkt/x.png`    -> `/img/blog-conteudo/x.webp`
 */
function toLocalPath(url) {
  const { hostname, pathname } = new URL(url)

  let base
  if (hostname === 'restrito.cotemig.com.br') {
    base = `/img/blog-conteudo/${pathname.split('/').pop()}`
  } else {
    const parts = pathname.replace(/^\//, '').split('/')
    if (parts[0] === 'assets' && parts[1] === 'img') base = `/img/${parts.slice(2).join('/')}`
    else if (parts[0] === 'static' || parts[0] === 'assets') base = `/img/${parts.slice(1).join('/')}`
    else base = `/img/${parts.join('/')}`
  }

  return KEEP_AS_IS.test(base) ? base : base.replace(/\.[a-z0-9]+$/i, '.webp')
}

/* ---------------------------------------------------------------------------
   Coleta
   ------------------------------------------------------------------------ */

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name)
    if (entry.isDirectory()) yield* walk(path)
    else yield path
  }
}

async function referencedFiles() {
  const files = []
  for await (const path of walk(join(ROOT, 'src'))) {
    if (/\.(tsx?|json|css)$/.test(path)) files.push(path)
  }
  files.push(join(ROOT, 'index.html'))
  return files
}

/** Toda URL remota de imagem referenciada em src/ e no index.html. */
async function collectUrls() {
  const urls = new Set()
  const hostPattern = HOSTS.map((host) => host.replace(/[.]/g, '\\.')).join('|')
  const absolute = new RegExp(`(?:${hostPattern})/[^"'\\s)\\\\]+`, 'g')
  const assetCall = /asset\(\s*'([^']+)'\s*\)/g
  const isImage = /\.(png|jpe?g|gif|svg|webp|avif|ico)$/i

  for (const path of await referencedFiles()) {
    const source = await readFile(path, 'utf8')

    for (const match of source.matchAll(absolute)) {
      const url = match[0].replace(/[.,;]+$/, '')
      if (isImage.test(url)) urls.add(url)
    }

    for (const match of source.matchAll(assetCall)) {
      const value = match[1]
      if (value.startsWith('http') || !isImage.test(value)) continue
      urls.add(`${HOSTS[0]}${value.startsWith('/') ? '' : '/'}${value}`)
    }
  }

  return [...urls].sort()
}

/* ---------------------------------------------------------------------------
   Download e otimizacao
   ------------------------------------------------------------------------ */

async function download(url) {
  const response = await fetch(url, {
    headers: { 'user-agent': 'cotemig-redesign-asset-downloader' },
  })
  if (!response.ok) throw new Error(`HTTP ${response.status}`)
  return Buffer.from(await response.arrayBuffer())
}

/** Converte para WebP, respeitando GIF animado e sem ampliar imagem pequena. */
async function optimize(buffer, url) {
  if (KEEP_AS_IS.test(url)) return buffer

  const animated = /\.gif$/i.test(url)
  const image = sharp(buffer, { animated })
  const { width } = await image.metadata()

  return image
    .resize({ width: Math.min(width ?? MAX_WIDTH, MAX_WIDTH), withoutEnlargement: true })
    .webp({ quality: WEBP_QUALITY, effort: 5 })
    .toBuffer()
}

/** Roda `task` sobre `items` com no maximo `limit` em paralelo. */
async function pool(items, limit, task) {
  let cursor = 0
  const workers = Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (cursor < items.length) await task(items[cursor++])
  })
  await Promise.all(workers)
}

function human(bytes) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`
}

/* ---------------------------------------------------------------------------
   Reescrita dos caminhos
   ------------------------------------------------------------------------ */

async function rewriteReferences(map) {
  let touched = 0

  for (const path of await referencedFiles()) {
    const source = await readFile(path, 'utf8')
    let updated = source

    for (const [url, local] of map) {
      if (updated.includes(url)) updated = updated.split(url).join(local)
      // asset('/assets/img/x.jpg') e asset('/static/x.png') viram asset('/img/x.webp')
      if (new URL(url).origin === HOSTS[0]) {
        const relative = new URL(url).pathname
        updated = updated.split(`'${relative}'`).join(`'${local}'`)
      }
    }

    if (updated !== source) {
      await writeFile(path, updated, 'utf8')
      touched += 1
    }
  }

  return touched
}

/* ---------------------------------------------------------------------------
   Main
   ------------------------------------------------------------------------ */

async function main() {
  const urls = await collectUrls()
  const map = new Map(urls.map((url) => [url, toLocalPath(url)]))
  console.log(`${urls.length} imagens referenciadas.\n`)

  if (DRY_RUN) {
    let total = 0
    const byFolder = {}
    let failures = 0

    await pool(urls, CONCURRENCY, async (url) => {
      try {
        const response = await fetch(url, { method: 'HEAD' })
        if (!response.ok) throw new Error(`HTTP ${response.status}`)
        const size = Number(response.headers.get('content-length') ?? 0)
        total += size
        const folder = map.get(url).split('/').slice(0, 3).join('/')
        byFolder[folder] = (byFolder[folder] ?? 0) + size
      } catch {
        failures += 1
      }
    })

    console.log(`Na origem: ${human(total)} em ${urls.length} arquivos`)
    for (const [folder, size] of Object.entries(byFolder).sort((a, b) => b[1] - a[1])) {
      console.log(`  ${folder.padEnd(24)} ${human(size)}`)
    }
    if (failures) console.log(`\n${failures} URL(s) nao responderam ao HEAD.`)
    return
  }

  let downloaded = 0
  let skipped = 0
  let before = 0
  let after = 0
  const failures = []

  await pool(urls, CONCURRENCY, async (url) => {
    const destination = join(ROOT, 'public', map.get(url).replace(/^\//, ''))

    if (existsSync(destination)) {
      skipped += 1
      after += (await stat(destination)).size
      return
    }

    try {
      const original = await download(url)
      const optimized = await optimize(original, url)
      await mkdir(dirname(destination), { recursive: true })
      await writeFile(destination, optimized)
      downloaded += 1
      before += original.length
      after += optimized.length
      if (downloaded % 40 === 0) console.log(`  ${downloaded}/${urls.length}…`)
    } catch (error) {
      failures.push(`${url} — ${error.message}`)
    }
  })

  console.log(`\nBaixadas: ${downloaded} | ja existiam: ${skipped}`)
  if (before > 0) {
    console.log(`Origem:   ${human(before)}`)
    console.log(`No repo:  ${human(after)}  (${Math.round((1 - after / before) * 100)}% menor)`)
  }

  if (failures.length) {
    console.log(`\n${failures.length} falha(s):`)
    for (const failure of failures.slice(0, 15)) console.log(`  ${failure}`)
  }

  // So reescreve o que existe em disco, para nao apontar para arquivo ausente.
  const available = new Map(
    [...map].filter(([, local]) => existsSync(join(ROOT, 'public', local.replace(/^\//, '')))),
  )
  const touched = await rewriteReferences(available)
  console.log(`\n${touched} arquivo(s) com caminhos reescritos para local.`)
  const remote = map.size - available.size
  if (remote > 0) console.log(`${remote} referencia(s) seguem remotas (download falhou).`)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
