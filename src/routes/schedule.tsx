import { Link, createFileRoute } from '@tanstack/react-router'
import { SectionHeading } from '../components/SectionHeading'
import {
  formatShortDate,
  scheduleRows,
  site,
  term,
} from '../data/site'

export const Route = createFileRoute('/schedule')({
  head: () => ({
    meta: [
      { title: `Schedule — ${site.name}` },
      {
        name: 'description',
        content: `Term ${term.number} runs for ${term.weeks} weeks from ${formatShortDate(term.startsOn)} to ${formatShortDate(term.endsOn)}. Scratch Explorers on Thursday evenings, and Python Foundations with in-person and online options. $${term.priceAud} per course.`,
      },
      { property: 'og:title', content: `Schedule — ${site.name}` },
      {
        property: 'og:description',
        content: `Term ${term.number}: ${term.weeks} weeks from ${formatShortDate(term.startsOn)}. Scratch Explorers on Thursdays at 7:30pm, and Python Foundations with times to be confirmed. $${term.priceAud} per course.`,
      },
      { property: 'og:image', content: `${site.url}/images/og-default.png` },
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '630' },
      { property: 'og:image:alt', content: `${site.name} — ${term.label} schedule` },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: `${site.url}/schedule` },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:image', content: `${site.url}/images/og-default.png` },
    ],
  }),
  component: Schedule,
})

const buyLinkClasses =
  'inline-flex items-center gap-1.5 whitespace-nowrap rounded-sm border border-phosphor bg-phosphor px-3 py-2 text-xs font-bold text-void no-underline transition-all hover:bg-phosphor-bright hover:shadow-glow-md'

function BookingLink({
  course,
  href,
  tentative,
}: {
  course: string
  href: string
  tentative?: boolean
}) {
  const label = tentative ? 'Reserve a place' : 'Buy place'
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={buyLinkClasses}
      aria-label={`${label} on ${course} (opens Stripe checkout in a new tab)`}
    >
      <span aria-hidden="true">&gt;</span> {label}
    </a>
  )
}

