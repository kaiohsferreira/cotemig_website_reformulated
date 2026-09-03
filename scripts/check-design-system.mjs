/**
 * Verifica que o codigo respeita o design system.
 *
 *   node scripts/check-design-system.mjs
 *
 * O site antigo tinha 14 valores de border-radius e 14 media queries com
 * unidades misturadas porque nada impedia. Este script impede: sai com codigo
 * 1 quando encontra violacao, entao serve de gate em CI.
 */

import { readdir, readFile } from 'node:fs/promises'
import { join, relative, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = resolve(fileURLToPath(import.meta.url), '../..')
const SRC = join(ROOT, 'src')

/** Arquivos que definem o proprio sistema — nao se auto-violam. */
const EXEMPT = ['src/styles/globals.css']

const RULES = [
  {
    id: 'cor-crua',
    // Ignora #hex dentro de comentario de bloco (a documentacao cita os valores).
    pattern: /#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})\b/g,
    message: 'cor em hexadecimal. Use um token: brand-*, faculty-*, ink-*, danger-*.',
  },
  {
    id: 'cor-funcao',
    pattern: /\b(?:rgb|rgba|hsl|hsla)\(/g,
    message: 'cor em funcao de cor. Use um token do design system.',
  },
  {
    id: 'paleta-tailwind',
    pattern:
      /\b(?:bg|text|border|ring|from|via|to|fill|stroke|decoration|outline|shadow|divide|accent|caret|placeholder)-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-\d{2,3}\b/g,
    message: 'paleta embutida do Tailwind. Use brand-*, faculty-*, ink-*, danger-*, success-*.',
  },
  {
    id: 'raio-fora-da-escala',
    pattern: /\brounded(?:-[trbl]{1,2})?-(?:xs|xl|2xl|3xl|4xl|none|\[)/g,
    message: 'raio fora da escala. So rounded-sm | rounded-md | rounded-lg | rounded-full.',
  },
  {
    id: 'sombra-fora-da-escala',
    pattern: /\bshadow-(?:2xs|xs|sm|md|lg|xl|2xl|inner|\[)/g,
    message: 'sombra fora da escala. So shadow-card | shadow-lift | shadow-overlay.',
  },
  {
    id: 'breakpoint-inexistente',
    pattern: /\b2xl:/g,
    message: 'breakpoint 2xl nao existe neste projeto. So sm: md: lg: xl:.',
  },
  {
    id: 'verde-fraco-em-texto',
    pattern: /\btext-brand-(?:400|500)\b/g,
    message:
      'brand-400/500 em texto reprova em contraste sobre fundo claro. ' +
      'Use text-brand-700 sobre claro, text-brand-300 sobre escuro.',
  },
  {
    id: 'foco-removido',
    pattern: /\boutline-none\b|outline:\s*none/g,
    message: 'foco removido. O :focus-visible global e requisito de acessibilidade.',
  },
  {
    id: 'imagem-sem-proporcao',
    // <img> sem aspect-* nem size/h- explicito costuma esmagar no mobile.
    pattern: /<img(?![^>]*\b(?:aspect-|h-|size-|object-cover)\b)[^>]*className=[^>]*>/g,
    message: 'imagem sem proporcao ou altura travada. Foto esmagada no mobile e o defeito nº 1 do site antigo.',
  },
]

/** Remove comentarios para nao acusar exemplo citado em documentacao. */
function stripComments(source) {
  return source
    .replace(/\/\*[\s\S]*?\*\//g, (match) => match.replace(/[^\n]/g, ' '))
    .replace(/(^|[^:])\/\/[^\n]*/g, (match) => match.replace(/[^\n]/g, ' '))
}

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name)
    if (entry.isDirectory()) {
      yield* walk(path)
    } else if (/\.(tsx?|css)$/.test(entry.name)) {
      yield path
    }
  }
}

async function main() {
  const violations = []
  let scanned = 0

  for await (const path of walk(SRC)) {
    const rel = relative(ROOT, path).replace(/\\/g, '/')
    if (EXEMPT.includes(rel)) continue

    scanned += 1
    const raw = await readFile(path, 'utf8')
    const rawLines = raw.split('\n')
    const lines = stripComments(raw).split('\n')

    // Excecao deliberada: `ds-ok:<regra>` num comentario na linha ou ate tres
    // linhas acima. Exige justificativa escrita ao lado, no proprio comentario.
    const allowed = (index, ruleId) =>
      rawLines
        .slice(Math.max(0, index - 3), index + 1)
        .some((line) => line.includes(`ds-ok:${ruleId}`))

    for (const rule of RULES) {
      lines.forEach((line, index) => {
        const matches = line.match(rule.pattern)
        if (!matches) return
        if (allowed(index, rule.id)) return
        for (const match of new Set(matches)) {
          violations.push({
            file: rel,
            line: index + 1,
            rule: rule.id,
            match: match.length > 60 ? `${match.slice(0, 57)}…` : match,
            message: rule.message,
          })
        }
      })
    }
  }

  if (violations.length === 0) {
    console.log(`Design system OK — ${scanned} arquivos verificados, nenhuma violacao.`)
    return
  }

  const byRule = new Map()
  for (const violation of violations) {
    if (!byRule.has(violation.rule)) byRule.set(violation.rule, [])
    byRule.get(violation.rule).push(violation)
  }

  console.log(`${violations.length} violacao(oes) em ${scanned} arquivos:\n`)
  for (const [rule, items] of byRule) {
    console.log(`  ${rule} — ${items[0].message}`)
    for (const item of items) {
      console.log(`    ${item.file}:${item.line}  ${item.match}`)
    }
    console.log('')
  }

  process.exitCode = 1
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
