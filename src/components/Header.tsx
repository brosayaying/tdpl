import { Link } from '@tanstack/react-router'
import { navLinks, site } from '../data/site'

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-void/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link
          to="/"
          className="group flex items-center gap-2 text-sm font-bold tracking-tight text-paper no-underline sm:text-base"
          aria-label={`${site.name} — home`}
        >
          <span className="text-phosphor" aria-hidden="true">
            &gt;_
          </span>
          <span className="group-hover:text-phosphor-bright">
            the don&rsquo;t panic lab
          </span>
          <span className="blink-cursor" aria-hidden="true" />
        </Link>

        <nav aria-label="Primary" className="flex items-center gap-1 sm:gap-2">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="px-2 py-1.5 text-xs no-underline text-mint-muted transition-colors hover:text-phosphor-bright sm:px-3 sm:text-sm [&.active]:text-phosphor"
              activeProps={{ className: 'active' }}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}
