interface ChoiceOption {
  id: string
  label: string
}

interface ChoiceGroupProps {
  name: string
  options: ChoiceOption[]
  mode: 'single' | 'multi'
  value: string[]
  onChange: (value: string[]) => void
  layout?: 'grid' | 'list'
}

export function ChoiceGroup({ name, options, mode, value, onChange, layout = 'list' }: ChoiceGroupProps) {
  const inputType = mode === 'single' ? 'radio' : 'checkbox'

  function handleToggle(id: string) {
    if (mode === 'single') {
      onChange([id])
    } else {
      onChange(value.includes(id) ? value.filter((v) => v !== id) : [...value, id])
    }
  }

  return (
    <div
      role={mode === 'single' ? 'radiogroup' : 'group'}
      className={layout === 'grid' ? 'grid grid-cols-2 gap-2.5' : 'flex flex-col gap-2.5'}
    >
      {options.map((option) => {
        const checked = value.includes(option.id)
        return (
          <label
            key={option.id}
            className={`flex min-h-11 cursor-pointer items-center gap-2.5 rounded-xl border px-3.5 py-3 text-sm transition-colors ${
              layout === 'grid' ? 'flex-col text-center justify-center gap-2 px-2.5 py-3' : ''
            } ${
              checked
                ? 'border-primary-soft/60 bg-choice-bg'
                : 'border-border-strong border-dashed hover:bg-card'
            }`}
          >
            <input
              type={inputType}
              name={name}
              checked={checked}
              onChange={() => handleToggle(option.id)}
              className="sr-only"
            />
            <span
              aria-hidden="true"
              className={`shrink-0 border-[1.5px] ${
                mode === 'single' ? 'size-4 rounded-full' : 'size-4 rounded-[4px]'
              } ${checked ? 'border-primary' : 'border-border-strong'}`}
              style={
                checked
                  ? mode === 'single'
                    ? { background: 'radial-gradient(circle, var(--color-primary) 40%, transparent 42%)' }
                    : { background: 'var(--color-card)' }
                  : undefined
              }
            >
              {checked && mode === 'multi' && (
                <svg viewBox="0 0 16 16" className="size-full text-primary" aria-hidden="true">
                  <path d="M4 8.5l2.5 2.5L12 5" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </span>
            {option.label}
          </label>
        )
      })}
    </div>
  )
}
