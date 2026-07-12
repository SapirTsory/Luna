import { useMemo } from 'react'
import { useOnboardingState } from './context/OnboardingContext'
import type { OnboardingAnswers, StepId } from './types'

export interface StepMeta {
  id: StepId
  /** Which of the 3 onboarding parts this question belongs to, or null for intro/outro screens with no progress bar. */
  part: 1 | 2 | 3 | null
  isVisible: (answers: OnboardingAnswers) => boolean
}

const always = () => true

/**
 * Metadata-only step registry (id, part, visibility) — order here is the flow order.
 * Deliberately has no dependency on the screen components themselves: OnboardingFlow.tsx
 * pairs each id with its Component, so this file can be imported from inside screens
 * (via StepProgress) without creating an import cycle.
 */
export const STEPS: StepMeta[] = [
  { id: 'welcome', part: null, isVisible: always },
  { id: 'name', part: null, isVisible: always },
  { id: 'usecases', part: null, isVisible: always },
  { id: 'calendar-connect', part: null, isVisible: always },
  { id: 'phone', part: null, isVisible: always },
  { id: 'prep', part: null, isVisible: always },
  { id: 'household', part: 1, isVisible: always },
  { id: 'names', part: 1, isVisible: (a) => a.household.includes('partner') || a.household.includes('kids') },
  { id: 'kids-contact', part: 1, isVisible: (a) => a.household.includes('kids') },
  { id: 'memory-habit', part: 2, isVisible: always },
  { id: 'calendar-habit', part: 2, isVisible: (a) => a.memoryHabit !== 'puts-in-calendar' },
  { id: 'focus-areas', part: 3, isVisible: always },
  { id: 'completion', part: null, isVisible: always },
]

export const PART_LABELS: Record<1 | 2 | 3, string> = {
  1: 'מכירים — האנשים החשובים',
  2: 'איך את עובדת היום',
  3: 'לסיום',
}

export function useVisibleSteps() {
  const { answers } = useOnboardingState()
  return useMemo(() => STEPS.filter((step) => step.isVisible(answers)), [answers])
}

export function useCurrentStep() {
  const { stepIndex } = useOnboardingState()
  const visibleSteps = useVisibleSteps()
  const clampedIndex = Math.min(stepIndex, visibleSteps.length - 1)
  const step = visibleSteps[clampedIndex]

  let questionIndex = 0
  if (step.part != null) {
    for (let i = 0; i <= clampedIndex; i++) {
      if (visibleSteps[i].part === step.part) questionIndex++
    }
  }

  return {
    ...step,
    stepIndex: clampedIndex,
    questionIndex,
    isFirst: clampedIndex === 0,
    isLast: clampedIndex === visibleSteps.length - 1,
  }
}
