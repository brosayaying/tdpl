import { Link, createFileRoute } from '@tanstack/react-router'
import { SectionHeading } from '../components/SectionHeading'
import { scheduleRows, site } from '../data/site'

export const Route = createFileRoute('/schedule')({
  head: () => ({
    meta: [
      { title: `Schedule — ${site.name}` },
      {
        name: 'description',
        content:
          'This term we are running two courses: Scratch Explorers on Thursday evenings, and Python Foundations with in-person and online options. Book your place online.',
      },
      { property: 'og:title', content: `Schedule — ${site.name}` },
      {
        property: 'og:description',
        content:
          'Scratch Explorers on Thursdays at 7:30pm, and Python Foundations with times to be confirmed. Secure a place with our online booking links.',
      },
    ],
  }),
  component: Schedule,
})

const buyLinkClasses =
  'inline-flex items-center gap-1.5 whitespace-nowrap rounded-sm border border-phosphor bg-phosphor px-3 py-1.5 text-xs font-bold text-void no-underline transition-all hover:bg-phosphor-bright hover:shadow-glow-md'

function BuyLink({ course, href }: { course: string; href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={buyLinkClasses}
      aria-label={`Buy a place on ${course} (opens Stripe checkout in a new tab)`}
    >
      <span aria-hidden="true">&gt;</span> Buy place
    </a>
  )
}

function Schedule() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <SectionHeading
        kicker="crontab -l"
        title="Term schedule"
        description="Two courses running this term. Small groups, consistent times, and a free taster before you commit."
      />

      <div className="mb-8 rounded-sm border border-amber/40 bg-amber/5 px-4 py-3 text-sm text-amber">
        <span aria-hidden="true">! </span>
        This term we are offering two courses: <strong>Scratch Explorers</strong>{' '}
        on Thursday evenings, and <strong>Python Foundations</strong> with
        in-person and online options. Python times are still being confirmed —
        book now and we&rsquo;ll agree a slot that works for you.
      </div>

      {/* Table on larger screens */}
      <div className="hidden overflow-x-auto md:block">
        <table className="w-full border-collapse text-left text-sm">
          <caption className="sr-only">
            Courses running this term, with days, times, ages, formats, and
            booking links
          </caption>
          <thead>
            <tr className="border-b border-line text-xs uppercase tracking-wider text-fog">
              <th scope="col" className="px-4 py-3 font-medium">Course</th>
              <th scope="col" className="px-4 py-3 font-medium">Day</th>
              <th scope="col" className="px-4 py-3 font-medium">Time</th>
              <th scope="col" className="px-4 py-3 font-medium">Ages</th>
              <th scope="col" className="px-4 py-3 font-medium">Duration</th>
              <th scope="col" className="px-4 py-3 font-medium">Format</th>
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
                      (TBC)
                    </span>
                  ) : null}
                </th>
                <td className="px-4 py-4 text-mint-muted">{row.day}</td>
                <td className="px-4 py-4 text-mint-muted">{row.time}</td>
                <td className="px-4 py-4 text-amber">{row.ageRange}</td>
                <td className="px-4 py-4 text-mint-muted">{row.duration}</td>
                <td className="px-4 py-4 text-mint-muted">{row.format}</td>
                <td className="px-4 py-4 text-right">
                  <BuyLink course={row.course} href={row.paymentLink} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Cards on small screens */}
      <div className="grid gap-4 md:hidden">
        {scheduleRows.map((row) => (
          <article key={row.course} className="glow-card rounded-sm p-5">
            <h2 className="text-xl">
              {row.course}
              {row.tentative ? (
                <span className="ml-2 align-middle text-xs font-medium text-amber">
                  (TBC)
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
            </dl>
            <div className="mt-4 border-t border-line pt-4">
              <BuyLink course={row.course} href={row.paymentLink} />
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
