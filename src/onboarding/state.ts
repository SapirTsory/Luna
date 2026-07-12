import { useMemo, useReducer } from 'react'
import type { CalendarHabit, ChildInfo, FocusArea, HouseholdMember, KidsContact, MemoryHabit, OnboardingAnswers } from './types'
import { initialAnswers } from './types'
import { STEPS } from './steps'

interface OnboardingState {
  answers: OnboardingAnswers
  stepIndex: number
}

type Action =
  | { type: 'set-user-name'; name: string }
  | { type: 'set-phone-number'; phoneNumber: string }
  | { type: 'set-household'; household: HouseholdMember[] }
  | { type: 'set-partner-name'; name: string }
  | { type: 'add-child' }
  | { type: 'update-child'; index: number; field: keyof ChildInfo; value: string }
  | { type: 'remove-child'; index: number }
  | { type: 'add-kids-contact' }
  | { type: 'update-kids-contact'; index: number; field: keyof KidsContact; value: string }
  | { type: 'remove-kids-contact'; index: number }
  | { type: 'set-memory-habit'; habit: MemoryHabit }
  | { type: 'set-calendar-habit'; habit: CalendarHabit }
  | { type: 'set-focus-areas'; areas: FocusArea[] }
  | { type: 'set-calendar-connected'; connected: boolean }
  | { type: 'go-next' }
  | { type: 'go-back' }

function reducer(state: OnboardingState, action: Action): OnboardingState {
  switch (action.type) {
    case 'set-user-name':
      return { ...state, answers: { ...state.answers, userName: action.name } }
    case 'set-phone-number':
      return { ...state, answers: { ...state.answers, phoneNumber: action.phoneNumber } }
    case 'set-household':
      return { ...state, answers: { ...state.answers, household: action.household } }
    case 'set-partner-name':
      return { ...state, answers: { ...state.answers, partnerName: action.name } }
    case 'add-child':
      return {
        ...state,
        answers: { ...state.answers, children: [...state.answers.children, { name: '', age: '' }] },
      }
    case 'update-child': {
      const children = state.answers.children.map((child, i) =>
        i === action.index ? { ...child, [action.field]: action.value } : child,
      )
      return { ...state, answers: { ...state.answers, children } }
    }
    case 'remove-child':
      return {
        ...state,
        answers: { ...state.answers, children: state.answers.children.filter((_, i) => i !== action.index) },
      }
    case 'add-kids-contact':
      return {
        ...state,
        answers: { ...state.answers, kidsContacts: [...state.answers.kidsContacts, { role: '', name: '' }] },
      }
    case 'update-kids-contact': {
      const kidsContacts = state.answers.kidsContacts.map((contact, i) =>
        i === action.index ? { ...contact, [action.field]: action.value } : contact,
      )
      return { ...state, answers: { ...state.answers, kidsContacts } }
    }
    case 'remove-kids-contact':
      return {
        ...state,
        answers: { ...state.answers, kidsContacts: state.answers.kidsContacts.filter((_, i) => i !== action.index) },
      }
    case 'set-memory-habit':
      return { ...state, answers: { ...state.answers, memoryHabit: action.habit } }
    case 'set-calendar-habit':
      return { ...state, answers: { ...state.answers, calendarHabit: action.habit } }
    case 'set-focus-areas':
      return { ...state, answers: { ...state.answers, focusAreas: action.areas } }
    case 'set-calendar-connected':
      return { ...state, answers: { ...state.answers, calendarConnected: action.connected } }
    case 'go-next':
      return { ...state, stepIndex: state.stepIndex + 1 }
    case 'go-back':
      return { ...state, stepIndex: Math.max(0, state.stepIndex - 1) }
    default:
      return state
  }
}

export function useOnboardingState() {
  const [state, dispatch] = useReducer(reducer, { answers: initialAnswers, stepIndex: 0 })

  const visibleSteps = useMemo(() => STEPS.filter((step) => step.isVisible(state.answers)), [state.answers])

  const clampedIndex = Math.min(state.stepIndex, visibleSteps.length - 1)
  const currentStep = visibleSteps[clampedIndex]

  return {
    answers: state.answers,
    dispatch,
    visibleSteps,
    stepIndex: clampedIndex,
    currentStep,
    isFirst: clampedIndex === 0,
    isLast: clampedIndex === visibleSteps.length - 1,
  }
}

export type { Action as OnboardingAction }
