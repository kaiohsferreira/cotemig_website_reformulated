import { asset } from '~/lib/asset'
import { Seo } from '~/components/Seo'
import { Section, SectionHeader } from '~/components/ui/Section'
import { Button } from '~/components/ui/Button'
import { Card } from '~/components/ui/Card'
import { Icon } from '~/components/ui/Icon'
import { FeatureGrid } from '~/components/blocks/FeatureGrid'
import { CtaBand } from '~/components/blocks/CtaBand'
import { RelatedPosts } from '~/components/blocks/RelatedPosts'
import { InstitutionCard, UnitCard } from '~/components/blocks/Cards'
import { institutions } from '~/data/institutions'
import { coursesByInstitution } from '~/data/courses'
import { units } from '~/data/units'
import { about } from '~/data/about'
import { latestPosts } from '~/data/posts'
import { externalLinks, site } from '~/data/site'
import type { CallToAction, Feature } from '~/data/types'

/**
 * Imagem de fundo do hero e de compartilhamento.
 *
 * Nao usamos o banner da home atual (`/static/banner/mobileimage-*.png`) porque
 * ele traz o texto chapado dentro da imagem — e exatamente o defeito que este
 * hero resolve: no mobile aquele texto aparecia cortado e nenhum leitor de tela
 * o enxergava. Aqui a foto e so foto, e o texto e HTML de verdade por cima.
 *
 * A foto e escolha propria da home, e nao a de nenhuma das instituicoes: o
 * laboratorio de Mac da Barroca e a imagem que diz "escola de tecnologia" mais
 * rapido, e a home precisa dizer isso em um segundo. Manter separada tambem
 * evita a home repetir a foto que o visitante ve logo abaixo, nos cards.
 */
const HERO_IMAGE = asset('/img/units/cotemig-barroca-laboratorio-mac-860.webp')

/**
 * Diferenciais do grupo.
 *
 * Selecionados por titulo entre os `highlights` das duas instituicoes: tres de
 * cada, para a secao mostrar o Colegio e a Faculdade com o mesmo peso. Nada foi
 * reescrito — o texto e o mesmo de `institutions.ts`, entao mudar um titulo la
 * tira o item daqui.
 */
const GROUP_HIGHLIGHT_TITLES = new Set([
  '75% de aulas práticas em laboratório de ponta',
  'Oportunidades para ingressar no mundo do trabalho',
  'Escola de Referência Google',
  'Estímulo total à criatividade e à inovação do estudante',
  'Experiência de aprendizagem com a melhor infraestrutura',
  'Mentores que conhecem os segredos do mundo da TI',
])

const groupHighlights: Feature[] = institutions
  .flatMap((institution) => institution.highlights)
  .filter((highlight) => GROUP_HIGHLIGHT_TITLES.has(highlight.title))

/** Chamada final. E do grupo, entao nao reaproveita o CTA de uma instituicao. */
const HOME_CTA: CallToAction = {
  title: 'Matrículas abertas',
  description: `Escolha o Colégio ou a Faculdade e comece a sua história no COTEMIG. Em dúvida entre os dois? Fale com a nossa equipe pelo ${site.phone.label}.`,
  label: 'Matricule-se',
  href: externalLinks.admission,
}

