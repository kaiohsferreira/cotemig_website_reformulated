import { useId } from 'react'
import type { ComponentPropsWithoutRef, ReactNode } from 'react'
import { cn } from '~/lib/cn'
import { Icon } from './Icon'

/* ---------------------------------------------------------------------------
   Campo
   ------------------------------------------------------------------------ */

export interface FieldProps {
  label: string
  /** Marca o rotulo com asterisco E propaga `required` para o controle. */
  required?: boolean
  /** Texto de apoio abaixo do rotulo. */
  hint?: string
  /** Mensagem de erro em portugues. Quando presente, pinta o campo. */
  error?: string
  /** Ocupa as duas colunas do grid do formulario. */
  wide?: boolean
  children: (props: {
    id: string
    required: boolean
    invalid: boolean
    describedBy: string | undefined
  }) => ReactNode
}

export function Field({ label, required = false, hint, error, wide, children }: FieldProps) {
  const id = useId()
  const hintId = hint ? `${id}-hint` : undefined
  const errorId = error ? `${id}-error` : undefined
  const describedBy = [hintId, errorId].filter(Boolean).join(' ') || undefined

  return (
    <div className={cn('flex flex-col gap-2', wide && 'md:col-span-2')}>
      <label htmlFor={id} className="font-display text-sm font-semibold text-ink-800">
        {label}
        {required ? (
          <span className="ml-1 text-danger-700" aria-hidden="true">
            *
          </span>
        ) : null}
        {required ? <span className="sr-only"> (obrigatorio)</span> : null}
      </label>

      {hint ? (
        <p id={hintId} className="-mt-1 text-sm text-ink-500">
          {hint}
        </p>
      ) : null}

      {children({ id, required, invalid: Boolean(error), describedBy })}

      {error ? (
        <p id={errorId} className="flex items-center gap-1.5 text-sm font-semibold text-danger-700">
          <Icon name="alert" size={16} />
          {error}
        </p>
      ) : null}
    </div>
  )
}

/* ---------------------------------------------------------------------------
   Controles
   ------------------------------------------------------------------------ */

// O foco fica com o contorno global do :focus-visible; a borda so reforca.
// Mudanca de cor de borda sozinha nao e indicador de foco suficiente.
const CONTROL =
  'w-full rounded-sm border-2 bg-white px-4 text-base text-ink-800 ' +
  'placeholder:text-ink-400 transition-colors duration-200 ' +
  'focus:border-brand-600 ' +
  'disabled:bg-ink-100 disabled:text-ink-500'

const CONTROL_OK = 'border-ink-200 hover:border-ink-300'
const CONTROL_ERR = 'border-danger-500 hover:border-danger-700'

export interface InputProps extends Omit<ComponentPropsWithoutRef<'input'>, 'className'> {
  invalid?: boolean
}

export function Input({ invalid = false, ...rest }: InputProps) {
  return (
    <input
      className={cn(CONTROL, 'h-12', invalid ? CONTROL_ERR : CONTROL_OK)}
      aria-invalid={invalid || undefined}
      {...rest}
    />
  )
}

export interface TextareaProps extends Omit<ComponentPropsWithoutRef<'textarea'>, 'className'> {
  invalid?: boolean
}

export function Textarea({ invalid = false, rows = 5, ...rest }: TextareaProps) {
  return (
    <textarea
      rows={rows}
      className={cn(CONTROL, 'resize-y py-3', invalid ? CONTROL_ERR : CONTROL_OK)}
      aria-invalid={invalid || undefined}
      {...rest}
    />
  )
}

export interface SelectOption {
  value: string
  label: string
}

export interface SelectProps extends Omit<ComponentPropsWithoutRef<'select'>, 'className'> {
  options: SelectOption[]
  /** Primeira opcao, desabilitada, servindo de rotulo vazio. */
  placeholder?: string
  invalid?: boolean
}

export function Select({ options, placeholder, invalid = false, ...rest }: SelectProps) {
  return (
    <div className="relative">
      <select
        className={cn(
          CONTROL,
          'h-12 appearance-none pr-11',
          invalid ? CONTROL_ERR : CONTROL_OK,
          !rest.value && placeholder ? 'text-ink-400' : '',
        )}
        aria-invalid={invalid || undefined}
        {...rest}
      >
        {placeholder ? (
          <option value="" disabled>
            {placeholder}
          </option>
        ) : null}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <span className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-ink-500">
        <Icon name="chevron-down" size={18} />
      </span>
    </div>
  )
}

export interface FileInputProps extends Omit<ComponentPropsWithoutRef<'input'>, 'className' | 'type'> {
  invalid?: boolean
  /** Nome do arquivo ja escolhido, para exibir no lugar do texto padrao. */
  fileName?: string
}

export function FileInput({ invalid = false, fileName, ...rest }: FileInputProps) {
  return (
    <label
      className={cn(
        'flex h-12 w-full cursor-pointer items-center gap-3 rounded-sm border-2 border-dashed px-4',
        'text-base transition-colors duration-200 hover:border-brand-500 hover:bg-brand-50',
        invalid ? 'border-danger-500' : 'border-ink-300',
        fileName ? 'text-ink-800' : 'text-ink-500',
      )}
    >
      <Icon name="plus" size={18} />
      <span className="truncate">{fileName ?? 'Escolher arquivo'}</span>
      <input type="file" className="sr-only" aria-invalid={invalid || undefined} {...rest} />
    </label>
  )
}

export interface CheckboxProps extends Omit<ComponentPropsWithoutRef<'input'>, 'className' | 'type'> {
  label: ReactNode
}

export function Checkbox({ label, ...rest }: CheckboxProps) {
  const id = useId()
  return (
    <div className="flex items-start gap-3">
      <input
        id={id}
        type="checkbox"
        className="mt-1 size-5 shrink-0 accent-brand-600"
        {...rest}
      />
      <label htmlFor={id} className="text-sm text-ink-600">
        {label}
      </label>
    </div>
  )
}

/* ---------------------------------------------------------------------------
   Retorno do envio
   ------------------------------------------------------------------------ */

export interface FormStatusProps {
  tone: 'success' | 'error'
  title: string
  children?: ReactNode
}

export function FormStatus({ tone, title, children }: FormStatusProps) {
  const isSuccess = tone === 'success'
  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        'flex gap-3 rounded-md border-2 p-5',
        isSuccess
          ? 'border-brand-200 bg-brand-50 text-brand-900'
          : 'border-danger-500/30 bg-danger-50 text-danger-700',
      )}
    >
      <span className={cn('mt-0.5 shrink-0', isSuccess ? 'text-brand-700' : 'text-danger-700')}>
        <Icon name={isSuccess ? 'check' : 'alert'} size={22} />
      </span>
      <div>
        <p className="font-display font-bold">{title}</p>
        {children ? <div className="mt-1 text-sm">{children}</div> : null}
      </div>
    </div>
  )
}
