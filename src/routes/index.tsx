import { Link, createFileRoute } from '@tanstack/react-router'
import { InterestForm } from '../components/InterestForm'
import { SectionHeading } from '../components/SectionHeading'
import { TerminalWindow } from '../components/TerminalWindow'
import { TrackCard } from '../components/TrackCard'
import { projects, site, steps, tracks } from '../data/site'
import { assetUrl } from '../lib/asset'

export const Route = createFileRoute('/')({
  head: () => ({
    meta: [
      { title: `${site.name} — Kids' Coding Academy` },
      {
        name: 'description',
        content:
          "A playful, professional coding academy for kids aged 6–13. Scratch, Python, AI, and Robotics classes that build real skills and real projects.",
      },
      { property: 'og:title', content: `${site.name} — Kids' Coding Academy` },
      {
        property: 'og:description',
        content:
          'Scratch, Python, AI, and Robotics classes for kids aged 6–13. Try a class, pick a track, build and ship real projects.',
      },
    ],
  }),
  component: Home,
})

const ctaPrimary =
  'inline-flex items-center justify-center gap-2 rounded-sm border border-phosphor bg-phosphor px-6 py-3.5 text-sm font-bold text-void no-underline transition-all hover:bg-phosphor-bright hover:shadow-glow-md'
const ctaSecondary =
  'inline-flex items-center justify-center gap-2 rounded-sm border border-line-bright bg-panel px-6 py-3.5 text-sm font-bold text-phosphor no-underline transition-all hover:border-phosphor hover:shadow-glow-md'

function Home() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-4 pb-16 pt-12 sm:px-6 sm:pt-20">
        <TerminalWindow title="guest@dontpaniclab: ~/future" className="shadow-glow-lg">
          <p className="typed-line mb-6 text-sm text-phosphor sm:text-base">
            <span className="text-fog">guest@dontpaniclab</span>
            <span className="text-fog">:~$</span> ./start_adventure --age 6-13
            <span className="blink-cursor" aria-hidden="true" />
          </p>
          <h1 className="max-w-3xl text-4xl leading-tight sm:text-5xl lg:text-6xl">
            Kids who code <span className="text-phosphor">out-build</span> the
            future.
          </h1>
          <p className="mt-6 max-w-2xl text-base text-mint-muted sm:text-lg">
            {site.tagline} Small classes, real projects, and four tracks —
            Scratch, Python, AI, and Robotics — taught by people who ship code
            for a living.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a href="#register" className={ctaPrimary}>
              <span aria-hidden="true">&gt;</span> Register interest
            </a>
            <Link to="/schedule" className={ctaSecondary}>
              See the schedule
            </Link>
          </div>
        </TerminalWindow>

        <figure className="mt-10">
          <img
            src={assetUrl('/images/hero-workbench.svg')}
            alt="Illustration of children at a glowing workbench with small robots and a laptop, in green terminal style"
            width={1200}
            height={800}
            className="w-full rounded-sm border border-line object-cover shadow-glow-sm"
          />
        </figure>
      </section>

      {/* ── What we teach ────────────────────────────────── */}
      <section className="border-t border-line bg-panel/40 py-16 sm:py-20" aria-labelledby="tracks-heading">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeading
            kicker="ls ./tracks"
            title="What we teach"
            description="Four tracks, one goal: kids who can think in systems and build things that work."
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {tracks.map((track) => (
              <TrackCard key={track.id} track={track} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Why coding still matters ─────────────────────── */}
      <section className="py-16 sm:py-20" aria-labelledby="why-heading">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeading
            kicker="cat ./why-coding-still-matters.md"
            title="Why coding still matters"
            description="“AI writes code now — why should my child learn it?” Fair question. History has answered it before."
          />
          <div className="grid gap-5 lg:grid-cols-2">
            <article className="glow-card rounded-sm p-6 sm:p-8">
              <p className="text-sm text-phosphor-dim" aria-hidden="true">
                $ history --lesson 1
              </p>
              <h3 className="mt-3 text-2xl">
                Calculators <span className="text-phosphor">→</span> Mathematics
              </h3>
              <p className="mt-4 text-mint-muted">
                The pocket calculator could compute faster than any human. It
                didn&rsquo;t make mathematics obsolete — it made mathematical{' '}
                <em>thinking</em> more valuable. The kids who understood the
                underlying ideas used calculators to go further; the ones who
                didn&rsquo;t just pressed buttons.
              </p>
            </article>
            <article className="glow-card rounded-sm border-amber/40 p-6 sm:p-8">
              <p className="text-sm text-amber/80" aria-hidden="true">
                $ history --lesson 2 --current
              </p>
              <h3 className="mt-3 text-2xl">
                AI <span className="text-amber">→</span> Coding
              </h3>
              <p className="mt-4 text-mint-muted">
                AI can generate code the way a calculator generates answers.
                But someone still has to know what to ask for, spot when the
                answer is wrong, and decide what&rsquo;s worth building. That
                someone needs to understand how software actually works.
              </p>
            </article>
          </div>
          <p className="mt-8 max-w-3xl border-l-2 border-phosphor pl-5 text-base text-paper sm:text-lg">
            We teach kids to think clearly, direct intelligent tools with
            confidence, and build their own ideas — not just consume other
            people&rsquo;s. That&rsquo;s a skill set no autocomplete can
            replace.
          </p>
        </div>
      </section>

      {/* ── How it works ─────────────────────────────────── */}
      <section className="border-t border-line bg-panel/40 py-16 sm:py-20" aria-labelledby="how-heading">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeading
            kicker="man getting-started"
            title="How it works"
            description="Three steps from curious to shipping."
          />
          <ol className="grid gap-5 md:grid-cols-3">
            {steps.map((step) => (
              <li key={step.number} className="glow-card rounded-sm p-6">
                <p className="text-3xl font-bold text-phosphor-dim" aria-hidden="true">
                  {step.number}
                </p>
                <h3 className="mt-3 text-xl">{step.title}</h3>
                <p className="mt-2 text-sm text-mint-muted">{step.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── Student projects ─────────────────────────────── */}
      <section className="py-16 sm:py-20" aria-labelledby="projects-heading">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeading
            kicker="ls ./student-projects --shipped"
            title="Proof, not promises"
            description="A few things our students have actually built and demoed."
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {projects.map((project) => (
              <article key={project.title} className="glow-card flex flex-col rounded-sm p-6">
                <p className="text-xs text-phosphor-dim" aria-hidden="true">
                  {project.tag}
                </p>
                <h3 className="mt-2 text-lg">{project.title}</h3>
                <p className="mt-1 text-xs font-medium text-amber">{project.author}</p>
                <p className="mt-3 text-sm text-mint-muted">{project.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Register interest ────────────────────────────── */}
      <section
        id="register"
        className="scroll-mt-20 border-t border-line bg-panel/40 py-16 sm:py-20"
        aria-labelledby="register-heading"
      >
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <SectionHeading
            kicker="./register --interest"
            title="Register interest"
            description="Tell us a little about your future builder and we’ll get back to you with taster-class options. No commitment, no spam."
          />
          <TerminalWindow title="interest-form — interactive">
            <InterestForm />
          </TerminalWindow>
        </div>
      </section>
    </>
  )
}
