import { Link, createFileRoute } from '@tanstack/react-router'
import { SectionHeading } from '../components/SectionHeading'
import { site } from '../data/site'

export const Route = createFileRoute('/404')({
  head: () => ({
    meta: [
      { title: `Page not found — ${site.name}` },
      {
        name: 'description',
        content:
          'That page does not exist. Head back to the lab and pick a track, or check the term schedule.',
      },
      { name: 'robots', content: 'noindex' },
    ],
  }),
  component: NotFound,
})

function NotFound() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24">
      <SectionHeading
        as="h1"
        kicker="cat ./missing.txt"
        title="404 — no such file or directory"
        description="That page isn&rsquo;t here. Nothing is broken; you just took a wrong turn."
      />

      <div className="rounded-sm border border-line bg-panel p-5 font-mono text-sm sm:p-7">
        <p className="text-fog">
          <span className="text-phosphor">$</span> ls ./this-page
        </p>
        <p className="mt-2 text-danger">
          ls: cannot access &apos;./this-page&apos;: No such file or directory
        </p>
        <p className="mt-4 text-fog">
          <span className="text-phosphor">$</span> cd ~/lab
        </p>
        <p className="mt-2 text-mint-muted">
          Don&rsquo;t panic. Try one of these instead:
        </p>
      </div>

      <div className="mt-8 flex flex-wrap gap-4">
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-sm border border-phosphor bg-phosphor px-6 py-3.5 text-sm font-bold text-void no-underline transition-all hover:bg-phosphor-bright hover:shadow-glow-md"
        >
          <span aria-hidden="true">&gt;</span> Back to the lab
        </Link>
        <Link
          to="/schedule"
          className="inline-flex items-center gap-2 rounded-sm border border-line-bright bg-panel px-6 py-3.5 text-sm font-bold text-phosphor no-underline transition-all hover:border-phosphor hover:shadow-glow-md"
        >
          See the schedule
        </Link>
      </div>
    </div>
  )
}
