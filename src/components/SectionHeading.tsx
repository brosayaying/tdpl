type SectionHeadingProps = {
  kicker: string
  title: string
  description?: string
}

/** Consistent section header: a mono "command" kicker above a display title. */
export function SectionHeading({
  kicker,
  title,
  description,
}: SectionHeadingProps) {
  return (
    <div className="mb-10 max-w-2xl">
      <p className="mb-3 text-sm text-phosphor-dim" aria-hidden="true">
        <span className="text-phosphor">$</span> {kicker}
      </p>
      <h2 className="text-3xl leading-tight sm:text-4xl">{title}</h2>
      {description ? (
        <p className="mt-4 text-mint-muted">{description}</p>
      ) : null}
    </div>
  )
}
