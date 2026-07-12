import { ChatBubble } from '../components/ChatBubble'
import { PillButton } from '../components/PillButton'
import { ScreenShell } from '../components/ScreenShell'
import { useAnswer } from '../context/OnboardingContext'
import { ChoiceField } from '../fields/ChoiceField'
import { StepProgress } from '../fields/StepProgress'
import type { FocusArea } from '../types'

const OPTIONS: { id: FocusArea; label: string }[] = [
  { id: 'reminders-memory', label: 'בתזכורות ובזיכרון' },
  { id: 'people-tasks', label: 'מעקב אחרי אנשים ומשימות' },
  { id: 'planning-time', label: 'בתכנון וניהול הזמן' },
  { id: 'errands-admin', label: 'בסידורים ובבירוקרטיה' },
  { id: 'shopping-orders', label: 'בקניות ובהזמנות' },
  { id: 'something-else', label: 'במשהו אחר...' },
]

interface FocusAreaScreenProps {
  onNext: () => void
}

export function FocusAreaScreen({ onNext }: FocusAreaScreenProps) {
  const [value] = useAnswer('focusAreas')

  return (
    <ScreenShell
      top={<StepProgress />}
      footer={
        <PillButton onClick={onNext} disabled={value.length === 0}>
          המשך
        </PillButton>
      }
    >
      <ChatBubble>יש לי מטרה אחת: להוריד לך עומס מהראש. איפה את הכי רוצה שארגיש את זה?</ChatBubble>
      <ChoiceField answerKey="focusAreas" name="focus-areas" mode="multi" layout="grid" options={OPTIONS} />
    </ScreenShell>
  )
}
