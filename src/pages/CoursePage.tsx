import { useParams } from 'react-router-dom'
import { cn } from '~/lib/cn'
import { coursesByInstitution, findCourse } from '~/data/courses'
import { findInstitution } from '~/data/institutions'
import { latestPosts } from '~/data/posts'
import { Seo } from '~/components/Seo'
import { PageHero } from '~/components/blocks/PageHero'
import { FeatureGrid } from '~/components/blocks/FeatureGrid'
import { CourseCard } from '~/components/blocks/Cards'
import { Paragraphs } from '~/components/blocks/Prose'
import { EnrollmentForm } from '~/components/blocks/EnrollmentForm'
import { RelatedPosts } from '~/components/blocks/RelatedPosts'
import { CtaBand } from '~/components/blocks/CtaBand'
import { Section, SectionHeader } from '~/components/ui/Section'
import { Accordion } from '~/components/ui/Accordion'
import { Button } from '~/components/ui/Button'
import { Icon } from '~/components/ui/Icon'
import { NotFoundPage } from './NotFoundPage'

/**
 * Pagina de um curso.
 *
 * Reune num lugar so o que o site atual espalhava entre banner, cards soltos e
 * um PDF escondido no rodape: os quatro fatos do topo, a descricao, as areas de
 * atuacao, os diferenciais, o conteudo programatico e a matriz curricular.
 */
