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
} from './icons.jsx'

const USER_NAME = 'גל'

const QUESTIONS = [
  'מה חשוב השבוע?',
  'מה מחכה לי מחר?',
  'יש לי כמה דקות. מה כדאי לי לעשות?',
  'אני בקניות. מה חסר לי?',
  'יש לי חצי שעה. מה כדאי לי לקדם?',
  'מה הכי דחוף עכשיו?',
  'על מה אני עדיין מחכה לתשובה?',
  'למי אני צריכה לחזור?',
  'מה שלחתי ללונה היום?',
]

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
      <div className="task-card__row">
        <span className="task-card__badge">חדש</span>
        <span className="task-card__time">{time}</span>
      </div>
      <span className="task-card__title">{title}</span>
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
      <span className="task-card__title task-card__title--plain">{title}</span>
      <span className="task-card__time">{time}</span>
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

function QuestionChips() {
  const [active, setActive] = useState(null)
  return (
    <div className="chips-row">
      {QUESTIONS.map((question) => (
        <button
          key={question}
          type="button"
          className={`chip${active === question ? ' chip--active' : ''}`}
          onClick={() => setActive((current) => (current === question ? null : question))}
        >
          {question}
        </button>
      ))}
    </div>
  )
}

export default function App() {
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

          <QuestionChips />

          <div className="zone-divider" />

          <section className="luna-section" aria-labelledby="today-label">
            <h2 id="today-label" className="luna-section-label luna-section-label--accent">
              היום
            </h2>
            <ul className="task-list">
              <NewTaskCard title="לחזור לשכנה לגבי החוג" time="אזכיר ב-16:00" />
              <SessionTrackingCard title="🎓 שיעורי פסיכולוגיה" current={1} total={11} next="הבא ברביעי" />
              <PlainTaskCard title="לשלוח דוח לעבודה" time="אזכיר ב-13:30" />
            </ul>
          </section>

          <section className="luna-section" aria-labelledby="week-label">
            <h2 id="week-label" className="luna-section-label">
              השבוע
            </h2>
            <ul className="task-list">
              <PlainTaskCard title="איסוף הזמנה מ-KSP" time="יום ה׳" />
            </ul>
          </section>

          <MutedReminder text="תור לרופא שיניים — אזכיר באוגוסט" />
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
