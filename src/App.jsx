import { useState } from 'react'
import './App.css'
import {
  CleaningIcon,
  LaundryIcon,
  TowelIcon,
  SheetsIcon,
  DiaperIcon,
  AcFilterIcon,
  DentistIcon,
  RecurringIcon,
  TrackingIcon,
  CheckboxIcon,
  OnceTaskIcon,
} from './icons.jsx'

const USER_NAME = 'גל'

const QUESTIONS = [
  { text: 'מה חשוב השבוע?', key: 'week', caption: 'הכי חשוב השבוע' },
  { text: 'מה מחכה לי מחר?', key: 'tomorrow', caption: 'מה שמחכה לך מחר' },
  { text: 'יש לי כמה דקות. מה כדאי לי לעשות?', key: 'micro', caption: 'אם יש לך כמה דקות' },
  { text: 'אני בקניות. מה חסר לי?', key: 'shopping', caption: 'מה שחסר לך בקניות' },
  { text: 'יש לי חצי שעה. מה כדאי לי לקדם?', key: 'half', caption: 'אם יש לך חצי שעה' },
  { text: 'מה הכי דחוף עכשיו?', key: 'urgent', caption: 'הכי דחוף עכשיו' },
  { text: 'על מה אני עדיין מחכה לתשובה?', key: 'waiting', caption: 'מה שעדיין ממתין לתשובה' },
  { text: 'למי אני צריכה לחזור?', key: 'callback', caption: 'למי שצריך לחזור אליו/ה' },
  { text: 'מה שלחתי ללונה היום?', key: 'sentToday', caption: 'מה ששלחת ללונה היום' },
]

