import { AnimatePresence, motion, MotionConfig } from 'framer-motion'
import { useEffect, useState } from 'react'
import { ChatMessage, TYPING_MS } from '../components/ChatMessage'
import { LunaBubble, OutgoingBubble, TimeDivider } from '../components/ExampleSlideParts'
import { LunaLogo } from '../components/LunaLogo'
import { PillButton } from '../components/PillButton'
import { ScreenShell } from '../components/ScreenShell'
import { SkipLink } from '../components/SkipLink'

function createSequencer(start = 150) {
  let cursor = start
  return (duration: number) => {
    const delay = cursor
    cursor += duration
    return delay
  }
}

interface UseCaseCarouselProps {
  onNext: () => void
}

const SLIDES = [
  { label: 'דוגמה 1', Component: ReminderSlide },
  { label: 'דוגמה 2', Component: GroupForwardSlide },
  { label: 'דוגמה 3', Component: InsuranceSlide },
  { label: 'דוגמה 4', Component: DaycareDeadlineSlide },
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
      <MotionConfig reducedMotion="user">
        <Slide />
      </MotionConfig>
    </ScreenShell>
  )
}

function ReminderSlide() {
  const next = createSequencer()
  const satDelay = next(350)
  const requestDelay = next(1150) // bubble appears, settles, and the read receipt turns blue
  const sunDelay = next(350)
  const replyDelay = next(TYPING_MS + 250)

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-1 text-right">
        <h2 className="text-[14px] font-bold leading-snug">המחשבות שלך לא צריכות לחכות לבוקר.</h2>
        <p className="text-[13px] leading-relaxed text-muted">
          עלה לך משהו לראש? כתבי אותו ללונה. היא כבר תזכיר לך בזמן הנכון.
        </p>
      </div>
      <div className="flex flex-col gap-2 rounded-2xl bg-whatsapp-bg p-3 font-whatsapp">
        <TimeDivider delay={satDelay}>שבת</TimeDivider>
        <OutgoingBubble time="23:47" read delay={requestDelay}>
          לא לשכוח להזמין טכנאי למזגן.
        </OutgoingBubble>
        <TimeDivider delay={sunDelay}>ראשון</TimeDivider>
        <LunaBubble time="09:15" delay={replyDelay}>
          בוקר טוב, עכשיו זה זמן טוב להתקשר לטכנאי.
          <br />
          📞 מספר טלפון:{' '}
          <span dir="ltr" className="text-[#0088CC] underline">
            052-1234567
          </span>
          <br />
          🕒 שעות פעילות: <span dir="ltr">08:00–18:00</span>
        </LunaBubble>
      </div>
    </div>
  )
}

