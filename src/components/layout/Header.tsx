import { useEffect, useRef, useState } from 'react'
import { Link, NavLink as RouterNavLink, useLocation } from 'react-router-dom'
import { asset } from '~/lib/asset'
import { cn } from '~/lib/cn'
import { externalLinks, primaryNav, serviceNav, site } from '~/data/site'
import { Icon } from '~/components/ui/Icon'
import { Button } from '~/components/ui/Button'
import { MegaMenu } from './MegaMenu'
import { MobileDrawer } from './MobileDrawer'
import { SearchOverlay } from './SearchOverlay'

const LOGO = asset('/img/logo-white.svg')

export function Header() {
  const location = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [coursesOpen, setCoursesOpen] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  // O ref vai no <li> que envolve o gatilho e o painel do mega-menu.
  const coursesRef = useRef<HTMLLIElement>(null)

  // Fecha tudo ao trocar de rota.
  //
  // Ajuste durante o render, e nao num efeito: o React aplica antes de pintar,
  // sem o render em cascata que um setState dentro de useEffect provoca.
  // E o padrao oficial de "resetar estado quando uma prop muda".
  const [lastPath, setLastPath] = useState(location.pathname)
  if (lastPath !== location.pathname) {
    setLastPath(location.pathname)
    setCoursesOpen(false)
    setDrawerOpen(false)
    setSearchOpen(false)
  }

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 24)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Esc fecha o mega-menu; clique fora tambem.
  useEffect(() => {
    if (!coursesOpen) return

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setCoursesOpen(false)
    }
    function onPointerDown(event: PointerEvent) {
      if (!coursesRef.current?.contains(event.target as Node)) setCoursesOpen(false)
    }

    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('pointerdown', onPointerDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('pointerdown', onPointerDown)
    }
  }, [coursesOpen])

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow] duration-300',
          scrolled || coursesOpen ? 'bg-ink-950/95 shadow-lift backdrop-blur-md' : 'bg-ink-950',
        )}
      >
        {/* Barra de servico. Some ao rolar para devolver altura ao conteudo. */}
        <div
          className={cn(
            'hidden overflow-hidden border-b border-white/10 transition-[height,opacity] duration-300 lg:block',
            scrolled ? 'h-0 opacity-0' : 'h-10 opacity-100',
          )}
        >
          <div className="container-shell flex h-10 items-center justify-between text-sm">
            <div className="flex items-center gap-6">
              <a
                href={site.phone.href}
                className="flex items-center gap-2 rounded-sm text-ink-300 transition-colors hover:text-white"
              >
                <Icon name="phone" size={15} />
                Central de atendimento {site.phone.label}
              </a>
              <a
                href={site.whatsapp.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-sm text-ink-300 transition-colors hover:text-white"
              >
                <Icon name="whatsapp" size={15} />
                WhatsApp
              </a>
            </div>

            <nav aria-label="Serviços">
              <ul className="flex items-center gap-6">
                {serviceNav.slice(1, 4).map((item) => (
                  <li key={item.label}>
                    {item.to ? (
                      <Link
                        to={item.to}
                        className="rounded-sm text-ink-300 transition-colors hover:text-white"
                      >
                        {item.label}
                      </Link>
                    ) : (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-sm text-ink-300 transition-colors hover:text-white"
                      >
                        {item.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        {/* Barra principal */}
        <div className="container-shell flex h-18 items-center justify-between gap-6 lg:h-20">
          <Link to="/" className="shrink-0 rounded-sm" aria-label={`${site.name} — página inicial`}>
            <img src={LOGO} alt={site.name} className="h-9 w-auto lg:h-10" />
          </Link>

          <nav aria-label="Principal" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              <li ref={coursesRef} className="relative">
                <button
                  type="button"
                  onClick={() => setCoursesOpen((open) => !open)}
                  aria-expanded={coursesOpen}
                  aria-controls="mega-menu-cursos"
                  className={cn(
                    'flex items-center gap-1.5 rounded-md px-4 py-2.5 font-display text-sm font-semibold',
                    'transition-colors duration-200',
                    coursesOpen ? 'bg-white/10 text-white' : 'text-ink-200 hover:text-white',
                  )}
                >
                  Cursos
                  <span
                    className={cn(
                      'transition-transform duration-200',
                      coursesOpen && 'rotate-180',
                    )}
                  >
                    <Icon name="chevron-down" size={16} />
                  </span>
                </button>
              </li>

              {primaryNav.slice(1).map((item) => (
                <li key={item.label}>
                  <RouterNavLink
                    to={item.to ?? '/'}
                    className={({ isActive }) =>
                      cn(
                        'block rounded-md px-4 py-2.5 font-display text-sm font-semibold transition-colors duration-200',
                        isActive ? 'text-brand-300' : 'text-ink-200 hover:text-white',
                      )
                    }
                  >
                    {item.label}
                  </RouterNavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="rounded-md p-2.5 text-ink-200 transition-colors hover:bg-white/10 hover:text-white"
              aria-label="Buscar no site"
            >
              <Icon name="search" size={20} />
            </button>

            <a
              href={externalLinks.restrictedArea}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                'hidden items-center gap-2 rounded-md border border-white/20 px-4 py-2.5',
                'font-display text-sm font-semibold text-ink-100 transition-colors',
                'hover:border-white/40 hover:text-white lg:flex',
              )}
            >
              <Icon name="lock" size={16} />
              Área Restrita
            </a>

            <Button href={externalLinks.admission} size="sm" className="hidden sm:inline-flex">
              Matricule-se
            </Button>

            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              className="rounded-md p-2.5 text-white transition-colors hover:bg-white/10 lg:hidden"
              aria-label="Abrir menu"
              aria-expanded={drawerOpen}
            >
              <Icon name="menu" size={24} />
            </button>
          </div>
        </div>

        {/* Mega-menu */}
        <div
          id="mega-menu-cursos"
          hidden={!coursesOpen}
          className="absolute inset-x-0 top-full hidden border-t border-white/10 bg-ink-950/98 shadow-overlay backdrop-blur-md lg:block"
        >
          <div className="container-shell">
            <MegaMenu onNavigate={() => setCoursesOpen(false)} />
          </div>
        </div>
      </header>

      <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
      {searchOpen ? <SearchOverlay onClose={() => setSearchOpen(false)} /> : null}
    </>
  )
}
