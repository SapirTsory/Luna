import { useState } from 'react'
import { PillButton } from '../components/PillButton'
import { ScreenShell } from '../components/ScreenShell'
import { SkipLink } from '../components/SkipLink'

interface CalendarConnectScreenProps {
  connected: boolean
  onConnect: () => void
  onNext: () => void
}

export function CalendarConnectScreen({ connected, onConnect, onNext }: CalendarConnectScreenProps) {
  const [connecting, setConnecting] = useState(false)

  function handleConnect() {
    setConnecting(true)
    // Stubbed: no backend/Google OAuth wired up yet — simulate the round trip.
    window.setTimeout(() => {
      onConnect()
      setConnecting(false)
      onNext()
    }, 700)
  }

  return (
    <ScreenShell
      centered
      footer={
        <>
          <SkipLink onClick={onNext}>לא עכשיו, אפשר גם בהמשך</SkipLink>
          <PillButton onClick={handleConnect} disabled={connecting}>
            {connecting ? 'מתחברת…' : connected ? 'מחוברת ✓' : 'התחברות'}
          </PillButton>
        </>
      }
    >
      <div className="flex size-11 items-center justify-center rounded-xl bg-choice-bg text-xl" aria-hidden="true">
        📅
      </div>
      <h1 className="text-lg font-semibold leading-snug">בואי נחבר את יומן גוגל שלך</h1>
      <p className="text-sm leading-relaxed text-muted">
        ככה אדע מתי את פנויה ומתי לא, ואזכיר לך בול בזמן הנכון — בלי שתצטרכי לספר לי כל פעם.
      </p>
      <div className="mt-1 flex items-center gap-2 rounded-lg border-[1.5px] border-border px-3.5 py-2.5">
        <span className="flex size-4 items-center justify-center rounded-full border-[1.5px] border-border-strong bg-card text-[9px] font-bold text-primary">
          G
        </span>
        <span className="text-sm font-semibold">התחברות עם Google Calendar</span>
      </div>
    </ScreenShell>
  )
}