function GroupForwardSlide() {
  const next = createSequencer()
  const groupMsgDelay = next(TYPING_MS + 2800) // teacher's message arrives, then holds so it's readable
  const switchDelay = next(1) // window switches over to the Luna conversation

  const lunaNext = createSequencer(200)
  const forwardedDelay = lunaNext(450)
  const confirmDelay = lunaNext(TYPING_MS + 250)
  const todayDelay = lunaNext(250)
  const reminderDelay = lunaNext(TYPING_MS + 250)

  const [view, setView] = useState<'group' | 'luna'>('group')

  useEffect(() => {
    setView('group')
    const timer = setTimeout(() => setView('luna'), switchDelay)
    return () => clearTimeout(timer)
  }, [switchDelay])

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-1 text-right">
        <h2 className="text-[14px] font-bold leading-snug">לא צריך לזכור את כל מה שעובר בוואטסאפ.</h2>
        <p className="text-[13px] leading-relaxed text-muted">לונה תזכור את זה בשבילך.</p>
      </div>
      <motion.div layout className="flex flex-col gap-2 rounded-2xl bg-whatsapp-bg p-3 shadow-sm font-whatsapp">
        <AnimatePresence mode="wait">
          {view === 'group' ? (
            <motion.div
              key="group-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
              className="flex flex-col gap-2"
            >
              <div className="mb-0.5 flex items-center gap-1.5">
                <span aria-hidden="true">🏫</span>
                <span className="text-[13px] font-bold">גן של רוני</span>
              </div>
              <ChatMessage
                incoming
                delay={groupMsgDelay}
                className="self-start rounded-2xl rounded-tr-[3px] bg-card px-2.5 py-1.5 text-[12px] max-w-[90%]"
              >
                <div className="mb-0.5 text-[11px] font-bold text-primary">שירי, הגננת של רוני</div>
                מחר מצטלמים לסוף שנה, נא לשלוח את הילדים בחולצה לבנה
              </ChatMessage>
            </motion.div>
          ) : (
            <motion.div
              key="luna-view"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
              className="flex flex-col gap-2"
            >
              <div className="mb-0.5 flex items-center gap-1.5">
                <LunaLogo size={20} />
                <span className="text-[13px] font-bold">לונה</span>
              </div>
              <OutgoingBubble time="17:57" forwarded delay={forwardedDelay}>
                מחר מצטלמים לסוף שנה, נא לשלוח את הילדים בחולצה לבנה
              </OutgoingBubble>
              <LunaBubble delay={confirmDelay}>📅 מעולה, הוספתי!</LunaBubble>
              <TimeDivider delay={todayDelay}>היום</TimeDivider>
              <LunaBubble delay={reminderDelay}>היי, זכרת לשים לרוני חולצה לבנה? 😊</LunaBubble>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}

function InsuranceSlide() {
  const next = createSequencer()
  const requestDelay = next(450)
  const firstReplyDelay = next(TYPING_MS + 250)
  const laterDelay = next(350)
  const secondReplyDelay = next(TYPING_MS + 250)

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-1 text-right">
        <h2 className="text-[14px] font-bold leading-snug">החלק הקשה הוא לא להתחיל.</h2>
        <p className="text-[13px] leading-relaxed text-muted">לונה תמשיך לעקוב, כדי שאת תוכלי להמשיך הלאה.</p>
      </div>
      <div className="flex flex-col gap-2 rounded-2xl bg-whatsapp-bg p-3 font-whatsapp">
        <OutgoingBubble time="09:12" delay={requestDelay}>
          הגשתי את המסמכים להחזר מהביטוח.
        </OutgoingBubble>
        <LunaBubble time="09:13" delay={firstReplyDelay}>
          קיבלתי ❤️ מעכשיו אני אעקוב אחרי זה.
        </LunaBubble>
        <TimeDivider delay={laterDelay}>22 ימים אחר כך</TimeDivider>
        <LunaBubble delay={secondReplyDelay}>
          עברו 22 ימים מאז שהגשת את הבקשה.
          <br />
          הכסף כבר נכנס לחשבון?
          <br />
          <br />
          את אמורה לראות החזר של <span dir="ltr">2,245 ₪</span> מחברת הראל.
        </LunaBubble>
      </div>
    </div>
  )
}

function DaycareDeadlineSlide() {
  const next = createSequencer()
  const dateDelay = next(350)
  const forwardedDelay = next(500)
  const laterDateDelay = next(350)
  const replyDelay = next(TYPING_MS + 250)

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-1 text-right">
        <h2 className="text-[14px] font-bold leading-snug">יש דברים שפשוט לא כדאי לפספס.</h2>
        <p className="text-[13px] leading-relaxed text-muted">לונה תוודא שתיזכרי לפני הדדליין, לא אחריו.</p>
      </div>
      <div className="flex flex-col gap-2 rounded-2xl bg-whatsapp-bg p-3 font-whatsapp">
        <TimeDivider delay={dateDelay}>1 ביולי</TimeDivider>
        <OutgoingBubble time="09:14" forwarded read delay={forwardedDelay}>
          הרשמה לצהרון
          <br />
          📅 עד 31.8
          <br />
          🔗{' '}
          <span dir="ltr" className="text-[#0088CC] underline">
            gan.co.il/tzaharon
          </span>
        </OutgoingBubble>
        <TimeDivider delay={laterDateDelay}>31 באוגוסט</TimeDivider>
        <LunaBubble delay={replyDelay}>
          היום זה היום האחרון להרשמה לצהרון.
          <br />
          <br />
          אם עדיין לא נרשמת, זה זמן טוב לעשות את זה.
          <br />
          <br />
          🔗{' '}
          <span dir="ltr" className="text-[#0088CC] underline">
            gan.co.il/tzaharon
          </span>
        </LunaBubble>
      </div>
    </div>
  )
}
