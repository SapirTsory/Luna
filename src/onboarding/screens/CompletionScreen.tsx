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
      <div className="flex w-full max-w-sm flex-col items-center gap-6 text-center">
        <div className="space-y-3">
          <h1 className="mx-auto max-w-[19rem] text-[30px] font-semibold leading-[1.16] tracking-[-0.01em] text-ink sm:text-[34px]">
            מעולה 💛
          </h1>
          <p className="text-lg font-medium leading-relaxed text-primary">
            עכשיו אני כבר יודעת על מי נדבר, מתי הכי נוח לעזור לך ומתי עדיף לתת לך שקט.
          </p>
          <p className="mx-auto max-w-[18rem] pt-1 text-sm leading-relaxed text-muted">
            אפשר כבר להתחיל לשפוך עליי הכול — אני אדע מה לעשות עם זה.
          </p>
        </div>
      </div>
    </ScreenShell>
  )
}
