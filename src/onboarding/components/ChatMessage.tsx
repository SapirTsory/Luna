import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'

export const TYPING_MS = 900

export const dateChipClass = 'self-center rounded-full bg-card px-3 py-1 text-[12px] font-medium text-ink shadow-sm'

const SPRING = { type: 'spring', stiffness: 420, damping: 26 } as const

interface RevealProps {
  children: ReactNode
  delay: number
  className?: string
}

export function Reveal({ children, delay, className }: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ...SPRING, delay: delay / 1000 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

interface ChatMessageProps {
  children: ReactNode
  incoming?: boolean
  delay: number
  className?: string
}

export function ChatMessage({ children, incoming = false, delay, className }: ChatMessageProps) {
  const [phase, setPhase] = useState<'waiting' | 'typing' | 'shown'>('waiting')

  useEffect(() => {
    setPhase('waiting')
    const toTyping = setTimeout(() => setPhase(incoming ? 'typing' : 'shown'), delay)
    const toShown = incoming ? setTimeout(() => setPhase('shown'), delay + TYPING_MS) : undefined
    return () => {
      clearTimeout(toTyping)
      if (toShown) clearTimeout(toShown)
    }
  }, [delay, incoming])

  return (
    <AnimatePresence mode="wait">
      {phase === 'typing' && (
        <motion.div
          key="typing"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className={typingBubbleClass}
        >
          <TypingDots />
        </motion.div>
      )}
      {phase === 'shown' && (
        <motion.div
          key="bubble"
          initial={{ opacity: 0, y: 8, scale: 0.94 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={SPRING}
          className={className}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export function ReadTicks({ delayMs = 450 }: { delayMs?: number }) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: delayMs / 1000, duration: 0.2, ease: 'easeOut' }}
      className="text-[#53bdeb]"
      aria-hidden="true"
    >
      ✓✓
    </motion.span>
  )
}

const typingBubbleClass =
  'flex items-center gap-1 self-start rounded-2xl rounded-tr-[3px] bg-card px-3 py-2.5 shadow-sm'

function TypingDots() {
  return (
    <>
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="h-1.5 w-1.5 rounded-full bg-muted-soft"
          animate={{ y: [0, -3, 0], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.12, ease: 'easeInOut' }}
        />
      ))}
    </>
  )
}
