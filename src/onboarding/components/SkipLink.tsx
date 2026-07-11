interface SkipLinkProps {
  children: React.ReactNode
  onClick: () => void
}

export function SkipLink({ children, onClick }: SkipLinkProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="min-h-11 w-full text-center text-[13px] text-muted underline-offset-2 hover:underline"
    >
      {children}
    </button>
  )
}
