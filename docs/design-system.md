# Design system

Evolução da marca COTEMIG, não ruptura. O verde e o preto continuam sendo a
identidade; o que muda é que agora existe uma **escala** por trás deles.

Fonte única de verdade: [`src/styles/globals.css`](../src/styles/globals.css).
Este documento explica as decisões; o CSS é quem manda.

---

## Cor

### Verde da marca

O `#40AA0B` do site atual virou `brand-500` e continua sendo a cor da marca.
Mas ele **reprova em contraste para texto**: sobre branco dá 3,0:1, e a WCAG AA
pede 4,5:1 para texto corrido. Por isso a rampa tem dois papéis distintos:

| Token | Valor | Onde usar |
|---|---|---|
| `brand-500` | `#40AA0B` | Preenchimento: fundo de botão, faixa, ícone sobre claro |
| `brand-600` | `#368F09` | Hover de preenchimento |
| `brand-700` | `#2A7008` | **Texto** verde sobre fundo claro (6,1:1) |
| `brand-300` | `#97D671` | Texto e ícone verde sobre fundo escuro |

> Regra prática: verde grande e chapado é `500`. Verde que se lê como letra
> sobre branco é `700`. Sobre preto é `300`.

### Neutros

A rampa `ink` tem um leve viés verde, para o cinza não brigar com a marca.
`ink-950` é o fundo escuro do site; `ink-600` é o menor tom que passa em AA
para texto secundário sobre branco.

### Faculdade

`faculty-*` é um teal usado **exclusivamente** para distinguir o contexto de
Faculdade do de Colégio — eyebrow, badge, borda de card, gradiente do hero.
Não é uma segunda cor de marca e não deve virar cor de botão principal.

---

## Tipografia

| Papel | Família | Por quê |
|---|---|---|
| Display | **Sora** | Geométrica e técnica. Cara de escola de tecnologia. |
| Texto | **Lato** | Continuidade com a marca atual do COTEMIG. |

A escala de display é fluida (`clamp()`), então cresce com a viewport sem
media query:

| Token | Mínimo → máximo |
|---|---|
| `text-display-sm` | 28 → 36 px |
| `text-display-md` | 34 → 48 px |
| `text-display-lg` | 40 → 60 px |
| `text-display-xl` | 44 → 72 px |

`text-eyebrow` é o rótulo curto em caixa alta acima dos títulos: 13 px, peso
700, `letter-spacing` 0.12em.

---

## Raio

Três degraus. O site atual tinha 14 valores diferentes.

| Token | Valor | Uso |
|---|---|---|
| `rounded-sm` | 8 px | Chips, inputs, botões pequenos |
| `rounded-md` | 12 px | Botões, cards |
| `rounded-lg` | 20 px | Cards grandes, mídia, hero |

Os demais degraus do Tailwind (`xs`, `xl`, `2xl`, `3xl`, `4xl`) foram
**removidos** do tema — usar um deles não gera classe.

---

## Sombra

Três níveis, todos no tom da tinta (nunca preto puro, que suja o verde):

`shadow-card` (repouso) · `shadow-lift` (hover, elemento erguido) ·
`shadow-overlay` (modal, drawer, mega-menu).

Os degraus padrão do Tailwind também foram removidos.

---

## Breakpoints

Quatro, todos em `rem`:

| Token | Largura |
|---|---|
| `sm:` | 640 px |
| `md:` | 768 px |
| `lg:` | 1024 px |
| `xl:` | 1280 px |

`2xl:` foi removido. O miolo do site tem largura máxima de 1248 px
(`--container-shell`), então não há o que ganhar acima de 1280.

---

## Utilitários do projeto

| Utilitário | O que faz |
|---|---|
| `container-shell` | Largura máxima de 1248 px, centralizado, com padding lateral responsivo |
| `surface-ink` | Fundo escuro da marca: preto esverdeado com halo verde e teal |
| `line-clamp-N` | Trunca em N linhas |

---

## Regras que o código precisa respeitar

1. **Nenhuma cor crua.** Nada de `#hex`, `rgb()`, nem das paletas embutidas do
   Tailwind (`green-*`, `gray-*`, `slate-*`, `zinc-*`, `neutral-*`). Só os
   tokens deste sistema.
2. **Nenhum raio ou sombra fora da escala.**
3. **Foco sempre visível.** O `:focus-visible` global desenha um contorno verde
   de 3 px. Não sobrescreva com `outline: none`.
4. **Imagem sempre com proporção travada** (`aspect-*` + `object-cover`). Foto
   esmagada no mobile é o defeito nº 1 do site atual.
5. **Texto de hero é HTML**, nunca pixel dentro da imagem.
6. **`prefers-reduced-motion`** já está tratado globalmente — não anule.
