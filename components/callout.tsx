import { ReactNode } from 'react'

interface CalloutProps {
  children: ReactNode
  variant?: 'default' | 'warning' | 'note'
}

export function Callout({ children, variant = 'default' }: CalloutProps) {
  const borderColor =
    variant === 'warning'
      ? 'border-l-[var(--endo-red)]'
      : variant === 'note'
        ? 'border-l-muted-foreground'
        : 'border-l-border'

  return (
    <div className={`border border-border border-l-4 ${borderColor} bg-card px-6 py-5 text-sm leading-relaxed text-muted-foreground`}>
      {children}
    </div>
  )
}