// real pending tasks (from work_tasks_rows.csv export), used to drive the question-chip filters
const TASKS = [
  { id: '08a5275b', title: 'קביעת אימון נוסף לשבוע הבא', effort: 'micro', people: [], means: 'phone_text', remindAt: '2026-07-19T18:00:00Z', createdAt: '2026-07-17T12:11:24Z' },
  { id: '0a0b08e9', title: 'הוצאת קבלות לעדי, עדן ויארה', effort: 'short', people: ['עדי', 'עדן', 'יארה'], means: 'computer', remindAt: '2026-07-16T15:00:00Z', createdAt: '2026-07-19T12:16:47Z' },
  { id: '0d0241e2', title: 'החלפת מצעים (שבועי)', effort: 'short', people: [], means: 'location', remindAt: '2026-07-19T18:15:00Z', createdAt: '2026-07-19T12:16:47Z', recurrence: { type: 'weekly', weekdays: [0] } },
  { id: '1c7575cc', title: 'תיאום עם אמא (בייביסיטר לפלג + ערב הכנות מסיבה)', effort: 'short', people: ['אמא', 'פלג'], means: 'call', remindAt: '2026-07-25T17:00:00Z', createdAt: '2026-07-19T12:16:47Z' },
  { id: '21ba0baa', title: 'להביא בגדי ניו בורן לנוי', effort: 'micro', people: ['נוי'], means: 'phone_text', remindAt: '2026-07-21T06:30:00Z', createdAt: '2026-07-17T10:38:59Z' },
  { id: '22d4b4b0', title: 'ניקוי יסודי של השירותים (שבועי)', effort: 'short', people: [], means: 'location', remindAt: '2026-07-23T18:15:00Z', createdAt: '2026-07-19T12:16:47Z', recurrence: { type: 'weekly', weekdays: [4] } },
  { id: '2f3d0fb9', title: 'בדיקת סטטוס תור אצל ד"ר עודד לגשטיין', effort: 'micro', people: ['ד"ר עודד לגשטיין'], means: 'phone_text', remindAt: '2026-07-20T04:00:00Z', createdAt: '2026-07-19T10:10:45Z', waiting: true },
  { id: '358749f0', title: 'קניית ויטמין D לפלג', effort: 'micro', people: ['פלג'], means: 'location', remindAt: '2026-07-19T06:00:00Z', createdAt: '2026-07-19T12:16:47Z', shopping: true },
  { id: '3d4ff083', title: 'קביעת אימון - לדבר עם עדי', effort: 'short', people: ['עדי'], means: 'call', remindAt: '2026-07-19T05:15:00Z', createdAt: '2026-07-19T12:16:47Z' },
  { id: '42529263', title: 'המלגה - מעקב סטטוס', effort: 'micro', people: [], means: 'computer', remindAt: '2026-07-20T05:00:00Z', createdAt: '2026-07-19T12:16:47Z', waiting: true },
  { id: '427dd16a', title: 'הכנת מתנות לאורחים למסיבה', effort: 'long', people: [], means: 'location', remindAt: '2026-07-25T17:00:00Z', createdAt: '2026-07-19T12:16:47Z' },
  { id: '42ddc1b3', title: 'המשך קורס הפסיכולוגיה', effort: 'long', people: [], means: 'computer', remindAt: '2026-07-22T18:00:00Z', createdAt: '2026-07-19T12:16:47Z', recurrence: { type: 'weekly', weekdays: [3] } },
  { id: '43fe5785', title: 'שליחת הודעה למורן לגבי הכנס', effort: 'micro', people: ['מורן'], means: 'phone_text', remindAt: '2026-07-19T09:46:00Z', createdAt: '2026-07-19T12:16:47Z' },
  { id: '477d73e7', title: 'שליחת קורות חיים ומכתב המלצה', effort: 'short', people: [], means: 'computer', remindAt: '2026-07-19T13:30:00Z', createdAt: '2026-07-19T12:16:47Z' },
  { id: '47a7366d', title: 'החלפת מגבות (פעמיים בשבוע)', effort: 'short', people: [], means: 'location', remindAt: '2026-07-19T18:15:00Z', createdAt: '2026-07-19T12:16:47Z', recurrence: { type: 'weekly', weekdays: [0, 3] } },
  { id: '56e24191', title: 'בירור סטטוס גנטיקאי', effort: 'short', people: [], means: 'call', remindAt: '2026-07-19T05:30:00Z', createdAt: '2026-07-19T12:16:47Z', waiting: true },
  { id: '59579345', title: 'לקבוע תור לרופא', effort: 'micro', people: ['לולי'], means: 'phone_text', remindAt: '2026-07-19T09:00:00Z', createdAt: '2026-07-19T07:44:19Z' },
  { id: '647b5a90', title: 'הזמנת 3 בקבוקי אלכוהול למסיבה', effort: 'short', people: [], means: 'computer', remindAt: '2026-07-20T05:30:00Z', createdAt: '2026-07-19T12:16:47Z', shopping: true },
  { id: '766818bd', title: 'לדבר עם עדי בנוגע לאימון', effort: 'micro', people: [], means: 'phone_text', remindAt: '2026-07-19T05:15:00Z', createdAt: '2026-07-18T17:16:23Z' },
  { id: '81478979', title: 'הרישיון בפסיכולוגיה', effort: 'short', people: [], means: 'location', remindAt: '2026-07-20T05:15:00Z', createdAt: '2026-07-19T12:16:47Z' },
  { id: '835141ee', title: 'קביעת תור לרופא נשים', effort: 'short', people: [], means: 'phone_text', remindAt: '2026-07-19T08:46:00Z', createdAt: '2026-07-17T10:46:11Z' },
  { id: '944dc956', title: 'מגנזיום וברזל', effort: 'micro', people: [], means: 'location', remindAt: '2026-07-19T12:05:00Z', createdAt: '2026-07-19T12:16:47Z', recurrence: { type: 'daily' } },
  { id: '978fe4c0', title: 'תור לרופא עיניים לארבל', effort: 'short', people: ['ארבל'], means: 'phone_text', remindAt: '2026-07-19T08:44:00Z', createdAt: '2026-07-19T12:16:47Z' },
  { id: '9f48526b', title: 'הכנת עיצוב למסיבה היוונית', effort: 'long', people: [], means: 'location', remindAt: '2026-07-19T18:00:00Z', createdAt: '2026-07-19T12:16:47Z' },
  { id: 'a1e32b7b', title: 'הגשת בקשה לחניית נכה לאמא', effort: 'short', people: ['אמא'], means: 'computer', remindAt: '2026-07-18T17:00:00Z', createdAt: '2026-07-19T12:16:47Z' },
  { id: 'ac1f5100', title: 'קביעת MRI שד', effort: 'micro', people: [], means: 'phone_text', remindAt: '2026-07-22T05:20:00Z', createdAt: '2026-07-19T12:16:47Z' },
  { id: 'ac2f0ee2', title: 'איסוף דרכון של ארי', effort: 'short', people: ['ארי'], means: 'location', remindAt: '2026-07-22T15:10:00Z', createdAt: '2026-07-19T12:16:47Z' },
  { id: 'b9fd1627', title: 'שקית בגדי ניובורן ל"נוי"', effort: 'micro', people: [], means: 'location', remindAt: '2026-07-21T06:30:00Z', createdAt: '2026-07-19T12:16:47Z' },
  { id: 'c54c013d', title: 'קניית "קאפה" למסיבה', effort: 'short', people: [], means: 'location', remindAt: '2026-07-19T18:00:00Z', createdAt: '2026-07-19T12:16:47Z', shopping: true },
  { id: 'c9933e74', title: 'טופס 17 (לא ברור עבור מה)', effort: 'micro', people: [], means: 'phone_text', remindAt: '2026-07-23T06:00:00Z', createdAt: '2026-07-19T12:16:47Z', waiting: true },
  { id: 'ca239b90', title: 'קניית ויטמין די לפלג', effort: 'micro', people: ['פלג'], means: 'location', remindAt: '2026-07-19T06:00:00Z', createdAt: '2026-07-18T17:07:10Z', shopping: true },
  { id: 'cc95cfff', title: 'קביעת תור לרופא עיניים', effort: 'short', people: [], means: 'phone_text', remindAt: '2026-07-19T08:44:00Z', createdAt: '2026-07-17T10:45:37Z' },
  { id: 'da0caf28', title: 'קניית קקי סטיק לשירותים', effort: 'micro', people: [], means: 'location', remindAt: '2026-07-20T06:00:00Z', createdAt: '2026-07-19T12:16:47Z', shopping: true },
  { id: 'e32994fb', title: 'כרטיסים לתאילנד', effort: 'long', people: [], means: 'computer', remindAt: '2026-07-23T17:00:00Z', createdAt: '2026-07-19T12:16:47Z', shopping: true },
  { id: 'e3f14bcf', title: 'לשבת על קורות חיים', effort: 'long', people: ['ארבל'], means: 'computer', remindAt: '2026-07-19T12:00:00Z', createdAt: '2026-07-19T07:45:13Z' },
  { id: 'e7ed3034', title: 'חיפוש ארון במרקטפלייס', effort: 'short', people: [], means: 'phone_text', remindAt: '2026-07-22T17:00:00Z', createdAt: '2026-07-19T12:16:47Z', shopping: true },
  { id: 'ec7c1c5d', title: 'הזמנה מ-AliExpress (ציוד לתינוקת)', effort: 'short', people: [], means: 'phone_text', remindAt: '2026-07-23T17:00:00Z', createdAt: '2026-07-19T12:16:47Z', shopping: true },
]

