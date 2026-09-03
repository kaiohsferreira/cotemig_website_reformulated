import { Seo } from '~/components/Seo'
import { Card } from '~/components/ui/Card'
import { Button } from '~/components/ui/Button'
import { Icon } from '~/components/ui/Icon'
import type { IconName } from '~/components/ui/Icon'
import { institutions } from '~/data/institutions'
import { asset } from '~/lib/asset'
import { cn } from '~/lib/cn'

const LOGO = asset('/img/logo-white.svg')

interface ExitLink {
  to: string
  icon: IconName
  title: string
  description: string
  accent: 'brand' | 'faculty'
}

/**
 * Fim de linha com saida.
 *
 * Este componente e usado de duas formas: como rota curinga dentro do
 * SiteLayout e como `errorElement` do router — que renderiza FORA do layout,
 * sem header nem rodape. Por isso ele nao usa hook de rota nem depende de
 * nada do layout: traz a propria marca, o proprio fundo e os proprios
 * caminhos de saida. Serve tambem de fallback dentro de outras paginas quando
 * um slug de curso, unidade ou post nao resolve.
 */
export function NotFoundPage() {
  const exits: ExitLink[] = [
    ...institutions.map((institution) => ({
      to: `/ensino/${institution.slug}`,
      icon: 'graduation' as IconName,
      title: institution.name,
      description: institution.tagline,
      accent: institution.accent,
    })),
    {
      to: '/unidades',
      icon: 'pin',
      title: 'Unidades',
      description: 'Endereço, horários, linhas de ônibus e tour virtual das nossas unidades.',
      accent: 'brand',
    },
    {
      to: '/blog',
      icon: 'calendar',
      title: 'Blog',
      description: 'Notícias, projetos dos alunos e conteúdo sobre tecnologia e carreira.',
      accent: 'brand',
    },
    {
      to: '/quem-somos',
      icon: 'clock',
      title: 'Quem somos',
      description: 'Mais de 55 anos formando profissionais de tecnologia em Belo Horizonte.',
      accent: 'brand',
    },
    {
      to: '/contato',
      icon: 'mail',
      title: 'Contato e ouvidoria',
      description: 'Fale com a nossa equipe por telefone, WhatsApp ou formulário.',
      accent: 'brand',
    },
  ]

  return (
    <>
      <Seo
        title="Página não encontrada"
        description="A página que você procurou não existe ou mudou de endereço. Veja os caminhos para os cursos, unidades, blog e contato do COTEMIG."
        path="/404"
      />
      {/* Pagina de erro nao deve entrar no indice de busca. */}
      <meta name="robots" content="noindex" />

      <section className="surface-ink">
        <div className="container-shell py-20 md:py-28">
          <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
            <img src={LOGO} alt="COTEMIG" className="h-10 w-auto" />

            <p className="mt-10 text-eyebrow uppercase text-brand-300">Erro 404</p>
            <h1 className="mt-4 text-display-lg text-white">Página não encontrada</h1>
            <p className="mt-6 text-lg text-ink-200">
              O endereço que você abriu não existe, saiu do ar ou mudou de lugar na reformulação do
              site. Nada se perdeu: os caminhos abaixo levam ao conteúdo que provavelmente você
              procurava.
            </p>

            <div className="mt-9">
              <Button
                to="/"
                size="lg"
                variant="onDark"
                trailingIcon={<Icon name="arrow-right" size={18} />}
              >
                Ir para a página inicial
              </Button>
            </div>
          </div>

          <h2 className="mt-16 text-center font-display text-xl font-bold text-white md:mt-20">
            Ou continue por aqui
          </h2>

          <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {exits.map((exit) => (
              <li key={exit.to} className="flex">
                <Card to={exit.to} tone="ink" className="w-full">
                  <span
                    className={cn(
                      'mb-5 flex size-12 items-center justify-center rounded-md bg-white/10',
                      exit.accent === 'faculty' ? 'text-faculty-300' : 'text-brand-300',
                    )}
                  >
                    <Icon name={exit.icon} size={24} />
                  </span>

                  <h3 className="font-display text-lg font-bold text-white">{exit.title}</h3>
                  <p className="mt-2.5 flex-1 text-ink-300">{exit.description}</p>

                  <span className="mt-5 inline-flex items-center gap-2 font-display text-sm font-semibold text-brand-300">
                    Acessar
                    <span className="transition-transform duration-200 group-hover:translate-x-1">
                      <Icon name="arrow-right" size={16} />
                    </span>
                  </span>
                </Card>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}
