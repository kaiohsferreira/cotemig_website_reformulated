# Inventário do site atual — cotemig.com.br

Levantamento feito antes do redesign, navegando as 21 rotas do site em produção.
É a base de tudo que está neste repositório: as telas, o conteúdo e a lista de
defeitos que o redesign se propõe a corrigir.

Data do levantamento: 01/09/2026.

---

## 1. Rotas

| # | Rota | Template | Altura da página |
|---|---|---|---|
| 1 | `/` | Portal / home | 2.900 px |
| 2 | `/ensino/colegio-cotemig` | Hub de ensino | 2.900 px |
| 3 | `/ensino/faculdade-cotemig` | Hub de ensino | 6.062 px |
| 4 | `/ensino/colegio-cotemig/curso/ensino-medio-+-tecnico` | Detalhe de curso | 5.370 px |
| 5 | `/ensino/colegio-cotemig/curso/escola-de-referencia-google` | Detalhe de curso | 6.593 px |
| 6 | `/ensino/faculdade-cotemig/curso/sistemas-de-informacao` | Detalhe de curso | 6.706 px |
| 7 | `/ensino/faculdade-cotemig/curso/analise-e-desenvolvimento-de-sistemas` | Detalhe de curso | 6.645 px |
| 8 | `/ensino/faculdade-cotemig/curso/ciencia-da-computacao` | Detalhe de curso | 6.649 px |
| 9 | `/unidades` | Listagem | 2.900 px |
| 10 | `/unidades/colegio-barroca-faculdade-cotemig` | Detalhe de unidade | 2.900 px |
| 11 | `/unidades/colegio-floresta` | Detalhe de unidade | 2.900 px |
| 12 | `/unidades/escritorio-central` | Detalhe de unidade | 2.900 px |
| 13 | `/blog` | Listagem | **18.009 px** |
| 14 | `/blog/:slug` | Post | 2.900 px |
| 15 | `/quem-somos` | Institucional | 3.950 px |
| 16 | `/contato` | Formulário | 2.900 px |
| 17 | `/carreiras` | Formulário | 2.900 px |
| 18 | `/cadastro-de-vagas` | Formulário | 3.280 px |
| 19 | `/newsletter` | Texto | 2.900 px (**vazia**) |
| 20 | `/aviso-protecao-dados` | Texto legal | 7.268 px |
| 21 | `*` (404) | Erro — `body.page-errors` | 3.340 px |

### Estados de overlay (mais 6 telas)

Menu mobile (drawer com 14 itens) · busca · popup de login "Área Restrita" ·
dropdown "Nossos Cursos" · dropdown "Mais" · banner de cookies.

**Total: 27 telas.**

### Domínios externos (fora do escopo deste front-end)

`restrito.cotemig.com.br` (área restrita e recuperação de senha) ·
`vestibular.cotemig.com.br` · `matricula.cotemig.com.br` ·
`diploma.faculdadecotemig.br` (diplomas e históricos).

---

## 2. Defeitos encontrados

### Alta severidade

**A1 — `/newsletter` é uma página vazia.**
Renderiza apenas o breadcrumb "home › newsletter" e cai direto no rodapé.
Está linkada no menu principal e no rodapé. Um link do menu que leva a nada.

**A2 — `<title>` idêntico nas 21 rotas.**
Todas devolvem `Cotemig: Sua revolução começa aqui`. Não há `<title>`,
`description` nem Open Graph por página — o site inteiro é um resultado só na
busca e todo compartilhamento em rede social sai igual.

**A3 — `/blog` renderiza 200 posts de uma vez.**
Sem paginação, sem busca, sem filtro. São 18.009 px de página e 200 imagens
carregadas de uma vez.

**A4 — Carrossel do hero renderiza slides sobrepostos.**
No primeiro paint do desktop, "FACULDADE COTEMIG" e "COLÉGIO COTEMIG" aparecem
um por cima do outro até o script do carrossel assumir.

**A5 — Hero ilegível no mobile.**
O texto da campanha é chapado dentro da imagem do banner. Em 390 px de largura
a imagem é cortada e o texto vira `ESTIBULAR ACULDADE OTEMIG 027`. Como é
pixel e não texto, também não é lido por leitor de tela nem indexado.

**A6 — Cards de unidade quebram no mobile.**
A foto é esmagada (sem proporção travada) e o endereço quebra em três linhas
com indentação irregular.

### Média severidade

**M1 — Hub do Colégio tem metade do conteúdo do hub da Faculdade.**
Mesmo template, 2.900 px contra 6.062 px. O Colégio não tem cards de curso, não
tem "por que escolher", não tem formas de ingresso nem financiamentos.

