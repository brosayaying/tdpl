import { Link, createFileRoute } from '@tanstack/react-router'
import { SectionHeading } from '../components/SectionHeading'
import { instructors, site } from '../data/site'
import { assetUrl } from '../lib/asset'

export const Route = createFileRoute('/about')({
  head: () => ({
    meta: [
      { title: `About Us — ${site.name}` },
      {
        name: 'description',
        content:
          "The story and teaching philosophy behind The Don't Panic Lab — small, safe classes where kids learn to think, build, and direct intelligent tools.",
      },
      { property: 'og:title', content: `About Us — ${site.name}` },
      {
        property: 'og:description',
        content:
          'Why we teach coding in the age of AI, who teaches it, and how we keep classes small, safe, and fun.',
      },
    ],
  }),
  component: About,
})

function About() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      {/* Story */}
      <SectionHeading
        kicker="cat ./origin-story.txt"
        title="Don&rsquo;t panic. Build something."
        description="The lab started with a simple observation: the kids who thrive with technology aren’t the ones who consume the most of it — they’re the ones who understand it."
      />
      <div className="grid items-start gap-8 lg:grid-cols-2">
        <div className="space-y-4 text-mint-muted">
          <p>
            {site.name} began as a Saturday-morning experiment: a handful of
            kids, a borrowed room, and one rule on the wall —{' '}
            <span className="text-phosphor">don&rsquo;t panic</span>. Every
            error message is a puzzle, not a failure. Every bug is a clue.
          </p>
          <p>
            We&rsquo;ve kept that spirit as we&rsquo;ve grown. Classes stay
            small, projects stay real, and nobody is ever made to feel silly
            for asking a question. The name is a promise: this is a calm place
            to learn something powerful.
          </p>
        </div>
        <figure>
          <img
            src={assetUrl('/images/about-lab.svg')}
            alt="Stylised terminal illustration of the lab with status readouts: curiosity loaded, panic level zero"
            width={1000}
            height={700}
            className="w-full rounded-sm border border-line shadow-glow-sm"
          />
        </figure>
      </div>

      {/* Philosophy */}
      <section className="mt-20" aria-labelledby="philosophy-heading">
        <SectionHeading
          kicker="cat ./philosophy.md"
          title="How we teach"
        />
        <div className="grid gap-5 md:grid-cols-3">
          <article className="glow-card rounded-sm p-6">
            <h3 className="text-xl">Thinking before typing</h3>
            <p className="mt-2 text-sm text-mint-muted">
              Calculators didn&rsquo;t end mathematics; AI won&rsquo;t end
              coding. We teach the reasoning underneath the tools, so kids can
              direct intelligent systems instead of just accepting their
              output.
            </p>
          </article>
          <article className="glow-card rounded-sm p-6">
            <h3 className="text-xl">Projects over worksheets</h3>
            <p className="mt-2 text-sm text-mint-muted">
              Every term ships something real — a game, a tool, a robot run.
              Motivation is easy when the thing you&rsquo;re building is yours.
            </p>
          </article>
          <article className="glow-card rounded-sm p-6">
            <h3 className="text-xl">Small classes, big patience</h3>
            <p className="mt-2 text-sm text-mint-muted">
              Groups are capped so every child gets seen, every question gets
              answered, and nobody hides at the back of the room.
            </p>
          </article>
        </div>
      </section>

      {/* Instructors */}
      <section className="mt-20" aria-labelledby="instructors-heading">
        <SectionHeading
          kicker="whoami --all"
          title="The instructors"
          description="The people (and one lab monster) who keep the lab calm, curious, and building."
        />
        <div className="grid gap-5 md:grid-cols-3">
          {instructors.map((instructor) => (
            <article key={instructor.name} className="glow-card rounded-sm p-6">
              <h3 className="text-xl">{instructor.name}</h3>
              <p className="mt-1 text-sm font-medium text-amber">{instructor.role}</p>
              <p className="mt-3 text-sm text-mint-muted">{instructor.bio}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Safety */}
      <section className="mt-20" aria-labelledby="safety-heading">
        <SectionHeading kicker="./safety --check" title="Safe and sound" />
        <div className="glow-card rounded-sm p-6 sm:p-8">
          <ul className="grid gap-4 text-sm text-mint-muted sm:grid-cols-2">
            <li className="flex gap-3">
              <span className="text-phosphor" aria-hidden="true">&#10003;</span>
              All instructors hold current background checks and safeguarding
              training.
            </li>
            <li className="flex gap-3">
              <span className="text-phosphor" aria-hidden="true">&#10003;</span>
              Class sizes are capped, with sight-lines so kids are always
              supervised.
            </li>
            <li className="flex gap-3">
              <span className="text-phosphor" aria-hidden="true">&#10003;</span>
              Devices and kits are provided — no accounts, ads, or open
              internet access required.
            </li>
            <li className="flex gap-3">
              <span className="text-phosphor" aria-hidden="true">&#10003;</span>
              Parents get a clear report after every term, plus demo-day
              invitations.
            </li>
          </ul>
        </div>
      </section>

      {/* CTA */}
      <div className="mt-16 text-center">
        <Link
          to="/"
          hash="register"
          className="inline-flex items-center gap-2 rounded-sm border border-phosphor bg-phosphor px-6 py-3.5 text-sm font-bold text-void no-underline transition-all hover:bg-phosphor-bright hover:shadow-glow-md"
        >
          <span aria-hidden="true">&gt;</span> Register interest
        </Link>
      </div>
    </div>
  )
}
