import { useParams } from 'react-router-dom'
import { coursesByInstitution } from '~/data/courses'
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
import { Button } from '~/components/ui/Button'
import { Icon } from '~/components/ui/Icon'
import { NotFoundPage } from './NotFoundPage'

/**
 * Pagina de uma instituicao de ensino.
 *
 * As duas instituicoes usam este mesmo componente de proposito: no site atual a
 * pagina do Colegio era so banner + formulario, enquanto a da Faculdade tinha
 * diferenciais, ingresso e financiamento. Com um template unico as duas passam a
 * ter a mesma profundidade — o que muda e o conteudo e o acento de cor.
 */
export function InstitutionPage() {
  const { institutionSlug } = useParams()
  const institution = findInstitution(institutionSlug ?? '')

  if (!institution) return <NotFoundPage />

  const accent = institution.accent
  const courses = coursesByInstitution(institution.slug)
  // A concordancia muda com a instituicao: "do Colegio" / "da Faculdade" no
  // texto do formulario, "o" / "a" no titulo da secao de abertura.
  const isColegio = institution.slug === 'colegio-cotemig'
  const ofInstitution = isColegio ? 'do Colégio' : 'da Faculdade'
  const definiteArticle = isColegio ? 'o' : 'a'

  return (
    <>
      <Seo
        title={institution.name}
        description={`${institution.name}: cursos, diferenciais, formas de ingresso e condições de matrícula. ${institution.tagline}`}
        path={`/ensino/${institution.slug}`}
        image={institution.heroImage}
      />

      <PageHero
        breadcrumb={[{ label: 'Início', to: '/' }, { label: institution.shortName }]}
        eyebrow="Ensino"
        title={institution.name}
        description={institution.tagline}
        image={institution.heroImage}
        accent={accent}
        actions={
          <>
            <Button href={institution.callToAction.href} size="lg">
              {institution.callToAction.label}
            </Button>
            <Button
              href="#matricula"
              size="lg"
              variant="onDark"
              trailingIcon={<Icon name="arrow-right" size={18} />}
            >
              Falar com a equipe
            </Button>
          </>
        }
      />

      <Section tone="white">
        <SectionHeader
          eyebrow="A instituição"
          title={`Sobre ${definiteArticle} ${institution.name}`}
          align="start"
        />
        <Paragraphs items={institution.intro} narrow />
      </Section>

      {courses.length > 0 ? (
        <Section tone="muted" id="cursos">
          <SectionHeader
            eyebrow="O que você vai estudar"
            title="Cursos"
            description="Escolha o curso e veja a duração, os turnos e o conteúdo de cada um."
            align="start"
          />

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {courses.map((course) => (
              <CourseCard key={course.slug} course={course} accent={accent} />
            ))}
          </div>
        </Section>
      ) : null}

      {institution.highlights.length > 0 ? (
        <Section tone="ink">
          <SectionHeader
            eyebrow="Diferenciais"
            title="Por que estudar aqui"
            align="start"
            onDark
          />
          <FeatureGrid features={institution.highlights} columns={3} accent={accent} onDark />
        </Section>
      ) : null}

      {institution.admissionRoutes.length > 0 ? (
        <Section tone="white" id="ingresso">
          <SectionHeader
            eyebrow="Ingresso"
            title="Como entrar"
            description="As portas de entrada para estudar no COTEMIG."
            align="start"
          />
          <FeatureGrid features={institution.admissionRoutes} columns={3} accent={accent} />
        </Section>
      ) : null}

      {institution.funding.length > 0 ? (
        <Section tone="muted" id="investimento">
          <SectionHeader
            eyebrow="Investimento"
            title="Bolsas, convênios e condições"
            description="O que existe para tornar o seu curso possível."
            align="start"
          />
          <FeatureGrid features={institution.funding} columns={3} accent={accent} />
        </Section>
      ) : null}

      <Section tone="white" id="matricula">
        <EnrollmentForm
          institution={institution.slug}
          description={`Preencha o formulário e a nossa equipe entra em contato para falar sobre os cursos ${ofInstitution}.`}
        />
      </Section>

      <RelatedPosts posts={latestPosts(4)} tone="muted" />

      <CtaBand cta={institution.callToAction} tone="ink" />
    </>
  )
}
