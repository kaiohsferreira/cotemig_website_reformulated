import type { ComponentPropsWithoutRef, ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { cn } from '~/lib/cn'

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'onDark' | 'link'
export type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonBaseProps {
  variant?: ButtonVariant
  size?: ButtonSize
  /** Ocupa toda a largura do container. */
  block?: boolean
  /** Icone renderizado depois do texto (setas, chevrons). */
  trailingIcon?: ReactNode
  /** Icone renderizado antes do texto. */
  leadingIcon?: ReactNode
  children: ReactNode
  className?: string
}

type ButtonAsButton = ButtonBaseProps &
  Omit<ComponentPropsWithoutRef<'button'>, keyof ButtonBaseProps> & {
    to?: never
    href?: never
  }

type ButtonAsLink = ButtonBaseProps &
  Omit<ComponentPropsWithoutRef<'a'>, keyof ButtonBaseProps> & {
    /** Rota interna. Renderiza um <Link> do react-router. */
    to: string
    href?: never
  }

type ButtonAsAnchor = ButtonBaseProps &
  Omit<ComponentPropsWithoutRef<'a'>, keyof ButtonBaseProps> & {
    /** URL externa. Renderiza um <a>. */
    href: string
    to?: never
  }

export type ButtonProps = ButtonAsButton | ButtonAsLink | ButtonAsAnchor

const BASE =
  'inline-flex items-center justify-center gap-2 rounded-md font-display font-semibold ' +
  'transition-[background-color,color,border-color,box-shadow,transform] duration-200 ' +
  'ease-[var(--ease-out-soft)] active:translate-y-px ' +
  'disabled:pointer-events-none disabled:opacity-50 text-center'

const VARIANTS: Record<ButtonVariant, string> = {
  // Verde da marca em preenchimento: contraste do texto branco e garantido
  // pelo tom 600 no hover, que e mais escuro que o 500.
  primary: 'bg-brand-500 text-white hover:bg-brand-600 shadow-card hover:shadow-lift',
  // O site atual usava cinza para acao secundaria, o que lia como desabilitado.
  // Aqui a secundaria e contorno verde — continua legivel como acao.
  secondary:
    'border-2 border-brand-600 text-brand-700 bg-white hover:bg-brand-50 hover:border-brand-700',
  ghost: 'text-ink-700 hover:bg-ink-100',
  onDark: 'bg-white text-ink-900 hover:bg-brand-50',
  link: 'text-brand-700 underline underline-offset-4 hover:text-brand-800 rounded-sm',
}

const SIZES: Record<ButtonSize, string> = {
  sm: 'h-10 px-4 text-sm',
  md: 'h-12 px-6 text-base',
  lg: 'h-14 px-8 text-lg',
}

// O `py` existe para o alvo de toque: sem ele estes links ficam com ~20px de
// altura no celular, abaixo do minimo confortavel para o dedo.
const LINK_SIZES: Record<ButtonSize, string> = {
  sm: 'py-2 text-sm',
  md: 'py-2.5 text-base',
  lg: 'py-3 text-lg',
}

export function Button(props: ButtonProps) {
  const {
    variant = 'primary',
    size = 'md',
    block = false,
    leadingIcon,
    trailingIcon,
    children,
    className,
    ...rest
  } = props as ButtonBaseProps & Record<string, unknown>

  const classes = cn(
    BASE,
    VARIANTS[variant],
    variant === 'link' ? LINK_SIZES[size] : SIZES[size],
    block && 'w-full',
    className,
  )

  const content = (
    <>
      {leadingIcon}
      <span>{children}</span>
      {trailingIcon}
    </>
  )

  if ('to' in props && props.to) {
    const { to, ...anchorRest } = rest as { to: string } & ComponentPropsWithoutRef<'a'>
    return (
      <Link to={to} className={classes} {...anchorRest}>
        {content}
      </Link>
    )
  }

  if ('href' in props && props.href) {
    const anchorRest = rest as ComponentPropsWithoutRef<'a'>
    const isExternal = String(props.href).startsWith('http')
    return (
      <a
        className={classes}
        {...anchorRest}
        {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {content}
      </a>
    )
  }

  const buttonRest = rest as ComponentPropsWithoutRef<'button'>
  return (
    <button type="button" className={classes} {...buttonRest}>
      {content}
    </button>
  )
}
