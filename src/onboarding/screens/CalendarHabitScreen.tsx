import { ChatBubble } from '../components/ChatBubble'
import { PillButton } from '../components/PillButton'
import { ScreenShell } from '../components/ScreenShell'
import { useAnswer } from '../context/OnboardingContext'
import { ChoiceField } from '../fields/ChoiceField'
import { StepProgress } from '../fields/StepProgress'
import type { CalendarHabit } from '../types'

const OPTIONS: { id: CalendarHabit; label: string }[] = [
  { id: 'lives-by-it', label: 'אני חיה לפיו' },
  { id: 'meetings-only', label: 'רק פגישות נכנסות אליו' },
  { id: 'barely-uses', label: 'כמעט לא משתמשת בו' },
]

interface CalendarHabitScreenProps {
  onNext: () => void
}

export function CalendarHabitScreen({ onNext }: CalendarHabitScreenProps) {
  const [value] = useAnswer('calendarHabit')

  return (
    <ScreenShell
      top={<StepProgress />}
      footer={
        <PillButton onClick={onNext} disabled={!value}>
          המשך
        </PillButton>
      }
    >
      <ChatBubble>ומה לגבי היומן שלך?</ChatBubble>
      <ChoiceField answerKey="calendarHabit" name="calendar-habit" mode="single" options={OPTIONS} />
    </ScreenShell>
  )
}
