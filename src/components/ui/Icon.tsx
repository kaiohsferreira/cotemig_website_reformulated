import type { ReactElement, SVGProps } from 'react'

/**
 * Conjunto de icones inline.
 *
 * Inline de proposito: sao poucos, entram no bundle sem request extra e
 * herdam `currentColor`, entao respeitam o token de cor de quem os usa.
 */
export type IconName =
  | 'arrow-right'
  | 'arrow-up-right'
  | 'chevron-down'
  | 'chevron-right'
  | 'menu'
  | 'close'
  | 'search'
  | 'lock'
  | 'phone'
  | 'pin'
  | 'mail'
  | 'whatsapp'
  | 'clock'
  | 'calendar'
  | 'play'
  | 'plus'
  | 'minus'
  | 'check'
  | 'alert'
  | 'bus'
  | 'graduation'
  | 'lightbulb'
  | 'beaker'
  | 'briefcase'
  | 'users'
  | 'building'
  | 'link'
  | 'award'
  | 'book'
  | 'monitor'
  | 'rocket'
  | 'facebook'
  | 'instagram'
  | 'linkedin'
  | 'twitter'

export interface IconProps extends Omit<SVGProps<SVGSVGElement>, 'name'> {
  name: IconName
  /** Tamanho em pixels. Padrao 20. */
  size?: number
  /** Rotulo acessivel. Sem ele o icone e tratado como decorativo. */
  title?: string
}

