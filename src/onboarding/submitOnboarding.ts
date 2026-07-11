import type { OnboardingAnswers } from './types'

const STORAGE_KEY = 'luna-onboarding-answers'

/**
 * No backend exists yet — persist locally and leave a single call site
 * so real submission can be wired in later without touching the screens.
 */
export function submitOnboarding(answers: OnboardingAnswers) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(answers))
}

export function buildWhatsAppHandoffUrl(): string {
  const message = 'לונה, סיימתי את האונבורדינג, אפשר להתחיל'
  return `https://wa.me/?text=${encodeURIComponent(message)}`
}
