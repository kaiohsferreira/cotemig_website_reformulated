import { useCallback } from 'react'
import { Seo } from '~/components/Seo'
import { CtaBand } from '~/components/blocks/CtaBand'
import { FeatureGrid } from '~/components/blocks/FeatureGrid'
import { PageHero } from '~/components/blocks/PageHero'
import { Prose } from '~/components/blocks/Prose'
import { Button } from '~/components/ui/Button'
import { Field, FormStatus, Input, Select, Textarea } from '~/components/ui/Form'
import type { SelectOption } from '~/components/ui/Form'
import { Icon } from '~/components/ui/Icon'
import { Section, SectionHeader } from '~/components/ui/Section'
import { site } from '~/data/site'
import type { CallToAction, Feature } from '~/data/types'
import {
  collectErrors,
  required,
  useMockForm,
  validCnpj,
  validEmail,
  validPhone,
} from '~/hooks/useMockForm'
import type { FormValues } from '~/hooks/useMockForm'

/* ---------------------------------------------------------------------------
   Conteudo
   ------------------------------------------------------------------------ */

/** As duas formas de parceria descritas pelo COTEMIG Carreiras. */
const PARTNERSHIPS: Feature[] = [
  {
    icon: 'mail',
    title: 'Divulgação de vagas',
    description:
      'A empresa cadastra a vaga e o COTEMIG Carreiras divulga para os alunos e ex-alunos do perfil pedido. Os candidatos se aplicam direto com a empresa, que conduz a seleção do jeito que preferir.',
  },
  {
    icon: 'graduation',
    title: 'Contratação de estagiário',
    description:
      'Além da divulgação, o COTEMIG acompanha a contratação: pré-seleção dos candidatos, apoio na formalização do termo de compromisso de estágio e acompanhamento pedagógico do estagiário.',
  },
]

/** As 27 unidades federativas, para o campo Estado. */
const STATES: SelectOption[] = [
  { value: 'AC', label: 'Acre' },
  { value: 'AL', label: 'Alagoas' },
  { value: 'AP', label: 'Amapá' },
  { value: 'AM', label: 'Amazonas' },
  { value: 'BA', label: 'Bahia' },
  { value: 'CE', label: 'Ceará' },
  { value: 'DF', label: 'Distrito Federal' },
  { value: 'ES', label: 'Espírito Santo' },
  { value: 'GO', label: 'Goiás' },
  { value: 'MA', label: 'Maranhão' },
  { value: 'MT', label: 'Mato Grosso' },
  { value: 'MS', label: 'Mato Grosso do Sul' },
  { value: 'MG', label: 'Minas Gerais' },
  { value: 'PA', label: 'Pará' },
  { value: 'PB', label: 'Paraíba' },
  { value: 'PR', label: 'Paraná' },
  { value: 'PE', label: 'Pernambuco' },
  { value: 'PI', label: 'Piauí' },
  { value: 'RJ', label: 'Rio de Janeiro' },
  { value: 'RN', label: 'Rio Grande do Norte' },
  { value: 'RS', label: 'Rio Grande do Sul' },
  { value: 'RO', label: 'Rondônia' },
  { value: 'RR', label: 'Roraima' },
  { value: 'SC', label: 'Santa Catarina' },
  { value: 'SP', label: 'São Paulo' },
  { value: 'SE', label: 'Sergipe' },
  { value: 'TO', label: 'Tocantins' },
]

const JOB_TYPES: SelectOption[] = [
  { value: 'estagio', label: 'Estágio' },
  { value: 'emprego', label: 'Emprego' },
]

const AUDIENCES: SelectOption[] = [
  { value: 'tecnico-ou-superior', label: 'Curso Técnico ou Superior' },
  { value: 'tecnico', label: 'Curso Técnico' },
  { value: 'superior', label: 'Curso Superior' },
]

const JOB_CTA: CallToAction = {
  title: 'Quer conversar antes de cadastrar?',
  description: `O COTEMIG Carreiras atende empresas pelo e-mail ${site.email.careers} e pelo telefone ${site.phone.label}.`,
  label: 'Falar com o COTEMIG Carreiras',
  href: `mailto:${site.email.careers}`,
}

/* ---------------------------------------------------------------------------
   Formulario
   ------------------------------------------------------------------------ */