function Schedule() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <SectionHeading
        as="h1"
        kicker="crontab -l"
        title={`Term ${term.number} schedule`}
        description={`${term.weeks} weeks, ${formatShortDate(term.startsOn)} to ${formatShortDate(term.endsOn)}. Small groups, consistent times, and a free taster before you commit.`}
      />

      <dl className="mb-8 grid gap-4 sm:grid-cols-3">
        <div className="glow-card rounded-sm p-4">
          <dt className="text-xs uppercase tracking-wider text-fog">Term</dt>
          <dd className="mt-1 text-lg font-bold text-paper">
            {term.label}
          </dd>
          <dd className="text-sm text-mint-muted">
            {term.weeks} weeks &middot; {formatShortDate(term.startsOn)} &ndash;{' '}
            {formatShortDate(term.endsOn)}
          </dd>
        </div>
        <div className="glow-card rounded-sm p-4">
          <dt className="text-xs uppercase tracking-wider text-fog">Price</dt>
          <dd className="mt-1 text-lg font-bold text-paper">
            ${term.priceAud}
          </dd>
          <dd className="text-sm text-mint-muted">
            per course, for all {term.weeks} weeks
          </dd>
        </div>
        <div className="glow-card rounded-sm p-4">
          <dt className="text-xs uppercase tracking-wider text-fog">
            School term
          </dt>
          <dd className="mt-1 text-lg font-bold text-paper">SA Term 4</dd>
          <dd className="text-sm text-mint-muted">
            {formatShortDate(term.schoolTermStartsOn)} &ndash;{' '}
            {formatShortDate(term.schoolTermEndsOn)}
          </dd>
        </div>
      </dl>

      <div className="mb-8 rounded-sm border border-amber/40 bg-amber/5 px-4 py-3 text-sm text-amber">
        <span aria-hidden="true">! </span>
        This term we are offering two courses: <strong>Scratch Explorers</strong>{' '}
        on Thursday evenings, and <strong>Python Foundations</strong> with
        in-person and online options. Python times are still being confirmed —
        reserve a place and we&rsquo;ll agree a slot that works for you.
      </div>

      {/* Table on larger screens */}
      <div className="hidden overflow-x-auto lg:block">
        <table className="w-full border-collapse text-left text-sm">
          <caption className="sr-only">
            Courses running in {term.label}, with days, times, ages, formats,
            prices, and booking links
          </caption>
          <thead>
            <tr className="border-b border-line text-xs uppercase tracking-wider text-fog">
              <th scope="col" className="px-4 py-3 font-medium">Course</th>
              <th scope="col" className="px-4 py-3 font-medium">Day</th>
              <th scope="col" className="px-4 py-3 font-medium">Time</th>
              <th scope="col" className="px-4 py-3 font-medium">Ages</th>
              <th scope="col" className="px-4 py-3 font-medium">Duration</th>
              <th scope="col" className="px-4 py-3 font-medium">Format</th>
              <th scope="col" className="px-4 py-3 font-medium">Price</th>
              <th scope="col" className="px-4 py-3 font-medium">
                <span className="sr-only">Book</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {scheduleRows.map((row) => (
              <tr
                key={row.course}
                className="border-b border-line transition-colors hover:bg-panel"
              >
                <th scope="row" className="px-4 py-4 font-bold text-paper">
                  {row.course}
                  {row.tentative ? (
                    <span className="ml-2 align-middle text-xs font-medium text-amber">
                      {' '}(TBC)
                    </span>
                  ) : null}
                </th>
                <td className="px-4 py-4 text-mint-muted">{row.day}</td>
                <td className="whitespace-nowrap px-4 py-4 text-mint-muted">
                  {row.time}
                </td>
                <td className="whitespace-nowrap px-4 py-4 text-amber">
                  {row.ageRange}
                </td>
                <td className="whitespace-nowrap px-4 py-4 text-mint-muted">
                  {row.duration}
                </td>
                <td className="px-4 py-4 text-mint-muted">{row.format}</td>
                <td className="px-4 py-4 font-bold text-paper">
                  ${term.priceAud}
                </td>
                <td className="px-4 py-4 text-right">
                  <BookingLink
                    course={row.course}
                    href={row.paymentLink}
                    tentative={row.tentative}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Cards on small screens */}
      <div className="grid gap-4 lg:hidden">
        {scheduleRows.map((row) => (
          <article key={row.course} className="glow-card rounded-sm p-5">
            <h2 className="text-xl">
              {row.course}
              {row.tentative ? (
                <span className="ml-2 align-middle text-xs font-medium text-amber">
                  {' '}(TBC)
                </span>
              ) : null}
            </h2>
            <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
              <dt className="text-fog">Day</dt>
              <dd className="text-paper">{row.day}</dd>
              <dt className="text-fog">Time</dt>
              <dd className="text-paper">{row.time}</dd>
              <dt className="text-fog">Ages</dt>
              <dd className="text-amber">{row.ageRange}</dd>
              <dt className="text-fog">Duration</dt>
              <dd className="text-paper">{row.duration}</dd>
              <dt className="text-fog">Format</dt>
              <dd className="text-paper">{row.format}</dd>
              <dt className="text-fog">Price</dt>
              <dd className="font-bold text-paper">
                ${term.priceAud}{' '}
                <span className="font-normal text-fog">
                  / {term.weeks} weeks
                </span>
              </dd>
              {row.firstSession && row.lastSession ? (
                <>
                  <dt className="text-fog">Dates</dt>
                  <dd className="text-paper">
                    {formatShortDate(row.firstSession)} &ndash;{' '}
                    {formatShortDate(row.lastSession)}
                  </dd>
                </>
              ) : null}
            </dl>
            <div className="mt-4 border-t border-line pt-4">
              <BookingLink
                course={row.course}
                href={row.paymentLink}
                tentative={row.tentative}
              />
            </div>
          </article>
        ))}
      </div>

      <p className="mt-6 text-sm text-fog">
        Booking is handled securely by Stripe. Places are limited by our small
        class sizes, so we recommend booking early.
      </p>

      <div className="mt-12 text-center">
        <Link
          to="/"
          hash="register"
          className="inline-flex items-center gap-2 rounded-sm border border-phosphor bg-phosphor px-6 py-3.5 text-sm font-bold text-void no-underline transition-all hover:bg-phosphor-bright hover:shadow-glow-md"
        >
          <span aria-hidden="true">&gt;</span> Not sure? Register interest
        </Link>
      </div>
    </div>
  )
}
