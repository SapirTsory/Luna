interface LunaLogoProps {
  size?: number
  withWordmark?: boolean
  className?: string
}

export function LunaLogo({ size = 34, withWordmark = false, className = '' }: LunaLogoProps) {
  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      <svg width={size} height={size} viewBox="0 0 40 40" aria-hidden="true" className="shrink-0">
        <clipPath id="luna-clip">
          <circle cx="20" cy="20" r="19" />
        </clipPath>
        <g clipPath="url(#luna-clip)">
          <circle cx="20" cy="20" r="19" fill="var(--color-primary)" />
          <circle cx="29" cy="15.5" r="19" fill="var(--color-card)" />
        </g>
      </svg>
      {withWordmark && (
        <span className="font-bold tracking-[0.3em] text-primary text-xl ps-[0.3em]">LUNA</span>
      )}
    </div>
  )
}
