/**
 * Placeholder exibido enquanto o chunk de uma rota chega.
 *
 * As paginas sao carregadas sob demanda, entao existe uma janela curta antes de
 * a primeira delas pintar. Um bloco neutro com a altura de um hero evita que o
 * rodape suba e desca na tela nesse intervalo.
 */
export function RouteFallback() {
  return (
    <div className="surface-ink" role="status" aria-live="polite">
      <div className="container-shell flex min-h-[60vh] items-center py-20">
        <span className="sr-only">Carregando a página…</span>
        <div aria-hidden="true" className="w-full max-w-3xl">
          <span className="block h-4 w-40 animate-pulse rounded-sm bg-white/10" />
          <span className="mt-6 block h-12 w-full animate-pulse rounded-sm bg-white/10" />
          <span className="mt-3 block h-12 w-3/4 animate-pulse rounded-sm bg-white/10" />
          <span className="mt-8 block h-12 w-52 animate-pulse rounded-md bg-white/10" />
        </div>
      </div>
    </div>
  )
}
