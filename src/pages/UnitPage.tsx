import { useParams } from 'react-router-dom'
import { Seo } from '~/components/Seo'
import { PageHero } from '~/components/blocks/PageHero'
import { CtaBand } from '~/components/blocks/CtaBand'
import { UnitCard } from '~/components/blocks/Cards'
import { Section, SectionHeader } from '~/components/ui/Section'
import { Card, CardMedia } from '~/components/ui/Card'
import { Badge } from '~/components/ui/Badge'
import { Button } from '~/components/ui/Button'
import { Icon } from '~/components/ui/Icon'
import { findUnit, units } from '~/data/units'
import { site } from '~/data/site'
import type { CallToAction } from '~/data/types'
import { NotFoundPage } from '~/pages/NotFoundPage'

/**
 * Pagina de uma unidade — rota /unidades/:unitSlug.
 *
 * As informacoes praticas (endereco, telefone, horario, transporte) sobem para
 * o topo, porque sao o motivo real de quem abre esta pagina. A galeria vem
 * depois, com proporcao travada em toda foto: e exatamente o defeito do site
 * atual, onde a altura livre esmagava as imagens da estrutura no mobile.
 */
export function UnitPage() {
  const { unitSlug } = useParams()
  const unit = unitSlug ? findUnit(unitSlug) : undefined

  if (!unit) return <NotFoundPage />

  const otherUnits = units.filter((item) => item.slug !== unit.slug)
  const isTeaching = unit.kind === 'ensino'

  const cta: CallToAction = {
    title: isTeaching ? 'Quer conhecer esta unidade por dentro?' : 'Precisa falar com o administrativo?',
    description: isTeaching
      ? 'Fale com a central de atendimento e agende uma visita guiada pelos laboratórios e espaços de convivência.'
      : 'A central de atendimento encaminha sua solicitação para a área responsável do grupo.',
    label: site.whatsapp.label,
    href: site.whatsapp.href,
  }

  return (
    <>
      <Seo
        title={unit.name}
        description={`${unit.name}: ${unit.address}, ${unit.district}, ${unit.city}. Telefone, horários de atendimento, linhas de ônibus e fotos da estrutura.`}
        path={`/unidades/${unit.slug}`}
        image={unit.coverImage}
      />

      <PageHero
        breadcrumb={[
          { label: 'Início', to: '/' },
          { label: 'Unidades', to: '/unidades' },
          { label: unit.name },
        ]}
        eyebrow={isTeaching ? 'Unidade de ensino' : 'Escritório administrativo'}
        title={unit.name}
        description={unit.summary}
        image={unit.coverImage}
      >
        <div className="mt-10 flex flex-wrap gap-3">
          <Badge tone="onDark" icon={<Icon name="pin" size={14} />}>
            {unit.district} · {unit.city}
          </Badge>
          {unit.tourUrl ? (
            <Badge tone="onDark" icon={<Icon name="play" size={14} />}>
              Tour virtual
            </Badge>
          ) : null}
        </div>
      </PageHero>

      {/* Informacoes praticas — o que a pessoa veio buscar. */}
      <Section tone="white" spacing="md" ariaLabel="Informações práticas da unidade">
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <span className="mb-5 flex size-12 items-center justify-center rounded-md bg-brand-50 text-brand-700">
              <Icon name="pin" size={24} />
            </span>

            <h2 className="font-display text-xl font-bold text-ink-900">Endereço</h2>

            <address className="mt-3 flex-1 text-lg not-italic text-ink-600">
              {unit.address}
              <br />
              {unit.district} · {unit.city} — MG
              <br />
              CEP {unit.cep}
            </address>

            <Button
              href={unit.mapUrl}
              variant="secondary"
              className="mt-6 self-start"
              trailingIcon={<Icon name="arrow-up-right" size={18} />}
            >
              Ver trajeto
            </Button>
          </Card>

          <Card>
            <span className="mb-5 flex size-12 items-center justify-center rounded-md bg-brand-50 text-brand-700">
              <Icon name="phone" size={24} />
            </span>

            <h2 className="font-display text-xl font-bold text-ink-900">Telefone e horários</h2>

            <Button href={site.phone.href} variant="link" size="lg" className="mt-3 self-start">
              {unit.phone}
            </Button>

            <dl className="mt-6 flex flex-1 flex-col gap-5 border-t border-ink-200 pt-6">
              {unit.hours.map((entry) => (
                <div key={entry.label}>
                  <dt className="font-display text-xs font-semibold tracking-wide text-ink-500 uppercase">
                    {entry.label}
                  </dt>
                  <dd className="mt-1.5 text-ink-700">{entry.value}</dd>
                </div>
              ))}
            </dl>
          </Card>
        </div>
      </Section>

      {/* Transporte: linhas de onibus e, quando houver, as rotas de van. */}
      {unit.busLines.length > 0 || unit.vanRoutes.length > 0 ? (
        <Section tone="muted" spacing="md">
          <SectionHeader
            eyebrow="Como chegar"
            title="Transporte até a unidade"
            description="Linhas de ônibus que atendem o endereço e, quando a unidade oferece, o percurso das vans do COTEMIG."
            align="start"
          />

          {unit.busLines.length > 0 ? (
            <div>
              <h3 className="flex items-center gap-2 font-display text-lg font-bold text-ink-900">
                <Icon name="bus" size={20} className="text-brand-700" />
                Linhas de ônibus
              </h3>

              <ul className="mt-5 flex flex-wrap gap-2">
                {unit.busLines.map((line) => (
                  <li key={line}>
                    <Badge tone="neutral">{line}</Badge>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {unit.vanRoutes.length > 0 ? (
            <div className={unit.busLines.length > 0 ? 'mt-12' : undefined}>
              <h3 className="font-display text-lg font-bold text-ink-900">Rotas de van</h3>

              <ul className="mt-5 grid gap-3 md:grid-cols-2">
                {unit.vanRoutes.map((route) =>
                  route.href ? (
                    <li key={route.label}>
                      <a
                        href={route.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between gap-4 rounded-md border border-ink-200 bg-white p-5 shadow-card transition-colors duration-200 hover:border-brand-300"
                      >
                        <span>
                          <span className="block font-display font-semibold text-ink-900">
                            {route.label}
                          </span>
                          <span className="mt-1 block text-sm text-ink-600">{route.value}</span>
                        </span>
                        <Icon name="arrow-up-right" size={18} className="shrink-0 text-brand-700" />
                      </a>
                    </li>
                  ) : (
                    <li
                      key={route.label}
                      className="rounded-md border border-ink-200 bg-white p-5 shadow-card"
                    >
                      <span className="block font-display font-semibold text-ink-900">
                        {route.label}
                      </span>
                      <span className="mt-1 block text-sm text-ink-600">{route.value}</span>
                    </li>
                  ),
                )}
              </ul>
            </div>
          ) : null}
        </Section>
      ) : null}

      {/* Tour virtual — so as unidades de ensino tem video. */}
      {unit.tourUrl ? (
        <Section tone="ink" spacing="sm">
          <div className="flex flex-col items-start gap-8 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl">
              <p className="mb-3 text-eyebrow text-brand-300 uppercase">Tour virtual</p>
              <h2 className="text-display-sm text-white">Conheça a unidade sem sair de casa</h2>
              <p className="mt-4 text-lg text-ink-300">
                Um passeio em vídeo pelas salas, laboratórios e áreas de convivência, gravado na
                própria unidade.
              </p>
            </div>

            {/* shrink-0: sem ele o botao encolhia em md e o rotulo quebrava
                em duas linhas dentro da altura fixa do tamanho lg. */}
            <Button
              href={unit.tourUrl}
              variant="onDark"
              size="lg"
              className="shrink-0"
              leadingIcon={<Icon name="play" size={20} />}
            >
              Assistir ao tour
            </Button>
          </div>
        </Section>
      ) : null}

      {/* Galeria da estrutura. Proporcao travada + object-cover em toda foto. */}
      {unit.gallery.length > 0 ? (
        <Section tone="white" spacing="md">
          <SectionHeader
            eyebrow="Estrutura"
            title="A unidade por dentro"
            description={
              isTeaching
                ? 'Os espaços que os alunos usam todo dia, fotografados na própria unidade.'
                : 'Os espaços onde ficam as equipes administrativas do grupo, fotografados na própria unidade.'
            }
            align="start"
          />

          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {unit.gallery.map((image) => (
              <li
                key={image.src}
                className="overflow-hidden rounded-lg border border-ink-200 shadow-card"
              >
                <CardMedia src={image.src} alt={image.alt} ratio="photo" />
              </li>
            ))}
          </ul>
        </Section>
      ) : null}

      {otherUnits.length > 0 ? (
        <Section tone="muted" spacing="md">
          <SectionHeader
            eyebrow="Outras unidades"
            title="Onde mais o COTEMIG está"
            align="start"
          />

          <div className="grid gap-6 md:grid-cols-2">
            {otherUnits.map((other) => (
              <UnitCard key={other.slug} unit={other} />
            ))}
          </div>
        </Section>
      ) : null}

      <CtaBand cta={cta} />
    </>
  )
}
