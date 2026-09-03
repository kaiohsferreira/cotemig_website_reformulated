const MONTHS = [
  'janeiro',
  'fevereiro',
  'março',
  'abril',
  'maio',
  'junho',
  'julho',
  'agosto',
  'setembro',
  'outubro',
  'novembro',
  'dezembro',
]

/**
 * "2026-08-26" -> "26 de agosto de 2026".
 *
 * Monta a data a partir das partes da string em vez de `new Date(iso)`, que
 * interpreta a data como UTC e, em fuso negativo como o de Brasilia, devolve
 * o dia anterior.
 */
export function formatLongDate(iso: string): string {
  const [year, month, day] = iso.split('-').map(Number)
  if (!year || !month || !day) return iso
  return `${day} de ${MONTHS[month - 1]} de ${year}`
}

/** "2026-08-26" -> "26/08/2026". */
export function formatShortDate(iso: string): string {
  const [year, month, day] = iso.split('-')
  if (!year || !month || !day) return iso
  return `${day}/${month}/${year}`
}

/** Extrai o ano de uma data ISO. */
export function yearOf(iso: string): string {
  return iso.slice(0, 4)
}
