import { PillButton } from '../components/PillButton'
import { ScreenShell } from '../components/ScreenShell'
import { TextField } from '../components/TextField'

interface PhoneScreenProps {
  value: string
  onChange: (phoneNumber: string) => void
  onNext: () => void
}

const MIN_DIGITS = 9

export function PhoneScreen({ value, onChange, onNext }: PhoneScreenProps) {
  const digitCount = value.replace(/\D/g, '').length

  return (
    <ScreenShell
      centered
      footer={
        <PillButton onClick={onNext} disabled={digitCount < MIN_DIGITS}>
          המשך
        </PillButton>
      }
    >
      <div className="flex w-full max-w-sm flex-col items-center gap-6 text-center">
        <div className="space-y-3">
          <h1 className="mx-auto max-w-[19rem] text-[30px] font-semibold leading-[1.16] tracking-[-0.01em] text-ink sm:text-[34px]">
            לאיזה מספר אשלח הודעות?
          </h1>
          <p className="text-lg font-medium leading-relaxed text-primary">שם ננהל את כל השיחות שלנו.💛</p>
        </div>
        <TextField
          label="מספר הטלפון שלך"
          hideLabel
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder="050-1234567"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          autoFocus
          className="text-center"
        />
      </div>
    </ScreenShell>
  )
}
