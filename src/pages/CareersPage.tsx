import { useCallback } from 'react'
import { Seo } from '~/components/Seo'
import { CtaBand } from '~/components/blocks/CtaBand'
import { FeatureGrid } from '~/components/blocks/FeatureGrid'
import { PageHero } from '~/components/blocks/PageHero'
import { Prose } from '~/components/blocks/Prose'
import { Button } from '~/components/ui/Button'
import { Field, FileInput, FormStatus, Input, Select, Textarea } from '~/components/ui/Form'
import type { SelectOption } from '~/components/ui/Form'
import { Section, SectionHeader } from '~/components/ui/Section'
import { site } from '~/data/site'
import type { CallToAction, Feature } from '~/data/types'
import { collectErrors, required, useMockForm, validEmail } from '~/hooks/useMockForm'
import type { FormValues } from '~/hooks/useMockForm'

/* ---------------------------------------------------------------------------
   Conteudo
   ------------------------------------------------------------------------ */

/** Areas do banco de talentos. Mesma lista publicada no site atual. */
const AREAS: SelectOption[] = [
  { value: 'geral', label: 'Geral' },
  { value: 'professor-medio-ti', label: 'Professor ensino médio — Área de TI' },
  { value: 'professor-bnc', label: 'Professor BNC' },
  { value: 'professor-faculdade-ti', label: 'Professor Faculdade — área de TI' },
  { value: 'professor-faculdade-outras', label: 'Professor Faculdade — outras áreas' },
  { value: 'atendimento-administrativo', label: 'Atendimento e administrativo' },
  { value: 'supervisao-pedagogica', label: 'Supervisão Pedagógica' },
  { value: 'comercial', label: 'Comercial' },
  { value: 'servicos-gerais', label: 'Serviços gerais' },
  { value: 'gestor', label: 'Gestor' },
]

/** Motivos para trabalhar no grupo — o "por que o COTEMIG". */
const REASONS: Feature[] = [
  {
    icon: 'graduation',
    title: 'Educação que vira carreira',
    description:
      'Desde 1971 o COTEMIG forma profissionais de tecnologia em Belo Horizonte. Quem trabalha aqui participa da primeira formação técnica de milhares de alunos.',
  },
  {
    icon: 'check',
    title: 'Estrutura de tecnologia de verdade',
    description:
      'Laboratórios de redes, robótica, Android e Mac, auditório e espaços de coworking. A infraestrutura que sustenta a aula também sustenta o time.',
  },
  {
    icon: 'pin',
    title: 'Três unidades em Belo Horizonte',
    description:
      'Colégio e Faculdade na Barroca, Colégio na Floresta e o Escritório Central no Grajaú — todas bem servidas por transporte público.',
  },
]

const CAREERS_CTA: CallToAction = {
  title: 'Dúvidas sobre o processo seletivo?',
  description: `Fale com o time de Gente e Gestão pelo e-mail ${site.email.careers} ou pelo telefone ${site.phone.label}.`,
  label: 'Escrever para o COTEMIG',
  href: `mailto:${site.email.careers}`,
}

/* ---------------------------------------------------------------------------
   Formulario
   ------------------------------------------------------------------------ */

interface CareersValues extends FormValues {
  name: string
  email: string
  linkedin: string
  area: string
  lattes: string
  resume: string
  message: string
}

const INITIAL: CareersValues = {
  name: '',
  email: '',
  linkedin: '',
  area: '',
  lattes: '',
  resume: '',
  message: '',
}

