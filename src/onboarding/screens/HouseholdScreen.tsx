import { ChatBubble } from '../components/ChatBubble'
import { PillButton } from '../components/PillButton'
import { ScreenShell } from '../components/ScreenShell'
import { useAnswer } from '../context/OnboardingContext'
import { ChoiceField } from '../fields/ChoiceField'
import { StepProgress } from '../fields/StepProgress'
import type { HouseholdMember } from '../types'

const OPTIONS: { id: HouseholdMember; label: string }[] = [
  { id: 'partner', label: 'בן/בת זוג' },
  { id: 'kids', label: 'ילדים' },
  { id: 'parent', label: 'הורה / קרוב משפחה' },
  { id: 'alone', label: 'לבד' },
  { id: 'other', label: 'מישהו אחר' },
]

interface HouseholdScreenProps {
  onNext: () => void
}

export function HouseholdScreen({ onNext }: HouseholdScreenProps) {
  const [household] = useAnswer('household')

  return (
    <ScreenShell
      top={<StepProgress />}
      footer={
        <PillButton onClick={onNext} disabled={household.length === 0}>
          המשך
        </PillButton>
      }
    >
      <ChatBubble>בואי נכיר קצת — עם מי את גרה בבית?</ChatBubble>
      <ChoiceField answerKey="household" name="household" mode="multi" layout="grid" options={OPTIONS} />
    </ScreenShell>
  )
}
