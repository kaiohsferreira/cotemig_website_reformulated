import { Seo } from '~/components/Seo'
import { PageHero } from '~/components/blocks/PageHero'
import { Paragraphs, Prose } from '~/components/blocks/Prose'
import { Section } from '~/components/ui/Section'
import { Accordion } from '~/components/ui/Accordion'
import { Button } from '~/components/ui/Button'
import { Icon } from '~/components/ui/Icon'
import { privacyNotice } from '~/data/legal'
import { site } from '~/data/site'
import { formatLongDate } from '~/lib/format'

export function PrivacyPage() {
  /**
   * Sumario do documento.
   *
   * O mesmo bloco serve ao aside pegajoso do desktop e ao accordion do mobile.
   * Como cada um dos dois envolucros e escondido com `display: none` no outro
   * tamanho de tela, so um chega a arvore de acessibilidade por vez — nao ha
   * navegacao duplicada para leitor de tela.
   */
  const summaryLinks = (
    <ul className="flex flex-col border-l border-ink-200">
      {privacyNotice.sections.map((section) => (
        <li key={section.id}>
          <a
            href={`#${section.id}`}
            className="-ml-px block border-l-2 border-transparent py-2 pl-4 text-sm text-ink-600 transition-colors duration-200 hover:border-brand-500 hover:text-brand-700"
          >
            {section.title}
          </a>
        </li>
      ))}
    </ul>
  )

  return (
    <>
      <Seo
        title={privacyNotice.title}
        description="Saiba como o Grupo COTEMIG coleta, usa, compartilha e protege os seus dados pessoais, e como exercer os direitos previstos na LGPD."
        path="/aviso-protecao-dados"
      />

      <PageHero
        breadcrumb={[{ label: 'Início', to: '/' }, { label: privacyNotice.title }]}
        eyebrow="Privacidade"
        title={privacyNotice.title}
        description="Quais dados seus nós tratamos, para quê, com quem compartilhamos e como você exerce os seus direitos como titular."
        size="sm"
      >
        {privacyNotice.updatedAt ? (
          <p className="mt-8 text-sm text-ink-300">
            Última atualização em {formatLongDate(privacyNotice.updatedAt)}.
          </p>
        ) : null}
      </PageHero>

      <Section spacing="md">
        {/* `grid-cols-[minmax(0,1fr)]` no mobile trava a coluna na largura do
            container. Sem isso a coluna e `auto`, cresce ate o min-content do
            filho mais largo, e o documento inteiro passa a rolar de lado. */}
        <div className="grid grid-cols-[minmax(0,1fr)] gap-12 lg:grid-cols-[minmax(0,17rem)_minmax(0,1fr)] lg:gap-16">
          {/* Sumario do mobile. O h2 invisivel mantem a hierarquia de titulos
              coerente: o accordion abre um h3 e as secoes voltam para h2. */}
          <div className="lg:hidden">
            <h2 className="sr-only">Sumário do documento</h2>
            <nav aria-label="Sumário do documento">
              <Accordion items={[{ title: 'Ir para uma seção', content: summaryLinks }]} />
            </nav>
          </div>

          {/* Sumario do desktop: acompanha a rolagem do documento longo. */}
          <aside className="hidden lg:block">
            <div className="sticky top-28">
              <p className="mb-4 text-eyebrow uppercase text-brand-700">Neste documento</p>
              <nav aria-label="Sumário do documento">{summaryLinks}</nav>
            </div>
          </aside>

          <div>
            <Paragraphs items={privacyNotice.intro} />

            <div className="mt-14 flex flex-col gap-14">
              {privacyNotice.sections.map((section) => (
                <section key={section.id} id={section.id}>
                  <h2 className="text-display-sm text-ink-900">{section.title}</h2>

                  <Prose className="mt-5">
                    {section.blocks.map((block, index) =>
                      block.type === 'paragraph' ? (
                        <p key={index}>{block.text}</p>
                      ) : (
                        <ul
                          key={index}
                          className="list-disc space-y-3 pl-6 marker:text-brand-700"
                        >
                          {block.items.map((item) => (
                            // `break-words` impede que as URLs longas da secao de
                            // cookies estourem a largura da coluna no mobile.
                            <li key={item} className="break-words">
                              {item}
                            </li>
                          ))}
                        </ul>
                      ),
                    )}
                  </Prose>
                </section>
              ))}
            </div>

            {/* Contato do encarregado (DPO). Fecha o documento com a acao que a
                LGPD exige que esteja sempre disponivel ao titular. */}
            <div className="mt-14 rounded-lg border border-ink-200 bg-ink-50 p-6 md:p-8">
              {/* Empilha no celular: o quadrado do icone come 3rem de uma coluna que
                  no aparelho estreito ja e curta, e o botao fica sem largura. */}
              <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:gap-4">
                <span className="flex size-12 shrink-0 items-center justify-center rounded-md bg-brand-50 text-brand-700">
                  <Icon name="mail" size={22} />
                </span>
                <div>
                  <h2 className="font-display text-xl font-bold text-ink-900">
                    Encarregado pela proteção de dados
                  </h2>
                  {/* O endereco fica no texto, e nao dentro do botao: `dpo@cotemig.com.br`
                      e uma palavra que o navegador nao quebra e, num botao de altura
                      fixa, estoura a caixa no celular. */}
                  <p className="mt-3 text-ink-600">
                    Dúvidas, pedidos de acesso, correção ou exclusão dos seus dados, e qualquer
                    assunto ligado a este Aviso falam com o nosso Encarregado (DPO), pelo e-mail{' '}
                    <span className="font-semibold text-ink-800">{site.email.dpo}</span>.
                    Respondemos a todas as solicitações.
                  </p>
                  <div className="mt-6">
                    <Button
                      href={`mailto:${site.email.dpo}`}
                      leadingIcon={<Icon name="mail" size={18} />}
                    >
                      Escrever para o Encarregado
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </>
  )
}
