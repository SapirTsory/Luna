import { ChatBubble } from '../components/ChatBubble'
import { PillButton } from '../components/PillButton'
import { ScreenShell } from '../components/ScreenShell'
import { useAnswer } from '../context/OnboardingContext'
import { ChoiceField } from '../fields/ChoiceField'
import { StepProgress } from '../fields/StepProgress'
import type { MemoryHabit } from '../types'

const OPTIONS: { id: MemoryHabit; label: string }[] = [
  { id: 'writes-to-self', label: 'כותבת לעצמי' },
  { id: 'messages-to-self', label: 'שולחת לעצמי הודעה' },
  { id: 'puts-in-calendar', label: 'שמה ביומן' },
  { id: 'phone-reminder', label: 'תזכורת בטלפון' },
  { id: 'just-remembers', label: 'פשוט זוכרת בראש' },
]

interface MemoryHabitScreenProps {
  onNext: () => void
}

export function MemoryHabitScreen({ onNext }: MemoryHabitScreenProps) {
  const [value] = useAnswer('memoryHabit')

  return (
    <ScreenShell
      top={<StepProgress />}
      footer={
        <PillButton onClick={onNext} disabled={!value}>
          המשך
        </PillButton>
      }
    >
      <ChatBubble>כל אחת מנהלת את הראש שלה קצת אחרת 😊 כשקופץ לך משהו שאת לא רוצה לשכוח, מה את עושה בדרך כלל?</ChatBubble>
      <ChoiceField answerKey="memoryHabit" name="memory-habit" mode="single" layout="grid" options={OPTIONS} />
    </ScreenShell>
  )
}
