import { ChatBubble } from '../components/ChatBubble'
import { ChoiceGroup } from '../components/ChoiceGroup'
import { PillButton } from '../components/PillButton'
import { ProgressBar } from '../components/ProgressBar'
import { ScreenShell } from '../components/ScreenShell'
import type { MemoryHabit } from '../types'

const OPTIONS: { id: MemoryHabit; label: string }[] = [
  { id: 'writes-to-self', label: 'כותבת לעצמי' },
  { id: 'messages-to-self', label: 'שולחת לעצמי הודעה' },
  { id: 'puts-in-calendar', label: 'שמה ביומן' },
  { id: 'phone-reminder', label: 'תזכורת בטלפון' },
  { id: 'just-remembers', label: 'פשוט זוכרת בראש' },
]

interface MemoryHabitScreenProps {
  questionIndex: number
  value: MemoryHabit | null
  onChange: (value: MemoryHabit) => void
  onNext: () => void
}

export function MemoryHabitScreen({ questionIndex, value, onChange, onNext }: MemoryHabitScreenProps) {
  return (
    <ScreenShell
      top={<ProgressBar part={2} partLabel="איך את עובדת היום" questionIndex={questionIndex} />}
      footer={
        <PillButton onClick={onNext} disabled={!value}>
          המשך
        </PillButton>
      }
    >
      <ChatBubble>כל אחת מנהלת את הראש שלה קצת אחרת 😊 כשקופץ לך משהו שאת לא רוצה לשכוח, מה את עושה בדרך כלל?</ChatBubble>
      <ChoiceGroup
        name="memory-habit"
        mode="single"
        layout="grid"
        options={OPTIONS}
        value={value ? [value] : []}
        onChange={(v) => onChange(v[0] as MemoryHabit)}
      />
    </ScreenShell>
  )
}
