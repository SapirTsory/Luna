import { ChoiceGroup } from '../components/ChoiceGroup'
import { useAnswer } from '../context/OnboardingContext'
import type { OnboardingAnswers } from '../types'

type SingleChoiceKey = {
  [K in keyof OnboardingAnswers]: OnboardingAnswers[K] extends string | null
    ? string extends OnboardingAnswers[K]
      ? never
      : K
    : never
}[keyof OnboardingAnswers]

type MultiChoiceKey = { [K in keyof OnboardingAnswers]: OnboardingAnswers[K] extends string[] ? K : never }[keyof OnboardingAnswers]

interface ChoiceFieldProps {
  name: string
  options: { id: string; label: string }[]
  layout?: 'grid' | 'list'
}

interface SingleChoiceFieldProps extends ChoiceFieldProps {
  answerKey: SingleChoiceKey
  mode: 'single'
}

interface MultiChoiceFieldProps extends ChoiceFieldProps {
  answerKey: MultiChoiceKey
  mode: 'multi'
}

export function ChoiceField(props: SingleChoiceFieldProps | MultiChoiceFieldProps) {
  const { name, mode, layout, options } = props
  // Called unconditionally so hook order stays stable; mode/answerKey are correlated by the prop types above.
  const [value, setValue] = useAnswer(props.answerKey)

  if (mode === 'single') {
    const single = value as string | null
    return (
      <ChoiceGroup
        name={name}
        mode="single"
        layout={layout}
        options={options}
        value={single ? [single] : []}
        onChange={(v) => (setValue as (val: string | null) => void)(v[0] ?? null)}
      />
    )
  }

  const multi = value as string[]
  return (
    <ChoiceGroup
      name={name}
      mode="multi"
      layout={layout}
      options={options}
      value={multi}
      onChange={(v) => (setValue as (val: string[]) => void)(v)}
    />
  )
}
