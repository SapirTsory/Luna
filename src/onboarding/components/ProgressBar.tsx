interface ProgressBarProps {
  part: 1 | 2 | 3
  partLabel: string
  questionIndex: number
}

export function ProgressBar({ part, partLabel, questionIndex }: ProgressBarProps) {
  return (
    <div className="flex flex-col gap-1.5" role="group" aria-label={`התקדמות: ${partLabel}`}>
      <div className="flex gap-1.5" aria-hidden="true">
        {[1, 2, 3].map((segment) => (
          <i
            key={segment}
            className={`h-1 flex-1 rounded-full ${segment <= part ? 'bg-primary' : 'bg-border'}`}
          />
        ))}
      </div>
      <div className="text-[11px] text-muted">
        חלק {part} מתוך 3 · שאלה {questionIndex}
      </div>
    </div>
  )
}
