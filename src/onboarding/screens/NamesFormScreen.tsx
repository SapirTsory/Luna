import { ChatBubble } from '../components/ChatBubble'
import { PillButton } from '../components/PillButton'
import { ScreenShell } from '../components/ScreenShell'
import { TextField } from '../components/TextField'
import { useAnswer } from '../context/OnboardingContext'
import { RepeatableFieldList } from '../fields/RepeatableFieldList'
import { StepProgress } from '../fields/StepProgress'

interface NamesFormScreenProps {
  onNext: () => void
}

export function NamesFormScreen({ onNext }: NamesFormScreenProps) {
  const [household] = useAnswer('household')
  const [partnerName, setPartnerName] = useAnswer('partnerName')
  const showPartner = household.includes('partner')
  const showKids = household.includes('kids')

  return (
    <ScreenShell top={<StepProgress />} footer={<PillButton onClick={onNext}>המשך</PillButton>}>
      <ChatBubble>מה השמות שלהם?</ChatBubble>

      {showPartner && (
        <TextField
          label="בן/בת זוג"
          placeholder="לדוגמה יונתן"
          value={partnerName}
          onChange={(e) => setPartnerName(e.target.value)}
        />
      )}

      {showKids && (
        <RepeatableFieldList
          listKey="children"
          emptyItem={{ name: '', age: '' }}
          addLabel="+ הוספת ילד/ה"
          removeLabel={(index) => `הסרת ילד/ה ${index + 1}`}
          columns={[
            { key: 'name', label: (i) => `ילד/ה ${i + 1}`, placeholder: 'לדוגמה נועה', flex: 2 },
            { key: 'age', label: () => 'גיל', placeholder: '7', inputMode: 'numeric', flex: 1 },
          ]}
        />
      )}
    </ScreenShell>
  )
}
