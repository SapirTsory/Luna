import { useEffect, useRef } from 'react'
import { PART_LABELS } from './steps'
import { useOnboardingState } from './state'
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
import type { StepConfig } from './steps'

function partQuestionIndex(visibleSteps: StepConfig[], stepIndex: number): number {
  const part = visibleSteps[stepIndex]?.part
  if (part == null) return 0
  let count = 0
  for (let i = 0; i <= stepIndex; i++) {
    if (visibleSteps[i].part === part) count++
  }
  return count
}

export function OnboardingFlow() {
  const { answers, dispatch, visibleSteps, stepIndex, currentStep, isFirst, isLast } = useOnboardingState()
  const liveRegionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Focus management + a11y announcement on every step change (screens have no shared layout to hook into).
    liveRegionRef.current?.focus()
  }, [stepIndex])

  if (!currentStep) return null

  const goNext = () => dispatch({ type: 'go-next' })
  const goBack = () => dispatch({ type: 'go-back' })
  const questionIndex = partQuestionIndex(visibleSteps, stepIndex)

  return (
    <div className="relative flex h-svh w-full flex-col bg-bg" dir="rtl" lang="he">
      {!isFirst && !isLast && (
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
        {currentStep.part != null && `${PART_LABELS[currentStep.part]}, שאלה ${questionIndex}`}
      </div>

      {currentStep.id === 'welcome' && <WelcomeScreen onNext={goNext} />}
      {currentStep.id === 'name' && (
        <NameScreen
          value={answers.userName}
          onChange={(name) => dispatch({ type: 'set-user-name', name })}
          onNext={goNext}
        />
      )}
      {currentStep.id === 'usecases' && <UseCaseCarousel onNext={goNext} />}
      {currentStep.id === 'calendar-connect' && (
        <CalendarConnectScreen
          connected={answers.calendarConnected}
          onConnect={() => dispatch({ type: 'set-calendar-connected', connected: true })}
          onNext={goNext}
        />
      )}
      {currentStep.id === 'phone' && (
        <PhoneScreen
          value={answers.phoneNumber}
          onChange={(phoneNumber) => dispatch({ type: 'set-phone-number', phoneNumber })}
          onNext={goNext}
        />
      )}
      {currentStep.id === 'prep' && <PrepScreen onNext={goNext} />}
      {currentStep.id === 'household' && (
        <HouseholdScreen
          questionIndex={questionIndex}
          value={answers.household}
          onChange={(household) => dispatch({ type: 'set-household', household })}
          onNext={goNext}
        />
      )}
      {currentStep.id === 'names' && (
        <NamesFormScreen
          questionIndex={questionIndex}
          household={answers.household}
          partnerName={answers.partnerName}
          onPartnerNameChange={(name) => dispatch({ type: 'set-partner-name', name })}
          kids={answers.children}
          onAddChild={() => dispatch({ type: 'add-child' })}
          onUpdateChild={(index, field, value) => dispatch({ type: 'update-child', index, field, value })}
          onRemoveChild={(index) => dispatch({ type: 'remove-child', index })}
          onNext={goNext}
        />
      )}
      {currentStep.id === 'kids-contact' && (
        <KidsContactScreen
          questionIndex={questionIndex}
          contacts={answers.kidsContacts}
          onAdd={() => dispatch({ type: 'add-kids-contact' })}
          onUpdate={(index, field, value) => dispatch({ type: 'update-kids-contact', index, field, value })}
          onRemove={(index) => dispatch({ type: 'remove-kids-contact', index })}
          onNext={goNext}
        />
      )}
      {currentStep.id === 'memory-habit' && (
        <MemoryHabitScreen
          questionIndex={questionIndex}
          value={answers.memoryHabit}
          onChange={(habit) => dispatch({ type: 'set-memory-habit', habit })}
          onNext={goNext}
        />
      )}
      {currentStep.id === 'calendar-habit' && (
        <CalendarHabitScreen
          questionIndex={questionIndex}
          value={answers.calendarHabit}
          onChange={(habit) => dispatch({ type: 'set-calendar-habit', habit })}
          onNext={goNext}
        />
      )}
      {currentStep.id === 'focus-areas' && (
        <FocusAreaScreen
          questionIndex={questionIndex}
          value={answers.focusAreas}
          onChange={(areas) => dispatch({ type: 'set-focus-areas', areas })}
          onNext={goNext}
        />
      )}
      {currentStep.id === 'completion' && <CompletionScreen answers={answers} />}
    </div>
  )
}
