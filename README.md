# cotemig_website_reformulated

Site do Grupo COTEMIG (Colégio e Faculdade) com o design reformulado.
Front-end apenas — **não há back-end**.

---

## Stack

React 19 · TypeScript · Vite · Tailwind CSS v4 · React Router 7

Sem back-end: todo o conteúdo é estático, em `src/data/`. Os formulários
validam de verdade e mostram estado de sucesso, mas não fazem requisição.

---

## Rodando

```bash
npm install
npm run dev
```

| Script | O que faz |
|---|---|
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` | Checa tipos e gera a build de produção |
| `npm run preview` | Serve a build |
| `npm run lint` | ESLint |
| `npm run typecheck` | Só a checagem de tipos |
| `npm run check:ds` | Verifica se o código respeita o design system |
| `npm run check` | Tipos + lint + design system |

O `check:ds` é o que impede o código de voltar ao estado do site antigo: ele
falha se alguém escrever cor crua, raio fora da escala, sombra fora da escala,
breakpoint `2xl:`, verde fraco em texto ou remover o indicador de foco. Uma
exceção deliberada se declara com `ds-ok:<regra>` num comentário, com a
justificativa escrita ao lado.

---

## Estrutura

```
src/
  components/
    ui/         Primitivos: Button, Card, Badge, Icon, Form, Accordion, Pagination…
    blocks/     Blocos de página: PageHero, FeatureGrid, CtaBand, Cards, EnrollmentForm…
    layout/     Header, MegaMenu, MobileDrawer, SearchOverlay, Footer, CookieBanner
    Seo.tsx     Metadados por rota
  data/         Conteúdo do site, tipado. types.ts é o contrato.
  hooks/        useMockForm, useDismissable
  lib/          cn, asset, format, search
  pages/        Uma por rota
  styles/       globals.css — o design system inteiro
scripts/        Extratores de conteúdo do site atual
docs/           Inventário do site atual e documentação do design system
```

---

## Rotas

As rotas são **as mesmas do site atual**, de propósito: qualquer link já
publicado, indexado ou impresso continua funcionando depois do redesign.

| Rota | Página |
|---|---|
| `/` | Home |
| `/ensino/:institutionSlug` | Colégio ou Faculdade |
| `/ensino/:institutionSlug/curso/:courseSlug` | Curso (5 cursos) |
| `/unidades` · `/unidades/:unitSlug` | Unidades (3) |
| `/blog` · `/blog/:postSlug` | Blog (200 posts) |
| `/quem-somos` | Sobre |
| `/contato` · `/carreiras` · `/cadastro-de-vagas` | Formulários |
| `/newsletter` · `/aviso-protecao-dados` | Newsletter e LGPD |
| `*` | 404 |

---

## Conteúdo

O conteúdo veio do site em produção. Ver
[`docs/inventario-site-atual.md`](docs/inventario-site-atual.md) para o
levantamento completo e a lista de defeitos que o redesign corrige.

Para reimportar os posts do blog depois de novas publicações:

```bash
node scripts/extract-blog.mjs
```

As imagens vivem em `public/img/` e são servidas pelo próprio site. Foram
trazidas do servidor do COTEMIG por:

```bash
node scripts/download-assets.mjs
```

O script converte tudo para WebP no caminho: as 416 imagens somam **200,5 MB na
origem e 25,4 MB aqui** (87% menor). Não era volume de imagem — eram fotos
salvas como PNG, algumas de 620×503 pesando 499 KB. Ele é idempotente: rodar de
novo só baixa o que falta. `--dry-run` só mede.

Para mover as imagens para um CDN depois, aponte `ASSET_ORIGIN` em
`src/lib/asset.ts` para o domínio novo — nenhum componente precisa mudar.

---

## Deploy na Vercel

O `vercel.json` já está configurado. Na Vercel:

1. **Add New → Project** e importe `kaiohsferreira/cotemig_website_reformulated`.
2. **Root Directory:** deixe na raiz do repositório.
3. Framework, build, output e install já vêm do `vercel.json` — não precisa
   preencher nada.
4. Deploy.

O que o `vercel.json` resolve:

| Configuração | Por quê |
|---|---|
| `rewrites` de tudo para `/index.html` | Sem isso, recarregar `/blog` direto na URL devolve 404 — o roteamento é no cliente |
| `Cache-Control` imutável em `/assets/*` | São os bundles com hash no nome; podem ficar em cache para sempre |
| `Cache-Control` de 30 dias em `/img/*` | Imagens não têm hash no nome, então não podem ser imutáveis |
| `X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options`, `Permissions-Policy` | Cabeçalhos de segurança padrão |

`engines.node` está em `>=22.12`, que é o que o Vite 8 exige.

**Limite conhecido do rewrite:** como toda rota desconhecida devolve
`index.html` com HTTP 200, a página de 404 aparece para o visitante mas o
servidor responde 200. É o comportamento normal de SPA; só vira problema se o
Search Console começar a reclamar de soft 404.

---

## Design system

Ver [`docs/design-system.md`](docs/design-system.md).

O resumo que importa: nenhuma cor, raio, sombra ou breakpoint fora dos tokens
de `src/styles/globals.css`. O verde da marca (`brand-500`) é para
preenchimento; verde que se lê como texto sobre branco é `brand-700`, porque o
`#40AA0B` original reprova em contraste AA.

---

## Limite conhecido

Os metadados por rota (`<title>`, `description`, Open Graph) são aplicados no
cliente, via React 19. Crawlers que executam JavaScript leem normalmente;
crawlers que não executam veem só o `<head>` estático do `index.html`. Se SEO
virar prioridade, o caminho é pré-renderizar as rotas na build — os dados já
são estáticos, então a migração não exige reescrever páginas.
