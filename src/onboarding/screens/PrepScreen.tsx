import { PillButton } from '../components/PillButton'
import { ScreenShell } from '../components/ScreenShell'

interface PrepScreenProps {
  onNext: () => void
}

export function PrepScreen({ onNext }: PrepScreenProps) {
  return (
    <ScreenShell centered footer={<PillButton onClick={onNext}>מתחילות 🌙</PillButton>}>
      <div className="flex w-full max-w-sm flex-col items-center gap-6 text-center">
        <div className="space-y-3">
          <h1 className="mx-auto max-w-[19rem] text-[30px] font-semibold leading-[1.16] tracking-[-0.01em] text-ink sm:text-[34px]">
            נתחיל?
          </h1>
          <p className="text-lg font-medium leading-relaxed text-primary">רק כמה שאלות קצרות, כדי שלונה תכיר אותך.</p>
          <p className="mx-auto max-w-[18rem] pt-1 text-sm leading-relaxed text-muted">זמן משוער: כ־2 דקות</p>
        </div>
      </div>
    </ScreenShell>
  )
}
