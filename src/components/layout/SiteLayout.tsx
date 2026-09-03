import { useEffect } from 'react'
import { Outlet, ScrollRestoration, useLocation } from 'react-router-dom'
import { site } from '~/data/site'
import { Icon } from '~/components/ui/Icon'
import { Header } from './Header'
import { Footer } from './Footer'
import { CookieBanner } from './CookieBanner'

/**
 * Move o foco para o inicio do conteudo a cada troca de rota.
 *
 * Sem isso, quem navega por teclado ou leitor de tela continua com o foco no
 * link clicado do menu enquanto a pagina inteira ja mudou.
 */
function useFocusMainOnNavigate() {
  const { pathname } = useLocation()

  useEffect(() => {
    const main = document.getElementById('conteudo')
    if (main) main.focus({ preventScroll: true })
  }, [pathname])
}

function WhatsAppButton() {
  return (
    <a
      href={site.whatsapp.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={site.whatsapp.label}
      className="fixed right-4 bottom-4 z-50 flex size-14 items-center justify-center rounded-md bg-brand-500 text-white shadow-lift transition-[background-color,transform] duration-200 hover:bg-brand-600 hover:-translate-y-0.5 md:right-6 md:bottom-6"
    >
      <Icon name="whatsapp" size={28} />
    </a>
  )
}

export function SiteLayout() {
  useFocusMainOnNavigate()

  return (
    <>
      <a
        href="#conteudo"
        className="sr-only rounded-md bg-white px-5 py-3 font-display font-semibold text-ink-900 focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-80 focus:shadow-overlay"
      >
        Pular para o conteúdo
      </a>

      <Header />

      {/* pt-18/pt-20 compensa a altura do header fixo.
          ds-ok:foco-removido — o <main> so recebe foco por programa, na troca
          de rota, para reposicionar o leitor de tela. Contornar a pagina
          inteira de verde nao ajuda ninguem e assusta quem usa o mouse. */}
      <main id="conteudo" tabIndex={-1} className="pt-18 focus:outline-none lg:pt-20">
        <Outlet />
      </main>

      <Footer />
      <WhatsAppButton />
      <CookieBanner />
      <ScrollRestoration />
    </>
  )
}
