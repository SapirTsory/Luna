import { PillButton } from '../components/PillButton'
import { ScreenShell } from '../components/ScreenShell'
import { WhatsAppIcon } from '../components/WhatsAppIcon'
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
    <ScreenShell
      centered
      footer={
        <PillButton variant="whatsapp" onClick={handleHandoff} className="flex items-center justify-center gap-2">
          <WhatsAppIcon size={18} />
          חזרה לוואטסאפ
        </PillButton>
      }
    >
      <h1 className="text-xl font-semibold leading-snug">מעולה 💛</h1>
      <p className="text-sm leading-relaxed text-muted">
        עכשיו אני כבר יודעת על מי נדבר, מתי הכי נוח לעזור לך ומתי עדיף לתת לך שקט.
      </p>
      <p className="text-sm leading-relaxed text-muted">אפשר כבר להתחיל לשפוך עליי הכול — אני אדע מה לעשות עם זה.</p>
    </ScreenShell>
  )
}
