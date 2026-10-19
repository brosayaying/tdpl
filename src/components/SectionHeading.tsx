type SectionHeadingProps = {
  kicker: string
  title: string
  description?: string
  /** Heading level. Use `h1` for the primary heading of a page. */
  as?: 'h1' | 'h2'
  /** Optional id, e.g. to wire up `aria-labelledby` on the section. */
  id?: string
}

/** Consistent section header: a mono "command" kicker above a display title. */
export function SectionHeading({
  kicker,
  title,
  description,
  as: Heading = 'h2',
  id,
}: SectionHeadingProps) {
  return (
    <div className="mb-10 max-w-2xl">
      <p className="mb-3 text-sm text-phosphor-dim" aria-hidden="true">
        <span className="text-phosphor">$</span> {kicker}
      </p>
      <Heading
        id={id}
        className={
          Heading === 'h1'
            ? 'text-4xl leading-tight sm:text-5xl'
            : 'text-3xl leading-tight sm:text-4xl'
        }
      >
        {title}
      </Heading>
      {description ? (
        <p className="mt-4 text-mint-muted">{description}</p>
      ) : null}
    </div>
  )
}
