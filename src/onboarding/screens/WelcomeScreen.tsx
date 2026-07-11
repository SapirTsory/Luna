import { LunaLogo } from '../components/LunaLogo'
import { PillButton } from '../components/PillButton'
import { ScreenShell } from '../components/ScreenShell'

interface WelcomeScreenProps {
  onNext: () => void
}

export function WelcomeScreen({ onNext }: WelcomeScreenProps) {
  return (
    <ScreenShell
      top={<div className="flex justify-center"><LunaLogo withWordmark /></div>}
      centered
      footer={
        <PillButton onClick={onNext} autoFocus>
          בואי נכיר →
        </PillButton>
      }
    >
      <LunaLogo size={56} />
      <h1 className="font-serif text-xl font-semibold leading-snug">
        היי, אני לונה 👋
        <br />
        העוזרת שנכנסת הביתה
      </h1>
      <p className="text-sm leading-relaxed text-muted">
        הדבר המינימלי שכל אמא צריכה — במיוחד אמא מודרנית עם יותר מדי טאבים פתוחים בראש.
      </p>
    </ScreenShell>
  )
}
