import { useState } from 'react'
import { LunaLogo } from '../components/LunaLogo'
import { PillButton } from '../components/PillButton'
import { ScreenShell } from '../components/ScreenShell'
import { SkipLink } from '../components/SkipLink'
import {
  ExampleQuote,
  ExternalSnippet,
  LunaBubble,
  OutgoingBubble,
  TimeDivider,
  VoiceMessageBubble,
} from '../components/ExampleSlideParts'

interface UseCaseCarouselProps {
  onNext: () => void
}

const SLIDES = [
  { label: 'דוגמה 1', Component: ReminderSlide },
  { label: 'דוגמה 2', Component: GroupForwardSlide },
  { label: 'דוגמה 3', Component: InsuranceSlide },
  { label: 'דוגמה 4', Component: PayboxSlide },
]

export function UseCaseCarousel({ onNext }: UseCaseCarouselProps) {
  const [slide, setSlide] = useState(0)
  const Slide = SLIDES[slide].Component

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
          <div className="flex justify-center gap-1.5 pb-1">
            {SLIDES.map((s, i) => (
              <button
                key={i}
                type="button"
                aria-label={s.label}
                aria-current={i === slide}
                onClick={() => setSlide(i)}
                className="flex h-6 items-center justify-center px-0.5"
              >
                <span className={`h-1.5 rounded-full transition-all ${i === slide ? 'w-4 bg-primary' : 'w-1.5 bg-border-strong'}`} />
              </button>
            ))}
          </div>
          <SkipLink onClick={onNext}>דלגי על הדוגמאות</SkipLink>
          <PillButton onClick={handleContinue}>הבנתי, בואי נמשיך</PillButton>
        </>
      }
    >
      <Slide />
    </ScreenShell>
  )
}

function ReminderSlide() {
  return (
    <div className="flex flex-col gap-3">
      <ExampleQuote>"תמיד נזכרת להתקשר לחברת החשמל כשהם כבר סגורים, אז כבר שבועיים שאני לא מגיעה לזה."</ExampleQuote>
      <div className="flex flex-col gap-2 rounded-2xl bg-whatsapp-bg p-3 font-whatsapp">
        <OutgoingBubble time="23:56">תזכירי לי להתקשר לחברת החשמל</OutgoingBubble>
        <LunaBubble time="08:13">
          רוצה לנצל את הדרך לעבודה כדי להתקשר לחברת החשמל?{' '}
          <span dir="ltr" className="text-[#0088CC] underline">
            03-1234567
          </span>
          <br />
          פעילים <span dir="ltr">08:00–13:00</span>
        </LunaBubble>
      </div>
    </div>
  )
}

function GroupForwardSlide() {
  return (
    <div className="flex flex-col gap-3">
      <ExampleQuote>
        כשמגיעה הודעה מהגן בדיוק כשאת עם הילדים, והיא נעלמת בתוך כל ההודעות — ואין סיכוי שתזכרי אותה למחר בבוקר.
      </ExampleQuote>
      <ExternalSnippet icon="🏫" source="גן של רוני" sender="שירי, הגננת">
        מחר מצטלמים לסוף שנה, נא לשלוח את הילדים בחולצה לבנה
      </ExternalSnippet>
      <div className="flex flex-col gap-2 rounded-2xl bg-whatsapp-bg p-3 font-whatsapp">
        <OutgoingBubble time="17:57" forwarded read>
          מחר מצטלמים לסוף שנה, נא לשלוח את הילדים בחולצה לבנה
        </OutgoingBubble>
        <TimeDivider>למחרת בבוקר</TimeDivider>
        <LunaBubble>היי, זכרת לשים לרוני חולצה לבנה? 😊</LunaBubble>
      </div>
    </div>
  )
}

function InsuranceSlide() {
  return (
    <div className="flex flex-col gap-3">
      <ExampleQuote>סופסוף זכרת להגיש את המסמכים לביטוח, ועכשיו את צריכה לוודא שהכסף נכנס — יש לזה 28 ימי עסקים.</ExampleQuote>
      <div className="flex flex-col gap-2 rounded-2xl bg-whatsapp-bg p-3 font-whatsapp">
        <VoiceMessageBubble duration="1:30" time="09:12" />
        <LunaBubble time="09:13">קיבלתי ❤️ מעכשיו זה עליי, לא צריך לזכור יותר.</LunaBubble>
        <TimeDivider>22 ימים אחר כך</TimeDivider>
        <LunaBubble>
          הכסף הגיע לחשבון הבנק שלך בדיוק כמו שהיה צריך — סה״כ 4 התייעצויות שונות בסכום כולל של{' '}
          <span dir="ltr">2,756 ₪</span>.
        </LunaBubble>
      </div>
    </div>
  )
}

function PayboxSlide() {
  return (
    <div className="flex flex-col gap-3">
      <ExampleQuote>
        מישהי בקבוצה של הגן שולחת לינק לתשלום לוועד, ואת אומרת לעצמך שתשלמי בערב — וכמובן שזה נשכח עד השבוע הבא.
      </ExampleQuote>
      <ExternalSnippet icon="💜" source="קבוצת ההורים · גן רוני" sender="מיכל">
        לינק לתשלום ועד הגן החודש — מי שעוד לא שילמה 🙏
      </ExternalSnippet>
      <div className="flex flex-col gap-2 rounded-2xl bg-whatsapp-bg p-3 font-whatsapp">
        <OutgoingBubble time="18:24" forwarded read>
          לינק לתשלום ועד הגן החודש — מי שעוד לא שילמה 🙏
        </OutgoingBubble>
        <LunaBubble time="21:00">
          היי, ראיתי שיש לך ערב פנוי — רוצה רגע לשלם את ועד הגן?{' '}
          <span dir="ltr" className="text-[#0088CC] underline">
            paybox.co.il/pay/8842
          </span>
        </LunaBubble>
      </div>
    </div>
  )
}
