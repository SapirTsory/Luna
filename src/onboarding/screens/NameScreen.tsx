import { PillButton } from '../components/PillButton'
import { ScreenShell } from '../components/ScreenShell'
import { TextField } from '../components/TextField'
import { useAnswer } from '../context/OnboardingContext'

interface NameScreenProps {
  onNext: () => void
}

export function NameScreen({ onNext }: NameScreenProps) {
  const [userName, setUserName] = useAnswer('userName')

  return (
    <ScreenShell
      centered
      footer={
        <PillButton onClick={onNext} disabled={userName.trim().length === 0}>
          המשך
        </PillButton>
      }
    >
      <div className="flex w-full max-w-sm flex-col items-center gap-6 text-center">
        <div className="space-y-3">
          <h1 className="mx-auto max-w-[19rem] text-[30px] font-semibold leading-[1.16] tracking-[-0.01em] text-ink sm:text-[34px]">
            היי, אני לונה 👋
          </h1>
          <p className="text-lg font-medium leading-relaxed text-primary">איך תרצי שאפנה אלייך?</p>
        </div>
        <TextField
          label="השם שלך"
          hideLabel
          placeholder="השם שלך"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          autoFocus
          className="text-center"
        />
      </div>
    </ScreenShell>
  )
}
