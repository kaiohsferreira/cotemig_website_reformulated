import { useCallback } from 'react'
import { Link } from 'react-router-dom'
import { Seo } from '~/components/Seo'
import { CtaBand } from '~/components/blocks/CtaBand'
import { PageHero } from '~/components/blocks/PageHero'
import { Button } from '~/components/ui/Button'
import { Field, FormStatus, Input, Select, Textarea } from '~/components/ui/Form'
import type { SelectOption } from '~/components/ui/Form'
import { Icon } from '~/components/ui/Icon'
import { Section } from '~/components/ui/Section'
import { site } from '~/data/site'
import { units } from '~/data/units'
import type { CallToAction } from '~/data/types'
import {
  collectErrors,
  required,
  useMockForm,
  validEmail,
  validPhone,
} from '~/hooks/useMockForm'
import type { FormValues } from '~/hooks/useMockForm'

/* ---------------------------------------------------------------------------
   Conteudo
   ------------------------------------------------------------------------ */

/**
 * Assuntos do formulario de contato.
 *
 * Mesma lista do site atual, com a grafia corrigida: la o rotulo saia como
 * "Atedimento", erro que se repetia nas tres opcoes de atendimento.
 */
const SUBJECTS: SelectOption[] = [
  { value: 'matricula-tecnicos', label: 'Matrícula cursos Técnicos' },
  { value: 'vestibular', label: 'Vestibular' },
  { value: 'estagios', label: 'Setor de Estágios' },
  { value: 'atendimento-barroca', label: 'Atendimento Colégio COTEMIG Barroca' },
  { value: 'atendimento-floresta', label: 'Atendimento Colégio COTEMIG Floresta' },
  { value: 'atendimento-faculdade', label: 'Atendimento Faculdade COTEMIG' },
  { value: 'rh', label: 'Setor RH' },
  { value: 'outros', label: 'Outros' },
]

const CONTACT_CTA: CallToAction = {
  title: 'Prefere resolver agora?',
  description:
    'O WhatsApp do COTEMIG atende matrícula, vestibular e dúvidas sobre os cursos sem fila de espera.',
  label: site.whatsapp.label,
  href: site.whatsapp.href,
}

/* ---------------------------------------------------------------------------
   Formulario
   ------------------------------------------------------------------------ */

interface ContactValues extends FormValues {
  name: string
  email: string
  phone: string
  subject: string
  message: string
}

const INITIAL: ContactValues = {
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
}

