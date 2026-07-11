import { PillButton } from '../components/PillButton'
import { ScreenShell } from '../components/ScreenShell'

interface PrepScreenProps {
  onNext: () => void
}

export function PrepScreen({ onNext }: PrepScreenProps) {
  return (
    <ScreenShell centered footer={<PillButton onClick={onNext}>מתחילות 🌙</PillButton>}>
      <div className="text-xl" aria-hidden="true">
        💭
      </div>
      <h1 className="text-lg font-semibold leading-snug">בואי נכיר אותך קצת יותר</h1>
      <p className="text-sm leading-relaxed text-muted">
        כל תשובה שתעני עליה עוזרת לי להכיר אותך באמת, וזה משנה יותר ממה שנראה. אבל בלי לחץ — תיהני מזה. כמה כיף כשסוף־סוף
        מישהי שואלת עלייך?
      </p>
      <p className="text-[13px] font-bold text-primary">⏱ כ-3 דקות · 3 חלקים קצרים</p>
    </ScreenShell>
  )
}
