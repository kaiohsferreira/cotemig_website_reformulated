import { Link } from 'react-router-dom'
import { cn } from '~/lib/cn'
import { formatLongDate } from '~/lib/format'
import type { Course, PostSummary, Unit } from '~/data/types'
import { Card, CardMedia } from '~/components/ui/Card'
import { Badge } from '~/components/ui/Badge'
import { Icon } from '~/components/ui/Icon'

/* ---------------------------------------------------------------------------
   Curso
   ------------------------------------------------------------------------ */

export interface CourseCardProps {
  course: Course
  accent?: 'brand' | 'faculty'
}

export function CourseCard({ course, accent = 'brand' }: CourseCardProps) {
  return (
    <Card to={`/ensino/${course.institution}/curso/${course.slug}`} flush>
      <CardMedia src={course.cardImage} alt={course.name} ratio="video" />

      <div className="flex flex-1 flex-col p-6">
        <Badge tone={accent === 'faculty' ? 'faculty' : 'brand'}>{course.degree}</Badge>

        <h3 className="mt-4 font-display text-xl font-bold text-ink-900">{course.name}</h3>
        <p className="mt-3 flex-1 text-ink-600">{course.summary}</p>

        <span
          className={cn(
            'mt-6 inline-flex items-center gap-2 font-display text-sm font-semibold',
            accent === 'faculty' ? 'text-faculty-700' : 'text-brand-700',
          )}
        >
          Conhecer o curso
          <span className="transition-transform duration-200 group-hover:translate-x-1">
            <Icon name="arrow-right" size={16} />
          </span>
        </span>
      </div>
    </Card>
  )
}

/* ---------------------------------------------------------------------------
   Unidade
   ------------------------------------------------------------------------ */

export interface UnitCardProps {
  unit: Unit
}

export function UnitCard({ unit }: UnitCardProps) {
  return (
    <Card to={`/unidades/${unit.slug}`} flush>
      {/* Proporcao travada: e o que impede a foto de esmagar no mobile, como
          acontece no site atual. */}
      <CardMedia src={unit.coverImage} alt={unit.name} ratio="photo" />

      <div className="flex flex-1 flex-col p-6">
        {unit.kind === 'administrativo' ? (
          <Badge tone="neutral" className="mb-3 self-start">
            Administrativo
          </Badge>
        ) : null}

        <h3 className="font-display text-lg font-bold text-ink-900">{unit.name}</h3>

        <address className="mt-3 flex flex-1 items-start gap-2 text-sm not-italic text-ink-600">
          <span className="mt-0.5 shrink-0 text-brand-700">
            <Icon name="pin" size={16} />
          </span>
          <span>
            {unit.address}
            <br />
            {unit.district} · {unit.city}
            <br />
            CEP {unit.cep}
          </span>
        </address>

        <span className="mt-5 inline-flex items-center gap-2 font-display text-sm font-semibold text-brand-700">
          Ver a unidade
          <span className="transition-transform duration-200 group-hover:translate-x-1">
            <Icon name="arrow-right" size={16} />
          </span>
        </span>
      </div>
    </Card>
  )
}

/* ---------------------------------------------------------------------------
   Post
   ------------------------------------------------------------------------ */

export interface PostCardProps {
  post: PostSummary
  /** `featured` ocupa duas colunas com imagem maior. */
  variant?: 'default' | 'featured'
}

export function PostCard({ post, variant = 'default' }: PostCardProps) {
  const featured = variant === 'featured'

  return (
    <Card to={`/blog/${post.slug}`} flush className={featured ? 'lg:col-span-2' : undefined}>
      <CardMedia src={post.image} alt="" ratio={featured ? 'wide' : 'video'} />

      <div className="flex flex-1 flex-col p-6">
        <time
          dateTime={post.publishedAt}
          className="font-display text-xs font-semibold tracking-wide text-brand-700 uppercase"
        >
          {formatLongDate(post.publishedAt)}
        </time>

        {/* O site atual imprime os titulos em caixa alta e eles chegam assim do
            conteudo. `normal-case` devolve a caixa original do texto. */}
        <h3
          className={cn(
            'mt-3 font-display font-bold text-ink-900 normal-case',
            featured ? 'text-2xl' : 'text-lg line-clamp-3',
          )}
        >
          {post.title}
        </h3>

        {featured ? (
          <p className="mt-3 flex-1 line-clamp-3 text-ink-600">{post.excerpt}</p>
        ) : null}

        <span className="mt-5 inline-flex items-center gap-2 font-display text-sm font-semibold text-brand-700">
          Ler
          <span className="transition-transform duration-200 group-hover:translate-x-1">
            <Icon name="arrow-right" size={16} />
          </span>
        </span>
      </div>
    </Card>
  )
}

/* ---------------------------------------------------------------------------
   Instituicao (usado na home)
   ------------------------------------------------------------------------ */

export interface InstitutionCardProps {
  slug: string
  name: string
  tagline: string
  image: string
  accent: 'brand' | 'faculty'
  courses: Course[]
}

export function InstitutionCard({
  slug,
  name,
  tagline,
  image,
  accent,
  courses,
}: InstitutionCardProps) {
  const isFaculty = accent === 'faculty'

  return (
    <article className="group flex flex-col overflow-hidden rounded-lg border border-ink-200 bg-white shadow-card transition-shadow duration-300 hover:shadow-lift">
      <Link to={`/ensino/${slug}`} className="relative block">
        <CardMedia src={image} alt={name} ratio="video" />
        <div
          className={cn(
            'absolute inset-0 bg-gradient-to-t',
            isFaculty ? 'from-faculty-900/90 to-transparent' : 'from-brand-950/90 to-transparent',
          )}
        />
        <h3 className="absolute inset-x-0 bottom-0 p-6 font-display text-2xl font-bold text-white">
          {name}
        </h3>
      </Link>

      <div className="flex flex-1 flex-col p-6">
        <p className="text-ink-600">{tagline}</p>

        <ul className="mt-5 flex flex-1 flex-col gap-1">
          {courses.map((course) => (
            <li key={course.slug}>
              <Link
                to={`/ensino/${slug}/curso/${course.slug}`}
                className={cn(
                  'flex items-center justify-between gap-4 rounded-sm border-b border-ink-100 py-3',
                  'font-display font-semibold text-ink-800 transition-colors',
                  isFaculty ? 'hover:text-faculty-700' : 'hover:text-brand-700',
                )}
              >
                <span>
                  {course.name}
                  <span className="block text-xs font-normal text-ink-500">{course.degree}</span>
                </span>
                <Icon name="chevron-right" size={18} className="shrink-0 text-ink-400" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </article>
  )
}
