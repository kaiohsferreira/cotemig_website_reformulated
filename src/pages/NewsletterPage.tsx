import { useCallback, useId } from 'react'
import { Link } from 'react-router-dom'
import { Seo } from '~/components/Seo'
import { PageHero } from '~/components/blocks/PageHero'
import { FeatureGrid } from '~/components/blocks/FeatureGrid'
import { CtaBand } from '~/components/blocks/CtaBand'
import { PostCard } from '~/components/blocks/Cards'
import { Section, SectionHeader } from '~/components/ui/Section'
import { Button } from '~/components/ui/Button'
import { Icon } from '~/components/ui/Icon'
import { Checkbox, Field, FormStatus, Input } from '~/components/ui/Form'
import { collectErrors, required, useMockForm, validEmail } from '~/hooks/useMockForm'
import type { FormValues } from '~/hooks/useMockForm'
import { externalLinks, site } from '~/data/site'
import { latestPosts } from '~/data/posts'
import type { CallToAction, Feature } from '~/data/types'

/**
 * O que a assinatura entrega.
 *
 * No site atual a pagina /newsletter renderiza so o breadcrumb: quem clica no
 * menu ou no rodape cai num vazio e volta. Aqui a promessa vem antes do campo
 * de e-mail — ninguem assina o que nao sabe o que e.
 */
const BENEFITS: Feature[] = [
  {
    icon: 'graduation',
    title: 'Novidades do COTEMIG',
    description:
      'Projetos dos alunos, conquistas das equipes, eventos abertos à comunidade e o que muda a cada semestre no Colégio e na Faculdade.',
  },
  {
    icon: 'search',
    title: 'Tecnologia e carreira',
    description:
      'Conteúdo prático sobre as áreas que o mercado procura, linguagens, certificações e como dar os primeiros passos na profissão.',
  },
  {
    icon: 'calendar',
    title: 'Datas de vestibular e matrícula',
    description:
      'Aviso com antecedência da abertura das inscrições, das provas do vestibular e dos prazos de matrícula e rematrícula.',
  },
]

/** Garantias que reduzem o atrito do formulario. */
const ASSURANCES: string[] = [
  'Uma edição por mês, sem enxurrada de e-mail.',
  'Só conteúdo do COTEMIG — não repassamos o seu e-mail para terceiros.',
  'Cancele quando quiser: todo envio traz um link de descadastro.',
]

const NEWSLETTER_CTA: CallToAction = {
  title: 'Não quer esperar a próxima edição?',
  description:
    'As inscrições do vestibular e as matrículas acontecem o ano todo no portal do COTEMIG. Consulte as datas abertas agora mesmo.',
  label: 'Ver o vestibular',
  href: externalLinks.entranceExam,
}

interface NewsletterValues extends FormValues {
  name: string
  email: string
  /** "sim" quando o consentimento LGPD esta marcado; vazio quando nao. */
  consent: string
}

const INITIAL: NewsletterValues = {
  name: '',
  email: '',
  consent: '',
}

