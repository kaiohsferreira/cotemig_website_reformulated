import { Seo } from '~/components/Seo'
import { PageHero } from '~/components/blocks/PageHero'
import { Paragraphs } from '~/components/blocks/Prose'
import { UnitCard } from '~/components/blocks/Cards'
import { EnrollmentForm } from '~/components/blocks/EnrollmentForm'
import { CtaBand } from '~/components/blocks/CtaBand'
import { Section, SectionHeader } from '~/components/ui/Section'
import { Card } from '~/components/ui/Card'
import { Button } from '~/components/ui/Button'
import { Icon } from '~/components/ui/Icon'
import type { BreadcrumbItem } from '~/components/ui/Breadcrumb'
import { about } from '~/data/about'
import { findUnit, units } from '~/data/units'
import { externalLinks } from '~/data/site'
import type { CallToAction } from '~/data/types'
import { asset } from '~/lib/asset'
import { cn } from '~/lib/cn'

const BREADCRUMB: BreadcrumbItem[] = [{ label: 'Início', to: '/' }, { label: 'Quem somos' }]

/* Fachada da Barroca: e a unidade onde o grupo nasceu, em 1971. */
const HERO_IMAGE = findUnit('colegio-barroca-faculdade-cotemig')?.coverImage

/* Laboratorio de redes — ilustra o trecho sobre infraestrutura. */
const DIFFERENCE_IMAGE = asset('/img/units/cotemig-barroca-laboratorio-redes-860.webp')

const CTA: CallToAction = {
  title: 'Venha fazer parte dessa história',
  description:
    'São mais de 55 anos preparando estudantes para o mercado de trabalho e para a vida. O próximo capítulo pode ser o seu.',
  label: 'Quero me matricular',
  href: externalLinks.admission,
}

/**
 * Eixo da linha do tempo.
 *
 * No mobile o eixo fica na margem esquerda (7px = centro do marcador) e o ano
 * aparece acima do texto. A partir de `md` o eixo cai no meio da calha entre as
 * duas colunas — 7rem da coluna do ano + metade do gap de 2.5rem = 8.25rem —
 * para o marcador nao pousar em cima do ultimo digito do ano.
 */
const TIMELINE_AXIS = 'left-[7px] md:left-[8.25rem]'

const TIMELINE_ROW =
  'relative pl-8 md:grid md:grid-cols-[7rem_minmax(0,1fr)] md:items-start md:gap-x-10 md:pl-0'

