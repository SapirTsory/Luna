import { PillButton } from '../components/PillButton'
import { ScreenShell } from '../components/ScreenShell'

interface WelcomeScreenProps {
  onNext: () => void
}

const WELCOME_MESSAGES: { title: string; subtitle: string; detail?: string }[] = [
  {
    title: 'לא הכל צריך להיות עליך',
    subtitle: 'מהיום יש לך את לונה',
    detail: 'כל מה שמסתובב לך בראש, במקום אחד.',
  },
  { title: 'את לא צריכה להספיק הכול.', subtitle: 'מהיום יש לך לונה.' },
  { title: 'נשים עסוקות לא מנהלות הכול לבד.', subtitle: 'יש להן את לונה.' },
  { title: 'לא היית אמורה לזכור הכול.', subtitle: 'בשביל זה יש את לונה.' },
]

export function WelcomeScreen({ onNext }: WelcomeScreenProps) {
  // Lets us review copy options at ?welcomeVariant=1 through ?welcomeVariant=4.
  const requestedVariant = Number(new URLSearchParams(window.location.search).get('welcomeVariant'))
  const message = WELCOME_MESSAGES[requestedVariant - 1] ?? WELCOME_MESSAGES[0]

  return (
    <ScreenShell centered>
      <div className="flex w-full max-w-sm flex-col items-center gap-6 text-center">
        <div className="space-y-3">
          <h1 className="mx-auto max-w-[19rem] text-[30px] font-semibold leading-[1.16] tracking-[-0.01em] text-ink sm:text-[34px]">
            {message.title}
          </h1>
          <p className="text-lg font-medium leading-relaxed text-primary">{message.subtitle}</p>
          {message.detail && <p className="mx-auto max-w-[18rem] pt-1 text-sm leading-relaxed text-muted">{message.detail}</p>}
        </div>
        <PillButton onClick={onNext} autoFocus className="w-full max-w-[18rem]">
          בואי נתחיל
        </PillButton>
      </div>
    </ScreenShell>
  )
}
