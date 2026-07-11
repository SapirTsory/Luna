import { ChatBubble } from '../components/ChatBubble'
import { ChoiceGroup } from '../components/ChoiceGroup'
import { PillButton } from '../components/PillButton'
import { ProgressBar } from '../components/ProgressBar'
import { ScreenShell } from '../components/ScreenShell'
import type { HouseholdMember } from '../types'

const OPTIONS: { id: HouseholdMember; label: string }[] = [
  { id: 'partner', label: 'בן/בת זוג' },
  { id: 'kids', label: 'ילדים' },
  { id: 'parent', label: 'הורה / קרוב משפחה' },
  { id: 'alone', label: 'לבד' },
  { id: 'other', label: 'מישהו אחר' },
]

interface HouseholdScreenProps {
  questionIndex: number
  value: HouseholdMember[]
  onChange: (value: HouseholdMember[]) => void
  onNext: () => void
}

export function HouseholdScreen({ questionIndex, value, onChange, onNext }: HouseholdScreenProps) {
  return (
    <ScreenShell
      top={<ProgressBar part={1} partLabel="מכירים — האנשים החשובים" questionIndex={questionIndex} />}
      footer={
        <PillButton onClick={onNext} disabled={value.length === 0}>
          המשך
        </PillButton>
      }
    >
      <ChatBubble>בואי נכיר קצת — עם מי את גרה בבית?</ChatBubble>
      <ChoiceGroup
        name="household"
        mode="multi"
        layout="grid"
        options={OPTIONS}
        value={value}
        onChange={(v) => onChange(v as HouseholdMember[])}
      />
    </ScreenShell>
  )
}
