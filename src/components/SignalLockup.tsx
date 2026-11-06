export function SignalLockup() {
  return (
    <figure className="lockup">
      <picture>
        <source
          media="(min-width: 640px)"
          srcSet="/brand/lockups/signal-horizontal.svg"
        />
        <img
          className="lockup-image"
          src="/brand/lockups/signal-stacked.svg"
          alt="4Geeks por Divinivid"
          width={600}
          height={300}
        />
      </picture>
      <figcaption className="caption">
        Academic visual credit. Not an official partnership.
      </figcaption>
    </figure>
  );
}
