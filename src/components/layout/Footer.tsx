import { Link } from 'react-router-dom'
import { asset } from '~/lib/asset'
import { externalLinks, footerNav, site, socialProfiles } from '~/data/site'
import { Icon } from '~/components/ui/Icon'
import { Button } from '~/components/ui/Button'

const LOGO = asset('/img/logo-white.svg')

export function Footer() {
  // O rodape do site atual estava congelado em "© 2023".
  const year = new Date().getFullYear()

  return (
    <footer className="surface-ink text-ink-300">
      {/* Chamada final */}
      <div className="border-b border-white/10">
        <div className="container-shell flex flex-col items-start gap-8 py-16 lg:flex-row lg:items-center lg:justify-between lg:py-20">
          <div className="max-w-2xl">
            <h2 className="text-display-sm text-white">O começo de um caminho brilhante</h2>
            <p className="mt-4 text-lg text-ink-300">
              O COTEMIG é um lugar onde o presente tem cara de futuro. Preparamos nossos alunos não
              só para o mercado de trabalho, mas para a vida.
            </p>
          </div>
          <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
            <Button href={externalLinks.admission} size="lg">
              Matricule-se
            </Button>
            <Button to="/contato" variant="onDark" size="lg">
              Falar com a equipe
            </Button>
          </div>
        </div>
      </div>

      {/* Colunas de navegacao */}
      <div className="container-shell grid gap-10 py-16 sm:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-1">
          <img src={LOGO} alt={site.name} className="h-10 w-auto" />
          <p className="mt-5 text-sm">{site.description}</p>

          <a
            href={site.phone.href}
            className="mt-5 -ml-1 inline-flex min-h-11 items-center gap-2 rounded-sm px-1 font-display text-lg font-bold text-white transition-colors hover:text-brand-300"
          >
            <Icon name="phone" size={18} />
            {site.phone.label}
          </a>
          <p className="mt-1 text-sm text-ink-400">{site.serviceHours}</p>
        </div>

        {footerNav.map((column) => (
          <nav key={column.title} aria-label={column.title}>
            <h3 className="font-display text-sm font-bold tracking-wide text-white uppercase">
              {column.title}
            </h3>
            <ul className="mt-5 flex flex-col gap-3">
              {column.links.map((link) => (
                <li key={link.label}>
                  {link.to ? (
                    <Link
                      to={link.to}
                      className="rounded-sm text-sm transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-sm text-sm transition-colors hover:text-white"
                    >
                      {link.label}
                      <Icon name="arrow-up-right" size={13} />
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      {/* Redes sociais, separadas por instituicao como no site atual */}
      <div className="border-t border-white/10">
        <div className="container-shell flex flex-col gap-8 py-10 sm:flex-row sm:gap-16">
          {(
            [
              ['Colégio COTEMIG', socialProfiles.colegio],
              ['Faculdade COTEMIG', socialProfiles.faculdade],
            ] as const
          ).map(([label, profiles]) => (
            <div key={label}>
              <h3 className="font-display text-sm font-bold text-white">{label}</h3>
              <ul className="mt-3 flex gap-2">
                {profiles.map((profile) => (
                  <li key={profile.href}>
                    <a
                      href={profile.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${label} no ${profile.label} (${profile.handle})`}
                      className="flex size-10 items-center justify-center rounded-sm border border-white/15 transition-colors hover:border-white/40 hover:text-white"
                    >
                      <Icon name={profile.network} size={18} />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Rodape legal */}
      <div className="border-t border-white/10">
        <div className="container-shell flex flex-col gap-3 py-6 text-xs text-ink-400 md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {site.legalName} — Todos os direitos reservados. CNPJ: {site.cnpj}
          </p>
          <Link
            to="/aviso-protecao-dados"
            className="-mx-1 inline-flex min-h-11 items-center rounded-sm px-1 hover:text-white md:min-h-0"
          >
            Aviso de Proteção de Dados
          </Link>
        </div>
      </div>
    </footer>
  )
}
