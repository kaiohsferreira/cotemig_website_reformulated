import { createBrowserRouter } from 'react-router-dom'
import { SiteLayout } from '~/components/layout/SiteLayout'
import { HomePage } from '~/pages/HomePage'
import { NotFoundPage } from '~/pages/NotFoundPage'
import { RouteFallback } from '~/components/layout/RouteFallback'

/**
 * Rotas do site.
 *
 * Os caminhos sao os mesmos do site atual de proposito: qualquer link ja
 * publicado, indexado ou impresso continua funcionando depois do redesign.
 *
 * Home e 404 entram no bundle principal — a home porque e o ponto de entrada,
 * a 404 porque as outras paginas a renderizam quando um slug nao resolve. O
 * resto chega por `lazy`, entao quem abre a home nao baixa o formulario de
 * cadastro de vagas nem o texto inteiro da LGPD.
 */
export const router = createBrowserRouter([
  {
    path: '/',
    element: <SiteLayout />,
    errorElement: <NotFoundPage />,
    hydrateFallbackElement: <RouteFallback />,
    children: [
      { index: true, element: <HomePage /> },

      {
        path: 'ensino/:institutionSlug',
        lazy: async () => ({ Component: (await import('~/pages/InstitutionPage')).InstitutionPage }),
      },
      {
        path: 'ensino/:institutionSlug/curso/:courseSlug',
        lazy: async () => ({ Component: (await import('~/pages/CoursePage')).CoursePage }),
      },

      {
        path: 'unidades',
        lazy: async () => ({ Component: (await import('~/pages/UnitsPage')).UnitsPage }),
      },
      {
        path: 'unidades/:unitSlug',
        lazy: async () => ({ Component: (await import('~/pages/UnitPage')).UnitPage }),
      },

      {
        path: 'blog',
        lazy: async () => ({ Component: (await import('~/pages/BlogPage')).BlogPage }),
      },
      {
        path: 'blog/:postSlug',
        lazy: async () => ({ Component: (await import('~/pages/PostPage')).PostPage }),
      },

      {
        path: 'quem-somos',
        lazy: async () => ({ Component: (await import('~/pages/AboutPage')).AboutPage }),
      },
      {
        path: 'contato',
        lazy: async () => ({ Component: (await import('~/pages/ContactPage')).ContactPage }),
      },
      {
        path: 'carreiras',
        lazy: async () => ({ Component: (await import('~/pages/CareersPage')).CareersPage }),
      },
      {
        path: 'cadastro-de-vagas',
        lazy: async () => ({ Component: (await import('~/pages/JobPostingPage')).JobPostingPage }),
      },
      {
        path: 'newsletter',
        lazy: async () => ({ Component: (await import('~/pages/NewsletterPage')).NewsletterPage }),
      },
      {
        path: 'aviso-protecao-dados',
        lazy: async () => ({ Component: (await import('~/pages/PrivacyPage')).PrivacyPage }),
      },

      { path: '*', element: <NotFoundPage /> },
    ],
  },
])
