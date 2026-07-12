import { ChatBubble } from '../components/ChatBubble'
import { PillButton } from '../components/PillButton'
import { ScreenShell } from '../components/ScreenShell'
import { RepeatableFieldList } from '../fields/RepeatableFieldList'
import { StepProgress } from '../fields/StepProgress'

interface KidsContactScreenProps {
  onNext: () => void
}

export function KidsContactScreen({ onNext }: KidsContactScreenProps) {
  return (
    <ScreenShell top={<StepProgress />} footer={<PillButton onClick={onNext}>המשך</PillButton>}>
      <ChatBubble>למי מתקשרים כשיש בלגן עם הילדים? יש עוד מישהו חשוב שכדאי שאכיר?</ChatBubble>

      <RepeatableFieldList
        listKey="kidsContacts"
        emptyItem={{ role: '', name: '' }}
        addLabel="+ הוספת עוד איש קשר"
        removeLabel={(index) => `הסרת איש קשר ${index + 1}`}
        rowClassName="rounded-xl border border-border p-2"
        columns={[
          { key: 'role', label: () => 'מי זה/זאת', placeholder: 'סבא, סבתא, מטפלת...' },
          { key: 'name', label: () => 'שם', placeholder: 'שם' },
        ]}
      />
      <p className="px-0.5 text-xs text-muted">אפשר להוסיף יותר מאחד/ת</p>
    </ScreenShell>
  )
}
