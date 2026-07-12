import { AnimatePresence, motion, MotionConfig } from 'framer-motion'
import { useEffect, useState } from 'react'
import { ChatMessage, ReadTicks, Reveal, TYPING_MS } from '../components/ChatMessage'
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

const dateChipClass = 'self-center rounded-full bg-card px-3 py-1 text-[12px] font-medium text-ink shadow-sm'

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
        <div className="flex justify-center">
          <LunaLogo withWordmark />
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
      <MotionConfig reducedMotion="user">
        {SLIDES[slide] === 'reminder' ? <ReminderSlide /> : <GroupForwardSlide />}
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
      <div className="flex flex-col gap-2 rounded-2xl bg-whatsapp-bg p-3">
        <Reveal delay={satDelay} className={dateChipClass}>
          שבת
        </Reveal>
        <ChatMessage
          delay={requestDelay}
          className="flex flex-col items-end gap-1 self-end rounded-2xl rounded-tl-[3px] bg-whatsapp-bubble px-3 py-2 text-[13px] max-w-[85%]"
        >
          <span>לא לשכוח להזמין טכנאי למזגן.</span>
          <span className="flex items-center gap-1 text-[10px] text-whatsapp-accent">
            23:47
            <ReadTicks />
          </span>
        </ChatMessage>
        <Reveal delay={sunDelay} className={dateChipClass}>
          ראשון
        </Reveal>
        <ChatMessage
          incoming
          delay={replyDelay}
          className="flex flex-col items-start gap-1 self-start rounded-2xl rounded-tr-[3px] bg-card px-3 py-2 text-[13px] max-w-[90%] shadow-sm"
        >
          <span>
            בוקר טוב, עכשיו זה זמן טוב להתקשר לטכנאי.
            <br />
            📞 מספר טלפון:{' '}
            <span dir="ltr" className="text-[#0088CC] underline">
              052-1234567
            </span>
            <br />
            🕒 שעות פעילות: <span dir="ltr">08:00–18:00</span>
          </span>
          <span className="text-[10px] text-muted-soft">09:15</span>
        </ChatMessage>
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
      <p className="text-right text-[13px] leading-relaxed italic text-muted">
        כשמגיעה הודעה מהגן בדיוק כשאת עם הילדים, והיא נעלמת בתוך כל ההודעות — ואין סיכוי שתזכרי אותה למחר בבוקר.
      </p>
      <motion.div layout className="flex flex-col gap-2 rounded-2xl bg-whatsapp-bg p-3 shadow-sm">
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
              <ChatMessage
                delay={forwardedDelay}
                className="flex flex-col items-end gap-1 self-end rounded-2xl rounded-tl-[3px] bg-whatsapp-bubble px-3 py-2 text-[13px] max-w-[88%]"
              >
                <span className="flex items-center gap-1 text-[11px] italic text-muted">↪ הועבר</span>
                מחר מצטלמים לסוף שנה, נא לשלוח את הילדים בחולצה לבנה
                <span className="text-[10px] text-whatsapp-accent">17:57</span>
              </ChatMessage>
              <ChatMessage
                incoming
                delay={confirmDelay}
                className="self-start rounded-2xl rounded-tr-[3px] bg-card px-3 py-2 text-[13px] max-w-[88%]"
              >
                📅 מעולה, הוספתי!
              </ChatMessage>
              <Reveal delay={todayDelay} className={dateChipClass}>
                היום
              </Reveal>
              <ChatMessage
                incoming
                delay={reminderDelay}
                className="self-start rounded-2xl rounded-tr-[3px] bg-card px-3 py-2 text-[13px] max-w-[88%]"
              >
                היי, זכרת לשים לרוני חולצה לבנה? 😊
              </ChatMessage>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
