import { useEffect, useRef, type ComponentType } from 'react'
import { OnboardingProvider, useOnboardingDispatch } from './context/OnboardingContext'
import { PART_LABELS, useCurrentStep } from './steps'
import { WelcomeScreen } from './screens/WelcomeScreen'
import { NameScreen } from './screens/NameScreen'
import { UseCaseCarousel } from './screens/UseCaseCarousel'
import { CalendarConnectScreen } from './screens/CalendarConnectScreen'
import { PhoneScreen } from './screens/PhoneScreen'
import { PrepScreen } from './screens/PrepScreen'
import { HouseholdScreen } from './screens/HouseholdScreen'
import { NamesFormScreen } from './screens/NamesFormScreen'
import { KidsContactScreen } from './screens/KidsContactScreen'
import { MemoryHabitScreen } from './screens/MemoryHabitScreen'
import { CalendarHabitScreen } from './screens/CalendarHabitScreen'
import { FocusAreaScreen } from './screens/FocusAreaScreen'
import { CompletionScreen } from './screens/CompletionScreen'
import type { StepId } from './types'

interface ScreenProps {
  onNext: () => void
}

/** The only place in the app that pairs a step id with the screen that renders it. */
const SCREENS: Record<StepId, ComponentType<ScreenProps>> = {
  welcome: WelcomeScreen,
  name: NameScreen,
  usecases: UseCaseCarousel,
  'calendar-connect': CalendarConnectScreen,
  phone: PhoneScreen,
  prep: PrepScreen,
  household: HouseholdScreen,
  names: NamesFormScreen,
  'kids-contact': KidsContactScreen,
  'memory-habit': MemoryHabitScreen,
  'calendar-habit': CalendarHabitScreen,
  'focus-areas': FocusAreaScreen,
  completion: CompletionScreen,
}

function FlowBody() {
  const dispatch = useOnboardingDispatch()
  const step = useCurrentStep()
  const liveRegionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Focus management + a11y announcement on every step change (screens have no shared layout to hook into).
    liveRegionRef.current?.focus()
  }, [step.stepIndex])

  const Screen = SCREENS[step.id]
  const goNext = () => dispatch({ type: 'go-next' })
  const goBack = () => dispatch({ type: 'go-back' })

  return (
    <div className="relative flex h-svh w-full flex-col bg-bg" dir="rtl" lang="he">
      {!step.isFirst && !step.isLast && (
        <button
          type="button"
          onClick={goBack}
          aria-label="חזרה לשאלה הקודמת"
          className="absolute end-2 top-2 z-10 flex size-11 items-center justify-center rounded-full text-muted hover:bg-card"
        >
          <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M12.5 5L7.5 10l5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      )}

      <div ref={liveRegionRef} tabIndex={-1} className="sr-only outline-none" role="status">
        {step.part != null && `${PART_LABELS[step.part]}, שאלה ${step.questionIndex}`}
      </div>

      <Screen onNext={goNext} />
    </div>
  )
}

export function OnboardingFlow() {
  return (
    <OnboardingProvider>
      <FlowBody />
    </OnboardingProvider>
  )
}