export function CareersPage() {
  const validate = useCallback(
    (values: CareersValues) =>
      collectErrors({
        name: required(values.name, 'o seu nome'),
        email: validEmail(values.email),
        area: required(values.area, 'a área de interesse'),
      }),
    [],
  )

  const form = useMockForm<CareersValues>({ initialValues: INITIAL, validate })

  return (
    <>
      <Seo
        title="Trabalhe conosco"
        description="Envie seu currículo para o banco de talentos do COTEMIG. Vagas para professores, atendimento, supervisão pedagógica, comercial e gestão em Belo Horizonte."
        path="/carreiras"
      />

      <PageHero
        breadcrumb={[{ label: 'Início', to: '/' }, { label: 'Trabalhe conosco' }]}
        eyebrow="Carreiras"
        title="Trabalhe conosco"
        description="Cadastre seu currículo no banco de talentos do COTEMIG. Quando abrir uma vaga na sua área, o time de Gente e Gestão entra em contato."
        size="sm"
      />

      <Section spacing="md" ariaLabel="Por que trabalhar no COTEMIG">
        <SectionHeader
          eyebrow="Por que o COTEMIG"
          title="Uma escola de tecnologia é feita de gente"
          description="Somos um grupo de educação com Colégio e Faculdade sob o mesmo teto. Aqui, professor, atendimento, pedagógico e administrativo trabalham para o mesmo resultado: aluno formado e empregado."
          align="start"
        />
        <FeatureGrid features={REASONS} columns={3} />
      </Section>

      <Section tone="muted" spacing="lg" id="cadastro" ariaLabel="Cadastro de currículo">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] lg:gap-16">
          <div>
            <h2 className="text-display-sm text-ink-900">Envie seu currículo</h2>
            <Prose className="mt-5">
              <p>
                O cadastro alimenta o nosso banco de talentos. Ele fica disponível para as
                lideranças de todas as unidades e é consultado sempre que uma vaga é aberta.
              </p>
              <p>
                Para funções docentes, o currículo Lattes ajuda bastante na análise. Anexe também o
                seu currículo em PDF ou Word.
              </p>
            </Prose>
          </div>

          {form.submitted ? (
            <FormStatus tone="success" title="Currículo cadastrado!">
              <p>
                Seus dados entraram no banco de talentos do COTEMIG. Quando surgir uma
                oportunidade compatível com a sua área, o time de Gente e Gestão entra em contato
                pelo e-mail informado.
              </p>
              <button
                type="button"
                onClick={form.reset}
                className="mt-3 rounded-sm font-display font-semibold underline underline-offset-4"
              >
                Cadastrar outro currículo
              </button>
            </FormStatus>
          ) : (
            <form noValidate onSubmit={form.handleSubmit} className="grid gap-6 md:grid-cols-2">
              <Field label="Nome" required error={form.errors.name}>
                {({ id, required: isRequired, invalid, describedBy }) => (
                  <Input
                    id={id}
                    name="name"
                    required={isRequired}
                    invalid={invalid}
                    aria-describedby={describedBy}
                    value={form.values.name}
                    onChange={(event) => form.setValue('name', event.target.value)}
                    autoComplete="name"
                  />
                )}
              </Field>

              <Field label="E-mail" required error={form.errors.email}>
                {({ id, required: isRequired, invalid, describedBy }) => (
                  <Input
                    id={id}
                    name="email"
                    type="email"
                    required={isRequired}
                    invalid={invalid}
                    aria-describedby={describedBy}
                    value={form.values.email}
                    onChange={(event) => form.setValue('email', event.target.value)}
                    autoComplete="email"
                  />
                )}
              </Field>

              <Field label="LinkedIn" hint="Endereço completo do seu perfil.">
                {({ id, describedBy }) => (
                  <Input
                    id={id}
                    name="linkedin"
                    type="url"
                    aria-describedby={describedBy}
                    value={form.values.linkedin}
                    onChange={(event) => form.setValue('linkedin', event.target.value)}
                    placeholder="https://www.linkedin.com/in/seu-perfil"
                  />
                )}
              </Field>

              <Field label="Área de interesse" required error={form.errors.area}>
                {({ id, required: isRequired, invalid, describedBy }) => (
                  <Select
                    id={id}
                    name="area"
                    required={isRequired}
                    invalid={invalid}
                    aria-describedby={describedBy}
                    value={form.values.area}
                    onChange={(event) => form.setValue('area', event.target.value)}
                    placeholder="Escolha a área"
                    options={AREAS}
                  />
                )}
              </Field>

              <Field label="Currículo Lattes" hint="Link do seu currículo na plataforma Lattes.">
                {({ id, describedBy }) => (
                  <Input
                    id={id}
                    name="lattes"
                    type="url"
                    aria-describedby={describedBy}
                    value={form.values.lattes}
                    onChange={(event) => form.setValue('lattes', event.target.value)}
                    placeholder="http://lattes.cnpq.br/0000000000000000"
                  />
                )}
              </Field>

              <Field label="Anexar currículo" hint="Arquivo em PDF, DOC ou DOCX.">
                {({ id, describedBy }) => (
                  <FileInput
                    id={id}
                    name="resume"
                    accept=".pdf,.doc,.docx"
                    aria-describedby={describedBy}
                    fileName={form.values.resume || undefined}
                    onChange={(event) =>
                      form.setValue('resume', event.target.files?.[0]?.name ?? '')
                    }
                  />
                )}
              </Field>

              <Field
                label="Sobre você"
                hint="Conte a sua experiência, formação e o que te interessa no COTEMIG."
                wide
              >
                {({ id, describedBy }) => (
                  <Textarea
                    id={id}
                    name="message"
                    rows={6}
                    aria-describedby={describedBy}
                    value={form.values.message}
                    onChange={(event) => form.setValue('message', event.target.value)}
                  />
                )}
              </Field>

              <div className="md:col-span-2">
                <Button type="submit" size="lg" disabled={form.submitting}>
                  {form.submitting ? 'Enviando…' : 'Enviar currículo'}
                </Button>
              </div>
            </form>
          )}
        </div>
      </Section>

      <CtaBand cta={CAREERS_CTA} />
    </>
  )
}
