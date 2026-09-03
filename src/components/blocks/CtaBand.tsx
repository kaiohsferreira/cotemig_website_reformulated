import { cn } from '~/lib/cn'
import type { CallToAction } from '~/data/types'
import { Button } from '~/components/ui/Button'

export interface CtaBandProps {
  cta: CallToAction
  /** `ink` para faixa escura, `brand` para faixa verde cheia. */
  tone?: 'ink' | 'brand'
}

export function CtaBand({ cta, tone = 'ink' }: CtaBandProps) {
  const onBrand = tone === 'brand'

  return (
    <section className={cn(onBrand ? 'bg-brand-500' : 'surface-ink')}>
      <div className="container-shell flex flex-col items-center gap-8 py-16 text-center md:py-20">
        <div className="max-w-2xl">
          <h2 className={cn('text-display-sm', onBrand ? 'text-white' : 'text-white')}>
            {cta.title}
          </h2>
          <p className={cn('mt-4 text-lg', onBrand ? 'text-brand-50' : 'text-ink-300')}>
            {cta.description}
          </p>
        </div>

        <Button href={cta.href} size="lg" variant={onBrand ? 'onDark' : 'primary'}>
          {cta.label}
        </Button>
      </div>
    </section>
  )
}