// "now" is pinned to match the CSV's dates, rather than drifting with the real clock
const NOW = new Date('2026-07-19T09:00:00+03:00')
const EFFORT_MIN = { micro: 10, short: 20, long: 60 }
const WEEKDAY_MAP = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 }

function dateKey(d) {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Jerusalem', year: 'numeric', month: '2-digit', day: '2-digit' }).format(d)
}
function weekday(d) {
  const short = new Intl.DateTimeFormat('en-US', { timeZone: 'Asia/Jerusalem', weekday: 'short' }).format(d)
  return WEEKDAY_MAP[short]
}
function recurs(rec, wd) {
  if (!rec) return false
  if (rec.type === 'daily') return true
  if (rec.type === 'weekly') return rec.weekdays.includes(wd)
  return false
}

const TODAY_KEY = dateKey(NOW)
const TOMORROW = new Date(NOW.getTime() + 24 * 3600 * 1000)
const TOMORROW_KEY = dateKey(TOMORROW)
const TOMORROW_WD = weekday(TOMORROW)
const TODAY_WD = weekday(NOW)
const WEEK_START = new Date(NOW.getTime() - TODAY_WD * 24 * 3600 * 1000)
const WEEK_END = new Date(WEEK_START.getTime() + 6 * 24 * 3600 * 1000)
const WEEK_END_KEY = dateKey(WEEK_END)

