import { ChatBubble } from '../components/ChatBubble'
import { ChoiceGroup } from '../components/ChoiceGroup'
import { PillButton } from '../components/PillButton'
import { ProgressBar } from '../components/ProgressBar'
import { ScreenShell } from '../components/ScreenShell'
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
  questionIndex: number
  value: FocusArea[]
  onChange: (value: FocusArea[]) => void
  onNext: () => void
}

export function FocusAreaScreen({ questionIndex, value, onChange, onNext }: FocusAreaScreenProps) {
  return (
    <ScreenShell
      top={<ProgressBar part={3} partLabel="לסיום" questionIndex={questionIndex} />}
      footer={
        <PillButton onClick={onNext} disabled={value.length === 0}>
          המשך
        </PillButton>
      }
    >
      <ChatBubble>יש לי מטרה אחת: להוריד לך עומס מהראש. איפה את הכי רוצה שארגיש את זה?</ChatBubble>
      <ChoiceGroup
        name="focus-areas"
        mode="multi"
        layout="grid"
        options={OPTIONS}
        value={value}
        onChange={(v) => onChange(v as FocusArea[])}
      />
    </ScreenShell>
  )
}
