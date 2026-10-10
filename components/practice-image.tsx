import {practiceImages} from '@/lib/practice-images';

export function PracticeImage({slug, className = '', sizes = '(max-width: 760px) calc(100vw - 40px), (max-width: 950px) 45vw, 400px', priority = false, decorative = false}: {
  slug: string; className?: string; sizes?: string; priority?: boolean; decorative?: boolean;
}) {
  const image = practiceImages[slug];
  if (!image) return null;
  const src = `/media/practices/${image.file}`;
  return <picture className={`practice-photo ${className}`}>
    <img src={`${src}.webp`} srcSet={`${src}-480.webp 480w, ${src}-960.webp 960w, ${src}.webp 1536w`}
      sizes={sizes} alt={decorative ? '' : image.alt} width={1536} height={1024}
      loading={priority ? 'eager' : 'lazy'} fetchPriority={priority ? 'high' : 'auto'} decoding="async"/>
  </picture>;
}
