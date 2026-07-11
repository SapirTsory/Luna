import type { InputHTMLAttributes } from 'react'

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
}

export function TextField({ label, id, className = '', ...inputProps }: TextFieldProps) {
  const inputId = id ?? `field-${label}`
  return (
    <div className="flex min-w-0 flex-1 flex-col gap-1">
      <label htmlFor={inputId} className="px-0.5 text-[13px] font-semibold text-muted">
        {label}
      </label>
      <input
        id={inputId}
        className={`min-h-11 w-full min-w-0 rounded-lg border border-border bg-card px-3.5 py-2.5 text-[15px] text-ink placeholder-input-placeholder outline-none focus-visible:ring-2 focus-visible:ring-primary/50 ${className}`}
        {...inputProps}
      />
    </div>
  )
}
