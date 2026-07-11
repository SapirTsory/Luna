import { PillButton } from '../components/PillButton'
import { ScreenShell } from '../components/ScreenShell'

interface PrepScreenProps {
  onNext: () => void
}

export function PrepScreen({ onNext }: PrepScreenProps) {
  return (
    <ScreenShell centered footer={<PillButton onClick={onNext}>מתחילות 🌙</PillButton>}>
      <div className="text-xl" aria-hidden="true">
        ✍️
      </div>
      <h1 className="font-serif text-lg font-semibold leading-snug">עוד רגע מתחילות</h1>
      <p className="text-sm leading-relaxed text-muted">
        כדי שאדע להתאים את עצמי בול אלייך, יש לי כמה שאלות קצרות. הכי כדאי להתחיל כשיש לך כמה דקות פנויות, בלי הפרעות.
      </p>
      <p className="text-[13px] font-bold text-primary">⏱ כ-3 דקות · 3 חלקים קצרים</p>
    </ScreenShell>
  )
}
