import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { findPost, loadPostBody, relatedPosts } from '~/data/posts'
import type { PostBlock } from '~/data/types'
import type { IconName } from '~/components/ui/Icon'
import { formatLongDate } from '~/lib/format'
import { Seo } from '~/components/Seo'
import { PageHero } from '~/components/blocks/PageHero'
import { Prose } from '~/components/blocks/Prose'
import { RelatedPosts } from '~/components/blocks/RelatedPosts'
import { Section } from '~/components/ui/Section'
import { Button } from '~/components/ui/Button'
import { Icon } from '~/components/ui/Icon'
import { NotFoundPage } from './NotFoundPage'

/** Dominio publico do site, usado para montar a URL de compartilhamento. */
const SITE_URL = 'https://cotemig.com.br'

/**
 * Textos alternativos genericos herdados do conteudo original.
 *
 * Quando o alt e um destes, a imagem nao tem descricao util: entra como
 * decorativa (`alt=""`) e sem legenda, em vez de anunciar "Imagem" ao leitor
 * de tela ou imprimir "Link" embaixo da foto.
 */
const GENERIC_ALT = new Set(['imagem', 'imgaem', 'image', 'link', 'foto'])

/** Devolve a legenda da imagem, ou `null` quando o alt nao acrescenta nada. */
function captionOf(alt: string): string | null {
  const cleaned = alt.trim()
  if (cleaned === '') return null
  return GENERIC_ALT.has(cleaned.toLowerCase()) ? null : cleaned
}

/** Acima disto o rotulo do breadcrumb e cortado na ultima palavra que couber. */
const BREADCRUMB_LIMIT = 48

/**
 * Encurta o titulo para o ultimo degrau do breadcrumb.
 *
 * Os titulos vem em caixa alta do conteudo original e chegam a 124 caracteres.
 * Inteiros, ocupavam tres linhas em negrito no topo do hero e repetiam o <h1>
 * que aparece logo abaixo.
 */
function breadcrumbLabel(title: string): string {
  if (title.length <= BREADCRUMB_LIMIT) return title

  const cut = title.slice(0, BREADCRUMB_LIMIT)
  const lastSpace = cut.lastIndexOf(' ')
  const trimmed = lastSpace > 24 ? cut.slice(0, lastSpace) : cut

  return `${trimmed.replace(/[\s,;:.–—-]+$/, '')}…`
}

interface ShareTarget {
  label: string
  icon: IconName
  href: string
}

function shareTargets(title: string, url: string): ShareTarget[] {
  const encodedUrl = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(title)

  return [
    {
      label: 'WhatsApp',
      icon: 'whatsapp',
      href: `https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`,
    },
    {
      label: 'LinkedIn',
      icon: 'linkedin',
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    },
    {
      label: 'Facebook',
      icon: 'facebook',
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    },
    {
      label: 'X',
      icon: 'twitter',
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    },
  ]
}

/** Esqueleto exibido enquanto o corpo do post chega. */
function PostBodySkeleton() {
  return (
    <div aria-hidden="true" className="flex flex-col gap-4">
      {[10, 11, 9, 11, 7].map((width, index) => (
        <span
          key={index}
          className="block h-4 animate-pulse rounded-sm bg-ink-100"
          style={{ width: `${width * 9}%` }}
        />
      ))}
    </div>
  )
}

export function PostPage() {
  const { postSlug } = useParams<{ postSlug: string }>()
  const post = postSlug ? findPost(postSlug) : undefined

  /* O corpo dos 200 posts vive num chunk separado, carregado so aqui — no
     bundle principal ele custaria meio megabyte a quem nunca abre o blog.
     `body === null` significa "ainda carregando". */
  const [body, setBody] = useState<PostBlock[] | null>(null)
  const [loadedSlug, setLoadedSlug] = useState(postSlug)

  // Ir de um post para outro descarta o corpo anterior antes de pintar.
  if (loadedSlug !== postSlug) {
    setLoadedSlug(postSlug)
    setBody(null)
  }

  useEffect(() => {
    if (!postSlug) return
    let cancelled = false
    void loadPostBody(postSlug).then((blocks) => {
      if (!cancelled) setBody(blocks ?? [])
    })
    return () => {
      cancelled = true
    }
  }, [postSlug])

  if (!post) return <NotFoundPage />

  const url = `${SITE_URL}/blog/${post.slug}`
  const related = relatedPosts(post.slug, 4)

  return (
    <>
      <Seo
        title={post.title}
        description={post.excerpt}
        path={`/blog/${post.slug}`}
        image={post.image}
        type="article"
        publishedAt={post.publishedAt}
      />

      <PageHero
        breadcrumb={[
          { label: 'Início', to: '/' },
          { label: 'Blog', to: '/blog' },
          { label: breadcrumbLabel(post.title) },
        ]}
        eyebrow="#issoacontecenocotemig"
        // O titulo chega em caixa alta do conteudo original e fica como esta.
        title={post.title}
        image={post.image}
        size="sm"
      >
        <p className="mt-8 flex items-center gap-2 text-ink-200">
          <Icon name="calendar" size={18} />
          <time dateTime={post.publishedAt}>{formatLongDate(post.publishedAt)}</time>
        </p>
      </PageHero>

      <Section tone="white" spacing="md">
        <Prose narrow>
          {body === null ? (
            <PostBodySkeleton />
          ) : (
            body.map((block, index) => {
              if (block.type === 'paragraph') {
                return <p key={index}>{block.text}</p>
              }

              const caption = captionOf(block.alt)

              return (
                <figure key={index}>
                  <img
                    src={block.src}
                    alt={caption ?? ''}
                    loading="lazy"
                    decoding="async"
                    className="w-full rounded-lg"
                  />
                  {caption ? (
                    <figcaption className="mt-3 text-sm text-ink-500">{caption}</figcaption>
                  ) : null}
                </figure>
              )
            })
          )}
        </Prose>

        <div className="mt-14 max-w-[var(--container-prose)] border-t border-ink-200 pt-8">
          <h2 className="font-display text-eyebrow text-ink-800 uppercase">Compartilhar</h2>

          <ul className="mt-4 flex flex-wrap gap-3">
            {shareTargets(post.title, url).map((target) => (
              <li key={target.label}>
                <Button
                  href={target.href}
                  variant="secondary"
                  size="sm"
                  leadingIcon={<Icon name={target.icon} size={18} />}
                  aria-label={`Compartilhar no ${target.label}`}
                >
                  {target.label}
                </Button>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* Eyebrow proprio: o padrao do bloco e a mesma hashtag do hero, e ela
          apareceria duas vezes na mesma pagina. */}
      <RelatedPosts posts={related} eyebrow="Mais do blog" title="Leia também" />
    </>
  )
}
