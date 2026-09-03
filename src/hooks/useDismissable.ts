import { useEffect } from 'react'

/**
 * Prende o scroll do documento enquanto um overlay estiver aberto e devolve o
 * scroll ao fechar. Compensa a largura da barra de rolagem para o conteudo
 * atras nao "pular" no desktop.
 */
export function useLockBodyScroll(active: boolean): void {
  useEffect(() => {
    if (!active) return

    const { body, documentElement } = document
    const previousOverflow = body.style.overflow
    const previousPadding = body.style.paddingRight
    const scrollbar = window.innerWidth - documentElement.clientWidth

    body.style.overflow = 'hidden'
    if (scrollbar > 0) body.style.paddingRight = `${scrollbar}px`

    return () => {
      body.style.overflow = previousOverflow
      body.style.paddingRight = previousPadding
    }
  }, [active])
}

/** Chama `onEscape` quando o usuario pressiona Esc, se `active`. */
export function useEscapeKey(active: boolean, onEscape: () => void): void {
  useEffect(() => {
    if (!active) return

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') onEscape()
    }

    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [active, onEscape])
}
