import { useId, useState } from 'react'
import type { ReactNode } from 'react'
import { cn } from '~/lib/cn'
import { Icon } from './Icon'

export interface AccordionItemData {
  title: string
  content: ReactNode
}

export interface AccordionProps {
  items: AccordionItemData[]
  /** Indice que ja comeca aberto. `null` abre nenhum. */
  defaultOpen?: number | null
  /** Quando falso, abrir um item fecha os outros. */
  allowMultiple?: boolean
}

export function Accordion({ items, defaultOpen = null, allowMultiple = false }: AccordionProps) {
  const baseId = useId()
  const [open, setOpen] = useState<number[]>(defaultOpen === null ? [] : [defaultOpen])

  function toggle(index: number) {
    setOpen((current) => {
      const isOpen = current.includes(index)
      if (isOpen) return current.filter((i) => i !== index)
      return allowMultiple ? [...current, index] : [index]
    })
  }

  return (
    <div className="divide-y divide-ink-200 overflow-hidden rounded-md border border-ink-200 bg-white">
      {items.map((item, index) => {
        const isOpen = open.includes(index)
        const panelId = `${baseId}-panel-${index}`
        const buttonId = `${baseId}-button-${index}`

        return (
          <div key={item.title}>
            <h3>
              <button
                type="button"
                id={buttonId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(index)}
                className={cn(
                  'flex w-full items-center justify-between gap-4 px-6 py-5 text-left',
                  'font-display text-base font-bold text-ink-900 transition-colors duration-200',
                  'hover:bg-brand-50',
                )}
              >
                {item.title}
                <span
                  className={cn(
                    'shrink-0 text-brand-700 transition-transform duration-300 ease-[var(--ease-out-soft)]',
                    isOpen && 'rotate-180',
                  )}
                >
                  <Icon name="chevron-down" size={22} />
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!isOpen}
              className="px-6 pb-6 text-ink-600"
            >
              {item.content}
            </div>
          </div>
        )
      })}
    </div>
  )
}
