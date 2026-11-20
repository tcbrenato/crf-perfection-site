import manifest from '@/generated/images.json';

type Entry = { w: number; h: number; widths: number[] };
const IMAGES = manifest as Record<string, Entry>;

interface Props {
  name: string;
  alt: string;
  /** Attribut sizes du srcset. */
  sizes?: string;
  /** Image au-dessus de la ligne de flottaison : chargement prioritaire. */
  priority?: boolean;
  className?: string;
  /** Point focal object-position (ex. "50% 30%"). */
  position?: string;
}

export function Picture({ name, alt, sizes = '100vw', priority = false, className, position }: Props) {
  const img = IMAGES[name];
  if (!img) throw new Error(`Image introuvable : ${name}`);
  const set = (ext: string) => img.widths.map((w) => `/img/${name}-${w}.${ext} ${w}w`).join(', ');
  const fallback = img.widths.find((w) => w >= 960) ?? img.widths.at(-1);
  return (
    <picture className={className}>
      <source type="image/avif" srcSet={set('avif')} sizes={sizes} />
      <source type="image/webp" srcSet={set('webp')} sizes={sizes} />
      <img
        src={`/img/${name}-${fallback}.webp`}
        alt={alt}
        width={img.w}
        height={img.h}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        {...(priority ? { fetchpriority: 'high' } : {})}
        style={position ? { objectPosition: position } : undefined}
      />
    </picture>
  );
}