function byRemindAt(a, b) {
  return new Date(a.remindAt) - new Date(b.remindAt)
}

function formatMeta(t) {
  const d = new Date(t.remindAt)
  const key = dateKey(d)
  if (key === TODAY_KEY) return 'היום'
  if (key === TOMORROW_KEY) return 'מחר'
  return new Intl.DateTimeFormat('he-IL', { weekday: 'long', timeZone: 'Asia/Jerusalem' }).format(d)
}

// one filter per chip, matching the chip → answer logic
const FILTERS = {
  tomorrow: () =>
    TASKS.filter((t) => dateKey(new Date(t.remindAt)) === TOMORROW_KEY || recurs(t.recurrence, TOMORROW_WD)).sort(byRemindAt),
  week: () =>
    TASKS.filter((t) => {
      const k = dateKey(new Date(t.remindAt))
      return k >= TODAY_KEY && k <= WEEK_END_KEY
    }).sort(byRemindAt),
  micro: () => TASKS.filter((t) => t.effort === 'micro').sort(byRemindAt),
  half: () => {
    const pool = TASKS.filter((t) => t.effort === 'micro' || t.effort === 'short').sort(byRemindAt)
    let sum = 0
    const picked = []
    for (const task of pool) {
      const dur = EFFORT_MIN[task.effort]
      if (sum + dur <= 30 || picked.length === 0) {
        picked.push(task)
        sum += dur
      }
      if (sum >= 30) break
    }
    return picked
  },
  shopping: () => TASKS.filter((t) => !!t.shopping).sort(byRemindAt),
  urgent: () => TASKS.slice().sort(byRemindAt).slice(0, 5),
  waiting: () => TASKS.filter((t) => !!t.waiting).sort(byRemindAt),
  sentToday: () => TASKS.filter((t) => dateKey(new Date(t.createdAt)) === TODAY_KEY).sort(byRemindAt),
  callback: () =>
    TASKS.filter((t) => (t.means === 'call' || t.means === 'phone_text') && t.people?.length > 0).sort(byRemindAt),
}

function getGreeting() {
  const hour = new Date().getHours()
  if (hour < 5) return 'לילה טוב'
  if (hour < 12) return 'בוקר טוב'
  if (hour < 16) return 'צהריים טובים'
  if (hour < 18) return 'אחר הצהריים טובים'
  if (hour < 22) return 'ערב טוב'
  return 'לילה טוב'
}

const householdItems = [
  { id: 'cleaning', label: 'ניקוי שירותים — עולה היום', status: 'urgent', size: 'xl', Icon: CleaningIcon },
  { id: 'laundry', label: 'כביסה — עולה מחר', status: 'urgent', size: 'xl', Icon: LaundryIcon },
  { id: 'towels', label: 'מגבות — בעוד יומיים', status: 'soon', size: 'lg', Icon: TowelIcon },
]

const householdDone = [
  { id: 'sheets', label: 'מצעים — טופל, נקי לשבוע', status: 'done', size: 'md', Icon: SheetsIcon },
  { id: 'diapers', label: 'קניית חיתולים — טופל', status: 'done', size: 'md', Icon: DiaperIcon },
]

