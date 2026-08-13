import { assetUrl } from '../lib/asset'
import type { Track } from '../data/site'

type TrackCardProps = {
  track: Track
}

/** A course/track card with terminal command header and hover glow. */
export function TrackCard({ track }: TrackCardProps) {
  return (
    <article className="glow-card flex flex-col overflow-hidden rounded-sm">
      <img
        src={assetUrl(track.image)}
        alt={track.imageAlt}
        width={800}
        height={500}
        loading="lazy"
        className="aspect-8/5 w-full border-b border-line object-cover"
      />
      <div className="flex flex-1 flex-col p-6">
        <p className="mb-4 text-sm text-phosphor-dim" aria-hidden="true">
          <span className="text-phosphor">$</span> {track.command}
        </p>
        <h3 className="text-2xl">{track.name}</h3>
        <p className="mt-1 text-sm font-medium text-amber">{track.ageRange}</p>
        <p className="mt-3 text-sm text-mint-muted">{track.blurb}</p>
        <p className="mt-4 border-t border-line pt-4 text-sm text-paper">
          <span className="text-phosphor" aria-hidden="true">
            &#10003;{' '}
          </span>
          {track.outcome}
        </p>
      </div>
    </article>
  )
}
