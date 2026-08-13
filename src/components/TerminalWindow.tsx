import type { ReactNode } from 'react'

type TerminalWindowProps = {
  title: string
  children: ReactNode
  className?: string
}

/** A framed terminal window with a traffic-light title bar. */
export function TerminalWindow({
  title,
  children,
  className = '',
}: TerminalWindowProps) {
  return (
    <div
      className={`overflow-hidden rounded-sm border border-line bg-panel shadow-glow-sm ${className}`}
    >
      <div className="flex items-center gap-2 border-b border-line bg-panel-raised px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-danger/70" aria-hidden="true" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber/70" aria-hidden="true" />
        <span className="h-2.5 w-2.5 rounded-full bg-phosphor/70" aria-hidden="true" />
        <span className="ml-3 truncate text-xs text-fog">{title}</span>
      </div>
      <div className="p-5 sm:p-7">{children}</div>
    </div>
  )
}
