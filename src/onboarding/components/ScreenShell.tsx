import type { ReactNode } from 'react'
import { LunaLogo } from './LunaLogo'

interface ScreenShellProps {
  top?: ReactNode
  children: ReactNode
  footer?: ReactNode
  centered?: boolean
}

export function ScreenShell({ top, children, footer, centered = false }: ScreenShellProps) {
  return (
    <div className="mx-auto flex h-full w-full max-w-md flex-col">
      <header className="px-5 pt-5">
        <div className="flex justify-center">
          <LunaLogo size={22} withWordmark className="gap-2" />
        </div>
        {top && <div className="pt-4">{top}</div>}
      </header>
      <div
        className={`animate-fade-slide flex flex-1 flex-col gap-4 overflow-y-auto px-5 py-4 ${
          centered ? 'items-center justify-center text-center' : ''
        }`}
      >
        {children}
      </div>
      {footer && (
        <div
          className="flex flex-col gap-2 px-5 pb-4 pt-2"
          style={{ paddingBottom: 'max(1rem, env(safe-area-inset-bottom))' }}
        >
          {footer}
        </div>
      )}
    </div>
  )
}
