import { Link } from 'react-router-dom'
import { institutions } from '~/data/institutions'
import { coursesByInstitution } from '~/data/courses'
import { cn } from '~/lib/cn'
import { Icon } from '~/components/ui/Icon'

export interface MegaMenuProps {
  onNavigate: () => void
}

/**
 * Painel de cursos do header.
 *
 * O site atual escondia os cursos num submenu que carregava por JS e piscava
 * "Carregando…". Aqui a lista e estatica e mostra as duas instituicoes lado a
 * lado, que e a primeira decisao que o visitante precisa tomar.
 */
export function MegaMenu({ onNavigate }: MegaMenuProps) {
  return (
    <div className="grid gap-8 p-8 md:grid-cols-2 md:gap-10">
      {institutions.map((institution) => {
        const courses = coursesByInstitution(institution.slug)
        const isFaculty = institution.accent === 'faculty'

        return (
          <div key={institution.slug}>
            <Link
              to={`/ensino/${institution.slug}`}
              onClick={onNavigate}
              className={cn(
                'group flex items-center justify-between gap-3 rounded-sm pb-4',
                'font-display text-lg font-bold text-white',
              )}
            >
              {institution.name}
              <span
                className={cn(
                  'transition-transform duration-200 group-hover:translate-x-1',
                  isFaculty ? 'text-faculty-300' : 'text-brand-300',
                )}
              >
                <Icon name="arrow-right" size={20} />
              </span>
            </Link>

            <p className="mb-5 border-t border-white/10 pt-4 text-sm text-ink-400">
              {institution.tagline}
            </p>

            <ul className="flex flex-col gap-2">
              {courses.map((course) => (
                <li key={course.slug}>
                  <Link
                    to={`/ensino/${institution.slug}/curso/${course.slug}`}
                    onClick={onNavigate}
                    className="group flex items-center gap-4 rounded-md p-2 transition-colors duration-200 hover:bg-white/10"
                  >
                    <img
                      src={course.cardImage}
                      alt=""
                      loading="lazy"
                      className="size-14 shrink-0 rounded-sm object-cover"
                    />
                    <span className="min-w-0">
                      <span className="block font-display text-sm font-semibold text-white">
                        {course.name}
                      </span>
                      <span
                        className={cn(
                          'block text-xs',
                          isFaculty ? 'text-faculty-300' : 'text-brand-300',
                        )}
                      >
                        {course.degree}
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )
      })}
    </div>
  )
}
