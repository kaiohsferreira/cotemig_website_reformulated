import type { PostSummary } from '~/data/types'
import { Section, SectionHeader } from '~/components/ui/Section'
import { Button } from '~/components/ui/Button'
import { Icon } from '~/components/ui/Icon'
import { PostCard } from './Cards'

export interface RelatedPostsProps {
  posts: PostSummary[]
  title?: string
  eyebrow?: string
  tone?: 'white' | 'muted'
}

export function RelatedPosts({
  posts,
  title = 'Notícias e novidades',
  eyebrow = '#issoacontecenocotemig',
  tone = 'muted',
}: RelatedPostsProps) {
  if (posts.length === 0) return null

  return (
    <Section tone={tone}>
      <SectionHeader
        eyebrow={eyebrow}
        title={title}
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

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </Section>
  )
}
