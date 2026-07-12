import { createContext, useContext, useReducer, type Context, type Dispatch, type ReactNode } from 'react'
import { initialAnswers } from '../types'
import type { OnboardingAnswers } from '../types'

export type ListKey = 'children' | 'kidsContacts'

type Action =
  | { type: 'set-answer'; key: keyof OnboardingAnswers; value: unknown }
  | { type: 'list-add'; key: ListKey; item: Record<string, string> }
  | { type: 'list-update'; key: ListKey; index: number; patch: Record<string, string> }
  | { type: 'list-remove'; key: ListKey; index: number }
  | { type: 'go-next' }
  | { type: 'go-back' }

interface State {
  answers: OnboardingAnswers
  stepIndex: number
}

// The two list-shaped answers (`children`, `kidsContacts`) are both Record<string, string>[]
// under the hood, so the generic list actions operate on that shape and cast back at the edge —
// this is what lets list-add/update/remove stay single, field-agnostic reducer cases.
function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'set-answer':
      return { ...state, answers: { ...state.answers, [action.key]: action.value } }
    case 'list-add': {
      const list = state.answers[action.key] as unknown as Record<string, string>[]
      return { ...state, answers: { ...state.answers, [action.key]: [...list, action.item] } }
    }
    case 'list-update': {
      const list = state.answers[action.key] as unknown as Record<string, string>[]
      return {
        ...state,
        answers: {
          ...state.answers,
          [action.key]: list.map((item, i) => (i === action.index ? { ...item, ...action.patch } : item)),
        },
      }
    }
    case 'list-remove': {
      const list = state.answers[action.key] as unknown as Record<string, string>[]
      return { ...state, answers: { ...state.answers, [action.key]: list.filter((_, i) => i !== action.index) } }
    }
    case 'go-next':
      return { ...state, stepIndex: state.stepIndex + 1 }
    case 'go-back':
      return { ...state, stepIndex: Math.max(0, state.stepIndex - 1) }
    default:
      return state
  }
}

const OnboardingStateContext = createContext<State | null>(null)
const OnboardingDispatchContext = createContext<Dispatch<Action> | null>(null)

export function OnboardingProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { answers: initialAnswers, stepIndex: 0 })
  return (
    <OnboardingStateContext.Provider value={state}>
      <OnboardingDispatchContext.Provider value={dispatch}>{children}</OnboardingDispatchContext.Provider>
    </OnboardingStateContext.Provider>
  )
}

function useCtx<T>(ctx: Context<T | null>, name: string): T {
  const value = useContext(ctx)
  if (value === null) throw new Error(`${name} must be used inside <OnboardingProvider>`)
  return value
}

export const useOnboardingState = () => useCtx(OnboardingStateContext, 'useOnboardingState')
export const useOnboardingDispatch = () => useCtx(OnboardingDispatchContext, 'useOnboardingDispatch')

/** Reads and writes a single answer field — same ergonomics as useState, no OnboardingFlow wiring needed. */
export function useAnswer<K extends keyof OnboardingAnswers>(key: K) {
  const { answers } = useOnboardingState()
  const dispatch = useOnboardingDispatch()
  const setValue = (value: OnboardingAnswers[K]) => dispatch({ type: 'set-answer', key, value })
  return [answers[key], setValue] as const
}

/** Add/update/remove helpers for a repeatable-item answer list (`children`, `kidsContacts`). */
export function useAnswerList<T extends Record<string, string>>(key: ListKey) {
  const { answers } = useOnboardingState()
  const dispatch = useOnboardingDispatch()
  const items = answers[key] as unknown as T[]
  return {
    items,
    add: (item: T) => dispatch({ type: 'list-add', key, item }),
    update: (index: number, patch: Partial<T>) => dispatch({ type: 'list-update', key, index, patch: patch as Record<string, string> }),
    remove: (index: number) => dispatch({ type: 'list-remove', key, index }),
  }
}

export type { Action as OnboardingAction }
