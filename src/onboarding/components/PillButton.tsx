import type { ButtonHTMLAttributes } from 'react'

interface PillButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost'
}

export function PillButton({ variant = 'primary', className = '', ...props }: PillButtonProps) {
  const base = 'min-h-12 w-full rounded-full px-5 py-3 text-[15px] font-bold transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
  const styles =
    variant === 'primary'
      ? 'bg-primary text-card hover:bg-primary-soft'
      : 'border-[1.5px] border-border-strong text-muted hover:bg-card'
  return <button className={`${base} ${styles} ${className}`} {...props} />
}