export function CoursePage() {
  const { institutionSlug, courseSlug } = useParams()
  const course = findCourse(institutionSlug ?? '', courseSlug ?? '')
  const institution = course ? findInstitution(course.institution) : undefined

  if (!course || !institution) return <NotFoundPage />

  const accent = institution.accent
  // "o Colegio" / "a Faculdade": a concordancia muda com a instituicao.
  const theInstitution = institution.slug === 'colegio-cotemig' ? 'o Colégio' : 'a Faculdade'
  // Quando o curso nao declara diferenciais proprios, herda os da instituicao.
  const highlights = course.highlights.length > 0 ? course.highlights : institution.highlights
  const siblings = coursesByInstitution(institution.slug).filter(
    (item) => item.slug !== course.slug,
  )
  const hasCurriculum = course.curriculumGroups.length > 0 || course.curriculumPdf !== null

  return (
    <>
      <Seo
        title={`${course.name} — ${institution.name}`}
        description={course.summary}
        path={`/ensino/${institution.slug}/curso/${course.slug}`}
        image={course.heroImage}
      />

      <PageHero
        breadcrumb={[
          { label: 'Início', to: '/' },
          { label: institution.shortName, to: `/ensino/${institution.slug}` },
          { label: course.name },
        ]}
        eyebrow={course.degree}
        title={course.name}
        description={course.summary}
        image={course.heroImage}
        accent={accent}
        actions={
          <>
            <Button href="#matricula" size="lg">
              {course.callToAction.label}
            </Button>
            <Button
              to={`/ensino/${institution.slug}`}
              size="lg"
              variant="onDark"
              trailingIcon={<Icon name="arrow-right" size={18} />}
            >
              {`Conhecer ${theInstitution}`}
            </Button>
          </>
        }
      />

      {/* Faixa de fatos: onde, duracao, turno e pre-requisito, logo abaixo do
          hero — sao as quatro perguntas que o visitante faz primeiro. */}
      <Section tone="muted" spacing="sm" ariaLabel="Informações do curso">
        <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {course.facts.map((fact) => (
            <li key={fact.label} className="flex items-start gap-4">
              <span
                className={cn(
                  'flex size-11 shrink-0 items-center justify-center rounded-md',
                  accent === 'faculty'
                    ? 'bg-faculty-50 text-faculty-700'
                    : 'bg-brand-50 text-brand-700',
                )}
              >
                <Icon name={fact.icon} size={22} />
              </span>
              <span>
                <span className="block text-eyebrow uppercase text-ink-500">{fact.label}</span>
                <span className="mt-1 block font-display font-bold text-ink-900">
                  {fact.value}
                </span>
              </span>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="white">
        <SectionHeader eyebrow="Apresentação" title="Sobre o curso" align="start" />
        <Paragraphs items={course.description} narrow />
      </Section>

      {course.careers.length > 0 ? (
        <Section tone="muted">
          <SectionHeader
            eyebrow="Carreira"
            title="Áreas de atuação"
            description="Onde quem se forma neste curso pode trabalhar."
            align="start"
          />

          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {course.careers.map((career) => (
              <li
                key={career}
                className="flex items-start gap-3 rounded-md border border-ink-200 bg-white p-5 shadow-card"
              >
                <span
                  className={cn(
                    'mt-0.5 shrink-0',
                    accent === 'faculty' ? 'text-faculty-700' : 'text-brand-700',
                  )}
                >
                  <Icon name="check" size={18} />
                </span>
                <span className="font-display font-semibold text-ink-800">{career}</span>
              </li>
            ))}
          </ul>
        </Section>
      ) : null}

      {highlights.length > 0 ? (
        <Section tone="ink">
          <SectionHeader
            eyebrow="Diferenciais"
            title="Por que estudar aqui"
            align="start"
            onDark
          />
          <FeatureGrid features={highlights} columns={3} accent={accent} onDark />
        </Section>
      ) : null}

      {hasCurriculum ? (
        <Section tone="white" id="matriz">
          <SectionHeader
            eyebrow="Conteúdo programático"
            title="O que você vai estudar"
            description={
              course.curriculumGroups.length > 0
                ? 'A relação completa de conteúdos do curso, agrupada por eixo de formação.'
                : 'A matriz curricular completa do curso, para baixar em PDF.'
            }
            align="start"
          />

          {course.curriculumGroups.length > 0 ? (
            <Accordion
              defaultOpen={0}
              allowMultiple
              items={course.curriculumGroups.map((group) => ({
                title: group.title,
                content: (
                  <ul className="grid gap-x-8 gap-y-2 sm:grid-cols-2 lg:grid-cols-3">
                    {group.items.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span
                          className={cn(
                            'mt-1 shrink-0',
                            accent === 'faculty' ? 'text-faculty-700' : 'text-brand-700',
                          )}
                        >
                          <Icon name="check" size={16} />
                        </span>
                        {/* O texto e um item de flex proprio: sem isso um nome
                            longo nao consegue encolher e vaza da coluna. */}
                        <span className="min-w-0">{item}</span>
                      </li>
                    ))}
                  </ul>
                ),
              }))}
            />
          ) : null}

          {course.curriculumPdf ? (
            <div className={cn(course.curriculumGroups.length > 0 && 'mt-10')}>
              <Button
                href={course.curriculumPdf}
                variant="secondary"
                size="lg"
                trailingIcon={<Icon name="arrow-up-right" size={20} />}
              >
                Baixar a matriz curricular (PDF)
              </Button>
            </div>
          ) : null}
        </Section>
      ) : null}

      {siblings.length > 0 ? (
        <Section tone="muted">
          <SectionHeader
            eyebrow="Mais opções"
            title="Outros cursos"
            align="start"
            action={
              <Button
                to={`/ensino/${institution.slug}`}
                variant="secondary"
                trailingIcon={<Icon name="arrow-right" size={18} />}
              >
                Ver todos os cursos
              </Button>
            }
          />

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {siblings.map((item) => (
              <CourseCard key={item.slug} course={item} accent={accent} />
            ))}
          </div>
        </Section>
      ) : null}

      <Section tone="white" id="matricula">
        <EnrollmentForm
          institution={institution.slug}
          defaultCourse={course.slug}
          description={`Preencha o formulário e a nossa equipe entra em contato para falar sobre o curso de ${course.name}.`}
        />
      </Section>

      <RelatedPosts posts={latestPosts(4)} tone="muted" />

      <CtaBand cta={course.callToAction} tone="ink" />
    </>
  )
}
