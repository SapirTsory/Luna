interface ChatBubbleProps {
  children: React.ReactNode
}

export function ChatBubble({ children }: ChatBubbleProps) {
  return (
    <div className="flex items-center justify-center gap-2.5 py-6">
      <div
        aria-hidden="true"
        className="flex size-9 shrink-0 items-center justify-center rounded-full text-card"
        style={{ background: 'linear-gradient(145deg, var(--color-primary-soft), var(--color-primary))' }}
      >
        ☾
      </div>
      <p className="max-w-[min(78vw,320px)] rounded-2xl border border-border bg-card px-4 py-3 text-[15px] leading-relaxed shadow-sm">
        {children}
      </p>
    </div>
  )
}
