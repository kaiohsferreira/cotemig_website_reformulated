/**
 * Valores aceitos numa expressao de classe.
 *
 * Inclui os falsy nao-string porque `cond && 'classe'` com `cond: ReactNode`
 * pode produzir `0` ou `0n` — o TypeScript nao estreita ReactNode para boolean.
 */
export type ClassValue = string | number | bigint | boolean | null | undefined

/**
 * Junta classes condicionalmente.
 *
 * Mantido minimo de proposito — nao precisamos de clsx/tailwind-merge aqui,
 * porque os componentes de UI expoem variantes tipadas em vez de aceitar
 * sobrescrita arbitraria de classe utilitaria.
 *
 * So strings viram classe: qualquer outro valor e descartado, entao
 * `cn(count && 'tem-itens')` nao imprime "0" no atributo class.
 */
export function cn(...parts: ClassValue[]): string {
  return parts.filter((part): part is string => typeof part === 'string' && part !== '').join(' ')
}
