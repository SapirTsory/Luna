import { ProgressBar } from '../components/ProgressBar'
import { PART_LABELS, useCurrentStep } from '../steps'

export function StepProgress() {
  const { part, questionIndex } = useCurrentStep()
  if (part == null) return null
  return <ProgressBar part={part} partLabel={PART_LABELS[part]} questionIndex={questionIndex} />
}
