import type { ReactNode } from 'react'

export function ExampleQuote({ children }: { children: ReactNode }) {
  return <p className="text-right text-[13px] leading-relaxed italic text-muted">{children}</p>
}

interface ExternalSnippetProps {
  icon: string
  source: string
  sender?: string
  forwarded?: boolean
  children: ReactNode
}

export function ExternalSnippet({ icon, source, sender, children }: ExternalSnippetProps) {
  return (
    <div className="rounded-xl bg-whatsapp-bg p-2.5 opacity-90 font-whatsapp">
      <div className="mb-1 text-center text-[11px] text-muted">
        {icon} {source}
      </div>
      <div className="rounded-2xl rounded-tr-[3px] bg-card px-2.5 py-1.5 text-[12px]">
        {sender && <div className="mb-0.5 text-[11px] font-bold text-primary">{sender}</div>}
        {children}
      </div>
    </div>
  )
}

export function OutgoingBubble({
  time,
  forwarded,
  read,
  children,
}: {
  time: string
  forwarded?: boolean
  read?: boolean
  children: ReactNode
}) {
  return (
    <div className="flex flex-col items-end gap-1 self-end rounded-2xl rounded-tl-[3px] bg-whatsapp-bubble px-3 py-2 text-[13px] max-w-[85%]">
      {forwarded && (
        <span className="flex items-center gap-1 self-start text-[11px] italic text-muted">
          <span aria-hidden="true">↪</span> הועבר
        </span>
      )}
      <span>{children}</span>
      <span className="flex items-center gap-1 text-[10px] text-whatsapp-accent">
        {time}
        {read && (
          <span aria-hidden="true" className="text-[#53bdeb]">
            ✓✓
          </span>
        )}
      </span>
    </div>
  )
}

export function LunaBubble({ time, children }: { time?: string; children: ReactNode }) {
  return (
    <div className="flex flex-col items-start gap-1 self-start rounded-2xl rounded-tr-[3px] bg-card px-3 py-2 text-[13px] max-w-[90%] shadow-sm">
      <span>{children}</span>
      {time && <span className="text-[10px] text-muted">{time}</span>}
    </div>
  )
}

export function TimeDivider({ children }: { children: ReactNode }) {
  return <div className="self-center px-2 text-[11px] font-semibold text-muted">· {children} ·</div>
}

const VOICE_BAR_HEIGHTS = [6, 10, 14, 8, 16, 11, 7, 13, 9, 15, 6, 10, 8, 12, 7]

export function VoiceMessageBubble({ duration, time }: { duration: string; time: string }) {
  return (
    <div className="flex flex-col items-end gap-1.5 self-end rounded-2xl rounded-tl-[3px] bg-whatsapp-bubble px-3 py-2.5 max-w-[85%]">
      <span className="sr-only">{`הודעה קולית באורך ${duration}`}</span>
      <div className="flex items-center gap-2" aria-hidden="true">
        <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary text-[10px] text-card">▶</span>
        <span className="flex items-end gap-[2px]">
          {VOICE_BAR_HEIGHTS.map((h, i) => (
            <span key={i} className="w-[2px] rounded-full bg-primary/50" style={{ height: h }} />
          ))}
        </span>
        <span dir="ltr" className="text-[11px] text-muted">
          {duration}
        </span>
      </div>
      <span className="text-[10px] text-whatsapp-accent">{time}</span>
    </div>
  )
}