export function ContactPage() {
  const validate = useCallback(
    (values: ContactValues) =>
      collectErrors({
        name: required(values.name, 'o seu nome'),
        email: validEmail(values.email),
        phone: validPhone(values.phone),
        subject: required(values.subject, 'o assunto da mensagem'),
      }),
    [],
  )

  const form = useMockForm<ContactValues>({ initialValues: INITIAL, validate })

  return (
    <>
      <Seo
        title="Contato e ouvidoria"
        description="Fale com o COTEMIG: telefone, WhatsApp, horários de atendimento e endereço das três unidades em Belo Horizonte. Envie sua mensagem pelo formulário."
        path="/contato"
      />

      <PageHero
        breadcrumb={[{ label: 'Início', to: '/' }, { label: 'Contato' }]}
        eyebrow="Fale com a gente"
        title="Contato e ouvidoria"
        description="Escolha o assunto, conte o que você precisa e nossa equipe responde pelo canal que você preferir."
        size="sm"
      />

      <Section spacing="lg" ariaLabel="Canais de contato do COTEMIG">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,23rem)] lg:gap-16">
          {/* Coluna do formulario */}
          <div>
            <h2 className="text-display-sm text-ink-900">Envie uma mensagem</h2>
            <p className="mt-4 max-w-2xl text-lg text-ink-600">
              Os campos marcados com asterisco são obrigatórios. Escolha o assunto certo para a
              mensagem chegar direto ao setor responsável.
            </p>

            {form.submitted ? (
              <div className="mt-10">
                <FormStatus tone="success" title="Mensagem enviada!">
                  <p>
                    Recebemos o seu contato e vamos responder pelo e-mail ou telefone informados.
                    Se for urgente, ligue para {site.phone.label}.
                  </p>
                  <button
                    type="button"
                    onClick={form.reset}
                    className="mt-3 rounded-sm font-display font-semibold underline underline-offset-4"
                  >
                    Enviar outra mensagem
                  </button>
                </FormStatus>
              </div>
            ) : (
              <form
                noValidate
                onSubmit={form.handleSubmit}
                className="mt-10 grid gap-6 md:grid-cols-2"
              >
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

                <Field label="Telefone" required error={form.errors.phone}>
                  {({ id, required: isRequired, invalid, describedBy }) => (
                    <Input
                      id={id}
                      name="phone"
                      type="tel"
                      required={isRequired}
                      invalid={invalid}
                      aria-describedby={describedBy}
                      value={form.values.phone}
                      onChange={(event) => form.setValue('phone', event.target.value)}
                      placeholder="(31) 99999-9999"
                      autoComplete="tel"
                    />
                  )}
                </Field>

                <Field label="Assunto" required error={form.errors.subject}>
                  {({ id, required: isRequired, invalid, describedBy }) => (
                    <Select
                      id={id}
                      name="subject"
                      required={isRequired}
                      invalid={invalid}
                      aria-describedby={describedBy}
                      value={form.values.subject}
                      onChange={(event) => form.setValue('subject', event.target.value)}
                      placeholder="Escolha o assunto"
                      options={SUBJECTS}
                    />
                  )}
                </Field>

                <Field
                  label="Mensagem"
                  hint="Conte o que você precisa. Quanto mais detalhes, mais rápida é a resposta."
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
                    {form.submitting ? 'Enviando…' : 'Enviar mensagem'}
                  </Button>
                </div>
              </form>
            )}
          </div>

          {/* Coluna de atendimento */}
          <aside className="flex flex-col gap-8 rounded-lg border border-ink-200 bg-ink-50 p-7 md:p-8">
            <div>
              <h2 className="font-display text-xl font-bold text-ink-900">Atendimento direto</h2>
              <ul className="mt-5 flex flex-col gap-4">
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
                <li>
                  <a
                    href={site.whatsapp.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 rounded-sm font-display font-semibold text-ink-800 transition-colors hover:text-brand-700"
                  >
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-md bg-white text-brand-700">
                      <Icon name="whatsapp" size={18} />
                    </span>
                    WhatsApp
                  </a>
                </li>
              </ul>
            </div>

            <div className="border-t border-ink-200 pt-8">
              <h3 className="flex items-center gap-2 font-display text-lg font-bold text-ink-900">
                <Icon name="clock" size={20} />
                Horário da central
              </h3>
              <p className="mt-4 text-ink-600">
                {site.serviceHours}. Cada unidade tem o próprio horário de secretaria — confira na
                página dela.
              </p>
            </div>

            <div className="border-t border-ink-200 pt-8">
              <h3 className="flex items-center gap-2 font-display text-lg font-bold text-ink-900">
                <Icon name="pin" size={20} />
                Nossas unidades
              </h3>
              <ul className="mt-4 flex flex-col gap-5">
                {units.map((unit) => (
                  <li key={unit.slug}>
                    <p className="font-display text-sm font-semibold text-ink-800">{unit.name}</p>
                    <p className="mt-1 text-ink-600">
                      {unit.address} — {unit.district}
                      <br />
                      {unit.city}/MG, CEP {unit.cep}
                    </p>
                    <Link
                      to={`/unidades/${unit.slug}`}
                      className="mt-1 inline-block rounded-sm font-display text-sm font-semibold text-brand-700 underline underline-offset-4 hover:text-brand-800"
                    >
                      Ver a unidade
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </Section>

      <CtaBand cta={CONTACT_CTA} />
    </>
  )
}