export function NewsletterPage() {
  const consentErrorId = useId()
  const samplePosts = latestPosts(3)

  const validate = useCallback(
    (values: NewsletterValues) =>
      collectErrors({
        name: required(values.name, 'o seu nome'),
        email: validEmail(values.email),
        // O consentimento e campo obrigatorio de verdade, nao enfeite: sem ele
        // nao existe base legal para enviar e-mail de marketing (LGPD, art. 7º).
        consent:
          values.consent === 'sim'
            ? null
            : 'Para receber a newsletter, é preciso concordar com o Aviso de Proteção de Dados.',
      }),
    [],
  )

  const form = useMockForm<NewsletterValues>({ initialValues: INITIAL, validate })

  return (
    <>
      <Seo
        title="Newsletter"
        description="Assine a newsletter do COTEMIG e receba novidades do grupo, conteúdo sobre tecnologia e carreira e as datas de vestibular e matrícula."
        path="/newsletter"
      />

      <PageHero
        breadcrumb={[{ label: 'Início', to: '/' }, { label: 'Newsletter' }]}
        eyebrow="Newsletter"
        title="As novidades do COTEMIG chegam antes no seu e-mail"
        description="Uma edição por mês com o que acontece no Colégio e na Faculdade, conteúdo sobre tecnologia e carreira e o calendário de vestibular e matrícula."
        actions={
          <Button
            href="#assinar"
            size="lg"
            trailingIcon={<Icon name="arrow-right" size={18} />}
          >
            Quero assinar
          </Button>
        }
      />

      <Section>
        <SectionHeader
          eyebrow="O que você recebe"
          title="Três coisas em cada edição"
          description="Nada de propaganda genérica: a newsletter é escrita pela equipe do COTEMIG para quem estuda, ensina ou pretende estudar aqui."
        />
        <FeatureGrid features={BENEFITS} />
      </Section>

      <Section tone="muted" id="assinar">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,26rem)_minmax(0,1fr)] lg:gap-16">
          <div>
            <h2 className="text-display-sm text-ink-900">Assine a newsletter</h2>
            <p className="mt-5 text-lg text-ink-600">
              Preencha o nome e o e-mail. A primeira edição chega na próxima remessa mensal.
            </p>

            <ul className="mt-8 flex flex-col gap-4">
              {ASSURANCES.map((item) => (
                <li key={item} className="flex items-start gap-3 text-ink-600">
                  <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-700">
                    <Icon name="check" size={16} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>

            <p className="mt-8 text-sm text-ink-500">
              Dúvidas sobre o uso dos seus dados? Escreva para{' '}
              <a
                href={`mailto:${site.email.dpo}`}
                className="rounded-sm font-semibold text-brand-700 underline underline-offset-4"
              >
                {site.email.dpo}
              </a>
              .
            </p>
          </div>

          <div className="rounded-lg border border-ink-200 bg-white p-6 shadow-card md:p-8">
            {form.submitted ? (
              <FormStatus tone="success" title="Assinatura confirmada!">
                <p>
                  Pronto, {form.values.name.trim().split(' ')[0]}. Guardamos o seu e-mail e a
                  próxima edição da newsletter vai para {form.values.email}. Enquanto ela não
                  chega, dê uma olhada no blog.
                </p>
                <button
                  type="button"
                  onClick={form.reset}
                  className="mt-3 rounded-sm font-display font-semibold underline underline-offset-4"
                >
                  Cadastrar outro e-mail
                </button>
              </FormStatus>
            ) : (
              <form noValidate onSubmit={form.handleSubmit} className="flex flex-col gap-6">
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
                      placeholder="nome@exemplo.com"
                    />
                  )}
                </Field>

                <div>
                  <Checkbox
                    name="consent"
                    required
                    checked={form.values.consent === 'sim'}
                    onChange={(event) =>
                      form.setValue('consent', event.target.checked ? 'sim' : '')
                    }
                    aria-invalid={Boolean(form.errors.consent) || undefined}
                    aria-describedby={form.errors.consent ? consentErrorId : undefined}
                    label={
                      <>
                        Autorizo o COTEMIG a me enviar a newsletter e a tratar os meus dados de
                        acordo com o Aviso de Proteção de Dados. <span aria-hidden="true">*</span>
                        <span className="sr-only"> (obrigatório)</span>
                      </>
                    }
                  />

                  {/* O link fica FORA do <label>: conteudo interativo dentro de label e
                      invalido no modelo de conteudo do HTML e, na pratica, faz o toque no
                      meio da frase levar embora o formulario ja preenchido. O recuo casa
                      com o texto do checkbox (size-5 + gap-3 = 2rem). */}
                  <p className="mt-2 pl-8 text-sm">
                    <Link
                      to="/aviso-protecao-dados"
                      className="rounded-sm font-semibold text-brand-700 underline underline-offset-4"
                    >
                      Ler o Aviso de Proteção de Dados
                    </Link>
                  </p>

                  {form.errors.consent ? (
                    <p
                      id={consentErrorId}
                      className="mt-3 flex items-center gap-1.5 text-sm font-semibold text-danger-700"
                    >
                      <Icon name="alert" size={16} />
                      {form.errors.consent}
                    </p>
                  ) : null}
                </div>

                <div>
                  <Button type="submit" size="lg" disabled={form.submitting}>
                    {form.submitting ? 'Enviando…' : 'Assinar a newsletter'}
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      </Section>

      <Section>
        <SectionHeader
          eyebrow="#issoacontecenocotemig"
          title="Uma amostra do que sai na newsletter"
          description="As últimas publicações do blog — o mesmo tipo de conteúdo que chega por e-mail."
          align="start"
          action={
            <Button
              to="/blog"
              variant="secondary"
              trailingIcon={<Icon name="arrow-right" size={18} />}
            >
              Ver todas
            </Button>
          }
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {samplePosts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </Section>

      <CtaBand cta={NEWSLETTER_CTA} />
    </>
  )
}
