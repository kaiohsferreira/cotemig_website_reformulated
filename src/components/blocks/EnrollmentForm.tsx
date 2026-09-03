import { useCallback } from 'react'
import { courses } from '~/data/courses'
import { site } from '~/data/site'
import type { InstitutionSlug } from '~/data/types'
import { Button } from '~/components/ui/Button'
import { Field, FormStatus, Input, Select, Textarea } from '~/components/ui/Form'
import { Icon } from '~/components/ui/Icon'
import {
  collectErrors,
  required,
  useMockForm,
  validEmail,
  validPhone,
} from '~/hooks/useMockForm'
import type { FormValues } from '~/hooks/useMockForm'

interface EnrollmentValues extends FormValues {
  name: string
  guardian: string
  email: string
  phone: string
  course: string
  message: string
}

const INITIAL: EnrollmentValues = {
  name: '',
  guardian: '',
  email: '',
  phone: '',
  course: '',
  message: '',
}

export interface EnrollmentFormProps {
  /** Restringe as opcoes de curso a uma instituicao. */
  institution?: InstitutionSlug
  /** Pre-seleciona um curso. */
  defaultCourse?: string
  title?: string
  description?: string
}

/**
 * Formulario "Faça parte do COTEMIG".
 *
 * Um componente so para o bloco que o site atual repete em seis paginas com
 * marcacao duplicada.
 */
export function EnrollmentForm({
  institution,
  defaultCourse,
  title = 'Faça parte do COTEMIG',
  description = 'Preencha o formulário e nossa equipe entra em contato com você. Se preferir, ligue para ' +
    `${site.phone.label}.`,
}: EnrollmentFormProps) {
  const options = courses
    .filter((course) => !institution || course.institution === institution)
    .map((course) => ({ value: course.slug, label: course.name }))

  const validate = useCallback(
    (values: EnrollmentValues) =>
      collectErrors({
        name: required(values.name, 'o nome do aluno'),
        email: validEmail(values.email),
        phone: validPhone(values.phone),
        course: required(values.course, 'o curso de interesse'),
      }),
    [],
  )

  const form = useMockForm<EnrollmentValues>({
    initialValues: { ...INITIAL, course: defaultCourse ?? '' },
    validate,
  })

  return (
    <div className="grid gap-12 lg:grid-cols-[minmax(0,26rem)_minmax(0,1fr)] lg:gap-16">
      <div>
        <h2 className="text-display-sm text-ink-900">{title}</h2>
        <p className="mt-5 text-lg text-ink-600">{description}</p>

        <ul className="mt-8 flex flex-col gap-4">
          <li>
            <a
              href={site.phone.href}
              className="flex items-center gap-3 rounded-sm font-display font-semibold text-ink-800 transition-colors hover:text-brand-700"
            >
              <span className="flex size-10 items-center justify-center rounded-md bg-brand-50 text-brand-700">
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
              <span className="flex size-10 items-center justify-center rounded-md bg-brand-50 text-brand-700">
                <Icon name="whatsapp" size={18} />
              </span>
              WhatsApp
            </a>
          </li>
        </ul>
      </div>

      {form.submitted ? (
        <FormStatus tone="success" title="Recebemos os seus dados!">
          <p>
            Nossa equipe entra em contato pelo e-mail ou telefone informados. Enquanto isso, você
            pode falar com a gente pelo WhatsApp.
          </p>
          <button
            type="button"
            onClick={form.reset}
            className="mt-3 rounded-sm font-display font-semibold underline underline-offset-4"
          >
            Enviar outra mensagem
          </button>
        </FormStatus>
      ) : (
        <form noValidate onSubmit={form.handleSubmit} className="grid gap-6 md:grid-cols-2">
          <Field label="Aluno" required error={form.errors.name}>
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

          <Field label="Responsável" hint="Se o aluno for menor de 18 anos.">
            {({ id, describedBy }) => (
              <Input
                id={id}
                name="guardian"
                aria-describedby={describedBy}
                value={form.values.guardian}
                onChange={(event) => form.setValue('guardian', event.target.value)}
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

          <Field label="Curso de interesse" required error={form.errors.course} wide>
            {({ id, required: isRequired, invalid, describedBy }) => (
              <Select
                id={id}
                name="course"
                required={isRequired}
                invalid={invalid}
                aria-describedby={describedBy}
                value={form.values.course}
                onChange={(event) => form.setValue('course', event.target.value)}
                placeholder="Escolha o curso de sua preferência"
                options={options}
              />
            )}
          </Field>

          <Field label="Mensagem" wide>
            {({ id, describedBy }) => (
              <Textarea
                id={id}
                name="message"
                aria-describedby={describedBy}
                value={form.values.message}
                onChange={(event) => form.setValue('message', event.target.value)}
              />
            )}
          </Field>

          <div className="md:col-span-2">
            <Button type="submit" size="lg" disabled={form.submitting}>
              {form.submitting ? 'Enviando…' : 'Enviar'}
            </Button>
          </div>
        </form>
      )}
    </div>
  )
}