const biannualItems = [
  { id: 'ac-filter', label: 'פילטר מזגן — פעמיים בשנה', status: 'urgent', size: 'sm', Icon: AcFilterIcon },
  { id: 'dentist', label: 'תור לשיננית — פעמיים בשנה', status: 'done', size: 'sm', Icon: DentistIcon },
]

function DockIcon({ label, status, size, Icon }) {
  return (
    <button
      type="button"
      className={`dock-icon dock-icon--${size} dock-icon--status-${status}`}
      title={label}
      aria-label={label}
    >
      <Icon />
    </button>
  )
}

function RhythmDock() {
  return (
    <nav className="rhythm-dock" aria-label="שגרת הבית">
      {householdItems.map((item) => (
        <DockIcon key={item.id} {...item} />
      ))}
      <hr className="rhythm-dock__divider" />
      {householdDone.map((item) => (
        <DockIcon key={item.id} {...item} />
      ))}
    </nav>
  )
}

function BiannualDock() {
  return (
    <div className="biannual-dock-wrap">
      <span className="biannual-dock-label" aria-hidden="true">
        פעמיים בשנה
      </span>
      <nav className="biannual-dock" aria-label="תזכורות פעמיים בשנה">
        {biannualItems.map((item) => (
          <DockIcon key={item.id} {...item} />
        ))}
      </nav>
    </div>
  )
}

function NewTaskCard({ title, time }) {
  return (
    <li className="task-card task-card--new">
      <span className="task-card__title task-card__title--icon">
        <span className="task-card__new-dot" role="status" aria-label="חדש" />
        {title}
      </span>
      <span className="task-card__time">{time}</span>
    </li>
  )
}

function SessionTrackingCard({ title, current, total, next }) {
  const angle = (current / total) * 360
  return (
    <li className="task-card">
      <div
        className="session-ring"
        style={{
          background: `conic-gradient(var(--color-accent) ${angle}deg, var(--color-track) 0deg)`,
        }}
      >
        <div className="session-ring__inner">
          {current}/{total}
        </div>
      </div>
      <span className="session-card__body">{title}</span>
      <span className="task-card__time">{next}</span>
    </li>
  )
}

function PlainTaskCard({ title, time }) {
  return (
    <li className="task-card">
      <span className="task-card__title task-card__title--plain task-card__title--icon">
        <OnceTaskIcon />
        {title}
      </span>
      <span className="task-card__time">{time}</span>
    </li>
  )
}

function CategoryTaskCard({ title, meta, ChipIcon, chipLabel }) {
  return (
    <li className="task-card task-card--tagged">
      <div className="task-card__row">
        <span className="task-card__title">{title}</span>
        <span className="task-card__time">{meta}</span>
      </div>
      <span className="task-card__chip">
        <ChipIcon />
        {chipLabel}
      </span>
    </li>
  )
}

function ProjectTaskCard({ title, time }) {
  return (
    <li className="task-card">
      <span className="task-card__title task-card__title--icon">
        <OnceTaskIcon />
        {title}
      </span>
      <span className="task-card__time">{time}</span>
    </li>
  )
}

function RecurringTaskCard({ title, cadence }) {
  return (
    <li className="task-card">
      <span className="task-card__title task-card__title--icon">
        <RecurringIcon />
        {title}
      </span>
      <span className="task-card__time">{cadence}</span>
    </li>
  )
}

function TrackingTaskCard({ title, status }) {
  return <CategoryTaskCard title={title} meta={status} ChipIcon={TrackingIcon} chipLabel="במעקב" />
}

function ShoppingTaskCard({ title, meta }) {
  return (
    <li className="task-card">
      <span className="task-card__title task-card__title--icon">
        <CheckboxIcon />
        {title}
      </span>
      <span className="task-card__time">{meta}</span>
    </li>
  )
}

function MutedReminder({ text }) {
  return (
    <div className="task-card task-card--muted">
      <span className="task-card__muted-text">{text}</span>
    </div>
  )
}

