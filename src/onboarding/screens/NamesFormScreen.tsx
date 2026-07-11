import { ChatBubble } from '../components/ChatBubble'
import { PillButton } from '../components/PillButton'
import { ProgressBar } from '../components/ProgressBar'
import { ScreenShell } from '../components/ScreenShell'
import { TextField } from '../components/TextField'
import type { ChildInfo, HouseholdMember } from '../types'

interface NamesFormScreenProps {
  questionIndex: number
  household: HouseholdMember[]
  partnerName: string
  onPartnerNameChange: (name: string) => void
  kids: ChildInfo[]
  onAddChild: () => void
  onUpdateChild: (index: number, field: keyof ChildInfo, value: string) => void
  onRemoveChild: (index: number) => void
  onNext: () => void
}

export function NamesFormScreen({
  questionIndex,
  household,
  partnerName,
  onPartnerNameChange,
  kids,
  onAddChild,
  onUpdateChild,
  onRemoveChild,
  onNext,
}: NamesFormScreenProps) {
  const showPartner = household.includes('partner')
  const showKids = household.includes('kids')

  return (
    <ScreenShell
      top={<ProgressBar part={1} partLabel="מכירים — האנשים החשובים" questionIndex={questionIndex} />}
      footer={<PillButton onClick={onNext}>המשך</PillButton>}
    >
      <ChatBubble>מה השמות שלהם?</ChatBubble>

      {showPartner && (
        <TextField
          label="בן/בת זוג"
          placeholder="לדוגמה יונתן"
          value={partnerName}
          onChange={(e) => onPartnerNameChange(e.target.value)}
        />
      )}

      {showKids && (
        <div className="flex flex-col gap-2.5">
          {kids.map((child, index) => (
            <div key={index} className="flex items-end gap-2">
              <div className="min-w-0 flex-[2]">
                <TextField
                  label={`ילד/ה ${index + 1}`}
                  placeholder="לדוגמה נועה"
                  value={child.name}
                  onChange={(e) => onUpdateChild(index, 'name', e.target.value)}
                />
              </div>
              <div className="min-w-0 flex-1">
                <TextField
                  label="גיל"
                  placeholder="7"
                  inputMode="numeric"
                  value={child.age}
                  onChange={(e) => onUpdateChild(index, 'age', e.target.value)}
                />
              </div>
              <button
                type="button"
                onClick={() => onRemoveChild(index)}
                aria-label={`הסרת ילד/ה ${index + 1}`}
                className="mb-0.5 flex size-11 shrink-0 items-center justify-center rounded-lg text-muted hover:bg-card"
              >
                ✕
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={onAddChild}
            className="flex min-h-11 items-center justify-center gap-1.5 rounded-lg border-[1.5px] border-dashed border-border-strong py-2.5 text-sm font-bold text-primary hover:bg-card"
          >
            + הוספת ילד/ה
          </button>
        </div>
      )}
    </ScreenShell>
  )
}
