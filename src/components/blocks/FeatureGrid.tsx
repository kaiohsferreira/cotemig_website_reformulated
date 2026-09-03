import { cn } from '~/lib/cn'
import type { Feature } from '~/data/types'
import { Icon } from '~/components/ui/Icon'

export interface FeatureGridProps {
  features: Feature[]
  columns?: 2 | 3
  onDark?: boolean
  accent?: 'brand' | 'faculty'
}

/**
 * Grade de diferenciais.
 *
 * Substitui o `learn__options` do site atual, onde o titulo de cada item era
 * verde sobre branco em caixa alta — combinacao que reprovava em contraste.
 * Aqui o titulo e da cor da tinta e o verde fica so no icone.
 */
export function FeatureGrid({
  features,
  columns = 3,
  onDark = false,
  accent = 'brand',
}: FeatureGridProps) {
  return (
    <ul
      className={cn(
        'grid gap-x-8 gap-y-10',
        columns === 3 ? 'sm:grid-cols-2 lg:grid-cols-3' : 'sm:grid-cols-2',
      )}
    >
      {features.map((feature) => (
        <li key={feature.title} className="flex flex-col">
          <span
            className={cn(
              'mb-5 flex size-12 items-center justify-center rounded-md',
              onDark
                ? 'bg-white/10 text-brand-300'
                : accent === 'faculty'
                  ? 'bg-faculty-50 text-faculty-700'
                  : 'bg-brand-50 text-brand-700',
            )}
          >
            <Icon name={feature.icon} size={24} />
          </span>

          <h3
            className={cn(
              'font-display text-lg font-bold',
              onDark ? 'text-white' : 'text-ink-900',
            )}
          >
            {feature.title}
          </h3>

          <p className={cn('mt-2.5', onDark ? 'text-ink-300' : 'text-ink-600')}>
            {feature.description}
          </p>
        </li>
      ))}
    </ul>
  )
}
