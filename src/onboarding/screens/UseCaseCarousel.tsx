import { useState } from 'react'
import { LunaLogo } from '../components/LunaLogo'
import { PillButton } from '../components/PillButton'
import { ScreenShell } from '../components/ScreenShell'
import { SkipLink } from '../components/SkipLink'

interface UseCaseCarouselProps {
  onNext: () => void
}

const SLIDES = ['reminder', 'group-forward'] as const

export function UseCaseCarousel({ onNext }: UseCaseCarouselProps) {
  const [slide, setSlide] = useState(0)

  function handleContinue() {
    if (slide < SLIDES.length - 1) {
      setSlide(slide + 1)
    } else {
      onNext()
    }
  }

  return (
    <ScreenShell
      top={
        <div className="flex flex-col items-center gap-3 text-center">
          <LunaLogo withWordmark />
          <h1 className="text-[15px] font-semibold">איפה לונה יכולה לעזור לך?</h1>
        </div>
      }
      footer={
        <>
          <div className="flex justify-center gap-1.5 pb-1" aria-hidden="true">
            {SLIDES.map((_, i) => (
              <span
                key={i}
                className={`h-1.5 rounded-full transition-all ${i === slide ? 'w-4 bg-primary' : 'w-1.5 bg-border-strong'}`}
              />
            ))}
          </div>
          <SkipLink onClick={onNext}>דלגי על הדוגמאות</SkipLink>
          <PillButton onClick={handleContinue}>הבנתי, בואי נמשיך</PillButton>
        </>
      }
    >
      {SLIDES[slide] === 'reminder' ? <ReminderSlide /> : <GroupForwardSlide />}
    </ScreenShell>
  )
}

function ReminderSlide() {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-right text-[13px] leading-relaxed italic text-muted">
        "תמיד נזכרת להתקשר לחברת החשמל כשהם כבר סגורים, אז כבר שבועיים שאני לא מגיעה לזה."
      </p>
      <div className="flex flex-col gap-2 rounded-2xl bg-whatsapp-bg p-3">
        <div className="flex flex-col items-end gap-1 self-end rounded-2xl rounded-tl-[3px] bg-whatsapp-bubble px-3 py-2 text-[13px] max-w-[85%]">
          <span>תזכירי לי להתקשר לחברת החשמל</span>
          <span className="text-[10px] text-whatsapp-accent">23:56</span>
        </div>
        <div className="flex flex-col items-start gap-1 self-start rounded-2xl rounded-tr-[3px] bg-card px-3 py-2 text-[13px] max-w-[90%] shadow-sm">
          <span>
            רוצה לנצל את הדרך לעבודה כדי להתקשר לחברת החשמל?{' '}
            <span dir="ltr" className="text-[#0088CC] underline">
              03-1234567
            </span>
            <br />
            פעילים <span dir="ltr">08:00–13:00</span>
          </span>
          <span className="text-[10px] text-muted-soft">08:13</span>
        </div>
      </div>
    </div>
  )
}

function GroupForwardSlide() {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-right text-[13px] leading-relaxed italic text-muted">
        כשמגיעה הודעה מהגן בדיוק כשאת עם הילדים, והיא נעלמת בתוך כל ההודעות — ואין סיכוי שתזכרי אותה למחר בבוקר.
      </p>
      <div className="flex flex-col gap-1.5 rounded-xl bg-whatsapp-bg p-2 opacity-85">
        <div className="text-center text-[11px] text-muted">🏫 קבוצה: גן של רוני</div>
        <div className="self-start rounded-2xl rounded-tr-[3px] bg-card px-2.5 py-1.5 text-[12px] max-w-[90%]">
          <div className="mb-0.5 text-[11px] font-bold text-primary">שירי, הגננת של רוני</div>
          מחר מצטלמים לסוף שנה, נא לשלוח את הילדים בחולצה לבנה
        </div>
      </div>
      <div className="text-center text-[12px] text-muted">↓ מעבירה ללונה</div>
      <div className="flex flex-col gap-2 rounded-2xl bg-whatsapp-bg p-3 shadow-sm">
        <div className="mb-0.5 flex items-center gap-1.5">
          <LunaLogo size={20} />
          <span className="text-[13px] font-bold">לונה</span>
        </div>
        <div className="flex flex-col items-end gap-1 self-end rounded-2xl rounded-tl-[3px] bg-whatsapp-bubble px-3 py-2 text-[13px] max-w-[88%]">
          <span className="flex items-center gap-1 text-[11px] italic text-muted">↪ הועבר</span>
          מחר מצטלמים לסוף שנה, נא לשלוח את הילדים בחולצה לבנה
          <span className="text-[10px] text-whatsapp-accent">17:57</span>
        </div>
        <div className="self-start rounded-2xl rounded-tr-[3px] bg-card px-3 py-2 text-[13px] max-w-[88%]">
          📅 מעולה, הוספתי!
        </div>
        <div className="self-center rounded-lg bg-black/10 px-3 py-0.5 text-[11px] font-semibold text-muted">היום</div>
        <div className="self-start rounded-2xl rounded-tr-[3px] bg-card px-3 py-2 text-[13px] max-w-[88%]">
          היי, זכרת לשים לרוני חולצה לבנה? 😊
        </div>
      </div>
    </div>
  )
}
