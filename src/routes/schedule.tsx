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
          'Term schedule for Scratch Explorers, Python Foundations, AI Builders, and Robotics Club. Days, times, age ranges, and formats.',
      },
      { property: 'og:title', content: `Schedule — ${site.name}` },
      {
        property: 'og:description',
        content:
          'Weekly class times for our Scratch, Python, AI, and Robotics tracks. Details are placeholders until the term is finalised.',
      },
    ],
  }),
  component: Schedule,
})

function Schedule() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <SectionHeading
        kicker="crontab -l"
        title="Term schedule"
        description="Weekly classes across all four tracks. Small groups, consistent times, and a free taster before you commit."
      />

      <div className="mb-8 rounded-sm border border-amber/40 bg-amber/5 px-4 py-3 text-sm text-amber">
        <span aria-hidden="true">! </span>
        All days, times, and formats below are placeholders while we finalise
        the term timetable — register interest and we&rsquo;ll confirm real
        dates with you first.
      </div>

      {/* Table on larger screens */}
      <div className="hidden overflow-x-auto md:block">
        <table className="w-full border-collapse text-left text-sm">
          <caption className="sr-only">
            Weekly course schedule — placeholder details
          </caption>
          <thead>
            <tr className="border-b border-line text-xs uppercase tracking-wider text-fog">
              <th scope="col" className="px-4 py-3 font-medium">Course</th>
              <th scope="col" className="px-4 py-3 font-medium">Day</th>
              <th scope="col" className="px-4 py-3 font-medium">Time</th>
              <th scope="col" className="px-4 py-3 font-medium">Ages</th>
              <th scope="col" className="px-4 py-3 font-medium">Duration</th>
              <th scope="col" className="px-4 py-3 font-medium">Format</th>
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
                </th>
                <td className="px-4 py-4 text-mint-muted">{row.day}</td>
                <td className="px-4 py-4 text-mint-muted">{row.time}</td>
                <td className="px-4 py-4 text-amber">{row.ageRange}</td>
                <td className="px-4 py-4 text-mint-muted">{row.duration}</td>
                <td className="px-4 py-4 text-mint-muted">{row.format}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Cards on small screens */}
      <div className="grid gap-4 md:hidden">
        {scheduleRows.map((row) => (
          <article key={row.course} className="glow-card rounded-sm p-5">
            <h2 className="text-xl">{row.course}</h2>
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
          </article>
        ))}
      </div>

      <div className="mt-12 text-center">
        <Link
          to="/"
          hash="register"
          className="inline-flex items-center gap-2 rounded-sm border border-phosphor bg-phosphor px-6 py-3.5 text-sm font-bold text-void no-underline transition-all hover:bg-phosphor-bright hover:shadow-glow-md"
        >
          <span aria-hidden="true">&gt;</span> Register interest in a class
        </Link>
      </div>
    </div>
  )
}