interface JobPostingValues extends FormValues {
  /* 1. Empresa */
  companyName: string
  cnpj: string
  companyPhone: string
  address: string
  complement: string
  city: string
  state: string
  zip: string
  /* 2. Pessoa de contato */
  contactName: string
  contactRole: string
  contactEmail: string
  contactPhone: string
  /* 3. Vaga */
  jobType: string
  stipend: string
  schedule: string
  minAge: string
  audience: string
  term: string
  role: string
  skills: string
  benefits: string
  notes: string
}

const INITIAL: JobPostingValues = {
  companyName: '',
  cnpj: '',
  companyPhone: '',
  address: '',
  complement: '',
  city: '',
  state: '',
  zip: '',
  contactName: '',
  contactRole: '',
  contactEmail: '',
  contactPhone: '',
  jobType: '',
  stipend: '',
  schedule: '',
  minAge: '',
  audience: '',
  term: '',
  role: '',
  skills: '',
  benefits: '',
  notes: '',
}

/** Caixa de cada etapa. O <legend> numera e nomeia o grupo de campos. */
const FIELDSET = 'min-w-0 rounded-lg border border-ink-200 bg-white p-6 md:p-8'
const LEGEND = 'px-3 font-display text-lg font-bold text-ink-900'

export function JobPostingPage() {
  const validate = useCallback(
    (values: JobPostingValues) =>
      collectErrors({
        companyName: required(values.companyName, 'a razão social'),
        cnpj: validCnpj(values.cnpj),
        companyPhone: validPhone(values.companyPhone),
        address: required(values.address, 'o endereço da empresa'),
        city: required(values.city, 'a cidade'),
        contactName: required(values.contactName, 'o nome da pessoa de contato'),
        contactRole: required(values.contactRole, 'o cargo da pessoa de contato'),
        contactEmail: validEmail(values.contactEmail),
        contactPhone: validPhone(values.contactPhone),
        jobType: required(values.jobType, 'o tipo de vaga'),
        stipend: required(values.stipend, 'o valor da bolsa'),
        schedule: required(values.schedule, 'o horário de trabalho'),
        minAge: required(values.minAge, 'a idade mínima'),
        audience: required(values.audience, 'o público da vaga'),
        role: required(values.role, 'a função a ser exercida'),
        skills: required(values.skills, 'os conhecimentos necessários'),
        benefits: required(values.benefits, 'os benefícios oferecidos'),
      }),
    [],
  )

  const form = useMockForm<JobPostingValues>({ initialValues: INITIAL, validate })

  return (
    <>
      <Seo
        title="Cadastro de vagas para empresas"
        description="Divulgue vagas de estágio e emprego para os alunos do COTEMIG. Cadastre a empresa, a pessoa de contato e as informações da vaga em um único formulário."
        path="/cadastro-de-vagas"
      />

      <PageHero
        breadcrumb={[{ label: 'Início', to: '/' }, { label: 'Cadastro de vagas' }]}
        eyebrow="COTEMIG Carreiras"
        title="Divulgue vagas para os nossos alunos"
        description="Sua empresa cadastra a vaga uma vez e ela chega aos alunos do Colégio e da Faculdade COTEMIG que têm o perfil pedido."
        size="sm"
        actions={
          <Button href="#formulario" size="lg" variant="onDark">
            Ir para o formulário
          </Button>
        }
      />

      <Section spacing="md" ariaLabel="Formas de parceria com o COTEMIG">
        <SectionHeader
          eyebrow="Como funciona"
          title="Duas formas de contar com o COTEMIG"
          description="Escolha só a divulgação ou o acompanhamento completo do estágio. Nos dois casos o cadastro é o mesmo formulário desta página."
          align="start"
        />

        <FeatureGrid features={PARTNERSHIPS} columns={2} />

        <div className="mt-14 rounded-lg border border-ink-200 bg-ink-50 p-7 md:p-8">
          <h3 className="font-display text-lg font-bold text-ink-900">Contato do COTEMIG Carreiras</h3>
          <Prose className="mt-3">
            <p>
              Precisa de ajuda para descrever a vaga ou quer entender o processo antes de
              preencher? Fale com a nossa equipe.
            </p>
          </Prose>
          <ul className="mt-5 flex flex-col gap-3 sm:flex-row sm:gap-8">
            <li>
              <a
                href={`mailto:${site.email.careers}`}
                className="flex items-center gap-3 rounded-sm font-display font-semibold text-ink-800 transition-colors hover:text-brand-700"
              >
                <span className="flex size-10 shrink-0 items-center justify-center rounded-md bg-white text-brand-700">
                  <Icon name="mail" size={18} />
                </span>
                {/* O e-mail nao tem espaco para quebrar: sem isto ele estoura a
                    caixa em telas estreitas e cria rolagem horizontal. */}
                <span className="min-w-0 break-words">{site.email.careers}</span>
              </a>
            </li>
            <li>
              <a
                href={site.phone.href}
                className="flex items-center gap-3 rounded-sm font-display font-semibold text-ink-800 transition-colors hover:text-brand-700"
              >
                <span className="flex size-10 shrink-0 items-center justify-center rounded-md bg-white text-brand-700">
                  <Icon name="phone" size={18} />
                </span>
                {site.phone.label}
              </a>
            </li>
          </ul>
        </div>
      </Section>

      <Section tone="muted" spacing="lg" id="formulario" ariaLabel="Formulário de cadastro de vaga">
        <SectionHeader
          eyebrow="Cadastro"
          title="Informações da vaga"
          description="O formulário tem três etapas: empresa, pessoa de contato e vaga. Os campos marcados com asterisco são obrigatórios."
          align="start"
        />

        {form.submitted ? (
          <FormStatus tone="success" title="Vaga cadastrada!">
            <p>
              Recebemos as informações da vaga. O COTEMIG Carreiras confere os dados e entra em
              contato com a pessoa responsável para confirmar a divulgação.
            </p>
            <button
              type="button"
              onClick={form.reset}
              className="mt-3 rounded-sm font-display font-semibold underline underline-offset-4"
            >
              Cadastrar outra vaga
            </button>
          </FormStatus>
        ) : (
          <form noValidate onSubmit={form.handleSubmit} className="flex flex-col gap-8">
            {/* Etapa 1 -------------------------------------------------- */}
            <fieldset className={FIELDSET}>
              <legend className={LEGEND}>1. Cadastro da empresa</legend>

              <div className="grid gap-6 md:grid-cols-2">
                <Field label="Razão social" required error={form.errors.companyName} wide>
                  {({ id, required: isRequired, invalid, describedBy }) => (
                    <Input
                      id={id}
                      name="companyName"
                      required={isRequired}
                      invalid={invalid}
                      aria-describedby={describedBy}
                      value={form.values.companyName}
                      onChange={(event) => form.setValue('companyName', event.target.value)}
                      autoComplete="organization"
                    />
                  )}
                </Field>

                <Field label="CNPJ" required error={form.errors.cnpj}>
                  {({ id, required: isRequired, invalid, describedBy }) => (
                    <Input
                      id={id}
                      name="cnpj"
                      required={isRequired}
                      invalid={invalid}
                      aria-describedby={describedBy}
                      value={form.values.cnpj}
                      onChange={(event) => form.setValue('cnpj', event.target.value)}
                      placeholder="00.000.000/0000-00"
                      inputMode="numeric"
                    />
                  )}
                </Field>

                <Field label="Telefone" required error={form.errors.companyPhone}>
                  {({ id, required: isRequired, invalid, describedBy }) => (
                    <Input
                      id={id}
                      name="companyPhone"
                      type="tel"
                      required={isRequired}
                      invalid={invalid}
                      aria-describedby={describedBy}
                      value={form.values.companyPhone}
                      onChange={(event) => form.setValue('companyPhone', event.target.value)}
                      placeholder="(31) 3333-3333"
                      autoComplete="tel"
                    />
                  )}
                </Field>

                <Field label="Endereço" required error={form.errors.address}>
                  {({ id, required: isRequired, invalid, describedBy }) => (
                    <Input
                      id={id}
                      name="address"
                      required={isRequired}
                      invalid={invalid}
                      aria-describedby={describedBy}
                      value={form.values.address}
                      onChange={(event) => form.setValue('address', event.target.value)}
                      placeholder="Rua, número e bairro"
                      autoComplete="street-address"
                    />
                  )}
                </Field>

                <Field label="Complemento" hint="Sala, andar ou bloco.">
                  {({ id, describedBy }) => (
                    <Input
                      id={id}
                      name="complement"
                      aria-describedby={describedBy}
                      value={form.values.complement}
                      onChange={(event) => form.setValue('complement', event.target.value)}
                    />
                  )}
                </Field>

                <Field label="Cidade" required error={form.errors.city}>
                  {({ id, required: isRequired, invalid, describedBy }) => (
                    <Input
                      id={id}
                      name="city"
                      required={isRequired}
                      invalid={invalid}
                      aria-describedby={describedBy}
                      value={form.values.city}
                      onChange={(event) => form.setValue('city', event.target.value)}
                      autoComplete="address-level2"
                    />
                  )}
                </Field>

                <Field label="Estado">
                  {({ id, describedBy }) => (
                    <Select
                      id={id}
                      name="state"
                      aria-describedby={describedBy}
                      value={form.values.state}
                      onChange={(event) => form.setValue('state', event.target.value)}
                      placeholder="Escolha o estado"
                      options={STATES}
                    />
                  )}
                </Field>

                <Field label="CEP">
                  {({ id, describedBy }) => (
                    <Input
                      id={id}
                      name="zip"
                      aria-describedby={describedBy}
                      value={form.values.zip}
                      onChange={(event) => form.setValue('zip', event.target.value)}
                      placeholder="00000-000"
                      inputMode="numeric"
                      autoComplete="postal-code"
                    />
                  )}
                </Field>
              </div>
            </fieldset>

            {/* Etapa 2 -------------------------------------------------- */}
            <fieldset className={FIELDSET}>
              <legend className={LEGEND}>2. Pessoa de contato</legend>

              <div className="grid gap-6 md:grid-cols-2">
                <Field label="Nome" required error={form.errors.contactName}>
                  {({ id, required: isRequired, invalid, describedBy }) => (
                    <Input
                      id={id}
                      name="contactName"
                      required={isRequired}
                      invalid={invalid}
                      aria-describedby={describedBy}
                      value={form.values.contactName}
                      onChange={(event) => form.setValue('contactName', event.target.value)}
                      autoComplete="name"
                    />
                  )}
                </Field>

                <Field label="Cargo" required error={form.errors.contactRole}>
                  {({ id, required: isRequired, invalid, describedBy }) => (
                    <Input
                      id={id}
                      name="contactRole"
                      required={isRequired}
                      invalid={invalid}
                      aria-describedby={describedBy}
                      value={form.values.contactRole}
                      onChange={(event) => form.setValue('contactRole', event.target.value)}
                      autoComplete="organization-title"
                    />
                  )}
                </Field>

                <Field label="E-mail" required error={form.errors.contactEmail}>
                  {({ id, required: isRequired, invalid, describedBy }) => (
                    <Input
                      id={id}
                      name="contactEmail"
                      type="email"
                      required={isRequired}
                      invalid={invalid}
                      aria-describedby={describedBy}
                      value={form.values.contactEmail}
                      onChange={(event) => form.setValue('contactEmail', event.target.value)}
                      autoComplete="email"
                    />
                  )}
                </Field>

                <Field label="Telefone" required error={form.errors.contactPhone}>
                  {({ id, required: isRequired, invalid, describedBy }) => (
                    <Input
                      id={id}
                      name="contactPhone"
                      type="tel"
                      required={isRequired}
                      invalid={invalid}
                      aria-describedby={describedBy}
                      value={form.values.contactPhone}
                      onChange={(event) => form.setValue('contactPhone', event.target.value)}
                      placeholder="(31) 99999-9999"
                      autoComplete="tel"
                    />
                  )}
                </Field>
              </div>
            </fieldset>

            {/* Etapa 3 -------------------------------------------------- */}
            <fieldset className={FIELDSET}>
              <legend className={LEGEND}>3. Informações sobre a vaga</legend>

              <div className="grid gap-6 md:grid-cols-2">
                <Field label="Tipo de vaga" required error={form.errors.jobType}>
                  {({ id, required: isRequired, invalid, describedBy }) => (
                    <Select
                      id={id}
                      name="jobType"
                      required={isRequired}
                      invalid={invalid}
                      aria-describedby={describedBy}
                      value={form.values.jobType}
                      onChange={(event) => form.setValue('jobType', event.target.value)}
                      placeholder="Escolha o tipo"
                      options={JOB_TYPES}
                    />
                  )}
                </Field>

                <Field
                  label="Valor da bolsa"
                  required
                  hint="Bolsa-auxílio do estágio ou salário da vaga."
                  error={form.errors.stipend}
                >
                  {({ id, required: isRequired, invalid, describedBy }) => (
                    <Input
                      id={id}
                      name="stipend"
                      required={isRequired}
                      invalid={invalid}
                      aria-describedby={describedBy}
                      value={form.values.stipend}
                      onChange={(event) => form.setValue('stipend', event.target.value)}
                      placeholder="R$ 1.200,00"
                    />
                  )}
                </Field>

                <Field label="Horário de trabalho" required error={form.errors.schedule}>
                  {({ id, required: isRequired, invalid, describedBy }) => (
                    <Input
                      id={id}
                      name="schedule"
                      required={isRequired}
                      invalid={invalid}
                      aria-describedby={describedBy}
                      value={form.values.schedule}
                      onChange={(event) => form.setValue('schedule', event.target.value)}
                      placeholder="Segunda a sexta, das 13h às 19h"
                    />
                  )}
                </Field>

                <Field label="Idade mínima" required error={form.errors.minAge}>
                  {({ id, required: isRequired, invalid, describedBy }) => (
                    <Input
                      id={id}
                      name="minAge"
                      required={isRequired}
                      invalid={invalid}
                      aria-describedby={describedBy}
                      value={form.values.minAge}
                      onChange={(event) => form.setValue('minAge', event.target.value)}
                      placeholder="16"
                      inputMode="numeric"
                    />
                  )}
                </Field>

                <Field label="Público" required error={form.errors.audience}>
                  {({ id, required: isRequired, invalid, describedBy }) => (
                    <Select
                      id={id}
                      name="audience"
                      required={isRequired}
                      invalid={invalid}
                      aria-describedby={describedBy}
                      value={form.values.audience}
                      onChange={(event) => form.setValue('audience', event.target.value)}
                      placeholder="Escolha o público"
                      options={AUDIENCES}
                    />
                  )}
                </Field>

                <Field label="Série ou período" hint="Se a vaga exigir uma etapa específica do curso.">
                  {({ id, describedBy }) => (
                    <Input
                      id={id}
                      name="term"
                      aria-describedby={describedBy}
                      value={form.values.term}
                      onChange={(event) => form.setValue('term', event.target.value)}
                      placeholder="A partir do 3º período"
                    />
                  )}
                </Field>

                <Field label="Função a ser exercida" required error={form.errors.role} wide>
                  {({ id, required: isRequired, invalid, describedBy }) => (
                    <Textarea
                      id={id}
                      name="role"
                      rows={4}
                      required={isRequired}
                      invalid={invalid}
                      aria-describedby={describedBy}
                      value={form.values.role}
                      onChange={(event) => form.setValue('role', event.target.value)}
                    />
                  )}
                </Field>

                <Field
                  label="Conhecimentos necessários"
                  required
                  hint="Linguagens, ferramentas, idiomas e certificações."
                  error={form.errors.skills}
                  wide
                >
                  {({ id, required: isRequired, invalid, describedBy }) => (
                    <Textarea
                      id={id}
                      name="skills"
                      rows={4}
                      required={isRequired}
                      invalid={invalid}
                      aria-describedby={describedBy}
                      value={form.values.skills}
                      onChange={(event) => form.setValue('skills', event.target.value)}
                    />
                  )}
                </Field>

                <Field label="Benefícios" required error={form.errors.benefits} wide>
                  {({ id, required: isRequired, invalid, describedBy }) => (
                    <Textarea
                      id={id}
                      name="benefits"
                      rows={3}
                      required={isRequired}
                      invalid={invalid}
                      aria-describedby={describedBy}
                      value={form.values.benefits}
                      onChange={(event) => form.setValue('benefits', event.target.value)}
                      placeholder="Vale-transporte, vale-refeição, plano de saúde…"
                    />
                  )}
                </Field>

                <Field label="Observações" wide>
                  {({ id, describedBy }) => (
                    <Textarea
                      id={id}
                      name="notes"
                      rows={3}
                      aria-describedby={describedBy}
                      value={form.values.notes}
                      onChange={(event) => form.setValue('notes', event.target.value)}
                    />
                  )}
                </Field>
              </div>
            </fieldset>

            <div>
              <Button type="submit" size="lg" disabled={form.submitting}>
                {form.submitting ? 'Enviando…' : 'Cadastrar vaga'}
              </Button>
            </div>
          </form>
        )}
      </Section>

      <CtaBand cta={JOB_CTA} />
    </>
  )
}
