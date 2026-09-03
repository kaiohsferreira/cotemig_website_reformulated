import { Link } from 'react-router-dom'
import { asset } from '~/lib/asset'
import { cn } from '~/lib/cn'
import { externalLinks, primaryNav, serviceNav, site, socialProfiles } from '~/data/site'
import { institutions } from '~/data/institutions'
import { coursesByInstitution } from '~/data/courses'
import { Icon } from '~/components/ui/Icon'
import { Button } from '~/components/ui/Button'
import { useEscapeKey, useLockBodyScroll } from '~/hooks/useDismissable'

const LOGO = asset('/img/logo-white.svg')

export interface MobileDrawerProps {
  open: boolean
  onClose: () => void
}

export function MobileDrawer({ open, onClose }: MobileDrawerProps) {
  useLockBodyScroll(open)
  useEscapeKey(open, onClose)

  return (
    <div
      className={cn(
        'fixed inset-0 z-60 lg:hidden',
        open ? 'pointer-events-auto' : 'pointer-events-none',
      )}
      aria-hidden={!open}
    >
      <button
        type="button"
        tabIndex={open ? 0 : -1}
        onClick={onClose}
        aria-label="Fechar menu"
        className={cn(
          'absolute inset-0 bg-ink-950/70 transition-opacity duration-300',
          open ? 'opacity-100' : 'opacity-0',
        )}
      />

      <div
        role="dialog"
        aria-modal={open || undefined}
        aria-label="Menu de navegação"
        className={cn(
          'absolute inset-y-0 right-0 flex w-full max-w-sm flex-col surface-ink shadow-overlay',
          'transition-transform duration-300 ease-[var(--ease-out-soft)]',
          open ? 'translate-x-0' : 'translate-x-full',
        )}
      >
        <div className="flex h-18 shrink-0 items-center justify-between border-b border-white/10 px-5">
          <img src={LOGO} alt={site.name} className="h-8 w-auto" />
          <button
            type="button"
            tabIndex={open ? 0 : -1}
            onClick={onClose}
            className="rounded-md p-2.5 text-white transition-colors hover:bg-white/10"
            aria-label="Fechar menu"
          >
            <Icon name="close" size={22} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto overscroll-contain px-5 py-6">
          {/* Cursos primeiro: e a razao pela qual quase todo mundo abre o menu. */}
          {institutions.map((institution) => (
            <section key={institution.slug} className="mb-8">
              <Link
                to={`/ensino/${institution.slug}`}
                onClick={onClose}
                tabIndex={open ? 0 : -1}
                className="flex items-center justify-between gap-3 rounded-sm font-display text-lg font-bold text-white"
              >
                {institution.name}
                <Icon
                  name="arrow-right"
                  size={18}
                  className={institution.accent === 'faculty' ? 'text-faculty-300' : 'text-brand-300'}
                />
              </Link>

              <ul className="mt-3 flex flex-col gap-1 border-l-2 border-white/10 pl-4">
                {coursesByInstitution(institution.slug).map((course) => (
                  <li key={course.slug}>
                    <Link
                      to={`/ensino/${institution.slug}/curso/${course.slug}`}
                      onClick={onClose}
                      tabIndex={open ? 0 : -1}
                      className="block rounded-sm py-2 text-ink-200 transition-colors hover:text-white"
                    >
                      {course.name}
                      <span className="block text-xs text-ink-400">{course.degree}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}

          <nav aria-label="Principal" className="border-t border-white/10 pt-6">
            <ul className="flex flex-col">
              {primaryNav.slice(1).map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.to ?? '/'}
                    onClick={onClose}
                    tabIndex={open ? 0 : -1}
                    className="flex items-center justify-between rounded-sm py-3 font-display font-semibold text-white"
                  >
                    {item.label}
                    <Icon name="chevron-right" size={16} className="text-ink-500" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Serviços" className="mt-6 border-t border-white/10 pt-6">
            <ul className="flex flex-col">
              {serviceNav.map((item) => (
                <li key={item.label}>
                  {item.to ? (
                    <Link
                      to={item.to}
                      onClick={onClose}
                      tabIndex={open ? 0 : -1}
                      className="block rounded-sm py-2.5 text-sm text-ink-300"
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      tabIndex={open ? 0 : -1}
                      className="flex items-center gap-1.5 rounded-sm py-2.5 text-sm text-ink-300"
                    >
                      {item.label}
                      <Icon name="arrow-up-right" size={13} />
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-8 flex flex-wrap gap-3">
            {[...socialProfiles.colegio, ...socialProfiles.faculdade].map((profile) => (
              <a
                key={`${profile.network}-${profile.handle}`}
                href={profile.href}
                target="_blank"
                rel="noopener noreferrer"
                tabIndex={open ? 0 : -1}
                aria-label={`${profile.label} ${profile.handle}`}
                className="rounded-sm border border-white/15 p-2.5 text-ink-300 transition-colors hover:border-white/40 hover:text-white"
              >
                <Icon name={profile.network} size={18} />
              </a>
            ))}
          </div>
        </div>

        <div className="shrink-0 space-y-3 border-t border-white/10 p-5">
          <Button href={externalLinks.admission} block tabIndex={open ? 0 : -1}>
            Matricule-se
          </Button>
          <a
            href={site.phone.href}
            tabIndex={open ? 0 : -1}
            className="flex items-center justify-center gap-2 rounded-sm py-2 font-display text-sm font-semibold text-ink-200"
          >
            <Icon name="phone" size={16} />
            {site.phone.label}
          </a>
        </div>
      </div>
    </div>
  )
}
