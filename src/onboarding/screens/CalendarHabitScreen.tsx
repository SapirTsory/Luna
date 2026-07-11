import { ChatBubble } from '../components/ChatBubble'
import { ChoiceGroup } from '../components/ChoiceGroup'
import { PillButton } from '../components/PillButton'
import { ProgressBar } from '../components/ProgressBar'
import { ScreenShell } from '../components/ScreenShell'
import type { CalendarHabit } from '../types'

const OPTIONS: { id: CalendarHabit; label: string }[] = [
  { id: 'lives-by-it', label: 'אני חיה לפיו' },
  { id: 'meetings-only', label: 'רק פגישות נכנסות אליו' },
  { id: 'barely-uses', label: 'כמעט לא משתמשת בו' },
]

interface CalendarHabitScreenProps {
  questionIndex: number
  value: CalendarHabit | null
  onChange: (value: CalendarHabit) => void
  onNext: () => void
}

export function CalendarHabitScreen({ questionIndex, value, onChange, onNext }: CalendarHabitScreenProps) {
  return (
    <ScreenShell
      top={<ProgressBar part={2} partLabel="איך את עובדת היום" questionIndex={questionIndex} />}
      footer={
        <PillButton onClick={onNext} disabled={!value}>
          המשך
        </PillButton>
      }
    >
      <ChatBubble>ומה לגבי היומן שלך?</ChatBubble>
      <ChoiceGroup
        name="calendar-habit"
        mode="single"
        options={OPTIONS}
        value={value ? [value] : []}
        onChange={(v) => onChange(v[0] as CalendarHabit)}
      />
    </ScreenShell>
  )
}