const PATHS: Record<IconName, ReactElement> = {
  'arrow-right': <path d="M5 12h14m0 0-6-6m6 6-6 6" />,
  'arrow-up-right': <path d="M7 17 17 7m0 0H8m9 0v9" />,
  'chevron-down': <path d="m6 9 6 6 6-6" />,
  'chevron-right': <path d="m9 6 6 6-6 6" />,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  search: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </>
  ),
  lock: (
    <>
      <rect x="4" y="10" width="16" height="10" rx="2" />
      <path d="M8 10V7a4 4 0 1 1 8 0v3" />
    </>
  ),
  phone: (
    <path d="M6.6 3h2.5l1.5 4-2 1.4a12 12 0 0 0 5 5L15 11.4l4 1.5v2.5A2.6 2.6 0 0 1 16.4 18 13.4 13.4 0 0 1 6 7.6 2.6 2.6 0 0 1 6.6 3Z" />
  ),
  pin: (
    <>
      <path d="M12 21s7-5.7 7-11a7 7 0 1 0-14 0c0 5.3 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.6" />
    </>
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3.5 7 8.5 6 8.5-6" />
    </>
  ),
  whatsapp: (
    <path d="M4 20l1.2-3.6A7.6 7.6 0 1 1 8 19.2L4 20Zm5.4-9.6c.3 1.4 2.1 3.2 3.5 3.5.5.1 1-.2 1.3-.6l.5-.7 2 1-.4 1c-.3.6-1 .9-1.7.8-3-.4-5.5-2.9-5.9-5.9-.1-.7.2-1.4.8-1.7l1-.4 1 2-.7.5c-.4.3-.7.8-.6 1.3Z" />
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </>
  ),
  calendar: (
    <>
      <rect x="3.5" y="5" width="17" height="15" rx="2" />
      <path d="M3.5 10h17M8 3.5v3M16 3.5v3" />
    </>
  ),
  play: <path d="M9 6.5v11l9-5.5-9-5.5Z" />,
  plus: <path d="M12 5v14M5 12h14" />,
  minus: <path d="M5 12h14" />,
  check: <path d="m5 13 4.5 4.5L19 7" />,
  alert: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 8v5M12 16h.01" />
    </>
  ),
  bus: (
    <>
      <rect x="4" y="4" width="16" height="12" rx="2" />
      <path d="M4 10h16M7.5 20v-2M16.5 20v-2M8 13h.01M16 13h.01" />
    </>
  ),
  graduation: (
    <>
      <path d="m12 4 9 4.5-9 4.5-9-4.5L12 4Z" />
      <path d="M7 11v4.2c0 1.6 2.2 2.8 5 2.8s5-1.2 5-2.8V11" />
    </>
  ),
  lightbulb: (
    <>
      <path d="M9.2 16.5a6 6 0 1 1 5.6 0v1.9a1.6 1.6 0 0 1-1.6 1.6h-2.4a1.6 1.6 0 0 1-1.6-1.6v-1.9Z" />
      <path d="M9.6 17.8h4.8" />
    </>
  ),
  beaker: (
    <>
      <path d="M9.5 3.5v5.2L4.8 17a2 2 0 0 0 1.7 3h11a2 2 0 0 0 1.7-3l-4.7-8.3V3.5" />
      <path d="M8.4 3.5h7.2M6.6 14h10.8" />
    </>
  ),
  briefcase: (
    <>
      <rect x="3" y="7.5" width="18" height="12.5" rx="2" />
      <path d="M8.5 7.5V6a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v1.5M3 12.5h18" />
    </>
  ),
  users: (
    <>
      <circle cx="9.5" cy="8.5" r="3.2" />
      <path d="M3.5 19.5a6 6 0 0 1 12 0" />
      <path d="M16 5.6a3.2 3.2 0 0 1 0 5.9M17.5 14.4a6 6 0 0 1 3 5.1" />
    </>
  ),
  building: (
    <>
      <path d="M4 20.5V5.2a1.2 1.2 0 0 1 .8-1.1l7-2.3a1.2 1.2 0 0 1 1.6 1.1v17.6M13.4 20.5V9.6h5.4a1.2 1.2 0 0 1 1.2 1.2v9.7M2.5 20.5h19" />
      <path d="M7.2 8h2.6M7.2 12h2.6M7.2 16h2.6M16.2 13.2h1.2M16.2 16.6h1.2" />
    </>
  ),
  link: (
    <>
      <path d="M10.3 13.7a3.6 3.6 0 0 0 5.1 0l2.9-2.9a3.6 3.6 0 0 0-5.1-5.1l-1.4 1.4" />
      <path d="M13.7 10.3a3.6 3.6 0 0 0-5.1 0l-2.9 2.9a3.6 3.6 0 0 0 5.1 5.1l1.4-1.4" />
    </>
  ),
  award: (
    <>
      <circle cx="12" cy="9.2" r="5.4" />
      <path d="m8.6 13.6-1.3 7 4.7-2.5 4.7 2.5-1.3-7" />
    </>
  ),
  book: (
    <>
      <path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2V5Z" />
      <path d="M4 19a2 2 0 0 1 2-2h13" />
    </>
  ),
  monitor: (
    <>
      <rect x="3" y="4" width="18" height="12.5" rx="2" />
      <path d="M9 20.5h6M12 16.5v4" />
    </>
  ),
  rocket: (
    <>
      <path d="M12 3.2c3 2.1 4.6 5.3 4.6 9l-1.9 2.2H9.3L7.4 12.2c0-3.7 1.6-6.9 4.6-9Z" />
      <path d="M9.3 14.4 7 16.7m7.7-2.3 2.3 2.3M10.6 18.6c0 1.3.5 2.2 1.4 3 .9-.8 1.4-1.7 1.4-3" />
      <circle cx="12" cy="9" r="1.6" />
    </>
  ),
  facebook: (
    <path
      d="M13.5 21v-7.5H16l.5-3h-3V8.6c0-.9.3-1.5 1.6-1.5H16.6V4.4A21 21 0 0 0 14.3 4c-2.3 0-3.9 1.4-3.9 4v2.5H8v3h2.4V21h3.1Z"
      fill="currentColor"
      stroke="none"
    />
  ),
  instagram: (
    <>
      <rect x="4" y="4" width="16" height="16" rx="4.5" />
      <circle cx="12" cy="12" r="3.6" />
      <path d="M16.8 7.4h.01" />
    </>
  ),
  linkedin: (
    <path
      d="M6.2 8.6H3.9V20h2.3V8.6ZM5 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Zm5.2 4.6H8V20h2.3v-6c0-1.6.3-3.1 2.3-3.1 2 0 2 1.8 2 3.2V20h2.3v-6.3c0-3-.6-5.3-4.1-5.3-1.7 0-2.8.9-3.2 1.8h-.1V8.6Z"
      fill="currentColor"
      stroke="none"
    />
  ),
  twitter: (
    <path
      d="M17.2 4h3l-6.6 7.5L21.4 20h-6.1l-4.8-6.2L4.9 20H1.8l7-8L1.6 4h6.2l4.3 5.7L17.2 4Zm-1.1 14.2h1.7L7.9 5.7H6.1l10 12.5Z"
      fill="currentColor"
      stroke="none"
    />
  ),
}

export function Icon({ name, size = 20, title, ...rest }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : true}
      focusable="false"
      {...rest}
    >
      {title ? <title>{title}</title> : null}
      {PATHS[name]}
    </svg>
  )
}