function QuestionChips({ activeKey, onSelect }) {
  return (
    <div className="chips-row">
      {QUESTIONS.map((question) => (
        <button
          key={question.key}
          type="button"
          className={`chip${activeKey === question.key ? ' chip--active' : ''}`}
          onClick={() => onSelect(question.key)}
        >
          {question.text}
        </button>
      ))}
    </div>
  )
}

function pickIcon(task) {
  if (task.recurrence) return RecurringIcon
  if (task.shopping) return CheckboxIcon
  if (task.waiting) return TrackingIcon
  return OnceTaskIcon
}

function FilteredTaskCard({ task }) {
  const Icon = pickIcon(task)
  return (
    <li className="task-card">
      <span className="task-card__title task-card__title--icon">
        <Icon />
        {task.title}
      </span>
      <span className="task-card__time">{formatMeta(task)}</span>
    </li>
  )
}

export default function App() {
  const [activeKey, setActiveKey] = useState(null)
  const activeQuestion = QUESTIONS.find((q) => q.key === activeKey) ?? null
  const filteredTasks = activeQuestion ? FILTERS[activeQuestion.key]() : null

  return (
    <div className="app-shell">
      <main className="luna-screen" dir="rtl">
        <div className="luna-scroll">
          <header className="luna-header">
            <span className="luna-mark" aria-hidden="true">
              ☾
            </span>
            <span className="luna-wordmark">L U N A</span>
          </header>

          <div className="greeting">
            <h1 className="greeting__title">
              {getGreeting()}, <span className="greeting__name">{USER_NAME}</span>
            </h1>
            <p className="greeting__tag">כל מה שמסתובב לך בראש, במקום אחד</p>
          </div>

          <div className="askbar">
            <span>מה שאת רוצה לדעת...</span>
            <span className="askbar__spark" aria-hidden="true">✦</span>
          </div>

          <QuestionChips
            activeKey={activeKey}
            onSelect={(key) => setActiveKey((current) => (current === key ? null : key))}
          />

          <div className="zone-divider" />

          {activeQuestion ? (
            <>
              <h2 className="tasks-heading">{activeQuestion.caption}</h2>
              {filteredTasks.length > 0 ? (
                <ul className="task-list">
                  {filteredTasks.map((task) => (
                    <FilteredTaskCard key={task.id} task={task} />
                  ))}
                </ul>
              ) : (
                <MutedReminder text="אין כרגע משימות שמתאימות" />
              )}
            </>
          ) : (
            <>
              <h2 className="tasks-heading">המשימות שלך</h2>

              <section className="luna-section" aria-labelledby="today-label">
                <h2 id="today-label" className="luna-section-label luna-section-label--accent">
                  היום
                </h2>
                <ul className="task-list">
                  <NewTaskCard title="לחזור לשכנה לגבי החוג" time="אזכיר ב-16:00" />
                  <TrackingTaskCard title="המלגה - מעקב סטטוס" status="אזכיר לבדוק סטטוס ב-26.7" />
                  <ShoppingTaskCard title="קניית קקי סטיק לשירותים" meta="היום" />
                </ul>
              </section>

              <section className="luna-section" aria-labelledby="week-label">
                <h2 id="week-label" className="luna-section-label">
                  השבוע
                </h2>
                <ul className="task-list">
                  <ProjectTaskCard title="כרטיסים לתאילנד" time="יום חמישי ב-21:00" />
                  <SessionTrackingCard title="המשך קורס הפסיכולוגיה" current={1} total={11} next="הבא ברביעי" />
                  <RecurringTaskCard title="מגנזיום וברזל" cadence="כל יום ב-15:00" />
                  <PlainTaskCard title="הזמנה מ-AliExpress (ציוד לתינוקת)" time="יום ה׳" />
                </ul>
              </section>

              <MutedReminder text="בירור סטטוס גנטיקאי — אזכיר בהמשך" />
            </>
          )}
        </div>

        <RhythmDock />
        <BiannualDock />
        <button type="button" className="home-avatar" aria-label="פרופיל">
          {USER_NAME[0]}
        </button>
      </main>
    </div>
  )
}
