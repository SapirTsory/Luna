function IconBase({ children, size = '1em' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="var(--color-icon-stroke)"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {children}
    </svg>
  )
}

export function CleaningIcon(props) {
  return (
    <IconBase {...props}>
      <path d="M7 3h6v4H7z" />
      <path d="M6 7h12l-1.5 9a4 4 0 0 1-4 3.5h-1a4 4 0 0 1-4-3.5z" />
    </IconBase>
  )
}

export function LaundryIcon(props) {
  return (
    <IconBase {...props}>
      <path d="M4 9h16l-1.6 10.2a2 2 0 0 1-2 1.8H7.6a2 2 0 0 1-2-1.8z" />
      <path d="M8 9V6.5a4 4 0 0 1 8 0V9" />
    </IconBase>
  )
}

export function TowelIcon(props) {
  return (
    <IconBase {...props}>
      <rect x="5" y="4" width="14" height="16" rx="2" />
      <path d="M5 9.5h14M10 9.5V20" />
    </IconBase>
  )
}

export function SheetsIcon(props) {
  return (
    <IconBase {...props}>
      <path d="M3 19v-6.5A2 2 0 0 1 5 10.5h14a2 2 0 0 1 2 2V19" />
      <path d="M3 19h18M5 10.5V7a1 1 0 0 1 1-1h5v4.5" />
    </IconBase>
  )
}

export function DiaperIcon(props) {
  return (
    <IconBase {...props}>
      <path d="M5 7.5A2.5 2.5 0 0 1 7.5 5h9A2.5 2.5 0 0 1 19 7.5v2A7 7 0 0 1 5 9.5z" />
      <circle cx="12" cy="7.3" r="1" />
    </IconBase>
  )
}

export function AcFilterIcon(props) {
  return (
    <IconBase {...props}>
      <path d="M12 2v20M4 7l16 10M20 7L4 17" />
    </IconBase>
  )
}

export function DentistIcon(props) {
  return (
    <IconBase {...props}>
      <path d="M12 3c-2.8 0-5 1.9-5 4.6 0 2.6.9 3.6 1.1 6.6.15 2 .9 3.8 1.9 3.8.9 0 1.2-1.8 1.5-3.3.15-.8.3-1.4.5-1.4s.35.6.5 1.4c.3 1.5.6 3.3 1.5 3.3 1 0 1.75-1.8 1.9-3.8.2-3 1.1-4 1.1-6.6C17 4.9 14.8 3 12 3z" />
    </IconBase>
  )
}