export function AboutPage() {
  return (
    <>
      <Seo
        title="Quem somos"
        description="Conheça o Grupo COTEMIG: mais de 55 anos formando profissionais de tecnologia em Belo Horizonte. Nossa história, nossos princípios e nossas unidades."
        path="/quem-somos"
      />

      <PageHero
        breadcrumb={BREADCRUMB}
        eyebrow="Institucional"
        title="Quem somos"
        description={about.tagline}
        image={HERO_IMAGE}
        actions={
          <>
            <Button href={externalLinks.admission} size="lg">
              Matricule-se
            </Button>
            <Button to="/unidades" variant="onDark" size="lg">
              Ver as unidades
            </Button>
          </>
        }
      />

      {/* --- Abertura ------------------------------------------------------ */}
      <Section ariaLabel="Apresentação do Grupo COTEMIG">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-20">
          <p className="font-display text-xl leading-relaxed font-semibold text-ink-800 md:text-2xl">
            {about.intro[0]}
          </p>

          {about.intro.length > 1 ? <Paragraphs items={about.intro.slice(1)} /> : null}
        </div>
      </Section>

      {/* --- Faixa de numeros ---------------------------------------------- */}
      <Section tone="muted" spacing="sm" ariaLabel="O COTEMIG em números">
        <dl className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {about.stats.map((stat) => (
            /* `flex-col-reverse` deixa o numero em cima sem inverter a ordem
               do DOM, que precisa ser rotulo (dt) e depois valor (dd). */
            <div
              key={stat.label}
              className="flex flex-col-reverse gap-2 border-l-2 border-brand-500 pl-5"
            >
              <dt className="text-sm font-semibold tracking-wide text-ink-600 uppercase">
                {stat.label}
              </dt>
              <dd className="font-display text-display-sm text-brand-700">{stat.value}</dd>
            </div>
          ))}
        </dl>
      </Section>

      {/* --- Historia e linha do tempo ------------------------------------- */}
      <Section tone="ink" spacing="lg" id="historia">
        <SectionHeader
          onDark
          align="start"
          eyebrow="Nossa história"
          title="Mais de 55 anos de história"
          description="De uma turma de Técnico em Eletrônica, em 1971, ao grupo de educação tecnológica que somos hoje."
        />

        <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-20">
          <div className="space-y-5 text-lg leading-relaxed text-ink-300">
            {about.history.map((paragraph) => (
              <p key={paragraph.slice(0, 32)}>{paragraph}</p>
            ))}
          </div>

          {/* O eixo fica FORA do <ol>: a lista so aceita <li> como filho direto,
              e um <span> solto ali quebra a semantica de lista. */}
          <div className="relative">
            <span
              aria-hidden="true"
              className={cn(
                'absolute top-4 bottom-6 w-0.5 -translate-x-1/2 rounded-full bg-white/15',
                TIMELINE_AXIS,
              )}
            />

            <ol className="flex flex-col gap-12 md:gap-14">
              {about.milestones.map((milestone) => (
                <li key={milestone.year} className={TIMELINE_ROW}>
                  <span
                    aria-hidden="true"
                    className={cn(
                      'absolute top-2 size-3.5 -translate-x-1/2 rounded-full bg-brand-500 ring-4 ring-brand-500/20',
                      TIMELINE_AXIS,
                    )}
                  />

                  <p className="font-display text-display-sm text-brand-300 md:text-right">
                    {milestone.year}
                  </p>

                  <div className="mt-2 md:mt-1">
                    <h3 className="font-display text-xl font-bold text-white">{milestone.title}</h3>
                    <p className="mt-3 text-ink-300">{milestone.description}</p>
                  </div>
                </li>
              ))}

              {/* Fecha a linha no presente: e o que transforma a lista de marcos
                  no argumento da pagina — 55 anos de caminhada. */}
              <li className={TIMELINE_ROW}>
                <span
                  aria-hidden="true"
                  className={cn(
                    'absolute top-1 size-5 -translate-x-1/2 rounded-full border-2 border-brand-300 bg-brand-500 ring-4 ring-brand-500/25',
                    TIMELINE_AXIS,
                  )}
                />

                <p className="font-display text-display-sm text-white md:text-right">Hoje</p>

                <div className="mt-2 md:mt-1">
                  <h3 className="font-display text-xl font-bold text-white">Grupo COTEMIG</h3>
                  <p className="mt-3 text-ink-300">
                    Mais de 55 anos de história, três unidades em Belo Horizonte e cursos que vão do
                    técnico à graduação.
                  </p>
                </div>
              </li>
            </ol>
          </div>
        </div>
      </Section>

      {/* --- Nossa diferenca ------------------------------------------------ */}
      <Section id="nossa-diferenca">
        <SectionHeader
          align="start"
          eyebrow="Nossa diferença"
          title="Uma escola de tecnologia que não prevê o futuro: inventa"
        />

        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-20">
          {/* A foto acompanha a leitura no desktop em vez de sumir no topo.
              `self-start` e obrigatorio: item de grid estica por padrao e um
              elemento esticado nao tem folga para grudar. */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <img
              src={DIFFERENCE_IMAGE}
              alt="Laboratório de redes da unidade Barroca, com bancadas de equipamentos e computadores"
              loading="lazy"
              decoding="async"
              className="aspect-4/3 w-full rounded-lg object-cover shadow-card"
            />
          </div>

          <Paragraphs items={about.difference} />
        </div>
      </Section>

      {/* --- Missao, visao e valores ---------------------------------------- */}
      <Section tone="muted" id="principios">
        <SectionHeader
          eyebrow="Nossos princípios"
          title="Missão, visão e valores"
          description="O que orienta as decisões do grupo, dentro e fora da sala de aula."
        />

        <div className="grid gap-6 lg:grid-cols-2">
          {about.principles.map((principle) => {
            /* Principios longos (os Valores, com oito itens) ocupam a linha
               inteira e viram lista — em card estreito viravam um paredao. */
            const asList = principle.body.length > 2

            return (
              <Card key={principle.title} className={asList ? 'lg:col-span-2' : undefined}>
                <span aria-hidden="true" className="block h-1 w-10 rounded-full bg-brand-500" />

                <h3 className="mt-6 font-display text-2xl font-bold text-ink-900">
                  {principle.title}
                </h3>

                {asList ? (
                  <ul className="mt-6 grid gap-4 md:grid-cols-2">
                    {principle.body.map((item) => (
                      <li key={item.slice(0, 32)} className="flex gap-3 text-ink-600">
                        <span className="mt-1 shrink-0 text-brand-700">
                          <Icon name="check" size={18} />
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="mt-5 space-y-4 text-ink-600">
                    {principle.body.map((text) => (
                      <p key={text.slice(0, 32)}>{text}</p>
                    ))}
                  </div>
                )}
              </Card>
            )
          })}
        </div>
      </Section>

      {/* --- Unidades -------------------------------------------------------- */}
      <Section id="unidades">
        <SectionHeader
          align="start"
          eyebrow="Onde estamos"
          title="Nossas três unidades"
          description="Duas unidades de ensino e o escritório central, todos em Belo Horizonte."
          action={
            <Button
              to="/unidades"
              variant="link"
              trailingIcon={<Icon name="arrow-right" size={18} />}
            >
              Ver todas as unidades
            </Button>
          }
        />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {units.map((unit) => (
            <UnitCard key={unit.slug} unit={unit} />
          ))}
        </div>
      </Section>

      {/* --- Formulario ------------------------------------------------------ */}
      <Section tone="muted" id="matricula">
        <EnrollmentForm />
      </Section>

      <CtaBand cta={CTA} tone="ink" />
    </>
  )
}
