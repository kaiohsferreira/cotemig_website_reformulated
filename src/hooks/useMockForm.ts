import { useCallback, useState } from 'react'
import type { FormEvent } from 'react'

export type FormValues = Record<string, string>
export type FormErrors = Record<string, string>

export interface UseMockFormOptions<T extends FormValues> {
  initialValues: T
  /** Devolve um mapa campo -> mensagem em portugues. Vazio significa valido. */
  validate: (values: T) => FormErrors
}

export interface UseMockFormResult<T extends FormValues> {
  values: T
  errors: FormErrors
  submitting: boolean
  /** Vira `true` depois de um envio valido. */
  submitted: boolean
  setValue: (field: keyof T & string, value: string) => void
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void
  reset: () => void
}

/**
 * Estado de formulario sem back-end.
 *
 * Este projeto e so front-end: nao existe endpoint para receber os envios.
 * O hook valida de verdade, mostra os erros de verdade e, quando tudo esta
 * certo, simula a latencia de rede e entra em estado de sucesso. Trocar por
 * uma chamada real depois e mexer num ponto so — o corpo de `handleSubmit`.
 */
export function useMockForm<T extends FormValues>({
  initialValues,
  validate,
}: UseMockFormOptions<T>): UseMockFormResult<T> {
  const [values, setValues] = useState<T>(initialValues)
  const [errors, setErrors] = useState<FormErrors>({})
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const setValue = useCallback((field: keyof T & string, value: string) => {
    setValues((current) => ({ ...current, [field]: value }))
    // Limpa o erro do campo assim que a pessoa comeca a corrigi-lo.
    setErrors((current) => {
      if (!current[field]) return current
      const next = { ...current }
      delete next[field]
      return next
    })
  }, [])

  const handleSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      const found = validate(values)
      setErrors(found)

      if (Object.keys(found).length > 0) {
        // Leva o foco para o primeiro campo com erro.
        const [first] = Object.keys(found)
        const element = event.currentTarget.querySelector<HTMLElement>(`[name="${first}"]`)
        element?.focus()
        return
      }

      setSubmitting(true)
      window.setTimeout(() => {
        setSubmitting(false)
        setSubmitted(true)
      }, 700)
    },
    [validate, values],
  )

  const reset = useCallback(() => {
    setValues(initialValues)
    setErrors({})
    setSubmitted(false)
  }, [initialValues])

  return { values, errors, submitting, submitted, setValue, handleSubmit, reset }
}

/* ---------------------------------------------------------------------------
   Validadores
   ------------------------------------------------------------------------ */

export const required = (value: string, label: string): string | null =>
  value.trim() ? null : `Por favor, preencha ${label}.`

export const validEmail = (value: string): string | null => {
  if (!value.trim()) return 'Por favor, preencha o e-mail.'
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim())
    ? null
    : 'Digite um e-mail válido, como nome@exemplo.com.'
}

export const validPhone = (value: string): string | null => {
  if (!value.trim()) return 'Por favor, preencha o telefone.'
  const digits = value.replace(/\D/g, '')
  return digits.length >= 10 && digits.length <= 11
    ? null
    : 'Digite o telefone com DDD, como (31) 99999-9999.'
}

export const validCnpj = (value: string): string | null => {
  if (!value.trim()) return 'Por favor, preencha o CNPJ.'
  return value.replace(/\D/g, '').length === 14 ? null : 'O CNPJ deve ter 14 dígitos.'
}

/** Monta o mapa de erros descartando os campos que passaram. */
export function collectErrors(entries: Record<string, string | null>): FormErrors {
  const errors: FormErrors = {}
  for (const [field, message] of Object.entries(entries)) {
    if (message) errors[field] = message
  }
  return errors
}