**M2 — `/unidades` não tem topo próprio.**
Começa direto no bloco de cards — e é o mesmo bloco `our-units` que já aparece
em 8 páginas do site.

**M3 — Formulário de matrícula duplicado em 6 páginas.**
Marcação repetida, não componentizada.

**M4 — Sem escala de breakpoint.**
14 media queries misturando `em` e `px`: `42.5em`, `480px`, `55em`, `660px`,
`75em`, `780px`, `76.25em`, `40.0625em`, `48.75em`…

**M5 — Sem escala de raio.**
14 valores diferentes de `border-radius`: `3px`, `7px`, `8px`, `10px`, `12px`,
`14px`, `.75em`, `.875em`, `50%`, `14px 14px 0 0`, `0 8px 8px 0`, `0 0 4px 4px`…

**M6 — Verde da marca reprova em contraste.**
`#40AA0B` sobre branco dá 3,0:1. A WCAG AA exige 4,5:1 para texto corrido. O
site usa esse verde em títulos de item de lista e links.

**M7 — Imagem do curso errado.**
A página de Sistemas de Informação carrega
`/assets/img/cursos/analise-desenvolvimento-sistemas/ADS_2.jpg`.

### Baixa severidade

**B1** — Rodapé congelado em "© 2023".
**B2** — "Consulta Pública de Diploma" e "Consultar Históricos" são dois itens
de menu apontando para a mesma URL.
**B3** — Banner de cookies com um botão só ("Prosseguir"); o texto afirma que
continuar navegando já significa concordância. Não há como recusar.
**B4** — Erros de digitação no conteúdo: `preparao(a)`, `um computadore para
cada aluno`, `Java Scrip`, `Cique aqui`, `Atedimento`.
**B5** — Cinco slugs de post contêm aspas (`&quot;`) na URL.

---

## 3. Tokens do site atual

Extraídos de `/assets/css/style.min.css` (91 KB).

| Token | Valor | Ocorrências |
|---|---|---|
| Verde da marca | `#40AA0B` | 79 |
| Verde hover | `#45B80B` | 10 |
| Preto | `#111` | 35 |
| Cinza escuro | `#424242` | 52 |
| Cinza de fundo | `#F5F5F5` | 11 |
| Tipografia | Lato (fallback OpenSans) | — |

O `theme-color` declarado no HTML é `#40AA0B`.

---

## 4. Como o conteúdo foi trazido

O site atual é renderizado no servidor, então o conteúdo veio direto do HTML.

- **`scripts/extract-blog.mjs`** — lê a listagem, visita os 200 posts e converte
  o corpo em blocos (`paragraph` / `image`). Grava dois arquivos:
  `src/data/posts-index.json` (metadados e resumo, 97 KB, entra no bundle
  principal) e `src/data/posts-bodies.json` (os corpos, 498 KB, carregado sob
  demanda só na página de um post). Num arquivo único, todo visitante baixaria
  o blog inteiro para ver a home. Roda de novo quando o COTEMIG publicar posts.
- **`scripts/extract-pages.mjs`** — despeja o conteúdo das páginas
  institucionais num arquivo de texto, usado como fonte para escrever os
  módulos de `src/data/` à mão. Essas páginas precisam de curadoria (reagrupar
  seções, corrigir os erros de digitação), então cópia automática produziria
  um resultado pior.
- O catálogo de cursos veio de um array `coursesType` embutido no JS do site,
  que traz os slugs, as imagens e os PDFs de matriz curricular.

- **`scripts/download-assets.mjs`** — traz as 416 imagens referenciadas para
  `public/img/` e reescreve os caminhos. Converte para WebP no caminho:
  **200,5 MB na origem viraram 25,4 MB** no repositório.

### Achado sobre as imagens

O peso não vinha de resolução alta, e sim de formato errado: são fotos salvas
como **PNG**. Amostra do corpo dos posts:

| Arquivo | Dimensão | Tamanho |
|---|---|---|
| `a20260826154259gdcpmb.png` | 620×503 | 499 KB |
| `a202605041622159qcc4b.png` | 611×682 | 696 KB |
| `a20260410151047navbwp.png` | 1573×1041 | 1.958 KB |

Uma foto de 620×503 em WebP cabe em cerca de 40 KB. As páginas de post do site
atual carregam essas imagens como estão.

Duas peças gráficas também foram trocadas por fotos reais das unidades, porque
traziam o texto chapado dentro do arquivo — o defeito **A5**: o banner da home
e os cartões das duas instituições. E a arte oficial do curso *Escola de
Referência Google* é um retângulo verde liso com o logotipo do Google num
canto; foi substituída pela foto da sala Google da unidade Floresta.
