import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '~/components/ui/Button'

const STORAGE_KEY = 'cotemig:consentimento-cookies'

type Consent = 'aceito' | 'recusado'

function readConsent(): Consent | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored === 'aceito' || stored === 'recusado' ? stored : null
  } catch {
    // Navegador em modo privado ou com armazenamento bloqueado.
    return null
  }
}

function writeConsent(consent: Consent): void {
  try {
    localStorage.setItem(STORAGE_KEY, consent)
  } catch {
    // Sem armazenamento o banner reaparece na proxima visita. Aceitavel.
  }
}

/**
 * Aviso de cookies.
 *
 * O banner do site atual tinha um botao so — "Prosseguir" — e o texto dizia
 * que continuar navegando ja significava concordancia. Aqui existe recusa de
 * verdade, que e o que a LGPD espera para dados nao essenciais.
 */
export function CookieBanner() {
  // Inicializacao preguicosa em vez de efeito: le o consentimento uma vez, na
  // montagem. Alem de nao disparar render em cascata, evita o banner piscar na
  // tela de quem ja decidiu.
  const [visible, setVisible] = useState(() => readConsent() === null)

  function decide(consent: Consent) {
    writeConsent(consent)
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      role="region"
      aria-label="Aviso de cookies"
      className="fixed inset-x-0 bottom-0 z-70 p-4 md:p-6"
    >
      <div className="container-shell flex flex-col gap-5 rounded-lg bg-ink-950 p-6 shadow-overlay md:flex-row md:items-center md:gap-8 md:p-7">
        <p className="flex-1 text-sm text-ink-300">
          Usamos cookies para melhorar sua experiência no site. Você pode aceitar todos ou seguir
          apenas com os cookies essenciais ao funcionamento. Saiba mais no{' '}
          <Link to="/aviso-protecao-dados" className="rounded-sm text-brand-300 underline">
            Aviso de Proteção de Dados
          </Link>
          .
        </p>

        <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
          <Button variant="onDark" size="sm" onClick={() => decide('recusado')}>
            Só os essenciais
          </Button>
          <Button size="sm" onClick={() => decide('aceito')}>
            Aceitar todos
          </Button>
        </div>
      </div>
    </div>
  )
}
