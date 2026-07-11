import type { OnboardingAnswers, StepId } from './types'

export interface StepConfig {
  id: StepId
  /** Which of the 3 onboarding parts this question belongs to, or null for intro/outro screens with no progress bar. */
  part: 1 | 2 | 3 | null
  isVisible: (answers: OnboardingAnswers) => boolean
}

const always = () => true

export const STEPS: StepConfig[] = [
  { id: 'welcome', part: null, isVisible: always },
  { id: 'usecases', part: null, isVisible: always },
  { id: 'calendar-connect', part: null, isVisible: always },
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
