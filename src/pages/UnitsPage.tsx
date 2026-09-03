import { Seo } from '~/components/Seo'
import { PageHero } from '~/components/blocks/PageHero'
import { CtaBand } from '~/components/blocks/CtaBand'
import { UnitCard } from '~/components/blocks/Cards'
import { Section, SectionHeader } from '~/components/ui/Section'
import { Card } from '~/components/ui/Card'
import { Button } from '~/components/ui/Button'
import { Icon } from '~/components/ui/Icon'
import { units } from '~/data/units'
import { site } from '~/data/site'
import type { CallToAction } from '~/data/types'

/**
 * Indice das unidades — rota /unidades.
 *
 * No site atual esta pagina nao tinha topo: abria direto nos mesmos cards que
 * ja aparecem no rodape de toda pagina, sem nenhum texto proprio. Aqui ela
 * ganha um hero de verdade, uma introducao que explica o que e cada endereco
 * e o bloco da central de atendimento, que antes so existia no contato.
 */

const CTA: CallToAction = {
  title: 'Venha conhecer o COTEMIG de perto',
  description:
    'Agende uma visita e conheça os laboratórios, o auditório e os espaços de convivência com quem estuda aqui.',
  label: site.whatsapp.label,
  href: site.whatsapp.href,
}

export function UnitsPage() {
  return (
    <>
      <Seo
        title="Unidades"
        description="Endereço, telefone, horários, linhas de ônibus e estrutura das unidades do COTEMIG em Belo Horizonte: Barroca, Floresta e Escritório Central."
        path="/unidades"
        image={units[0].coverImage}
      />

      <PageHero
        breadcrumb={[{ label: 'Início', to: '/' }, { label: 'Unidades' }]}
        eyebrow="Estrutura e endereços"
        title="As unidades do COTEMIG"
        description="Onde o COTEMIG funciona: endereço, atendimento, transporte e a estrutura de cada unidade — com tour virtual nas unidades de ensino."
        image={units[0].coverImage}
      />

      <Section tone="white" spacing="md">
        <SectionHeader
          eyebrow="Unidades"
          title="Três endereços em Belo Horizonte"
          description="Duas unidades de ensino, onde acontecem as aulas do Colégio e da Faculdade, e o escritório central, que reúne as áreas administrativas do grupo."
          align="start"
        />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {units.map((unit) => (
            <UnitCard key={unit.slug} unit={unit} />
          ))}
        </div>
      </Section>

      <Section tone="muted" spacing="md" id="central-de-atendimento">
        <SectionHeader
          eyebrow="Central de atendimento"
          title="Uma central para as três unidades"
          description="O mesmo telefone atende Colégio, Faculdade e Escritório Central. Se preferir escrever, o WhatsApp é o caminho mais rápido."
          align="start"
        />

        {/* 1 -> 2 -> 3 colunas. Pular direto para 3 em md deixava ~155px uteis
            por card, e o botao do WhatsApp quebrava dentro da altura fixa. */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Card>
            <span className="mb-5 flex size-12 items-center justify-center rounded-md bg-brand-50 text-brand-700">
              <Icon name="phone" size={24} />
            </span>
            <h3 className="font-display text-lg font-bold text-ink-900">Telefone</h3>
            <p className="mt-2 flex-1 text-ink-600">
              Matrículas, secretaria e informações gerais sobre as três unidades.
            </p>
            <Button href={site.phone.href} variant="link" size="lg" className="mt-5 self-start">
              {site.phone.label}
            </Button>
          </Card>

          <Card>
            <span className="mb-5 flex size-12 items-center justify-center rounded-md bg-brand-50 text-brand-700">
              <Icon name="whatsapp" size={24} />
            </span>
            <h3 className="font-display text-lg font-bold text-ink-900">WhatsApp</h3>
            <p className="mt-2 flex-1 text-ink-600">
              Para tirar dúvidas rápidas, pedir documentos ou agendar uma visita à unidade.
            </p>
            <Button
              href={site.whatsapp.href}
              variant="secondary"
              className="mt-5 self-start"
              trailingIcon={<Icon name="arrow-up-right" size={18} />}
            >
              {site.whatsapp.label}
            </Button>
          </Card>

          <Card>
            <span className="mb-5 flex size-12 items-center justify-center rounded-md bg-brand-50 text-brand-700">
              <Icon name="clock" size={24} />
            </span>
            <h3 className="font-display text-lg font-bold text-ink-900">Horário da central</h3>
            <p className="mt-2 flex-1 text-ink-600">
              {site.serviceHours}. Cada unidade tem o próprio horário de secretaria — confira na
              página dela.
            </p>
            <Button to="/contato" variant="link" className="mt-5 self-start">
              Ver todos os canais de contato
            </Button>
          </Card>
        </div>
      </Section>

      <CtaBand cta={CTA} />
    </>
  )
}
