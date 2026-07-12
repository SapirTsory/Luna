import { PillButton } from '../components/PillButton'
import { ScreenShell } from '../components/ScreenShell'
import { buildWhatsAppHandoffUrl, submitOnboarding } from '../submitOnboarding'
import type { OnboardingAnswers } from '../types'

interface CompletionScreenProps {
  answers: OnboardingAnswers
}

export function CompletionScreen({ answers }: CompletionScreenProps) {
  function handleHandoff() {
    submitOnboarding(answers)
    window.location.href = buildWhatsAppHandoffUrl()
  }

  return (
    <ScreenShell centered footer={<PillButton onClick={handleHandoff}>📤 חזרה לוואטסאפ</PillButton>}>
      <div className="text-2xl" aria-hidden="true">
        🌙✨
      </div>
      <h1 className="text-xl font-semibold leading-snug">
        מוכנה!
        <br />
        אני כבר מכירה אותך קצת
      </h1>
      <p className="text-sm leading-relaxed text-muted">מעכשיו, פשוט שולחים לי — ואני אדע להתאים את עצמי בדיוק אלייך.</p>
      <p className="text-xs font-bold text-whatsapp-accent">🟢 בלחיצה על הכפתור חוזרים לוואטסאפ</p>
    </ScreenShell>
  )
}
