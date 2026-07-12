import type { ButtonHTMLAttributes } from 'react'

interface PillButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost' | 'whatsapp'
}

export function PillButton({ variant = 'primary', className = '', ...props }: PillButtonProps) {
  const base =
    'min-h-12 w-full rounded-full px-5 py-3 text-[15px] font-bold transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
  const styles = {
    primary: 'bg-primary text-card hover:bg-primary-soft',
    ghost: 'border-[1.5px] border-border-strong text-muted hover:bg-card',
    whatsapp: 'bg-whatsapp-cta text-card hover:bg-whatsapp-cta-soft',
  }[variant]
  return <button className={`${base} ${styles} ${className}`} {...props} />
}
