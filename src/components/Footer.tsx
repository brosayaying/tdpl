import { Link } from '@tanstack/react-router'
import { navLinks, site } from '../data/site'

export function Footer() {
  return (
    <footer className="border-t border-line bg-panel">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div>
          <p className="text-sm font-bold text-paper">
            <span className="text-phosphor" aria-hidden="true">
              &gt;_
            </span>{' '}
            the don&rsquo;t panic lab
            <span className="blink-cursor" aria-hidden="true" />
          </p>
          <p className="mt-2 text-sm text-fog">
            Questions?{' '}
            <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>
          </p>
        </div>
        <nav aria-label="Footer" className="flex flex-wrap items-center gap-4">
          <Link to="/" className="text-sm text-mint-muted no-underline hover:text-phosphor-bright">
            Home
          </Link>
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="text-sm text-mint-muted no-underline hover:text-phosphor-bright"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
      <div className="border-t border-line px-4 py-4 text-center text-xs text-fog sm:px-6">
        <span aria-hidden="true">// </span>&copy; {new Date().getFullYear()}{' '}
        {site.name}. Stay calm. Keep coding.
      </div>
    </footer>
  )
}
