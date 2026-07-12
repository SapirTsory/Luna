export type HouseholdMember = 'partner' | 'kids' | 'parent' | 'alone' | 'other'

export type MemoryHabit = 'writes-to-self' | 'messages-to-self' | 'puts-in-calendar' | 'phone-reminder' | 'just-remembers'

export type CalendarHabit = 'lives-by-it' | 'meetings-only' | 'barely-uses'

export type FocusArea = 'reminders-memory' | 'people-tasks' | 'planning-time' | 'errands-admin' | 'shopping-orders' | 'something-else'

export interface ChildInfo {
  name: string
  age: string
}

export interface KidsContact {
  role: string
  name: string
}

export interface OnboardingAnswers {
  userName: string
  household: HouseholdMember[]
  partnerName: string
  children: ChildInfo[]
  kidsContacts: KidsContact[]
  memoryHabit: MemoryHabit | null
  calendarHabit: CalendarHabit | null
  focusAreas: FocusArea[]
  calendarConnected: boolean
}

export const initialAnswers: OnboardingAnswers = {
  userName: '',
  household: [],
  partnerName: '',
  children: [],
  kidsContacts: [],
  memoryHabit: null,
  calendarHabit: null,
  focusAreas: [],
  calendarConnected: false,
}

export type StepId =
  | 'welcome'
  | 'name'
  | 'usecases'
  | 'calendar-connect'
  | 'prep'
  | 'household'
  | 'names'
  | 'kids-contact'
  | 'memory-habit'
  | 'calendar-habit'
  | 'focus-areas'
  | 'completion'
