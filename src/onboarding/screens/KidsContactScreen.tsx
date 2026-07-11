import { ChatBubble } from '../components/ChatBubble'
import { PillButton } from '../components/PillButton'
import { ProgressBar } from '../components/ProgressBar'
import { ScreenShell } from '../components/ScreenShell'
import { TextField } from '../components/TextField'
import type { KidsContact } from '../types'

interface KidsContactScreenProps {
  questionIndex: number
  contacts: KidsContact[]
  onAdd: () => void
  onUpdate: (index: number, field: keyof KidsContact, value: string) => void
  onRemove: (index: number) => void
  onNext: () => void
}

export function KidsContactScreen({ questionIndex, contacts, onAdd, onUpdate, onRemove, onNext }: KidsContactScreenProps) {
  return (
    <ScreenShell
      top={<ProgressBar part={1} partLabel="מכירים — האנשים החשובים" questionIndex={questionIndex} />}
      footer={<PillButton onClick={onNext}>המשך</PillButton>}
    >
      <ChatBubble>למי מתקשרים כשיש בלגן עם הילדים? יש עוד מישהו חשוב שכדאי שאכיר?</ChatBubble>

      <div className="flex flex-col gap-2.5">
        {contacts.map((contact, index) => (
          <div key={index} className="flex items-end gap-2 rounded-xl border border-border p-2">
            <TextField
              label="מי זה/זאת"
              placeholder="סבא, סבתא, מטפלת..."
              value={contact.role}
              onChange={(e) => onUpdate(index, 'role', e.target.value)}
            />
            <TextField label="שם" placeholder="שם" value={contact.name} onChange={(e) => onUpdate(index, 'name', e.target.value)} />
            <button
              type="button"
              onClick={() => onRemove(index)}
              aria-label={`הסרת איש קשר ${index + 1}`}
              className="mb-0.5 flex size-11 shrink-0 items-center justify-center rounded-lg text-muted hover:bg-card"
            >
              ✕
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={onAdd}
          className="flex min-h-11 items-center justify-center gap-1.5 rounded-lg border-[1.5px] border-dashed border-border-strong py-2.5 text-sm font-bold text-primary hover:bg-card"
        >
          + הוספת עוד איש קשר
        </button>
        <p className="px-0.5 text-xs text-muted">אפשר להוסיף יותר מאחד/ת</p>
      </div>
    </ScreenShell>
  )
}
