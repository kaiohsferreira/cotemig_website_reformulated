/**
 * Decodificador de entidades HTML.
 *
 * O servidor do site atual entrega o conteudo com entidades nomeadas
 * (&uacute;, &ccedil;, &otilde;…). Sem decodificar, o texto em portugues chega
 * quebrado. A tabela de acentos e montada a partir do Latin-1 em vez de
 * escrita a mao, para nao esquecer nenhuma combinacao.
 */

const ACCENTS = {
  grave: { a: 224, e: 232, i: 236, o: 242, u: 249 },
  acute: { a: 225, e: 233, i: 237, o: 243, u: 250, y: 253 },
  circ: { a: 226, e: 234, i: 238, o: 244, u: 251 },
  tilde: { a: 227, n: 241, o: 245 },
  uml: { a: 228, e: 235, i: 239, o: 246, u: 252, y: 255 },
  ring: { a: 229 },
  cedil: { c: 231 },
  slash: { o: 248 },
}

export const ENTITIES = {
  '&nbsp;': ' ',
  '&amp;': '&',
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&apos;': "'",
  '&hellip;': '…',
  '&ndash;': '–',
  '&mdash;': '—',
  '&rsquo;': '’',
  '&lsquo;': '‘',
  '&ldquo;': '“',
  '&rdquo;': '”',
  '&bull;': '•',
  '&middot;': '·',
  '&deg;': '°',
  '&ordf;': 'ª',
  '&ordm;': 'º',
  '&laquo;': '«',
  '&raquo;': '»',
  '&copy;': '©',
  '&reg;': '®',
  '&trade;': '™',
  '&euro;': '€',
  '&pound;': '£',
  '&sect;': '§',
  '&para;': '¶',
  '&times;': '×',
  '&divide;': '÷',
  '&frac12;': '½',
  '&szlig;': 'ß',
  '&ccedil;': 'ç',
  '&scaron;': 'š',
  '&Scaron;': 'Š',
  '&zcaron;': 'ž',
  '&Zcaron;': 'Ž',
  '&oelig;': 'œ',
  '&OElig;': 'Œ',
  '&dagger;': '†',
  '&permil;': '‰',
  '&lsaquo;': '‹',
  '&rsaquo;': '›',
  '&sbquo;': '‚',
  '&bdquo;': '„',
  '&thinsp;': ' ',
  '&ensp;': ' ',
  '&emsp;': ' ',
  '&minus;': '−',
  '&prime;': '′',
  '&iexcl;': '¡',
  '&iquest;': '¿',
}

for (const [accent, letters] of Object.entries(ACCENTS)) {
  for (const [letter, code] of Object.entries(letters)) {
    ENTITIES[`&${letter}${accent};`] = String.fromCharCode(code)
    ENTITIES[`&${letter.toUpperCase()}${accent};`] = String.fromCharCode(code - 32)
  }
}

export function decodeEntities(input) {
  return input
    .replace(/&#x([0-9a-f]+);/gi, (_, hex) => String.fromCodePoint(Number.parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
    // Case-sensitive primeiro: &Aacute; e &aacute; sao letras diferentes.
    .replace(
      /&[a-z][a-z0-9]*;/gi,
      (match) => ENTITIES[match] ?? ENTITIES[match.toLowerCase()] ?? match,
    )
}