export function HomePage() {
  return (
    <>
      <Seo
        title="Colégio e Faculdade de tecnologia em Belo Horizonte"
        description="Há mais de 55 anos formando profissionais de tecnologia em Belo Horizonte: Ensino Médio Técnico no Colégio e três graduações na Faculdade COTEMIG."
        path="/"
        image={HERO_IMAGE}
      />

      {/* ------------------------------------------------------------------
          Hero

          Unico hero montado a mao no site — o PageHero e para pagina interna,
          que tem breadcrumb e h1 de secao. A home nao tem breadcrumb.

          O `surface-ink` fica no proprio <section>: se a foto demorar ou falhar,
          o fundo ja e escuro e o texto branco continua legivel. As duas camadas
          de escurecimento sao as mesmas do PageHero — a primeira garante o
          contraste AA, a segunda devolve o verde para o fundo nao virar cinza.
          ------------------------------------------------------------------ */}
      <section className="surface-ink relative isolate overflow-hidden">
        <img
          src={HERO_IMAGE}
          alt=""
          aria-hidden="true"
          decoding="async"
          fetchPriority="high"
          className="absolute inset-0 -z-20 size-full object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-ink-950/78" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-brand-950/85 via-ink-950/40 to-transparent" />

        <div className="container-shell relative py-24 md:py-32 lg:py-36">
          <div className="max-w-3xl">
            <p className="mb-4 text-eyebrow text-brand-300 uppercase">
              Grupo COTEMIG · desde {site.foundedIn}
            </p>

            <h1 className="text-display-xl text-white">{site.tagline}</h1>

            <p className="mt-6 max-w-2xl text-lg text-ink-200 md:text-xl">{site.description}</p>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <Button
                href={externalLinks.admission}
                size="lg"
                trailingIcon={<Icon name="arrow-up-right" size={20} />}
              >
                Matricule-se
              </Button>

              <Button
                href="#instituicoes"
                variant="onDark"
                size="lg"
                trailingIcon={<Icon name="arrow-right" size={20} />}
              >
                Conhecer os cursos
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------
          A escolha — o eixo da home. Onde o site atual tinha um carrossel com
          dois slides, aqui as duas instituicoes aparecem lado a lado, ao mesmo
          tempo, com os cursos de cada uma ja visiveis.
          ------------------------------------------------------------------ */}
      <Section id="instituicoes" spacing="lg">
        <SectionHeader
          eyebrow="Duas escolas, uma paixão"
          title="Escolha como você vai mudar o mundo"
          description="Do Ensino Médio Técnico à graduação, o caminho é o mesmo: laboratório cheio, professor que veio do mercado e tecnologia de verdade desde o primeiro dia."
        />

        <div className="grid gap-8 lg:grid-cols-2">
          {institutions.map((institution) => (
            <InstitutionCard
              key={institution.slug}
              slug={institution.slug}
              name={institution.name}
              tagline={institution.tagline}
              image={institution.cardImage}
              accent={institution.accent}
              courses={coursesByInstitution(institution.slug)}
            />
          ))}
        </div>
      </Section>

      {/* ------------------------------------------------------------------
          Numeros do grupo
          ------------------------------------------------------------------ */}
      <Section tone="ink">
        <SectionHeader
          eyebrow="Grupo COTEMIG"
          title={about.tagline}
          description={about.intro[1]}
          align="start"
          onDark
          action={
            <Button
              to="/quem-somos"
              variant="onDark"
              trailingIcon={<Icon name="arrow-right" size={18} />}
            >
              Nossa história
            </Button>
          }
        />

        {/* `flex-col-reverse` mantem o <dt> antes do <dd> na marcacao, como a
            especificacao pede, e mesmo assim mostra o numero em cima. */}
        <dl className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {about.stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col-reverse border-t-2 border-brand-500 pt-5"
            >
              <dt className="mt-2 text-ink-300">{stat.label}</dt>
              <dd className="text-display-md text-white">{stat.value}</dd>
            </div>
          ))}
        </dl>
      </Section>

      {/* ------------------------------------------------------------------
          Diferenciais
          ------------------------------------------------------------------ */}
      <Section tone="muted">
        <SectionHeader
          eyebrow="Por que o COTEMIG"
          title="O que você encontra no COTEMIG"
          description="São motivos que vêm do Colégio e da Faculdade — mais de meio século de escola de tecnologia rende alguns."
        />

        <FeatureGrid features={groupHighlights} columns={3} />
      </Section>

      {/* ------------------------------------------------------------------
          Unidades + central de atendimento
          ------------------------------------------------------------------ */}
      <Section>
        <SectionHeader
          eyebrow="Onde a gente fica"
          title="Três unidades em Belo Horizonte"
          align="start"
          action={
            <Button
              to="/unidades"
              variant="secondary"
              trailingIcon={<Icon name="arrow-right" size={18} />}
            >
              Ver as unidades
            </Button>
          }
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {units.map((unit) => (
            <UnitCard key={unit.slug} unit={unit} />
          ))}

          <Card>
            <span className="mb-5 flex size-12 items-center justify-center rounded-md bg-brand-50 text-brand-700">
              <Icon name="phone" size={24} />
            </span>

            <h3 className="font-display text-lg font-bold text-ink-900">
              Central de Atendimento
            </h3>

            <p className="mt-2.5 flex-1 text-ink-600">
              Dúvidas sobre vagas, turmas ou documentação? {site.serviceHours}.
            </p>

            <a
              href={site.phone.href}
              className="mt-4 -ml-2 inline-flex min-h-11 items-center gap-2 self-start rounded-sm px-2 font-display font-semibold text-brand-700 hover:text-brand-800"
            >
              <Icon name="phone" size={18} />
              {site.phone.label}
            </a>

            <a
              href={site.whatsapp.href}
              target="_blank"
              rel="noopener noreferrer"
              className="-ml-2 inline-flex min-h-11 items-center gap-2 self-start rounded-sm px-2 font-display font-semibold text-brand-700 hover:text-brand-800"
            >
              <Icon name="whatsapp" size={18} />
              {site.whatsapp.label}
            </a>
          </Card>
        </div>
      </Section>

      {/* ------------------------------------------------------------------
          Blog — `RelatedPosts` ja traz a propria Section (tone muted).
          ------------------------------------------------------------------ */}
      <RelatedPosts posts={latestPosts(4)} />

      {/* `ink`, nao `brand`: na faixa verde a descricao sai em brand-50 sobre
          brand-500, que da 2,8:1 e reprova no AA para texto de 18px. O verde
          continua na faixa pelo botao. */}
      <CtaBand cta={HOME_CTA} tone="ink" />
    </>
  )
}
